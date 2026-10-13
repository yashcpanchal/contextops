# Idea #5: Review-capacity orchestrator: evaluation

Evaluator stance: YC partner plus former VP Eng. Date: 2026-10-13. Rubric: `research/phase1-scoring/RUBRIC.md`.

## 1. The idea, expanded

**What it is.** A GitHub/GitLab app that treats human review attention as a scarce, budgeted resource. It (a) measures reviewer load and "review debt" (open, unreviewed, or silently approved PRs, weighted by risk); (b) triages every incoming PR, especially agent-generated ones, by risk, novelty and blast radius; (c) routes each PR to the right reviewer using expertise plus current load; (d) flags rubber-stamped merges after the fact (high-risk PR, approval in under N minutes, no comments); and (e) suggests or auto-splits oversized PRs.

**Core workflow.**
1. A PR opens and gets a risk/effort score. It lands in one of three lanes: auto-merge eligible, light review, or deep review by an expert.
2. A reviewer is assigned from an expertise graph and a load model.
3. The EM sees a weekly "review capacity" view: load concentration, queue age, the share of high-risk PRs merged without substantive review, and the AI share of the queue.
4. Alerts fire when debt crosses thresholds.

**Wedge.** The "rubber-stamp audit" for AI-heavy teams. The question it answers is "which risky AI-authored PRs merged without a real review last month?" It is a retrospective, read-only GitHub App that needs no workflow change. Upsell to routing and lanes.

**MVP (4-6 weeks).** A GitHub App that ingests the PR, review and comment history. It computes per-reviewer load, silent-approval rate and queue age, uses an LLM to classify diff risk and AI origin, and ships a weekly Slack/email digest plus a CODEOWNERS-aware reviewer suggestion bot.

**Moat (claimed).** A per-org expertise graph, labeled outcome data (which risk scores preceded reverts and incidents), and neutrality across AI-review vendors. Realistically, the expertise graph is replicable from git history by anyone with repo access (Aviator already does it with forgetting-curve scores). The outcome labels are the only defensible asset, and they take a long time to accumulate.

**Pricing.** $8-15 per active committer per month, or a team tier around $300-1,000/month for 20-100 engineers. That has to fit *next to* a CodeRabbit/Copilot seat the customer already pays for, which is the core problem.

## 2. New research findings

