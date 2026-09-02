# Guy Sharon - Engineering Portfolio

A privacy-first, fully static Angular portfolio deployed on Cloudflare Pages.

## Architecture

- Angular 22 standalone components
- Signals and `OnPush` change detection
- Build-time prerendering with Angular static output
- Typed local content with no runtime API
- Cloudflare Pages Git deployment and CDN delivery
- No database, backend, cookies, visitor identifiers, forms, or application analytics

The project previously included a NestJS and SQLite backend. That implementation was intentionally removed after the interactive features no longer justified the operational and privacy costs.

## Development

Use Node 24.15 or a compatible Node 24 release.

```bash
npm install
npm start
```

The local development server runs at `http://localhost:4200`.

## Verification

```bash
npm run verify
```

This runs TypeScript checking, content/privacy assertions, the production prerender build, and validation of the generated static pages.

## Cloudflare Pages

The existing Pages project deploys from `main` using:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist/frontend/browser`
- Node version: `24.15.0`

No `BACKEND_URL` or other runtime environment variable is required.

## Content and privacy

Public profile content lives in `frontend/src/app/data/portfolio-content.ts`. Do not add private email addresses, phone numbers, credentials, or unpublished source material. The CV page intentionally exposes only location, LinkedIn, and GitHub.

## License

MIT
