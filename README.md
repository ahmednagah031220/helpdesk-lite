# HelpDesk Lite

Lightweight internal support ticketing workspace. Employees submit requests in one place; staff assign and track them; managers see workload at a glance.

## Quick start

```bash
cd web
cp .env.example .env
npm install
npm run db:up        # Postgres via Docker (port 5433)
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo accounts (password: `password123`)

| Role     | Email                     |
|----------|---------------------------|
| Employee | `employee@helpdesk.local` |
| Staff    | `staff@helpdesk.local`    |
| Manager  | `manager@helpdesk.local`  |

## Stack

- Next.js (App Router) + TypeScript
- PostgreSQL + Prisma
- NextAuth (credentials)
- Tailwind CSS

## Docs

Planning and product docs live in the repo root (`1_Requirement_Framing.md`, `HelpDesk_Lite_PRD_Draft.md`, etc.). Implementation details are in `HelpDesk_Lite_Cursor_Implementation_Guide.md`.

## GitHub

Public repo: [ahmednagah031220/helpdesk-lite](https://github.com/ahmednagah031220/helpdesk-lite).
