# HelpDesk Lite — Cursor Implementation Guide

**Purpose:** Give Cursor a single, self-contained spec to build HelpDesk Lite v1. This guide synthesizes the PRD, requirement framing, planning breakdown, and staged execution plan into one actionable document.

**Product summary:** A lightweight internal support ticketing workspace where requests can be submitted, assigned, tracked, and resolved in one place — without informal chasing across email and chat.

---

## 0. Source Traceability

| Source document | What it contributes |
|---|---|
| `HelpDesk_Lite_PRD_Draft.md` | Objectives, user stories, functional/non-functional requirements, metrics, risks |
| `1_Requirement_Framing.md` | Core problem, scope boundaries, non-goals |
| `2_Planning_Ready_Breakdown.md` | Seven work areas, what's ready vs. blocked |
| `3_Initial_Execution_Plan.md` | Staged delivery (Stage 0–4), dependency chain |

**Jira alignment (if applicable):** Stages map to epics HDL-1 → HDL-5; do not start build work that depends on unresolved Stage 0 decisions without using the defaults in Section 1.

---

## 1. Stage 0 Decisions (Defaults to Unblock Build)

The execution plan requires stakeholder decisions before UI build. Use these defaults for implementation; flag them as assumptions in demos and PRs — they are not final product decisions.

| Open question | Default assumption |
|---|---|
| Mandatory submission fields | `title`, `description`, `category` (enum), `submitterId` (from auth session) |
| Optional fields for v1 | `priority`, `attachments` — **not built in v1** |
| Ticket states | `OPEN → IN_PROGRESS → RESOLVED → CLOSED` |
| Resolved vs. Closed | **Distinct.** Resolved = work completed; Closed = confirmed/finalized (no reopen in v1) |
| Assignment approach | **Manual.** Staff self-assign from unassigned queue, or another staff member assigns |
| Manager visibility | **Team-wide** — all tickets, not filtered by category |
| Self-service in v1 | **No** — deferred to Stage 4 |

### State transition rules

```
OPEN          → IN_PROGRESS | CLOSED (cancel/abandon — optional, staff only)
IN_PROGRESS   → RESOLVED | OPEN (reopen — optional, staff only)
RESOLVED      → CLOSED
CLOSED        → (terminal in v1)
```

Every transition must write a `StatusEvent` row. Invalid transitions return `400`.

---

## 2. Scope

### In scope (v1)

| Work area | v1 deliverable |
|---|---|
| Ticket intake | Submission form: title, description, category, submitter |
| Ownership & assignment | Manual assign / self-assign |
| Ticket lifecycle | Four states with auditable transitions |
| Staff experience | Queue of assigned + unassigned tickets; status updates |
| Employee experience | "My tickets" list with current status |
| Manager visibility | Summary counts by status |
| Notifications | On assign and on resolve (stub swappable to email/Slack later) |

### Explicitly out of scope (do not build)

- Automated or AI-based routing/categorization
- Knowledge base / self-service deflection
- SLA automation and escalation rules
- Advanced analytics dashboards
- Multi-channel intake (email/chat auto-conversion)
- Priority field, attachments, round-robin, category-based routing

---

## 3. User Stories → Implementation Mapping

| User story | Role | Route / feature |
|---|---|---|
| Submit a support request in one place | Employee | `/tickets/new` |
| See status of my request | Employee | `/tickets/my`, `/tickets/[id]` |
| Incoming requests clearly assigned | Staff | `/tickets/queue`, assign action |
| Queue of my open tickets | Staff | `/tickets/queue` (assigned to me) |
| Summary of open, delayed, resolved tickets | Manager | `/manager/summary` |
| Workflow reflects real support states | All | Status enum + `StatusEvent` audit trail |

---

## 4. Non-Functional Requirements (Implementation Constraints)

- **Simplicity:** Minimal UI; no admin configuration screens in v1.
- **Adoption friction:** Reuse session auth; no separate account system.
- **Performance:** Ticket create and status update should feel instant at internal volume.
- **Reliability:** Never silently drop a submission — persist before returning success; surface errors to the user.
- **Security:** Role-based access enforced on every API route and page (see Section 7).
- **Scalability:** Single Postgres instance is sufficient for v1.

---

## 5. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth (credentials for v1; SSO later if available) |
| Styling | Tailwind CSS |
| Deployment | Node-compatible host (Vercel, Docker) — not a v1 build concern |

---

## 6. Roles

| Role | Capabilities |
|---|---|
| `EMPLOYEE` | Create tickets; view own submitted tickets |
| `STAFF` | View unassigned queue + own assignments; assign tickets; update status |
| `MANAGER` | View all tickets; access summary dashboard (read-only on ticket detail) |

---

## 7. Permissions Matrix

