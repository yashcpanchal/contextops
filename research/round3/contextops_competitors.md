# ContextOps competitors in YC (S25-F26) and a16z Speedrun (SR001-SR007)

Date: 2026-10-13. Scope: all 1,210 YC companies and 321 Speedrun companies.

## 1. Method and caveats
- A python regex sweep (`scripts/comp.py`, `scripts/comp2.py`) ran over one_liner + desc + tags for all 1,210 YC companies. It used terms such as token spend, FinOps, ROI, engineering intelligence, DORA, governance, audit, R&D credit, capitalization, standup, Claude Code, Cursor, Copilot, code review and observability. The first pass gave 188 hits, mostly noise. A second, tighter pass plus a name list followed. The same terms ran over the 321 Speedrun descriptions. I read every plausible match.
- Traction came from WebFetch of each company's site (pricing, named customers). The HN helper was used for Launch HN reception.
- Caveats:
  - `desc` is truncated to 600 characters, so some overlap is missed.
  - YC team_size values are tiny (0-10) and say little. isHiring is mostly False.
  - **No YC or Speedrun company in this set states ARR for the ContextOps wedge.** The only "backed by YC" evidence on most sites is a logo.
  - Nothing could be checked for Launch HN on any direct competitor. Searches for Mentlio, Carrot Labs/SuperPenguin, Codag, Quotient, Taxnova, Mesmer, cubic, Sazabi and Stage returned no Launch HN post. Adjacent YC launches did show up (see section 3E). Treat reception as [unverified/none found].

## 2. Direct overlap with ContextOps (spend, ROI, cost) in the newest batches

| Company | Batch | Team / hiring | What it sells | Traction evidence |
|---|---|---|---|---|
| **Mentlio** (mentlio.com) | Summer 2026 | 0 / no | "Engineering intelligence and token optimization". Dashboards (Overview, Productivity, People, Savings) that tie AI spend to delivery per engineer, plus ML routing, context compression and log compression to "cut ~30%". Slack/Teams digests. | Demo/free audit only. No pricing, no customers, no ARR, no named team. YC logo only. **Closest replica of the ContextOps pitch (spend-to-delivery plus savings).** |
| **Carrot Labs / SuperPenguin** (superpenguin.ai) | Winter 2026 | 2 / no | "AI cost management": attribution of API spend by customer, feature and team, unified bill, **"Coding ROI: cost per merged PR" via a Mac app + GitHub** for Cursor, Claude Code and Codex. Copilot not mentioned. | **Public pricing**: Free (up to $2K managed), $30/mo (up to $5K), $200/mo (up to $20K), Enterprise $20K+. No named customers. Self-serve and cheap. Close overlap with the ContextOps mid-market, self-serve positioning. |
| **Codag** | Summer 2026 | 1 / no | Gateway that compresses tool output (20-30% fewer tokens) and offers "govern and see analytics on agent dollars across providers". | Pricing: PAYG ~$0.50/GB, **Team $499/mo**, 14-day pilot. No customers. |
| **Quotient Labs** ("Fermat's Last Token") | Winter 2026 | 2 / no | Wrapper for Claude Code, "47% less cost". | **$20/mo, or 10% of savings**. No customers. Self-run benchmark. |
| **Conifer** | Summer 2026 | 4 / no | Least-cost routing, "70%+ token spend" reduction. | No evidence found. |
| **Compresr** | Winter 2026 | 3 / no | Context compression API. | None found. |
| **Orchestra** | Summer 2026 | 2 / no | Distils your LLM traces into small models, "cut LLM costs 100x". | None found. |
| **Papaya** | Fall 2026 | 3 / no | Optimizes agent efficiency from traces (context bloat, chatty subagents). | None found. |
| **Rindler/Maxxwell** | Summer 2026 | 2 / no | IDE for running many agents ("tokenmaxxers"). | Tiny. Adjacent. |
| **Allowance** | Spring 2026 | 1 / no | Spend control for agents buying things (cards). | Not coding spend. Name collision only. |

Reading: the "cut the token bill" angle is now a YC micro-category. At least 5 YC companies sell it (Mentlio, Quotient, Conifer, Codag, Compresr). Two of them (Mentlio, Carrot Labs) also add the "spend to delivery" dashboard. This is exactly the ContextOps story. **None shows named customers or ARR.**

## 3. Adjacent overlaps (modules and round-2 ideas)

