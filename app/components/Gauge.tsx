/** Semicircle pacing gauge: filled arc = projected month-end / budget (capped at 150%), tick = 100% of budget. */
export function Gauge({ ratio, tone, label, sub }: { ratio: number; tone: 'emerald' | 'amber' | 'rose'; label: string; sub?: string }) {
  const max = 1.5;
  const r = 80;
  const cx = 100;
  const cy = 100;
  const frac = Math.max(0, Math.min(1, ratio / max));
  const pt = (f: number, rad = r) => {
    const a = Math.PI * (1 - f);
    return [cx + rad * Math.cos(a), cy - rad * Math.sin(a)];
  };
  const [sx, sy] = pt(0);
  const [ex, ey] = pt(frac);
  const [fx, fy] = pt(1);
  const [t1x, t1y] = pt(1 / max, r - 12);
  const [t2x, t2y] = pt(1 / max, r + 8);
  const stroke = tone === 'emerald' ? '#10b981' : tone === 'amber' ? '#f59e0b' : '#f43f5e';
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[260px]" role="img" aria-label={`${label}, ${(ratio * 100).toFixed(0)} percent of budget`}>
        <path d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${fx} ${fy}`} fill="none" stroke="var(--grid)" strokeWidth="14" strokeLinecap="round" />
        {frac > 0.001 && <path d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`} fill="none" stroke={stroke} strokeWidth="14" strokeLinecap="round" />}
        <line x1={t1x} y1={t1y} x2={t2x} y2={t2y} stroke="#475569" strokeWidth="2" />
        <text x={cx} y={cy - 12} textAnchor="middle" className="fill-slate-900 dark:fill-slate-50" style={{ fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          {(ratio * 100).toFixed(0)}%
        </text>
        <text x={cx} y={cy + 6} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 10 }}>
          {label}
        </text>
      </svg>
      {sub && <p className="-mt-1 text-center text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
