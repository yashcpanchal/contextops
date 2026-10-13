# ContextOps: Strategy & Go-to-Market Document

**FinOps for AI coding: find and fix AI-coding waste, team by team.**

Version 1.0, 2026-10-13. This document was produced overnight by a multi-agent research pipeline: Sonnet researchers, Opus evaluators and an Opus integrator. Raw evidence is in `research/` (index in the Appendix). Sources: every claim below traces to a file in `research/`, where the URLs are. Claims tagged *[vendor]* come from a company with a commercial interest. Claims tagged *[assumption]* must be validated in customer discovery.

---

## 0. TL;DR

- **The problem.** AI coding spend became the fastest-growing, least-governed line in engineering budgets in 2026. Gartner predicts AI coding costs will exceed the average developer salary by 2028. Uber reportedly burned its 2026 AI-coding budget in ~4 months. Atlassian now issues $500-2,000/month "AI wallets" per engineer. The FinOps Foundation says 98% of FinOps teams now manage or expect to manage AI spend, up from 31% two years ago. Meanwhile 86% of engineering leaders are unsure which AI tools pay off (DX). The person who absorbs this mess is the **engineering manager**, who suddenly owns a token budget nobody taught them to manage.
- **The product.** ContextOps connects to Claude Code, Cursor, GitHub Copilot and Codex in 15 minutes. It unifies the bill, joins spend to outcomes (merged vs abandoned vs reverted PRs, tickets, epics), and then **acts**. It finds idle and duplicate seats, runaway agent sessions, top-tier models used on trivial tasks and spend on work that never shipped. It proposes approval-gated fixes and gives every EM a team-level budget copilot in Slack. It has no per-person leaderboards, by design.
- **Who we sell to.** Software companies with 20-300 engineers that run 2+ AI coding tools and have no engineering-intelligence suite (DX/Jellyfish are sales-led at ~$50-95K/yr). The economic buyer is the VP Eng/CTO. The champion is the Head of Platform/DevEx. The daily user is the EM.
- **Why us, why now.** Every incumbent reports and none of them acts across vendors for the mid-market:
  - DX, Jellyfish, Larridin and Swarmia are reporting-only. Larridin even says "a projected-overage alert is not an enforced spending cap."
  - Datadog is the only one with savings recommendations, and it covers Cursor only.
  - Faros enforces only through an enterprise gateway.
  - Nobody forecasts AI cost per epic.
- **Business model.** Free open-source collector, then Team at $6 per active AI user per month, or a savings share on verified savings. The long-term pricing indexes to governed AI spend, so our revenue grows with the fastest-growing cost line in software.
- **Honest risk.** In our scoring, this idea won (56/100) but did not dominate. The category is forming fast and first-party consoles keep improving. Our wedge must be proven in 90 days with 5 design partners, against the explicit kill criteria in §12.
- **Built so far:** the research corpus, the 10-idea scoring, this strategy, a working localhost MVP (`app/`) and a 2-slide pitch deck.

---

## 1. How we got here (the process)

We started from the founders' instinct: engineering managers are time-starved. At Visa, the founder's manager had little time and did not know what his project was. The team's first feature idea was ticket-level cost estimation based on agentic coding behavior and employee efficiency.

**Phase 1, the evidence sweep.** Six research tracks covered:
- Reddit, mined through public JSON and an archive API, with ~60 searches and ~2,200 posts/comments analysed;
- Hacker News;
- engineering-leadership newsletters and surveys;
- the competitor landscape;
- AI-era pains;
- manager/IC visibility.

X/Twitter could not be mined: search returned no tweets and the mirrors are blocked. This is a known gap.

**Synthesis.** We produced 10 candidate ideas. Each was scored by an independent Opus evaluator on a weighted rubric: demand 20, sellable 20, AI-durability 20, evidence 15, buyer 10, feasibility 15.

| Rank | Idea | Score |
|---|---|---|
| 1 | **AI Spend-to-Outcome Ledger (FinOps for AI coding)** | **56** |
| 2 | Review-capacity orchestrator | 52 |
| 3 | AI-PR comprehension / provenance | 48 |
| 3 | Flow & dependency risk radar | 48 |
| 5 | Consent-based impact ledger (perf/promo evidence) | 47 |
| 6 | True Cost of Delivery (the original idea, reframed) | 46 |
| 6 | Evidence-linked status autopilot | 46 |
| 8 | Manager Memory / team context engine | 45 |
| 8 | Agent governance & audit (regulated) | 45 |
| 10 | Human+agent work router | 38 |

**Key lesson from scoring.** Every "summarize what my team did" product (status autopilot, manager memory, 1:1 prep, perf evidence) scored low on AI-durability:
- Atlassian shipped the Rovo Jira Delivery Agent (2026-07-27), which sends audience-specific status summaries with risk flags.
- Lattice gives away a 1:1 agent and evidence-based review drafts.
- Engineering managers already DIY this with Claude plus Jira/GitHub MCP connectors ("No more than 10 minutes max," says one r/EngineeringManagers reply).

These are features that general-purpose AI absorbs. **AI spend governance is the opposite: the more AI improves and spreads, the bigger the problem gets.**

