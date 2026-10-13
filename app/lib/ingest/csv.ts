import type { Session, State, Tool } from '../types';

export const CSV_COLUMNS = ['date', 'tool', 'user_email', 'model', 'input_tokens', 'output_tokens', 'cost_usd', 'repo'] as const;

export interface CsvRow {
  date: string;
  tool: string;
  user_email: string;
  model: string;
  input_tokens: string;
  output_tokens: string;
  cost_usd: string;
  repo: string;
}

export interface ParsedCsv {
  rows: CsvRow[];
  errors: string[];
}

/** RFC 4180-ish CSV tokenizer: quoted fields, escaped quotes, CRLF. */
export function tokenizeCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== '') rows.push(row);
  return rows;
}

export function parseCsv(text: string): ParsedCsv {
  const table = tokenizeCsv(text);
  const errors: string[] = [];
  if (!table.length) return { rows: [], errors: ['Empty file.'] };
  const header = table[0].map((h) => h.trim().toLowerCase());
  const missing = CSV_COLUMNS.filter((c) => !header.includes(c));
  if (missing.length) return { rows: [], errors: [`Missing required column(s): ${missing.join(', ')}`] };
  const idx = Object.fromEntries(CSV_COLUMNS.map((c) => [c, header.indexOf(c)])) as Record<(typeof CSV_COLUMNS)[number], number>;
  const rows: CsvRow[] = [];
  for (let r = 1; r < table.length; r++) {
    const cells = table[r];
    const row = Object.fromEntries(CSV_COLUMNS.map((c) => [c, (cells[idx[c]] ?? '').trim()])) as unknown as CsvRow;
    if (!/^\d{4}-\d{2}-\d{2}/.test(row.date)) {
      errors.push(`Row ${r + 1}: invalid date "${row.date}"`);
      continue;
    }
    if (!row.user_email.includes('@')) {
      errors.push(`Row ${r + 1}: invalid user_email`);
      continue;
    }
    if (!Number.isFinite(Number(row.cost_usd)) || row.cost_usd === '') {
      errors.push(`Row ${r + 1}: invalid cost_usd "${row.cost_usd}"`);
      continue;
    }
    rows.push(row);
  }
  return { rows, errors };
}

export function normalizeTool(raw: string): Tool | null {
  const t = raw.trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (['claude_code', 'claude', 'claudecode', 'anthropic'].includes(t)) return 'claude_code';
  if (t === 'cursor') return 'cursor';
  if (['copilot', 'github_copilot', 'gh_copilot'].includes(t)) return 'copilot';
  if (['codex', 'openai_codex'].includes(t)) return 'codex';
  return null;
}

export function normalizeModel(raw: string): string {
  const m = raw.trim().toLowerCase();
  if (m.includes('opus')) return 'opus';
  if (m.includes('sonnet')) return 'sonnet';
  if (m.includes('haiku')) return 'haiku';
  if (m.includes('codex')) return 'gpt-5-codex';
  if (m.includes('cursor') || m === 'auto') return 'cursor-auto';
  if (m.includes('copilot')) return 'copilot-premium';
  return m || 'unknown';
}

function hash(s: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

export interface CsvImportResult {
  rowsParsed: number;
  eventsAdded: number;
  duplicatesSkipped: number;
  unmatchedRows: number;
  unmatchedEmails: string[];
  unknownToolRows: number;
  errors: string[];
  addedCostUsd: number;
}

/** Map parsed rows onto roster engineers and append UsageEvents (source 'csv'). Idempotent per identical row. */
export function importCsvRows(state: State, parsed: ParsedCsv): CsvImportResult {
  const byEmail = new Map(state.engineers.map((e) => [e.email.toLowerCase(), e]));
  const existing = new Set<string>();
  for (const s of state.sessions) if (s.source === 'csv') existing.add(s.id);
  const occurrences = new Map<string, number>();
  const result: CsvImportResult = {
    rowsParsed: parsed.rows.length,
    eventsAdded: 0,
    duplicatesSkipped: 0,
    unmatchedRows: 0,
    unmatchedEmails: [],
    unknownToolRows: 0,
    errors: [...parsed.errors],
    addedCostUsd: 0,
  };
  const unmatched = new Set<string>();
  for (const row of parsed.rows) {
    const eng = byEmail.get(row.user_email.toLowerCase());
    if (!eng) {
      result.unmatchedRows++;
      unmatched.add(row.user_email.toLowerCase());
      continue;
    }
    const tool = normalizeTool(row.tool);
    if (!tool) {
      result.unknownToolRows++;
      continue;
    }
    const base = [row.date, tool, row.user_email.toLowerCase(), row.model, row.input_tokens, row.output_tokens, row.cost_usd, row.repo].join('|');
    const n = (occurrences.get(base) ?? 0) + 1;
    occurrences.set(base, n);
    const id = `csv_${hash(base)}_${n}`;
    if (existing.has(id)) {
      result.duplicatesSkipped++;
      continue;
    }
    const day = row.date.slice(0, 10);
    const ev: Session = {
      id,
      tool,
      engineerId: eng.id,
      teamId: eng.teamId,
      repo: row.repo || 'unknown',
      model: normalizeModel(row.model),
      startedAt: `${day}T12:00:00.000Z`,
      durationMin: 0,
      inputTokens: Math.max(0, Math.round(Number(row.input_tokens) || 0)),
      outputTokens: Math.max(0, Math.round(Number(row.output_tokens) || 0)),
      cacheReadTokens: 0,
      costUsd: Number(row.cost_usd),
      linesChanged: 0,
      prId: null,
      kind: 'interactive',
      source: 'csv',
      loopId: null,
    };
    state.sessions.push(ev);
    existing.add(id);
    result.eventsAdded++;
    result.addedCostUsd += ev.costUsd;
    const seat = state.seats.find((s) => s.engineerId === eng.id && s.tool === tool && s.status === 'active');
    if (seat && seat.lastActiveAt < ev.startedAt) seat.lastActiveAt = ev.startedAt;
  }
  result.unmatchedEmails = Array.from(unmatched).slice(0, 20);
  state.ingest.csvRows += parsed.rows.length;
  state.ingest.csvEvents += result.eventsAdded;
  state.ingest.lastCsvAt = new Date().toISOString();
  state.rev++;
  return result;
}
