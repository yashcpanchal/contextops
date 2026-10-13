# Round 3: a16z Speedrun (SR001-SR007) scout report

## 1. Method
- Data: `data/speedrun_all.csv` (321 companies; cohort sizes SR001 25, SR002 25, SR003 32, SR004 42, SR005 59, SR006 59, SR007 79), `data/speedrun.jsonl` (SR007 preambles), and the descriptions in the CSV.
- Scripts: `scripts/sr1.py` (category x cohort), `sr3.py` (B2B category listings), `sr4.py` (traction-sentence extraction for SR005-SR007, output `sr4.out`, 68 hits), `sr5.py` (keyword scan for coding-agent / audit / spend / context terms), `sr6.py`.
- WebFetch on 12 pages: speedrun.a16z.com/companies/{alike, elu, agentcat, tenera, cube-computer}; alike.dev, elu.dev, usesparta.co, zerodrift.com, briefhq.ai, sentra.app, chatoverflow.dev.
- Caveats: every ARR figure below is **self-reported marketing copy** written for the demo-day preamble. Many are "contracted ARR", "cARR", "run rate" or pilots, not audited revenue. A company can have several categories, so category counts overlap. Cohort age matters: SR007 is only weeks to months old, so its claims are the least verified. Evidence level is "money moving, self-reported" unless noted.

## 2. Theme map (category counts by cohort SR001..SR007)

| Theme | # | Cohort counts | Trend | Examples | Traction evidence |
|---|---|---|---|---|---|
| AI Agents | 160 | 5 6 11 11 38 41 48 | Rising hard (20% of SR001 to 61% of SR007) | Alven: AI property manager; Othello: AI B2B sales-call prompts; Nexor: revenue agents; OneGC: AI-run legal for startups | Densest traction cluster, mostly vertical or function agents (see sec. 4) |
| Gaming | 76 | 19 19 19 13 4 2 0 | Collapsed to zero | Aghanim, Adzap, Quago | Original Speedrun thesis, now abandoned |
| Consumer / Media / GenMedia | 49 / 46 / 34 | peaked SR004-SR005 | Falling | Color ($2.5M ann. rev), Zero Billion ($2M), DRS ($1.3M ARR) | Real but consumer, not our buyer |
| AI Infra | 43 | 2 2 2 3 6 9 19 | Rising fast (SR007 24% of cohort) | Hoid, Proper Motion, Rollup, AgentCat, Sentra, Cluster | See sec. 4 |
| Dev Tools & DevOps | 27 | 0 1 4 2 6 3 11 | Rising (11 in SR007) | Elu, AgentCat, Cube Computer, Hoid, PreMan, Abliteration | Elu 8x ARR; Hoid $196K; PreMan $170K; Abliteration $7M |
| AI Models / Research | 22 | 2 1 0 0 2 1 16 | Spiked in SR007 | Abliteration, Zorbe, Oruk | Only Abliteration quantified |
| Fintech | 31 | 1 1 0 4 8 11 6 | Peaked SR006 | Quanto, Grove Tax, Crebit | Quanto $800K contracted |
| Enterprise SaaS | 20 | 0 1 1 1 4 2 11 | Rising (11 in SR007) | Codos, Cluster, Lazyweb, OneGC, Tenera, Colmez | Most ARR claims in the B2B set |
| Future of Work | 19 | 0 1 0 2 4 4 8 | Rising | Alia, Alike, Contxt, Infragrid, Sentra-adjacent | Alia $115K, Infragrid $302K, OpenWhispr $105K |
| Healthcare | 20 | 1 0 3 2 4 6 4 | Flat | Rhema, Miraka, Clair Health | Rhema $500K cARR |
| Robotics / Hardware / Industrials | 16 / 11 / 11 | mostly SR007 | Rising | Cybernetic Physics, Vound, KIRA, Colmez | $828K, $2M run rate, $900K contracted, $800K contracted |
| Supply chain, Real estate, Legal, Gov/Defense, Cyber | 10 / 9 / 5 / 13 / 8 | mostly SR006-SR007 | Rising | Parca, Alven, Smart Bricks, OneGC, Galileo Space | Parca $500K; Smart Bricks ~$12M run rate (SR006) |
| HR Tech / Edtech / Adtech / Sports / Crypto | 8 / 6 / 14 / 7 / 5 | peaked SR003-SR005 | Falling | Cedar, Quinn | Cedar claims $2.5-3M; Quinn $1.1M ARR |

