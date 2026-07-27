# Plan: Personal Profile / Hire-Me Website (Angular + NestJS + SQLite)

## Confirmed decisions
- Stack: Angular (standalone components, signals) frontend + NestJS backend, SQLite via TypeORM.
- Repo layout: simple two folders, `frontend/` and `backend/`, no Nx.
- Multi-page routing (Angular Router): a `Home` route (anchor-scroll sections: Hero/About, Skills, Projects, Experience, Contact) and a `/cv` route — nav bar switches between real pages.
- CV page is static/reused data: it renders the *existing* Skills/Experience/Projects content (fetched from the same API) in a resume-style layout — no new CV-specific backend entity/content needed. No file, no download.
- Only interactive input site-wide: a "Give me a call" button in the Contact section, revealing a single free-text field where the user types either an email or a phone number.
- Contact field uses smart validation: a small regex-based check (email pattern OR phone pattern) on both frontend and backend — reject anything matching neither, no heavyweight custom-validator abstraction.
- A static privacy statement is shown next to the form (informational text only, no consent checkbox): personal data goes only to the site owner, used only to contact the person directly, never sold/shared with third parties.
- Submitted contact info is persisted to SQLite (`ContactRequest`: id, contact value, submittedAt).
- Backend keeps Nodemailer/SMTP, repurposed to send an **internal notification email to the owner** (`OWNER_EMAIL` env var) whenever someone submits the contact form — no more emailing a CV file to the requester.
- Live SSE stats feature carries over, repurposed to contact-request counts ("today"/"total") instead of CV-request counts.
- Anti-abuse: per-IP rate limiting + validation stays on the contact endpoint.
- Static images folder: `backend/media/images`, served by backend, streamed.
- No code comments anywhere; self-documenting names/small functions instead.
- No UI component library — plain SCSS.

## Steps

### Phase A — Repo & tooling scaffolding
- [ ] 1. Root `package.json` with npm workspaces (`frontend`, `backend`) + `concurrently` dev script.
- [ ] 2. Root `.gitignore` (node_modules, dist, `.env`, `*.sqlite`, coverage).
- [ ] 3. `LICENSE` (MIT — assumption) and `README.md` skeleton (filled in Phase F).
- [ ] 4. `backend/.env.example`: `SMTP_HOST/PORT/USER/PASS/FROM`, `OWNER_EMAIL`, `FRONTEND_ORIGIN`, `THROTTLE_TTL/LIMIT`, DB path.

### Phase B — Backend core (depends on A)
- [ ] 5. Scaffold NestJS app: `main.ts` (global `ValidationPipe`, `compression()`, CORS from `FRONTEND_ORIGIN`), `app.module.ts` wiring `ConfigModule`, `TypeOrmModule.forRoot` (sqlite file under `backend/data/app.sqlite`, gitignored), `ThrottlerModule`.
- [ ] 6. `content` module: entities `Project`, `Skill`, `ExperienceEntry`; `content.service.ts`; `content.controller.ts` exposing `GET /api/projects`, `GET /api/skills`, `GET /api/experience`.
- [ ] 7. `backend/src/database/seed.ts` — idempotent seed inserting placeholder rows, only if tables are empty.
- [ ] 8. `media` module: `MediaController` streaming files from `backend/media/images/:filename` via `StreamableFile`/`fs.createReadStream` with mime lookup. One placeholder SVG committed under `backend/media/images/`.

### Phase C — Backend contact request + live stats (depends on B)
- [ ] 9. `contact` module: `ContactRequestDto` (`contact: string`, `@IsNotEmpty()` `@MaxLength()`); `contact.service.ts` runs a small `isValidContact()` helper (email regex OR phone regex) and throws `BadRequestException` if neither matches; on success persists `ContactRequest` (contact value, submittedAt) via TypeORM, sends a Nodemailer notification email to `OWNER_EMAIL` (subject "New contact request", body = contact value + timestamp), then calls `stats.service.recordRequest()`. `contact.controller.ts` exposes `POST /api/contact/request`, guarded by `ThrottlerGuard` (e.g. 5/min/IP).
- [ ] 10. `stats` module: `stats.service.ts` holds an RxJS `Subject` + queries SQLite for "today"/"total" `ContactRequest` counts; `stats.controller.ts` exposes `GET /api/stats/summary` and SSE `GET /api/stats/stream` (`@Sse()`), emitting on every new contact request.

