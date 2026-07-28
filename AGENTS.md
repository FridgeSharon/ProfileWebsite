# AGENTS.md - AI Coding Assistant Guidelines

This document provides project-specific context, architectural rules, and technical guidelines for AI agents and coding assistants working on the **Profile Website** monorepo.

---

## 🏗️ Project Architecture & Tech Stack

The project is structured as an **npm Workspace monorepo**:

- **Frontend (`frontend/`)**: Built with **Angular 22**
  - Architecture: Standalone components, Signals (`signal`, `computed`), `OnPush` change detection, SCSS.
  - State & Services: Angular Signals (`signal<T>()`), `HttpClient` with RxJS.
  - Deployment: **Cloudflare Pages** static hosting.
- **Backend (`backend/`)**: Built with **NestJS 11**
  - Architecture: Modular NestJS controllers/services, TypeORM, SQLite database (`./data/app.sqlite`), SSE (Server-Sent Events) telemetry, Nodemailer SMTP, `ThrottlerGuard` rate limiting.
  - Deployment: **Render.com** Web Service.

---

## 🚀 Key Commands & Workspaces

Always run workspace commands from the root directory:

| Command | Action |
|---|---|
| `npm run dev` | Runs NestJS (port 3000) & Angular (port 4200) concurrently |
| `npm run build` | Compiles production bundles for both backend & frontend |
| `npm run build:frontend` | Builds Angular frontend (`cd frontend && npx ng build`) |
| `npm run seed` | Populates local SQLite database from `backend/data/cv-seed.json` |
| `npm run lint` | Runs ESLint across the backend codebase |

---

## 📡 API Routing & Environment Base URL Conventions

1. **URL Sanitization**:
   - `environment.apiBaseUrl` in `frontend/src/environments/` may contain or omit trailing slashes.
   - **Rule**: All frontend services (`StatsService`, `ContentService`, `ContactService`) MUST sanitize base URLs using `(environment.apiBaseUrl || '').replace(/\/+$/, '')`.
   - Never construct API paths with double slashes (e.g. `${baseUrl}//api/...`).

2. **Cloudflare Pages Environment Injection**:
   - `BACKEND_URL` is set in Cloudflare Pages settings and automatically written to `frontend/src/environments/environment.prod.ts` at build time.

---

## ⚡ Real-Time Telemetry & Server-Sent Events (SSE) Best Practices

When modifying or expanding the real-time stats module (`backend/src/stats/` & `frontend/src/app/services/stats.service.ts`):

1. **Anti-Buffering Headers**:
   All SSE endpoints (`@Sse('stream')`) MUST explicitly declare the following headers:
   ```ts
   @Header('Content-Type', 'text/event-stream')
   @Header('Cache-Control', 'no-cache, no-transform')
   @Header('X-Accel-Buffering', 'no') // Disables Nginx & Cloudflare proxy response buffering
   @Header('Connection', 'keep-alive')
   ```

2. **Keep-Alive Heartbeat**:
   - Cloudflare and Render proxies close idle TCP connections after 30–100 seconds if no data flows across the socket.
   - **Rule**: SSE streams MUST merge a 15-second heartbeat ping (`interval(15000)`) emitting `{ data: { ping: true } }`.
   - On the frontend (`stats.service.ts`), ignore `{ ping: true }` payloads while resetting stream retry counters.

3. **Compression Bypass**:
   - Express `compression()` middleware in `backend/src/main.ts` MUST bypass all routes matching `/api/stats/stream` or `text/event-stream` headers. Compressing SSE streams causes buffer latency and breaks real-time updates.

4. **Render Cold-Start Resilience**:
   - Render's free tier backend spins down when idle. When a user opens the site, Render takes ~15–40 seconds to cold start.
   - **Rule**: Frontend HTTP requests (`trackEvent`, `loadInitialStats`) MUST use RxJS `retry()` with exponential backoff so events are never lost during cold starts.

---

## 🔒 Security & Privacy Rules

- **Zero Data Leakage**:
  - `backend/data/cv-seed.json` is listed in `.gitignore`. Never hardcode real phone numbers, addresses, or private credentials directly in source files.
  - Use `CV_SEED_JSON` environment variables on Render for production seeding.
- **CORS Rules**:
  - `backend/src/main.ts` enables CORS with `credentials: true`.
  - When returning `Access-Control-Allow-Origin`, dynamically match and echo the incoming `Origin` header (e.g., `https://*.pages.dev` or custom origins) rather than returning literal `'*'`.

---

## 🧪 Verification Workflow for AI Assistants

Before declaring success on any task:

1. **Verify Backend Build**:
   ```bash
   npm run build --workspace backend
   ```
2. **Verify Frontend Build**:
   ```bash
   cd frontend && npx ng build
   ```
3. **Verify Full Repository**:
   ```bash
   npm run build
   ```
