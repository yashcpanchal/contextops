# Round 2: AgentOps (operating fleets of coding agents in companies)

Date: 2026-10-13. About 12 tool calls (budget was 35). Mostly WebSearch summaries (secondary) plus HN. No LinkedIn/Indeed job counts were retrievable (honest gap). Items marked [secondary] come from aggregator summaries and were not verified at the primary source.

## 1. Domain overview
- Background/cloud coding agents are now a line of business. Cognition (Devin) reports about $900M ARR (Aug 2026, company-reported), and Modal says run-rate went $60M to about $300M on agent-sandbox demand.
- Leading firms are building in-house "agent platforms" (Ramp Inspect, Stripe Minions, Uber Minion + MCP Gateway). Their platform teams are now the buyer persona.
- The pain moved from generating code to reviewing it, governing it (secrets, MCP), keeping its context fresh (AGENTS.md rot), and picking which agent/model to use.
- Capital is concentrated in infrastructure (sandboxes, MCP security, code review). The thin layers are "which agent works on MY repo" evals and context hygiene. Those are mostly Show HN side projects so far.
- Many of these layers are being absorbed by the agent vendors themselves (review, sandboxes, rules files).

## 2. Demand evidence table

| Signal | Ladder | Number | Source |
|---|---|---|---|
| Modal Series C, May 2026; run-rate about $300M vs $60M in Sept 2025, attributed to AI coding/agent sandboxes | 2 (and 1 for implied revenue) | $355M at $4.65B; General Catalyst, Redpoint | https://dealroom.co/news/129203-modal-raises-355m-series-c-at-4-65b-valuation/ [secondary] |
| Daytona Series A, Feb 2026 | 2 | $24M; FirstMark, Datadog and Figma Ventures strategic | https://www.vcaonline.com/news/2026020508/daytona-raises-24m-series-a-to-give-every-agent-a-computer/ |
| E2B Series A, Jul 2025 | 2 | $21M (total $32M); Insight; claims 88-94% of Fortune 100 use it [vendor] | https://www.insightpartners.com/ideas/e2b-raises-a-21m-series-a-to-offer-cloud-for-ai-agents-to-fortune-100/ |
| Runloop seed, Jul 2025 (no Series A found) | 2 | $7M; The General Partnership | https://www.trysignalbase.com/news/funding/runloop-ai-secures-7m-seed-funding-to-supercharge-the-future-of-ai-powered-coding [secondary] |
| Coder (one source only) | 2 | $90M, Apr 2026 | https://www.cbinsights.com/compare/coder-technologies-vs-gitpod [unverified] |
| Ona (ex-Gitpod) | 2 | last known round $25M Series A in 2022; no 2026 round found | same CB Insights page |
| Runlayer (MCP governance) Series A, Jun 2026 | 2 | $30M, Felicis and Khosla; $42M total; customers Gusto, Instacart, Opendoor, dbt Labs, Cursor [vendor-listed]; "Gusto rollout: 3,000+ workers in four weeks" | https://cryptobriefing.com/runlayer-raises-30m-ai-agent-governance/ |
| Factory Series B, Sep 2025; a $150M Series C at $1.5B (Apr 2026) appears in one source only | 2 | $50M at $300M | https://factory.ai/news/series-b ; Series C [unverified] |
| Cognition (Devin) Series D, May 2026 | 2 | $1B+ at $26B; ARR $492M in May, about $900M by Aug (company-reported); plans about $800M cash burn | https://www.kucoin.com/news/flash/cognition-ai-hits-900m-arr-plans-800m-cash-burn-in-2026 [secondary] |
| Code-review layer: CodeRabbit $60M Series B at $550M; Greptile $25M (Benchmark); Graphite $52M Series B | 2 | priced $12-24 and $30 per dev per month | https://www.scalevp.com/press/coderabbit---60-million-series-b-raised-for-ai-code-review-platform ; https://siliconangle.com/2025/09/23/greptile-bags-25m-funding-take-coderabbit-graphite-ai-code-validation/ |
| YC W26/P26 companies in the space: Terminal Use (115 pts), Runtime ("Sandboxed coding agents for everyone on a team", 103 pts), Armature (MCP analytics) | 2/4 | Launch HN | https://news.ycombinator.com/item?id=47311657 ; https://news.ycombinator.com/item?id=48225040 ; https://news.ycombinator.com/item?id=49157807 |
| Ramp built Inspect in-house; 5.5-person team; 75% of merged PRs; 1M+ sessions by July; 200+ agents built on it | 4 (DIY, strong) | 75% of merged PRs | https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect |
| Stripe Minions: about 1,000-1,300 merged PRs per week [secondary, figures conflict] | 4 (DIY) | | https://blog.bytebytego.com/p/how-stripes-minions-ship-1300-prs |
| Uber Minion: 11% of PRs company-wide [secondary]; also built MCP Gateway, Agent Builder, AIFX CLI, uReview | 4 (DIY) | | https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development |
| Review bottleneck: Faros telemetry says +98% PRs, PRs 154% larger, review time +91%; "61% of agent PRs get no review" (second-hand); LinearB 8.1M PRs: devs about 19% slower while feeling faster | 3 | | https://www.softwareseni.com/why-agent-generated-code-is-breaking-the-pull-request-review-model/ ; https://linearb.io/library/ai-in-software-development [secondary, vendor data] |
| AGENTS.md "in 60,000+ repos"; at least 4 Show HN linters for stale context (Ctxlint, Agents-lint, VeriContext, OpenWiki) | 4 | tiny engagement (1-3 pts each) | https://news.ycombinator.com/item?id=47189911 |
| Job postings for platform/dev-productivity roles | 2 | NOT RETRIEVED. Only generic: LinkedIn calls AI engineer the fastest-growing title; one tracker shows about 1,550 AI-eng postings/week, flat in H1 2026 | https://letsdatascience.com/news/linkedin-identifies-ai-engineer-as-fastest-growing-role-e82f85f1 |

