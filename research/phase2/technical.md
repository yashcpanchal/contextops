# Technical Build Research: Cross-vendor FinOps for AI Coding

Date: 2026-10-13. Method: official docs fetched via WebFetch (fetch results are summarized by a small model, so verify field names against the linked reference before coding). Status tags: [V] = verified in an official doc this session; [3P] = third-party/secondary only; [U] = unverified, do not build on it without checking.

## 0. Key takeaways

1. Every vendor exposes read APIs sufficient for spend ingestion. Only two vendors expose write APIs that enable real "actions": Cursor (per-user spend limits, billing groups, remove member; Enterprise plan only for limits) and GitHub Copilot (seat removal, budgets, cost-center membership).
2. Claude Code spend is reachable three ways, and they do not reconcile exactly: (a) Admin API Claude Code Analytics (per-user/day, `estimated_cost`), (b) Usage/Cost API (per API key/workspace/model, authoritative for API-billed orgs, no per-user for Claude Code subscription seats), (c) OTel (real-time, per-session, with email and custom team attributes, but cost is an estimate). Claude for Team/Enterprise (claude.ai) orgs use a different path: Enterprise Analytics API (`read:analytics` key, Enterprise only, not Teams) or spend-report CSV export.
3. Attribution to PRs is a probabilistic join. Anthropic's own method (session-vs-diff line matching, window 21 days before to 2 days after merge) is not reproducible by a third party without session content. Realistic third-party attribution: user + time window + repo (OTel `vcs.*`) + branch/ticket-key convention, reported with a confidence score.
4. DX's "cost per PR" is an aggregate (team AI spend divided by merged PR volume), not per-PR causal attribution [V: getdx.com]. This sets the bar: per-PR session-linked attribution via OTel is a genuine differentiator but adds ingest complexity.

## 1. Endpoint table

Base URLs: Anthropic `https://api.anthropic.com`; Cursor `https://api.cursor.com` [U: base host not shown on the fetched page; confirm]; GitHub `https://api.github.com`; OpenAI `https://api.openai.com`; Linear `https://api.linear.app/graphql`.

