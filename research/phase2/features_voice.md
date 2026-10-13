# Phase 2: Features and the customer voice (FinOps for AI coding)

Date: 2026-10-13. Scope: orgs with 20-300 engineers, cross-vendor, "find and fix waste, link spend to outcomes, team-level EM views".

Method and honesty notes
- About 25 tool calls: WebSearch/WebFetch, HN Algolia API. Reddit was not touched (Phase 1 files `phase1/reddit.md` etc. were skimmed for context only).
- Quotes are verbatim from the fetched page or API text, with URL. Where the fetch tool returned a snippet, I quote only that snippet. HN texts had broken apostrophes in my terminal; quotes below were chosen/trimmed to avoid altering words.
- Unverified or secondary items are tagged [secondary] or [vendor]. Not found: a FinOps Foundation "FinOps for AI" working-group question list (the nearest is the Token Economics working group page). No LinkedIn posts were retrievable. No study quantifies dollars lost to abandoned AI PRs. Dollar formulas in section 5 are my own models, not sourced facts; every parameter is something the product must measure or the customer must set.
- Pragmatic Engineer "tokenmaxxing" article is paywalled: only the intro was readable. Meta "Claudeonomics" facts come from secondary coverage of The Information.

---

## 1. The customer voice: what eng leaders, finance and EMs actually ask

### 1a. Questions (verbatim)
Practitioner questions, from Unblocked's FinOps-for-AI-coding guide [vendor] (https://getunblocked.com/blog/finops-for-ai-coding/):
- "Who should own the AI coding budget?"
- "How do you allocate and chargeback AI coding spend?"
- "What guardrails stop AI coding spend from running away?"
- "Will falling token prices solve the budget problem on their own?"
- "What metric should I govern AI coding spend against?"

Pragmatic Engineer, "The Pulse: token spend breaks budgets" (https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets), readers' voices:
- Fintech staff engineer: "The cost in token spend is off the charts – and leadership has shared this trend with us."
- Fintech staff engineer: "Limits or prioritizing cheaper models, cutting back on hiring? Who knows." (nobody owns the answer)
- IT Director of Engineering: "We have already had to raise our API budget limits multiple times in April."
- Finance VP of AI: "the initial plan to have strict limits (say, $100 per user) is breaking when reality hits"
- SaaS Dev Productivity Lead: "Measure the impact. Measure key outcomes and report on spend, monthly." and "More spend should mean better outcomes. If not, we are doing something wrong."
- Infra Engineering Director: "We're monitoring but not restricting."
- E-commerce Head of Engineering: "We currently do not have limits in place, and are not pausing now."
- Infra founder (the counter-view to beat): "Who cares, then, when engineers already cost $200-400K/year in cash comp?"