Cohort story: SR001-SR004 were roughly 40-50% gaming/consumer/creator. SR005-SR007 pivoted to "AI agents + vertical services-as-software" and, in SR007, AI infrastructure/models and enterprise software. SR007 has almost no gaming.

## 3. Crowded themes to avoid
- **Generic "AI agents for function X"**: 48 of 79 SR007 companies carry the tag. Sales/GTM agents alone have Othello, Cluster, Nexor, Hotbox, Variant and Amdahl, so a student team has no angle against funded, revenue-positive peers.
- **Agent "memory / context layer" for the enterprise**: Sentra, Amdahl, Contxt, Rollup, Infragrid, Space, Brief, Alike, ChatOverflow, Proper Motion, Keewano. At least 10 funded companies in 3 cohorts. (ContextOps' name overlaps this vocabulary, so be careful about positioning; see sec. 5.)
- **Agent observability / testing**: AgentCat, Sparta, Modaic, PreMan, ZeroDrift (see sec. 5), on top of the incumbent Langfuse/Datadog crowd.
- **Vertical "AI-native services firm"** (law, pre-construction, accounting, property management, M&A): these need domain founders and sales. Parca, OneGC, Athena, Alven, Kintow, Quanto already have it.
- **Gaming and consumer apps**: a16z itself abandoned them.

## 4. Revenue traction: which B2B themes show money

### 4a. Ranked stated ARR/growth claims, SR007 (all self-reported; "c" = contracted, "p" = pilot-inclusive)
| Rank | Company | Claim | Category / what it is |
|---|---|---|---|
| 1 | Abliteration.ai | $7M ARR, 8x last month (2-person team) | Uncensored LLMs for red-teaming/security; unusual and likely API-usage driven |
| 2 | Alven | $1.2M ARR in 6 months (Keller Williams, Balgore); "deploying $10M ARR" across 70K units | AI property manager |
| 3 | Maestro | $3M revenue in 9 months, no paid marketing | AI agents, travel/hospitality (stealth; "revenue", not ARR) |
| 4 | Nexor AI | $2.5M ARR in 5 months, 270 clients, 19 countries | Voice/revenue agents |
| 5 | Vound | $2M run rate in 8 weeks | Robotics |
| 6 | Codos | "7-digit live ARR", 50% MoM | Virtual Chief AI Officer, AI implementation as software (ex-McKinsey/Meta) |
| 7 | DRS | $1.3M ARR, 2x MoM | Consumer app studio |
| 8 | OneGC | $1.18M ARR ($420K pilot), 50+ customers, 127% MoM | AI-native legal for startups |
| 9 | Lazyweb | $1M ARR in 2 months | Product growth AI |
| 10 | KIRA | $900K contracted | Manufacturing hardware |
| 11 | Cybernetic Physics | $828K live ARR in 8 weeks, DeepAI contract | Robots operating data centers |
| 12 | Colmez | $800K+ contracted in a few weeks, team of 3 | Hazardous-waste agent platform |
| 13 | Othello | $600K live ARR, $1.2M cARR, 30 enterprise customers (all >$2B market cap) | Sales-call AI |
| 14 | Rhema Health | $500K cARR, athenahealth marketplace | Voice health agents |
| 14 | Parca | $500K run rate in 7 weeks (Toll Brothers, PulteGroup) | Pre-construction services |
| 16 | Infragrid | $302K ARR in 2 weeks (customer: Corgi) | Memory that recommends workflow automations |
| 17 | Tenera | $300K+ ARR in 3 weeks, 6-figure conversions | User-reaction simulation for product teams |
| 18 | Rollup | $288K cARR, 8 customers, 14 days, doubling WoW | User-context layer for personal AI |
| 19 | Proper Motion | $270K+ ARR in 3 weeks (private beta) | Continual-learning layer for agents |
| 20 | Cluster | $260K+ ARR in 11 weeks, >100% MoM | MCP/infra for GTM agents |
| 21 | Valent | $180K annualized in 6 weeks | Industrial supply chain |
| 22 | PreMan | $170K ARR | Agentic infra so products survive agent traffic |
| 23 | Hoid | $196K contracted run rate in 1 month | AI inference compiler |
| 24 | Sterling | $150K ARR, +$300K converting | Agent infra |
| 25 | Alia | $115K live ARR in 3 months | Agents coordinating team goals |
| 26 | OpenWhispr | $105K+ ARR, 23% MoM, 10K DAU | On-device voice |
| 27 | Ontem | $25K ARR, $1M pipeline | Receivables |

Growth-only claims (no absolute ARR): Elu "8x ARR in under two months, 600+ companies onboarded, $2M pipeline incl. Google and Cisco"; Cube Computer "400+ users, 56% compounded WoW WAU, started monetizing"; Switchfrog "37x AI requests"; SenseLab "1,000+ users incl. Infosys and Rakuten".
SR006 for context (not SR007): Smart Bricks ~$12M run rate; Clair Health "$18M B2B contracts signed"; Cedar $2.5M contracted; Quinn $200K to $1.1M ARR in 5 months (65+ customers); Quanto $800K contracted; Verra ~$700K; Bota $710K cARR in 5 weeks; Variant $600K. SR005: Color $2.5M, Zero Billion $2M (both consumer).

Total: 68 sentences with quantified traction across SR005-SR007 and about 27 SR007 companies quoting an ARR or contracted figure (34%). Speedrun now selects for revenue-at-demo-day, so it is a skewed sample. Reading: the claims prove buyers will pay quickly for agent products when the pain is labor cost, but most are weeks old, "contracted" or pilot-converted.

### 4b. Which B2B themes show real money
1. **Labor-replacing vertical agents** (property management, legal, pre-construction, accounting, sales calls, voice): strongest. Buyers swap headcount or outsourced-service budget.
2. **Agent infrastructure sold to AI companies** (inference compiler Hoid, continual learning Proper Motion, MCP infra Cluster, context Rollup/Sterling, red-team models Abliteration): $150K-$7M claims, sold to builders, short cycles. Founders are ex-lab/infra engineers.
3. **AI-transformation-as-software** (Codos, Panorama, Oasis, Verra): "turn a $500B services budget into software". 7-digit ARR claim at Codos.
4. **Robotics/industrial** with contracts (small team, big contracts): hard for students.
5. **Weak or unproven**: developer-productivity tooling (Dev Tools has only Elu, Hoid, PreMan, Abliteration with numbers, and none of those are classical developer-productivity tools); agent observability (AgentCat, Sparta: no traction published, free beta); compliance for AI output (ZeroDrift: $10M seed but no named customers on site).

## 5. Dev Tools & DevOps (27) and Future of Work (19): what they do
**Dev Tools & DevOps**, grouped:
- Agent-era platform: Cube Computer (cloud dev boxes for agents, 400+ users), Rivet (agentic infra, SR002), Kitbash (realtime infra), Hoid (inference compiler), Abliteration.
- Agent QA/observability: AgentCat (MCP/ChatGPT Apps analytics, 5 people, no traction published), Sparta (local replicas of Stripe/Zendesk to test agents; free beta, no customers), PreMan, Modaic (confidence-routed human review), Elu (watches production sessions, writes and verifies a fix, opens a PR; cloud/on-prem).
- Design-to-code and app builders: Pen.dev/Pencil (design canvas inside Cursor/Claude Code), Rork (mobile apps from prompts), Zoah (visual full-stack), Ocoder, Else, Blueprint (language to hardware).
- Product intelligence for agents: Brief (product-decision graph via MCP; own study claims 95% decision compliance, 68% lower cost per merge-ready task [unverified self-study]), Tenera, Primitive Labs, Double Fifth, EverCurrent (hardware knowledge), Alike, ChatOverflow.
- Game dev tooling (RUNREAL, Little Umbrella, nunu.ai), older cohorts.
Not one is an engineering-leader cost/governance dashboard.

**Future of Work**: Alia (agents that coordinate goals; $115K), Alike (team memory for coding agents; waitlist), Ambiguous AI (17 productivity apps for human+agent work), Bounty (hire agents, pay per completed task), ChatOverflow, Contxt (memory+action layer in Slack/Teams), Infragrid (memory suggesting automations; $302K), OpenWhispr (on-device dictation), Phyvant (agents owning business outcomes), Sonder/Sonatic (screen-watching assistants), Panorama and Oasis (enterprise AI workflow enablement), Coalition Systems (defense coordination), Layerpath (walkthroughs), Outcome (TeamOS), Jooba (recruiting), Kintow (restaurant accounting).

## 6. Direct ContextOps competitors and adjacents (mandatory)
ContextOps = cross-vendor FinOps / outcome measurement for AI coding spend (docs/STRATEGY.md). **No Speedrun company in 321 sells cross-vendor AI coding spend, ROI or cost allocation to engineering leaders.** Keyword scans for token cost, AI spend, FinOps, and coding-agent governance returned nothing in SR004-SR007 besides the items below.

Nearest adjacents (none direct):
| Company | Cohort | What it does | Traction | Overlap |
|---|---|---|---|---|
| Alike (alike.dev) | SR006 | Shared team decisions/context for Claude Code, Codex, Cursor, Copilot, Windsurf etc; learns from PRs, Slack, Linear, Jira; per-item sharing, receipts. 8 people. | Waitlist, no pricing or customers | Same buyers (AI-native engineering teams) and same data plane (agent sessions). "Context" tooling, but about agent quality, not spend. Would be the most natural partner or competitor if it adds analytics. |
| ChatOverflow | SR007 | Mines team Claude Code/Codex sessions, feeds learnings to next engineer's agent; claims 60% fewer tokens per task | Design partners only, unsourced claims | Wants the same session-log access; "tokens saved" metric is a ROI claim |
| Brief | SR005 | Product-decision graph via MCP for coding agents | Free tier; own study only | Context for coding agents |
| Elu | SR007 | Autonomous bug-detect, fix, verify, merge on production sessions | 8x ARR growth, 600+ companies onboarded (many likely free), Google/Cisco in pipeline | Produces agent-authored PRs, which ContextOps would measure; potential data source or channel |
| AgentCat | SR007 | Analytics for MCP/ChatGPT App usage by agents | None published | Observability, but for agents calling your product, not agents writing your code |
| Sparta | SR006 | Agent testing sandbox | Free beta, no customers | Tests agents you build, not coding spend |
| ZeroDrift | SR006 | Policy enforcement and audit evidence for AI-generated messages; SOC 2/ISO | $10M seed (per TechCrunch headline seen on its site [unverified here]); no named customers | Relevant to round-2 ideas R2-3 (AI change evidence for SOC 2/SOX): same "audit evidence for AI actions" idea but for customer communication, not code changes |
| Bead AI | SR005 | AI agents for SOX internal audit | no figures | Adjacent to R2-1/R2-3 (SOX buyers), but works on the auditor side |
| Sentra, Amdahl, Contxt | SR006/7 | Org-wide memory / context layers | Sentra: Lenskart case study; Amdahl $4M pipeline | "Context" vocabulary overlap only |
| Tenera | SR007 | Predicts user reaction before shipping | $300K+ ARR | Touches product measurement, not engineering cost |

Round 2 ideas vs Speedrun: R2-1 (AI-spend capitalization), R2-7 (R&D-credit evidence), R2-4 (agent-proof hiring), R2-5 (migrations), R2-8 (departure knowledge capture), R2-9 (shadow AI apps), R2-10 (flaky tests) have **no direct competitor** in these batches. R2-6 (change-escape ledger) is partially approached by Elu (fix loop) and ZeroDrift (enforcement), neither of which is a ledger. R2-3 is conceptually near ZeroDrift/Bead but in different domains (messages / SOX internal audit, not code change evidence). The absence is mixed evidence: it means no crowding, but also that top investors are not (publicly) funding the engineering-management-finance niche, and the incumbents-already-shipped problem from round 2 is unaffected.

## 7. Under-served gaps
- Cost, attribution and outcome measurement for coding agents: zero companies (Speedrun funds the agents and their memory, not the CFO/VP Eng reporting layer).
- Evidence/governance of agent-authored code changes for audit: zero (ZeroDrift is messages only).
- Developer-productivity measurement in the agent era (DORA-like, AI-adoption): zero.
- Handoff/knowledge continuity when people leave: only Alike/ChatOverflow tackle agent-session sharing; no HR/offboarding angle.
- Revenue pattern to copy: where traction exists, the product replaces a labor budget or sells to AI builders. A cost-control tool sells on savings, which Speedrun does not showcase.

## 8. Candidate ideas
**C1. ContextOps with a "measured outcome" wedge (sharper wedge for ContextOps; module).**
- Pitch: for teams already running Alike/ChatOverflow/Elu-style tools, show whether agent spend and agent-written PRs pay off. Buyer: VP Eng/CTO at 50-500 engineer companies.
- Why now: SR007 shows Elu, ChatOverflow and Cube Computer all producing agent usage and "tokens saved / 8x" claims with no neutral measurement; these vendors need third-party proof. Why not crowded: zero Speedrun competitors in 321. AI-durable: cross-vendor neutrality; a single vendor cannot credibly self-audit.
- Wedge MVP: read-only connector for Claude Code/Cursor/Codex usage plus GitHub PR outcomes; weekly cost-per-merged-PR report.
- Top 3 demand signals: round-2 Reddit "DIY nightly job covers a third of the bill"; ChatOverflow's own unsourced "60% fewer tokens" claim shows vendors need metrics; Brief's self-study "68% lower cost per merge-ready task" shows cost per outcome is the accepted unit.
- Risk: no Speedrun company shows a buyer paying for it; absorption by Anthropic/Cursor dashboards. Self-score: 56-58 (unchanged; this report adds no new buying evidence).

**C2. Evidence feed for agent-authored changes (module; round-2 R2-3 + R2-6).**
- Pitch: per-PR record of which agent wrote what, who approved, what escaped. Buyer: security/compliance lead and VP Eng at regulated companies. Why now: ZeroDrift's $10M seed and Bead's SOX focus show investors fund "audit evidence for AI"; the code-change version is not funded here. Why not crowded: no Speedrun competitor. AI-durable: independent evidence has to sit outside the agent vendor. MVP: GitHub App marking agent-co-authored PRs, with a SOX/SOC 2 change-evidence export. Signals: ZeroDrift seed, Bead AI, round-2 audit demand. Risk: GitHub native approver rules (noted in round 2). Self-score: 52-55.

**C3. Neutral "agent output scoreboard" sold to agent vendors (pivot).**
- Pitch: independent benchmarking on a customer's own repos of the coding agents they pay for. Buyer: eng leaders choosing between tools; secondary buyer: vendors needing proof (Elu, Alike, ChatOverflow). Why now: SR005-SR007 fund at least five products that claim coding-agent improvement without independent measurement. Risk: weak money signal, vendors rarely pay for neutral evaluation. Self-score: 45-50.

**C4. Skip, do not pursue: vertical agent or memory-layer clones.** Traction is real (Alven, OneGC, Nexor) but needs domain founders and sales, and crowding in memory layers is 10+ funded companies. A student team should not enter.

## 9. Bottom line
- Speedrun's revenue evidence is concentrated in vertical labor-replacement agents and in infra sold to AI builders. It does not validate a standalone engineering-leader spend tool, but it also shows no competitor to ContextOps. It shows no new idea clearly stronger than ContextOps for this team.
- The nearest threats are Alike and ChatOverflow adding usage analytics, since they already sit inside the same agent sessions.
- All traction figures are self-reported and short-dated; treat the ranking as signal of founder selection, not audited revenue.