| Vendor | Endpoint | Auth | Granularity | Key fields | Write actions? |
|---|---|---|---|---|---|
| Anthropic | `GET /v1/organizations/usage_report/messages` [V] | Admin API key `sk-ant-admin01-...` (`x-api-key`), `anthropic-version: 2023-06-01`; OAuth `org:admin` also OK; workspace keys do not work | `bucket_width` 1m/1h/1d. Limits: 1d max 31 buckets, 1h max 168, 1m max 1440. group_by: account_id, api_key_id, context_window, inference_geo, model, service_account_id, service_tier, speed, workspace_id | `uncached_input_tokens`, `cache_creation.{ephemeral_5m,ephemeral_1h}_input_tokens`, `cache_read_input_tokens`, `output_tokens`, `server_tool_use.web_search_requests`, plus group keys. Freshness about 5 min. No dollar amount; compute from price table | No (read) |
| Anthropic | `GET /v1/organizations/cost_report` [V] | Admin key | 1d only. group_by workspace_id, description (parses model, inference_geo) | USD amounts as decimal strings in cents. Excludes Priority Tier costs; code-execution cost under description | No |
| Anthropic | `GET /v1/organizations/usage_report/claude_code` [V] | Admin key (not available for Bedrock/Vertex/Foundry usage) | Per user per day. Params `starting_at` (YYYY-MM-DD, single UTC day), `limit` (default 20, max 1000), `page`. About 1h delay | `date`, `actor` (`user_actor.email_address` or `api_actor.api_key_name`), `organization_id`, `customer_type` (api/subscription), `terminal_type`, `core_metrics.num_sessions`, `lines_of_code.added/removed`, `commits_by_claude_code`, `pull_requests_by_claude_code`, `tool_actions.*.accepted/rejected`, `model_breakdown[].{model, tokens.{input,output,cache_read,cache_creation}, estimated_cost.{amount (cents), currency}}` | No |
| Anthropic (Enterprise/claude.ai) | Enterprise Analytics API `platform.claude.com/docs/en/api/admin/analytics` [V existence only; paths U] | Analytics API key with `read:analytics` created by Primary Owner at claude.ai/analytics/api-keys; Enterprise plan only, not Teams | Per-user engagement, usage, cost incl. Claude Code | Not inspected | No |
| Anthropic | Claude Code OTel [V] | Env vars in managed settings: `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_METRICS_EXPORTER=otlp`, `OTEL_LOGS_EXPORTER=otlp`, `OTEL_EXPORTER_OTLP_ENDPOINT/PROTOCOL/HEADERS`. Repo settings cannot enable telemetry | Real-time (metrics 60s default, logs 5s) | Metrics: `claude_code.cost.usage` (USD, estimate), `claude_code.token.usage` (type: input/output/cacheRead/cacheCreation), `session.count`, `lines_of_code.count`, `pull_request.count`, `commit.count`, `active_time.total`, `code_edit_tool.decision`. Events: `api_request` (has `cost_usd`), `user_prompt`, `tool_result`, etc. Attributes: `session.id`, `user.email`, `user.account_uuid`, `user.id`, `organization.id`, `terminal.type`, `vcs.repository.url.full`/`vcs.owner.name`/`vcs.repository.name` (needs `OTEL_METRICS_INCLUDE_REPOSITORY=true`, v2.1.269+), custom keys via `OTEL_RESOURCE_ATTRIBUTES="team.id=platform,cost_center=eng-123"` (no spaces) | No |
| Cursor | `GET /teams/members` [V] | HTTP Basic: API key as username, empty password | Snapshot | `id`, `email`, `name`, `role`, `isRemoved` | `POST /teams/remove-member` (Enterprise only, 50/min) |
| Cursor | `POST /teams/daily-usage-data` [V] | Basic | Per user per day; body `startDate`/`endDate` epoch ms, max 30-day range; 20/min | lines added, accepts, Tab/Agent requests, `mostUsedModel`. Counts are raw events, not billable | No |
| Cursor | `POST /teams/spend` [V] | Basic | Current billing cycle per member; paged | `spendCents`, `overallSpendCents`, `monthlyLimitDollars`, `effectivePerUserLimitDollars` | No |
| Cursor | `POST /teams/filtered-usage-events` [V] | Basic | Per event; `startDate`/`endDate`, filter by `userId`, `email`, `serviceAccountId`, `cloudAgentId`, `automationId`; pageSize max 1000; 60/min | `usageEvents`, `chargedCents`, `cursorTokenFee`, `requestsCosts`. Sum `chargedCents` reconciles to `/teams/spend` | No |
| Cursor | `POST /teams/user-spend-limit` [V] | Basic; Enterprise only; 250/min | Per user | body `userEmail`, `spendLimitDollars` (integer or `null` to clear) | YES: set/clear per-user monthly limit |
| Cursor | `POST /teams/user-spend-limits` (bulk, preview) [V] | Basic; Enterprise only | up to 100 updates/call | `updates[]`, per-user `results` | YES |
| Cursor | `/teams/groups` (billing groups), `/teams/directory-groups` [V] | Scoped keys: `read:*` / `admin:*` | CRUD, add/remove members (bulk 100 for directory groups); SCIM-synced groups are read-only | group ids `group_...` | YES: move users between billing groups |
| Cursor | `GET /teams/audit-logs` [V] | Basic | 30-day max range, pageSize 500 | events | No |
| GitHub Copilot | `GET /orgs/{org}/copilot/billing/seats` [V] | Bearer; classic PAT `manage_billing:copilot` or `read:org`; org owner only; header `X-GitHub-Api-Version: 2026-03-10`; public preview | Snapshot, per seat; per_page max 100 | `assignee`, `last_activity_at`, `last_activity_editor`, `last_authenticated_at`, `pending_cancellation_date`, `plan_type`, `created_at`, `assigning_team`. IDE activity counted only if user telemetry is enabled (caveat for idle detection) | Via sibling endpoints |
| GitHub Copilot | `GET /orgs/{org}/copilot/billing` [V] | same | Snapshot | `seat_breakdown` (total, added_this_cycle, pending_cancellation, pending_invitation, active_this_cycle, inactive_this_cycle) | No |
| GitHub Copilot | `DELETE /orgs/{org}/copilot/billing/selected_users` [V]; `.../selected_teams` | `manage_billing:copilot` or `admin:org` | Body `selected_usernames` | Sets seat to pending cancellation (cancels at end of cycle); 422 if seat assigned via team | YES: remove idle seats |
| GitHub Copilot | `POST /orgs/{org}/copilot/billing/selected_users` [V] | same | | `seats_created` | YES: assign seats |
| GitHub Copilot | `GET /orgs/{org}/copilot/metrics/reports/users-1-day`, `users-28-day/latest`, `organization-1-day`, `organization-28-day/latest`, `repos-1-day`, `user-teams-1-day` [V]; enterprise variant `/enterprises/{e}/copilot/metrics/reports/...` | Bearer; org owner or fine-grained "View Organization Copilot Metrics"; classic `read:org`; enterprise policy "Copilot usage metrics" must be "Enabled everywhere" | Daily reports delivered as signed `download_links` (expiring) to files; history from 2025-10-10, up to 1 year | Report-file schema not on fetched page [U]; includes CCA/CCR PR breakdowns per repo | No |
| GitHub billing | `GET /organizations/{org}/settings/billing/premium_request/usage` and `.../ai_credit/usage` [V] | Bearer; org admin | Query `year`, `month`, `day`, `user`, `model`, `product`; 24 months history | `timePeriod`, `product`, `model`, `usageItems[].{sku, unitType, pricePerUnit, gross/discount/net quantity+amount}` | No |
| GitHub billing | `GET /organizations/{org}/settings/billing/usage` and `/usage/summary` (preview) [V] | Bearer; enhanced billing platform required | day-level; summary filters repository/product/sku | `date`, `product`, `sku`, `quantity`, `netAmount`, `repositoryName` | No |
| GitHub billing | `/enterprises/{e}/settings/billing/cost-centers` GET/POST; `/{id}` GET/PATCH/DELETE; `/{id}/resource` POST/DELETE [V] | Bearer; enterprise owner/billing manager (custom roles, GitHub App with enterprise billing permission) | CRUD | `name`, `ai_credit_pool_enabled`, resources: users, organizations, repositories, enterprise_teams | YES: assign users to cost centers (chargeback) |
| GitHub billing | `/organizations/{org}/settings/billing/budgets` GET/POST; `/{budget_id}` GET/PATCH/DELETE [V] | Bearer; org admin or billing manager | CRUD | `budget_type` (SkuPricing/ProductPricing/BundlePricing), `budget_amount` (whole dollars), `prevent_further_usage` (must be true for user scope), `budget_scope` (organization/repository/multi_user_customer/user; responses also enterprise/cost_center/multi_user_cost_center), `budget_product_sku` (e.g. ai_credits), `user`, `expires_at` (user scope only), `budget_alerting`. Doc flags: create schema omits `user` (400 without it); BundlePricing mismatch between request and response docs | YES: per-user and org AI-credit budgets with hard stop |
| OpenAI | `GET /v1/organization/usage/completions` [V via OpenAI cookbook] | `Authorization: Bearer <Admin Key>` (org Owner creates; separate from inference keys) | `bucket_width` 1m/1h/1d; `start_time`/`end_time` Unix s; filters `project_ids`, `user_ids`, `api_key_ids`, `models`, `batch`; `group_by` (model, project_id, user_id, api_key_id, batch; `user_id` mentioned, full list not confirmed) | `input_tokens`, `output_tokens`, `input_cached_tokens`, `num_model_requests`, `project_id`, `user_id`, `api_key_id`, `model`, `batch` | No |
| OpenAI | `GET /v1/organization/costs` [V] | Admin key | 1d only; `group_by` line_item, project_id | `amount.{value,currency}`, `line_item`, `project_id` | No |
| OpenAI Codex (ChatGPT seats) | Enterprise/Edu Analytics API + Compliance API [V existence per learn.chatgpt.com/docs/pricing; paths, fields, per-user breakdown U] | Not inspected | | | No known write |
| GitHub | `GET /repos/{o}/{r}/pulls?state=closed` and `GET /repos/{o}/{r}/pulls/{n}` [V] | Bearer; GitHub App with `Pull requests: read` | List: `merged_at`, `closed_at`, `labels`, `head.ref`, `user`. Single PR only: `merged`, `additions`, `deletions`, `review_comments`, `commits` | `merged_at != null` means merged; `closed_at` with null `merged_at` means closed-unmerged | Labels via Issues API (write, optional) |
| GitHub | Reviews `GET /repos/{o}/{r}/pulls/{n}/reviews`, commits `.../pulls/{n}/commits` [U: standard endpoints, not re-fetched this session] | same | | review count, state, `submitted_at`; commit messages for `Co-Authored-By` trailers | |
| GitHub | GraphQL `pullRequest { timelineItems, reviews, commits { commit { message } }, closingIssuesReferences }` [U: not fetched] | same | batch many PRs per call | efficient for sync | |
| Jira Cloud | Smart commits and issue-key matching [V]; REST dev-info / remote-links [U] | OAuth 2.0 (3LO) or Forge app; scopes [U] | Issue key regex `[A-Z]{2,}-\d+` in branch, commit, PR title | Jira shows linked branch/commit/PR under "Development" | Not needed (read keys from GitHub, then `GET /rest/api/3/issue/{key}` [U] for epic/parent, labels, story points) |
| Linear | GraphQL `https://api.linear.app/graphql` [V] | OAuth2 Bearer (apps) or personal API key (`Authorization: <key>` without Bearer prefix) | Introspectable; rate limits not on fetched page [U] | Linear's GitHub integration links PRs by branch name, PR title/description magic words, issue identifier [V topic list only; mechanics and Attachment/branchName fields U, introspect schema] | Not needed |