**What happened to the original idea.** All six independent research tracks, and the Opus evaluator, reached the same verdict on standalone ticket-cost estimation:
- **No demand signal.** No one on Reddit, HN or in surveys asked for it.
- **Weak predictive accuracy.** Published story-point ML models rarely beat a median baseline, and Bai et al. 2026 found up to 30× token variance on the same agent task.
- **Calendar time is not coding time.** It is driven by handoffs and review. In the Reddit thread "My team shipped a two-week feature in four months" (104 upvotes), the top comment reads: "That 2 week feature would not have shipped faster if it was done in 4 days."
- **"Employee efficiency" scoring triggers surveillance backlash.** 54% of developers fear AI-based performance evaluation (Harness survey).

The idea is not dead, though. **It becomes our v2 feature, Epic Cost Forecast.** It is built honestly, on retrospective cost data that only ContextOps collects, and it outputs ranges (p10/p50/p90) at team and ticket-type level, never per person. The MVP includes a beta of it.

---

## 2. The problem

### 2.1 AI coding spend is exploding and ungoverned
- **Gartner** (press release, 2026-06-24): AI coding costs will surpass average developer salary by 2028. The causes are ungoverned agent autonomy, bloated context and no feedback loops. Peer Insights: 23% of leaders spend $200-500/dev/month, and 6% spend over $2,000.
- **Uber** reportedly exhausted its 2026 AI-coding budget in ~4 months and then capped spend at $1,500/employee/month/tool *[secondary reporting]*.
- **Atlassian** "AI wallets" are $500-2,000/month by role, warning near the limit and stopping at it (TNW, 2026-07-30).
- **Larridin benchmark** *[vendor]*: the median engineer bills ~$213/week (~$920/month) in AI coding tokens, and tokens are 2-10% of headcount cost, up ~10× in 6 months.
- **Pragmatic Engineer readers**:
  - "Some developers are now spending $500 a day (!!) on Claude Code."
  - "We have already had to raise our API budget limits multiple times in April."
  - "The initial plan to have strict limits (say, $100 per user) is breaking when reality hits."
- **Reddit r/EngineeringManagers** ("Is AI / token spend becoming a real problem inside companies?"):
  - "Our bill has doubled every month for 5 months. We're at about 60k a month right now. It's not sustainable… without provable ROI."
  - "I'm now pulled into all kinds of 'tokenomics' meetings."
  - "Finance flagged $40k/month in shadow spend."
- **HN**:
  - "Many enterprises, including mine, are starting to crack down on token spend… capping all engineers at $200 or $500/mo."
  - "We've had our AI budget per Engineer cut twice now since the peak mania in early 2026."

### 2.2 Nobody can connect spend to outcomes
- **DX** (275 leaders): 86% are unsure which tools provide the most benefit. 40% lack the data to build an ROI story.
- **Faros** *[vendor]*, 10K developers: +98% PRs and +91% review time, but "any correlation between AI adoption and key performance metrics evaporates at the company level."
- **METR RCT**: experienced developers were 19% slower with AI while believing they were 20% faster, so self-reported gains are unreliable.
- **Jellyfish** *[vendor]*: the heaviest spenders cost ~600× more for ~2× the output, and people default to the top model for everything.
- **FinOps Foundation Token Economics WG**: "Cost visibility is limited to what the vendor exposes." "Spend follows the same curve. Visibility does not."

### 2.3 Waste is real and has a shape
- **Idle seats:** Zylo *[vendor]* finds 32.3% of GitHub licenses unused. GitHub's own reporting looks back only 28 days.
- **Expensive models on trivial work:**
  - "Many devs are defaulting to the most expensive models without realizing."
  - "We are using that high-effort setting even for fairly trivial tasks" (Pragmatic Engineer).
  - The Claude Code docs say unexpectedly high spend "usually traces back to long sessions that were never cleared or to Opus left as the default model."
- **Runaway loops:** up to 30× token variance on identical tasks (Bai et al., arXiv 2604.22750). "The dangerous spend isn't the engineer at the keyboard. It's the unattended loop."
- **Work that never ships:** 21.6-26.1% of agent PRs are closed unmerged, across ~42K PRs in two studies.
- **Tokenmaxxing:** engineers burn tokens to hit usage metrics. Meta's internal "Claudeonomics" leaderboard was gamed and then pulled.
- **Analogue:** mature cloud-FinOps programs save 20-30% of spend *[secondary]*. Our working hypothesis is that **15-25% of AI-coding spend is addressable** *[assumption to validate]*.

### 2.4 The EM is where it lands, and the EM has no tools
- EMs are already overloaded. Gallup's average span of control grew from 10.9 to 12.1 in a year. "An EM feels like it's five jobs squashed into one" (Reddit).
- Token budgets are a *new* EM responsibility (Pragmatic Engineer; Atlassian wallets; an HN commenter describes a $200 cap with self-bump then manager approval).
- Engineers fear being punished. "What is my budget, and will I be punished for exceeding it?" is the IC side of the question. Metrics backlash ranked #2 of 11 themes in our Reddit/HN corpus (171 matching items).
- This connects back to the founder's original insight. Managers lack leverage, and in 2026 the newest, most stressful, least-tooled part of the job is the AI budget.

---

## 3. Why now
1. **Pricing shifted to metered.** Copilot moved to AI-credit billing (2026-06-01), Cursor uses pooled usage and Claude Code charges usage-based overage, so seat-based budgeting broke.
2. **Agents run unattended.** Background agents, scheduled loops and subagent fan-out create spend with no human watching.
3. **Finance noticed.** CFOs and boards ask "what did we get for the AI spend?" The FinOps Foundation went from 31% to 98% in two years.
4. **Admin APIs now exist.** Every vendor shipped admin, usage and OTel endpoints in 2025-2026, so a third party can finally see and act (see `research/phase2/technical.md`).
5. **Incumbents went up-market.** DX was bought by Atlassian (~$1B) and Jellyfish averages ~$95K ACV. That leaves the 20-300 engineer segment under-served.

