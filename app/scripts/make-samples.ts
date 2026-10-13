// Generates samples/spend-sample.csv and samples/otel-sample.json from the seeded roster emails.
import fs from 'node:fs';
import { seedState, mulberry32 } from '../lib/seed';

const s = seedState('2026-10-13');
const rnd = mulberry32(7);
const emails = (teamId: string) => s.engineers.filter((e) => e.teamId === teamId).map((e) => e.email);

const rows: string[] = ['date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo'];
const picks = [
  ...emails('payments').slice(0, 4).map((e) => [e, 'pay-api']),
  ...emails('checkout').slice(0, 3).map((e) => [e, 'checkout-web']),
  ...emails('search').slice(0, 3).map((e) => [e, 'search-api']),
];
const models = ['claude-sonnet-4-5', 'claude-opus-4-1', 'claude-haiku-4-5'];
for (let d = 7; d <= 12; d++) {
  for (const [email, repo] of picks) {
    if (rnd() < 0.45) continue;
    const m = models[Math.floor(rnd() * 3)];
    const inTok = Math.round(40000 + rnd() * 600000);
    const outTok = Math.round(5000 + rnd() * 90000);
    const price = m.includes('opus') ? [15, 75] : m.includes('haiku') ? [0.8, 4] : [3, 15];
    const cost = (inTok * price[0] + outTok * price[1]) / 1e6;
    rows.push(`2026-10-${String(d).padStart(2, '0')},claude_code,${email},${m},${inTok},${outTok},${cost.toFixed(2)},${repo}`);
  }
}
for (const [email, repo] of picks.slice(0, 5)) {
  rows.push(`2026-10-10,cursor,${email},cursor-auto,120000,18000,${(2 + rnd() * 3).toFixed(2)},${repo}`);
}
fs.mkdirSync('samples', { recursive: true });
fs.writeFileSync('samples/spend-sample.csv', rows.join('\n') + '\n');

type Attr = { key: string; value: { stringValue: string } };
const a = (key: string, v: string): Attr => ({ key, value: { stringValue: v } });
const t0 = Date.parse('2026-10-12T14:00:00Z');
const sessions = [
  { email: emails('payments')[5], team: 'payments', repo: 'pay-api', model: 'claude-sonnet-4-5', sid: 'sample-sess-0001', cost: 3.42, input: 182000, output: 24100, cacheRead: 1250000, cacheCreation: 52000, lines: 86 },
  { email: emails('payments')[6], team: 'payments', repo: 'ledger-core', model: 'claude-opus-4-1', sid: 'sample-sess-0002', cost: 9.87, input: 96000, output: 31000, cacheRead: 2100000, cacheCreation: 70000, lines: 24 },
  { email: emails('platform')[3], team: 'platform', repo: 'platform-core', model: 'claude-sonnet-4-5', sid: 'sample-sess-0003', cost: 1.76, input: 91000, output: 12800, cacheRead: 640000, cacheCreation: 21000, lines: 41 },
];
const mk = (name: string, unit: string, points: unknown[]) => ({ name, unit, sum: { aggregationTemporality: 1, isMonotonic: true, dataPoints: points } });
const resourceMetrics = sessions.map((x, i) => {
  const base = [a('user.email', x.email), a('session.id', x.sid), a('model', x.model)];
  const time = String((t0 + i * 600000) * 1e6);
  const start = String((t0 + i * 600000 - 600000) * 1e6);
  const pt = (attrs: Attr[], v: number, int = false) => (int ? { attributes: [...base, ...attrs], startTimeUnixNano: start, timeUnixNano: time, asInt: String(v) } : { attributes: [...base, ...attrs], startTimeUnixNano: start, timeUnixNano: time, asDouble: v });
  return {
    resource: { attributes: [a('service.name', 'claude-code'), a('team', x.team), a('repo', x.repo)] },
    scopeMetrics: [
      {
        scope: { name: 'com.anthropic.claude_code', version: '2.1.0' },
        metrics: [
          mk('claude_code.cost.usage', 'USD', [pt([], x.cost)]),
          mk('claude_code.token.usage', 'tokens', [pt([a('type', 'input')], x.input, true), pt([a('type', 'output')], x.output, true), pt([a('type', 'cacheRead')], x.cacheRead, true), pt([a('type', 'cacheCreation')], x.cacheCreation, true)]),
          mk('claude_code.lines_of_code.count', 'count', [pt([a('type', 'added')], x.lines, true)]),
        ],
      },
    ],
  };
});
fs.writeFileSync('samples/otel-sample.json', JSON.stringify({ resourceMetrics }, null, 2) + '\n');
console.log('rows', rows.length - 1);