### Phase D — Frontend scaffold (parallel with B, mockable)
- [ ] 11. Scaffold Angular app: standalone bootstrap, SCSS, `OnPush` default, `provideRouter` with `app.routes.ts` (`''` → `HomePage`, `'cv'` → `CvPage`). `proxy.conf.json` forwarding `/api`. `environment(.prod).ts` with `apiBaseUrl`.
- [ ] 12. Shared services: `content.service.ts` (HttpClient → signals for projects/skills/experience), `contact.service.ts` (POST `/api/contact/request`), `stats.service.ts` (EventSource wrapper for `/api/stats/stream` + initial `/api/stats/summary` fetch).

### Phase E — Frontend UI (depends on D; live data depends on C)
- [ ] 13. Root `app.component`: persistent nav bar (Home / CV links via `routerLink`) + `router-outlet` + footer.
- [ ] 14. `HomePage`: composes `hero`, `skills-section`, `projects-section`, `experience-section`, `contact-section`, with anchor-scroll navigation between them.
- [ ] 15. `contact-section`: "Give me a call" button toggles a single input field (signal-driven show/hide); client-side email-or-phone regex check mirrors the backend; disables submit while sending; shows inline validation error or success state ("Thanks, I'll reach out soon!"); static privacy statement text shown alongside the field.
- [ ] 16. `live-stats-badge`: subscribes to `stats.service`, displays something like "X people reached out today", updating live via SSE.
- [ ] 17. `CvPage`: fetches the same Skills/Experience/Projects data from `content.service` and renders it in a resume-style layout (header + sections) — no separate backend content.

### Phase F — Integration & docs (depends on all above)
- [ ] 18. Wire root dev script; verify end-to-end locally.
- [ ] 19. Fill in `README.md`: setup, env vars, how to add real images later, seed script usage, architecture summary, privacy-handling note, license.

## Relevant files
- `package.json` (root), `.gitignore`, `LICENSE`, `README.md`
- `backend/.env.example` — SMTP_*, `OWNER_EMAIL`, `FRONTEND_ORIGIN`, `THROTTLE_*`
- `backend/src/main.ts`, `backend/src/app.module.ts`
- `backend/src/content/*` — `Project`/`Skill`/`ExperienceEntry` entities, service, controller
- `backend/src/database/seed.ts`
- `backend/src/contact/*` — `ContactRequestDto`, `ContactRequest` entity, `contact.service.ts` (validation + Nodemailer notification + persistence), `contact.controller.ts`
- `backend/src/stats/*` — SSE `@Sse()` endpoint + summary endpoint, RxJS `Subject`, now counting contact requests
- `backend/src/media/*` — streamed static file controller for `backend/media/images`
- `backend/media/images/` — static asset folder (placeholder SVG)
- `frontend/src/app/app.routes.ts`, `frontend/src/app/app.component.*`
- `frontend/src/app/pages/home/*`, `frontend/src/app/pages/cv/*`
- `frontend/src/app/components/*` — hero, skills-section, projects-section, experience-section, contact-section, live-stats-badge
- `frontend/src/app/services/*` — `content.service.ts`, `contact.service.ts`, `stats.service.ts`
- `frontend/proxy.conf.json`, `frontend/src/environments/*`

## Verification
1. `npm run seed` then `curl localhost:3000/api/projects|skills|experience` return placeholder JSON.
2. `curl -X POST localhost:3000/api/contact/request -d '{"contact":"test@example.com"}' -H 'Content-Type: application/json'` succeeds, sends a notification email to `OWNER_EMAIL` (test SMTP, e.g. Ethereal) and inserts a `ContactRequest` row; retry with `{"contact":"+1 555 123 4567"}'` also succeeds; retry with `{"contact":"garbage"}'` returns 400; rapid repeats return 429.
3. `curl -N localhost:3000/api/stats/stream` emits a new event right after a contact request from another terminal.
4. Frontend: `npm start` (proxied) — Router navigates between Home and CV without full reload; CV page shows resume-style structured content; Contact section reveals the field + privacy text, valid submissions show success, invalid show inline error, live badge updates without refresh.
5. `npm run build` succeeds in both apps; ESLint/Prettier pass clean.

## Decisions / assumptions
- Email-or-phone validation implemented as a small helper function (regex checks) inside `ContactService`, not a custom class-validator decorator — keeps it simple per no-over-engineering guidance.
- No consent checkbox — privacy statement is static text next to the form.
- CV page has no dedicated backend content; it re-renders the same Skills/Experience/Projects API data in a different layout.
- MIT license assumed (unconfirmed).
- Nav bar persists across both routes (Home, CV) via the root `app.component` + `router-outlet`.
