# AI Coding Workflow — HelpDesk Lite (real task)

**Task chosen:** Fix incorrect `StatusEvent.changedBy` attribution in the seed script when `changedBy` is `"staff"` on an assigned ticket.

**Why this task:** It is a real Day-2 quality defect found after Stage 1–3 were running. It shows plan-first coding, bounded context, human review, and a verified keep decision.  
**Tracker:** Issue https://github.com/ahmednagah031220/helpdesk-lite/issues/1 · PR https://github.com/ahmednagah031220/helpdesk-lite/pull/2

---

## 1. Task framing

**Problem:** In `web/prisma/seed.ts`, `"assignee"` and `"staff"` were handled by the same ternary branch. If a ticket had an assignee, a `"staff"` actor was incorrectly stored as the assignee’s user id.

**Goal:** Make `"submitter"`, `"assignee"`, and `"staff"` resolve to distinct users.

**Out of scope:** Changing the live ticket PATCH API, redesigning mock ticket stories, adding new seed users.

**Success criteria:** Resolver branches are explicit; `"staff"` always maps to the default staff user even when `assigneeId` is set.

---

## 2. Context given to AI

| Included | Excluded |
|---|---|
| `web/prisma/seed.ts` (focus on `StatusStep` + `changedByUser` resolution) | Entire `app/` UI tree |
| Type definition: `changedBy: "submitter" \| "assignee" \| "staff"` | `.env`, database dump |
| Short bug description (ternary collapses staff/assignee) | Unrelated PRs |

Access level: **B (single file)** expanding to **C** only if types elsewhere referenced the helper.

---

## 3. AI plan before coding (reviewed)

Proposed plan AI was expected to follow:

1. Confirm the type allows three distinct actor values.
2. Replace the ternary with explicit `if / else if / else` (or switch).
3. `"submitter"` → submitter; `"assignee"` → assignee with staff fallback; `"staff"` → default staff user.
4. Do not rewrite all ticket fixtures unless a fixture uses `"staff"` incorrectly.
5. Keep seed idempotent behavior (delete/recreate tickets) unchanged.

---

## 4. Human review of the plan

**Accepted** because:

- Matches the stated type contract.
- Small blast radius (seed only; runtime audit path for real tickets was already correct via API `changedBy: user.id`).
- Easy to verify by inspection and optional re-seed.

**Rejected alternatives:**

- Removing `"staff"` from the type (hides the product distinction).
- Always using assignee for every non-submitter event (recreates the bug).

---

## 5. Implementation approach

Human-approved edit in `web/prisma/seed.ts`:

```ts
const staffUser = userByEmail["staff@helpdesk.local"];
let changedByUser;
if (step.changedBy === "submitter") {
  changedByUser = submitter;
} else if (step.changedBy === "assignee") {
  changedByUser = assignee ?? staffUser;
} else {
  // "staff" — a staff actor, not necessarily the ticket assignee
  changedByUser = staffUser;
}
```

---

## 6. Diff / review notes

- Diff touched only the actor-resolution block inside seed history mapping.
- Review checklist:
  - [x] Three branches exist
  - [x] `"staff"` does not prefer `assignee`
  - [x] No secret material introduced
  - [x] Issue #1 linked; PR labeled `bug`

---

## 7. Checks

1. **Static:** Read the resolver; confirm `"staff"` path ignores assignee when present.
2. **Optional runtime:** Add a fixture with `changedBy: "staff"` on an assigned ticket, run `npm run db:seed`, query `StatusEvent.changedBy` vs assignee id.
3. **Regression:** Existing fixtures using only `"submitter"` / `"assignee"` still seed successfully.

**Final decision:** **Keep** (merged via PR #2).
