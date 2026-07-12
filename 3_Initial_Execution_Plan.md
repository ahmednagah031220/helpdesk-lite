# Initial Execution Plan
## HelpDesk Lite — Internal Support Ticketing Workspace
---

## Staged Plan

### Stage 0 — Decisions Before Build
**Goal:** Resolve the open questions blocking safe planning.
- Finalize required submission fields.
- Finalize ticket states (confirm Resolved vs. Closed).
- Decide assignment approach (manual vs. rule-based).
- Decide manager visibility scope.
- Decide if any self-service element belongs in v1.

**Depends on:** Stakeholder input (product/operations + engineering).
**Should not start yet:** Any UI build, since fields/states aren't final.

---

### Stage 1 — Core Ticket Flow
**Goal:** Make a request submittable, stateful, and ownable.
- Build submission form using finalized fields.
- Implement core ticket states.
- Implement manual assignment.

**Depends on:** Stage 0 decisions being finalized.

---

### Stage 2 — Working Views
**Goal:** Let staff and employees actually use the system day-to-day.
- Staff queue/list view (assigned tickets).
- Employee "my tickets" status view.

**Depends on:** Stage 1 (ticket model must exist first).

---

### Stage 3 — Visibility & Notifications
**Goal:** Close the loop on manager visibility and reduce manual follow-up.
- Manager summary view (counts by status, basic filters).
- Status-change notifications.

**Depends on:** Stage 2 (views and states must be stable first).

---

### Stage 4 — Deferred (Post-v1)
**Goal:** Only pursue once v1 is adopted and stable.
- Self-service/knowledge base content.
- SLA automation and escalation rules.
- Advanced reporting/analytics.
- Automated multi-channel intake.

**Depends on:** Product decision after v1 usage data is available.

---

## Sequence Summary

| Stage | Focus | Blocked By |
|---|---|---|
| 0 | Finalize open decisions | Stakeholder input |
| 1 | Core ticket flow (intake, states, assignment) | Stage 0 |
| 2 | Staff + employee views | Stage 1 |
| 3 | Manager visibility + notifications | Stage 2 |
| 4 | Self-service, SLAs, analytics (later) | Post-v1 decision |

---

*Nothing in Stage 1 onward should start until Stage 0 decisions are made — building on undefined ticket states or fields would create rework and reintroduce the exact ambiguity this project is meant to remove.*
