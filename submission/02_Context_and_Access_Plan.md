# Context and Access Plan — HelpDesk Lite

**Purpose:** For each AI interaction type, define the minimum context the model should see. Avoid dumping the whole repo or secrets.

---

## Access levels

| Level | What AI may see | Typical use |
|---|---|---|
| **A — Prompt only** | Human-written goal + constraints; no repo files | Framing, “should we use AI?”, keep/reject decisions |
| **B — Single file** | One file + short surrounding note | Fix a helper, tweak a form, adjust a transition map |
| **C — Small set (2–5 files)** | Related module slice | API route + permissions + transitions |
| **D — Module / folder** | e.g. `web/app/api/tickets/**`, `web/lib/**` | Implement a feature end-to-end within Stage N |
| **E — Docs only** | PRD / framing / plan / implementation guide | Planning prompts before coding |
| **F — Runtime evidence** | Test output, curl/API JSON, logs, failing assertion | Debugging and verification |
| **Never** | `.env`, passwords, production data, unrelated Stage 4 ideas | Secrets and scope creep |

---

## Per interaction plan

| AI interaction | Needed access | Why this level | Explicitly excluded |
|---|---|---|---|
| Decide Stage 0 defaults for build | **A + E** | Product docs only; no code yet | App source, DB |
| Draft Cursor implementation guide | **E** | Synthesis of existing planning docs | Full `web/` tree |
| Scaffold Next.js + Prisma schema | **E + D (`web/` scaffold)** | Guide + empty project structure | Secrets; production DB |
| Implement ticket status transitions | **C** (`ticket-transitions.ts`, ticket PATCH route, schema enums) | Enough to keep transitions consistent | Unrelated UI pages |
| Implement permissions checks | **C** (`permissions.ts`, ticket routes, role enum) | Security-sensitive; keep blast radius small | Seed content, styling |
| Build `/tickets/new` form | **C** (form component, POST route, Category enum) | Form contract is local | Manager dashboard |
| Build staff queue + employee my-tickets | **D** (`app/tickets/**`, `components/TicketTable*`) | Shared list patterns | Auth internals unless broken |
| Fix seed `changedBy` attribution bug | **B → C** (start with `seed.ts`; add types only if needed) | Bug is local; avoid rewriting all mock tickets | Live customer data |
| Debug “staff sees wrong ticket” | **C + F** (permissions + failing API response) | Evidence before changing auth | Guessing without response body |
| Write PR description / issue text | **A + short diff** | Communication, not code generation | Full history dump |
| Propose SLA / AI routing features | **A only (then stop)** | Out of scope for v1 | Do not open implementation access |

---

## Practical Cursor / agent rules used on this project

1. Start from `HelpDesk_Lite_Cursor_Implementation_Guide.md` (docs), not from “build a helpdesk.”
2. Prefer **one stage at a time** (Stage 1 → 2 → 3).
3. For bugfixes, open the **failing file first**; expand context only if the cause is unclear.
4. Always keep `.env` out of prompts and commits; use `.env.example` for shape only.
5. After AI edits permissions or transitions, human re-reads those files before merge.

---

## Example: minimum context for Stage 1 ticket API

**Give AI:**

- Implementation guide sections: data model, API contract, transition rules
- Files: `prisma/schema.prisma`, `lib/permissions.ts`, `lib/ticket-transitions.ts`

**Do not give AI:**

- Manager summary UI
- Seed story content
- Deployment credentials
