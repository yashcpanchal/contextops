# Idea #10: Human+agent capacity planner and work router

Evaluator: Opus 5.5 subagent (rubric: `RUBRIC.md`). Date: 2026-10-13.

## 1. The idea, expanded

**What it is.** It's a planning layer that sits above Jira/Linear and GitHub. For every ticket in the backlog, it predicts whether a coding agent (Copilot coding agent, Codex, Claude, Cursor, Devin, Factory) will finish it cheaply, will "blow up" (rework, CI failures, abandoned PR, long review), or should be paired with a human. It then plans sprint capacity across human hours and agent throughput. The real limit on agent throughput is human review capacity, not tokens. It also enforces WIP limits on parallel agent streams per engineer.

**Core workflow.**
1. Connect GitHub plus Jira or Linear. The tool backfills history and labels past agent-authored PRs (bot authors, `copilot/` branches, agent co-author trailers), with outcomes: merged, reverted, review rounds, time-to-merge, and follow-up fix PRs.
2. It trains a per-org classifier over ticket features (type, labels, component/repo, files likely touched, description quality, size) against agent outcomes.
3. During refinement, each ticket gets a badge, "Agent / Pair / Human", with a confidence and the reason ("bug fixes in `payments/` were merged 2 of 9 times").
4. During sprint planning, it shows capacity as human points plus agent tickets, capped by available review hours. It warns when one engineer has more than N agent PRs in flight.
5. One click assigns the ticket to the chosen agent through the native Jira/Linear/GitHub assignee field.

**Wedge.** A free GitHub+Linear app: an "agent scorecard" that reports, retrospectively, which kinds of your tickets agents actually landed. It then adds per-ticket routing badges.

**MVP (4-6 weeks).** GitHub App plus Linear/Jira OAuth. Agent-PR detection heuristics, an outcome labeler, a simple gradient-boosted or LLM-assisted classifier, and a backlog badge plus a weekly digest. No agent execution, because assignment is delegated to native integrations.

**Moat (claimed).** Cross-vendor outcome data on agent work per org, plus benchmarks pooled across customers ("Codex lands CI tickets 80% of the time, Devin 60%").

**Pricing.** $15-25 per engineer per month, or a $500-2,000/month team tier. Realistically it gets bundled into a broader SEI/AI-ROI product.

## 2. New research findings

**Incumbents own the assignment surface, and all of them shipped it in 2025-2026.**
- Linear lets you delegate issues to Codex, Cursor, Copilot, Factory, Devin and Sentry as if they were teammates. Delegated work is tracked in "My Issues". Codex "automatically chooses the right repo" and can take "a first pass at issues in your Triage queue". Sources: https://linear.app/integrations/agents, https://linear.app/changelog/2025-08-21-cursor-agent
- Linear Triage Intelligence already suggests assignees, teams and labels "based on your team's historical patterns", with auto-apply and an explanation of each suggestion (Business/Enterprise plans). Adding "agent" as a suggested assignee is a small extension of a shipped feature. Source: https://linear.app/docs/triage-intelligence
- Agents in Jira was reported generally available in May 2026: "assign work items to AI agents the same way you'd assign work to a colleague", choosing from Rovo agents, the GitHub Copilot coding agent, Claude, Cursor, Codex, or a native Jira Coding Agent. Sources: https://www.atlassian.com/software/jira/dev, https://jirareleases.atlassian.com/announcements/put-ai-teammates-to-work-right-inside-jira
- Atlassian also ships a Rovo **Agent Readiness Checker** that scores Jira issues on Completeness, Clarity, Auditability and Estimated, and suggests fixes. In a blog post on its own internal study, Atlassian reports that 83% of agent-oriented tickets were "agent-ready" versus 6% of traditionally written ones. Sources: https://www.atlassian.com/software/rovo/use-cases/agent-readiness-checker, https://www.atlassian.com/blog/jira/writing-tickets-for-ai-agents
- GitHub: you assign issues to Copilot from the assignee sidebar, the API, the CLI, the agents panel or Raycast. Agent HQ hosts Copilot, Codex and Claude on one control plane. Copilot usage metrics (GA February 2026) report merged coding-agent PRs and time-to-merge, which is exactly the outcome data this idea would learn from. Sources: https://docs.github.com/en/copilot/using-github-copilot/coding-agent/using-copilot-to-work-on-an-issue, https://github.blog/changelog/2026-02-19-pull-request-throughput-and-time-to-merge-available-in-copilot-usage-metrics-api/, https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available
- Marketplace apps and DIY recipes already cover "which ticket goes to an agent":
  - Complexity Prism (Jira) records an AI complexity score from 1 to 5 during refinement: https://marketplace.atlassian.com/apps/4095433796/complexity-prism
  - TicketIQ checks tickets against Definition of Ready: https://marketplace.atlassian.com/apps/3517075779/ticketiq
  - Port has published a guide for triaging tickets to coding agents (URL now returns 404, so unverified): https://www.docs.port.io/guides/all/triage-tickets-to-coding-agents
  - An open-source Claude skill sorts Jira bugs into AI-Fixable / Needs Human / Needs Info: https://www.claudepluginhub.com/skills/opendatahub-io-odh-ai-helpers/ai-bug-fix-triage

