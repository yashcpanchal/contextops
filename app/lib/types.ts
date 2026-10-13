// Domain model for ContextOps. All dates are ISO strings (UTC).

export type Tool = 'claude_code' | 'cursor' | 'copilot' | 'codex';
export type SeatTier = 'standard' | 'premium' | 'business' | 'enterprise' | 'pro';
export type SessionKind = 'interactive' | 'scheduled' | 'subagent';
export type DataSource = 'seed' | 'csv' | 'otel';
export type ModelId = 'opus' | 'sonnet' | 'haiku' | 'gpt-5-codex' | 'cursor-auto' | 'copilot-premium' | 'unknown';
export type PrState = 'merged' | 'closed_unmerged' | 'open';
export type TicketType = 'feature' | 'bug' | 'chore' | 'refactor' | 'spike';
export type TicketStatus = 'todo' | 'in_progress' | 'done';
export type Confidence = 'high' | 'medium' | 'low';
export type RecStatus = 'identified' | 'accepted' | 'applied' | 'dismissed';
export type RecType = 'R1' | 'R2' | 'R3' | 'R4' | 'R6' | 'R7' | 'R8' | 'R10' | 'R11' | 'R15';

export interface Org {
  id: string;
  name: string;
  engineers: number;
  planNotes: string;
  config: {
    /** Copilot premium-request budget with "stop usage" enabled (config audit flag). */
    copilotStopUsageEnabled: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  emName: string;
  memberIds: string[];
  monthlyBudgetUsd: number;
}

export interface Engineer {
  id: string;
  displayName: string;
  teamId: string;
  email: string;
}

export interface Seat {
  id: string;
  tool: Tool;
  engineerId: string;
  tier: SeatTier;
  monthlyPriceUsd: number;
  lastActiveAt: string;
  assignedAt: string;
  status: 'active' | 'released';
  releasedAt?: string | null;
}

export interface UsageEvent {
  id: string;
  tool: Tool;
  engineerId: string;
  teamId: string;
  repo: string;
  model: ModelId | string;
  startedAt: string;
  durationMin: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  costUsd: number;
  linesChanged: number;
  prId: string | null;
  kind: SessionKind;
  source: DataSource;
  /** Identifier of the scheduled loop that produced this run (kind = scheduled). */
  loopId?: string | null;
}
export type Session = UsageEvent;

export interface PullRequest {
  id: string;
  number: number;
  repo: string;
  teamId: string;
  authorId: string;
  title: string;
  ticketId: string | null;
  state: PrState;
  reverted: boolean;
  reviewRounds: number;
  openedAt: string;
  closedAt: string | null;
  linesChanged: number;
  aiAssisted: boolean;
}

export interface Ticket {
  id: string;
  key: string;
  epicId: string;
  type: TicketType;
  points: number | null;
  status: TicketStatus;
}

export interface Epic {
  id: string;
  key: string;
  name: string;
  teamId: string;
  ticketIds: string[];
  status: 'open' | 'closed';
}

export interface RepoConfig {
  repo: string;
  teamId: string;
  claudeMdLines: number;
  mcpServers: number;
}

export interface RecAction {
  kind:
    | 'release_seats'
    | 'downgrade_seats'
    | 'set_model_default'
    | 'set_runaway_cap'
    | 'disable_loop'
    | 'set_cache_hygiene'
    | 'set_subagent_model'
    | 'enable_plan_mode'
    | 'set_copilot_stop_usage';
  payload: Record<string, unknown>;
  /** Human-readable exact change, shown in the confirm modal. */
  summary: string;
}

export interface Recommendation {
  id: string;
  type: RecType;
  title: string;
  detail: string;
  scope: { teamId?: string; tool?: Tool; repo?: string };
  estMonthlySavingsUsd: { low: number; high: number };
  confidence: Confidence;
  formula: string;
  evidenceRefs: string[];
  status: RecStatus;
  action: RecAction | null;
}

export interface BudgetRequest {
  id: string;
  teamId: string;
  requesterNote: string;
  amountUsd: number;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
  decidedAt: string | null;
}

export interface AuditLogEntry {
  id: string;
  at: string;
  actor: 'demo-admin';
  action: string;
  target: string;
  before: unknown;
  after: unknown;
  dryRun: boolean;
  undone?: boolean;
  /** Recommendation this entry applied, if any. */
  recommendationId?: string | null;
}

/** Controls toggled by applied recommendations (demo-mode "live settings"). */
export interface Controls {
  teamModelDefault: Record<string, string>;
  subagentModel: Record<string, string>;
  runawayCapUsd: Record<string, number>;
  disabledLoops: string[];
  cacheHygieneTeams: string[];
  planModeTeams: string[];
}

export interface IngestStats {
  csvRows: number;
  csvEvents: number;
  otelRequests: number;
  otelDataPoints: number;
  otelSessions: number;
  lastCsvAt: string | null;
  lastOtelAt: string | null;
}

export interface StoredRecommendation {
  rec: Recommendation;
  status: RecStatus;
  updatedAt: string;
}

export interface State {
  version: 1;
  /** Bumped on every mutation; used for memoisation. */
  rev: number;
  /** "Today" for the dataset (YYYY-MM-DD, UTC). */
  asOf: string;
  org: Org;
  teams: Team[];
  engineers: Engineer[];
  seats: Seat[];
  sessions: Session[];
  prs: PullRequest[];
  tickets: Ticket[];
  epics: Epic[];
  repoConfigs: RepoConfig[];
  budgetRequests: BudgetRequest[];
  audit: AuditLogEntry[];
  controls: Controls;
  recommendationLog: Record<string, StoredRecommendation>;
  ingest: IngestStats;
  settings: { demoMode: boolean };
}