---

## 4. The product

### 4.1 One sentence
ContextOps is an agent that watches your AI-coding spend across every vendor, ties it to what actually shipped, and fixes the waste with your approval, while giving every EM a budget copilot that never ranks their engineers.

### 4.2 Core features (MVP, must-have to sell)

| # | Feature | Why it matters (evidence) |
|---|---|---|
| C1 | **Cross-vendor connectors and a normalized ledger**: Claude Code (Admin Analytics API, OTel), Cursor Admin API, Copilot seats/billing APIs, OpenAI usage/costs, plus CSV import | "Cost visibility is limited to what the vendor exposes" (FinOps WG) |
| C2 | **Team attribution** (GitHub teams/CODEOWNERS/IdP groups → cost centers) with a k-anonymity floor (no team view under 5 people) | Chargeback is the #2 question leaders ask |
| C3 | **Seat audit**: inactive (30d), duplicate-tool, downgradable tiers → one-click *proposed* release | The one fully verifiable saving; Copilot seat removal API verified |
| C4 | **Model-mix audit**: top-tier model on small tasks → recommended default per team | "defaulting to the most expensive models" |
| C5 | **Runaway-session and loop detector** (event-level, not person-level) | 30× variance; unattended loops |
| C6 | **Spend-to-outcome join**: cost per merged PR, abandoned- and reverted-PR spend, per team | "More spend should mean better outcomes. If not, we are doing something wrong." |
| C7 | **Budgets and pacing**: team budgets, month-end projection, soft alerts, request-more approval flow | Hard caps break; the wallet pattern works (Atlassian) |
| C8 | **EM weekly digest** in Slack or email (2-minute read) | EMs won't adopt another dashboard |
| C9 | **Savings recommendations with $ formulas** and approval-gated fixes, plus an audit log with undo | "Act, don't report" is the white space |
| C10 | **Finance export** (chargeback CSV, FOCUS-style columns) | FinOps buyers need invoice alignment |
| C11 | **Trust page and engineer self-view**: metadata only, no prompts or code, no leaderboards | Surveillance is the #1 adoption risk |