## 2. Spend capture per vendor: what to actually do

- Anthropic API-billed org: use `usage_report/messages` grouped by `api_key_id`/`workspace_id` + `cost_report`. Per-user cost for Claude Code only through Claude Code Analytics API (`estimated_cost`, cents) or OTel. Anthropic itself says use Analytics API for per-user Claude Code cost and Usage API as a cost proxy for many keys [V].
- Anthropic Teams/Enterprise (claude.ai seats): Admin API does not cover claude.ai seat usage; Enterprise Analytics API (Enterprise only) or spend-report CSV export or OTel [V]. Contribution metrics cover only github.com repos and are unavailable with Zero Data Retention [V].
- Estimates caveat: Anthropic states Console dashboard spend and `cost_usd` are estimates; reconcile against billing [V].
- Cursor: sum `chargedCents` from `filtered-usage-events` per user per day. Cheapest and most reconcilable to `/teams/spend`.
- Copilot: seat cost = seats x plan price (from seats API `plan_type`); variable cost from `ai_credit/usage` (with `user` filter) since the 2026-06-01 move from premium requests to AI credits [3P: ecorpit, anavem; the endpoint itself is V]. Keep a `premium_request/usage` fallback for older accounts.
- OpenAI/Codex: API-key Codex goes to `usage/completions` (group by `user_id`/`project_id`/`api_key_id`) + `costs`. ChatGPT-seat Codex cost is in credits; the only programmatic path is the Enterprise Analytics API [V existence, fields U].

