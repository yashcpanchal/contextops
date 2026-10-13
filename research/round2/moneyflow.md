# Money flow across SWE-adjacent B2B categories (2025-2026)

Researched 2026-10-13. Method: ~15 WebSearch/WebFetch calls. WebSearch hit rate limits twice, and several figures come from aggregators. Confidence is labelled per row: [P] primary or major press, [S] secondary aggregator (verify before relying), [V] vendor claim, [M] my memory only (unverified).

## 1. Domain overview
- Money in devtools is extremely concentrated. One tracker (newmarketpitch, [S]) counts 23 disclosed AI-dev-tool deals from Aug 2025 to Jul 2026 totalling $5.21B. Cursor took 44% and the top 3 deals took 71%. That means the long tail is thin and the mid-layer categories are not yet crowded.
- The same tracker says investor attention in 2026 moved toward verification, security, AI DevOps, testing and governance of AI-generated code. Agentic coding platforms took about 72% of YTD 2026 capital.
- Exits so far are acqui-style absorptions of point products: Cursor bought Graphite (Dec 2025) and Atlassian bought DX (about $1B, Sep 2025). Incumbents buy categories fast, so the "bundled by incumbents" risk from round 1 recurs in every category below.
- Job-posting data was not retrievable at useful quality. See section 4.

## 2. Funding and M&A by category (2025-2026)

| Category | Notable events | Rough $ | Conf. | URL |
|---|---|---|---|---|
| AI code review | CodeRabbit $143M Series C at $1.5B (Aug 12 2026; Atomico, Smash Capital; Datadog invested). Valued $550M in Sep 2025. Graphite: $52M Series B (2025), then acquired by Cursor Dec 2025 (price undisclosed, press says well above $290M). Greptile $25M Series A (fall 2025) | about $220M+ raised in the set, plus one large exit | P/S | https://techcrunch.com/2025/12/19/cursor-continues-acquisition-spree-with-graphite-deal ; https://ecvc.wsgr.com/news/wilson-sonsini-advises-coderabbit-on-dollar143-million-series-c-funding |
| AI SRE / incident | Resolve AI $125M Series A at $1B, Lightspeed (confirmed Feb 4 2026). Reported ARR only about $4M (anonymous sources), so the valuation is about 250x ARR. Traversal $48M seed+A (Jun 2025, Sequoia, Kleiner). Cleric about $4-5M seed | about $180M | P | https://techcrunch.com/2026/02/04/ai-sre-resolve-ai-confirms-125m-raise-unicorn-valuation/ |
| AI testing / QA | Functionize $41M Series B (Aug 2025). Synthesized $20M (Sep 2025). BotGauge $2M seed (Feb 2026). Autosana seed about $3.7M total. Unverified tracker entries: Qodo $70M Series B (Mar 2026) | about $70M verified, up to about $140M with unverified entries | P/S | https://www.intelligentcio.com/north-america/2025/08/19/functionize-secures-41m-series-b-to-scale-ai-powered-autonomous-quality-assurance/ |
| Agent sandboxes / infra | E2B $21M Series A (Jul 2025, Insight). Daytona $24M Series A (about Feb 2026, FirstMark). Modal about $87M Series B at about $1.1B [M, unverified]. Runloop, Niteshift raised (amounts not retrieved) | about $50M verified | P/S | https://e2b.dev/blog/series-a |
| AppSec / AI-code security | Aikido $60M at $1B (Jan 2026, DST). Endor Labs $93M B (Apr 2025). OX $60M B (May 2025). Semgrep $100M D (2025). ArmorCode $40M B. Cyera (data security, adjacent) is reported at $400-600M rounds in 2026 with inconsistent sources | about $350M for pure AppSec | P/S | https://www.securityweek.com/endor-labs-raises-93-million-for-appsec-platform/amp/ |
| Eng intelligence / productivity | Atlassian to buy DX for about $1B cash+stock (Sep 18 2025). DX had 350+ enterprise customers. Weave $13.5M Series A (Jul 28 2026, YC). No 2026 rounds found for Jellyfish, LinearB, Faros, Swarmia or Span (gap) | about $1B exit plus $13.5M | P | https://siliconangle.com/2025/09/18/atlassian-acquires-developer-productivity-startup-dx-1b/ |
| Legacy modernization | Blitzy $200M at $1.4B (May 5 2026, a general coding agent). Kodesage $6.6M seed (Jun 2026). Hypercubic $5.3M seed (Aug 18 2026, YC, CIV). Reported IBM stock drop in Feb 2026 after Anthropic COBOL claims (headline only, unverified) | about $210M, but only about $12M in pure-play modernization seeds | S | https://siliconangle.com/?p=790234 |
| Agentic coding (context) | Cursor valued $29.3B (Nov 2025), reported talks at $50B pre (Apr 2026, unconfirmed) | n/a | S | https://newmarketpitch.com/blogs/news/ai-dev-tools-funding-analysis |

## 3. YC batches (what I could retrieve)
Coverage gap: I only got the S26 list, and only the first 100k characters of the page. W25, S25, F25 and W26 were NOT retrieved. ycombinator.com/companies was not fetched directly, so this list comes from the extruct.ai data room (secondary).

