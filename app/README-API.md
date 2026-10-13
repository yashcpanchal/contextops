# ContextOps API (Part 1)

All routes are JSON, `force-dynamic`, served from `http://localhost:3000`. Errors are `{ "error": string }` with status 400 (bad input), 404 (unknown id) or 409 (state conflict, e.g. already applied).

Conventions
- Money is USD as a plain number (not cents). Rates and shares are fractions 0..1 (0.22 = 22%). Use `lib/format.ts` (`usd`, `usdCompact`, `pct`, `dateShort`, ...).
- Dates are ISO strings; day keys are `YYYY-MM-DD` UTC. `asOf` is "today" for the dataset.
- Types live in `lib/types.ts` (domain), `lib/views.ts` (view payloads), `lib/engine/*` (engine payloads). Import them with `import type { ... } from '@/lib/...'`; they are the source of truth.
- No endpoint returns per-engineer cost, except `GET /api/self/[engineerId]` (own meter) and `GET /api/seats` (admin view, names shown).
- Status enums: `BudgetStatus = 'on_track' | 'at_risk' | 'over'`; `RecStatus = 'identified' | 'accepted' | 'applied' | 'dismissed'`; `Tool = 'claude_code' | 'cursor' | 'copilot' | 'codex'`.

## GET /api/state-summary?days=30
Overview KPIs. `StateSummary` (lib/views.ts):
```ts
{
  asOf: string; org: { id; name; engineers; planNotes }; demoMode: boolean; windowDays: number;
  kpis: {
    mtdSpendUsd; projectedMonthEndUsd; trailing30SpendUsd; usageSpendUsd; seatSpendUsd;
    savingsIdentifiedUsd: { low; high }; savingsAppliedUsd: { low; high };
    costPerMergedPrUsd: number | null; mergedWorkShare: number; abandonedSpendUsd: number;
    aiAssistedMergeRate: number | null; teamsOverBudget: number; teamsAtRisk: number;
  };
  spendByToolDaily: { date; claude_code; cursor; copilot; codex; total }[];   // 90 days when days=30, else `days`; usage + prorated seat cost
  spendByTool: Record<Tool, { usageUsd; seatUsd; totalUsd }>;
  spendByModel: Record<string, number>;      // usage only
  teams: TeamRow[];                          // see /api/teams
  savings: SavingsTotals;                    // { identified, accepted, realized } each { low, high, count }
  topRecommendations: Recommendation[];      // 5 identified, highest savings first
  eventCounts: { seed: number; csv: number; otel: number };
}
```

## GET /api/teams?days=30
`{ teams: TeamRow[] }`. Teams with fewer than 5 members are rolled into one `id: "other"` row (`rolledUp: true`).
```ts
TeamRow { id; name; emName: string | null; memberCount; rolledUp: boolean; spend30dUsd; mtdUsd; budgetUsd;
  projectedMonthEndUsd; projectedPct /* 1.3 = 130% */; status: BudgetStatus; costPerMergedPrUsd: number | null;
  abandonedSpendUsd; aiAssistedMergeRate: number | null; wasteMonthlyUsd; pendingBudgetRequests }
```

## GET /api/teams/[id]?days=30
`TeamDetail`:
```ts
{
  team: TeamRow;
  budget: TeamBudget;   // { teamId; budgetUsd; mtdUsd; mtdPct; projectedMonthEndUsd; projectedPct; burnPerDayUsd; daysLeft;
                        //   status; projectedOverageDate: string | null;
                        //   series: { date; actualCumulativeUsd: number|null; projectedCumulativeUsd: number|null; budgetUsd; paceUsd }[] }
  outcomes: TeamOutcomes; // { teamId; windowDays; usageSpendUsd; mergedAiPrs; closedUnmergedAiPrs; revertedPrs;
                          //   costPerMergedPrUsd|null; attributedCostPerMergedPrUsd|null; abandonedSpendUsd; revertedSpendUsd;
                          //   aiAssistedMergeRate|null; mergedWorkShare; trend: { weekStart; usageSpendUsd; mergedPrs; costPerMergedPrUsd|null }[4] }
  wasteFindings: PublicFinding[];   // event-level, no seat kinds, no person ids, max 200 by cost
  wasteSummary: { byKind: Record<kind, { count; costUsd; monthlyImpactUsd }>; totalMonthlyImpactUsd };
  budgetRequests: BudgetRequest[];  // { id; teamId; requesterNote; amountUsd; status: 'pending'|'approved'|'denied'; createdAt; decidedAt }
  recommendations: Recommendation[];
}
```
404 for unknown or rolled-up teams.