### A. Engineering-org intelligence and managed transformation
- **Mesmer** (Spring 2025, 7 people, hiring). "Operating system / agentic factory for your engineering org". It maps code, tickets, CI and incidents to find bottlenecks, then **its own engineers implement the fixes** in your repos with your approval. It integrates GitHub, Linear, Jira, Slack and Datadog.
  - The site shows 6 logos (Rohlik, Fluency, Open, Koywe, Amicci, Duvo). It has one case study, Rohlik (>EUR 1B revenue, 100+ engineers, claimed +150% productivity, unverified).
  - It says "thousands of engineers across hundreds of teams" and SOC 2 Type II. No pricing, demo only.
  - **This is the strongest "engineering intelligence" signal in the batches**, and it sells outcomes through a service.
- **Memoir** (Spring 2026, 1 person). Explains what engineering shipped to everyone it affects. It is the status/EM-visibility idea, and round 1 already scored that low on AI-durability.
- **Glen** (Summer 2026, 1 person, hiring) and **Hyper** (Spring 2026, 2 people). Shared context and "company brain" layers that capture Claude Code, Codex and Cursor sessions.
  - Glen shows 6 logos, which may be design partners. Hyper's Launch HN got **79 points / 78 comments**.
  - Sentra (SR006, 12 people) and Alike (SR006, 8 people) are the same pattern on Speedrun.
  - These are context and memory, not spend.

### B. Code review, provenance, risk (AI-code quality)
- **cubic** (Spring 2025, 6 people, hiring). AI code review.
  - **Public per-seat pricing**: Free, $30, $79, $160 per developer per month, plus Enterprise with audit logs. Named customers: n8n, Cal.com, Better Auth, Browser Use, Granola, Resend, Daytona, Firecrawl.
  - It is the clearest example of a paying, self-serve dev-tool buyer in these batches.
- **Stage** (Spring 2026, 2 people). Code review for AI-generated PRs.
- **Canary** (Winter 2026, 2 people). AI QA. Its pitch cites "customer-facing incidents up 43% YoY" from AI coding. **Launch HN: 58 points / 26 comments.**
- **TesterArmy, QualGent, PreMan (SR007), Elu (SR007)** are QA and self-healing.
- **Inth** (Spring 2026) monitors PRs for privacy issues and turns them into evidence. It is a tiny version of the compliance-evidence idea.
- **Graphify** (Summer 2026, 1 person). Open-source code graph with a claimed 116K GitHub stars, which is [unverified: I did not confirm it]. Its enterprise layer reviews PRs. The site shows no paid plan.

### C. Agent observability and governance
- **Sazabi** (Spring 2026, 10 people), **Superlog**, **Lemma**, **TraceRoot**, **AgentCat (SR007)** are observability for agents or production, not for coding-agent spend.
- **Agentic Fabriq, Multifactor, Alter, truthsystems, TectoAI, Golf, Salus, Canary** cover agent identity, permissions, audit and governance.
  - They target agents inside products, not engineering-org AI-code evidence.
  - None is specific to SOC 2 segregation-of-duties for AI-approved PRs.
- **Agent Relay** (Fall 2026), **Omnara** (Summer 2025; Launch HN S25 **147 points / 161 comments**), **Superset** (Launch HN P26 **108 points / 135 comments**), **Emdash, Linzumi, Replicas** are orchestration, control planes and IDEs for agent fleets.
  - **This is where developer attention is.** It is not about spend.

