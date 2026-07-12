# Walkthrough video — script and sharing note

## Video link (paste your recording URL here)

**TODO — replace this line with your public video URL after recording:**

> `PASTE_PUBLIC_VIDEO_LINK_HERE`  
> Examples: unlisted YouTube, Google Drive link set to “Anyone with the link”, Loom.

Reviewers need **open viewing permission** (no login wall if possible).

---

## 2–3 minute script (Easy submission)

### 0:00–0:20 — Case and goal
“This is HelpDesk Lite, an internal ticketing workspace. I’m submitting the Easy track. I’ll show where AI helped, where it’s risky, and how the workflow protects quality.”

### 0:20–0:50 — Where AI helps
Show briefly:
- Implementation guide + staged build (docs in repo root / `submission/01_AI_Task_Mapping.md`)
- Scaffolding Stage 1–3 UI/API against a written contract
Say: “AI is good for scaffolding when Stage 0 decisions are written down.”

### 0:50–1:20 — Where AI is risky
Call out:
- Stage 0 product decisions (states, ownership) — humans only
- Permissions / who can see tickets — AI drafts, humans accept
- Out-of-scope AI routing — we refuse it for v1  
Open `submission/01_AI_Task_Mapping.md` on screen.

### 1:20–1:50 — Workflow protection
Walk `submission/03_AI_Coding_Workflow.md`:
1. Frame the task  
2. Limit context  
3. Plan before code  
4. Human reviews plan  
5. Implement small diff  
6. Verify  

Mention the real seed `changedBy` bug (Issue #1 / PR #2) as the example.

### 1:50–2:20 — Debugging with evidence
Open `submission/04_Debugging_and_Verification_Example.md`.  
“We didn’t guess — we compared the type to the ternary, checked the API path, then **kept** the fix.”

### 2:20–2:45 — Staying current
Open `submission/05_Staying_Current_Plan.md`.  
“Before trusting a tool claim, we check official docs — e.g. Prisma client setup / Cursor docs.”

### 2:45–3:00 — Close
“AI never replaces Stage 0 judgment or the keep/revise/reject decision. That’s how Day 1 planning and Day 2 build stay aligned.”

---

## Recording tips
- Share browser with GitHub `submission/` folder visible.
- Speak the decision words: **keep / revise / reject / roll back**.
- Keep under 3 minutes.
