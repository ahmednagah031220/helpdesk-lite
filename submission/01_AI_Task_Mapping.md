# AI Task Mapping — HelpDesk Lite

**Purpose:** Decide which engineering tasks should use AI, should not use AI, or may partially use AI — with a short reason for each.

**Sources:** `1_Requirement_Framing.md`, `2_Planning_Ready_Breakdown.md`, `3_Initial_Execution_Plan.md`, `HelpDesk_Lite_Cursor_Implementation_Guide.md`

---

## Legend

| Decision | Meaning |
|---|---|
| **Use AI** | AI drafts/implements; human reviews before merge |
| **Partial AI** | AI proposes options or scaffolding; human owns the final rule or judgment |
| **Do not use AI** | Human decides or executes; AI would add risk or invent product truth |

---

## Mapping by work area

| Engineering task | Decision | Reason |
|---|---|---|
| Stage 0 product decisions (fields, states, assignment rules, manager scope) | **Do not use AI** | These are stakeholder product calls. AI inventing “defaults” without labeling them as assumptions recreates ownership ambiguity. |
| Writing PRD / framing / execution plan from known notes | **Partial AI** | AI can structure and draft; humans must confirm scope, non-goals, and open questions. |
| Implementation guide / Cursor prompts from finalized Stage 0 defaults | **Use AI** | Mechanical synthesis of an already-decided spec into a build checklist. |
| Next.js + Prisma scaffold, folder layout, boilerplate UI | **Use AI** | High repetition, low product risk when constrained by the guide. |
| Ticket status transition rules (`OPEN → … → CLOSED`) | **Partial AI** | AI can draft a transition table; humans must validate against product meaning of Resolved vs Closed. |
| Role permissions matrix (employee / staff / manager) | **Partial AI** | AI can draft from the PRD; humans verify security boundaries before shipping. |
| Ticket create / assign / status API handlers | **Use AI** | Clear contract in the implementation guide; easy to verify with requests and seeds. |
| Staff queue / my tickets / manager summary pages | **Use AI** | View wiring from known data model; review for role leaks. |
| Manual assignment UX (claim / assign dropdown) | **Use AI** | UI + PATCH wiring; no AI routing logic (routing itself is out of scope). |
| Automated / AI ticket categorization or routing | **Do not use AI** | Explicitly out of scope for v1; would fight the “lightweight” goal. |
| Choosing auth strategy for production SSO | **Do not use AI** | Org/security decision; credentials are a temporary build default only. |
| Seed / mock data content | **Use AI** | Speeds demo realism; humans spot-check role and status coverage. |
| Seed audit attribution logic (`StatusEvent.changedBy`) | **Partial AI** | AI can write seed helpers; humans must verify actor semantics (submitter vs assignee vs staff). |
| Security review of “who can see which ticket” | **Do not use AI as sole judge** | Requires human threat thinking; AI can list checks but not own the accept decision. |
| Writing tests / smoke scripts for create → assign → resolve | **Use AI** | Good fit once flows are defined. |
| Deciding keep / revise / reject / roll back on a bugfix | **Do not use AI** | Final call is human judgment with evidence. |
| SLA automation / knowledge base / analytics dashboards | **Do not use AI (for v1 build)** | Deferred Stage 4; don’t let AI expand scope. |

---

## Summary rule

Use AI for **scaffolding and implementation against a written contract**.  
Use partial AI when **rules look like code but encode product meaning**.  
Do not use AI for **Stage 0 decisions, scope expansion, or final acceptance of security/ownership behavior**.