### D. Capitalization and R&D credit from engineering data
- **Taxnova** (Speedrun SR006, 5 people). It turns Jira, GitHub, docs and Slack into evidence-backed **R&D tax and CapEx** documentation.
  - Named customers: incident.io, causaLens, Augment. Augment reportedly "unlocked $500K in R&D credits" (a headline on the vendor's own site).
  - It is live in the US, UK, Canada, France and Spain, with Xero/QuickBooks/NetSuite integrations. No pricing, demo only. Its SOC 2 claims are inconsistent.
  - **This is the only company in the batches that already sells the "engineering data to finance evidence" module with named customers.** It does not mention AI token or seat spend, and I did not verify whether it handles it [unverified].
- Finance and audit AI firms (Billow, Arden, Denki, Bead, Oxus, Moby) are not engineering-specific.

### E. EM tools (1:1s, standup)
- No YC or Speedrun company targets EM 1:1s or status as its core. Only Memoir and Scott AI come near it.
  - Scott AI (Fall 2025, 3 people, hiring) is a planning layer for teams using coding agents.
- The absence matches the round-1 finding that Atlassian and Lattice give this away.

## 4. Conclusions

**1. How crowded is the exact wedge?**
- **Crowded at the idea level, empty at the traction level.** In the Winter 2026 to Summer 2026 batches, at least 7 YC companies pitch some form of AI spend visibility or reduction for coding or agents.
  - Two (Mentlio, Carrot Labs) pitch nearly the same "spend to delivery, cross-provider" story, with Carrot Labs already priced at $30-200/mo and self-serve.
  - Five more sell "cut the token bill" as a product. They are tiny (1-4 people) and have no named customers.
- Cross-vendor measurement plus approval-gated actions (seats, caps) is not claimed by any of them. Their "action" is compression and routing, which acts on the traffic, not on seats and governance.
- Round 2 already found incumbents (DX, Jellyfish, Faros, Datadog, Weave) and first-party vendor caps. Adding a wave of YC clones raises price pressure and lowers the chance a standalone "cost dashboard" is a company.
- Fall 2026 (the current batch) has only one near-hit, Papaya (agent efficiency), so the wave may be peaking.

**2. Where does traction show up, and what does it say about what buyers pay for?**

| Rank | Company | What it sells | Why it is the strongest evidence |
|---|---|---|---|
| 1 | cubic | Per-seat AI code review | Public per-seat pricing, 8+ named customers |
| 2 | Mesmer | Managed service delivering engineering outcomes | Named customers, SOC 2, enterprise sales |
| 3 | Taxnova | R&D tax and CapEx evidence for engineering orgs | Named customers, claimed $500K credit |

- Evidence is vendor-side and self-reported.
- No cost-dashboard company has named customers or ARR. Buyers are demonstrably paying for:
  - review and quality (cubic);
  - outcomes, with someone doing the work (Mesmer);
  - money recovered or compliance evidence tied to a finance or tax event (Taxnova).
- Nobody here is shown paying for "see your AI spend". That also matches round 2's gap: "no public source shows a buyer saying 'I'd pay $X' for a standalone tool". The new batches do not close that gap. They add pricing pages at $30-499 that look more like prosumer or SMB price points than a $50K+ budget.
- Developer attention (HN points) goes to orchestration and IDEs: Omnara 147, Superset 108, Hyper 79, Canary 58. None of the spend companies got a Launch HN, which is a weak negative demand signal.

**3. Recommended sharpening or pivot**
- **Do not lead with "AI coding FinOps dashboard" or "cut your token bill".** That space is where five or more YC teams are racing to the bottom. They bundle compression and routing, and Datadog and the vendor consoles keep absorbing the features.
- **Keep ContextOps as the cross-vendor attribution layer, but make the finance and evidence module the lead wedge, sold to a Controller/VP Finance plus VP Eng.**
  - Money is paid when spend ties to a finance event: the Deloitte DART capitalization point already in STRATEGY §15b, SOC 2 evidence for AI-approved changes, and R&D credit.
  - Taxnova shows named customers will pay for engineering-data-to-finance evidence. It does not appear to cover AI spend, so there is room next to it [unverify: read their product docs and talk to a customer].
  - Position ContextOps as AI spend-to-project attribution for capitalization, R&D credit and audit packets. The savings finder (seat and limit actions) becomes the secondary hook.
  - This also avoids the YC cohort's wedge, since none of the 7 spend companies mention capitalization, controllers or audit packets.
- **Evidence still missing, so the next 90 days of interviews matter more than more desk research:**
  1. Do controllers or CPAs at 50-300 engineer companies pay for AI-spend attribution? The first 5 interviews should be Controllers and tax advisors, not VP Eng.
  2. Is Taxnova open to a partnership (or already doing this)? Contact incident.io or Augment finance contacts.
  3. Price test against Carrot Labs ($30-200) and Codag ($499). A $6/seat/month model is above SMB self-serve, so the pitch must be the audit and finance deliverable, not the dashboard.
- **Fallback if finance interviews fail:** pivot toward the code-review and provenance side (cubic proves seat-based payment), for example an AI-authorship and approval-evidence layer for SOC 2. That area has Inth and cubic's audit logs as the only partial overlap. It scored 52 in round 2.

## 5. Source URLs
- mentlio.com, superpenguin.ai, codag.ai, quotientlabs.com, mesmer.co, taxnova.ai, tryglen.com, graphify.com, cubic.dev (all fetched 2026-10-13).
- HN: Launch HN Superset (YC P26), Hyper (YC P26), Canary (YC W26), Omnara (YC S25), found through the rsearch helper.
- Local: `data/*.jsonl`, `data/speedrun_all.csv`, `scripts/comp.py`, `scripts/comp2.py`, `scripts/yc_hits.txt`.
