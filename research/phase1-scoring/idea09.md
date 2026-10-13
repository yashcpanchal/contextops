# Idea #9: Flow & dependency risk radar (evaluation)

Evaluator stance: YC partner plus former VP Eng. Date: 2026-10-13. Rubric: `RUBRIC.md` (A20/B20/C20/D15/E10/F15).

## 1. The idea, expanded

**What it is.** A system that predicts calendar slippage from waiting rather than from coding. It ingests GitHub/GitLab (PR open-to-first-review, review queue age, re-review loops), Jira/Linear (status transitions, "blocked by" links, cross-project links, time in each status), and optionally Slack (unanswered asks to other teams). From these it builds a live **dependency/handoff graph** across teams. Each in-flight epic gets a probabilistic ship date (Monte Carlo over historical *wait* distributions, not story points). The system also explains the cause of each delay: "62% of the slip on Epic X is waiting on Platform team schema review (median 6.1 days this quarter vs 2.0 last quarter)."

**Core workflow.**
1. Connect GitHub plus Jira at org level, which takes about 15 minutes.
2. Get a backfilled flow-efficiency baseline per team and per handoff type (review, QA, security, platform, PM sign-off).
3. Get a weekly "radar" in Slack for the EM/TPM listing epics whose P80 date moved, the top 3 blocking edges in the org graph, and the owner of each.
4. Use one-click nudges: ping the blocking team's queue, request a reviewer swap, or escalate to a TPM.
5. Get a quarterly retro: "where our calendar time went", with wait-time attribution by handoff type.

**Wedge.** Review-wait plus cross-team-blocked attribution for a single epic portfolio, sold to one Director of Engineering who owns 4-8 teams. It works from GitHub and Jira only and is framed as "why is this late", not "who is slow". The AI-era hook is that coding got faster, so waiting now dominates. The source thread put it as "That 2 week feature would not have shipped faster if it was done in 4 days."

**MVP (6-8 weeks).** A GitHub App plus Jira Cloud OAuth. It covers status-transition mining, PR review-latency mining, a "blocked by" and cross-project link graph, Monte Carlo date ranges, a backtest report ("we would have flagged 7 of your last 10 slipped epics N weeks earlier"), and a Slack digest. No per-person views ship by default.

**Moat (claimed).** Org-specific historical wait distributions per handoff edge, the cross-team graph itself, and later cross-company benchmarks of handoff latency. Realistically, this moat is thin. Atlassian owns the Jira data and the graph.

**Pricing.** Comparable products sit at $400-650 per contributor per year (Allstacks) and $29-59 per user per month (LinearB). A newcomer would need to undercut them. A plausible price is $15-20 per engineer per month, or a flat $1.5-3k per month per 100 engineers, with a free single-team tier.

## 2. New research findings