## 3. Attribution design

### 3.1 Identity resolution
`person` table keyed on canonical lowercase email. Mappings: Anthropic `actor.email_address` / OTel `user.email`; Cursor `email`; Copilot GitHub login (seat `assignee.login`), mapped to email via org SSO/SAML identity [U: needs `GET /orgs/{org}/members` + SCIM or commit-email] or the commit author email; OpenAI `user_id` (resolve via Admin users endpoint [U]); Jira/Linear user email. Fallback: manual mapping UI plus domain heuristics. API-key actors (`api_actor`, OpenAI `api_key_id`) need a key-to-owner table (service/CI bucket).

### 3.2 Join ladder (highest confidence first), writing `attribution_link` rows with `method` and `confidence`
1. **Session -> PR (OTel, confidence 0.9):** Run an OTel collector that receives Claude Code metrics + events. Per session, store sum of `cost.usage` by `session.id`, `user.email`, `vcs.repository.name`, and time range. Resolve to a branch/commit by also receiving `claude_code.commit.count` / `pull_request.count` timing and, better, a repo hook: a Claude Code hook or `PostToolUse`/commit hook that emits `session.id` into a commit trailer (e.g. `Claude-Session: <id>`) [U: hook design is ours, not a vendor feature]. Webhook `pull_request` -> list PR commits -> parse trailer -> join spend. Honest limitation: events carry `prompt.id`/`workspace.host_paths` but metric series do not carry branch; branch is not a documented OTel attribute [V: standard attribute list has no branch].
2. **User + repo + time window (confidence 0.5-0.7):** Spend of author X on repo R from branch-first-commit minus buffer to merge time is allocated to the PR. For overlapping PRs, split by commits/lines-changed share per day. Anthropic's own window is 21 days before to 2 days after merge [V]; use a tighter default (e.g. first commit - 1 day to merge) and make it tunable.
3. **Ticket key in branch/commit/PR title (confidence for PR->ticket 0.95):** regex `[A-Z][A-Z0-9]+-\d+` (Jira, matches Atlassian's own rule of 2+ uppercase letters, hyphen, number [V]) and Linear `ABC-123`. Spend-to-ticket = sum of spend of its linked PRs plus unlinked-time-window spend for the branch.
4. **Label/trailer evidence:** `claude-code-assisted` label on merged PRs is applied by Anthropic's GitHub app when contribution metrics are on [V]. `Co-Authored-By: Claude <noreply@anthropic.com>` trailer is Claude Code's default commit attribution [U: confirm in settings docs]. Use as a boolean "AI-assisted" flag and as a sanity check, not a cost allocator. Cursor/Copilot/Codex have no equivalent documented label [U]; Copilot coding agent PRs are identifiable by bot author and appear in `repos-1-day` CCA breakdown [V partial].
5. **Residual:** unattributed spend (exploration, chats, no repo) is kept as `unallocated` and shown explicitly; never force-fit. Report coverage % as a first-class metric.

### 3.3 Outcomes (per PR)
From GitHub: merged/closed-unmerged (`merged_at`/`closed_at`), time-to-merge, review count and rounds (reviews endpoint), additions/deletions, labels. Reverts: detect PRs whose title starts `Revert "` or body contains "This reverts commit <sha>", then map sha to original PR within N days [U: heuristic we must implement; GitHub's pulls page does not expose reverts [V]]. Rework proxy: commits to same files within 14 days.

### 3.4 How incumbents do it (evidence)
- DX: ingests Claude/Cursor/Copilot spend and token usage + merged-PR volume from SCM; cost per PR = estimated AI spend / merged PR volume, tied to team structure; custom sources via `aiToolMetrics.push` API; session data optional and not part of cost-per-PR [V: https://getdx.com/blog/meet-the-new-ai-cost-management-report/].
- Faros: "per-team statements built from session-level attribution"; 60+ sources incl. gateways and ticketing; the method for session -> PR/ticket is not disclosed [V: faros.ai/solutions/ai-coding-cost-allocation].
- Port guide: relies on Port integrations; Cursor cost from per-user/team daily records (`total_cents`), Claude cost from cost-report, Copilot cost estimated as active users x seat price; no PR-level attribution on the page [V: docs.port.io/guides/all/track-ai-coding-assistants-costs/].
- Larridin: not fetched [U].
- Anthropic first-party: session-vs-PR-diff line matching, details above [V].

## 4. Pricing normalization (rates as of fetch date 2026-10-13 unless noted)

Store prices in a versioned `price_catalog` table with `effective_from`; recompute cost when catalog changes. Never hardcode.

**Claude API, per MTok (input / 5m cache write / 1h cache write / cache read / output)** [V: https://platform.claude.com/docs/en/about-claude/pricing, 2026-10-13]. Model names as printed on that page:
- Fable 5.1 and Fable 5: 10 / 12.50 / 20 / 0.25 (5.1) or 1.00 (5) / 50
- Opus 5.5: 4 / 5 / 8 / 0.20 / 20
- Opus 5, 4.8, 4.7, 4.6, 4.5: 5 / 6.25 / 10 / 0.50 / 25
- Sonnet 5.5: 2 / 2.50 / 4 / 0.10 / 10; Sonnet 5: 2 / 2.50 / 4 / 0.20 / 10; Sonnet 4.6/4.5: 3 / 3.75 / 6 / 0.30 / 15
- Haiku 5.5: 0.10 / 0.125 / 0.20 / 0.01 / 0.50 (prompts up to 100k tokens), 0.50 / 0.625 / 1 / 0.05 / 2.50 (over 100k); Haiku 4.5: 1 / 1.25 / 2 / 0.10 / 5
- Batch discount and long-context/fast-mode surcharges appear on the same page (batch columns seen: e.g. Opus 5.5 batch 2 / 10); read the page before encoding multipliers. Priority tier is excluded from cost_report [V].
- Claude Code subscription seats (Team/Enterprise): seat prices not fetched [U].

**Cursor** [V: https://cursor.com/pricing, 2026-10-13; the page's plans differ from older Pro/Pro+/Ultra naming, so re-verify]: Plus $8/mo (1x), Premium $30 (4x), Super $100 (15x), Ultra $200 (50x), Teams "$30+/user/mo" (4-50x Plus, pooled), Enterprise custom. Allowance refreshes weekly; third-party models billed at API list price; spend caps available. Per-event cost authoritative from `chargedCents`.

**GitHub Copilot** [V for individual plans: https://github.com/features/copilot/plans, 2026-10-13]: Pro $10 (credits $10 base + $5 flex = $15), Pro+ $39 (credits $39 + $31 = $70), Max $100 (credits $100 + $100 = $200); 1 AI credit = $0.01; extra credits purchasable; completions do not consume credits on paid plans. Business $19/user and Enterprise $39/user, each including matching monthly AI credits, usage-based since 2026-06-01 [3P: ecorpit.com, anavem.com, cloudzero blog; not confirmed on a GitHub page]. Overage = credits at $0.01 each [V for individual plans; assumed same for orgs, U].

**OpenAI Codex** [V: https://learn.chatgpt.com/docs/pricing, 2026-10-13]: ChatGPT Plus $20, Pro $100/$200/$500, Business $20/user/mo annual or $25 monthly (2+ users), Enterprise/Edu by quote. Credits per 1M tokens (input / cached / output): GPT-5.5 125 / 12.5 / 750; GPT-5.6 Sol 100 / 10 / 500; GPT-5.6 Terra 50 / 5 / 300; GPT-5.6 Luna 5 / 0.5 / 30; GPT-6.1 Sol 50 / 2.5 / 250; GPT-6 Luna 2.5 / 0.25 / 12.5; GPT-6 Astra 250 / 25 / 1250. Fast mode 2x, Ultrafast 6x for purchased credits. Credit-to-USD conversion not stated on the fetched page [U]. API-key Codex is billed at API pricing.

## 5. Canonical data model (Postgres)

```
org(id, name, plan, created_at)
connector(id, org_id, vendor ENUM[anthropic,cursor,copilot,openai,github,jira,linear,otel],
  credential_ref (KMS/secret-manager pointer), scopes, status, last_sync_at, cursor_state jsonb)
person(id, org_id, primary_email, display_name, github_login, jira_account_id, linear_user_id,
  cursor_user_id, openai_user_id, is_active, left_at)
person_alias(id, person_id, vendor, external_id, email, source)
team(id, org_id, name, parent_id, cost_center)           -- from GitHub teams / CODEOWNERS / manual / SCIM
team_member(team_id, person_id, valid_from, valid_to)
repo(id, org_id, provider, owner, name, default_team_id)
seat(id, org_id, vendor, person_id, plan_type, monthly_price_usd, assigned_at,
  last_activity_at, last_activity_editor, pending_cancellation_date, snapshot_date)  -- snapshot daily
usage_fact(id, org_id, vendor, source_endpoint, person_id NULL, api_key_id NULL, workspace_id NULL,
  repo_id NULL, session_id NULL, bucket_start, bucket_end, grain ENUM[minute,hour,day,event,session],
  model, input_tokens, output_tokens, cache_read_tokens, cache_write_tokens, requests,
  cost_usd_reported NULL, cost_usd_computed, cost_basis ENUM[billed,estimated,computed_from_price],
  raw_ref (s3 key), ingested_at)                           -- unique(vendor, source_endpoint, natural key)
price_catalog(id, vendor, model, unit, input, cache_write_5m, cache_write_1h, cache_read, output,
  effective_from, effective_to, source_url)
pull_request(id, repo_id, number, author_person_id, head_ref, base_ref, title, created_at,
  merged_at, closed_at, state, additions, deletions, commit_count, review_count, review_rounds,
  first_review_at, labels[], ai_assisted_label bool, ai_trailers[], is_revert, reverted_by_pr_id,
  revert_within_days)
commit(sha, repo_id, pr_id, author_email, committed_at, message_trailers jsonb)
ticket(id, provider ENUM[jira,linear], key, title, type, status, epic_key, project, assignee_person_id,
  story_points, created_at, completed_at)
pr_ticket_link(pr_id, ticket_id, method ENUM[branch,title,body,commit,integration], confidence)
attribution_link(id, usage_fact_id, pr_id NULL, ticket_id NULL, team_id NULL,
  method ENUM[session_trailer,otel_session_repo,user_repo_window,user_window,unallocated],
  weight numeric, confidence numeric, allocated_cost_usd)    -- weights per usage_fact sum to 1
action(id, org_id, type, target(person/seat/group), proposed_by, status ENUM[proposed,approved,executed,failed,rolled_back],
  expected_monthly_savings_usd, evidence jsonb, approved_by, executed_at, api_request_log, rollback_payload)
budget(id, org_id, scope, scope_id, period, amount_usd, vendor_budget_id NULL, alert_thresholds)
alert(id, org_id, kind, subject, fired_at, payload)
```
Views: `v_spend_by_team_tool_month`, `v_cost_per_merged_pr`, `v_idle_seats`, `v_unallocated_coverage`.

## 6. Executable savings actions (what the APIs actually allow)

| Action | API | Preconditions / limits | Verified? |
|---|---|---|---|
| Remove idle Copilot seats (no `last_activity_at` in N days, or null) | `DELETE /orgs/{org}/copilot/billing/selected_users` | Seat becomes pending cancellation (effective at cycle end); fails 422 for team-assigned seats (must remove via `selected_teams` or change team); `last_activity_at` undercounts users with telemetry disabled; owner-level token. Savings = plan price | V |
| Set per-user AI-credit budget with hard stop on Copilot | `POST /organizations/{org}/settings/billing/budgets` (`budget_scope=user`, `prevent_further_usage=true`, optional `expires_at`) | Org admin/billing manager; note schema bug (need `user` field) | V |
| Org/cost-center Copilot budget | same endpoint, scope organization/cost_center | | V |
| Chargeback: assign users/repos to Copilot cost centers | `POST /enterprises/{e}/settings/billing/cost-centers/{id}/resource` | Enterprise only; moving a resource reassigns | V |
| Set/clear Cursor per-user monthly spend limit | `POST /teams/user-spend-limit`, bulk `/teams/user-spend-limits` | Enterprise plan only | V |
| Move Cursor users between billing groups | `/teams/groups` update/add members | SCIM-synced groups not modifiable | V |
| Remove inactive Cursor member | `POST /teams/remove-member` | Enterprise only; `hasBillingCycleUsage` returned | V |
| Anthropic: cap spend | Workspace spend limits / rate limits via Admin API | Spend-limit read beta header `spend-limit-reads-2026-09-26` exists [V in header list]; write endpoints not verified | U |
| Anthropic: kill/rotate API key, disable workspace | Admin API API-keys update (status inactive) | Standard Admin API feature, not fetched this session | U |
| Claude Code model policy (e.g. default to Sonnet, restrict Opus) | Managed settings pushed via MDM or server-managed settings | Not an API we call; delivered as a recommended config/PR | U |
| OpenAI: project budget / key revoke | Admin API projects, api_keys, rate limits | Not fetched | U |
| Recommend-only (no API write) | Downgrade tier (Cursor Teams -> fewer seats), consolidate vendors, move users Copilot <-> Cursor, switch models, prompt-cache hygiene | Output as reviewed report; human executes | n/a |

Product principle: default to "propose with evidence + one-click approve", log `rollback_payload`, dry-run mode, per-action allowlist, never auto-remove seats without approval during MVP.

## 7. MVP architecture (2-4 person student team, ~8 weeks)

**Stack:** TypeScript monorepo. Next.js (App Router) + Postgres (Neon/Supabase or RDS) + Drizzle/Prisma. Background jobs: Inngest or pg-boss/BullMQ+Redis (Inngest/Trigger.dev is least ops for students). Auth: WorkOS or Clerk (SSO/SCIM path for later). Secrets: AWS Secrets Manager / GCP Secret Manager with per-org envelope encryption; never store raw keys in Postgres. Hosting: Vercel + managed Postgres; OTel collector (otel-collector-contrib) on Fly.io/Cloud Run only for orgs that opt in. Charts: Recharts/Tremor. Email: Resend. Slack: Bolt app for alerts.

**Sync jobs (all idempotent, upsert on natural key, raw payloads kept in object storage):**
| Job | Cadence | Notes |
|---|---|---|
| anthropic.usage_messages | hourly (1h buckets), nightly backfill 7d | polling guidance: up to 1/min [V] |
| anthropic.claude_code_analytics | daily for D-1, re-pull D-2 | one UTC day per call, paginate [V] |
| anthropic.cost_report | daily | reconcile vs computed |
| cursor.daily_usage + spend + usage_events | events every 6h (60/min limit), spend daily | 30-day window cap [V]; chunk backfills |
| copilot.seats | daily snapshot (history of `last_activity_at`) | |
| copilot.metrics reports | daily; download signed URLs promptly | |
| copilot.ai_credit_usage | daily per user | |
| openai.usage_completions + costs | hourly/daily | |
| github.pr_sync | webhooks (`pull_request`, `pull_request_review`, `push`) + nightly reconcile via GraphQL | GitHub App, read-only |
| jira/linear.ticket_sync | webhook + nightly | |
| otel.ingest | streaming | optional module |
| attribution.run | nightly + on PR merge | recomputes `attribution_link` deterministically, versioned |
| detect.anomalies / idle | daily | |
| digest.weekly | weekly | |

**Mock-data mode:** `DEMO_MODE=1` swaps each connector for a `MockConnector` implementing the same `Connector` interface (`listPeople`, `fetchUsage(since)`, `fetchSeats`, `fetchPRs`). Generate a seeded synthetic org (e.g. 80 engineers, 8 teams, 3 tools) with faker + a deterministic RNG: heavy-tail spend distribution (a few power users), 15% idle Copilot seats, a runaway-session outlier, 5% reverts, PR/ticket keys in branches, and sessions that map to PRs with controlled noise so the attribution accuracy can be shown. Ship fixtures as JSON matching real vendor response shapes (copy from the docs examples above) and contract tests that validate real responses against the same zod schemas. Actions in demo mode execute against a fake vendor that records calls.

**Build order:** (1) GitHub App + PR sync + Anthropic Claude Code Analytics + Cursor events + Copilot seats/ai_credit; (2) person/team mapping UI; (3) cost-per-merged-PR and idle-seat dashboards + weekly digest; (4) Copilot seat-removal and Cursor spend-limit actions with approval flow; (5) Jira/Linear link; (6) OTel collector + session attribution; (7) OpenAI.

## 8. Security posture and SOC 2 path

- Read-only by default. Separate "actions" credential that the customer adds later, stored separately and scoped narrowly. Document exact scopes: Anthropic Admin key (note: Admin keys are broad, org-level and can manage keys/members [U: scope granularity]; recommend a dedicated service account and key rotation), Cursor team API key (Enterprise needed for limit writes), GitHub App with read-only `Pull requests`, `Metadata`, `Contents` (only if reading commit messages, else `Pull requests` suffices), plus billing read; Copilot `manage_billing:copilot`/`read:org` classic PAT or GitHub App with org/enterprise billing permission [V: GitHub App tokens supported for cost centers]. Ask: fine-grained or App tokens over classic PATs.
- Data minimization: never ingest prompts or code. Metadata only (counts, tokens, cost, commit message trailers, PR titles). Turn off `OTEL_LOG_USER_PROMPTS`-style content logging in the customer config; the `claude_code.api_request_body` events exist only with `OTEL_LOG_RAW_API_BODIES` [V]; reject those at the collector.
- PII: emails and per-person spend are sensitive. Default to team-level views, per-person visible only to admins, no leaderboards by default (consistent with idea01 MVP note); retention policy and DSAR delete per org.
- Engineering controls: tenant isolation via Postgres RLS + org_id on every table, KMS envelope encryption for credentials, audit log of every action and every API call to vendors, SSO for the app, least-privilege IAM, dependency scanning, branch protection.
- SOC 2 path: week 0 adopt Vanta/Drata/Secureframe (startup programs often discounted) to automate evidence; policies + access reviews; Type I at about 3-4 months after controls are in place; Type II observation 3-6 months later. In the interim: a security whitepaper, pen-test summary, subprocessor list, and an offer of a customer-hosted collector or "export-only CSV mode" to clear procurement without handing over admin keys. [U: timelines are typical, not from a source.]
- Vendor ToS: check each vendor's API terms about third-party use of Admin keys [U].

## 9. Open items to verify before coding
1. Cursor Admin API base host and key-creation path; whether limits endpoints are truly Enterprise-only for the target customers (20-300 engineers likely on Teams, which would block spend-limit writes) [V on page: "Spend-limit ... endpoints are Enterprise only"].
2. Copilot metrics report file schema (download_links payload), and whether per-user Copilot AI-credit usage requires the enhanced billing platform.
3. Whether `last_activity_at` reflects CLI/coding-agent/Copilot chat usage or only IDE telemetry.
4. OpenAI user_id to email resolution and the Enterprise Analytics API per-user Codex fields.
5. Anthropic Admin API write endpoints (workspace spend limits) and whether the Claude Code Analytics API covers claude.ai subscription seat users (it labels `customer_type: subscription`, so likely yes for Pro/Team [V partial]).
6. Jira REST dev-info / issue endpoints and Linear Attachment/`branchName` schema (introspect).
7. Larridin methodology; Faros session-to-PR method (sales-gated).
8. Copilot Business/Enterprise seat prices and credit allowances from a GitHub primary source.

## Sources
- https://platform.claude.com/docs/en/manage-claude/usage-cost-api
- https://platform.claude.com/docs/en/api/beta/organization/usage_report/retrieve_messages
- https://platform.claude.com/docs/en/manage-claude/claude-code-analytics-api
- https://platform.claude.com/docs/en/about-claude/pricing
- https://code.claude.com/docs/en/monitoring-usage
- https://code.claude.com/docs/en/analytics
- https://cursor.com/docs/account/teams/admin-api
- https://cursor.com/pricing
- https://docs.github.com/en/rest/copilot/copilot-user-management
- https://docs.github.com/en/rest/copilot/copilot-usage-metrics
- https://docs.github.com/en/rest/billing/usage
- https://docs.github.com/en/rest/billing/cost-centers
- https://docs.github.com/en/rest/billing/budgets
- https://docs.github.com/en/rest/pulls/pulls
- https://github.com/features/copilot/plans
- https://developers.openai.com/cookbook/examples/completions_usage_api
- https://learn.chatgpt.com/docs/pricing
- https://linear.app/developers/graphql
- https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/
- https://getdx.com/blog/meet-the-new-ai-cost-management-report/
- https://www.docs.port.io/guides/all/track-ai-coding-assistants-costs/
- https://www.faros.ai/solutions/ai-coding-cost-allocation
- Third-party (3P): https://ecorpit.com/github-copilot-ai-credit-pools-cost-control-enterprise-2026/ , https://www.anavem.com/news/github-copilot-usage-based-billing-2026-06 , https://www.cloudzero.com/blog/github-copilot-cost
