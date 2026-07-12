# HelpDesk Lite — Internal Support Ticketing Workspace
## 1. Objectives

Give the internal support process one clear, structured place to live instead of scattering requests across email, chat, and informal follow-up.

Version 1 objectives:
- Make request intake consistent so nothing gets lost between channels.
- Give every request a clear owner as soon as it enters the system.
- Give employees visibility into the status of their own requests.
- Give managers a simple view of open, delayed, and completed work.
- Reduce repeated back-and-forth clarification before work actually starts.
- Keep the system lightweight and easy to adopt — not an enterprise platform.

**Core problem:** Requests currently arrive through too many informal channels, so ownership is unclear, follow-up is inconsistent, and managers have no reliable visibility into workload.

**Intended outcome:** A single, structured ticketing workspace where a request can be submitted, assigned, tracked, and resolved without relying on informal chasing.

---

## 2. User Stories

- As an **employee**, I want to submit a support request in one place, so that I don't have to guess which channel to use.
- As an **employee**, I want to see the status of my request, so that I don't need to ask for updates manually.
- As a **support/operations staff member**, I want incoming requests to be clearly assigned, so that I know what I'm responsible for.
- As a **support/operations staff member**, I want a queue of my open tickets, so that I can prioritize my work.
- As a **manager**, I want a summary view of open, delayed, and resolved tickets, so that I can understand team workload at a glance.
- As a **product/operations stakeholder**, I want the workflow to reflect real support states, so that reporting is meaningful.

---

## 3. Functional Requirements

**Likely in scope for v1 (ready to move forward):**
- Ticket creation form (title, description, category, submitter).
- Basic ticket states (e.g., Open → In Progress → Resolved → Closed) — exact states TBD, see Open Questions.
- Manual or rule-based assignment of a ticket to a support staff member.
- Ticket list/queue view per staff member.
- Basic status visibility for the employee who submitted the request.
- Manager-facing summary view (counts by status, simple filters).
- Basic notifications on status change (e.g., ticket assigned, ticket resolved).

**Likely out of scope for v1 (candidates for later versions):**
- Automated routing/AI-based ticket categorization.
- Full knowledge base / self-service deflection content.
- SLA automation and escalation rules.
- Advanced reporting/analytics dashboards.
- Multi-channel intake automation (auto-converting email/chat into tickets).

---

## 4. Non-Functional Requirements

- **Simplicity:** UI and workflow should be learnable without training; avoid unnecessary configuration.
- **Adoption friction:** Login/access should reuse existing internal accounts where possible (exact auth approach TBD).
- **Performance:** Ticket creation and status updates should feel instant for normal internal usage volumes.
- **Reliability:** No silent loss of submitted tickets — this is the core trust requirement of the product.
- **Scalability:** Should comfortably support current internal request volume; heavy scale is not a v1 concern.
- **Security:** Only authorized staff can view/update tickets; employees should only see their own requests unless given manager visibility.

---

## 5. UX/UI Design
- A simple **submission form** (employee-facing).
- A **queue/list view** for support staff (their assigned tickets).
- A **status view** for employees (their own submitted tickets).
- A **summary/dashboard view** for managers (counts, simple breakdown by status).
---

## 6. Metrics

Early candidate success metrics (to be refined with stakeholders):
- % of requests submitted through HelpDesk Lite vs. informal channels (adoption).
- Average time from submission to first ownership/assignment.
- Average time from submission to resolution.
- Reduction in repeated clarification messages per ticket.
- Manager-reported visibility satisfaction (qualitative, early on).

---

## 7. Assumptions

- Internal teams are willing to move away from email/chat once a simpler alternative exists.
- Support/operations staff are the primary handlers of tickets; complex multi-team routing is not needed in v1.
- Existing internal identity/accounts can be reused for login.
- Ticket volume is low-to-moderate (internal company scale, not customer-facing scale).

---

## 8. Open Questions / Unresolved Decisions

- What fields are mandatory at submission time (category, priority, attachments)?
- What exact ticket states should the workflow use?
- How is ownership assigned — manual pick, round robin, or category-based rules?
- What exactly should managers be able to see (team-wide vs. category-wide)?
- Should any self-service/help-content element be part of v1, or fully deferred?
- What counts as "resolved" vs. "closed" — do we need both states?

---

## 9. Risks

- Building too much structure too early could reintroduce the complexity the company explicitly wants to avoid.
- Unclear ticket states could make manager reporting meaningless if adopted too early.
- Low adoption risk if the tool feels heavier than just messaging someone directly.
- Ambiguity in ownership rules could recreate the "unclear ownership" problem the project is meant to solve.

---

## 10. Timeline (Draft — Staged Delivery View)
| Stage | Focus | Depends on |
|---|---|---|
| Stage 0 | Finalize ticket states, required fields, ownership rules | Stakeholder decisions (Section 8) |
| Stage 1 | Ticket creation + basic states + manual assignment | Stage 0 |
| Stage 2 | Staff queue view + employee status view | Stage 1 |
| Stage 3 | Manager summary view + notifications | Stage 2 |
| Stage 4 (later) | Self-service/knowledge base, SLA rules, reporting | Product decision post-v1 |
