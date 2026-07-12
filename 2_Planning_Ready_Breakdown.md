# Planning-Ready Breakdown
## HelpDesk Lite — Internal Support Ticketing Workspace

## Main Work Areas

1. **Ticket Intake** — how a request enters the system.
2. **Ownership & Assignment** — how a ticket gets a responsible owner.
3. **Ticket Lifecycle / States** — how a ticket moves from submission to resolution.
4. **Staff Experience** — how support staff see and manage their work.
5. **Employee Experience** — how requesters track their own tickets.
6. **Manager Visibility** — how managers see workload and status across the team.
7. **Notifications** — how people stay informed without manually checking.

---

## First Layer of Breakdown

### 1. Ticket Intake
- Submission form (title, description, category, submitter).
- Field requirements (mandatory vs. optional) — *depends on unresolved decision*.

### 2. Ownership & Assignment
- Manual assignment (staff pick up or get assigned a ticket).
- Assignment rule logic (manual vs. round robin vs. category-based) — *depends on unresolved decision*.

### 3. Ticket Lifecycle / States
- Core states: Open → In Progress → Resolved → Closed (draft).
- Exact state definitions and whether "Resolved" and "Closed" are distinct — *depends on unresolved decision*.

### 4. Staff Experience
- Queue/list view of assigned tickets.
- Ability to update status.

### 5. Employee Experience
- View of "my tickets" and their current status.

### 6. Manager Visibility
- Summary view: counts by status, simple filters.
- Scope of visibility (team-wide vs. category-wide) — *depends on unresolved decision*.

### 7. Notifications
- Status-change notifications (e.g., assigned, resolved).

---

## What Looks Ready to Move Forward

- Basic ticket creation form and submission flow.
- Draft ticket state model (Open → In Progress → Resolved → Closed), even if final naming is pending.
- Manual assignment as the v1 mechanism (simplest, matches "lightweight" constraint).
- Staff queue view and employee status view — core structure is well understood.
- Basic status-change notifications.

## What Still Depends on Unresolved Decisions

- Final mandatory/optional field list for the submission form.
- Whether assignment stays fully manual or needs light rules (e.g., by category).
- Final ticket state definitions, especially Resolved vs. Closed.
- Exact scope of manager visibility (own team only, or broader).
- Whether any self-service/help-content element belongs in v1.
