# Idea #4: Evidence-linked status autopilot. Evaluation

Evaluator stance: YC partner plus former VP Eng. Date: 2026-10-13. Rubric: `RUBRIC.md` (A20 / B20 / C20 / D15 / E10 / F15).

## 1. The idea, expanded

**What it is.** A tool that reads Jira/Linear, GitHub (PRs, merges, deploys), Slack threads and docs. Each week it drafts a stakeholder update in which every sentence carries a citation, a link to the PR, ticket, thread or doc that backs it. The same evidence graph renders as several views:
- a VP view: outcomes, risks, asks;
- a PM view: scope, dates, slips;
- an exec one-liner.

It also raises drift and risk flags, such as "epic marked On Track but 0 merged PRs in 9 days", "ticket Done but PR not deployed", or "review queue age doubled". Its main differentiator is a **claim-verification layer**. A status claim with no supporting artifact is flagged instead of being written.

**Core workflow.**
1. On Thursday night the system builds the week's evidence graph.
2. On Friday morning the EM gets a draft with inline citations, plus a short list of "unverified/needs input" items.
3. The tool DMs the 2-3 owners of those items on Slack with one-click confirm or edit. This replaces the "chase 3 people on Slack" step.
4. The EM edits, approves and publishes to Confluence, Notion, Slack or email.
5. Readers click through to the evidence instead of scheduling a sync.

**Wedge.** Teams that run **Jira or Linear plus GitHub** and report upward to a VP or PMO that is *not* in Jira every day. Atlassian's agent is Jira-centric. The wedge claim is "Jira says Done, GitHub says not shipped": a cross-system truth check.

**MVP (4-6 weeks).** It needs:
- GitHub App plus Jira Cloud/Linear OAuth, and a Slack bot;
- an LLM pipeline that clusters work by epic/project and writes cited bullets;
- 3 audience templates and 5 deterministic drift rules;
- a Slack confirm loop for unverified items.

Everything runs on public APIs.

**Moat (claimed).** The candidate moats are:
- an accumulated history of status claims versus outcomes, which would let it calibrate "on track" claims per team over time;
- cross-tool identity and work-item linking (PR to ticket to epic to initiative);
- workflow position as the system of record for upward reporting.

All three are thin in year one.

