// Pure UTC date helpers. Day keys are YYYY-MM-DD.
export const DAY_MS = 86_400_000;

export function dayKey(d: Date | string | number): string {
  return new Date(d).toISOString().slice(0, 10);
}
export function dayStart(key: string): number {
  return Date.parse(key + 'T00:00:00.000Z');
}
export function addDays(key: string, n: number): string {
  return dayKey(dayStart(key) + n * DAY_MS);
}
export function diffDays(a: string, b: string): number {
  return Math.round((dayStart(a) - dayStart(b)) / DAY_MS);
}
export function daysInMonth(key: string): number {
  const y = Number(key.slice(0, 4));
  const m = Number(key.slice(5, 7));
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}
export function monthStart(key: string): string {
  return key.slice(0, 8) + '01';
}
export function rangeDays(endKey: string, days: number): string[] {
  const out: string[] = [];
  for (let i = days - 1; i >= 0; i--) out.push(addDays(endKey, -i));
  return out;
}
export function isWeekend(key: string): boolean {
  const d = new Date(dayStart(key)).getUTCDay();
  return d === 0 || d === 6;
}
