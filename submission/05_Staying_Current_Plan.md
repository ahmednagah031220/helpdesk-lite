# Staying Current Plan — HelpDesk Lite team

**Purpose:** Avoid stale assumptions about what AI coding tools can do (models, agents, IDE integrations, Prisma/Next.js APIs). Check trusted sources **before** relying on a capability in delivery.

---

## Cadence

| When | What we do |
|---|---|
| **Before adopting a new AI capability** (e.g. “agent can run migrations safely”, “model knows Prisma 7 adapters”) | Read the official docs for that tool/version; spike on a throwaway branch |
| **Weekly (during active delivery)** | 15-minute check: tool release notes + one framework doc that we depend on |
| **When something fails oddly** | Assume our mental model may be stale; verify against docs + runtime evidence before “prompting harder” |
| **Before Stage gate (1→2→3)** | Reconfirm out-of-scope items so new model suggestions don’t quietly expand v1 |

---

## Trusted sources (check at least one official source)

| Area | Primary official / trusted source | Why |
|---|---|---|
| Cursor product behavior | [Cursor Docs](https://cursor.com/docs) | Authoritative for agent/IDE capabilities and limits |
| Next.js App Router / auth patterns | [Next.js Documentation](https://nextjs.org/docs) | Avoid outdated `pages/` or deprecated middleware advice |
| Prisma Client / adapters (we use Prisma 7 + `@prisma/adapter-pg`) | [Prisma Docs — Client setup](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction) | Prisma 7 requires driver adapters; blogs often still show `new PrismaClient()` alone |
| NextAuth / Auth.js | [Auth.js Docs](https://authjs.dev) | Session/JWT callback shapes change across majors |
| Security of AI-assisted code | Team review + OWASP ASVS mindset for authz | Docs don’t replace permission review |

**Minimum rule:** Before relying on an AI claim like “PrismaClient works without an adapter,” open the **Prisma docs for the installed major version** and confirm.

---

## Anti-patterns we avoid

- Treating a chat answer as proof that a tool feature exists.
- Copying Stack Overflow snippets for Prisma/Next without checking the version we pin in `package.json`.
- Letting AI “helpfully” add Stage 4 features (SLA, AI routing) because a newer model suggested them.

---

## Owner

Any engineer pairing with AI on HelpDesk Lite owns a quick doc check for the library they touch; tech lead spot-checks at stage reviews.
