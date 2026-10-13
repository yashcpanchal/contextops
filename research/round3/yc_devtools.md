# Round 3 / YC dev-tools slice (Spring 2025 to Fall 2026)

## 1. Method
- Data: 7 YC jsonl files, 1,210 companies. Script: `scripts/yc_dev.py` (keyword pass) and `scripts/theme2.py` (curated themes).
- Slice: 268 companies in B2B->Engineering/Product/Design, Infrastructure or Security, plus keyword hits in one_liner/desc (engineer, developer, code, PR, devops, QA, incident, SRE, sandbox, MCP, API...). Total 514 candidates. I read all 514 one-liners.
- The keyword pass was too loose: 255 of the 514 matched no theme, and many matches were noise (for example "bug" or "upgrade"). So the final theme table uses a hand-curated list of 17 themes. It covers about 200 companies, roughly 15-18% of every batch.
- Caveats: Fall 2026 is in progress (134 companies so far, against 230 in Summer 2026). Counts are of company names I assigned by reading one-liners, so they are a floor. The classification is by me, not an LLM.
- Traction: WebFetch on company sites, plus the HN helper. HN helper search for Launch HN posts returned almost nothing for these companies (the search matches loosely). Absence of a Launch HN post here is not evidence of anything.

## 2. Theme map
Columns: Sp25 / Su25 / Fa25 / Wi26 / Sp26 / Su26 / Fa26.

| Theme | # | Batch counts | Trend | Examples | Traction |
|---|---|---|---|---|---|
| Agent infra: sandboxes, runtimes, browsers, tool gateways | 31 | 3/7/1/2/7/4/7 | steady-high, rising in Fa26 | Cua: cloud desktop for agents; KERNEL: open infra for agents on the web; Boat: cloud VMs for billions of agents; Archal: API sandboxes; Ardent: DB sandboxes; Maritime: managed cloud for agents | KERNEL team 22. Dedalus, Manufact, AgentMail are hiring. No revenue found. |
| Coding agents / AI SWE / software factory | 29 | 2/6/5/4/7/3/2 | high, peaked Sp26 | Mesmer: OS for the 100x eng team; Replicas: run any coding agent harness in the cloud; Hoplite: deploy cloud software factories; Agent Relay: run coding agents for your team; Linzumi: team chat to command coding agents | Mesmer: SOC2 II, claims "hundreds of teams", Rohlik case study (self-reported) |
| Agent observability / evals / reliability | 17 | 1/4/2/4/0/3/3 | steady | Lemma: production monitoring for agents; Sentrial: Datadog for agent reliability; Stacktrace: see and control what agents do; TraceRoot.AI: open-source agent improvement | None verified. Lemma and TraceRoot are hiring. |
| AI pentest / appsec | 16 | 4/1/2/1/2/5/1 | flat, spike Su26 | Casco: autonomous security testing; MindFort; GhostEye: always-on red team; Trident; OpenHack: always-on AI security engineer; BitPatrol: AI code security | Casco: 400+ teams, named customers (Microsoft, CrewAI, Gusto, Whop) |
| Testing / QA | 15 | 4/1/0/1/1/1/7 | spike in Fa26 | TesterArmy; Composal: agent swarms find bugs; Hue and Simulithic: simulate users from production; Workers IO; Rystic: API simulators | Early. No traction found. |
| AI agent security / governance / IAM | 14 | 1/4/1/3/3/2/0 | flat, zero in Fa26 | Golf: agentic AI governance; Alter: PAM for agents; Multifactor; Traceforce: CrowdStrike for agents; Clawvisor | none verified |
| Docs / knowledge / context layer | 14 | 2/0/3/0/2/5/2 | rising in Su26 | Sourcebot: help humans and agents understand codebases; Airweave: context retrieval for agents; Hyperspell: company brain; Nimbic: auto docs per commit; Mirrors: right context for agents | Sourcebot and Airweave hiring |
| AI SRE / incidents | 12 | 0/2/2/4/2/1/1 | peaked Wi26 | Deeptrace: AI agents for on-call; IncidentFox; Mendral: AI DevOps engineer for CI; HyperProbe; OnePatch; Kestrel AI: platform engineering agents; Sazabi: AI-native observability | Deeptrace: $5M seed, Mintlify, Opendoor, Rain testimonials. Mendral: 15 teams, 5 paying incl. PostHog. |
| AI spend / token cost / gateway | 8 | 0/0/0/3/0/5/0 | spikes Wi26 and Su26 | Quotient Labs (Fermat): Claude Code at 47% less cost; Mentlio: engineering intelligence and token optimization; Codag: AI gateway for cheaper agents; Orchestra; Compresr and The Token Company: context compression | Fermat: $20/month flat, or 10% of savings; self-run benchmark (-47% cost on 15 sessions). No customers named. |
| Agent identity, comms, payments | 8 | 0/1/1/2/2/2/0 | small | AgentMail; Inkbox; AgentPhone; Locus; Agentcard | AgentMail is hiring and has 10 people |
| App builders / vibe coding | 7 | 1/1/1/3/1/0/0 | falling | Vybe, Bloom, Bitrig, Fastshot | none |
| Dev environments / CI / git forge | 6 | 2/0/1/0/0/2/1 | small | Attune and StarSling: faster CI; Boxes.dev; Prized: cloud devbox; GitCafe: git forge for agents | none |
| Code migration / legacy / implementation FDE | 5 | 1/0/0/2/1/1/0 | small | Auctor, Lab0, Trope, Unisson (agents that do software implementation) | Auctor has 30 people |
| AI code review | 2 | 1/0/0/0/1/0/0 | tiny in YC | cubic: AI code review platform; Stage: code review for humans and agents | cubic: public pricing ($30/$79/$160 per dev per month), customers n8n, Cal.com, Resend, Better Auth, Browser Use. No ARR stated. |
| Agent-discoverability / devrel for agents | 3 | 0/0/0/0/3/0/0 | new in Sp26 | Scope, Armature: get your product picked by coding agents; Manicule: AgentRel | none |
| PM / spec / planning | 2 | 0/0/1/1/0/0/0 | absent since Wi26 | Scott AI: planning layer for teams that build with coding agents; OpenSpec: plan mode | none |
| Eng analytics / EM tooling | 1 | 0/0/0/0/0/1/0 | near absent | Mentlio (also in the spend theme) | none |

