# Profile Website

A personal profile / hire-me website built with Angular 22 and NestJS 11.

## Architecture

```
├── frontend/          Angular 22 (standalone components, signals, SCSS)
├── backend/           NestJS 11 (TypeORM, SQLite, Nodemailer, SSE)
└── package.json       npm workspaces root
```

### Root `package.json` & Monorepo Workspaces

The root `package.json` configures the project as an **npm Workspace** containing two sub-packages (`frontend` and `backend`). Its primary purposes are:

1. **Monorepo Workspaces Management (`"workspaces": ["frontend", "backend"]`)**:
   - Allows running a single `npm install` from the project root to install and link dependencies for both the Angular frontend and NestJS backend at once.
2. **Unified Single-Command Development**:
   - Provides top-level scripts so you don't need to manually `cd` into subfolders:
     - `npm run dev`: Runs both the backend dev server (port 3000) and frontend dev server (port 4200) simultaneously in a single terminal.
     - `npm run build`: Compiles production bundles for both backend and frontend.
     - `npm run seed`: Populates the SQLite database.
     - `npm run lint`: Runs linters across all packages.
3. **Global Tooling & Dependency Overrides**:
   - Holds shared developer tools like `concurrently`.
   - Defines central `"overrides"` so transitive dependency security patches apply consistently across the entire repository.

---

### Backend API Endpoints

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/profile`              | Fetch personal profile metadata      |
| GET    | `/api/projects`             | List all projects                    |
| GET    | `/api/skills`               | List all skills                      |
| GET    | `/api/experience`           | List all experience entries          |
| POST   | `/api/contact/request`      | Submit a contact request (throttled) |
| GET    | `/api/stats/summary`        | Contact request counts (today/total) |
| GET    | `/api/stats/stream`         | Live stats via SSE                   |
| GET    | `/api/media/images/:file`   | Serve static images                  |

**Frontend** is a two-page Angular SPA:
- **Home** — Hero, Skills, Projects, Experience, and Contact sections with a premium dark-mode design
- **CV** — Resume-style layout rendering the same content data

---

## Setup

### Prerequisites

- Node.js >= 22 (Supports Node 22 LTS & Node 24 LTS)
- npm >= 10

### Install

```bash
npm install
```

### Environment

Copy the example env file and fill in your values:

```bash
cp backend/.env.example backend/.env
```

| Variable           | Description                              | Default                    |
|--------------------|------------------------------------------|----------------------------|
| `SMTP_HOST`        | SMTP server hostname                     | —                          |
| `SMTP_PORT`        | SMTP server port                         | —                          |
| `SMTP_USER`        | SMTP username                            | —                          |
| `SMTP_PASS`        | SMTP password                            | —                          |
| `SMTP_FROM`        | Sender email address                     | —                          |
| `OWNER_EMAIL`      | Where contact notifications are sent     | —                          |
| `FRONTEND_ORIGIN`  | CORS allowed origin                      | `http://localhost:4200`    |
| `THROTTLE_TTL`     | Rate limit window (ms)                   | `60000`                    |
| `THROTTLE_LIMIT`   | Max requests per window per IP           | `5`                        |
| `DB_PATH`          | SQLite database file path                | `./data/app.sqlite`        |

SMTP is optional for local development — contact submissions still persist to the database, and a warning is logged if the email fails to send.

### Seed the Database

Populates the database with content (idempotent — only inserts if tables are empty):

```bash
npm run seed
```

Local custom seed data can be placed in `backend/data/cv-seed.json` (untracked in `.gitignore`) so your personal details stay out of source control.

### Run in Development

Starts both backend (port 3000, watch mode) and frontend (port 4200, proxied to backend) concurrently:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Production Deployment

### Overview

The production build produces:
- `backend/dist/` — compiled NestJS application
- `frontend/dist/frontend/browser/` — static Angular SPA files

### Environment

Set the following for production:

```bash
NODE_ENV=production         # Disables TypeORM auto-sync (uses migrations instead)
FRONTEND_ORIGIN=https://yourdomain.com
OWNER_EMAIL=you@example.com
# SMTP_* vars must be set for contact notifications to work
```

### Serving the Application

**Option A — Reverse proxy (recommended):** Run the NestJS backend on port 3000 and serve the Angular static files via Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;          # Required for SSE
    }

    location / {
        root /path/to/frontend/dist/frontend/browser;
        try_files $uri $uri/ /index.html;
    }
}
```

**Option B — NestJS serves the SPA:** Configure NestJS to serve the Angular dist as static files using `@nestjs/serve-static`.

### Notes

- `proxy.conf.json` is **dev-only** — it proxies `/api` from the Angular dev server (port 4200) to the NestJS server (port 3000). In production, both are served from the same origin via the reverse proxy.
- The `environment.prod.ts` file should set `apiBaseUrl` to `''` (empty string) when using a reverse proxy on the same domain.

## Adding Real Content

### Images

Place image files in `backend/media/images/`. They are served at `/api/media/images/<filename>`. Update the `imageFilename` field on project records to reference them.

### Seed Data & Privacy

To keep personal data safe when pushing to Git:
1. Place your private details in `backend/data/cv-seed.json` (which is ignored by `.gitignore`).
2. Run `npm run seed`.
3. The source code in Git contains zero hardcoded personal contact details.

## Privacy

The contact form collects an email or phone number. A static privacy statement is displayed alongside the form informing users that:
- Personal data is used only to contact them directly
- Data is never sold or shared with third parties
- Data is stored in the site's own SQLite database

## License

MIT
