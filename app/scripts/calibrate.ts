import { seedState } from '../lib/seed';
import { trailing30, monthProjection, spendByTool } from '../lib/engine/ledger';
const t0 = Date.now();
const s = seedState('2026-10-13');
console.log('seed ms', Date.now() - t0, 'sessions', s.sessions.length, 'prs', s.prs.length, 'tickets', s.tickets.length, 'seats', s.seats.length);
console.log('t30', trailing30(s));
console.log('byTool', spendByTool(s, 30));
console.log('proj', monthProjection(s));
const days = new Map<string, number>();
for (const x of s.sessions) if (x.tool==='claude_code' && x.kind!=='scheduled' && x.startedAt>='2026-09-14') { const k = x.engineerId+x.startedAt.slice(0,10); days.set(k,(days.get(k)??0)+x.costUsd); }
const v=[...days.values()].sort((a,b)=>a-b); console.log('claude eng-day median', v[Math.floor(v.length/2)], 'mean', v.reduce((a,b)=>a+b,0)/v.length);
const ai = s.prs.filter(p=>p.aiAssisted && p.state!=='open'); console.log('unmerged rate', ai.filter(p=>p.state==='closed_unmerged').length/ai.length);
console.log(s.teams.map(t=>t.id+':'+t.monthlyBudgetUsd).join(' '));
