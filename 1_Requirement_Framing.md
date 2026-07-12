# Requirement Framing
## HelpDesk Lite — Internal Support Ticketing Workspace
## Core Problem

Internal support and service requests currently move through email, chat, and informal follow-up. This creates delays, duplicated requests, unclear ownership, inconsistent updates, and repeated back-and-forth clarification before a problem is even assigned. Managers also lack a reliable way to see what's open, delayed, or resolved.

## Intended Outcome

A lightweight, structured internal ticketing workspace where a request can be submitted, assigned, tracked, and resolved in one place — without relying on informal chasing across channels. Version 1 should make ownership, status, and progress visible, without becoming a heavy enterprise platform.

## Scope Boundaries (In Scope for v1)

- A single intake point for support requests (replacing scattered email/chat submissions).
- Clear ticket ownership from the moment a request enters the system.
- A basic, meaningful set of ticket states (e.g., Open → In Progress → Resolved → Closed).
- A queue/list view for support staff to see what they own.
- A status view for employees to check their own requests.
- A summary view for managers (counts by status, simple filters).
- Basic notifications on status change.

## Non-Goals (Explicitly Out of Scope for v1)

- Automated or AI-based ticket routing/categorization.
- Full self-service knowledge base content.
- SLA automation and escalation rules.
- Advanced analytics/reporting dashboards.
- Automated multi-channel intake (auto-converting email/chat into tickets).

## Unresolved Questions

- What fields are mandatory at submission (category, priority, attachments)?
- What exact ticket states should the workflow use?
- How is ownership assigned — manual pick, round robin, or category-based rules?
- What exactly should managers be able to see (team-wide vs. category-wide)?
- Should any self-service/help-content element be part of v1, or fully deferred?
- What counts as "resolved" vs. "closed" — do we need both states?

## Major Risks

- **Over-structuring too early:** adding process/complexity now could reintroduce the overhead the company wants to avoid.
- **Meaningless reporting:** if ticket states aren't clearly defined, manager visibility becomes unreliable.
- **Low adoption:** if the tool feels heavier than just messaging someone directly, employees may keep using informal channels.
- **Ownership ambiguity carried forward:** unclear assignment rules could recreate the exact problem this project is meant to solve.
