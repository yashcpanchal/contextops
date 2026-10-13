'use client';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';
import { usd, usdCompact, pct } from '@/lib/format';
import { TOOL_COLOR, TOOL_LABEL } from './format';

const AXIS = { fontSize: 11, fill: '#94a3b8' };
const GRID = 'var(--grid)';
const tooltipStyle = {
  contentStyle: { background: 'var(--tt-bg)', color: 'var(--tt-fg)', border: '1px solid var(--tt-bd)', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 24px rgba(15,23,42,0.12)' },
  labelStyle: { color: 'var(--tt-fg)', fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: 'var(--tt-fg)', padding: 0 },
};
const fmtDate = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export function SpendByToolChart({ data }: { data: Array<Record<string, number | string>> }) {
  const keys = ['claude_code', 'cursor', 'copilot', 'codex'].filter((k) => data.some((d) => Number(d[k]) > 0));
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 18 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="date" tickFormatter={fmtDate} tick={AXIS} minTickGap={32} tickLine={false} axisLine={{ stroke: GRID }} label={{ value: 'Day', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis tick={AXIS} tickFormatter={(v) => usdCompact(v)} tickLine={false} axisLine={false} width={52} label={{ value: 'Daily spend (USD)', angle: -90, position: 'insideLeft', offset: 8, style: { ...AXIS, textAnchor: 'middle' } }} />
          <Tooltip {...tooltipStyle} labelFormatter={(l) => fmtDate(String(l))} formatter={(v: number, n: string) => [usd(v), TOOL_LABEL[n] ?? n]} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 6 }} formatter={(v) => TOOL_LABEL[v] ?? v} verticalAlign="top" height={28} />
          {keys.map((k) => (
            <Area isAnimationActive={false} key={k} type="monotone" dataKey={k} stackId="1" stroke={TOOL_COLOR[k]} fill={TOOL_COLOR[k]} fillOpacity={0.55} strokeWidth={1.25} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TeamBudgetChart({ data }: { data: Array<{ name: string; mtd: number; projected: number; budget: number }> }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 18 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} interval={0} label={{ value: 'Team', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis tick={AXIS} tickFormatter={(v) => usdCompact(v)} tickLine={false} axisLine={false} width={52} label={{ value: 'Month spend (USD)', angle: -90, position: 'insideLeft', offset: 8, style: { ...AXIS, textAnchor: 'middle' } }} />
          <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.12)' }} formatter={(v: number, n: string) => [usd(v), n]} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} verticalAlign="top" height={28} />
          <Bar isAnimationActive={false} dataKey="mtd" name="Month to date" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={22} />
          <Bar isAnimationActive={false} dataKey="projected" name="Projected month-end" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={22}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.projected > d.budget ? '#f43f5e' : d.projected > d.budget * 0.8 ? '#f59e0b' : '#10b981'} />
            ))}
          </Bar>
          <Line isAnimationActive={false} dataKey="budget" name="Budget" stroke="#475569" strokeWidth={0} dot={{ r: 4, fill: '#475569', stroke: '#fff', strokeWidth: 1 }} activeDot={false} legendType="diamond" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BurnChart({ data }: { data: Array<{ date: string; actual: number | null; projected: number | null; budget: number; pace: number }> }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 18 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="date" tickFormatter={fmtDate} tick={AXIS} minTickGap={28} tickLine={false} axisLine={{ stroke: GRID }} label={{ value: 'Day of month', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis tick={AXIS} tickFormatter={(v) => usdCompact(v)} tickLine={false} axisLine={false} width={52} label={{ value: 'Cumulative spend (USD)', angle: -90, position: 'insideLeft', offset: 8, style: { ...AXIS, textAnchor: 'middle' } }} />
          <Tooltip {...tooltipStyle} labelFormatter={(l) => fmtDate(String(l))} formatter={(v: number, n: string) => [usd(v), n]} />
          <Legend iconType="plainline" wrapperStyle={{ fontSize: 12 }} verticalAlign="top" height={28} />
          <Line isAnimationActive={false} dataKey="pace" name="Straight-line pace" stroke="#94a3b8" strokeDasharray="2 4" dot={false} strokeWidth={1.5} />
          <Line isAnimationActive={false} dataKey="budget" name="Budget" stroke="#f43f5e" strokeDasharray="6 4" dot={false} strokeWidth={1.5} />
          <Line isAnimationActive={false} dataKey="actual" name="Actual" stroke="#10b981" dot={false} strokeWidth={2.5} connectNulls={false} />
          <Line isAnimationActive={false} dataKey="projected" name="Projected" stroke="#f59e0b" strokeDasharray="5 3" dot={false} strokeWidth={2} connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OutcomeTrendChart({ data }: { data: Array<{ week: string; cost: number | null; spend: number; merged: number }> }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 18 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="week" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} label={{ value: 'Week starting', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis yAxisId="l" tick={AXIS} tickFormatter={(v) => usdCompact(v)} tickLine={false} axisLine={false} width={64} label={{ value: 'Cost / merged PR', angle: -90, position: 'insideLeft', offset: 8, style: { ...AXIS, textAnchor: 'middle' } }} />
          <YAxis yAxisId="r" orientation="right" tick={AXIS} tickLine={false} axisLine={false} width={34} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={(v: number, n: string) => (n === 'Merged PRs' ? [v, n] : [usd(v), n])} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} verticalAlign="top" height={28} />
          <Bar isAnimationActive={false} yAxisId="r" dataKey="merged" name="Merged PRs" fill="#cbd5e1" radius={[3, 3, 0, 0]} maxBarSize={28} />
          <Line isAnimationActive={false} yAxisId="l" dataKey="cost" name="Cost per merged PR" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastChart({ data }: { data: Array<{ name: string; p10: number; p50: number; p90: number; baseline: number }> }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 18 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} interval={0} label={{ value: 'Open epic', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis tick={AXIS} tickFormatter={(v) => usdCompact(v)} tickLine={false} axisLine={false} width={52} label={{ value: 'Remaining AI cost (USD)', angle: -90, position: 'insideLeft', offset: 8, style: { ...AXIS, textAnchor: 'middle' } }} />
          <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.12)' }} formatter={(v: number, n: string) => [usd(v), n]} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} verticalAlign="top" height={28} />
          <Bar isAnimationActive={false} dataKey="p10" name="p10 (optimistic)" fill="#a7f3d0" radius={[3, 3, 0, 0]} maxBarSize={18} />
          <Bar isAnimationActive={false} dataKey="p50" name="p50 (median)" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={18} />
          <Bar isAnimationActive={false} dataKey="p90" name="p90 (pessimistic)" fill="#f59e0b" radius={[3, 3, 0, 0]} maxBarSize={18} />
          <Bar isAnimationActive={false} dataKey="baseline" name="Median-by-type baseline" fill="#94a3b8" radius={[3, 3, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UtilizationChart({ data }: { data: Array<{ name: string; utilization: number; seats: number; tool: string }> }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 12, bottom: 18 }}>
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => pct(v)} tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} label={{ value: 'Seats active in last 30 days', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis type="category" dataKey="name" tick={AXIS} tickLine={false} axisLine={false} width={96} />
          <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.12)' }} formatter={(v: number, _n: string, p: any) => [`${pct(v)} of ${p.payload.seats} seats`, 'Utilization']} />
          <ReferenceLine x={0.8} stroke="#94a3b8" strokeDasharray="4 4" />
          <Bar isAnimationActive={false} dataKey="utilization" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((d) => (
              <Cell key={d.name} fill={TOOL_COLOR[d.tool] ?? '#64748b'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ModelMixChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 12, bottom: 18 }}>
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" tickFormatter={(v) => usdCompact(v)} tick={AXIS} tickLine={false} axisLine={{ stroke: GRID }} label={{ value: 'Usage spend (USD)', position: 'insideBottom', offset: -10, style: { ...AXIS } }} />
          <YAxis type="category" dataKey="name" tick={AXIS} tickLine={false} axisLine={false} width={96} />
          <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(148,163,184,0.12)' }} formatter={(v: number) => [usd(v), 'Spend']} />
          <Bar isAnimationActive={false} dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
