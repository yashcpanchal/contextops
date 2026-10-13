// Deterministic demo data for "Northwind Labs". Same asOf => identical output.
import type {
  Engineer,
  Epic,
  PullRequest,
  RepoConfig,
  Seat,
  SeatTier,
  Session,
  SessionKind,
  State,
  Team,
  Ticket,
  TicketType,
  Tool,
} from './types';
import { addDays, dayKey, isWeekend, rangeDays } from './dates';
import { SEAT_PRICES, tokenCostUsd } from './pricing';
import { monthProjection } from './engine/ledger';

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Global multiplier on synthetic token volumes; calibrated so org spend lands near $50-60K / month. */
const COST_SCALE = 2.5;
const HISTORY_DAYS = 90;

const FIRST = ['Ava', 'Liam', 'Noah', 'Mia', 'Ethan', 'Zoe', 'Lucas', 'Priya', 'Omar', 'Chen', 'Sofia', 'Mateo', 'Hana', 'Ivan', 'Nora', 'Kofi', 'Elena', 'Ravi', 'Yuki', 'Amara', 'Diego', 'Freya', 'Tariq', 'Lena', 'Jonas', 'Maya', 'Arjun', 'Isla', 'Felix', 'Selin'];
const LAST = ['Okafor', 'Lindqvist', 'Patel', 'Moreau', 'Nakamura', 'Alvarez', 'Hughes', 'Novak', 'Haddad', 'Fischer', 'Kowalski', 'Mensah', 'Rossi', 'Tanaka', 'Silva', 'Bergman', 'Costa', 'Ibrahim', 'Reyes', 'Walsh', 'Duarte', 'Ng', 'Sharma', 'Volkov', 'Brennan', 'Castillo', 'Eze', 'Larsen', 'Ortega', 'Yilmaz'];

interface TeamDef {
  id: string;
  name: string;
  em: string;
  size: number;
  prefix: string;
  repos: string[];
  unmerged: number;
  opusBias: number;
}
const TEAM_DEFS: TeamDef[] = [
  { id: 'payments', name: 'Payments', em: 'Rhea Kapoor', size: 16, prefix: 'PAY', repos: ['pay-api', 'ledger-core', 'pay-web'], unmerged: 0.16, opusBias: 0 },
  { id: 'checkout', name: 'Checkout', em: 'Daniel Brooks', size: 14, prefix: 'CHK', repos: ['checkout-web', 'cart-service', 'checkout-edge'], unmerged: 0.2, opusBias: 0 },
  { id: 'platform', name: 'Platform', em: 'Yara Haddad', size: 18, prefix: 'PLT', repos: ['platform-core', 'deploy-tools', 'auth-gateway'], unmerged: 0.2, opusBias: 0.08 },
  { id: 'data', name: 'Data', em: 'Marcus Lee', size: 14, prefix: 'DAT', repos: ['data-pipelines', 'warehouse-models', 'ml-features'], unmerged: 0.24, opusBias: 0 },
  { id: 'mobile', name: 'Mobile', em: 'Sana Iqbal', size: 15, prefix: 'MOB', repos: ['ios-app', 'android-app', 'mobile-sdk'], unmerged: 0.28, opusBias: 0 },
  { id: 'growth', name: 'Growth', em: 'Tomas Weber', size: 14, prefix: 'GRO', repos: ['growth-web', 'experiments', 'email-service'], unmerged: 0.3, opusBias: 0.05 },
  { id: 'search', name: 'Search', em: 'Ingrid Olsen', size: 14, prefix: 'SRC', repos: ['search-api', 'search-indexer', 'ranking-models'], unmerged: 0.17, opusBias: 0 },
  { id: 'infra', name: 'Infra', em: 'Kwame Asante', size: 15, prefix: 'INF', repos: ['infra-terraform', 'k8s-config', 'observability'], unmerged: 0.22, opusBias: 0.04 },
];