| Action | Employee | Staff | Manager |
|---|---|---|---|
| Create ticket | ✓ | ✓ | ✓ |
| View own tickets | ✓ | ✓ | ✓ |
| View unassigned queue | — | ✓ | ✓ |
| View any ticket | — | ✓ (assigned or unassigned) | ✓ (all) |
| Assign ticket | — | ✓ | — |
| Update ticket status | — | ✓ (assigned or unassigned) | — |
| Manager summary | — | — | ✓ |

Enforce in `/lib/permissions.ts` and call from every API handler before mutating or returning data.

---

## 8. Data Model (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // hashed; credentials auth only for v1
  role      Role     @default(EMPLOYEE)
  createdAt DateTime @default(now())

  submittedTickets Ticket[] @relation("SubmittedTickets")
  assignedTickets  Ticket[] @relation("AssignedTickets")
}

enum Role {
  EMPLOYEE
  STAFF
  MANAGER
}

model Ticket {
  id           String        @id @default(cuid())
  title        String
  description  String
  category     Category
  status       TicketStatus  @default(OPEN)
  submitter    User          @relation("SubmittedTickets", fields: [submitterId], references: [id])
  submitterId  String
  assignee     User?         @relation("AssignedTickets", fields: [assigneeId], references: [id])
  assigneeId   String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  statusEvents StatusEvent[]

  @@index([status])
  @@index([assigneeId])
  @@index([submitterId])
}