**Incumbents already sell "predict delivery risk".**
- **Allstacks** markets ML forecasting of delivery dates "based on current projects in flight, actual blockers" plus automatic risk alerts covering review/QA risk ([value stream intelligence page](https://www.allstacks.com/product/value-stream-intelligence)). It raised a $10M Series A in Aug 2024 (competitors.md). Third-party listings put its price at $400 (Premium) to $650 (Enterprise) per contributor per year ([pensero](https://pensero.ai/blog/allstacks-pricing), [toolradar](https://toolradar.com/tools/allstacks/pricing)). Traction looks thin: TrustRadius shows only 5 reviews, scored 8.4/10 ([TrustRadius](https://www.trustradius.com/products/allstacks)).
- **LinearB** sells Monte Carlo "Project Forecasting" over historical data plus Project Delivery Trackers "to spot schedule risk early". Stalled-work bots nudge issues that have no git activity ([help doc](https://linearb.helpdocs.io/article/fi3vb3llqd-project-forecast), [blog](https://linearb.io/blog/project-forecasting-your-delivery-timeline-crystal-ball)).
- **Jellyfish** offers a Scenario Planner and deliverable completion projections ("if something is at risk...") ([blog](https://jellyfish.co/blog/jellyfish-scenario-planning/)).
- **Planview** bought Tasktop (VSM, flow metrics, 200+ employees) in 2022 and Plutora in 2024 ([BusinessWire](https://www.businesswire.com/news/home/20220517006293/en/Planview-Announces-Strategic-Acquisition-of-Tasktop)). Planview Viz sells flow time and flow efficiency to enterprises ([Planview Viz](https://www.planview.com/products-solutions/products/viz/)).
- **Plandek** has pitched "delivery capability risk" from Jira, Git, CI and Slack since 2019 ([whitepaper](https://plandek.com/wp-content/uploads/2019/12/Plandek-Whitepaper-end-to-end-metrics-to-mitigate-delivery-risk_compressed-1-1.pdf)).
- **Sleuth** ($22M Series A, 2022) has reportedly pivoted toward AI-agent governance ([unverified aggregator](https://yespress.io/sleuth)). That suggests the DORA/flow niche alone did not carry a company.

**The decisive finding: Atlassian has shipped this.** On 27 Jul 2026, Atlassian launched the built-in **Jira Delivery Agent** (Rovo) with a "Delivery Health Check" template. In Atlassian's words, it "spots delivery signals (stalled work, slipping deadlines, ownership gaps)" and "flags overdue work, stalled items, and early signs of delivery risk before they become problems". It runs on a schedule into Slack or Confluence and needs no installation ([Atlassian announcement](https://jirareleases.atlassian.com/announcements/meet-the-jira-agent-that-runs-your-delivery-rituals), [support doc](https://support.atlassian.com/rovo/docs/work-with-jira-delivery-agent/)). It does not yet mention dependencies. Jira Plans (Advanced Roadmaps) already map cross-team "blocks/blocked by" dependencies on Premium/Enterprise ([titanapps](https://titanapps.io/blog/jira-advanced-roadmaps)). Atlassian also owns DX (~$1B). The obvious next release is "Delivery Health Check + DX review-latency + Plans dependencies". Third parties already build risk agents on Rovo (Planyway).

**Flow-efficiency evidence is folklore-grade.** The commonly cited "typical flow efficiency ~15%, good >40%" figure traces to practitioner sources (Anderson / Modig & Åhlström). Searches found no rigorous software-specific study ([Nimble Work](https://www.nimblework.com/blog/flow-efficiency/), [Metabase](https://www.metabase.com/metrics/queue-time)). Directionally, the evidence is consistent with the phase-1 data: Faros found review time +91%, and CMU/Stanford found PR volume 3.1x vs reviewers 1.5x (TOP10.md).

**Pain evidence.**
- Reddit: "shipped a two-week feature in four months... every handoff added another week of waiting" (104 up; top comment 50 up) (reddit.md P5).
- A comment from the same thread: "every handoff is also a risk transfer... It's scar tissue."
- Ali / J.L. Partners: 70% of projects miss on-time targets, and 90% of US decision-makers rank on-time delivery as the primary metric ([CIO Influence](https://cioinfluence.com/it-and-devops/haystack-offers-new-solution-to-tackle-chronic-software-delays/)). This study is vendor-linked (Haystack).
- The reddit researcher rated P5 "medium frequency, medium intensity (everyone agrees it is broken; few expect a tool to fix it)".
- HN Algolia search for "cross-team dependencies" and "flow efficiency" returned near-zero engagement (top story 15 points, 2016).
- TPM job postings explicitly include "tracking cross-team dependencies and maintaining a live risk register" ([Tekion TPM posting](https://jobs.weekday.works/tekion-staff-technical-program-manager)). That is real work, but the evidence is anecdotal.

**Evidence that EMs pay specifically for prediction is weak.** Money flows to SEI platforms, where forecasting is a bundled module (LinearB beta/paid, Jellyfish, Allstacks). The one forecasting-led independent (Allstacks) shows small review counts. No community quote shows an EM saying "I'd pay for slip prediction". Practitioner culture is also hostile to estimation ("estimation is a waste of time", [LeadDev](https://leaddev.com/velocity/estimation-is-a-waste-of-time); "stopped doing story points... nothing broke", 153 up).

## 3. Scoring

**A. Proven demand / market: 10/20.**
- In favor: money is clearly spent on the category, through Planview/Tasktop and Plutora acquisitions, Allstacks' $10M Series A, and LinearB and Jellyfish forecasting modules. Gartner's DPI Magic Quadrant (May 2026) also exists.
- Against: the specific job of predictive slip and dependency risk has never broken out as a standalone purchase. It is a module. Allstacks, the purest play, shows thin traction, and Sleuth drifted away. Market-size numbers are unverified (Custom Market Insights $2.5B VSM).
- The AI-era trend helps the narrative (waiting now dominates), but there is no hard spend signal tied to it.

**B. Sellable (won't build in-house; will pay): 9/20.**
- In favor: no single team builds cross-team flow attribution, and the reddit researcher rated this "Y". A budget line exists (SEI/VSM).
- Against: the buyer already pays for Jira and often for LinearB, Jellyfish or Swarmia, all of which carry forecasting. Rovo's Delivery Agent is now bundled with Jira Cloud plus Rovo.
- A newcomer must beat "free with Jira" and "already in our SEI contract". Claude + Jira MCP gives a usable DIY version ("which epics are blocked and on whom?").
- Pricing headroom is squeezed between free and $650 per contributor per year.

**C. AI-durability: 7/20.**
- In favor: the moat is not the LLM. It is the historical wait distributions and the org graph, which is the right shape.
- Against: the platform that owns that data (Atlassian) has shipped the feature this quarter, and it owns Plans (dependencies) and DX (review latency).
- Better models make the DIY MCP path stronger, not weaker.
- The rubric asks whether this is "not a feature Atlassian will ship next quarter". Atlassian shipped most of it last quarter. Severe penalty.

**D. Evidence-backed real problem: 9/15.**
- In favor: the problem is real and corroborated across sources. The 104-up Reddit thread, the Faros review-time +91% and CMU/Stanford 3.1x/1.5x data, TPM role definitions, and the Ali/J.L. Partners 70%-miss stat all point the same way.
- Against: the flow-efficiency numbers are practitioner folklore, the "late" stat is vendor-linked, and HN engagement is negligible.
- Practitioners themselves say "few expect a tool to fix it". That points to a real problem but questionable tool-solvability.

**E. Specific, reachable buyer: 6/10.**
- Named titles exist: Director/VP Eng and TPM org, at 150-2,000 engineer companies with multiple teams.
- TPMs are reachable on LinkedIn and in TPM communities.
- But the cross-team value only appears org-wide, which means a Director-plus purchase with security review. The TPM org exists mostly in larger companies, which pushes toward enterprise sales.

**F. Feasibility & wedge for a student team: 7/15.**
- The data plumbing (GitHub + Jira APIs, status-transition mining, Monte Carlo) is buildable in 6-8 weeks.
- Three things count against it:
  1. Credibility requires a backtest on months of the customer's history, so there is no instant aha.
  2. The value requires org-wide (not single-team) install, plus read access to many repos and projects, which triggers SOC2 asks.
  3. Differentiation versus LinearB forecasting, Allstacks and Rovo is a matter of degree ("better attribution of waits"), not of kind.

| Criterion | Score |
|---|---|
| A. Proven demand | 10/20 |
| B. Sellable | 9/20 |
| C. AI-durability | 7/20 |
| D. Evidence | 9/15 |
| E. Buyer | 6/10 |
| F. Feasibility & wedge | 7/15 |
| **Total** | **48/100** |

## 4. Verdict

This is a correct diagnosis wrapped in a crowded, now platform-owned product. AI moved the bottleneck to waiting, but "predict which epics will slip and why" is already sold as a module by LinearB, Jellyfish, Allstacks and Planview. Since July 2026 it also ships natively in Jira as the Rovo Delivery Agent's Delivery Health Check. It is best kept as a **feature** of a broader product, for example the wait-time component of #2 (True Cost of Delivery) or the risk flags in #4 (status autopilot), not as a standalone company.

If pursued anyway, the only defensible angle is **neutral cross-tool, cross-org handoff attribution**: Jira + Linear + GitHub + ServiceNow/Slack queues, including other teams' intake queues that Jira-only tooling misses. Run 10 backtests first. If a backtest can't show slips flagged at least 2 weeks earlier than Jira's own agent, stop.

**Biggest risk:** Atlassian owns the data and the workflow and has already shipped "stalled work / slipping deadlines / early delivery risk" detection natively in Jira (Jul 2026). With Plans dependencies and DX review-latency in-house, the remaining gap is likely closed within a release or two.

FINAL SCORE: 48/100