FinOps Foundation Token Economics working group page (https://www.finops.org/wg/token-economics-saas/):
- "Cost visibility is limited to what the vendor exposes, and request-level metadata injection is not possible."
- "Spend follows the same curve. Visibility does not."
- It asks for "a named individual who is accountable for AI cost visibility."
- Related [secondary]: State of FinOps 2026 reportedly says 98% of FinOps teams now manage AI spend (31% two years earlier) and 86% of engineering budget holders are unsure which AI tools deliver the most benefit (summary found via search; primary report not retrieved).

HN (https://news.ycombinator.com/):
- cebert: "Now, many enterprises, including mine, are starting to crack down on token spend." and "My employer is considered capping all engineers at $200 or $500/mo of token spend depending on level." (https://news.ycombinator.com/item?id=49319753)
- coffeebeqn: "We've had our AI budget per Engineer cut twice now since the peak mania in early 2026" (https://news.ycombinator.com/item?id=48603390; apostrophe normalized)
- codingdave, on a "$1,000 per engineer per day" claim: "At that point, outside of FAANG and their salaries, you are spending more on AI than you are on your humans." (https://news.ycombinator.com/item?id=46925579)
- dim0r (Show HN founder): "I kept failing to answer a simple question: what did they actually do last night, and what did it cost me?" (https://news.ycombinator.com/item?id=49083042)

### 1b. The questions, distilled by persona (synthesis of the above, not quotes)
| Persona | The question they are asking | Source above |
|---|---|---|
| CFO / finance | What are we paying, to whom, per cost center, and is it going up? Who owns it? | FinOps WG page; Unblocked |
| VP/Dir Eng | Is more spend producing more outcomes? Which tools do we renew or cut? | Pragmatic Engineer Pulse |
| EM | Is my team on track against budget this month? Who/what is burning it and was it worth it? | cebert; Pulse |
| Platform/DevEx lead | Which guardrails (model defaults, caps) stop surprises without blocking good use? | Pulse "strict limits breaking" |
| Engineers | What is my budget, and will I be punished for exceeding it? | cebert |

---

## 2. Kinds of waste, with quantification

| Waste type | Evidence and number | Confidence |
|---|---|---|
| Idle / unused seats | Zylo (a license-management vendor): 32.3% of GitHub licenses unused, about $240K/yr per average enterprise, via Torii blog (https://www.toriihq.com/articles/eight-tools-to-manage-github-copilot-licenses-and-spend). Not a Copilot-only or primary GitHub number. Copilot Business is $19/user/month (Fast.io guide). GitHub native reporting looks back only 28 days (Torii). | Low-medium [vendor] |
| Duplicate tools per engineer | No quantified source found. Phase 1 premise (orgs run 2+ tools). Must be measured by the product from cross-vendor identity match. | Hypothesis |
| Expensive model for trivial tasks | Finance VP of AI: "many devs are defaulting to the most expensive models without realizing". IT Director: "We are using that high-effort setting even for fairly trivial tasks". (Pulse URL above.) Claude Code docs: "Unexpectedly high spend ... usually traces back to long sessions that were never cleared or to Opus left as the default model." (https://code.claude.com/docs/en/costs) | Qualitative, strong |
| Runaway loops, retries, variance | Bai et al. (arXiv 2604.22750, https://arxiv.org/pdf/2604.22750): runs on the same task can differ by up to 30x in total tokens; accuracy often peaks at intermediate cost and saturates; input tokens drive cost. Unblocked: "The dangerous spend isn't the engineer at the keyboard. It's the unattended loop." and "a single agent loop could re-read the same files forty times overnight". Claude Code docs list idle-session drivers: scheduled tasks, cross-session messages, goal check-ins, teammates. | Strong (paper) |
| Spend on abandoned PRs | No $ study exists. Closed-unmerged shares: 26.1% of 8,106 fix-related agent PRs (Codex 81.6% merged to Devin 42.9%) (https://arxiv.org/pdf/2602.00164); 21.6% of 33,596 agent PRs (Copilot 43.0% merged). Caveat in the literature: a closed PR is not always wasted. Claude Code PRs 83.8% accepted vs 91.0% human in one study of 567. | Medium for rate, none for $ |
| Context bloat | Claude Code docs: "Stale context wastes tokens on every subsequent message." "Aim to keep CLAUDE.md under 200 lines". Moving workflow text to skills. Agent teams "use approximately 7x more tokens than standard sessions" in plan mode. Cache miss after idle: the first message after a break longer than cache lifetime "reprocesses your full context" (1h on subscription, 5 min on API). | Strong (vendor docs) |
| Tokenmaxxing | Pragmatic Engineer intro: "devs are purposefully burning tokens (and money!) to inflate their AI usage and hit AI usage metrics" (https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird). Meta: agents left running for hours to pad leaderboard; internal memo warned of "billions" in AI cost (secondary: https://the-decoder.com/meta-employees-compete-for-token-consumption-on-an-internal-ai-leaderboard/, https://aiweekly.co/alerts/meta-caps-employee-ai-token-use-as-costs-approach-billions). | Qualitative, strong |

Baseline spend figures to anchor ROI: Claude Code enterprise average "around $13 per developer per active day and $150-250 per developer per month, with costs remaining below $30 per active day for 90% of users" (https://code.claude.com/docs/en/costs). Larridin median about $213/engineer/week (Phase 1 idea01). Gartner Peer Insights via commentary: 23% of tech leaders spend $200-500/dev/month, 6% over $2,000 [secondary, unverified].

### Cloud FinOps analogues (for pitch "typical savings")
Sources are secondary and vendor-sourced, so use as a range, not a promise:
- Mature FinOps program median savings 20-30% of cloud spend (vendorbenchmark.com glossary citing State of FinOps) [secondary].
- Waste of 32-40% without discipline, 15-20% with it [secondary, inconsistent sourcing].
- Lever split from one 540-program vendor benchmark: commitments 8-14%, rightsizing 5-9%, commitment optimization 3-7%.
- Prompt caching "can cut costs up to roughly 90%, and batch processing around 50%" (Anthropic numbers per Unblocked) [vendor].
- Pragmatic default to pitch: target 15-30% of tracked AI coding spend, to be validated per customer in the first audit.

---

## 3. Which levers are actually controllable (by an agent/product, not just a human)

| Lever | What exists today | Evidence | Controllable by us? |
|---|---|---|---|
| Model defaults / routing | `/model` and `/config` default; effort level via `/effort`; `MAX_THINKING_TOKENS`; subagents `model: haiku`; "Sonnet handles most coding tasks well and costs less than Opus" | Claude Code costs doc | Yes via managed settings (Claude Code managed settings are delivered by server-managed settings, MDM, or managed-settings.json). Needs customer admin consent. Cursor: Admin API reads and sets limits (Phase 1 idea01). |
| Spend limits | Claude Teams/Enterprise: limits at org, group and member level on usage credits; Console: workspace spend limits; Cursor: per member, group, team via Admin API; Copilot: cost centers and budgets | Claude Code costs doc; Phase 1 idea01 citations | Yes via admin APIs, with approval flow. Pulse shows hard caps often break (see "strict limits ... breaking"), so prefer pacing and soft limits plus request flow (Atlassian wallets let staff ask for more). |
| Seat reassignment | Copilot activity report with last-activity timestamps; Rencore/Coralogix-style rules (inactive 30+ days, seats > MAU) | Search results above | Yes where vendor APIs allow seat removal (Copilot, Cursor). Claude seat tiers (Standard/Premium) per costs doc. |
| Prompt caching | Already on by default in Claude Code; `/usage` shows "Prompt cache (main)" hit rate, misses; TTL choice | Claude Code costs doc | Partly. We can detect low hit rates, idle-gap misses, and recommend TTL setting; cannot change cache for other vendors. |
| CLAUDE.md / context hygiene | Under 200 lines; move to skills; `/clear`; MCP servers pruned | Claude Code costs doc | Advisory plus a PR with a lint of CLAUDE.md size; optional hook-based filters. |
| Loop / schedule control | `/usage` Loops row; `autoContinueAtUsageLimit`, `CLAUDE_CODE_GOAL_CHECKIN_MINUTES`, `crossSessionInbound` in managed settings | Claude Code costs doc | Yes via managed settings for Claude Code only. |
| Contracted-rate accuracy | `modelPricing` managed setting makes local cost numbers match contracts | Claude Code costs doc | Yes, and it is a quick-win onboarding step. |

Data plumbing available (for the product): Claude Code Analytics API / Enterprise Analytics API / spend report CSV; OpenTelemetry export on every setup ("the only option that streams per-user token and cost metrics ... in near real time"); LiteLLM or Claude apps gateway for Bedrock/Vertex users (all https://code.claude.com/docs/en/costs). On Bedrock/Vertex/Foundry, vendor dashboards do not cover usage, so OTel or gateway is required.

---

## 4. Trust and surveillance: how to give EMs useful views without leaderboards

Evidence
- Atlassian "AI wallets": capped, warns "as they near the limit and stops when the budget runs out"; "meant to keep spending visible rather than to starve it"; $500-$2,000/month by role with "the option to ask for more". (https://thenextweb.com/news/atlassian-ai-wallets-tokenmaxxing). Spokesperson: "AI tooling budgets are set by role based on how different teams work." (search summary, https://www.resultsense.com/news/2026-07-30-atlassian-ai-wallets-token-caps/)
- Meta Claudeonomics: leaderboard of 85,000 staff ranking top 250 users, badges ("Token Legend"), gamed by leaving agents running, taken down "for now" after data was shared externally, followed by centralized controls and CTO line "Nobody should be using AI tools just for the sake of using them." (secondary, https://www.peoplematters.in/amp/news/ai-and-emerging-tech/meta-launches-ai-leaderboard-to-track-employees-then-shuts-it-down-within-days-49182, https://the-decoder.com/meta-employees-compete-for-token-consumption-on-an-internal-ai-leaderboard/)
- Chargeback caution: "Chargeback by raw token count quietly punishes the team that ships and rewards the team that loops." (https://getunblocked.com/blog/finops-for-ai-coding/)
- Engineers' side: cebert, above: "I regularly spend over $1k/mo today, but believe I can make a strong business justification for the value those tokens are creating." and "engineers may be asking what token budgets are when considering new roles." Competing cautionary design: a competitor's Show HN founder (https://news.ycombinator.com/item?id=48153460) describes "real names" on an org scoreboard plus an optional public pseudonymous leaderboard; that is the pattern to avoid for trust.
- Phase 1 (phase1/reddit_hn_api.md) ranks "Metrics backlash (Jellyfish/LinearB/DORA/Swarmia)" as theme 2 (n=171); I did not re-verify its quotes here.

Design principles (derived)
1. Default unit is the team, repo, workflow, never the person. Individuals see only their own numbers (like Atlassian wallets: self-service meter).
2. No ranking by tokens or dollars, anywhere. Outlier lists are of sessions, runs and PRs (events), not people. Admin can opt in to named view with an audit log and a banner shown to engineers.
3. Pair every cost number with an outcome (merged, reverted, review rounds) so cost alone is never the story. Cost per merged PR is a team metric.
4. k-anonymity floor: no team view under 5 members; below that roll up.
5. Wallet pattern, not hard cap: soft warn at 80%, request-more flow with a one-click EM approval, auto-expiring exceptions.
6. Engineer-facing transparency: engineers see what the EM sees; no prompts or code content collected, only metadata (cdilling-ch's description of "no prompts, no code, no file contents" shows peers market this).
7. Never use a metric as a target (tokenmaxxing: devs "treat them as targets").

---

## 5. Feature spec

Priority key: MoSCoW. Evidence column cites sections above.

### 5.1 CORE (MVP, must-have to sell)

| # | Feature | User story | Evidence | MoSCoW |
|---|---|---|---|---|
| C1 | Cross-vendor spend connector and normalized ledger (Claude Code analytics/Enterprise API, Cursor Admin API, Copilot billing/usage, OTel optional) | As a platform lead, I connect admin keys in 15 minutes and see one combined AI coding bill by tool, model, team. | FinOps WG: "Cost visibility is limited to what the vendor exposes"; Unblocked "allocate and chargeback" | Must |
| C2 | Team attribution (GitHub teams/CODEOWNERS/Okta groups to cost centers) with k-anonymity | As finance, I get spend by cost center; as EM, I see only my team. | "How do you allocate and chargeback"; Section 4 principles | Must |
| C3 | Seat audit: inactive, duplicate and downgrade-able seats with one-click "propose reassignment" | As an engineering director, I see seats unused for 30+ days and engineers holding 2+ tools, and I can release them. | Zylo 32.3% [vendor]; Copilot activity-report approach; 28-day native lookback | Must |
| C4 | Model-mix and effort audit: share of spend on top-tier models by task size, with a recommended default per team | As a platform lead, I see where Opus-class models are used for trivial sessions and push a default. | Pulse: "defaulting to the most expensive models"; costs doc | Must |
| C5 | Runaway session and loop detector (cost per session, tokens per outcome, repeated-read patterns, idle scheduled tasks) | As an EM, I get told when one run or loop burned an abnormal amount. | Bai 30x variance; Unblocked "unattended loop"; costs doc loops | Must |
| C6 | Spend-to-outcome join: cost per merged PR, abandoned/closed-unmerged PR spend, reverts, review rounds, at team level | As a VP Eng, I can answer "is more spend producing more outcomes?" | Pulse: "More spend should mean better outcomes"; closed-unmerged 21-26% | Must |
| C7 | Budgets and pacing: team monthly budget, forecast to month-end, soft alerts, request-more flow | As an EM, I know by the 10th if we will blow the budget and can approve exceptions. | Atlassian wallets; Pulse "strict limits ... breaking" | Must |
| C8 | EM weekly digest (Slack/email) | See 5.2. | Pulse: "report on spend, monthly" | Must |
| C9 | Savings recommendations with $ estimate and an approval-gated "fix" (settings PR, seat release, limit change) | As a platform lead, I accept a recommendation and the agent applies it. | Phase 1 wedge: act, don't report. Cloud FinOps 15-30% | Must (at least 4 of the catalogue in 5.4) |
| C10 | Finance export: monthly chargeback CSV and FOCUS-style columns | As finance, I get a CSV by cost center and vendor. | FinOps FOCUS (v1.4 claim unverified) | Should |
| C11 | Privacy-first posture page: metadata only, no prompts/code; no individual leaderboards; engineer self-view | As a CISO/skeptical engineer, I can verify what is collected. | Section 4 | Must (sales blocker) |

### 5.2 EM weekly digest (content)
Send Monday morning to EM, team-scoped only:
1. Headline: team spend last 7 days vs budget pace; projected month-end; delta vs last week.
2. Cost per merged PR (team) with 4-week trend, and merged PR count.
3. Wasted spend line: $ on PRs closed unmerged or reverted; $ on top 3 runaway sessions (events, not people), each with outcome.
4. Model mix: percent of spend on top-tier model vs percent of sessions that were small (diff under N lines); one-line recommendation.
5. Seats: inactive 30+ days (count and $), duplicate-tool holders (count only; names in an admin-visible, audited view).
6. Context/caching hygiene: cache hit rate vs org median; CLAUDE.md over 200 lines flagged by repo.
7. Open budget requests awaiting approval (one-click approve).
8. One recommended action with $ estimate and "apply" button.
9. Footer: what we collect (metadata only) and a link for engineers to see their own meter.
No names ranked, no token counts as a performance signal.

### 5.3 Alert types
| Alert | Trigger (default) | Channel | Evidence |
|---|---|---|---|
| Budget pace | Projected month-end > 100% of team budget; warn at 80% | Slack to EM | Atlassian wallets warn near limit |
| Runaway session | Session cost > max(5x team p50 session, $X) or tokens/min sustained with no commits | Slack to owner + EM (event view) | Bai 30x; Unblocked unattended loop |
| Idle scheduled task | `/loop` or scheduled task with N runs and zero merged outcome | Slack to owner | Claude Code costs doc idle drivers |
| Model drift | Top-tier model share of spend jumps > X pts week over week or new default observed | Slack to platform lead | Pulse model defaults |
| Spend spike | Daily team spend > 3x trailing 14-day median | Slack to EM | Cloud FinOps anomaly detection analogue |
| Abandoned-PR spend | PR closed unmerged with > $Y attributed | Weekly only, not real time | closed-unmerged studies |
| Inactive seat | No activity 30 days (configurable) | Email to admin | Rencore/Coralogix rules |
| Seat over-allocation | Billed seats exceed monthly active users by > 20% | Email to admin | Coralogix rule (via search) |
| Cache regression | Cache hit rate falls below org baseline | Platform lead | Claude Code `/usage` cache line |
| Vendor billing change | Pricing/plan change detected (e.g., credit pooling) | Platform lead | Phase 1: Copilot AI Credits, Cursor pooled usage |
| Data connector failure | Missing data 24h | Admin | Operational |

### 5.4 Savings-recommendation catalogue with $ impact formulas
Notation: S = monthly spend, p = price/seat, N = count, f = fraction. All formulas are mine; inputs come from connectors; show ranges and a confidence tag. Use 30-day windows.

| ID | Recommendation | Detection | Estimated monthly $ impact |
|---|---|---|---|
| R1 | Reclaim inactive seats | Seat with no activity in 30 days | N_inactive x p_seat (net of any overage the seat's replacement would cause). Zylo-type prior: 32.3% of seats [vendor], so expect 10-30% of seats on first audit. |
| R2 | Consolidate duplicate tools | Engineer with 2+ paid tools; lower-usage tool below threshold | sum over duplicates of p_lower_usage_tool x f_realizable (set f=0.5 by default since engineers resist). |
| R3 | Downgrade seat tier | Premium/high-tier seat whose p95 weekly usage fits Standard | N_downgradable x (p_high - p_std). |
| R4 | Model default shift (top-tier to mid-tier for small tasks) | Sessions on top-tier with low context size / small diffs / no plan-mode | S_top_tier_small_tasks x (1 - price_mid/price_top) x f_quality_safe. Use list price ratios from the vendor's pricing page; set f_quality_safe=0.6-0.8 and require an A/B on merge rate. |
| R5 | Lower effort/thinking for routine work | Sessions with high output/thinking token share and trivial diffs | S_thinking_on_trivial x f_reduce (f 0.2-0.5). Docs: thinking tokens billed as output. |
| R6 | Runaway-loop guard | Sessions in top 1% cost with no merged outcome | S_over_cap = sum(max(0, session_cost - cap)) for sessions with zero outcome; savings approx S_over_cap x f_prevented (0.5-0.8). Anchor: Bai 30x variance. |
| R7 | Kill idle scheduled tasks and goal check-ins | Loops with N runs and no outcome | sum(loop_total_cost) x f_zero_value. |
| R8 | Clear/compact discipline and cache-aware gaps | Long sessions with high cache-miss re-cache cost after idle > TTL | S_recache_tokens x (cache_write_price - cache_read_price) x f_avoidable; or recommend TTL choice. Cap with an upper bound of docs-stated caching benefits. |
| R9 | CLAUDE.md and MCP diet | CLAUDE.md > 200 lines; many MCP servers loaded but rarely invoked | tokens_per_request_overhead x requests_per_month x cached_read_price x f. Typically small; sell as hygiene. |
| R10 | Subagent/teammate model downshift | Subagents inheriting top-tier model | S_subagent_tokens x (1 - price_small/price_top) x f_task_fit. Docs recommend Sonnet for teammates, Haiku for simple subagents. |
| R11 | Abandoned-PR prevention (plan mode, smaller scope, verification targets) | Repos with high closed-unmerged cost share | S_abandoned_PRs x f_reduction (f 0.2-0.4 realistic). S_abandoned = sum cost of sessions mapped to PRs closed unmerged. Closed-unmerged rate prior 21-26% of agent PRs; do not assume all closed PRs are waste. |
| R12 | Move from API/usage-credits to seats (or the reverse) | Compare effective cost per active user under each plan | S_current - min(S_seat_plan, S_usage_plan) per cohort. |
| R13 | Contracted-rate correction | `modelPricing` not set so reported numbers are list price | Not a saving: removes a reporting error of (1 - discount) x S; strong onboarding trust win. |
| R14 | Batch routing for async jobs | Non-interactive pipelines eligible for batch | S_async x 0.5 (Anthropic cites around 50% batch savings [vendor]). |
| R15 | Per-engineer wallet by role | Teams with long-tail heavy spenders and no outcome | Not a direct saving; reduces variance. Impact = S_over_wallet x f_unapproved. Use soft caps only. |

Savings roll-up on the dashboard: "Identified", "Accepted", "Realized" (measured the following 30 days against a counterfactual of prior baseline adjusted for seat count). Pricing hook from Phase 1: 1-3% of tracked spend or per-engineer; a share-of-savings option is credible only after Realized is audited.

### 5.5 ACCESSORY (v2+)
| # | Feature | User story | Evidence | MoSCoW |
|---|---|---|---|---|
| A1 | Per-epic / per-ticket cost forecasting | As an EM, I get "this epic will cost $X-Y in AI spend". | Bai: models underestimate token cost (correlation up to 0.39); needs history | Could |
| A2 | Gateway mode (LiteLLM/Claude apps gateway) for hard enforcement and Bedrock/Vertex coverage | As a platform lead on Bedrock, I get attribution and caps. | Costs doc: dashboards do not cover cloud providers | Should (v2) |
| A3 | Auto-routing policy engine (task-size routes to model) | As a platform lead, I define rules that route by repo/task. | Pulse; HN cascadeflow-style demand | Could |
| A4 | Renewal negotiation pack (usage by seat tier, cut list, benchmark) | As a VP Eng, I walk into the Cursor renewal with data. | Phase 1 idea01 | Should |
| A5 | Benchmarks vs peers (anonymized) | "How does our cost per merged PR compare?" | Larridin/Jellyfish published medians | Could |
| A6 | Review-capacity coupling (cost vs review debt) | As an EM, I see rubber-stamp risk. | Phase 1 #5 and #6 | Could |
| A7 | Engineer self-service wallet app (request more, see own meter) | As an engineer, I know my budget. | cebert; Atlassian | Should |
| A8 | Compliance/audit logs of AI usage | Regulated segment | Phase 1 #7 | Won't (MVP) |
| A9 | Named per-person leaderboards | Rejected by design | Meta Claudeonomics; tokenmaxxing | Won't |
| A10 | Productivity scoring of individuals | Rejected by design | Reddit metrics backlash | Won't |

---

## 6. Sources
- Claude Code costs doc: https://code.claude.com/docs/en/costs
- Pragmatic Engineer Pulse (token spend): https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets
- Pragmatic Engineer Pulse (tokenmaxxing, paywalled): https://newsletter.pragmaticengineer.com/p/the-pulse-tokenmaxxing-as-a-weird
- FinOps Foundation Token Economics WG: https://www.finops.org/wg/token-economics-saas/
- Unblocked FinOps for AI coding [vendor]: https://getunblocked.com/blog/finops-for-ai-coding/
- Bai et al. token variance: https://arxiv.org/pdf/2604.22750
- Agent PR merge studies: https://arxiv.org/pdf/2602.00164 ; https://arxiv.org/pdf/2509.14745
- Atlassian AI wallets: https://thenextweb.com/news/atlassian-ai-wallets-tokenmaxxing ; https://www.resultsense.com/news/2026-07-30-atlassian-ai-wallets-token-caps/
- Meta Claudeonomics: https://the-decoder.com/meta-employees-compete-for-token-consumption-on-an-internal-ai-leaderboard/ ; https://www.peoplematters.in/amp/news/ai-and-emerging-tech/meta-launches-ai-leaderboard-to-track-employees-then-shuts-it-down-within-days-49182 ; https://aiweekly.co/alerts/meta-caps-employee-ai-token-use-as-costs-approach-billions
- Copilot seat waste [vendor]: https://www.toriihq.com/articles/eight-tools-to-manage-github-copilot-licenses-and-spend
- HN comments: items 49319753, 48603390, 46925579, 49083042, 48153460 at https://news.ycombinator.com/item?id=<id>
