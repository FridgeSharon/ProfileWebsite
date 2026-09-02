# AGENTS.md - Profile Website Guidelines

## Project architecture

This repository contains a single Angular 22 application in `frontend/`. It is a fully static website deployed to Cloudflare Pages.

- Use standalone components, Signals, `OnPush` change detection, and SCSS.
- Keep all public content in `frontend/src/app/data/portfolio-content.ts`.
- Do not add a backend, database, Pages Function, Worker, contact form, visitor identifier, cookie, or application analytics unless the user explicitly changes the architecture.
- Do not publish a private email address, phone number, credential, or the source CV PDF.
- Preserve Angular static prerendering for `/`, `/cv`, and `/architecture`.

## Commands

Run commands from the repository root:

| Command | Action |
|---|---|
| `npm start` | Run Angular locally |
| `npm run build` | Create the static production build |
| `npm run lint` | Run TypeScript checks without rewriting files |
| `npm test` | Validate public content and privacy constraints |
| `npm run verify` | Run all checks and validate prerendered output |

## Deployment

- Production host: Cloudflare Pages
- Production branch: `main`
- Pages root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist/frontend/browser`
- Node version: `24.15.0`

The site must not depend on `BACKEND_URL`, Render, or any runtime service.

## Verification

Before declaring success:

1. Run `npm run verify`.
2. Inspect the prerendered HTML for all three routes.
3. Test desktop and mobile layouts, keyboard navigation, and the print CV.
4. Confirm the production site makes no requests to a backend or analytics endpoint.