Share of each batch that is in these themes: 15.5, 16.4, 14.0, 15.2, 16.6, 15.3, 17.9 percent. Developer tooling as a whole is flat, about 15-18% of every batch. The mix inside it is changing.

### Rising in 2026
- Agent infra (sandboxes, VMs, runtimes). 7 in Sp26 and 7 so far in the partial Fa26.
- Testing and simulation of agents and apps. 7 in Fa26, where earlier batches had 0-4.
- AI spend, token and context compression. 3 in Wi26 and 5 in Su26, from 0 in 2025.
- Context and knowledge layers (5 in Su26).
- Agent discoverability, a new theme in Sp26.

### Absent or near-absent
- Engineering analytics and engineering-management tooling. 1 company in 7 batches, and no DORA-style or EM-dashboard company at all.
- PM and spec tools: 2 companies.
- Code migration and modernization, including COBOL-style work: 5, all framed as "forward-deployed engineer" services.
- AI code review: 2, although a16z/Speedrun and later-stage companies may cover it (not checked in my slice).
- Falling: app builders (0 in Su26 and Fa26). Agent security/governance has 0 in Fa26.

## 3. Crowded themes to avoid
- Agent sandboxes, VMs and browser infra. About 30 YC companies in 7 batches, plus cloud vendors. This is a commodity layer.
- Coding-agent harnesses and orchestration ("software factory", "run coding agents in the cloud"). Around 25 companies, and Cursor, Claude Code and Codex will keep absorbing the features.
- AI SRE and on-call. 12 companies, and the best-funded ones (Deeptrace, $5M seed) already have named customers. Datadog, PagerDuty and others are also moving in.
- AI pentest. 16 companies. Casco is far ahead on credibility (CREST, SOC2, ISO, named customers).
- Agent observability and evals. 17 companies, many with 2-person teams.
- Token compression and routing as a standalone product (Fermat, Compresr, Token Company, Codag, Orchestra). It is easy for the model vendors to ship.

## 4. Under-served gaps
- Cross-vendor engineering-leader view of AI coding spend and outcomes (cost per merged PR, which tool pays off, seat utilization). Nobody in these batches does this. Mentlio is the nearest, and its site shows only sample dashboards with no named customers [unverified beyond the homepage].
- Engineering analytics and engineering-manager tooling for the AI era. Zero companies in 2026 aside from Mentlio.
- Policy and governance for how developers use AI coding tools (which model, which repo, budget caps). Oximy and Wato position nearby ("control point for AI agents at work") but target general agents, not engineering.
- Review capacity. AI code review has only 2 YC companies in 7 batches, which looks thin compared with the volume of agent-written PRs (cubic is the only one with visible traction).
- Migration and legacy modernization sold as software. All 5 companies are FDE-style services.
- PM and spec tools: 2 companies, none growing.

## 5. Direct ContextOps competitors and adjacents
ContextOps = cross-vendor FinOps for AI coding.

