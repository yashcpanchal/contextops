import type { ModelId, Tool, SeatTier } from './types';

/** USD per million tokens (illustrative list prices). */
export interface ModelPrice {
  input: number;
  output: number;
  cacheRead: number;
}
export const MODEL_PRICES: Record<string, ModelPrice> = {
  opus: { input: 15, output: 75, cacheRead: 1.5 },
  sonnet: { input: 3, output: 15, cacheRead: 0.3 },
  haiku: { input: 0.8, output: 4, cacheRead: 0.08 },
  'cursor-auto': { input: 2.5, output: 12, cacheRead: 0.25 },
  'copilot-premium': { input: 2.5, output: 12, cacheRead: 0.25 },
  'gpt-5-codex': { input: 1.25, output: 10, cacheRead: 0.125 },
};
export const TOP_TIER_MODEL = 'opus';

export function priceFor(model: ModelId | string): ModelPrice {
  return MODEL_PRICES[model] ?? MODEL_PRICES.sonnet;
}

export function tokenCostUsd(
  model: ModelId | string,
  inputTokens: number,
  outputTokens: number,
  cacheReadTokens: number,
): number {
  const p = priceFor(model);
  return (inputTokens * p.input + outputTokens * p.output + cacheReadTokens * p.cacheRead) / 1e6;
}

export const SEAT_PRICES: Record<Tool, Partial<Record<SeatTier, number>>> = {
  claude_code: { standard: 30, premium: 150 },
  cursor: { standard: 40 },
  copilot: { business: 19, enterprise: 39 },
  codex: { standard: 30 },
};

export const TOOL_LABEL: Record<Tool, string> = {
  claude_code: 'Claude Code',
  cursor: 'Cursor',
  copilot: 'GitHub Copilot',
  codex: 'Codex',
};
