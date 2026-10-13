import type { Tool } from '@/lib/types';
export const TOOL_LABEL: Record<string, string> = { claude_code: 'Claude Code', cursor: 'Cursor', copilot: 'GitHub Copilot', codex: 'Codex' };
export const TOOL_COLOR: Record<string, string> = { claude_code: '#6366f1', cursor: '#0ea5e9', copilot: '#64748b', codex: '#a78bfa' };
export const TOOL_KEYS: Tool[] = ['claude_code', 'cursor', 'copilot', 'codex'];
export const KIND_LABEL: Record<string, string> = {
  inactive_seat: 'Inactive seat',
  duplicate_tools: 'Duplicate tools',
  downgradable_tier: 'Downgradable tier',
  top_model_small_task: 'Top-tier model on small task',
  runaway_session: 'Runaway session',
  idle_loop: 'Idle scheduled loop',
  abandoned_pr: 'Abandoned PR spend',
  reverted_pr: 'Reverted PR spend',
  cache_regression: 'Cache regression',
  copilot_stop_usage_disabled: 'Copilot stop-usage off',
};
export function parseRange(v: string | string[] | undefined): 30 | 90 {
  return (Array.isArray(v) ? v[0] : v) === '90' ? 90 : 30;
}
export function usdRangeFull(low: number, high: number): string {
  return low === high ? `$${Math.round(low).toLocaleString('en-US')}` : `$${Math.round(low).toLocaleString('en-US')} to $${Math.round(high).toLocaleString('en-US')}`;
}