### 4.3 Accessory features (v2+)
- **A1. Epic Cost Forecast**: p10/p50/p90 AI cost per epic from the org's own history (the founders' original idea, done right). MVP ships a beta.
- **A2. Gateway mode** (LiteLLM / Claude apps gateway) for hard enforcement and Bedrock/Vertex coverage.
- **A3. Routing policy engine** (task size → model), delivered as Claude Code managed settings.
- **A4. Renewal negotiation pack**: usage by tier, cut list, benchmarks.
- **A5. Anonymized peer benchmarks** ("your cost per merged PR vs similar teams"). This is also a marketing asset.
- **A6. Review-debt coupling**: cost vs rubber-stamped merges (folds in the #2-ranked idea).
- **A7. Engineer wallet app**: own meter plus request-more.
- **A8. Agent-suitability insights**: which ticket types agents land cheaply (folds in idea #10).

### 4.4 What we will NOT build (and say so loudly)
- Per-person leaderboards or productivity scores.
- Prompt or code ingestion.
- Ticket estimates presented as commitments.
- A generic "AI summary of what my team did" (a commodity; Atlassian/Lattice/Claude own it).

### 4.5 The savings catalogue (what the agent finds)
Each recommendation shows its formula, an estimated low/high monthly $ figure, a confidence tag, and Identified → Accepted → Realized tracking (full formulas in `research/phase2/features_voice.md` §5.4).

| Code | Recommendation | Executable via API? |
|---|---|---|
| R1 | Reclaim inactive seats | Copilot yes; Cursor Enterprise yes; otherwise propose |
| R2 | Consolidate duplicate tools | Propose |
| R3 | Downgrade seat tier | Propose |
| R4 | Shift model default to mid-tier for small tasks | Managed-settings PR |
| R5 | Lower effort/thinking settings for routine work | Managed-settings PR |
| R6 | Runaway-loop guard | Settings + alert |
| R7 | Kill idle scheduled tasks | Alert + owner action |
| R8 | Cache-aware session hygiene | Advisory |
| R9 | CLAUDE.md and MCP diet | Lint PR |
| R10 | Subagent model downshift | Managed settings |
| R11 | Abandoned-PR prevention (plan mode, smaller scopes) | Advisory |
| R12 | Plan arbitrage (seat vs usage plan) | Propose |
| — | Per-user AI-credit budgets with hard stop | Copilot budgets API (verified) |

---

## 5. Who we sell to

### 5.1 Ideal customer profile (ICP)
- Software company or tech-forward business with **20-300 engineers**, typically Series A-D.
- Pays for **2+ AI coding tools**: ~70% of Pragmatic Engineer readers use 2-4 *[skewed sample]*.
- AI-coding spend of **$10K-$250K/month**.
- **GitHub** for code; Jira or Linear for tickets.
- **No DX/Jellyfish/Faros contract.**
- A named person accountable for AI spend, or a recent "surprise bill" moment.

### 5.2 Personas

| Persona | Role | Trigger | Objection we must beat |
|---|---|---|---|
| VP Eng / CTO | Economic buyer and signer (and champion under ~100 engineers) | Surprise bill, CFO/board ROI question, vendor renewal, move to metered billing | "Native consoles are free" → native consoles are single-vendor, mostly Enterprise-tier, and only report |
| Head of Platform / DevEx | Champion and operator | Asked to build chargeback or a gateway; maintains the spreadsheet | "We can build it in a sprint" → covered in §7 |
| Finance / FinOps | Co-owner of the budget line | Unattributable "AI" line at month-end close | "Must tie to invoices" → reconcile against cost_report / chargedCents |
| Engineering Manager | Daily user | Told their team is over budget; approves limit bumps | "Surveillance" → team-level only, no leaderboards, engineer self-view |

**Deal shape:**
- Keep ACV under ~$10K to stay on a credit card and out of procurement.
- Read-only keys first, to delay the security review.
- Action keys are added later, scoped narrowly.

### 5.3 Beachhead
Venture-backed startups with 30-150 engineers, reached through founder/alumni networks and engineering-leadership communities. These are the companies where the CTO personally sees the bill. Second ring: 150-300 engineer companies with a Platform/DevEx team and a FinOps owner.

---

## 6. Market size

**Seat view (conservative, from gtm.md):**
- ~1.69M US software developers (BLS). We assume 25% sit in 20-300-engineer orgs, giving **~6,000 US companies** (~15,000 global) *[assumption]*.
- SAM: those with 2+ paid tools, admin-API plans and no SEI suite, **~1,470 US companies**.
- At ~$6K ACV that is US TAM ≈ $36-40M and SAM ≈ $9M.

**Spend-indexed view (the venture case, Opus integrator's analysis).** The seat view prices us like a dashboard. Our value scales with AI spend, which is the fastest-growing line item in engineering.
- At a conservative $250/engineer/month blended spend, a 70-engineer company spends **$210K/yr** on AI coding.
- At Larridin's ~$920/month median it spends **$770K/yr**.
- At 2-3% of governed spend (a typical FinOps take rate), ACV is **$4-23K**.
- If Gartner is even half right (AI coding cost approaching salary by 2028), per-engineer spend rises 10× and our revenue rises with it at zero extra sales cost.
- US 20-300-engineer orgs (~420K engineers) × $3K-11K/yr of AI spend per engineer is **~$1.3-4.6B of governable spend today**, so a 2% take rate is a **$25-90M** US opportunity growing with AI adoption.
- Up-market expansion (300-2,000 engineers, $30-50K ACV) and an API/data layer for other tools extend this.

**3-year SOM (plan):**

| Year | Paying customers | ARR |
|---|---|---|
| Y1 | 3-5 design partners | $15-25K |
| Y2 | 25-40 | $175-300K |
| Y3 | 80-120 | $0.6-1.2M |

Y3 rises toward $2M+ if spend indexing materializes.

**Honest note:** at the low end this is a strong seed-scale business, not obviously venture-scale. The venture case rests on (a) spend indexing, (b) moving up-market, and (c) becoming the neutral system of record for AI engineering cost. Investors will ask, so we say it first.

---

## 7. Competition and why we win

### 7.1 Landscape (detail in `research/phase2/competitive_gap.md`)

| Player | Cross-vendor | Outcome join | Acts (seats/limits) | Savings recs | Per-epic forecast | Self-serve | Mid-market price |
|---|---|---|---|---|---|---|---|
| DX (Atlassian) | ✓ | ✓ (aggregate ratio) | ✗ | ✗ | ✗ | ✗ | ✗ (~$54K median) |
| Jellyfish | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ (~$95K avg) |
| Faros | ✓ | partial | gateway (enterprise) | partial | ✗ | ✗ | ✗ |
| Larridin | ✓ | roadmap | ✗ ("not an enforced cap") | dormant seats | ✗ | ? | ✗ (from $25K) |
| Swarmia / LinearB / Weave | ✓/partial | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ |
| Datadog CCM | Cursor only | ✗ | ✗ | ✓ | ✗ | trial | ? |
| Vendor consoles | single vendor | Anthropic only | own tool, often Enterprise-only | ✗ | ✗ | ✓ | included |
| LiteLLM / Portkey | API path only | ✗ | ✓ (hard block) | ✗ | ✗ | partial | OSS |
| **ContextOps** | **✓** | **✓ (session-level where OTel)** | **✓ (approval-gated)** | **✓ (12+ types)** | **✓ (beta)** | **✓** | **✓** |

### 7.2 Our positioning
**"The others tell you what you spent. ContextOps gets it back."** We have three wedges that stack:
1. **Seat and limit autopilot.** This is verifiable, savings-linked value in week 1.
2. **Waste finder from outcome data.** It targets spend on abandoned or reverted PRs, runaway loops and model-fit. Session-level attribution through OTel beats DX's spend ÷ merged-PRs ratio, and it answers the "cost per merged PR hides exploration" critique.
3. **The EM budget copilot with a trust-first design.** This is the explicit opposite of Anthropic's leaderboard, Weave's per-engineer output score and Meta's Claudeonomics.

### 7.3 Why customers won't just build it themselves
- **Cross-vendor plumbing is perpetual maintenance.** There are five vendors and constantly changing billing models: Copilot AI credits, Cursor pooled usage and new Claude plan tiers. Every pricing change silently breaks an in-house script.
- **Attribution is a hard, specialised problem.** It needs an identity-resolution ladder (email ↔ GitHub ↔ Cursor ↔ OTel), probabilistic session→PR joins with confidence scores, and reconciliation against invoices.
- **Actions need guardrails.** Approval flows, audit logs, rollback, dry-run and per-action allowlists are not a sprint.
- **Neutrality.** No AI vendor will tell you to use less of its product or to move seats to a competitor.
- **Opportunity cost.** The Platform team that could build it is the team already drowning in AI rollout work. Teams do build gateway scripts (Atlassian, a Reddit commenter). We aim to be cheaper than one engineer-week per year.

### 7.4 Why it survives AI progress
- Better models **increase** agentic usage and spend. The problem grows with AI rather than being solved by it.
- The value lies in data access (admin keys, OTel), cross-vendor normalization, longitudinal outcome history and workflow position (approval loop, digest), not in LLM output.
- First-party vendors are structurally conflicted: they can show their own spend, but they won't recommend a competitor or a cheaper vendor.
- **Risk:** Atlassian/DX could bundle actions and push down-market. Our response is speed, self-serve, neutrality toward Atlassian, and the trust stance (§14).

---

## 8. Business model & pricing

| Tier | Price | For |
|---|---|---|
| **Open source** | Free. OSS `contextops` collector/CLI with a local savings report; hosted free ≤25 engineers, 1 tool, 30-day history | Distribution and trust (Infracost/Kubecost pattern) |
| **Team** | **$6 per active AI-tool user per month** (min $150/mo). Per *active user*, not per seat held, so we don't tax the waste we remove | 20-150 engineers; ~$5K/yr at 70 users; credit card |
| **Savings Share** (alternative) | $0 upfront; **15% of verified, realized savings** for 12 months, $150/mo floor after month 3. Applies only to mechanically verifiable savings (seats, plan changes, stopped overage vs baseline) | Design partners; "pays for itself" door-opener |
| **Business** | **$12 per active user per month** or **2% of governed AI spend** (whichever is greater); SSO, policy enforcement, Jira/Linear join, API; min $10K/yr | 150-300+ engineers, finance-led |

Revisit at 10 customers. If Savings Share closes faster and renews, make it the default. Spend-indexed pricing is the long-term model.

---

## 9. Go-to-market

### 9.1 Channels (in priority order)
1. **Founder, university and alumni networks.** VP Eng/CTOs at 20-300-engineer startups are the warmest source of the first 5 design partners. Include Visa-intern-cohort connections where appropriate.
2. **Open-source CLI / GitHub Action.** It posts "AI cost of this PR" as a comment (the Infracost pattern) and prints "you could save $X" locally. This is the top of the funnel.
3. **Communities.** These include the FinOps Foundation (Token Economics WG), Rands Leadership Slack, LeadDev, the Pragmatic Engineer audience, r/EngineeringManagers, r/ClaudeAI and r/cursor. Lead with data, not pitches.
4. **An anonymized benchmark report**, "What N teams spend on AI coding, and how much was wasted," published with design-partner permission. Original data earns coverage; Larridin's data page is the template.
5. **Show HN** with the OSS CLI. Many trackers got 1-3 points, so we need a vivid $-savings hook plus the benchmark.
6. **Outbound later.** "Free AI-spend savings analysis" offers to VP Eng at Series A-C companies (the nOps/ProsperOps hook).

### 9.2 First 90 days

| Days | Goal |
|---|---|
| 0-14 | 15-20 discovery interviews (script §12.2). Hand-build 5 "AI spend X-ray" reports from CSV exports. Recruit 5 design partners. Replace sizing assumptions with Census/LinkedIn counts. **Run the API-ceiling test:** what can actually be *set* via API on Cursor Teams, Claude Team/Console and Copilot Business. This decides the "acts" claim. |
| 15-45 | Ship the OSS collector v0 and hosted read-only v0 (the MVP in `app/` becomes this). Deliver a first savings report to each partner. Metric: $ of identified waste per partner. |
| 46-75 | PR join, Slack digest, approval-gated actions (Copilot seat release, budgets). Publish the benchmark. Show HN. |
| 76-90 | Convert partners (Team or Savings Share). Target 2-3 paying customers and 5+ qualified inbound leads. Evaluate the kill criteria. |

### 9.3 First 10 customers
1-5 are design partners from warm networks: 30-120 engineers, 2+ tools. 6-8 are inbound from the CLI, communities and the benchmark. 9-10 are referrals. Trade low early pricing for case studies and quote permission.

---

## 10. How we know there is a market (evidence summary)
- **Money is moving.**
  - DX was acquired for ~$1B.
  - Span raised $25M (Nov 2025).
  - Weave raised a $13.5M Series A (Jul 2026) to "kill tokenmaxxing".
  - CodeRabbit raised $60M.
  - Jellyfish, Faros, Larridin, Swarmia, LinearB, Harness, Finout, Vantage and Datadog all launched AI-spend modules in 2026.
  - Incumbents shipping into a space proves the budget line exists.
- **The pain is quantified and recent.** Gartner (Jun 2026), FinOps Foundation (98%), Uber, Atlassian wallets, DX's 86%, the Pragmatic Engineer reader reports, and Reddit/HN quotes from 2026.
- **The buyer has a trigger.** Metered billing, renewals and CFO/board scrutiny.
- **What is NOT yet proven:**
  - Willingness to pay for a standalone tool at 20-300 engineers. Show HN spend trackers got 1-3 points, and some leaders say "we are not throttling."
  - The real waste percentage.

These are exactly what the 90-day design-partner program tests (§12).

---

## 11. Technical architecture (detail in `research/phase2/technical.md`)
- **Production stack:** TypeScript, Next.js, Postgres (RLS per org), Inngest/pg-boss jobs, WorkOS/Clerk auth, KMS-encrypted credentials, Resend email, a Slack Bolt app, and an optional OTel collector.
- **Connectors (verified endpoints):**

| Vendor | Endpoints |
|---|---|
| Anthropic | `usage_report/messages`, `cost_report`, `usage_report/claude_code` (per user/day, `estimated_cost`); Claude Code OTel (`claude_code.cost.usage`, `claude_code.token.usage`, `session.id`, `user.email`, `vcs.*`, custom `OTEL_RESOURCE_ATTRIBUTES`) |
| Cursor | `/teams/members`, `/teams/daily-usage-data`, `/teams/spend`, `/teams/filtered-usage-events` (sum `chargedCents`), `/teams/user-spend-limit` (Enterprise) |
| GitHub Copilot | `/copilot/billing/seats` (`last_activity_at`), `DELETE /copilot/billing/selected_users`, `/settings/billing/ai_credit/usage`, `/settings/billing/budgets` (with `prevent_further_usage`) |
| OpenAI | `/v1/organization/usage/completions`, `/v1/organization/costs` |
| GitHub PRs | REST/GraphQL plus webhooks |
| Jira / Linear | issue-key regex in branch/PR title |

- **Attribution ladder** (each link stored with method and confidence):
  1. OTel `session.id` with a commit trailer;
  2. user + repo + time window (21 days before to 2 days after merge, mirroring Anthropic's method);
  3. ticket key in branch or title;
  4. otherwise "unattributed" as a visible line, never hidden.
- **Actions:** propose with evidence → one-click approve → execute → audit log with rollback payload. Dry-run by default. Never auto-remove seats without approval.
- **Security:** read-only by default, a separate scoped "actions" credential, metadata only (reject prompt/body events at the collector), and the SOC 2 path through Vanta/Drata (Type I in ~3-4 months).
- **Known API constraints** (from research):
  - Cursor limit and member-removal writes are Enterprise-only.
  - Anthropic per-member limit APIs are Enterprise-only.
  - Copilot actions are fully available.
  - On Team-tier plans we "recommend + one-click deep link" instead of executing.

### 11.1 The MVP we built tonight (`app/`)
A runnable Next.js app on localhost:3000 with a deterministic demo org ("Northwind Labs", 120 engineers, 8 teams, 3 tools, 90 days). It includes:
- the overview;
- team budget copilot pages;
- savings recommendations with formulas and apply/undo;
- the waste explorer;
- the seat audit;
- the Epic Cost Forecast (beta);
- the EM weekly digest;
- the audit log;
- the trust page;
- **real ingestion paths**: CSV import and a Claude Code OTLP/HTTP JSON receiver you can point a real Claude Code install at.

See `app/README.md`.

---

## 12. Validation plan

### 12.1 Design-partner program
5 partners with 30-200 engineers and 2+ tools.
- **We give:** 90 days free, a weekly waste report and founder access.
- **We get:** read-only keys, a weekly 30-minute call, an LOI to pay if savings exceed 5× the fee, and benchmark permission.

### 12.2 Interview script (ask about past behavior, not opinions)
1. Walk me through the last time someone asked what you spend on AI coding tools. Who asked, and what did you do?
2. Which tools and plans do you have, who owns each contract, and when do they renew?
3. What did you spend last month? How did you get that number, and how long did it take?
4. Have you had a surprise bill or a cap exhausted early? What happened next?
5. What controls exist today (caps, groups, cost centers, a gateway)? What's wrong with them?
6. How do you know which seats are unused? What have you done about it?
7. Does finance or the board ask for ROI or chargeback? What answer would satisfy them?
8. Would you build this, use vendor consoles, or buy? What have you evaluated, and why did you stop?
9. If a tool found $20K of avoidable spend in month one at no upfront cost, how would you want to pay? What number makes you walk away? Who approves, and what security review would it need?
10. Will you start a 90-day pilot next week and sign an LOI to pay if savings are proven?

### 12.3 Kill / pivot criteria (after 20 qualified interviews and 90 days)
- Fewer than 8 of 20 describe a spend problem from the last 90 days with a named owner.
- Fewer than 3 of 5 partners provide keys and meet weekly.
- Measured addressable waste is under 8% of spend, or under ~$10K/yr for a 70-engineer company.
- Fewer than 2 LOIs at ≥$3K/yr equivalent.
- 3 or more interviewees say native consoles or an SEI suite are "good enough" for reasons we can't change.
- A first-party cross-vendor release removes the gap.

**Pivot options:** up-market (300-2,000 engineers), or the #2/#5-ranked ideas (review-capacity orchestration) using the same data plumbing.

---

## 13. Roadmap (12 months)

| Quarter | Milestones |
|---|---|
| Q4 2026 | Interviews, API-ceiling test, 5 design partners, OSS collector v0, hosted read-only beta, first savings reports |
| Q1 2027 | PR join plus OTel session attribution, Slack digest, Copilot/Cursor actions, benchmark report, Show HN, first 3 paying customers |
| Q2 2027 | Jira/Linear epic join, Epic Cost Forecast GA (once there is ≥3 months of history per customer), renewal pack, SOC 2 Type I, 15 customers |
| Q3 2027 | Gateway mode, routing policy engine, peer benchmarks, Business tier, 30+ customers, seed round |

---

## 14. Trust & privacy principles (a product feature, not legal boilerplate)
1. The default unit is team, repo or workflow, never the person. Engineers see their own meter.
2. No ranking by tokens or dollars, anywhere. Outlier lists are of *events* (sessions, PRs, seats).
3. Every cost number is paired with an outcome, so cost is never the whole story.
4. k-anonymity floor: no team view under 5 people.
5. Wallets, not walls: soft warnings at 80%, a request-more flow, auto-expiring exceptions.
6. Metadata only. No prompts, no code, no file contents.
7. Never turn a metric into a target. Tokenmaxxing is the cautionary tale.

These directly answer the evidence: 54% of developers fear AI-based evaluation (Harness), LinearB is seen as "numbers they can use to backup a pip," and Cornell found that developmental framing removes the intrusiveness penalty of AI monitoring.

---

## 15. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Atlassian/DX, Jellyfish or Faros pushes down-market with actions | High | Speed, self-serve, a neutral and trust-first brand, and the OSS wedge. Position as complementary to Jira. Acquisition is a credible exit (DX, Kubecost, Graphite precedents). |
| Vendors restrict write APIs to Enterprise | Confirmed for Cursor and Anthropic | Recommend + deep link on Team tiers; Copilot actions work today; managed-settings PRs for Claude Code |
| Waste is <8% in reality | Medium | This is the explicit kill criterion; measure it in the first 5 partner audits |
| "We're not throttling AI" sentiment in 2026 | Medium | Lead with visibility, outcomes and budget pacing, not cuts. Savings are a bonus, and "spend smarter, not less." |
| Admin-key security objections | High | Read-only first, CSV-export mode, customer-hosted collector, SOC 2 path |
| Small ACV | High | Spend-indexed pricing, up-market path, PLG/OSS motion with no field sales |
| Estimates vs invoice mismatch | Medium | Reconcile against cost_report and chargedCents; show variance explicitly |
| Student team credibility with VP Eng | Medium | A warm network, design partners, a data-led benchmark and the open-source code |

---

## 15b. Round 2 validation: we looked for something better (2026-10-13)
The founders thought 56/100 was too low, so we ran a second, wider search before committing. Details are in `research/round2/` and `research/round2-scoring/SCORES_R2.md`.

**Scope.** 10 Sonnet scouts covered:
- incidents and AI SRE;
- migrations and legacy modernization;
- AI-era technical hiring and interview fraud;
- QA and verification;
- coding-agent fleet operations;
- specs and regulated traceability;
- knowledge continuity;
- outsourced-dev oversight and tech due diligence;
- 2025-26 money flow;
- direct Reddit demand mining.

4 deep-dives followed: engineering finance and capitalization, regulated-software evidence, hiring, and shadow AI-built apps. One more agent verified the AI-spend capitalization claims against primary sources. Then 10 new ideas plus a blind re-score of ContextOps went to independent Opus evaluators.

**Result.** Nothing beat ContextOps. Re-scored blind with fresh research, it got **58**, the highest of 31 ideas scored across both rounds. The next best ideas were:
- ContextOps + Finance: 57.
- Section G evidence via CPA firms: 54.
- AI-change compliance evidence, and repo-based hiring work samples: 52 each.

The scouts' own estimates were 5-16 points too optimistic. Independent evaluators kept finding incumbents that had already shipped.

**What changes in this strategy.**
1. **Platform framing.** Four evaluators independently said their idea was "best as a ContextOps module". ContextOps becomes the hub for *AI engineering operations*: spend, outcomes, risk and evidence for AI-written code. The roadmap modules, in order of evidence:

   | Module | Evidence | Buyer |
   |---|---|---|
   | **Finance evidence export** (AI-spend-to-project attribution for capitalization, plus an audit packet) | Deloitte DART, 2026-08-03: "A token-based charge is not capitalizable merely because it is measurable"; usage must be linked to identified projects through tickets and controls | Controllers at Series C+/PE-backed customers that already capitalize |
   | **AI change-escape ledger** (incidents per AI-authored PR, by tool and repo) | Amazon's reported senior sign-off rule for AI-assisted changes; Faros reports incidents per PR +14.5% | VP Eng |
   | **AI self-approval / segregation-of-duties evidence** | GitHub preview, 2026-09-01: Copilot approvals can count toward required reviews | SOC 2 / PCI customers |
   | **CI/agent waste ledger** | Agent-triggered CI reruns and flake cost | Platform teams |

2. **New demand evidence:**
   - **A failed in-house workaround:** "We built the nightly job to track coding agent spend and it only covers a third of the bill" (r/EngineeringManagers, a manager of ~40 developers).
   - **CFO attention:** "our token bill hit six figures and now the CFO cares" (r/EngineeringManagers, 277 upvotes).
   - **SAP finance:** caps, routing and tool cuts contained a "triple-digit-million-dollar financial risk", and "finance needs a paired view: cost metrics alongside value metrics".
   - **Money moving:** Weave raised $13.5M (Jul 2026) for AI-spend ROI, and Ramp named AI token spend a new spend category.
3. **Absorption is harder than we assumed in round 1.** Copilot (enterprise/cost-center/user budgets with auto-stop), Cursor (team/group/user limits) and Claude (Team/Enterprise caps and per-user reports) all shipped native spend controls in mid-2026. Vantage, CloudZero, Finout and Datadog track Cursor and Claude Code costs, and Stacklet sells "wallets". Our defensible core is narrower and sharper as a result: **the cross-vendor join of spend ↔ outcomes ↔ risk at PR/epic level, for companies with 20-300 engineers, with finance-grade exports.** Single-vendor caps are table stakes we integrate with, not compete against.
4. **Why the score can't go much higher from desk research.** Every visible budget in this space is contested, which caps "sellable" and "AI-durable". No public source shows a buyer saying "I'd pay $X" for a standalone tool, in any of the ~20 domains. The next points come from customer interviews, paid pilots and LOIs (§12). Of everything in this plan, that is the highest-leverage work.

## 15c. Round 3: what YC and a16z are funding right now (2026-10-13)
**Data.**
- All 1,210 YC companies, Spring 2025 to Fall 2026.
- All 321 a16z Speedrun companies (SR001-SR007).
- YC's Fall 2026 Requests for Startups.
- a16z main-fund theses.

**Who did it.** 6 Sonnet scouts, plus 4 Opus evaluators. Details: `research/round3/`, `research/round3-scoring/SCORES_R3.md`.

**Result.** Nothing beat ContextOps (58). These were tested:

| Idea | Score |
|---|---|
| Finance-first ContextOps | 54 |
| Chargeback across all of a company's AI usage | 48 |
| "Dependabot for APIs" (YC RFS #13, zero companies in 2026 batches) | 39 |
| Multiplayer agent sessions with manager visibility (YC RFS #4) | 37 |

That makes 35 ideas scored across three rounds.

**What the investor data told us, and what we changed:**
1. **Our category is now funded, but no one has shown traction.** About 8 YC W26/S26 companies sell "track or cut your AI token bill" (SuperPenguin at $0/$30/$200, Quotient, Codag at $499, Conifer and others). None shows a named customer or ARR. Factory, a coding-agent vendor, acqui-hired the closest look-alike, **Mentlio**, on 2026-10-09 (verified). → *We stop leading with "cut your token bill"; it is the most crowded and least proven slice.*
2. **The companies that do have traction sell evidence and outcomes.** Taxnova (a16z Speedrun) has named customers (incident.io, causaLens, Augment) for R&D-credit and CapEx evidence from Jira/GitHub. cubic (YC) has named customers for AI code review. → *We lead with the cross-vendor **outcome join** (what AI spend actually shipped, what it broke, and what it wasted), and we package the evidence.*
3. **Agent vendors are the absorbers.** Factory bought Mentlio, a16z advises AI vendors to ship chargeback themselves, and Copilot, Cursor and Claude have native caps. → *Our moat is being vendor-neutral. No agent vendor will report how its tool compares with its competitors on cost per merged PR, or on incidents per AI-authored PR.*
4. **The front door stays with VP Eng.** Leading with Finance scored lower: the controller sale is slow, and AI-token capitalization has no buyer voice yet. The finance packet is an add-on for customers that claim R&D credits or capitalize. A cross-vendor agent-session log linked to PRs becomes a feature, not a company.

**Updated one-line pitch:** *"The vendor-neutral scorecard for AI coding: which tools and agents actually ship for your money, which ones break things, and the evidence your CFO and auditors will ask for."*

## 16. What we need (the asks)
- **10 introductions** to VP Eng/CTOs at 20-300-engineer companies running Claude Code, Cursor and/or Copilot.
- **Access to a Cursor Teams and a Claude Team org** for the API-ceiling test.
- **Advisors:** one FinOps practitioner and one VP Eng.

---

## Appendix A: Research index
- `research/phase1/reddit.md`: Reddit evidence (verbatim quotes, upvotes, URLs).
- `research/phase1/reddit_hn_api.md`: a quantitative theme analysis of ~2,200 Reddit/HN items.
- `research/phase1/x_hn_blogs.md`: HN, newsletters, survey statistics, EM role trends.
- `research/phase1/competitors.md`: the SEI and AI-tool landscape, funding, consolidation.
- `research/phase1/ai_era.md`: new AI-era pains (review bottleneck, spend, security, estimation).
- `research/phase1/visibility_people.md`: manager↔IC visibility, perf reviews, surveillance backlash.
- `research/phase1/TOP10.md`: the synthesized top-10 ideas.
- `research/phase1-scoring/RUBRIC.md`, `idea01..10.md`, `SCORES.md`: Opus evaluations and the decision.
- `research/phase2/technical.md`: endpoints, attribution, data model, actions, security.
- `research/phase2/gtm.md`: personas, sizing, pricing, GTM, interview script, kill criteria.
- `research/phase2/competitive_gap.md`: the feature matrix and positioning options.
- `research/phase2/features_voice.md`: the customer voice, waste taxonomy, feature spec and savings formulas.

## Appendix B: Known research gaps
- X/Twitter could not be mined: search returned no tweets and the mirrors were blocked.
- Several statistics are vendor-sourced or secondary (marked). Gated primary reports were not opened: LeadDev 2026, the Jellyfish 2026 SEMR, the full Gartner reports.
- We have no count of companies with 20-300 engineers (use Census CBP / LinkedIn), and no credible public inactive-seat percentage.
- **Zero customer interviews so far.** That is the next step, and nothing in this document replaces it.