## PUT /api/teams/[id]/budget
Body `{ "monthlyBudgetUsd": number }`. Returns the new `TeamBudget`. Writes an audit entry (undoable).

## GET /api/recommendations?status=&type=&teamId=
`{ recommendations: Recommendation[]; totals: SavingsTotals }` (totals ignore filters; sorted by `estMonthlySavingsUsd.high` desc).
```ts
Recommendation { id: string /* stable, e.g. "R1:copilot", "R4:growth" */; type: 'R1'|'R2'|'R3'|'R4'|'R6'|'R7'|'R8'|'R10'|'R11'|'R15';
  title; detail; scope: { teamId?; tool?; repo? }; estMonthlySavingsUsd: { low; high }; confidence: 'high'|'medium'|'low';
  formula: string /* show to the user */; evidenceRefs: string[] /* seat/session/PR ids, never people */; status: RecStatus;
  action: { kind; payload; summary: string /* exact change text for the confirm modal */ } | null }
```
Funnel: `identified` = all non-dismissed, `accepted` = accepted + applied, `realized` = applied (demo estimate).

## POST /api/recommendations/[id]/apply
No body. Mutates demo state, writes an audit entry with `dryRun: true`. Returns `{ recommendation, audit: AuditLogEntry, totals, dryRun: true }`. 409 if already applied/dismissed. Ids contain `:`; URL-encode if needed.

## POST /api/recommendations/[id]/dismiss
Returns `{ recommendation }` with `status: 'dismissed'`.

## GET /api/audit
`{ entries: AuditLogEntry[] }`, newest first.
```ts
AuditLogEntry { id; at; actor: 'demo-admin'; action: string /* "apply:release_seats", "set_budget", "budget_request:approved", "release_seats", "undo:..." */;
  target: string; before: unknown; after: unknown; dryRun: boolean; undone?: boolean; recommendationId?: string | null }
```

## POST /api/audit/[id]/undo
Restores `before`. Returns `{ entry }` (the new "undo:" audit entry). 409 if already undone or if the entry is itself an undo. An undone recommendation returns to `identified`.

## GET /api/waste?kind=&teamId=&days=30&limit=300
`{ total: number; findings: PublicFinding[]; summary: WasteSummary }`. Seat kinds are excluded unless `kind` is passed explicitly. `summary` covers all kinds (before filters).
```ts
kind: 'inactive_seat'|'duplicate_tools'|'downgradable_tier'|'top_model_small_task'|'runaway_session'|'idle_loop'|'abandoned_pr'|'reverted_pr'|'cache_regression'|'copilot_stop_usage_disabled'
PublicFinding { id; kind; teamId: string|null; tool?; repo?; at?; sessionId?; prId?; loopId?; seatIds?; costUsd; monthlyImpactUsd;
  label /* "Session in pay-api" */; detail; outcome? /* "No PR" | "PR closed unmerged" | ... */ }
```
Sorted by `costUsd` desc.

## GET /api/seats
Admin view (names shown; surface the `auditNote` banner). `SeatsView`:
```ts
{ auditNote: string;
  seats: { id; tool; tier; monthlyPriceUsd; status; lastActiveAt; assignedAt; engineerId; engineerName; email; teamId; teamName;
           usage30d: { activeDays; costUsd }; flags: ('inactive'|'duplicate'|'downgradable')[] }[];
  utilization: { tool; seats; activeSeats; inactiveSeats; utilization; monthlySeatCostUsd }[];
  summary: { total; inactive; duplicate; downgradable; engineersWithMultipleTools; reclaimableMonthlyUsd } }
```