enum Category {
  IT
  HR
  FACILITIES
  OTHER
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

model StatusEvent {
  id         String        @id @default(cuid())
  ticket     Ticket        @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  ticketId   String
  fromStatus TicketStatus?
  toStatus   TicketStatus
  changedBy  String?       // userId who made the change
  changedAt  DateTime      @default(now())

  @@index([ticketId])
}
```

---

## 9. API Contract

### `POST /api/tickets`

Create ticket. **Auth:** any authenticated user.

```json
// Request
{ "title": "string", "description": "string", "category": "IT" | "HR" | "FACILITIES" | "OTHER" }

// Response 201
{ "id": "...", "status": "OPEN", "assigneeId": null, ... }
```

### `GET /api/tickets`

List tickets filtered by role:

- **Employee:** `submitterId = session.user.id`
- **Staff:** `assigneeId = session.user.id OR assigneeId IS NULL`
- **Manager:** all tickets

Query params (optional): `status`, `category`

### `GET /api/tickets/[id]`

Single ticket with `statusEvents` ordered by `changedAt`. Enforce view permission before return.

### `PATCH /api/tickets/[id]`

**Staff only** for mutations.

```json
// Assign
{ "assigneeId": "user-cuid" }

// Status change
{ "status": "IN_PROGRESS" }

// Both in one request allowed
{ "assigneeId": "...", "status": "IN_PROGRESS" }
```

On status change: validate transition, update ticket, insert `StatusEvent`, call `notify()`.

On assign only: update `assigneeId`, call `notify('assigned', ticket)` — no `StatusEvent` unless status also changes.

---

## 10. Folder Structure

```
/app
  /(auth)/login/page.tsx
  /dashboard/page.tsx              # role-aware redirect
  /tickets/new/page.tsx            # submission form (Employee+)
  /tickets/my/page.tsx             # employee's own tickets
  /tickets/queue/page.tsx            # staff queue
  /tickets/[id]/page.tsx           # detail + status/assign controls
  /manager/summary/page.tsx        # manager dashboard
  /api/auth/[...nextauth]/route.ts
  /api/tickets/route.ts
  /api/tickets/[id]/route.ts
/lib
  auth.ts
  db.ts
  permissions.ts
  notifications.ts                 # notify(event, ticket) stub
  ticket-transitions.ts            # valid transition map
/prisma
  schema.prisma
  seed.ts                          # 3 users: EMPLOYEE, STAFF, MANAGER
```

---

## 11. UI Requirements (Minimal v1)

### `/tickets/new` — Submission form

- Fields: title (required), description (required), category (dropdown, required)
- Submit → redirect to `/tickets/my` or ticket detail
- Show validation errors inline

### `/tickets/my` — Employee status view

- Table: title, category, status, createdAt, updatedAt
- Link to detail page

### `/tickets/queue` — Staff queue

- Two sections or tabs: **Unassigned** | **Assigned to me**
- Columns: title, category, status, submitter, createdAt
- Row actions: Claim (self-assign), Open detail

### `/tickets/[id]` — Ticket detail

- Read-only: title, description, category, submitter, assignee, status, timestamps
- Staff controls: assignee dropdown (staff users), status dropdown (valid next states only)
- Status history timeline from `statusEvents`

### `/manager/summary` — Manager dashboard

- Four count cards: Open, In Progress, Resolved, Closed
- Simple table of all open + in-progress tickets (title, assignee, age)
- No advanced filters in v1

### `/dashboard`

- Redirect by role: Employee → `/tickets/my`, Staff → `/tickets/queue`, Manager → `/manager/summary`

---

## 12. Build Order (Staged Execution Plan)

**Rule:** Do not start a stage until the previous stage is working end-to-end. Stage 0 is satisfied by Section 1 defaults.

### Stage 1 — Core Ticket Flow

*Maps to execution plan Stage 1; Jira HDL-2 (HDL-11/12/13)*

1. Scaffold Next.js + Prisma + Postgres; run migration with schema above.
2. NextAuth credentials login; seed 3 test users.
3. `POST /api/tickets` — create with `OPEN`, no assignee.
4. `/tickets/new` submission form.
5. Manual assignment via `PATCH /api/tickets/[id]` (`assigneeId`).
6. Status transitions with `StatusEvent` logging; `ticket-transitions.ts` validation.

**Stage 1 done when:** Employee can submit; staff can assign and move a ticket through all four states; events are auditable.

### Stage 2 — Working Views

*Maps to execution plan Stage 2; Jira HDL-3 (HDL-14/15)*

7. `/tickets/queue` — unassigned + assigned-to-me lists with actions.
8. `/tickets/my` — employee list of own tickets.
9. `/tickets/[id]` — detail page with status history.

**Stage 2 done when:** Staff and employees can use the system day-to-day without API calls.

### Stage 3 — Visibility & Notifications

*Maps to execution plan Stage 3; Jira HDL-4 (HDL-16/17)*

10. `/manager/summary` — counts by status + open workload table.
11. `notify(event, ticket)` in `/lib/notifications.ts` — log to console or in-app toast for `assigned` and `resolved`; keep interface swappable.

**Stage 3 done when:** Manager sees live counts; assign/resolve triggers notification hook.

### Stage 4 — Deferred (Post-v1)

*Jira HDL-5 — do not build*

- Self-service / knowledge base
- SLA automation and escalation
- Advanced reporting
- Automated multi-channel intake

---

## 13. Suggested Cursor Prompts (Phase by Phase)

### Prompt 1 — Scaffold + Stage 1

> Read `HelpDesk_Lite_Cursor_Implementation_Guide.md`. Scaffold a Next.js 14 App Router project with TypeScript, Prisma, PostgreSQL, NextAuth (credentials), and Tailwind. Implement **Stage 1 only**: User and Ticket models, seed script (one EMPLOYEE, one STAFF, one MANAGER), login page, `POST /api/tickets`, `/tickets/new` form, `PATCH /api/tickets/[id]` for manual assignment and status transitions with `StatusEvent` audit log. Use the transition rules in Section 1. Do not build queue, my tickets, manager summary, or notifications yet. Stop and show the working create + assign + status flow.

### Prompt 2 — Stage 2

> Continue HelpDesk Lite. Implement **Stage 2**: `/tickets/queue` (staff), `/tickets/my` (employee), `/tickets/[id]` detail with status history. Enforce the permissions matrix in Section 7 on all routes. Role-aware `/dashboard` redirects.

### Prompt 3 — Stage 3

> Continue HelpDesk Lite. Implement **Stage 3**: `/manager/summary` with status counts and open workload table; add `notify()` stub called on assign and resolve. Do not add anything from Stage 4.

---

## 14. Definition of Done (v1)

- [ ] Employee can submit a ticket and see status updates on `/tickets/my`.
- [ ] Staff can see unassigned tickets, claim one, and move it through `OPEN → IN_PROGRESS → RESOLVED → CLOSED`.
- [ ] Manager can see live counts by status on `/manager/summary`.
- [ ] Every status change is recorded in `StatusEvent` (auditable).
- [ ] Role permissions enforced on all pages and API routes.
- [ ] No Stage 4 features built.
- [ ] Stage 0 assumptions documented in README or demo notes.

---

## 15. Risks to Watch During Implementation

| Risk | Mitigation |
|---|---|
| Over-structuring (too many fields, config screens) | Stick to Section 1 defaults; reject scope creep in prompts |
| Meaningless states | Use exact four-state model; log every transition |
| Low adoption (heavy UX) | Minimal forms and tables; no training required |
| Ownership ambiguity | Unassigned queue visible to all staff; explicit assign action |
| Building before decisions | Section 1 defaults are explicit — don't block on stakeholder meetings |

---

## 16. Success Metrics (Post-Launch — Not Build Targets)

Track after v1 ships; do not implement analytics dashboards in v1:

- % of requests via HelpDesk Lite vs. informal channels
- Time from submission to first assignment
- Time from submission to resolution
- Reduction in clarification back-and-forth per ticket
- Manager visibility satisfaction (qualitative)

---

## 17. Quick Reference — Sequence

| Stage | Focus | Blocked by |
|---|---|---|
| 0 | Decisions (use Section 1 defaults) | — |
| 1 | Intake, states, manual assignment | Stage 0 |
| 2 | Staff queue + employee status views | Stage 1 |
| 3 | Manager summary + notifications | Stage 2 |
| 4 | Self-service, SLAs, analytics | Post-v1 product decision |
