# Phase 2: Competitor gap deep-dive, "FinOps for AI coding that ACTS"

Date: 2026-10-13. Method: ~30 web fetch/search calls. Legend: [V] = read on the vendor's own page or docs; [S] = secondary or search snippet only; [U] = unverified or not found. Where a vendor page says nothing about a feature, I write "not stated", which is not proof the feature is absent.

## 1. Per-competitor findings

### Suite and SEI vendors (sales-led, report-first)

**DX AI cost management report** [V] https://getdx.com/blog/meet-the-new-ai-cost-management-report/ , docs: https://docs.getdx.com/reports/ai-cost-management/
- Out-of-box Claude, Cursor and Copilot connectors, plus a custom `aiToolMetrics.push` API.
- Cost per PR is spend divided by merged PRs. Views by team, contributor and tool, token split (input, output, cached), and spend forecasts from historical trend.
- No budgets and no actions are described. It is "analysis and investigation".
- Not self-serve: it requires DX Data Cloud and goes through an account rep. Price not stated.

**Jellyfish Token Spend Metrics** [V] https://jellyfish.co/platform/jellyfish-ai-impact/investment-management/
- Broadest connector list: Copilot, Cursor, Claude Code, Windsurf, Gemini Code Assist, Amazon Q, Replit, CodeRabbit, Greptile, Graphite, Devin, Factory.
- Spend vs PR throughput correlation, YTD/projected/run-rate, and allocation by roadmap/KTLO. No alerts or caps are mentioned.
- CTAs are "Get a Demo", so it is sales-led (inference). Price not stated.
- Its data narrative: heaviest spenders are about 600x the cost for about 2x the output, and people default to the top model for everything (https://jellyfish.co/blog/is-tokenmaxxing-cost-effective-new-data-from-jellyfish-explains/ [S]). This is direct evidence that model-choice waste exists.

**Faros AI** [V] https://www.faros.ai/solutions/ai-coding-cost-allocation
- Allocation by team, tool, model, repo and workload. Per-team budget vs projected spend. Cost per outcome, with the join method not explained.
- It is the only suite that claims enforcement: "enforces model routes and agent context at your gateway" and an AI Governance offering for model, budget and data policy. Specific actions are not detailed. It explicitly says it does not blanket-cap usage.
- Consumption pricing, no figures, "Book a demo". Sales-led. It is the closest to our thesis but gateway-based and enterprise-weighted (60+ sources).

**Larridin Token Spend & Insights** [V] https://larridin.com/press-releases/larridin-launches-token-spend-insights-product
- Ingests Bedrock, GCP, OpenAI, Codex, Cursor, Claude, LLM gateways, employee-built agents and CSV invoices. Flags projected overages, unattributed cost, unowned agents and dormant seats.
- Quote: "A projected-overage alert is not an enforced spending cap." Outcome join is "the next challenge", so not shipped. Pricing not stated, contact-us.
- Shows that dormant-seat detection is already being positioned, and that enforcement is explicitly left to someone else.

**Span AI Tool Spend Report** [S] help article is behind a login (redirect); details from search snippets only. Per-dev base spend, a per-connection plan price override with a Team-plan default. Beta. The ~$24/dev/month figure in idea01 is competitor-sourced [U]. Raised $25M (https://www.thesaasnews.com/news/span-secures-25-million-in-funding/ [S]).

**Exceeds AI** [S] https://blog.exceeds.ai/compare-ai-coding-token-prices
- Claims to link token spend to commit and PR outcomes across Cursor, Claude Code, Copilot and Windsurf (its own claim, and it calls itself "the only platform"). Free pilot. I could not find a pricing page. "Under $20K/yr" is [U].
- Its blog content is SEO-style vendor marketing.

**Weave (YC W25)** [S] https://www.vcaonline.com/news/2026072910/weave-raises-13-5m-series-a-to-kill-tokenmaxxing-with-engineering-intelligence-platform/
- $13.5M Series A on 2026-07-28 (Standard Capital, YC). LLM-based analysis of PRs and reviews gives an "output score", shown next to AI usage and cost. Claims 20,000+ engineers at 500+ companies (company claim).
- Pricing per RuntimeWire/Dealroom: free tier, Pro $50/engineer/month, custom enterprise [S]. This is the most self-serve entrant, but it measures and scores output (per-person), with no spend actions found.
- Its thesis ("tokenmaxxing is bad") shows the market is moving toward spend-vs-output, so our "joins" are not a differentiator.

**Swarmia AI cost (beta)** [V/S] https://www.swarmia.com/changelog/2026-08-05-ai-cost-beta/ , https://help.swarmia.com/features/ai-tools/ai-cost
- Copilot (GitHub AI credits, from 2026-06-19), Cursor (list price plus fee), Claude Code (via OTel only; the Analytics API is not yet supported). Custom tools are possible.
- The most interesting join: spreads each person's daily usage across the issues and PRs they worked on that day. Two cost views: billed cost and "token value".
- Assumed seat prices: Copilot $19/$39, Cursor $40, Claude Code $25/$100.
- Reporting only (no actions found). AI adoption and cost tracking is listed at $5/dev/month on the product page [S, conflicting third-party prices]. Appears self-serve-ish with a free trial [U].

**LinearB AI insights** [S] https://linearb.helpdocs.io/article/w1yl8ejm8p-ai-cost-and-token-consumption , https://linearb.io/blog/ai-roi-dashboard
- Token usage collected from supported providers and correlated with engineering activity. Estimates only, not invoices, and not available before 2026-06-01. AI ROI dashboard uses the drop in cost per effective PR.
- Seats from $19/contributor/month (Essentials); whether AI insights are included in that tier is [U]. Reporting-only.

### Cloud FinOps vendors (cloud-bill first, AI as an add-on)

**Harness CCM** [V] https://developer.harness.io/cloud-cost-management/integrations : Anthropic, Copilot, Cursor connectors and Claude Code via OTel. No budgets or actions mentioned on that page. Enterprise, sales-led (inference).

**Finout** [V/S] https://www.finout.io/github-copilot-integration : Copilot premium requests and seats (repo, team, model, contributor, cost centers), anomaly detection, and Cursor (https://www.finout.io/cursor-integration [S]). Claude Code is only mentioned in passing. No actions. Pricing is an annual flat fee tied to a committed spend tier, annual only [S, https://www.finout.io/hubfs/pricing.md], so not month-to-month self-serve.

**CloudZero** [V] https://docs.cloudzero.com/changelog/mcp-server-for-agentic-coding-tools : an MCP server that lets Claude Code, Cursor, etc. query CLOUD costs. That is the opposite direction (it does not track AI-coding spend). Blog content exists (https://www.cloudzero.com/blog/ai-coding-tools-cost). I found no AI-coding-spend product [U].

**Vantage** [S] https://www.vantage.sh/blog/cursor-cost-management , https://docs.vantage.sh/connecting_cursor : Yes, native Cursor (needs the Enterprise Admin API), OpenAI and Anthropic integrations. Virtual tags allocate cost by team/user/project. Budgets, anomaly detection and an MCP server exist. No Copilot per this snippet [U]. No outcome join, no seat actions. The most self-serve of the FinOps vendors (free tier [U]). Note the Cursor connector needs an Enterprise plan, so a 20-300 eng team on Cursor Teams cannot use it. Check this.

**Datadog Cursor CCM** [V] https://www.datadoghq.com/blog/cursor-cloud-cost-management/ : cost by user, model, Max Mode, headless and billing group; anomaly detection with root cause; **recommendations (e.g. enable Auto mode for certain users/models, with estimated monthly savings)**; monitors and budgets. Cursor only. Requires a Datadog account (14-day trial). No PR join. It is the only competitor with savings recommendations, but it is Cursor-only and its price is not stated.

### Native vendor consoles

**Anthropic** [V] https://code.claude.com/docs/en/analytics
- Teams/Enterprise dashboard: PRs and lines "with CC", leaderboard (per-person), CSV export. PR attribution matches sessions in a 21-day-before to 2-day-after window and labels PRs `claude-code-assisted`. Per-user tokens and cost via OTel or spend report. Enterprise Analytics API is not available on Teams.
- Contribution metrics are github.com only, and not for Console API customers or Zero Data Retention orgs. This is a real hole for API-billed teams, and for GHES and GitLab.
- Limits [S]: Console org plus per-workspace caps, set in UI only. Per-member limits and a Spend Limits API exist only on Enterprise (https://platform.claude.com/docs/en/manage-claude/spend-limits-api). So a Team or Console org cannot cap per user or per team.

**Cursor** [V/S] https://cursor.com/docs/account/billing/spend-limits : member, group and team limits. Group overrides are Enterprise-only. A per-user limit endpoint (`/teams/user-spend-limit`, bulk `/teams/user-spend-limits`) is Enterprise-only per third-party sources [S, unverified against Cursor's API reference]. This means an ACTING agent can set limits via API, but only for Enterprise customers.

**GitHub Copilot** [V] https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/manage-and-track-spending/manage-company-spending : user-level, cost-center and enterprise budgets. Enforcement only if "Stop usage when budget limit is reached" is enabled on each limit; otherwise it only notifies and charges keep accruing. That is a real misconfiguration trap an agent could audit.

### Open source and indie

- **Port guide** [V] https://www.docs.port.io/guides/all/track-ai-coding-assistants-costs/ : dashboard from Cursor and Anthropic cost APIs. Copilot cost is estimated as users x seat price. No budgets, thresholds or actions.
- **CodeBurn / LMspend / budgetclaw / Cost Guardian / AgentSpend** [S] (https://www.toriihq.com/articles/six-tools-to-track-cursor-usage-and-spend , https://www.producthunt.com/p/codeburn/codeburn-2): local-first trackers. budgetclaw sends SIGTERM to the client on a breach, and Cost Guardian has warn/confirm/block modes. These are per-developer, not org-level. AgentSpend (team dashboard plus budget alert) is a Product Hunt launch. ccusage is local-only (as quoted in the AgentSpend post [S]).
- **LiteLLM / Portkey** [S] https://docs.litellm.ai/docs/tutorials/claude_code_budget_statusline , https://www.portkey.ai/docs/product/coding-agent : set `ANTHROPIC_BASE_URL` for hard per-key, per-team budgets and blocking. This is the real enforcement route for Claude Code. It needs a proxy to be run, or a hosted gateway, and developers must route through it. It does not cover Cursor or Copilot seats. **Helicone and OpenRouter: not researched [U].**
- **Torii** [S] https://www.toriihq.com/articles/spend-management-tools-claude-code : SaaS-management vendor, flags seats idle 90+ days and claims 20-35% savings from cleanup (vendor claim). Not engineering-aware, with no PR join.

### User complaints (honestly thin)
- I found NO G2/HN/Reddit threads reviewing the AI-spend modules of these vendors. They are too new, so complaint evidence is [U] and cannot back a claim.
- Related signals: a Product Hunt commenter on CodeBurn argues cost per merged PR penalizes the sessions that actually did the exploring, and that abandoned attempts need to be attributed to what they eventually produced (https://www.producthunt.com/p/codeburn/codeburn-2 [S]). This is a methodological weakness of DX's simple ratio (spend / merged PRs).
- Cursor: overage with no cap unless disabled, and a $28 to $500 anecdote (secondary blog) [S]; a Teams seat billed for a full year after removal within seconds (single HN account, unverified) [S].
- Headlines about Uber and Microsoft budget burn are unconfirmed [U].

## 2. Feature matrix

Y = shipped per vendor source, P = partial, N = not found/not stated, ? = unknown. "Actions" means the product itself changes something (removes a seat, sets a limit, routes a model), not just alerts.

| Competitor | Cross-vendor | PR/ticket join | Team budgets | Actions/enforce | Savings recs | Forecast per epic | Self-serve | Price | EM-facing | No per-person leaderboard |
|---|---|---|---|---|---|---|---|---|---|---|
| DX cost report | Y (3 + custom) | Y (cost/PR) | N | N | N | N (org-level forecast only) | N | not stated; bundled in Data Cloud | P (VP/platform) | N (contributor views) |
| Jellyfish | Y (broadest) | Y (PR throughput) | P (run-rate) | N | N | N | N | not stated | P | ? |
| Faros | Y | P (cost/outcome) | Y | P (gateway routes/policy) | P | N | N | consumption, no figures | P | ? |
| Larridin | Y | N (roadmap) | P (alerts only) | N (states not a cap) | P (dormant seats) | N | ? | not stated | P | ? |
| Span | Y [S] | Y [S] | ? | ? | ? | ? | ? | ~$24/dev [U] | ? | ? |
| Exceeds AI | Y [S] | Y [S] | ? | ? | ? | ? | free pilot | <$20K/yr [U] | ? | ? |
| Weave | P | Y (LLM output score) | ? | N | N | N | Y (free + Pro) | $50/eng/mo [S] | P | N (output score is per-engineer) |
| Swarmia AI cost | Y (3 + custom) | Y (issue/PR spread) | N | N | N | N | likely [U] | $5/dev/mo [S] | Y | ? |
| LinearB | P | P (cost per effective PR) | N | N | N | N | P | $19+/contributor [S] | Y | ? |
| Harness CCM | Y | N | N | N | N | N | N | enterprise | N (FinOps) | n/a |
| Finout | P | N | N | N | N | N | N (annual) | flat annual tier | N | n/a |
| CloudZero | N (reverse direction) | N | N | N | N | N | ? | ? | N | n/a |
| Vantage | Y (Cursor, OpenAI, Anthropic) | N | Y | N | N | N | Y [U] | ? | N | n/a |
| Datadog Cursor CCM | N (Cursor only) | N | Y | N | Y | N | trial only | not stated | N | N (ranked user list) |
| Anthropic console | N | Y (github.com only) | P (Enterprise per-user, org/workspace caps otherwise) | Y (hard caps, own tool) | N | N | Y | included | Y | N (leaderboard) |
| Cursor admin | N | N | Y (Enterprise groups) | Y (limits, API on Enterprise) | N | N | Y | included | Y | n/a |
| Copilot budgets | N | N | Y | Y (only if "stop usage" is on) | N | N | Y | included | Y | n/a |
| Port guide | Y (DIY) | N | N | N | N | N | DIY | Port license | P | n/a |
| ccusage / CodeBurn etc. | P | P (CodeBurn per PR) | P | P (budgetclaw kill) | N | N | Y (free) | free | N (dev-level) | N |
| LiteLLM / Portkey | N (LLM API only) | N | Y | Y (hard block) | N | N | P (self-host / hosted) | OSS / paid tiers | P | n/a |

## 3. White space (what the matrix says)

1. Nobody ships cross-vendor ACTION on SEATS plus LIMITS in one place. Native consoles act on their own tool only (and the strongest controls are Enterprise-tier). Suites explicitly don't act (Larridin: "not an enforced cap"; DX: no actions). Only Faros claims gateway-based enforcement, and that is enterprise-sold. Gateways (LiteLLM/Portkey) enforce only on the API path.
2. Savings recommendations exist only in Datadog (Cursor-only).
3. Per-epic forecasting: nobody ships it. The data is hard (needs a ticket-to-cost join over a history).
4. Plan-tier gaps: the best native controls (Cursor Admin API limits, Cursor group limits, Anthropic per-member limits/Analytics API, Vantage's Cursor connector) need Enterprise plans. The 20-300 engineer firms on Cursor Teams / Claude Team often can't use them. That is the segment where an out-of-band agent adds the most (inference, to validate).
5. Self-serve with a no-leaderboard stance: Weave and Swarmia are the self-serve-ish ones; neither acts.

Caveat: this is a snapshot from vendor marketing pages. Changelogs (not all read) may show more. Re-check Faros, Datadog and DX quarterly: the window is likely 6-12 months.

## 4. Candidate positionings

**P1. "Seat and limit autopilot" for orgs on mid-tier plans (recommended lead).** The agent finds idle or duplicate seats across Copilot/Cursor/Claude, proposes (then with approval executes) seat removal and per-user limits via admin APIs, and audits misconfigurations (e.g. Copilot "stop usage" disabled, no org cap). Sold on "pays for itself", priced as a share of savings or a low flat fee.
- For: concrete, verifiable ROI in week one. Nobody ships cross-vendor action. Uses documented admin APIs.
- Against: the APIs are the constraint. Cursor per-user limit endpoints are Enterprise-only [S]; Anthropic has no limit API for Console/Team (UI only). In the most common mid-market configs we may only be able to recommend, not execute. Seat savings are one-time (a one-off cleanup, then churn risk). Torii and others already sell idle-seat cleanup. Token spend (the growing part) is not touched by seat removal.

**P2. "Budget pacing and guardrails per team", the EM's budget copilot.** Team budget set by the EM, burn-rate pacing, projected overage, and mid-month throttle actions (lower limit, switch default model, pause a key) plus Slack approvals. No individual leaderboard; team-level only.
- For: matches the Atlassian wallet / EM-owns-budget trend; trust stance is a real contrast with Anthropic's leaderboard and Weave's per-engineer scoring.
- Against: enforcement depends on the same API gaps as P1, and a gateway to fill them means developers must re-route (adoption friction, security review). Gateways (LiteLLM/Portkey) are free and good enough for technically strong teams. Native Copilot/Cursor budgets already cover the single-vendor case.

**P3. "Waste finder" from outcome data: abandoned/reverted-PR spend, runaway sessions, over-powered model for simple tasks.** Use sessions (OTel), git and ticket data to quantify "money spent on work that did not ship" and recommend model downgrades. Answers the PH critique that cost-per-merged-PR hides exploration cost.
- For: Datadog proves savings recs sell, but only for Cursor; Jellyfish shows model-default waste exists. Defensible methodology. Differentiated from DX's simple ratio.
- Against: attribution is hard and noisy (Anthropic itself calls its matching conservative; Swarmia's day-spread is a heuristic). "Waste" judgments can be wrong and feel like surveillance. The recommendation only pays off if developers change behaviour. Easy for DX/Jellyfish to copy as a report once they have the data.

**P4. Per-epic cost forecast ("this epic will cost $X-Y in AI spend").** Founders' original idea.
- For: no one ships it; EM/PM-friendly; pairs with ticket data.
- Against: needs months of history per customer (cold-start), high variance, and unclear willingness to pay. Treat as a later module, not the wedge.

**P5. "Neutral free tier + open-source collector" (distribution wedge, not a position).** Open-source local/OTel collector plus a hosted team dashboard, free under ~25 engineers.
- For: matches how indie trackers get used and builds trust (data stays local). Fills the Claude Code API/Console and GitLab/GHES gaps Anthropic's PR attribution leaves.
- Against: Show HN trackers show weak pull (1-3 points per phase-1 notes). Free tools are a crowded space (CodeBurn, LMspend, AgentSpend). Monetization has to come from P1-P3.

Overall judgment: the combination P1+P3 on a P5 distribution base is the most defensible (act on seats now, find token waste next), but the P1 API ceiling must be tested in week 1. The "act" claim is only differentiated if it holds on Cursor Teams and Claude Team/Console accounts, not just Enterprise.

## 5. What a student team can uniquely do in 6 months

Honest framing: students cannot out-sell DX/Jellyfish to VPs, or get SOC2 quickly. They can move faster on narrow, unglamorous things and sell bottom-up.

1. **Weeks 1-2: API ceiling test.** Get real or donated Team/Enterprise accounts (or ask 5 friendly startups) and record exactly what can be set via API for Cursor, Anthropic (Console and Enterprise) and Copilot on each plan tier. This decides P1 vs P2. It is the highest-value task and no competitor publishes it.
2. **Weeks 2-8: ship a read-only, self-serve tool in 15 min.** Admin-key connect for 3 vendors, seat utilisation, org-cap/misconfiguration audit (e.g. Copilot "stop usage" off) and a "savings found" number in the first view. Students can ship this faster than suites can rework sales-led onboarding.
3. **Weeks 6-12: approved actions.** Slack-approved seat removal and limit changes on the tiers where APIs allow it, with an audit log; "recommend only" elsewhere. Compare with Larridin's "not a cap" and DX's no-actions positions.
4. **Months 3-5: waste model v1** (abandoned or reverted PR spend, model-fit). Publish the method openly and a benchmark from design partners; students can write and publish more candidly than vendors, and community content is how the 20-300 engineer segment finds tools.
5. **Distribution unique to students:** open-source the collector, post the API-gap findings, recruit 10-15 design-partner startups and university-alumni networks (student/young-company peers on Cursor Teams and Claude Team). Offer pricing like Swarmia/Weave ($5-50/eng/month is the market range) or % of verified savings; a free pilot is table stakes (Exceeds does it).
6. **Avoid:** enterprise SSO/SOC2 fights, a gateway-first architecture (adoption friction, and Faros/Portkey/LiteLLM own it), per-person ranking, and anything that needs a long history (per-epic forecasting) in the first six months.

## 6. Biggest uncertainties to check next
- Whether Cursor Teams (non-Enterprise) exposes any spend-limit API (sources say Enterprise-only; unverified against the API reference).
- Whether Anthropic will ship a limit API for Console/Team (a GitHub issue says none exists today).
- Exact pricing and self-serve status of Span, Exceeds, Jellyfish, Faros, DX (none published on the pages fetched).
- Vantage's Copilot support and its free-tier limits; Helicone and OpenRouter (not researched).
- Real user complaints on G2/HN/Reddit: not found; would need customer interviews.
