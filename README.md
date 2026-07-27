# Profile Website

A personal profile / hire-me website built with Angular and NestJS.

## Architecture

```
├── frontend/          Angular 18 (standalone components, signals, SCSS)
├── backend/           NestJS (TypeORM, SQLite, Nodemailer, SSE)
└── package.json       npm workspaces root
```

**Backend** serves a REST API with these endpoints:

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
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

## Setup

### Prerequisites

- Node.js >= 18
- npm >= 9

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

Populates the database with placeholder content (idempotent — only inserts if tables are empty):

```bash
npm run seed
```

### Run in Development

Starts both backend (port 3000, watch mode) and frontend (port 4200, proxied to backend) concurrently:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Adding Real Content

### Images

Place image files in `backend/media/images/`. They are served at `/api/media/images/<filename>`. Update the `imageFilename` field on project records to reference them.

### Seed Data

Edit `backend/src/database/seed.ts` to replace placeholder content with real projects, skills, and experience entries. Then re-run:

```bash
# Delete the existing database to re-seed
rm backend/data/app.sqlite
npm run seed
```

## Privacy

The contact form collects an email or phone number. A static privacy statement is displayed alongside the form informing users that:
- Personal data is used only to contact them directly
- Data is never sold or shared with third parties
- Data is stored in the site's own SQLite database

## License

MIT