## 3. Pain points, ranked

1. **Review is the bottleneck.** "AI-generated code needs to be reviewed, which means the natural bottleneck on all of this is how fast I can review the results" and "review is hands down the biggest bottleneck" (HN comment, https://news.ycombinator.com/item?id=45486217). Also "Got multiple parallel cloud agents with independent loops making PRs and me reviewing them" (https://news.ycombinator.com/item?id=49151580). Quantified: see the Faros and LinearB numbers above, but these are vendor data.
2. **Off-the-shelf harnesses can't verify work in your environment.** Ramp (Pragmatic Engineer): third-party tools run "one or two sessions on local machines" and lack internal telemetry and feature-flag integration. Ramp built screenshot verification before vendors had it. https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect
3. **Context files rot.** "The issue isn't just quantity of context, it's staleness. AGENTS.md and CLAUDE.md that reference renamed functions, deleted interfaces..." (https://news.ycombinator.com/item?id=47531882). Counterweight: "Needs actual evidence that this is better than not having documentation... outdated or incomplete docs often leads to worse" (https://news.ycombinator.com/item?id=48815643). A skeptical thread, "Do agents.md files help coding agents?", is at https://news.ycombinator.com/item?id=48442986. So even the value of the problem is contested.
4. **Public benchmarks don't tell you what to buy.** The RepoGauge Show HN: "I've grown increasingly skeptical that public coding benchmarks tell me much about which model is actually worth paying for..." (https://news.ycombinator.com/item?id=48200057 region; the ID was not captured, so search "RepoGauge" on HN). It has 1 point, 0 comments, so there is no engagement.
5. **Secrets and credentials exposed to agents.** Show HNs such as Keyclasp and Cloak ("every one of them has been reading my .env files with real Stripe live keys"), plus "Authorize MCP tool calls without giving agents the credentials" (https://news.ycombinator.com/item?id=49698552). All low engagement. Funded companies exist (Runlayer).
6. **MCP sprawl and governance.** The "MCP Gateway and Registry" HN thread has 73 pts and 53 comments (https://news.ycombinator.com/item?id=45010524). Uber built its own MCP Gateway. Counter-signal: "MCP was always a bad idea?" (https://news.ycombinator.com/item?id=49783404) and "You said no MCP" (https://news.ycombinator.com/item?id=49915768). The protocol itself may shrink.
7. **Agent CI cost.** Nothing substantive found (honest gap). Token-spend tools only (PrismoDev, https://news.ycombinator.com/item?id=48200057). That is round 1's FinOps lane.

## 4. Incumbents and gaps
- **Sandboxes** (E2B, Daytona, Modal, Runloop, Coder, Ona, Blaxel, Fly Sprites): well funded and commoditizing. Modal at $4.65B is not a competitor a student team can beat. Gap: none for a startup here.
- **Agent vendors** (Devin about $900M ARR, Factory, Codex/Claude Code/Copilot/Cursor): bundle their own review, rules files, and cloud runners.
- **Code review** (CodeRabbit, Greptile, Graphite): crowded, $12-30 per dev per month, funded $25-60M. Gap: they review diffs, not the fleet. Cross-agent measurement of "which agent's PRs actually merge and survive" is thin.
- **MCP governance** (Runlayer $30M, MCP gateways, Boundary, plus many OSS): early and funded. Security-buyer sale; SOC2 required, so it is unfit for students.
- **Internal platforms** (Ramp, Stripe, Uber): these firms build rather than buy, and a Ramp team of 5.5 shows the build cost is low for top firms. Ramp itself open-sourced Open-Inspect (per the Modal blog), which weakens "sell the platform." Gap: the mid-market (200-2,000 engineers) cannot staff that team. Runtime (YC P26) and Terminal Use (YC W26) target exactly this.
- **Evals on your own repo and context hygiene:** only hobby tools (RepoGauge, Ctxlint, Agents-lint). No funded player found in my searches (not exhaustive).

## 5. Candidate ideas (harsh scoring)

### A. Repo-specific agent bake-off ("which agent/model should we standardize on?")
- Pitch: continuously replay your own merged PRs and tickets against Claude Code, Codex, Copilot, Cursor and Devin in sandboxes, then report pass-rate, review-survival and cost per merged PR.
- Buyer: Head of Developer Productivity or VP Eng, 300-5,000 engineers.
- Why now: 5+ agents per org, big contract decisions (Cognition at $900M ARR), and model price/quality drift ("silently drop performance" worry in the RepoGauge post).
- Why not in-house: Ramp-like firms will. The mid-market lacks harness and eval skill.
- AI-durable: each model release forces a re-eval, so the need recurs. Risk that vendors publish their own evals, which are biased.
- Wedge MVP: a GitHub App that mines closed PRs plus CI, runs them via an open harness (OpenCode) on E2B/Modal credits, and produces a report. Feasible in weeks, but per-run compute is expensive.
- Top 3 signals: (1) RepoGauge Show HN skepticism (weak, 1 pt); (2) Ramp's build-vs-buy rationale (https://newsletter.pragmaticengineer.com/p/why-ramp-built-inspect); (3) Cognition ARR $900M showing big spend to evaluate.
- Biggest risk: no one has said "I'd pay." Evals could be a one-time project, not a subscription.
- Score: A10 B9 C13 D6 E6 F9 = **53**.

### B. Agent-PR "merge-readiness and survival" analytics for review capacity
- Pitch: across all agent vendors, show which agent PRs get merged, reverted, or rubber-stamped, plus reviewer load, and route risky PRs to the right reviewers.
- Buyer: Eng Director or Dev Productivity lead, 200-3,000 engineers.
- Why now: agent PRs exceeding human PRs on GitHub (per Semgrep, citing Gergely Orosz; https://semgrep.dev/blog/2026/end-is-nigh-for-code-review, vendor claim) and review time +91% (Faros, vendor).
- Why not in-house: telemetry is spread across 4-5 vendors, and DX-style tools sell it.
- AI-durable: partly. GitHub and Graphite will add dashboards.
- Wedge MVP: GitHub API reading PR author bot identities, review times, reverts. Easy.
- Signals: Faros/LinearB numbers (vendor); HN review-bottleneck comments; Uber built uReview for the same reason.
- Risk: this is incumbent territory (LinearB, Jellyfish, DX, Faros, Graphite) and lands in round 1's "dashboards get absorbed" trap.
- Score: A12 B8 C8 D8 E8 F13 = **57**.

### C. AGENTS.md / rules-file CI (drift detection plus measured effect)
- Pitch: a CI check that detects stale refs in context files and A/B tests whether the file improves agent success on the repo's own tasks.
- Buyer: platform/DevEx team; or bottom-up devs.
- Signals: four Show HN linters (1-3 pts); a staleness comment; skeptical threads on whether the files help.
- Not in-house: easy to build in-house. Free OSS linters already exist. Claude, Codex and Cursor are adding auto-memory and init.
- Risk: too small a feature; no one pays; agents learn to explore without docs.
- Score: A6 B5 C6 D6 E5 F14 = **42**.

### D. Managed internal agent platform for mid-market ("Ramp Inspect in a box")
- Pitch: sandbox images built from your CI config, secrets brokering, Slack/Jira triggers, verification hooks, review agent.
- Buyer: VP Eng at 100-1,000 engineer firms without a platform team.
- Why now: Ramp, Stripe and Uber proved the pattern; Runtime (YC P26) and Terminal Use (YC W26) validate the market but also compete.
- Why not in-house: the build is hard below top firms.
- AI-durable: moderate; Codex cloud, Claude Code on the web, Copilot agent and Cursor background agents ship the same.
- MVP: heavy (sandbox, auth, secrets). Needs security review by buyers. Hard for students.
- Risk: pure feature race against Cursor/Codex/Cognition and funded YC peers.
- Score: A13 B9 C6 D9 E7 F5 = **49**.

### E. Mid-market MCP and credential registry for agents (narrow: approval plus audit of MCP servers across coding agents)
- Pitch: private MCP catalog with per-agent scopes and audit, targeting the dev-tool config layer (not enterprise-wide agents).
- Signals: Runlayer $30M; MCP Gateway HN thread (73 pts); Uber built a gateway.
- Risk: Runlayer, cloud vendors and the platforms themselves cover it; the MCP protocol is contested; buyers are security teams, so SOC2 is a day-1 need.
- Score: A12 B8 C7 D8 E7 F6 = **48**.

## 6. Single best idea in this domain
**B-leaning hybrid of A and B, but honestly nothing here beats about 57.** If forced to pick: the **agent-PR outcomes tracker** (idea B) scores highest because it needs only public GitHub APIs, answers a quantified and widely discussed pain (review bottleneck), and gives a wedge for the repo-specific bake-off (A) later. Its weakness is exactly round 1's: engineering-metrics vendors can add an "AI PRs" tab. The infrastructure layers with the strongest money (sandboxes, MCP security) are already funded far beyond a student team's reach.

Evidence gaps to say plainly: no job-posting counts, no agent-CI-cost data, no confirmed buyer statement of "I'd pay" for repo-specific evals, and many numbers above are second-hand.