Direct or near:
- Quotient Labs / Fermat (W26): proxy around Claude Code that prunes context, claims -47% cost on its own benchmark. $20/month flat or 10% of savings. Single-vendor (Claude Code, Anthropic/Vertex, Bedrock soon). No customers named. Source: quotientlabs.com.
- Mentlio (Su26): "engineering intelligence and token optimization" for the AI-coding era. Dashboards for productivity, people and savings, with Slack/Teams digests. Integrates Claude, OpenAI, Cursor, GitHub, Linear and Jira. No pricing or customers named on the site. Team size 0 in YC data. This is the closest direct competitor.
- Codag (Su26): AI gateway for cheaper, faster, permissioned agents [one-liner only].
- Experiential Labs (Su26): open-source AI gateway [one-liner only].
- Orchestra (Su26): "self-optimizing neocloud that cuts LLM costs by 100x" [one-liner only].
- Compresr and The Token Company (W26): context and prompt compression [one-liner only].
- Oximy (W26): "take command of the AI your company already runs on" [one-liner only, unverified].
- Rindler (Su26): "IDE for Tokenmaxxers" [one-liner only].

Adjacent (cost-meaningful but different job):
- Interfere (Su25): insight into unseen issues for eng, product and design teams [unverified what it does].
- Linzumi (Sp26): team chat to command a company's coding agents, a possible control surface.
- Sazabi, Deeptrace, Mendral: eng-leader tools with traction, but on the production side (see section 2).

Takeaway: Fermat and Mentlio prove that "cut AI coding spend" is a funded thesis in 2026 (3 of 8 spend companies appeared in Su26). Both are young. Neither shows ARR.

## 6. Candidate ideas
Scores use the rubric: A Demand 20, B Sellable 20, C AI-durable 20, D Evidence 15, E Buyer 10, F Feasible 15. They are my harsh guesses, not measured.

### Idea 1: Cross-vendor AI coding outcomes ledger (ContextOps wedge: "cost per merged PR")
- Pitch: join spend from Claude Code, Cursor, Copilot and Codex to PRs, reviews and incidents, so a VP Eng sees dollars per merged PR and per defect, by team and tool.
- Buyer: VP Eng or Director of Platform at a 100-1000 engineer company.
- Why now: AI spend/token-cost companies went from 0 in 2025 to 8 by Su26. Mentlio and Fermat exist but are token-focused and have no named customers.
- Why not crowded: the 8 spend companies mostly optimize tokens, and none has outcome joins [unverified in depth]. Eng analytics is almost empty in YC (1 company).
- AI-durable: vendors report their own usage only, so a neutral cross-vendor view stays useful.
- Wedge MVP: a GitHub app plus billing-export import that outputs one weekly report per team.
- Top demand signals: (1) 5 spend companies in Su26 alone; (2) Mentlio selling to the same buyer; (3) the Round 1 docs already scored this as a pain.
- Risk: Cursor, GitHub and Anthropic ship analytics dashboards for their own tools. Self-score 58, same as Round 1, as the batch data neither adds much evidence nor undermines it.
- Relation to ContextOps: this is ContextOps with the wedge sharpened.

### Idea 2: Review-capacity layer for agent-written PRs
- Pitch: triage and risk-score PRs, route them to reviewers, enforce policy when agents open large volumes of PRs.
- Buyer: engineering managers and staff engineers.
- Why now: coding-agent companies are 29 in 7 batches, but only 2 YC code review companies (cubic, Stage).
- Why not crowded: cubic is a reviewer, not a router or policy layer. GitHub/Copilot review and CodeRabbit-type tools are outside this dataset and probably crowd it [unverified].
- AI-durable: medium. GitHub could add it.
- Wedge MVP: a bot that labels PR risk and review load.
- Signals: cubic pricing at $30-160 per dev per month and named customers (n8n, Cal.com, Resend); Stage launched Sp26; agent harnesses are everywhere.
- Risk: a crowded space outside YC. Self-score 48. Module of ContextOps (add reviews to the ledger).

### Idea 3: Eng-leader AI policy and budget guardrails
- Pitch: per-team budgets, model allow-lists and approval rules across all coding tools, sitting at the gateway or in the repo.
- Buyer: platform/security lead, with VP Eng as sponsor.
- Why now: agent security/governance had 14 companies, but all target generic agents (Golf, Alter, Wato, Oximy). Coding-specific policy is unaddressed.
- AI-durable: medium-high, since it is enterprise policy, which vendors will not do across competitors.
- Wedge MVP: proxy plus budget alerts in Slack.
- Signals: spend and governance companies both rising; Oximy and Wato raising the "control point" framing.
- Risk: needs a proxy that developers accept. Self-score 50. Module/extension of ContextOps.

### Idea 4: Agent-era legacy migration as software (not FDE)
- Pitch: repeatable migration harnesses (language/framework upgrades) with a verifier, priced per repo.
- Buyer: engineering director with a legacy backlog.
- Why now: migration has 5 companies, all service-style (Auctor, Lab0, Trope, Unisson). Coding agents make this feasible.
- Risk: large codebases are hard for a student team, and consulting firms and vendors compete. Self-score 42. Pivot.

### Idea 5 (not recommended): AI SRE, agent sandboxes, QA agents
All three are in the crowded list. Self-score below 40.

Ranking: Idea 1 stays the best fit. The batch data supports "spend is a real theme" and "eng analytics is empty", but it does not show anyone with revenue in this niche. Do not claim it beats 58.
