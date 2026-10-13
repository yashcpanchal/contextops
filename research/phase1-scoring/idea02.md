# Idea #2: True Cost of Delivery + calibrated forecasting

Evaluator stance: YC partner + ex-VP Eng. Date: 2026-10-13. Rubric: `RUBRIC.md` (A 20, B 20, C 20, D 15, E 10, F 15).

## 1. The idea, expanded

**What it is.** A system of record for what each unit of engineering work actually cost, with forecasts added later. For every closed ticket, epic or feature, it computes a "true cost of delivery":
- agent spend (tokens and credits from Claude Code, Cursor, Copilot and Codex, attributed by branch, PR or session);
- human time (estimated authoring time, review time, and review rounds);
- rework (reverts, follow-up fix PRs, reopened tickets);
- wait time (queue age, handoffs, blocked states).

Once a team has a few hundred closed tickets, it forecasts new tickets as P50/P80 ranges by ticket type, repo and size. It also recommends a route: agent-first, human, or pair. Reporting stops at team and ticket-type level, so there is no per-person efficiency score.

**Core workflow.**
1. Connect GitHub, Jira or Linear, and the vendor usage APIs.
2. A nightly job joins sessions to PRs to tickets.
3. A weekly "cost of delivery" report goes to the Dir/VP Eng, with a CSV export for finance, showing distributions, outliers (for example, "this $40 ticket cost $2,100 in tokens plus 9 review hours") and cost by ticket type.
4. In sprint planning, a Jira/Linear sidebar shows "similar past tickets cost $X-$Y and took N-M days; agents succeeded on 70% of these."

**Wedge.** Start with the retrospective report on 50-200 person orgs that already pay for Claude Code or Cursor. The pitch: "know what a feature cost, and which work is worth giving to agents." Forecasting is an upsell once data has accumulated.

**MVP (4-6 weeks).**
- GitHub App plus a Jira/Linear OAuth app.
- Claude Code Admin/Analytics API ingestion (it already exposes per-user daily cost, commits and PRs).
- A commit-trailer or hook convention to tie sessions to tickets.
- A naive forecaster: median and IQR by ticket type, backtested against story points.

**Moat (claimed).** Each org's calibrated history, plus a neutral cross-vendor join of agent, human and wait cost. In practice it is thin (see C).

**Pricing.** Retrospective tier at $15-25 per engineer per month. Forecasting and routing at $30-40. A finance export or capitalization add-on with a platform fee. Realistic ACV is about $10-30k in mid-market.

## 2. New research findings

**Incumbents already forecast delivery from history.**
- Jellyfish "Deliverables" projects completion from effort and remaining work, sends at-risk alerts, and has a Scenario Planner and a Capacity Planner. Sources: https://jellyfish.co/solutions/software-delivery-management/ and https://jellyfish.co/solutions/capacity-planner/
- Allstacks positions itself on ML delivery forecasting trained on the org's own history, with "risk-adjusted completion" and AI-impact measurement. Source: https://www.allstacks.com/product/software-engineering-intelligence
- Throughput Monte Carlo forecasting in Jira is a commodity (ActionableAgile and several Marketplace apps). Source: https://55degrees.atlassian.net/wiki/spaces/ActionableAgile/pages/2407399482/Monte+Carlo+How+Many

**Incumbents already cost work for finance.**
- Jellyfish DevFinOps allocates engineering effort to projects for R&D capitalization. A customer (Salsify) says it was audited twice and replaced about 700 manager-hours a year. This is the strongest proof that finance pays for "cost per initiative," and Jellyfish already owns it. Source: https://jellyfish.co/newsroom/jellyfish-devfinops-announcement/ (vendor claim)
- Faros "AI coding cost allocation" traces token spend to teams, tools, models and repos. It offers chargeback, "forecast spend accurately," "cost per task / cost per outcome," and "optimally route every task based on your own engineering work." That is close to this idea's routing and forecasting layer. Source: https://www.faros.ai/solutions/ai-coding-cost-allocation
- Larridin publishes "tokens per feature / AI cost per feature" as a metric for finance forecasting. Source: https://larridin.com/blog/tokens-per-feature-engineering-metric
- Atlassian Focus "Funds" (GA June 2026) puts budget, costs, and forecast-vs-actuals next to strategy in the Atlassian suite. Atlassian also owns DX. Source: https://www.schneider.im/lu/atlassian-team-26-changes-across-jira-confluence-rovo-focus-talent-more/ (secondary)