interface Rng {
  next: () => number;
  int: (a: number, b: number) => number;
  range: (a: number, b: number) => number;
  chance: (p: number) => boolean;
  pick: <T>(xs: readonly T[]) => T;
  logn: (median: number, sigma: number) => number;
  shuffle: <T>(xs: T[]) => T[];
}
function makeRng(seed: number): Rng {
  const r = mulberry32(seed);
  const rng: Rng = {
    next: r,
    int: (a, b) => a + Math.floor(r() * (b - a + 1)),
    range: (a, b) => a + r() * (b - a),
    chance: (p) => r() < p,
    pick: (xs) => xs[Math.floor(r() * xs.length)],
    logn: (median, sigma) => {
      const u = Math.max(1e-9, r());
      const v = r();
      const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      return median * Math.exp(sigma * z);
    },
    shuffle: (xs) => {
      for (let i = xs.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [xs[i], xs[j]] = [xs[j], xs[i]];
      }
      return xs;
    },
  };
  return rng;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Token mix that costs exactly `cost` on `model`. */
function tokensForCost(model: string, cost: number, price: { input: number; output: number; cacheRead: number }) {
  const inputTokens = Math.round((0.3 * cost * 1e6) / price.input);
  const outputTokens = Math.round((0.3 * cost * 1e6) / price.output);
  const cacheReadTokens = Math.round((0.4 * cost * 1e6) / price.cacheRead);
  void model;
  return { inputTokens, outputTokens, cacheReadTokens };
}

interface Profile {
  tool: Tool;
  engineerId: string;
  activeProb: number;
  costScale: number;
  lastActive: string | null; // null = through asOf
  lowDays?: string[]; // explicit low-usage days (last 30d) for duplicate seats
  lowMode?: boolean;
}

const TICKET_TITLES: Record<TicketType, string[]> = {
  feature: ['Add bulk export', 'Support multi-currency totals', 'Introduce saved filters', 'Add webhook retries dashboard', 'Self-serve plan upgrade', 'Partner API pagination'],
  bug: ['Fix duplicate event on retry', 'Handle null region in lookup', 'Correct rounding in invoice totals', 'Fix flaky timeout in sync job', 'Resolve stale cache on logout'],
  chore: ['Bump runtime dependencies', 'Remove dead feature flag', 'Update lint config', 'Rotate service credentials docs'],
  refactor: ['Extract pricing module', 'Split monolithic handler', 'Replace legacy client wrapper', 'Consolidate retry helpers'],
  spike: ['Evaluate vector index options', 'Prototype streaming ingest', 'Benchmark queue alternatives'],
};
const EPIC_NAMES = ['Checkout latency', 'Usage-based billing', 'SSO rollout', 'Observability v2', 'Onboarding revamp', 'Search relevance', 'Data contracts', 'Offline mode', 'Fraud signals', 'Self-serve admin', 'Cost allocation', 'Release train', 'Notification center', 'Pricing experiments', 'Index rebuild', 'Edge caching'];

export function seedState(asOfInput?: string): State {
  const asOf = asOfInput ?? dayKey(new Date());
  const rng = makeRng(20260101);
  const nowIso = `${asOf}T18:00:00.000Z`;
  const nowMs = Date.parse(nowIso);
  const days = rangeDays(asOf, HISTORY_DAYS);

  // ---------- Teams and engineers ----------
  const teams: Team[] = [];
  const engineers: Engineer[] = [];
  const usedEmails = new Set<string>();
  let engIdx = 0;
  for (const def of TEAM_DEFS) {
    const memberIds: string[] = [];
    for (let i = 0; i < def.size; i++) {
      let f = FIRST[engIdx % FIRST.length];
      let l = LAST[(engIdx * 7 + 3 + Math.floor(engIdx / 30)) % LAST.length];
      let email = `${f}.${l}`.toLowerCase() + '@northwind.example';
      let bump = 1;
      while (usedEmails.has(email)) {
        l = LAST[(engIdx * 7 + 3 + bump++) % LAST.length];
        email = `${f}.${l}`.toLowerCase() + '@northwind.example';
      }
      usedEmails.add(email);
      const id = `eng_${String(engIdx + 1).padStart(3, '0')}`;
      engineers.push({ id, displayName: `${f} ${l}`, teamId: def.id, email });
      memberIds.push(id);
      engIdx++;
    }
    teams.push({ id: def.id, name: def.name, emName: def.em, memberIds, monthlyBudgetUsd: 10000 });
  }
  const defById = new Map(TEAM_DEFS.map((d) => [d.id, d]));
  const engById = new Map(engineers.map((e) => [e.id, e]));

  // ---------- Tool groups ----------
  const order = rng.shuffle(engineers.map((e) => e.id));
  let cursorAt = 0;
  const take = (n: number) => order.slice(cursorAt, (cursorAt += n));
  const g0 = take(12); // claude + cursor + copilot (duplicate cursor/copilot)
  const g1 = take(13); // cursor + copilot (duplicate)
  const g2 = take(10); // claude + cursor
  const g3 = take(7); // claude + copilot
  const g4 = take(8); // cursor only
  const g5 = take(7); // copilot only
  const g6 = order.slice(cursorAt); // claude only (63)

  const toolsOf = new Map<string, Tool[]>();
  const add = (ids: string[], tools: Tool[]) => ids.forEach((id) => toolsOf.set(id, tools));
  add(g0, ['claude_code', 'cursor', 'copilot']);
  add(g1, ['cursor', 'copilot']);
  add(g2, ['claude_code', 'cursor']);
  add(g3, ['claude_code', 'copilot']);
  add(g4, ['cursor']);
  add(g5, ['copilot']);
  add(g6, ['claude_code']);

  // Inactive seats (about 18% of 174): which (engineer, tool) pairs
  const inactive = new Set<string>();
  const markInactive = (ids: string[], tool: Tool, n: number) => ids.slice(0, n).forEach((id) => inactive.add(`${id}|${tool}`));
  const g6Shuf = [...g6];
  markInactive(g6Shuf, 'claude_code', 16);
  markInactive(g4, 'cursor', 4);
  markInactive(g5, 'copilot', 4);
  markInactive(g2, 'cursor', 4);
  markInactive(g3, 'copilot', 3);

  // Claude tiers
  const claudeHolders = [...g0, ...g2, ...g3, ...g6];
  const inactiveClaude = g6Shuf.slice(0, 16);
  const activeClaude = claudeHolders.filter((id) => !inactiveClaude.includes(id));
  const premium = new Set<string>(inactiveClaude.slice(0, 10));
  const downgradable = new Set<string>();
  const heavy = new Set<string>();
  const activeShuf = rng.shuffle([...activeClaude]);
  activeShuf.slice(0, 12).forEach((id) => {
    premium.add(id);
    downgradable.add(id);
  });
  activeShuf.slice(12, 26).forEach((id) => {
    premium.add(id);
    heavy.add(id);
  });
  // Copilot enterprise (low use) among active copilot seats of g3/g5
  const copilotLow = new Set<string>(
    [...g3, ...g5].filter((id) => !inactive.has(`${id}|copilot`)).slice(0, 6),
  );
  // Duplicates: which tool is the "barely used" one
  const dupLow = new Map<string, Tool>();
  [...g0, ...g1].forEach((id) => dupLow.set(id, rng.chance(0.5) ? 'cursor' : 'copilot'));

  // ---------- Seats and usage profiles ----------
  const seats: Seat[] = [];
  const profiles: Profile[] = [];
  const last30Workdays = days.filter((d) => d > addDays(asOf, -30) && !isWeekend(d));
  for (const eng of engineers) {
    const tools = toolsOf.get(eng.id) ?? [];
    for (const tool of tools) {
      const isInactive = inactive.has(`${eng.id}|${tool}`);
      let tier: SeatTier = tool === 'claude_code' ? (premium.has(eng.id) ? 'premium' : 'standard') : tool === 'cursor' ? 'standard' : copilotLow.has(eng.id) ? 'enterprise' : 'business';
      if (tool === 'copilot' && tier === 'standard') tier = 'business';
      const price = SEAT_PRICES[tool][tier] ?? 0;
      const lastActive = isInactive ? addDays(asOf, -rng.int(35, 75)) : null;
      const personScale = clamp(rng.logn(1, 0.3), 0.5, 1.9);
      const profile: Profile = { tool, engineerId: eng.id, activeProb: 0.93, costScale: personScale, lastActive };
      if (tool === 'claude_code') {
        if (downgradable.has(eng.id)) {
          profile.activeProb = 0.33;
          profile.costScale *= 0.3;
        } else if (heavy.has(eng.id)) profile.costScale *= 1.6;
      }
      if (tool === 'copilot' && copilotLow.has(eng.id)) {
        profile.activeProb = 0.3;
        profile.costScale *= 0.12;
      }
      if (dupLow.get(eng.id) === tool) {
        profile.lowMode = true;
        profile.activeProb = 0.45;
        const n = rng.int(1, 3);
        profile.lowDays = rng.shuffle([...last30Workdays]).slice(0, n);
      }
      profiles.push(profile);
      seats.push({
        id: `seat_${eng.id.slice(4)}_${tool === 'claude_code' ? 'cc' : tool === 'cursor' ? 'cu' : 'gh'}`,
        tool,
        engineerId: eng.id,
        tier,
        monthlyPriceUsd: price,
        lastActiveAt: lastActive ? `${lastActive}T16:00:00.000Z` : nowIso,
        assignedAt: `${addDays(asOf, -rng.int(110, 420))}T09:00:00.000Z`,
        status: 'active',
        releasedAt: null,
      });
    }
  }

  // ---------- Sessions ----------
  const sessions: Session[] = [];
  let sid = 0;
  const repoPrimary = new Map<string, string>();
  const teamHit = (teamId: string, day: string): number => {
    const base = 0.88 + rng.range(-0.035, 0.035);
    if (teamId === 'data' && day > addDays(asOf, -22)) return 0.66 + rng.range(-0.04, 0.04);
    return base;
  };
  const teamMult = (teamId: string, day: string): number => {
    if (teamId === 'growth') {
      const ageFromEnd = 90 - (days.indexOf(day) + 1);
      if (ageFromEnd < 30) return 1 + 0.75 * (1 - ageFromEnd / 30);
    }
    if (teamId === 'mobile') return 1.12;
    return 1;
  };
  const hourStamp = (day: string, hour: number, minute: number) => `${day}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;

  const pickRepo = (engineerId: string, teamId: string): string => {
    let primary = repoPrimary.get(engineerId);
    if (!primary) {
      primary = rng.pick(defById.get(teamId)!.repos);
      repoPrimary.set(engineerId, primary);
    }
    return rng.chance(0.72) ? primary : rng.pick(defById.get(teamId)!.repos);
  };

  const makeClaudeSession = (p: Profile, day: string, teamId: string, kind: SessionKind): Session => {
    const def = defById.get(teamId)!;
    const lines = clamp(Math.round(rng.logn(55, 1.3)), 1, 1200);
    const small = lines < 40;
    let model: string;
    const roll = rng.next();
    const opusP = (small ? 0.4 : 0.2) + def.opusBias;
    if (kind === 'subagent') model = roll < 0.5 ? 'opus' : roll < 0.85 ? 'sonnet' : 'haiku';
    else model = roll < opusP ? 'opus' : roll < opusP + (small ? 0.5 : 0.7) ? 'sonnet' : 'haiku';
    const dur = clamp(Math.round(6 + lines * 0.25 * rng.range(0.6, 1.6)), 4, 240);
    const hit = teamHit(teamId, day);
    const mult = p.costScale * teamMult(teamId, day) * COST_SCALE;
    const ctx = dur * 55_000 * rng.range(0.7, 1.4) * mult;
    let cacheRead = ctx * hit;
    let input = ctx * (1 - hit);
    let output = (lines * 120 + 3000) * rng.range(0.7, 1.5) * mult;
    let cost = tokenCostUsd(model, input, output, cacheRead);
    if (cost > 70) {
      const f = (70 * rng.range(0.7, 0.98)) / cost;
      input *= f;
      output *= f;
      cacheRead *= f;
      cost = tokenCostUsd(model, input, output, cacheRead);
    }
    return {
      id: `s_${++sid}`,
      tool: 'claude_code',
      engineerId: p.engineerId,
      teamId,
      repo: pickRepo(p.engineerId, teamId),
      model,
      startedAt: hourStamp(day, rng.int(8, 18), rng.int(0, 59)),
      durationMin: dur,
      inputTokens: Math.round(input),
      outputTokens: Math.round(output),
      cacheReadTokens: Math.round(cacheRead),
      costUsd: round2(cost),
      linesChanged: lines,
      prId: null,
      kind,
      source: 'seed',
      loopId: null,
    };
  };

  const makeLightSession = (p: Profile, day: string, teamId: string): Session => {
    const isCursor = p.tool === 'cursor';
    const model = isCursor ? 'cursor-auto' : 'copilot-premium';
    const mult = p.costScale * teamMult(teamId, day);
    const cost = clamp(rng.logn(isCursor ? 4.5 : 1.0, 0.85) * mult, 0.03, isCursor ? 14 : 9);
    const price = { input: 2.5, output: 12, cacheRead: 0.25 };
    const t = tokensForCost(model, cost, price);
    const lines = clamp(Math.round(rng.logn(isCursor ? 45 : 22, 0.9)), 1, 500);
    return {
      id: `s_${++sid}`,
      tool: p.tool,
      engineerId: p.engineerId,
      teamId,
      repo: pickRepo(p.engineerId, teamId),
      model,
      startedAt: hourStamp(day, rng.int(8, 18), rng.int(0, 59)),
      durationMin: clamp(Math.round(lines / 3 + rng.range(5, 30)), 3, 180),
      ...t,
      costUsd: round2(cost),
      linesChanged: lines,
      prId: null,
      kind: 'interactive',
      source: 'seed',
      loopId: null,
    };
  };

  for (const p of profiles) {
    const eng = engById.get(p.engineerId)!;
    const teamId = eng.teamId;
    const lowSet = new Set(p.lowDays ?? []);
    let weekOffUntil = '';
    for (const day of days) {
      if (isWeekend(day)) continue;
      if (p.lastActive && day > p.lastActive) continue;
      if (weekOffUntil && day <= weekOffUntil) continue;
      if (rng.chance(0.012)) {
        weekOffUntil = addDays(day, rng.int(2, 6));
        continue;
      }
      if (p.lowMode) {
        const inLast30 = day > addDays(asOf, -30);
        if (inLast30 ? !lowSet.has(day) : !rng.chance(p.activeProb)) continue;
      } else if (!rng.chance(p.activeProb)) continue;
      if (p.tool === 'claude_code') {
        const n = rng.pick([1, 2, 2, 2, 3, 3, 4]);
        for (let k = 0; k < n; k++) {
          const kind: SessionKind = rng.chance(0.14) ? 'subagent' : 'interactive';
          sessions.push(makeClaudeSession(p, day, teamId, kind));
        }
      } else sessions.push(makeLightSession(p, day, teamId));
    }
  }

  // ---------- PRs: cluster each engineer's sessions ----------
  const prs: PullRequest[] = [];
  const prSeq = new Map<string, number>();
  const sessionsByEng = new Map<string, Session[]>();
  for (const s of sessions) {
    const l = sessionsByEng.get(s.engineerId);
    if (l) l.push(s);
    else sessionsByEng.set(s.engineerId, [s]);
  }
  const nextPrNumber = (repo: string) => {
    const n = (prSeq.get(repo) ?? 1000) + 1;
    prSeq.set(repo, n);
    return n;
  };
  const prTitleFor = (lines: number): string => {
    const t: TicketType = lines < 30 ? 'bug' : lines < 120 ? rng.pick(['bug', 'feature', 'chore'] as TicketType[]) : rng.pick(['feature', 'refactor', 'feature', 'spike'] as TicketType[]);
    return rng.pick(TICKET_TITLES[t]);
  };
  const makePr = (opts: { engineerId: string; teamId: string; repo: string; lines: number; open: Date | number; close: number | null; state: PullRequest['state']; ai: boolean }): PullRequest => {
    const reverted = opts.state === 'merged' && rng.chance(0.04);
    const pr: PullRequest = {
      id: `pr_${prs.length + 1}`,
      number: nextPrNumber(opts.repo),
      repo: opts.repo,
      teamId: opts.teamId,
      authorId: opts.engineerId,
      title: prTitleFor(opts.lines),
      ticketId: null,
      state: opts.state,
      reverted,
      reviewRounds: opts.state === 'merged' ? rng.int(0, 3) : opts.state === 'closed_unmerged' ? rng.int(1, 5) : rng.int(0, 2),
      openedAt: new Date(opts.open).toISOString(),
      closedAt: opts.close === null ? null : new Date(opts.close).toISOString(),
      linesChanged: opts.lines,
      aiAssisted: opts.ai,
    };
    prs.push(pr);
    return pr;
  };

  sessionsByEng.forEach((list, engineerId) => {
    const teamId = engById.get(engineerId)!.teamId;
    const def = defById.get(teamId)!;
    list.sort((a, b) => a.startedAt.localeCompare(b.startedAt));
    let i = 0;
    while (i < list.length) {
      const s = list[i];
      if (!rng.chance(0.8)) {
        i++;
        continue;
      }
      const target = rng.pick([3, 4, 5, 6, 7, 8]);
      const cluster: Session[] = [s];
      let j = i + 1;
      while (j < list.length && cluster.length < target && Date.parse(list[j].startedAt) - Date.parse(cluster[cluster.length - 1].startedAt) < 6 * 86400000) {
        cluster.push(list[j]);
        j++;
      }
      const lines = Math.max(3, Math.round(cluster.reduce((a, c) => a + c.linesChanged, 0) * rng.range(0.5, 0.9)));
      const lastStart = Date.parse(cluster[cluster.length - 1].startedAt);
      const closeMs = lastStart + rng.range(0.2, 3.2) * 86400000;
      const openMs = Date.parse(cluster[0].startedAt) - 3600000;
      let state: PullRequest['state'];
      let close: number | null = closeMs;
      if (closeMs > nowMs) {
        state = 'open';
        close = null;
      } else state = rng.chance(def.unmerged) ? 'closed_unmerged' : 'merged';
      const pr = makePr({ engineerId, teamId, repo: s.repo, lines, open: openMs, close, state, ai: true });
      for (const c of cluster) {
        c.prId = pr.id;
        c.repo = s.repo;
      }
      i = j;
    }
  });

  // Non-AI PRs
  const aiCount = prs.length;
  for (let k = 0; k < Math.round(aiCount * 0.3); k++) {
    const eng = rng.pick(engineers);
    const def = defById.get(eng.teamId)!;
    const closeMs = nowMs - rng.range(0.3, 88) * 86400000;
    makePr({ engineerId: eng.id, teamId: eng.teamId, repo: rng.pick(def.repos), lines: clamp(Math.round(rng.logn(50, 0.9)), 2, 600), open: closeMs - rng.range(1, 5) * 86400000, close: closeMs, state: rng.chance(0.06) ? 'closed_unmerged' : 'merged', ai: false });
  }

  // ---------- Planted waste ----------
  const planted = (opts: { engineerId: string; day: string; cost: number; kind: SessionKind; repo: string; prId: string | null; loopId?: string; model?: string; lines?: number; dur?: number }): Session => {
    const model = opts.model ?? 'opus';
    const price = { input: 15, output: 75, cacheRead: 1.5 };
    const t = tokensForCost(model, opts.cost, price);
    const eng = engById.get(opts.engineerId)!;
    const s: Session = {
      id: `s_${++sid}`,
      tool: 'claude_code',
      engineerId: opts.engineerId,
      teamId: eng.teamId,
      repo: opts.repo,
      model,
      startedAt: hourStamp(opts.day, rng.int(1, 6), rng.int(0, 59)),
      durationMin: opts.dur ?? rng.int(180, 560),
      ...t,
      costUsd: round2(opts.cost),
      linesChanged: opts.lines ?? rng.int(0, 25),
      prId: opts.prId,
      kind: opts.kind,
      source: 'seed',
      loopId: opts.loopId ?? null,
    };
    sessions.push(s);
    return s;
  };
  const activeInTeam = (teamId: string) => {
    const defTeam = teams.find((t) => t.id === teamId)!;
    const id = defTeam.memberIds.find((m) => activeClaude.includes(m) && !downgradable.has(m));
    return id ?? defTeam.memberIds[0];
  };
  const runawaySpecs: Array<{ team: string; daysAgo: number; cost: number; kind: 'pr' | 'none' }> = [
    { team: 'payments', daysAgo: 4, cost: 238, kind: 'pr' },
    { team: 'growth', daysAgo: 6, cost: 312, kind: 'pr' },
    { team: 'growth', daysAgo: 12, cost: 187, kind: 'pr' },
    { team: 'data', daysAgo: 9, cost: 264, kind: 'none' },
    { team: 'search', daysAgo: 15, cost: 171, kind: 'pr' },
    { team: 'mobile', daysAgo: 21, cost: 205, kind: 'none' },
  ];
  for (const r of runawaySpecs) {
    const engineerId = activeInTeam(r.team);
    const day = addDays(asOf, -r.daysAgo);
    const def = defById.get(r.team)!;
    if (r.kind === 'pr') {
      const repo = def.repos[0];
      const closeMs = Date.parse(`${day}T20:00:00.000Z`) + 86400000;
      const pr = makePr({ engineerId, teamId: r.team, repo, lines: rng.int(20, 90), open: closeMs - 2 * 86400000, close: closeMs, state: 'closed_unmerged', ai: true });
      planted({ engineerId, day, cost: r.cost, kind: 'interactive', repo, prId: pr.id });
    } else {
      planted({ engineerId, day, cost: r.cost, kind: 'interactive', repo: 'scratch-sandbox', prId: null });
    }
  }
  // Scheduled loops: many small runs, no outcome. Two of them also have one runaway run.
  const loopSpecs = [
    { id: 'nightly-triage', team: 'platform', perDay: 1, median: 5.5, weekends: true, span: 40, runaway: { daysAgo: 11, cost: 342 } },
    { id: 'dep-bump-weekly', team: 'infra', perDay: 1, median: 4, weekends: false, span: 38, runaway: { daysAgo: 8, cost: 219 } },
    { id: 'goal-checkin', team: 'growth', perDay: 2, median: 2.6, weekends: false, span: 30, runaway: null },
  ];
  for (const spec of loopSpecs) {
    const engineerId = activeInTeam(spec.team);
    for (let d = 0; d < spec.span; d++) {
      const day = addDays(asOf, -d);
      if (!spec.weekends && isWeekend(day)) continue;
      for (let k = 0; k < spec.perDay; k++) {
        planted({ engineerId, day, cost: clamp(rng.logn(spec.median, 0.35), 0.8, 14), kind: 'scheduled', repo: 'ops-loops', prId: null, loopId: spec.id, model: 'sonnet', dur: rng.int(8, 40), lines: 0 });
      }
    }
    if (spec.runaway) planted({ engineerId, day: addDays(asOf, -spec.runaway.daysAgo), cost: spec.runaway.cost, kind: 'scheduled', repo: 'ops-loops', prId: null, loopId: spec.id, lines: 0 });
  }

  // ---------- Tickets and epics ----------
  const tickets: Ticket[] = [];
  const epics: Epic[] = [];
  const prefixCount = new Map<string, number>();
  const typeFromLines = (lines: number): TicketType => {
    const r = rng.next();
    if (lines < 30) return r < 0.55 ? 'bug' : r < 0.9 ? 'chore' : 'feature';
    if (lines < 120) return r < 0.4 ? 'bug' : r < 0.8 ? 'feature' : r < 0.9 ? 'chore' : 'refactor';
    return r < 0.55 ? 'feature' : r < 0.8 ? 'refactor' : 'spike';
  };
  const pointsFor = (type: TicketType): number | null => (rng.chance(0.2) ? null : type === 'bug' || type === 'chore' ? rng.pick([1, 2, 3]) : rng.pick([3, 5, 8, 13]));
  for (const def of TEAM_DEFS) {
    const teamPrs = prs.filter((p) => p.teamId === def.id && p.state !== 'open').sort((a, b) => (a.closedAt ?? '').localeCompare(b.closedAt ?? ''));
    const merged = teamPrs.filter((p) => p.state === 'merged');
    const unmerged = teamPrs.filter((p) => p.state === 'closed_unmerged');
    const groups: PullRequest[][] = [];
    for (let i = 0; i < merged.length; ) {
      if (!rng.chance(0.62)) {
        i++;
        continue;
      }
      const n = rng.pick([1, 1, 2, 2, 3]);
      groups.push(merged.slice(i, i + n));
      i += n;
    }
    const perEpic = Math.ceil(groups.length / 6);
    for (let e = 0; e < 6; e++) {
      const chunk = groups.slice(e * perEpic, (e + 1) * perEpic);
      if (!chunk.length) continue;
      const epicNo = e + 1;
      const epic: Epic = {
        id: `epic_${def.id}_${epicNo}`,
        key: `${def.prefix}-E${epicNo}`,
        name: `${EPIC_NAMES[(TEAM_DEFS.indexOf(def) * 2 + e) % EPIC_NAMES.length]}`,
        teamId: def.id,
        ticketIds: [],
        status: e >= 4 ? 'open' : 'closed',
      };
      for (const g of chunk) {
        const n = (prefixCount.get(def.prefix) ?? 100) + 1;
        prefixCount.set(def.prefix, n);
        const lines = g.reduce((a, p) => a + p.linesChanged, 0);
        const type = typeFromLines(lines);
        const t: Ticket = { id: `tk_${tickets.length + 1}`, key: `${def.prefix}-${n}`, epicId: epic.id, type, points: pointsFor(type), status: 'done' };
        tickets.push(t);
        epic.ticketIds.push(t.id);
        g.forEach((p) => (p.ticketId = t.id));
        // Occasionally an abandoned attempt belongs to the same ticket.
        if (rng.chance(0.25) && unmerged.length) {
          const u = unmerged.find((x) => !x.ticketId && x.teamId === def.id && (x.closedAt ?? '') < (g[0].closedAt ?? ''));
          if (u) u.ticketId = t.id;
        }
      }
      if (epic.status === 'open') {
        const extra = rng.int(7, 12);
        for (let k = 0; k < extra; k++) {
          const n = (prefixCount.get(def.prefix) ?? 100) + 1;
          prefixCount.set(def.prefix, n);
          const type = rng.pick<TicketType>(['feature', 'feature', 'bug', 'bug', 'chore', 'refactor', 'spike']);
          const t: Ticket = { id: `tk_${tickets.length + 1}`, key: `${def.prefix}-${n}`, epicId: epic.id, type, points: pointsFor(type), status: rng.chance(0.3) ? 'in_progress' : 'todo' };
          tickets.push(t);
          epic.ticketIds.push(t.id);
        }
      }
      epics.push(epic);
    }
  }

  // ---------- Seat lastActiveAt from real activity ----------
  const lastByKey = new Map<string, string>();
  for (const s of sessions) {
    if (s.kind === 'scheduled') continue;
    const k = `${s.engineerId}|${s.tool}`;
    const cur = lastByKey.get(k);
    if (!cur || s.startedAt > cur) lastByKey.set(k, s.startedAt);
  }
  for (const seat of seats) {
    const last = lastByKey.get(`${seat.engineerId}|${seat.tool}`);
    if (last && (inactive.has(`${seat.engineerId}|${seat.tool}`) || seat.lastActiveAt === nowIso)) seat.lastActiveAt = last;
    else if (!last && seat.lastActiveAt === nowIso) seat.lastActiveAt = seat.assignedAt;
  }

  // ---------- Repo configs ----------
  const bigClaudeMd: Record<string, number> = { 'ledger-core': 340, 'growth-web': 262, 'search-indexer': 415 };
  const repoConfigs: RepoConfig[] = [];
  for (const def of TEAM_DEFS) {
    for (const repo of def.repos) {
      repoConfigs.push({ repo, teamId: def.id, claudeMdLines: bigClaudeMd[repo] ?? rng.int(40, 175), mcpServers: rng.int(1, 9) });
    }
  }

  const state: State = {
    version: 1,
    rev: 1,
    asOf,
    org: {
      id: 'org_northwind',
      name: 'Northwind Labs',
      engineers: engineers.length,
      planNotes: 'Claude Code Team (premium + standard seats, API overage), Cursor Teams ($40), GitHub Copilot Business ($19).',
      config: { copilotStopUsageEnabled: false },
    },
    teams,
    engineers,
    seats,
    sessions,
    prs,
    tickets,
    epics,
    repoConfigs,
    budgetRequests: [],
    audit: [],
    controls: { teamModelDefault: {}, subagentModel: {}, runawayCapUsd: {}, disabledLoops: [], cacheHygieneTeams: [], planModeTeams: [] },
    recommendationLog: {},
    ingest: { csvRows: 0, csvEvents: 0, otelRequests: 0, otelDataPoints: 0, otelSessions: 0, lastCsvAt: null, lastOtelAt: null },
    settings: { demoMode: true },
  };

  // ---------- Budgets from projected run rate ----------
  const roundTo = (x: number) => Math.max(1000, Math.round(x / 250) * 250);
  for (const t of teams) {
    const proj = monthProjection(state, { teamId: t.id }).projectedMonthEndUsd;
    const ratio = t.id === 'growth' ? 1.3 : t.id === 'mobile' ? 0.93 : 0.6 + ((TEAM_DEFS.findIndex((d) => d.id === t.id) * 37) % 20) / 100;
    t.monthlyBudgetUsd = roundTo(proj / ratio);
  }

  state.budgetRequests = [
    { id: 'br_1', teamId: 'growth', requesterNote: 'Q4 lifecycle experiments need more agent time; two launches land before month-end.', amountUsd: 4000, status: 'pending', createdAt: `${addDays(asOf, -2)}T15:10:00.000Z`, decidedAt: null },
    { id: 'br_2', teamId: 'mobile', requesterNote: 'Android and iOS release trains overlap this sprint.', amountUsd: 1500, status: 'pending', createdAt: `${addDays(asOf, -1)}T10:30:00.000Z`, decidedAt: null },
    { id: 'br_3', teamId: 'checkout', requesterNote: 'Cart migration spike last month.', amountUsd: 800, status: 'approved', createdAt: `${addDays(asOf, -26)}T09:00:00.000Z`, decidedAt: `${addDays(asOf, -25)}T11:00:00.000Z` },
  ];
  return state;
}

function round2(x: number): number {
  return Math.round(x * 100) / 100;
}
