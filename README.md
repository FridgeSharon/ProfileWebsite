# Profile Website

A personal profile / hire-me website built with **Angular 22** (standalone components, signals, SCSS) and **NestJS 11** (TypeORM, SQLite, Nodemailer, SSE).

---

## 🏗️ Architecture Overview

```text
├── frontend/          Angular 22 (standalone components, signals, OnPush, SCSS)
├── backend/           NestJS 11 (TypeORM, SQLite, Nodemailer, SSE, Throttler)
├── package.json       npm workspaces root
└── README.md          Project documentation
```

### Monorepo Workspaces Management

The root `package.json` configures the project as an **npm Workspace** containing two sub-packages (`frontend` and `backend`).

- **Unified Dependencies**: Run a single `npm install` from the project root to install and link dependencies for both packages.
- **Top-Level Commands**:
  - `npm run dev`: Runs both the NestJS backend (port 3000) and Angular frontend (port 4200) simultaneously.
  - `npm run build`: Compiles production bundles for both backend and frontend.
  - `npm run seed`: Populates the SQLite database with seed data.
  - `npm run lint`: Runs ESLint across the repository.

---

## 📡 Backend API Endpoints

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| `GET`  | `/api/profile`            | Fetch personal profile metadata      |
| `GET`  | `/api/projects`           | List all projects                    |
| `GET`  | `/api/skills`             | List all skills                      |
| `GET`  | `/api/experience`         | List all experience entries          |
| `POST` | `/api/contact/request`    | Submit a contact request (throttled) |
| `GET`  | `/api/stats/summary`      | Contact request counts (today/total) |
| `GET`  | `/api/stats/stream`       | Live visitor/request stats via SSE   |
| `GET`  | `/api/media/images/:file` | Serve static image assets            |

---

## 🚀 100% Free Production Deployment Guide

This project is optimized for 100% free hosting using **Cloudflare Pages** for the Angular frontend and **Render** for the NestJS backend.

---

### 1. Backend Deployment (Render.com)

1. **Create Web Service** on Render connected to your GitHub repository.
2. **Settings**:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod` (automatically runs database seeding on boot before launching NestJS)
3. **Environment Variables**:
   Add the following in Render **Environment**:
   
   | Key | Value / Example |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DB_PATH` | `./data/app.sqlite` |
   | `FRONTEND_ORIGIN` | `https://your-app.pages.dev` |
   | `CV_SEED_JSON` | *(Paste the contents of your `cv-seed.json` here to seed your real data privately)* |
   | `FORCE_RESEED` | `true` *(set once to populate database, then remove)* |

---

### 2. Frontend Deployment (Cloudflare Pages)

1. **Create Pages Project** in Cloudflare Dashboard → **Workers & Pages** → **Connect to Git**.
2. **Build Settings**:
   - **Framework Preset**: `Angular`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist/frontend/browser`
3. **Environment Variables**:
   Add the following in Cloudflare Pages **Settings → Environment variables**:
   
   | Key | Value | Description |
   |---|---|---|
   | `NODE_VERSION` | `24.15.0` | Node.js version required by Angular 22 |
   | `BACKEND_URL` | `https://your-backend.onrender.com` | Automatically injected into `environment.prod.ts` during build |

> **🔒 Privacy & Security Note**: By configuring `BACKEND_URL` in Cloudflare Pages environment variables and `CV_SEED_JSON` in Render environment variables, **zero private URLs or personal data are ever committed to public GitHub repositories**.

---

## 🛠️ Local Setup & Development

### Prerequisites
- Node.js >= 22 (Node 22 LTS or Node 24 LTS)
- npm >= 10

### Installation

```bash
npm install
```

### Customizing Profile Data

To populate the portfolio with your own personal profile, resume, projects, and skills locally:

```bash
cp backend/data/cv-seed.json.example backend/data/cv-seed.json
```

Edit `backend/data/cv-seed.json`. Because `cv-seed.json` is listed in `.gitignore`, your personal details remain completely private on your local machine.

### Seed Database Locally

```bash
npm run seed
```

### Start Development Server

```bash
npm run dev
```

- Angular Frontend: `http://localhost:4200`
- NestJS Backend API: `http://localhost:3000`

---

## 📄 License

MIT