**First-party data is getting closer to cost-per-PR.**
- Anthropic's Claude Code Analytics API returns per-user daily estimated cost plus commits and PRs.
- The Claude Console correlates sessions with GitHub PRs, so a platform engineer can compute cost per PR with a SQL join. Source: https://platform.claude.com/docs/en/build-with-claude/claude-code-analytics-api
- Cursor shipped a cost-aware Router in July 2026 that does request-level model routing, which is a first-party version of "route cheaply." Source: https://ecorpit.com/cursor-router-request-level-model-routing-cost-cut-2026/ (secondary)

**Academic evidence on estimation is sobering.**
- Jørgensen's reviews:
  - projects average 30-40% more effort than estimated, with "no substantial improvement" over decades;
  - expert judgment beat formal models in 10 of 16 studies;
  - uncalibrated models are a key reason they lose.
  
  Sources: https://web-backend.simula.no/sites/default/files/publications/Jorgensen.2007.2.pdf and https://www.simula.no/research/review-studies-expert-estimation-software-development-effort
- Replications show deep-learning story-point estimators rarely beat a plain median baseline. Deep-SE beat the Median in only 8 of 42 cases with statistical significance, and GPT2SP's claimed gains came from an evaluation bug. Sources: https://arxiv.org/pdf/2201.05401 and https://arxiv.org/pdf/2209.00437
- Bai et al. (2026, with Brynjolfsson and Pentland) found:
  - agent token use on identical SWE-bench tasks varies up to 30x across runs;
  - more tokens do not reliably buy accuracy;
  - frontier models predict their own token cost poorly (correlation at most about 0.39) and systematically underestimate it.

  This cuts both ways. It means LLM-from-ticket-text estimation is weak, which validates empirical calibration. It also means the irreducible variance is so large that per-ticket point forecasts will often embarrass you. Source: https://arxiv.org/abs/2604.22750

**Demand signals.**
- HN Algolia (2025-2026) shows "cost per feature" only in low-traction Show HNs (Orbit, LangSpend, Spendtrace; 1-3 points each) and an "Ask HN: estimating API costs" with 2 comments. Searching "estimate tokens per ticket" returned no stories.
- The phase-1 Reddit research found the same pattern: the question "cost per developer, repo, workflow, or feature?" appears (13 upvotes), alongside resignation about estimation ("Sprint planning is manual and should stay like that").
- The strongest delay thread (a 2-week feature that shipped in 4 months) shows that calendar time is dominated by waiting, not coding. That supports including wait cost, but it makes forecasting harder.

## 3. Scoring

### A. Proven demand / market: 10/20
- **For:** Money is clearly being spent on adjacent needs:
  - Jellyfish DevFinOps (cost per initiative for capitalization);
  - Faros and Jellyfish AI cost modules;
  - the Uber budget blow-out;
  - FinOps "unit economics" language moving into R&D.
- **Against:** The money is for **spend control and capitalization**, not per-ticket cost or forecasts. I found no buyer paying for a ticket-level cost forecast. Estimation tools on the Jira Marketplace are free or low-install. The trend is growing, but the specific product's demand is inferred, not observed.

