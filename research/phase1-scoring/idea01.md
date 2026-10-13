# Idea #1: AI Spend-to-Outcome Ledger ("FinOps for AI coding")

Evaluator: a YC partner / former VP Eng persona. Date: 2026-10-13. Rubric: `RUBRIC.md` (A 20, B 20, C 20, D 15, E 10, F 15).

## 1. The idea, expanded

**What it is.** A vendor-neutral ledger that pulls seat and token spend from Claude Code, Cursor, GitHub Copilot and Codex (admin/billing APIs plus OpenTelemetry) and attributes it to team, repo, PR and ticket. It then joins that spend to outcomes: merged vs. abandoned, reverted within N days, review rounds, and time-to-merge. On top of the ledger sit budgets, anomaly alerts, chargeback statements and policy guardrails (for example, "Opus only on repos tagged X", or "alert when one session passes $200").

**Core workflow.**
1. A platform lead connects vendor admin keys, GitHub/GitLab and Jira/Linear in about 30 minutes.
2. Each week, the VP Eng gets a digest: spend by team and tool, cost per merged PR, the top 10 spend outliers along with their outcomes, and teams trending over budget.
3. Finance gets a monthly chargeback CSV by cost center.
4. When a session or person spikes, an alert lands in Slack.
5. Each quarter, the VP Eng uses the data in renewal negotiations ("cut 40 Cursor seats, move those users to Copilot Business").

**Wedge.** "Your combined AI coding bill in one place in 30 minutes, with cost per merged PR." Aim at Series B-D companies with 100-800 engineers that run 2+ AI coding tools and have no FinOps tooling for AI yet.

**MVP (6-8 weeks).** Connectors for the Anthropic Claude Code Analytics/Enterprise Analytics API, the Cursor Admin API, the Copilot billing/usage API and GitHub. Spend is attributed by user, then mapped to team through a GitHub team/CODEOWNERS mapping. It includes PR-level joins using the `claude-code-assisted` label and session timestamps, a weekly email digest and a CSV chargeback. No forecasting, and no per-person rankings by default.

