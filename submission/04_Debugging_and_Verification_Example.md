# Debugging and Verification Example — HelpDesk Lite

## Scenario

**Bug / risk:** Seed `StatusEvent` rows could credit the **wrong actor** when `changedBy: "staff"` was used on a ticket that already had an assignee.

**Why it matters:** Manager and staff trust depends on an honest audit trail. Even mock data that lies about who changed status trains bad assumptions for demos and tests.

**Related:** https://github.com/ahmednagah031220/helpdesk-lite/issues/1

---

## Investigation approach

1. **Reproduce the logic path (not guess).**  
   Read the resolver:

   ```ts
   step.changedBy === "submitter"
     ? submitter
     : (assignee ?? userByEmail["staff@helpdesk.local"]);
   ```

2. **Compare against the type contract.**  
   Type allows `"submitter" | "assignee" | "staff"` — three meanings, two code paths → mismatch.

3. **Trace impact.**  
   - If `assignee` is present and `changedBy === "staff"` → stores assignee id (wrong).  
   - If no assignee → falls back to staff (accidentally “correct” for staff, wrong for the intended distinction).

4. **Check whether production API has the same bug.**  
   Evidence: `PATCH /api/tickets/[id]` sets `changedBy: user.id` from the authenticated staff session — **different code path**. Seed-only defect; no need to roll back ticket APIs.

---

## Evidence used

| Evidence | What it showed |
|---|---|
| Type definition in `seed.ts` | `"staff"` is a first-class actor value |
| Ternary implementation | `"staff"` and `"assignee"` share one branch |
| Issue write-up + code citation | Bug is deterministic, not flaky |
| API route review | Live ticket updates not affected |
| Grep of fixtures | Most fixtures use `"submitter"`/`"assignee"` today — latent bug still real for any `"staff"` step |

---

## Verification after fix

- Code review of explicit branches (submitter / assignee / staff).
- Confirm `"staff"` always selects `staff@helpdesk.local`.
- Merge only after human accept; tracked in PR #2.

---

## Final decision

| Option | Chosen? | Why |
|---|---|---|
| **Keep** | **Yes** | Fix is minimal, correct, and verified against the type contract |
| Revise | No | No further product change needed |
| Reject | No | Bug was real; leaving it would poison audit demos |
| Roll back | No | No bad production API deploy; seed fix is forward-only |

**Decision: Keep** the fix after evidence-based review.
