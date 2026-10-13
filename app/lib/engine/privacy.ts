import type { Session, State, Team, Tool } from '../types';
import { addDays } from '../dates';
import { dailySeries } from './ledger';

/** k-anonymity floor: team views with fewer members roll up into "Other". */
export const K_ANON_MIN = 5;
export const OTHER_TEAM_ID = 'other';

export interface TeamView {
  id: string;
  name: string;
  emName: string | null;
  memberCount: number;
  memberIds: string[];
  monthlyBudgetUsd: number;
  /** True when the view is itself still below k and must not be drilled into. */
  suppressed: boolean;
  rolledUpFrom: string[];
}

/** Teams with >= K members are shown as-is; smaller ones merge into a single "Other" bucket. */
export function teamViews(teams: Team[], k = K_ANON_MIN): TeamView[] {
  const big: TeamView[] = [];
  const small: Team[] = [];
  for (const t of teams) {
    if (t.memberIds.length >= k) {
      big.push({ id: t.id, name: t.name, emName: t.emName, memberCount: t.memberIds.length, memberIds: t.memberIds, monthlyBudgetUsd: t.monthlyBudgetUsd, suppressed: false, rolledUpFrom: [] });
    } else small.push(t);
  }
  if (small.length) {
    const memberIds = small.flatMap((t) => t.memberIds);
    big.push({
      id: OTHER_TEAM_ID,
      name: 'Other',
      emName: null,
      memberCount: memberIds.length,
      memberIds,
      monthlyBudgetUsd: small.reduce((a, t) => a + t.monthlyBudgetUsd, 0),
      suppressed: memberIds.length < k,
      rolledUpFrom: small.map((t) => t.id),
    });
  }
  return big;
}

export function mapTeamId(teams: Team[], teamId: string, k = K_ANON_MIN): string {
  const t = teams.find((x) => x.id === teamId);
  return t && t.memberIds.length >= k ? t.id : OTHER_TEAM_ID;
}

export interface PublicSession {
  id: string;
  tool: Tool;
  teamId: string;
  repo: string;
  model: string;
  startedAt: string;
  costUsd: number;
  linesChanged: number;
  kind: Session['kind'];
  source: Session['source'];
  loopId: string | null;
  /** "Session in pay-api" -- never a person. */
  label: string;
}

/** Strip every person identifier from a session. */
export function publicSession(s: Session): PublicSession {
  return {
    id: s.id,
    tool: s.tool,
    teamId: s.teamId,
    repo: s.repo,
    model: s.model,
    startedAt: s.startedAt,
    costUsd: s.costUsd,
    linesChanged: s.linesChanged,
    kind: s.kind,
    source: s.source,
    loopId: s.loopId ?? null,
    label: `${s.kind === 'scheduled' ? 'Scheduled run' : 'Session'} in ${s.repo}`,
  };
}

const FORBIDDEN_KEYS = new Set(['engineerId', 'email', 'user_email', 'displayName', 'authorId']);

/** Dev/test guard: throws if a payload contains a person-identifying key anywhere. */
export function assertNoPersonIdentifiers(payload: unknown, path = '$'): void {
  if (Array.isArray(payload)) {
    payload.forEach((v, i) => assertNoPersonIdentifiers(v, `${path}[${i}]`));
  } else if (payload && typeof payload === 'object') {
    for (const [k, v] of Object.entries(payload as Record<string, unknown>)) {
      if (FORBIDDEN_KEYS.has(k)) throw new Error(`Privacy violation: ${path}.${k}`);
      assertNoPersonIdentifiers(v, `${path}.${k}`);
    }
  }
}

export interface SelfView {
  engineerId: string;
  displayName: string;
  windowDays: number;
  totalUsd: number;
  usageUsd: number;
  byTool: Record<string, number>;
  daily: Array<{ date: string; usageUsd: number }>;
}

/** The only per-engineer cost view: an engineer's own meter. Never returns anyone else's data. */
export function selfView(state: State, engineerId: string, days = 30): SelfView {
  const eng = state.engineers.find((e) => e.id === engineerId);
  if (!eng) throw new Error(`Unknown engineer: ${engineerId}`);
  const from = addDays(state.asOf, -(days - 1));
  const perDay = new Map<string, number>();
  const byTool: Record<string, number> = {};
  let total = 0;
  for (const s of state.sessions) {
    if (s.engineerId !== engineerId) continue;
    const d = s.startedAt.slice(0, 10);
    if (d < from || d > state.asOf) continue;
    perDay.set(d, (perDay.get(d) ?? 0) + s.costUsd);
    byTool[s.tool] = (byTool[s.tool] ?? 0) + s.costUsd;
    total += s.costUsd;
  }
  const daily = dailySeries(state, from, state.asOf, { teamId: eng.teamId }).map((p) => ({ date: p.date, usageUsd: perDay.get(p.date) ?? 0 }));
  return { engineerId, displayName: eng.displayName, windowDays: days, totalUsd: total, usageUsd: total, byTool, daily };
}