**The bottleneck is real and well documented, from several independent sources.**
- CMU/Stanford (arXiv 2607.01904, July 2026; 802 devs, ~200k PRs, one company): PR volume grew 3.1x and the reviewer pool 1.5x. The share of PRs with any written human feedback fell from 39% to 21%, and silent approvals per reviewer roughly doubled while commented reviews stayed flat. Engineer quote: "Everyone is playing the theater of doing reviews." https://semgrep.dev/blog/2026/end-is-nigh-for-code-review
- Faros (vendor, 10k+ devs): +98% PRs, +91% review time, +154% PR size (in phase1/ai_era.md).
- LinearB 2026 benchmarks (8.1M PRs, 4,800 teams, vendor): AI PRs merge within 30 days 32.7% of the time vs 84.4% for unassisted PRs. https://linearb.io/library/ai-in-software-development ; https://linearb.io/resources/engineering-benchmarks-report
- Reddit: "I won't be reviewing AI generated PRs" (1,920 up), and a manager "opening huge PRs that were just impossible to review" (phase1/reddit.md).
- Counter-signal: The New Stack ran "AI hasn't shifted the bottleneck from coding to code review" (https://thenewstack.io/ai-code-bottleneck-myth/, HN id 48954189), so the framing is contested at the margin.

**Incumbents already ship the core of this idea. This is the decisive finding.**
- **CodeRabbit Triage** (announced Aug 12, 2026, InfoWorld). It is a cross-repo queue for agent-generated PRs that scores "business value, urgency, risk, effort, readiness, dependencies, linked issues, ownership, and reviewer fit." It has priority bands and "Find reviewer"/Slack-ping actions, auto-merges ready changes, and recommends closing stale PRs. It ships alongside **Change Stack** (an interactive blast-radius view). Docs: "Triage is available on the Team plan and higher." https://infoworld.com/article/4208611/coderabbit-targets-ai-generated-code-overload-with-agentic-change-management.html ; https://docs.coderabbit.ai/triage . CodeRabbit raised at a $550M valuation in Sep 2025, and Sacra estimates ~$40M ARR (phase1/competitors.md). That is almost exactly bullets 2-3 of idea #5, from a well-funded leader with distribution.
- **Greptile auto-approve** (beta): Low/Medium/High/Critical risk tiers. It never auto-approves auth, billing, migrations or infra, and it supports label/author filters. https://www.greptile.com/docs/code-review/auto-approve-prs . This is the "safe to merge" lane.
- **Aviator FlexReview**: per-file expertise scores using a forgetting curve, plus review load (interactions decayed over 7 days) for load-balanced assignment. https://docs.aviator.co/flexreview/reference/expert-scoring-algorithms
- **LinearB gitStream**: routes PRs "based on code ownership, expertise, or workload," adds estimated-review-time labels, and reports review concentration across the top 20% of reviewers. https://linearb.io/blog/why-estimated-review-time-improves-pull-requests-and-reduces-cycle-time
- **Span** ($25M raise, Nov 2025) has a "Review Capacity" report that "surfaces imbalances, cross-team dependencies, and concentration risk," plus an AI-code detector. https://span-knowledge-base.help.usepylon.com/articles/5393571883-review-capacity-report ; https://www.businesswire.com/news/home/20251105703479/en/
- **GitHub**: the new PR dashboard/Inbox went GA on Jul 9, 2026 and covers agent-created PRs (https://github.blog/changelog/2026-07-09-new-pull-requests-dashboard-is-now-generally-available). Native team auto-assignment already load-balances on outstanding reviews and skips "Busy" members (https://docs.github.com/en/enterprise-server@3.0/organizations/organizing-members-into-teams/managing-code-review-settings-for-your-team).
- **Graphite (Cursor)** has a review inbox and merge queue. Cursor Bugbot covers Cursor-native teams.
- **Startups in the exact slot**: Haystack's Show HN pitches "Review the PRs that need human attention," with safe-to-merge, needs-fixes and needs-human-review buckets (45 pts, https://news.ycombinator.com/item?id=48182856). A top comment asks what it adds beyond prompting Claude/Codex to "let a human review." Stage, a PR-chunking review tool, is sunsetting (https://news.ycombinator.com/item?id=48996894). Pyor and PullSense are also in the space.
- **Analyst warning** (InfoWorld, Info-Tech's Bellamkonda): GitHub and GitLab are "the bigger threat" because they could build prioritization into existing tools.

**Is anyone doing pure reviewer-load / review-debt orchestration?** Partially, yes: Aviator (load-balanced routing), gitStream (workload routing), Span and LinearB (capacity reports), CodeRabbit Triage (queue plus reviewer fit). What I did **not** find shipped as a first-class product is the **retrospective "rubber-stamp / review-debt audit"**: risky PRs merged with silent approvals, measured as an org-level liability. That is the only real gap, and it is a report, not a company.

## 3. Scoring

**A. Proven demand / market: 14/20.** The pain is among the best quantified in the whole research set (CMU/Stanford, Faros, LinearB, LeadDev 52%), and money is clearly flowing into review: CodeRabbit ~$40M ARR (est.), Graphite acquired by Cursor, Span's $25M. But that money buys AI *reviewers*, not review *orchestration*. Standalone WTP for routing/queue tools is unproven (PullApprove is tiny, Stage is sunsetting). The trend is strongly up. Docked because budgets attach to the adjacent category, which now bundles this.

**B. Sellable (won't build in-house; will pay): 7/20.** The buyer already pays CodeRabbit, Copilot or Graphite, and those products now include triage, risk lanes and reviewer suggestions at no extra line item. GitHub's native load-balancing plus CODEOWNERS plus a Claude-powered Action is a weekend DIY that platform teams actually build. The "vendor-neutral across AI reviewers" argument is weak, because orgs standardize on one reviewer bot. There is no distinct budget line; it competes with seats already bought.

**C. AI-durability: 5/20.** Fails the rubric's explicit test ("not a feature that GitHub, Atlassian, Anthropic or Cursor will ship next quarter"). CodeRabbit shipped it in Aug 2026, Greptile ships risk-tiered auto-approve, and GitHub ships the inbox and load-balanced assignment. The risk classification is pure LLM work and gets commoditized as models improve: better models make the AI reviewer itself the triage engine. The expertise graph is replicable. Only long-run outcome-labeled data (risk score to revert/incident) is a moat, and incumbents with more PRs will accumulate it faster.

**D. Evidence-backed real problem: 13/15.** Multiple independent sources: an academic study (CMU/Stanford), large vendor telemetry from two vendors, high-engagement Reddit threads, HN, and LeadDev survey data. The silent-approval metric directly supports the "rubber-stamp" feature. Docked slightly because the strongest academic data is from a single company, and because of the contested-framing counter-piece.

**E. Specific, reachable buyer: 6/10.** EM/Dir Eng or platform lead at 30-300-engineer, AI-forward companies on GitHub. They are reachable via the GitHub Marketplace, r/ExperiencedDevs and EM communities. However, the champion's first reflex is "turn on CodeRabbit Triage" or "ask our CodeRabbit rep," and the platform lead (the natural buyer) is also the natural DIY builder.

**F. Feasibility & wedge for a student team: 7/15.** Technically the easiest MVP in the top 10: a GitHub App with public APIs and no SOC2 for a read-only metadata version, buildable in weeks. But differentiation against incumbents is near zero on routing and triage. Read access to private code still triggers security review. The narrow rubber-stamp-audit wedge is buildable but may be a single dashboard tile that Span, LinearB or CodeRabbit add.

| Criterion | Weight | Score |
|---|---|---|
| A. Demand | 20 | 14 |
| B. Sellable | 20 | 7 |
| C. AI-durability | 20 | 5 |
| D. Evidence | 15 | 13 |
| E. Buyer | 10 | 6 |
| F. Feasibility/wedge | 15 | 7 |
| **Total** | 100 | **52** |

## 4. Verdict

The problem is real and among the best evidenced in the research set, but the product is a feature that the best-funded AI-review vendor (CodeRabbit Triage, Aug 2026), Greptile, Aviator, LinearB and GitHub itself have already shipped or are shipping. As a standalone startup it is a "me-too, later, with no distribution." Salvage path: fold the "review debt / rubber-stamp audit" signal into ideas #1/#2 (cost and outcome attribution) or #6 (comprehension/provenance), where it is a differentiating input rather than the product.

**Single biggest risk:** Bundling. CodeRabbit, GitHub and Cursor/Graphite already sell this as part of the review seat the customer already pays for, so there is no budget line or reason to buy a separate orchestrator.

FINAL SCORE: 52/100
