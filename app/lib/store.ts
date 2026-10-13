import fs from 'node:fs';
import path from 'node:path';
import type { State } from './types';
import { seedState } from './seed';
import { dayKey } from './dates';

// JSON persistence: data/state.json with atomic writes (tmp + rename) and an in-process cache.

const g = globalThis as unknown as { __contextopsState?: State | null };

export function stateFilePath(): string {
  return process.env.CONTEXTOPS_STATE_FILE ?? path.join(process.cwd(), 'data', 'state.json');
}

function isPristine(s: State): boolean {
  return s.audit.length === 0 && s.ingest.csvEvents === 0 && s.ingest.otelRequests === 0;
}

function persist(state: State): void {
  const file = stateFilePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state));
  try {
    fs.renameSync(tmp, file);
  } catch {
    // Windows can reject rename-over-existing under contention; fall back to copy + unlink.
    fs.copyFileSync(tmp, file);
    fs.unlinkSync(tmp);
  }
}

function load(): State {
  const file = stateFilePath();
  if (fs.existsSync(file)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8')) as State;
      if (parsed.version === 1) {
        // A pristine demo from a previous day is re-seeded so history always ends today.
        if (parsed.asOf !== dayKey(new Date()) && isPristine(parsed)) return seedAndSave();
        return parsed;
      }
    } catch {
      // fall through to re-seed on a corrupt file
    }
  }
  return seedAndSave();
}

function seedAndSave(): State {
  const s = seedState();
  persist(s);
  return s;
}

/** Current state (lazily seeded when the file is missing). */
export function getState(): State {
  if (!g.__contextopsState) g.__contextopsState = load();
  return g.__contextopsState;
}

/** Run a mutation against the cached state, bump the revision and persist atomically. */
export function mutate<T>(fn: (s: State) => T): T {
  const state = getState();
  const result = fn(state);
  state.rev++;
  persist(state);
  return result;
}

export function resetState(): State {
  const s = seedState();
  g.__contextopsState = s;
  persist(s);
  return s;
}