**Orchestration platforms are well funded and moving up-stack.** Factory reportedly raised $200M at a $5B valuation, pitching "software factories" (https://thenextweb.com/news/factory-200m-5bn-valuation-ai-coding-agents). Other players are Warp Oz (parallel cloud agents), UiPath running third-party coding agents under its own governance layer (https://diginomica.com/uipath-opens-its-platform-every-coding-agent-heres-why-claude-code-and-codex-go-first), Tembo, and Kilo ($8M seed, https://blog.kilo.ai/p/kilo-raised-8-million-seed-round). On HN, parallel-agent session managers are a crowded Show HN category: Superset, with 96 points (https://news.ycombinator.com/item?id=46368739), and Agent-of-empires, with 118 (https://news.ycombinator.com/item?id=46588905). One comment lists eight or more orchestrators, including Conductor, Emdash and GitKraken Kepler (https://news.ycombinator.com/item?id=49945423).

**Agent success really does vary by task type, which is the core thesis.** Ehsani et al. studied 33k agent-authored PRs from five agents. Documentation, CI and build tasks have the highest merge success, while performance and bug-fix tasks have the lowest. Larger diffs, more files touched and CI failures predict failure. Many failures are socio-technical: no reviewer engagement, duplicate PRs, unwanted features (https://arxiv.org/abs/2601.15195). Rahman, Rabbi and Zibran also find acceptance differs by task category and by agent, with Codex highest (https://arxiv.org/abs/2602.02345). The catch is that these patterns are coarse and public. A rules table ("docs/CI/deps go to the agent, perf/security go to a human") captures most of the signal without any per-org model.

**Evidence that EMs struggle with what to delegate is thin.** Anthropic's 2026 agentic coding trends report, as summarized by secondary sources, says developers use AI in about 60% of their work but "fully delegate" only 0-20% of it (https://claude.com/blog/eight-trends-defining-how-software-gets-built-in-2026; https://agentmarketcap.ai/blog/2026/04/06/full-delegation-ceiling-20-percent-autonomous-ai-engineering-tasks). That is a developer-level choice made in the moment, not a manager's planning problem. HN Algolia searches for comments on delegation and routing decisions since 2025 returned almost nothing: zero hits for "good fit for an agent" and "delegate to the agent" tickets. Phase-1 research also rated agent assignment and ownership as intensity 3, "mostly think-pieces" (ai_era.md P3), and scored the routing idea lowest of its candidates (14/25 in ai_era.md, 16/25 in competitors.md). x_hn_blogs.md had already warned that "variance of agentic work is huge and not predictable from the ticket text".

## 3. Scoring

**A. Proven demand / market: 7/20.**
- No one is paying for routing or capacity across humans and agents as a category.
- Adjacent spend (SEI platforms, DX bought for about $1B) is about measurement, not assignment.
- I found no quantified pain about assignment decisions, no community threads, and no buyer surveys. The trend toward agent adoption is real, but the pain that follows from it shows up as review load and cost, not routing.

**B. Sellable: 7/20.**
- The decision is made by the individual engineer in seconds, and a team convention ("agents get deps/docs/flaky-test fixes") covers most of it.
- Claude plus a Jira MCP can produce a passable suitability score today, and the Atlassian Readiness Checker already does.
- Cross-vendor neutrality is the only real argument. It only matters to orgs running three or more agents at once, and even those see all of them inside Jira, Linear or GitHub, which are already neutral hosts.
- There's no budget line for it, and EMs are not the buyers.

**C. AI-durability: 5/20.**
- This is the weakest part. As models improve, the set of tasks that "blow up" shrinks, so the product's reason to exist shrinks with it.
- The assignment UI, the history-based assignee suggestions (Linear Triage Intelligence) and the outcome metrics (Copilot usage API) all belong to Linear, Atlassian and GitHub, and all were shipped in the last 12 months.
- Recommending "agent" as an assignee is a next-quarter feature for any of them.
- Agent vendors (Factory, Devin, Codex) are also motivated to self-select tasks they can win.
- The pooled cross-customer benchmark is a weak moat, because academic datasets (33k-PR studies) already publish the coarse version for free.

**D. Evidence-backed real problem: 6/15.**
- The underlying fact, that agent success varies by task type, is well evidenced by independent academic studies.
- The claim that this is a problem someone wants solved by a tool is supported mainly by think-pieces and vendor content.
- WIP and parallel-stream pain has one practitioner source (Codacy).

**E. Specific, reachable buyer: 5/10.**
- A nameable buyer exists: an EM or Director of Engineering at a 50-500-engineer company running two or more coding agents.
- But the EM is the daily user, not the budget holder, and this team has no channel to that buyer beyond cold outreach and Linear/Atlassian marketplaces.

**F. Feasibility & wedge: 8/15.**
- A retrospective "agent scorecard" MVP is buildable in weeks with public GitHub/Linear/Jira APIs.
- Cold start is severe: a per-org model needs hundreds of labeled agent PRs per ticket type.
- Agent attribution is messy across vendors, and the student team has no data advantage over GitHub.
- Differentiation from Linear Triage Intelligence and Rovo is hard to articulate in a demo.

| Criterion | Score |
|---|---|
| A. Demand | 7/20 |
| B. Sellable | 7/20 |
| C. AI-durability | 5/20 |
| D. Evidence | 6/15 |
| E. Buyer | 5/10 |
| F. Feasibility | 8/15 |
| **Total** | **38/100** |

## 4. Verdict

This is a feature, not a company. The thesis that agents succeed unevenly by task type is true and well documented. But the routing decision is cheap and made by engineers in the moment, and the platforms that own the assignee field (Linear, Jira/Rovo, GitHub Agent HQ) already have the history-based suggestion engines and the outcome telemetry needed to ship it.

The only salvageable piece is the retrospective "which ticket types do agents actually land, at what review cost" analytics. That belongs inside idea #1 or #2 (spend-to-outcome or cost of delivery) as a derived routing recommendation, not as a standalone product.

**Biggest risk.** Linear, Atlassian or GitHub adds "suggested assignee: agent" with a success-rate tooltip to their existing triage/assignment UI. Their outcome data is better than ours, and that one change would wipe out the product overnight.

FINAL SCORE: 38/100