### B. Sellable (won't build in-house; will pay): 8/20
- **For:** The full join (agent sessions across vendors, PRs, tickets, review time, wait states) is real plumbing work.
- **Against:**
  - The 80% version is a SQL join on the Claude Code Analytics API plus GitHub, which a platform engineer can do in a week.
  - Orgs that want more already have Jellyfish or Faros, which sell cost allocation and forecasting.
  - The budget line is ambiguous. VP Eng tooling budgets already fund an SEI platform, and finance buys capitalization from that same platform.
  - "Cost per ticket" is a report someone reads once a quarter, not a daily workflow. That means churn risk and weak pricing power.

### C. AI-durability: 9/20
- **For:** The best version is an empirical calibration moat, and better models do not make org-specific history obsolete. The Bai et al. finding (models cannot predict their own cost) supports this.
- **Against:**
  1. The moat is the same data moat incumbents already hold at 100M+ PR scale. A student startup accumulates it last, not first.
  2. Faros already markets "route every task based on your own engineering work," and Cursor Router does cost routing first-party. Anthropic's console already maps sessions to PRs, so "cost per PR" becomes a first-party chart within quarters.
  3. As agents improve and token prices fall, the token part of cost shrinks. The remaining cost is human review and wait time, which is the flow-analytics market where Jellyfish, LinearB and Allstacks are entrenched.
- Durable in principle, not defensible in practice.

### D. Evidence-backed real problem: 7/15
- **Strong evidence that the problem exists:** decades of literature show estimation is bad, and 2026 work shows agent cost is volatile.
- **Weak evidence that people want this solution:** community quotes are low-upvote, and most cost-per-feature content is vendor marketing.
- The academic record also warns that sophisticated estimators rarely beat a median baseline. That raises the risk the product's headline feature adds little over a free Monte Carlo plugin.

### E. Specific, reachable buyer: 5/10
- VP/Dir Eng at 50-500 engineer orgs, with finance as co-signer, is nameable.
- But this is a two-buyer sale: Eng values the routing, Finance values the cost number. Neither is the daily user.
- The ICs whose time is estimated are wary of "cost per ticket" being read as cost per person, which is the surveillance backlash from phase 1.
- A student team can reach EMs (via communities and LinkedIn); reaching finance leaders is much harder.

### F. Feasibility & wedge for a student team: 7/15
- **For:** The retrospective MVP is buildable in about 6 weeks on public APIs (GitHub, Jira/Linear, Claude Code Analytics).
- **Against:**
  - Session-to-ticket attribution needs customer-side conventions or hooks.
  - Cursor and Copilot cost data is coarse.
  - Token history cannot be backfilled far, so forecasting needs months of fresh data per customer before the core promise exists.
  - Selling a cost tool means touching billing and HR-adjacent data, so security questionnaires come early.
  - Against Faros and Jellyfish, the honest differentiator is "cheaper, lighter, ticket-granular," which is not a durable wedge.

## 4. Verdict

| Criterion | Score |
|---|---|
| A. Demand | 10/20 |
| B. Sellable | 8/20 |
| C. AI-durability | 9/20 |
| D. Evidence | 7/15 |
| E. Buyer | 5/10 |
| F. Feasibility | 7/15 |
| **Total** | **46/100** |

The reframing (retrospective cost first, ranges not points, team-level only) fixes the worst flaws of the original idea, but it moves the idea straight into territory Faros (cost allocation, routing, spend forecasts) and Jellyfish (DevFinOps, Deliverables forecasting) already sell. What remains distinctive, a per-ticket cost-and-forecast number, is the part with the weakest demand and the worst academic track record. It works best as a feature of Idea #1 or #10, not as a company.

**Biggest risk:** The forecast will not beat a median-by-ticket-type baseline (as story-point ML repeatedly failed to), and the retrospective cost report is a quarterly read that incumbents and first-party consoles already approximate. That leaves no must-have daily workflow to charge for.

**Kill/continue test:** Backtest on 2-3 friendly teams' history. If P50 error is not at least 25% better than median-by-type, and if no VP Eng or finance lead will pre-commit to about $10k/yr for the retrospective report alone, drop it as a standalone.

FINAL SCORE: 46/100