**Pricing.** Per-reporting-team (board/team), not per-seat, to match budget reality: **$49-99 per team per month**, or roughly $8-12 per engineer per month as a mid-market org plan ($15-30k ACV for 200 engineers). The anchors are low. Stepsize charged about $29 per Jira board or Linear team per month ([Toolify](https://www.toolify.ai/tool/stepsize-com)). Geekbot is $2.5-3 per participant ([Geekbot pricing](https://geekbot.com/pricing/)), and DailyBot is $3-5 per active user ([DailyBot pricing](https://dailybot.com/pricing)). Any higher price must be justified by the risk-detection layer, not by the write-up.

## 2. New research findings

1. **Atlassian has already shipped the core of this idea.** On 2026-07-27 Atlassian launched the **Jira Delivery Agent**, a built-in agent powered by Rovo. It "reads your work items, flags signals such as stalled work, slipping deadlines, and ownership gaps, and writes updates for specific audiences." A **Stakeholder Status Summary** template runs on a schedule and posts to Confluence or Slack, and it is available to any Jira Cloud team with Rovo enabled, with no install ([Atlassian Jira releases](https://jirareleases.atlassian.com/announcements/meet-the-jira-agent-that-runs-your-delivery-rituals)). Atlassian also publishes a "draft a weekly progress report" Rovo use case with links to tickets and pages ([Atlassian Rovo](https://www.atlassian.com/software/rovo/use-cases/draft-a-weekly-progress-report)), and ran a workshop on building "Harper", a project-progress reporting agent for PMOs and executives ([Atlassian webinar](https://www.atlassian.com/webinars/it/workshop-lets-build-a-rovo-agent-harper-your-project-progress-reporting-assistant)). Per-audience views plus risk flags is the headline of this idea, and the incumbent shipped it 3 months ago. The announcement does not mention GitHub data or per-claim citations. That gap is the only remaining space.
2. **Linear Pulse** already delivers AI-generated daily or weekly digests of project and initiative updates on all plans, including an audio version ([Linear docs](https://linear.app/docs/pulse), [changelog](https://linear.app/changelog/2025-04-16-pulse)).
3. **Stepsize AI was the closest pure-play** ("automated weekly updates based on your issue tracker activity... complete with sources", plus delivery risk alerts). It has been **acquired by ClickUp** per its own homepage ([stepsize.com](https://www.stepsize.com/)). Its visible logos are small (Nivoda, Valve, Sensehawk, edume, Boldare). The best-executed standalone version of this idea ended as a tuck-in acquisition at about $29 per board, not a breakout.
4. **The async standup and status category is crowded and cheap.** Range is still operating, with check-ins and GitHub/Jira integrations and free entry ([range.co](https://www.range.co/)). Steady pulls GitHub/Jira/Linear activity into "smart check-ins" with AI synthesis on credit-based pricing ([runsteady](https://runsteady.com/blog/how-to-replace-status-update-meetings/), [Toolradar](https://toolradar.com/tools/statushero)). DailyBot repositions toward "human + agent workforce" visibility. Spinach raised only $2.75M pre-seed (per visibility_people.md). Pensero (about $6-7M seed) sells "executive summaries" of engineering work ([Caplight](https://www.caplight.com/company/pensero), [Pensero blog](https://pensero.ai/blog/jellyfish-replacements)).
5. **DIY is trivially easy.** DevPlan publishes a step-by-step guide to a Monday status routine in Claude Code using a skill file, GitHub, Jira/Linear and Slack ([DevPlan](https://devplan.com/blog/how-to-build-a-weekly-product-status-report-in-claude/)). There are open-source MCP servers for this exact job: the Jira Weekly Reporter ([glama](https://glama.ai/mcp/servers/Jongryong/jira_reporter)) and Acture, which builds GitHub weekly summaries to Notion ([glama](https://glama.ai/mcp/servers/qxvibvsk8l)). Netlify published a Claude plus Linear-webhook "executive summaries" build ([Netlify](https://developers.netlify.com/guides/executive-summaries-across-linear-projects-using-anthropics-claude/)). Notion AI's Jira connector answers "what did eng accomplish this week" with ticket links ([eesel](https://www.eesel.ai/blog/notion-ai-connector-for-jira)).
6. **HN traction for launches here is near zero.** "AI-Powered Status Reports for Engineering Teams" got 1 point ([HN 44256160](https://news.ycombinator.com/item?id=44256160)). Gitmore's "What shipped this week? now you can just ask" got 1 point ([HN 46614884](https://news.ycombinator.com/item?id=46614884)). An HN commenter, quoting a boss who uses AI for "end of quarter status updates", shows the use is already routine in ChatGPT ([HN 48278229](https://news.ycombinator.com/item?id=48278229)).

Evidence from phase 1:
- Reddit EM thread: "Spent most of friday writing the weekly update... chased three people on Slack" (52 up).
- Thread titles: "status update fatigue" (112 up) and "Is anyone writing status updates anymore?" (129 up).
- Olczyk, "State of Engineering Management 2026": status reports are among the work "being automated away".
- visibility_people.md: there is no quantified benchmark of the hours EMs spend on this.
- x_hn_blogs.md: Tometo's builder warned that "the hard part was judging relevance."

## 3. Scoring

**A. Proven demand / market: 9/20.** The pain is real and recurring. The money is thin. Spend sits in $2-5/user standup bots and roughly $29/board report tools. The flagship pure-play (Stepsize) exited small to ClickUp, and the category's largest players (Range, Geekbot) are modest, bootstrapped-scale businesses. The trend is growing ("visibility collapse" with agents), but the growth is being captured by platforms (Atlassian, Linear, ClickUp, Notion), not by startups. There is no quantified hours-lost benchmark.

**B. Sellable (won't build in-house; will pay): 7/20.** This is the weakest point. The task can be built in an afternoon with Claude Code plus Jira/GitHub MCP, and public tutorials exist. Jira shops get the Delivery Agent bundled with Rovo, which costs them nothing extra. The cross-system angle (Jira plus GitHub plus Slack) is real, but it is a thin integration layer. The budget line is the EM's discretionary or tooling budget, which is small. Price anchors in the category sit at $3 per user. Willingness to pay $10+/engineer is unproven.

**C. AI-durability: 5/20.** It fails the "not a feature an incumbent ships next quarter" test outright, because Atlassian shipped it last quarter. Linear has Pulse, and Notion and ClickUp have equivalents. Each model improvement makes the generic summary better *inside* the incumbents' surfaces. The only durable pieces are claim verification and calibration against outcome history. Those need months of per-customer data and are easy for Atlassian, which owns the Jira data, to copy. The value is in the LLM plus data access, and the incumbents own the data.

**D. Evidence-backed real problem: 9/15.** Several independent community sources support it: Reddit threads with 50-130 upvotes, HN complaints, and practitioner blogs (Olczyk). Vendor framing from DailyBot and Atlassian agrees, but it is biased. There are no surveys or studies quantifying time or cost. The pain is "annoying hours" rather than "lost money", and the "updates became the work" quote is strong but anecdotal.

**E. Specific, reachable buyer: 6/10.** EMs and Directors of Eng at 50-500-engineer companies are clearly named and reachable through r/EngineeringManagers, LinkedIn, Rands Slack and newsletters. PMO/TPM is a second buyer. However, the daily user (EM) has little budget authority, and the payer (VP/PMO) increasingly gets this from the Jira or Linear plan they already pay for.

**F. Feasibility & wedge for a student team: 10/15.** The MVP is very feasible in weeks on public APIs (GitHub App, Jira/Linear OAuth, Slack). Read-only scopes ease security review somewhat, but reading private repos plus Slack still triggers vendor-security questionnaires at mid-market. The wedge ("Jira says Done, GitHub says not shipped") is differentiated but narrow. The ease of the build is itself the problem: anyone, including the customer, can build it.

| Criterion | Score |
|---|---|
| A. Demand | 9/20 |
| B. Sellable | 7/20 |
| C. AI-durability | 5/20 |
| D. Evidence | 9/15 |
| E. Buyer | 6/10 |
| F. Feasibility/wedge | 10/15 |
| **Total** | **46/100** |

## 4. Verdict

This is a real, frequently voiced pain attached to a product that is now a bundled incumbent feature (Jira Delivery Agent, Linear Pulse, Stepsize inside ClickUp) and an afternoon DIY with Claude plus MCP. As a standalone company it is below average. It is best treated as an *output surface* of a deeper data product such as idea #3 (Manager Memory) or idea #9 (Flow/risk radar): "status that verifies itself against GitHub, deploys and agent telemetry" works as a feature there, not as the company.

**Biggest risk:** Atlassian's Rovo-powered Jira Delivery Agent (July 2026) already ships scheduled, audience-specific stakeholder summaries with risk flags at no extra cost to Jira Cloud customers. That removes both the willingness to pay and the wedge before an MVP exists.

FINAL SCORE: 46/100
