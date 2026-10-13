# ContextOps MVP: build spec

**Product:** ContextOps, an AI-coding FinOps agent for engineering orgs with 20-300 engineers. It unifies Claude Code, Cursor, GitHub Copilot and Codex spend, joins it to PR/ticket outcomes, and then finds and fixes waste through approval-gated actions. Views are team-level, trust-first, with no per-person leaderboards.

**Goal of the MVP:** a polished, runnable localhost web app the founders can demo to design partners tomorrow. It runs in demo mode with a realistic synthetic org, and has real ingestion paths (CSV import plus a Claude Code OpenTelemetry endpoint) so it is not a mock.

## Tech stack (fixed)
- Next.js 14 (App Router) + TypeScript + Tailwind CSS + Recharts. A single app at `C:\users\yash panchal\cswork\CSProjects\contextops\app`.
- No native DB modules (Windows). Persistence is a JSON file at `app/data/state.json` via a small repository layer (`lib/store.ts`) with atomic write (write tmp, then rename). The seeded demo data is generated deterministically from a seeded PRNG (mulberry32) in `lib/seed.ts`, so every run looks the same.
- Tests: vitest for `lib/` (the engine). `npm test` must pass.
- Optional LLM: if `ANTHROPIC_API_KEY` is set, the digest narrative is generated with the Anthropic Messages API (model `claude-sonnet-5-5`, via plain fetch to https://api.anthropic.com/v1/messages with headers x-api-key, anthropic-version: 2023-06-01). Otherwise a deterministic template is used. The app must work fully without a key.
- Port 3000. Scripts: `npm run dev`, `npm run build`, `npm start`, `npm test`.

## Domain model (`lib/types.ts`)
- Org { id, name, engineers, plan notes }
- Team { id, name, emName, memberIds[], monthlyBudgetUsd }
- Engineer { id, displayName (synthetic), teamId, email }. These are used only for seat actions. The UI never ranks engineers.
- Tool = 'claude_code' | 'cursor' | 'copilot' | 'codex'
- Seat { id, tool, engineerId, tier ('standard'|'premium'|'business'|'enterprise'|'pro'), monthlyPriceUsd, lastActiveAt, assignedAt, status ('active'|'released') }
- UsageEvent / Session { id, tool, engineerId, teamId, repo, model ('opus'|'sonnet'|'haiku'|'gpt-5-codex'|'cursor-auto'|'copilot-premium' ...), startedAt, durationMin, inputTokens, outputTokens, cacheReadTokens, costUsd, linesChanged, prId|null, kind ('interactive'|'scheduled'|'subagent'), source ('seed'|'csv'|'otel') }
- PullRequest { id, number, repo, teamId, title, ticketId|null, state ('merged'|'closed_unmerged'|'open'), reverted:boolean, reviewRounds, openedAt, closedAt, linesChanged, aiAssisted:boolean }
- Ticket { id, key ('PAY-123'), epicId, type ('feature'|'bug'|'chore'|'refactor'|'spike'), points|null, status }
- Epic { id, key, name, teamId, ticketIds[] }
- Recommendation { id, type (R1..R15 id), title, detail, scope {teamId?, tool?, repo?}, estMonthlySavingsUsd: {low, high}, confidence ('high'|'medium'|'low'), formula (string shown to user), evidenceRefs[], status ('identified'|'accepted'|'applied'|'dismissed'), action {kind, payload}|null }
- BudgetRequest { id, teamId, requesterNote, amountUsd, status ('pending'|'approved'|'denied'), createdAt, decidedAt }
- AuditLogEntry { id, at, actor ('demo-admin'), action, target, before, after, dryRun:boolean }

## Seed (`lib/seed.ts`)
- The demo org is "Northwind Labs": 120 engineers, 8 teams (Payments, Checkout, Platform, Data, Mobile, Growth, Search, Infra), 90 days of history ending today.
- Tools mix: Claude Code (Team premium seats plus API overage), Cursor (Teams $40), Copilot Business ($19). About 35% of engineers hold 2+ tools.
- Plant realistic waste so recommendations fire:
  - about 18% of seats inactive for 30+ days;
  - about 25 engineers have duplicate Cursor+Copilot seats with one barely used;
  - Opus used for about 40% of small sessions (<40 lines changed);
  - 6-10 runaway sessions (>$150, no merged PR), including 2 scheduled loops;
  - about 22% of AI-assisted PRs closed unmerged;
  - one team (Growth) trending 130% of budget;
  - one team with a low cache-hit pattern.
- Costs must be plausible: median about $8-15 per active engineer-day on Claude Code; total org AI spend about $45-70K/month.

## Engine (`lib/engine/*.ts`, all pure functions, unit tested)
1. `ledger.ts`:
   - spend by tool, team, model, day;
   - MTD and projected month-end (linear on the last 14 days of run rate);
   - seat vs usage split.
2. `attribution.ts`: join sessions to PRs (by prId, else by engineer + repo + time window of 21 days before to 2 days after PR close, nearest PR); tickets via the PR's ticketId; epics via the ticket.
3. `outcomes.ts`: per team, cost per merged PR, abandoned (closed-unmerged) spend, reverted spend, AI-assisted merge rate, and a 4-week trend.
4. `waste.ts`: detectors, each returning event-level findings (sessions/PRs/seats, never person rankings):
   - inactive seats (30d);
   - duplicate tools;
   - downgradable tiers;
   - top-tier model on small tasks;
   - runaway sessions (cost > max(5× team p50, $100) with no merged PR);
   - idle scheduled loops;
   - abandoned-PR spend;
   - cache regression;
   - Copilot "stop usage" disabled (config audit flag in the seed).
5. `recommendations.ts`: maps findings to the catalogue R1-R12 (see research/phase2/features_voice.md §5.4) with formulas and low/high savings ranges plus confidence. It shows the formula string in the UI. Totals are Identified / Accepted / Realized.
6. `budgets.ts`: team pacing, burn rate, projected overage date, status (on-track / at-risk / over), and the request-more flow.
7. `forecast.ts` (BETA, the founders' original idea, done honestly): an epic cost forecast. For each ticket in an open epic, use the empirical distribution of attributed AI cost of past closed tickets with the same type (and team if n≥8, else org), and sum via Monte Carlo (1,000 draws, seeded) to give p10/p50/p90. It also shows a sample size and a "low confidence" badge if n<15. The baseline comparison is the median-by-type; show both.
8. `digest.ts`: builds the EM weekly digest data object for a team (the 9 sections from features_voice.md §5.2) plus a markdown rendering.
9. `privacy.ts`: k-anonymity guard. Team views with <5 members roll up to "Other". There is no API that returns per-engineer cost lists, except a self-view of one engineer's own meter.

## Ingestion (real, testable)
- `POST /api/ingest/csv`: accepts a CSV with columns date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo (the documented shape, similar to the Claude Code spend report / Cursor usage export). It maps users by email and stores UsageEvents with source 'csv'. There is an upload UI on the Connectors page with a downloadable sample CSV.
- `POST /api/otel/v1/metrics`: an OTLP/HTTP JSON receiver. It parses `resourceMetrics[].scopeMetrics[].metrics[]` for `claude_code.cost.usage` (USD) and `claude_code.token.usage` (with attribute `type` = input/output/cacheRead/cacheCreation), reading attributes `user.email`, `session.id`, `model`, and resource attribute `team` / `repo` if present (OTEL_RESOURCE_ATTRIBUTES). It aggregates into sessions by session.id with source 'otel'. The Connectors page shows the exact env vars to point Claude Code at it:
  - CLAUDE_CODE_ENABLE_TELEMETRY=1
  - OTEL_METRICS_EXPORTER=otlp
  - OTEL_EXPORTER_OTLP_PROTOCOL=http/json
  - OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:3000/api/otel
  - OTEL_RESOURCE_ATTRIBUTES=team=payments,repo=pay-api
- Connector cards (Anthropic Admin API, Cursor Admin API, GitHub Copilot, GitHub PRs, Jira/Linear) show status "Demo data", with a form to save a key into `.env.local` instructions only. Do not implement the network calls for MVP, except that the GitHub PR connector may be implemented if time permits. Each card lists the endpoints it will call (from research/phase2/technical.md).

## Actions (approval-gated, audited)
- Applying a recommendation opens a confirm modal that shows the exact change ("Release Copilot seat for 14 inactive users; est. saving $266/mo"), then applies it in demo mode (mutates state: seats released, team model default changed, loop disabled, budget changed), writes an AuditLogEntry with dryRun=true, and moves the recommendation to 'applied'. A banner explains that live mode calls vendor admin APIs, which require a connected key.
- There is an undo for applied actions (restores `before`).

## Pages (App Router)
1. `/`, Overview:
   - KPI tiles: MTD spend, projected month-end, savings identified / applied, cost per merged PR, % of spend on merged work;
   - stacked area of spend by tool (90d);
   - spend by team bar vs budget;
   - top 5 recommendations.
2. `/teams` and `/teams/[id]`, the EM budget copilot: pacing gauge, burn chart vs budget line, outcomes (cost/merged PR trend, abandoned spend), waste events for that team, budget requests (approve/deny), and a "Preview weekly digest" button.
3. `/savings`: the recommendation catalogue table (filter by type/team/status), each row expandable to show the formula, the evidence and an Apply button; plus the Identified/Accepted/Realized funnel.
4. `/waste`: event-level explorer (runaway sessions, abandoned-PR spend, model-on-small-tasks, loops). Sessions show team/repo/model/cost/outcome, with no engineer names (the label is "Session in pay-api").
5. `/seats`: a seat audit across tools (utilization by tool, inactive, duplicate, downgradable) with bulk "Release selected" (approval-gated). Names are shown here only, because seat management requires it, under an "Admin view: audited" banner.
6. `/forecast`: epic cost forecasting (beta), with a list of open epics, p10/p50/p90 bars, a sample-size badge, a baseline comparison and a methodology note.
7. `/digest/[teamId]`: a rendered weekly EM digest (as the email would look) with a copy-as-markdown button and a "Send to Slack" button (simulated).
8. `/connectors`: the connector cards, the CSV upload, the OTel instructions and a live count of ingested OTel events.
9. `/audit`: the audit log with undo.
10. `/trust`: what we collect (metadata only, no prompts/code), the no-leaderboard policy, the k-anonymity floor, and the engineer self-view explanation.
11. `/settings`: demo mode toggle, reset demo data, and budgets per team.

## Design
- Calm, credible fintech-grade UI. Use a left sidebar nav and a light theme with a dark mode toggle. Neutral slate plus one accent (emerald for savings). Use real numbers, $ formatting and tabular numerals. No lorem ipsum. Charts with axis labels. An empty/loading state on each page. Responsive down to a 1024px laptop.
- The header shows the org name, a "Demo data" pill, and a date range (last 30 / 90 days).

## Acceptance criteria
- `npm install && npm run build` succeeds; `npm test` passes, with at least 25 tests across engine modules (ledger, attribution, waste, recommendations, budgets, forecast, privacy, otel parser, csv parser).
- `npm run dev` serves all pages without runtime errors; every page renders seeded data.
- Applying, then undoing, a recommendation works and shows in /audit.
- Posting the sample CSV and a sample OTLP JSON payload (include `app/samples/otel-sample.json` and `app/samples/spend-sample.csv`) increases the event counts visible on /connectors and on the overview.
- No per-engineer cost ranking anywhere.

## Part 1 notes
- Engine, ingest, store, API routes, samples, 45 tests and app/README-API.md are done (response shapes in app/README-API.md).
- Recommendations implemented: R1, R2, R3, R4, R6, R7, R8, R10, R11, R15. R5, R9, R12, R13, R14 need data the MVP does not model.
- Extra routes: GET /api/self/[engineerId] (own meter), POST /api/otel/v1/logs (accepted, discarded). Extra fields: PullRequest.authorId, Session.loopId, State.repoConfigs/controls/rev.
- CSV import is idempotent per identical row; unknown emails are rejected and reported. OTel data points are treated as deltas.
- Sample files are also copied to public/samples for download.