## POST /api/seats/release
Body `{ "seatIds": string[] }`. Returns `{ audit, dryRun: true }`. Undo via `/api/audit/[id]/undo`.

## GET /api/forecast  (BETA)
```ts
{ beta: true; epics: EpicForecast[]; methodology: { draws: 1000; minTeamSample: 8; lowConfidenceBelow: 15; text: string } }
EpicForecast { epicId; key; name; teamId; ticketsTotal; ticketsDone; ticketsRemaining; spentToDateUsd;
  p10Usd; p50Usd; p90Usd /* remaining cost */; baselineMedianUsd; sampleSize /* smallest pool used */; lowConfidence: boolean;
  breakdown: { type; tickets; pool: 'team'|'org'|'none'; sampleSize; medianUsd }[]; beta: true }
```

## GET /api/digest/[teamId]
`{ data: DigestData; narrative: string; narrativeSource: 'llm'|'template'; model: string | null; markdown: string }`. Uses `ANTHROPIC_API_KEY` with `claude-sonnet-5-5` when set, otherwise a deterministic template. `data` has the 9 sections: `headline`, `outcomes`, `waste`, `modelMix`, `seats`, `cacheHygiene`, `openBudgetRequests`, `recommendedAction`, `footer` (see `lib/engine/digest.ts`). 404 for unknown team.

## POST /api/budget-requests/[id]/decide
Body `{ "decision": "approved" | "denied" }`. Approval raises the team budget by the request amount. Returns `{ request, budget: TeamBudget }`.

## POST /api/ingest/csv
Accepts raw `text/csv`, `multipart/form-data` (field `file`), or JSON `{ "csv": string }`. Columns: `date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo`. Users are matched by email; the import is idempotent per identical row.
Returns `{ rowsParsed; eventsAdded; duplicatesSkipped; unmatchedRows; unmatchedEmails: string[]; unknownToolRows; errors: string[]; addedCostUsd }`. Sample: `/samples/spend-sample.csv` (also in `samples/`).

## POST /api/otel/v1/metrics
OTLP/HTTP JSON (gzip ok). Reads `claude_code.cost.usage`, `claude_code.token.usage` (attribute `type`: input|output|cacheRead|cacheCreation) and `claude_code.lines_of_code.count`; attributes `user.email`, `session.id`, `model`; resource attributes `team` (or `team.id`) and `repo` (or `vcs.repository.name`). Data points are treated as deltas and accumulate per `session.id` (event id `otel_<session.id>`, source `otel`).
Returns `{ partialSuccess: {} | { rejectedDataPoints; errorMessage }, dataPoints; sessionsCreated; sessionsUpdated; sessionsRejected; rejectedReasons; addedCostUsd }`. `POST /api/otel/v1/logs` is accepted and discarded (returns `{}`). Sample: `/samples/otel-sample.json`.

## GET /api/connectors
```ts
{ counts: { seed; csv; otel }; totalEvents: number;
  ingest: { csvRows; csvEvents; otelRequests; otelDataPoints; otelSessions; lastCsvAt|null; lastOtelAt|null };
  otel: { endpoint: string; env: Record<string, string> };   // exact env vars to show
  csvColumns: string[];
  connectors: { id; name; status: 'demo_data'; endpoints: string[]; note: string }[] }
```

## POST /api/demo/reset
Re-seeds `data/state.json`. Returns `{ ok: true, asOf, sessions }`.

## GET /api/self/[engineerId]?days=30
The only per-engineer cost view (own meter): `{ engineerId; displayName; windowDays; totalUsd; usageUsd; byTool: Record<string, number>; daily: { date; usageUsd }[] }`. Engineer ids look like `eng_001`.

## Notes
- State is cached in-process and persisted to `data/state.json` (atomic write) after each mutation. A pristine demo file from an earlier day is re-seeded on next start so history ends today.
- Applying a recommendation only changes demo state (released seats stop accruing cost from `asOf`; controls are recorded). Live mode would call vendor admin APIs.
- `samples/` contains `spend-sample.csv` and `otel-sample.json`; copies are served from `/samples/*` via `public/`.