**Moat (claimed).** Neutrality across vendors, a normalized cross-vendor cost schema that stays current as pricing changes (Copilot's move to AI Credits, Cursor's pooled usage), and longitudinal spend-to-outcome history that feeds later features (idea #2's cost-of-delivery and idea #10's routing).

**Pricing.** About $8-15 per engineer per month, or 1-3% of tracked AI spend, with a free tier under 25 engineers. A benchmark: Span is reported at about $24/dev/month, and Exceeds claims to be "under $20K/yr" (both figures come from the Exceeds blog, so they are competitor-sourced). At 300 engineers this gives about $30-50K ACV.

## 2. New research findings

**First-party vendors already ship most of the single-vendor version:**
- **Anthropic.** The Claude Code analytics dashboard (Team/Enterprise) shows "PRs with CC", lines shipped with Claude Code and a per-user leaderboard. Attribution works by matching session output to merged-PR diffs, and those PRs get the `claude-code-assisted` label in GitHub. A spend report gives estimated spend per user and per model, and the Enterprise Analytics API returns per-user cost. Source: https://code.claude.com/docs/en/analytics. This is spend joined to PR outcomes, done first-party.
- **Cursor.** Spend limits can be set per member, per group and team-wide, and the Admin API supports both reading and setting limits. Source: https://cursor.com/docs/account/billing/spend-limits. Datadog Cloud Cost Management already breaks down Cursor cost by user, model and billing group, with alerts. Source: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
- **GitHub.** Copilot has cost centers for chargeback and budgets for overage spend. Source: https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/manage-and-track-spending/manage-company-spending. Third-party reports describe per-cost-center user budgets and AI credit pools shipped in June-July 2026; these are unverified against GitHub. Source: https://ecorpit.com/github-copilot-ai-credit-pools-cost-control-enterprise-2026/

**The cross-vendor version is already shipped by funded incumbents:**
- **DX (Atlassian).** The "AI cost management report" has out-of-the-box Claude, Cursor and Copilot integrations and gives "estimated cost per PR". Spend breaks down by team, contributor and tool, with spend forecasts. Last updated June 9, 2026. Source: https://getdx.com/blog/meet-the-new-ai-cost-management-report/. This is almost exactly idea #1, sold by a Gartner MQ Leader that Atlassian owns.
- **Jellyfish.** An "AI Token Cost Management" module that monitors "token usage, costs, and outcomes across every tool, team, and model". Its packaging changed to "Token Spend Metrics" in May 2026. Sources: https://jellyfish.co/platform/jellyfish-ai-impact/investment-management/ and https://pricingsaas.com/companies/jellyfish/diffs/2026W22
- **Faros.** AI coding cost allocation by team, tool, model, repo and workload. It has session-level attribution, per-team budget tracking and chargeback statements, with consumption-based pricing. Source: https://www.faros.ai/solutions/ai-coding-cost-allocation
- **Larridin.** Launched "Token Spend & Insights" in June 2026. It publishes benchmark data showing median billed spend of about $213/engineer/week. Sources: https://larridin.com/press-releases/larridin-launches-token-spend-insights-product and https://larridin.com/data
- **Span and Exceeds AI.** Span raised $25M (Nov 2025) for cross-tool AI impact measurement and has an AI Tool Spend Report in beta. Sources: https://www.thesaasnews.com/news/span-secures-25-million-in-funding/ and https://span-knowledge-base.help.usepylon.com/articles/6537829495-ai-tool-spend-report. Exceeds links token spend to commits and PRs. Source: https://blog.exceeds.ai/compare-ai-coding-token-prices
- **Cloud FinOps vendors.** Harness CCM has Anthropic, Copilot and Claude Code (OTel) integrations (https://developer.harness.io/cloud-cost-management/integrations). Finout covers Copilot alongside Claude Code (https://www.finout.io/github-copilot-integration). CloudZero ships AI tooling (https://docs.cloudzero.com/changelog/mcp-server-for-agentic-coding-tools). Port has a DIY guide for a unified Cursor+Claude+Copilot cost dashboard (https://www.docs.port.io/guides/all/track-ai-coding-assistants-costs/).
- **Weave (YC W25).** Reportedly raised a $13.5M Series A to fight "tokenmaxxing". This comes from non-primary coverage only: https://ecosistemastartup.com/?p=94089
- **Indie tools.** The HN Algolia API (2025-2026) shows many low-traction "Show HN" cost trackers: a self-hostable AI coding spend dashboard (item 48767736), ObservAgent (47391414), Cursor Cost Explorer (45894242) and Agentic Metric (47308185). All have 1-3 points, which suggests both a crowded space and weak organic pull for standalone trackers.

**Buyer evidence (strong):**
- **Atlassian.** Gave R&D staff capped "AI wallets" of $500-$2,000/month that warn and then stop usage at the limit (TNW, July 30, 2026: https://thenextweb.com/news/atlassian-ai-wallets-tokenmaxxing). This is a real budget-control buyer, but it was solved internally or with native tooling.
- **FinOps Foundation, State of FinOps 2026.** 98% of FinOps teams manage, or expect to manage, AI spend, up from 31% two years earlier. AI cost management is the top skill teams plan to add. Source: https://www.linuxfoundation.org/press/state-of-finops-survey-ai-value-and-skills-top-priorities-as-finops-matures-across-technology-value-98-manage-ai-90-saas-64-licensing-48-data-center-1
- **Earlier research in this repo.** Gartner (AI coding cost to exceed developer salary by 2028), the Uber budget burn and $1,500 cap, DX (86% of leaders unsure which tools pay off), Pragmatic Engineer ("$500 a day on Claude Code"), and Reddit ("tokenomics meetings", $60k/mo doubling, a "central API gateway with per-team budgets" built in-house).

## 3. Scoring

**A. Proven demand / market: 16/20.** This is the best-evidenced pain in the whole Phase 1 set. It is quantified (Gartner; Larridin's ~$900/eng/month median; Uber; Atlassian wallets) and growing (FinOps Foundation: 31% to 98%). Money is clearly being spent: DX was acquired for ~$1B, Span raised $25M, Weave reportedly raised $13.5M, and Jellyfish and Faros both ship modules for it. I deducted points because much of the quantified evidence is vendor-sourced. It also isn't clear that companies spend on a standalone ledger rather than on the platform it ships inside.

**B. Sellable (won't build in-house, will pay): 8/20.** The budget line is real, but the buyer already has three cheaper paths:
- native consoles from each vendor (Anthropic spend report, Cursor groups, Copilot cost centers);
- a cost-per-PR report bundled into an SEI or FinOps platform they already pay for or are evaluating (DX, Jellyfish, Faros, Harness, Finout, Datadog);
- an in-house gateway or wallet (Atlassian; the Reddit "central API gateway" commenter).

Cross-vendor neutrality was meant to be the reason to buy, and DX, Jellyfish and the FinOps vendors already offer it. A new entrant would be selling a feature against suites. Procurement for a tool that needs admin billing keys is also not trivial.

**C. AI-durability: 8/20.** Better models do not make it obsolete; rising spend actually helps. But the rubric's specific test is "not a feature that GitHub, Atlassian, Anthropic or Cursor will ship next quarter", and they have already shipped it:
- Anthropic does PR-level attribution plus per-user spend.
- Cursor has spend limits and billing groups.
- GitHub has cost centers and budgets.
- Atlassian (through DX) has cross-vendor cost per PR.

The remaining moat, a normalized cross-vendor schema, is integration plumbing that well-funded incumbents already maintain. A longitudinal outcome dataset only becomes a moat at a scale a new entrant won't reach before the incumbents do.

**D. Evidence-backed real problem: 12/15.** Independent sources line up: Gartner, the FinOps Foundation survey, the DX survey, Pragmatic Engineer reporting, TNW's Atlassian story and Reddit EM threads. I deducted points because the community signal is thin (Reddit comments with 1-11 upvotes, HN posts with 1-3 points) and the larger numbers mostly come from vendors with an interest in them (Jellyfish, Larridin, DX).

**E. Specific, reachable buyer: 6/10.** The buyer is clear: a VP Eng or CTO with a FinOps or finance partner, at companies with 100-1,000 engineers using 2+ tools. The FinOps community and the Slack groups where platform engineers gather are reachable channels. But these are senior budget holders who already get calls from DX, Jellyfish and their cloud FinOps vendor, and a student team has little credibility with them on a finance-grade product.

**F. Feasibility & wedge for a student team: 6/15.** Technically, an MVP is very achievable in weeks because every vendor now exposes an admin or analytics API and OTel. That is also the problem: the low barrier is why there are already a dozen Show HN clones. The product needs org-admin billing keys plus GitHub and Jira access, which brings in security review and pushes toward SOC2 early. There is no clear differentiation from DX's existing report. The only plausible wedge is down-market (teams of 20-100 engineers on 2+ tools with no SEI platform), and there willingness to pay is low and the native consoles may be good enough.

| Criterion | Score |
|---|---|
| A. Demand | 16/20 |
| B. Sellable | 8/20 |
| C. AI-durability | 8/20 |
| D. Evidence | 12/15 |
| E. Buyer | 6/10 |
| F. Feasibility/wedge | 6/15 |
| **Total** | **56/100** |

## 4. Verdict

The problem is the most validated one in the Phase 1 set, but the product category formed and consolidated in the first half of 2026. Atlassian/DX ships cross-vendor cost per PR, and Anthropic ships first-party PR attribution with per-user spend. As a standalone startup for a student team, this is a feature competing against suites. Its best use is as a data layer and hook inside a differentiated product (for example idea #2's true cost of delivery, or idea #10's routing), not as the company itself.

**Biggest risk:** It is already a bundled, checkbox feature. DX (Atlassian), Jellyfish, Faros, the cloud FinOps vendors and each AI vendor's native console cover cross-vendor spend-to-PR attribution, so there is no neutral white space left to sell.

FINAL SCORE: 56/100