S26 companies selling to engineering teams (source https://www.extruct.ai/data-room/ycombinator-companies-s26/, pinggy.io counts "Developer tools & agent tooling" at 24 and "AI infra & data" at 32 out of 197 S26 companies):
- Code context and agents: Almanac (codebase wiki), Graphify, Akon Labs/GitNexus (context layers), Hoplite, Agent FM, jcode (agent control and terminals), Prized (internal tools).
- Eng intelligence: Mentlio (engineering intelligence for AI-assisted teams). Weave (Series A, YC) is the adjacent case.
- Observability and debugging: Codag (logs to incident summaries), Hyperprobe (production debugging by agents), Agnost, Buildbox.
- Testing and evals: Archal (agent evals against service clones), Trident (AI pentesting).
- Agent infra and governance: machine0, OneCLI, Executor (MCP gateway), Bylaw (runtime enforcement), Traceforce (on-device control of AI tools), Conifer and Riften (LLM cost routing).
- Modernization: Hypercubic (W/S26 COBOL, $5.3M seed).
- Read: YC is flooded with agent infra and context-layer tools. There was no S26 company I could identify in test maintenance, software capitalization, release management or code-provenance audit. That is a weak signal because the list was truncated.

## 4. Job-posting proxies (honest gap)
- No retrievable counts for "AI enablement", "developer productivity engineer", "release manager", "technical program manager", "FinOps analyst" or "software capitalization analyst". LinkedIn and Indeed were not reachable via the tools.
- Weak data points: Seeker Research found platform engineering named in 58 of about 5,000 listings (30 days to Jul 8 2026) [S]. ITJobsWatch UK shows platform-engineering permanent jobs falling (34 vs 54 YoY, South East; 331 vs 485 UK-wide for the 6 months to May 2025 vs 2024), so there is NO clean "hiring surge" evidence. Do not claim one.
- Strongest hiring-proxy substitute: DX survey of 50 budget holders says 86% are uncertain which AI tools are working and 40% lack data to build an ROI case ([V], DX sells this). https://getdx.com/blog/how-are-engineering-leaders-approaching-2026-ai-tooling-budget/
- Action for next round: run LinkedIn title searches manually for the roles above.

## 5. Analyst market sizes (with source quality)
| Claim | Source | Quality |
|---|---|---|
| Testing tools spend $2.8B in 2025, $3.3B by 2028; 70% of enterprises to integrate AI testing tools by 2028 | Gartner MQ AI-augmented testing (Oct 2025), seen via a mirror, https://research.oz.spotlightar.com/reports/magic-quadrant-ai-augmented-software-testing-tools-2025/market-definition | Good if accurate, but second-hand mirror |
| AI-in-software-testing $1.7B (2024) to $6.9B (2030) | MarketsandMarkets via aggregators | Low-medium, paid-report press release |
| AI code assistants $4.6B (2025) to $9.8B (2026) | Meticulous Research | Low, vendor-style estimate |
| Whole software testing industry $50-66B in 2026 (three sources disagree: $52.7B, $57.7B, $65.9B) | Global Market Insights, TestGrid | Low; mostly services, not tools |
| Enterprise spend on AI coding agents tripled in 16 months | Gartner, cited by LeadDev | Medium, secondhand |
| AI coding tools $500-$3,000+ per developer per year | DX | Vendor |
| Flaky tests: Atlassian 150k developer-hours per year wasted; Bitrise: teams with flakiness 10% (2022) to 26% (2025) | Atlassian blog and Bitrise dataset, via https://quashbugs.com/blog/flaky-test-statistics | Medium-good (company-measured) |
| Crunchbase developer tools hub: $26.8B cumulative funding, 1,332 orgs | Crunchbase (May 2026) | Good but cumulative |
Lesson: nothing found from IDC or Forrester. All "market size" numbers are weak. The money signal is better read from rounds and exits than from TAM.

## 6. White space (high spend, low startup density)
- Testing: roughly $3B tool spend (Gartner) and $50B+ total industry, yet only a handful of funded AI-native players, mostly small seeds. Test maintenance and flake triage is a measurable pain.
- Legacy modernization: services are a giant budget, and pure-play startups are seed-stage only ($5-7M).
- Engineering finance (software capitalization ASC 350-40, R&D credits): existing tools are time trackers (ClickTime) and engineering-analytics add-ons (Allstacks, Typo, Antenna/Software.com). No dedicated funded leader found. ASU 2025-06 changed the rules, which creates fresh work [unverified detail]. Buyer is the controller, not the VP Eng.
- AI-code governance and provenance (who/what wrote this, policy, audit): agent gateways exist in YC S26 (Bylaw, OneCLI), but audit-for-compliance of AI-written code is sparse.

## 7. Ranked categories: strongest money signal per startup competitor
Scoring is judgment, based on money in the category divided by funded direct competitors, adjusted for whether a student team can build an MVP.

### Rank 1: Test maintenance, flake and CI-reliability
Signal: Gartner $2.8B tool spend; Atlassian 150k dev-hours/yr; Bitrise flake incidence 10% to 26%; AI testing funding is small (Functionize $41M is the biggest verified round), so little capital per dollar of pain. Ideas:
1. Flaky-test triage bot that opens PRs quarantining or fixing flakes and reports hours/$ saved per week (CI APIs are public: GitHub Actions, CircleCI, Buildkite).
2. Test-suite "dead weight" analyzer: find tests that never fail or duplicate each other, and cut CI minutes. Sells on CI bill reduction.
3. Auto-repair of E2E tests broken by UI changes (Playwright selectors), priced per repaired test.
4. AI-generated-code regression guard: pre-merge check that agent-written PRs came with tests of real coverage, not hollow assertions.
5. Flake analytics for mobile CI (Bitrise-style data) sold to mobile teams.
Risk: Cursor/Copilot agents and Qodo-style tools are expanding into test generation. Keep to maintenance and cost proof, not generation.

### Rank 2: Engineering finance and software capitalization (adjacent to round 1, different buyer)
Signal: DX sold for about $1B on the "prove ROI" budget; existing capitalization tools are add-ons; 40% of leaders lack data for ROI. Ideas:
1. Audit-ready ASC 350-40 capitalization from Jira/GitHub with an auditor-facing evidence trail (the wedge: the auditor, not the VP Eng, is the pain owner).
2. R&D tax credit evidence pack generated from commits and tickets for small CPAs and startups.
3. AI-tooling spend vs. shipped-work reconciliation for finance (round 1 idea, repositioned toward the controller).
4. Capitalization policy simulator ("what if we capitalize X% under ASU 2025-06").
Risk: Atlassian-DX and Allstacks bundle; accounting trust and auditors are slow; ASU details are unverified.

### Rank 3: Legacy code comprehension and modernization (narrow slices)
Signal: Blitzy $200M, Kodesage $6.6M, Hypercubic $5.3M; services-heavy budgets; the Feb 2026 IBM stock drop (headline only). Pure-play rounds are tiny, so the money-per-competitor ratio is high. Ideas:
1. Business-rule extraction and documentation of COBOL/PL-SQL/Oracle Forms for audit, sold per codebase.
2. Test-characterization generator: produce golden tests from legacy behavior before any migration (a bridge into Rank 1).
3. Dependency and end-of-life upgrade planner (Java 8 to 21, Python 2, Angular) with effort estimates.
4. Mainframe job-flow (JCL) documentation for banks.
Risk: enterprise sales cycles, data access, and SOC2 for code ingestion; Anthropic/IBM may enter. Weakest on student feasibility.

### Rank 4: AI-code governance and verification (post-merge assurance)
Signal: AppSec rounds are large (Aikido $60M at $1B, Endor $93M), 2026 investor attention on "governance of AI-generated code" [S]; YC S26 has many agent-gateway startups, so the layer is hot, but audit/provenance is sparse. Ideas:
1. AI-authorship provenance ledger: which PRs/lines were agent-written, by which model and policy, exportable for SOC2/ISO auditors.
2. Policy-as-code for coding agents (what repos, secrets, and packages an agent may touch) with a violation report.
3. Dependency "slopsquatting" and hallucinated-package guard in PRs.
4. Agent-PR risk scoring for the review queue (blast radius, tests touched).
Risk: crowded by Snyk/GitHub/Endor; agent gateways are free and open source.

### Rank 5: AI SRE (niche slices)
Signal: Resolve AI $1B valuation on about $4M ARR shows buyers and investors are paying for the category, and few competitors exist. But the leaders are heavily capitalized and the product needs deep prod access, so student feasibility is poor. Ideas:
1. Postmortem and runbook generator that reads incident timelines (Slack, PagerDuty) and keeps runbooks current.
2. Alert-noise audit for on-call teams (which alerts never lead to action), priced per alert reduced.
3. Change-risk checker linking deploys to past incidents.
4. SRE for small teams without SREs, a cheap Resolve alternative for sub-100-engineer companies.
Risk: Datadog, PagerDuty, Resolve and Traversal bundle; very hard MVP.

## 8. Best pick from this lens
Rank 1, test maintenance and flake cost, using public CI APIs to quantify wasted hours and CI dollars. It has measured pain (Atlassian, Bitrise), a $2.8B tool budget, few funded competitors, and an MVP a student team can build in weeks. Rank 2 is the strongest pivot from ContextOps because the buyer (controller/CFO) has a hard compliance deadline. Caveat: money-per-competitor is high partly because incumbents may simply add the feature, so durability depends on owning cross-vendor data (CI, repo, ticket) rather than generation.

## 9. Gaps and caveats
- W25/S25/F25/W26 YC batches not retrieved. ycombinator.com/companies not fetched directly; S26 list is from a secondary source and truncated.
- Several amounts are from aggregators (mexc, signalbase, neuronfeed). Qodo $70M, Novee, Armadin, RunSybil, Cyera figures are unverified or inconsistent. Modal figure is from memory.
- No job-count data. No IDC/Forrester sizing.
- Runloop, Niteshift amounts and any 2026 rounds for Jellyfish/LinearB/Faros/Swarmia/Span were not found.
