import fs from 'node:fs';
import path from 'node:path';
import { KeyRound } from 'lucide-react';
import { getState } from '@/lib/store';
import { eventCountsBySource } from '@/lib/engine/ledger';
import { dateTime, num } from '@/lib/format';
import { Badge, Card, Kpi, PageHeader } from '@/components/ui';
import { CodeBlock, CopyButton, CsvUpload } from '@/components/ConnectorsClient';

export const dynamic = 'force-dynamic';

const OTEL_ENV = `export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/json
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:3000/api/otel
export OTEL_RESOURCE_ATTRIBUTES=team=payments,repo=pay-api`;

const FALLBACK_SAMPLE = `date,tool,user_email,model,input_tokens,output_tokens,cost_usd,repo
2026-10-12,claude_code,engineer@your-company.com,sonnet,182000,24000,2.41,pay-api
2026-10-12,cursor,engineer@your-company.com,cursor-auto,95000,12000,0.88,pay-web
`;

interface Connector {
  name: string;
  vendor: string;
  purpose: string;
  auth: string;
  env: string;
  endpoints: Array<[string, string]>;
  write?: string;
}

const CONNECTORS: Connector[] = [
  {
    name: 'Anthropic Admin API',
    vendor: 'api.anthropic.com',
    purpose: 'Claude API and Claude Code usage and cost, per user per day.',
    auth: 'Admin API key (sk-ant-admin01-...) in x-api-key, anthropic-version 2023-06-01',
    env: 'ANTHROPIC_ADMIN_KEY',
    endpoints: [
      ['GET', '/v1/organizations/usage_report/messages'],
      ['GET', '/v1/organizations/cost_report'],
      ['GET', '/v1/organizations/usage_report/claude_code'],
    ],
  },
  {
    name: 'Cursor Admin API',
    vendor: 'api.cursor.com',
    purpose: 'Members, spend this cycle and per-event usage.',
    auth: 'HTTP Basic, API key as username',
    env: 'CURSOR_API_KEY',
    endpoints: [
      ['GET', '/teams/members'],
      ['POST', '/teams/daily-usage-data'],
      ['POST', '/teams/spend'],
      ['POST', '/teams/filtered-usage-events'],
    ],
    write: 'POST /teams/user-spend-limit (Enterprise): set or clear a per-user monthly limit',
  },
  {
    name: 'GitHub Copilot',
    vendor: 'api.github.com',
    purpose: 'Seats, premium-request usage and org budgets.',
    auth: 'Bearer token, org admin or billing manager',
    env: 'GITHUB_TOKEN',
    endpoints: [
      ['GET', '/orgs/{org}/copilot/billing/seats'],
      ['GET', '/orgs/{org}/copilot/billing'],
      ['GET', '/orgs/{org}/copilot/metrics/reports/users-28-day/latest'],
      ['GET', '/organizations/{org}/settings/billing/premium_request/usage'],
    ],
    write: 'DELETE /orgs/{org}/copilot/billing/selected_users: remove seats; /settings/billing/budgets: hard-stop budgets',
  },
  {
    name: 'GitHub PRs',
    vendor: 'api.github.com',
    purpose: 'PR outcomes: merged, closed unmerged, review rounds.',
    auth: 'GitHub App with Pull requests: read',
    env: 'GITHUB_APP_PRIVATE_KEY',
    endpoints: [
      ['GET', '/repos/{owner}/{repo}/pulls?state=closed'],
      ['GET', '/repos/{owner}/{repo}/pulls/{number}'],
      ['GET', '/repos/{owner}/{repo}/pulls/{number}/reviews'],
    ],
  },
  {
    name: 'Jira and Linear',
    vendor: 'Atlassian, api.linear.app',
    purpose: 'Tickets and epics for cost-per-feature and forecasts.',
    auth: 'OAuth 2.0 (Jira 3LO) or Linear API key',
    env: 'LINEAR_API_KEY',
    endpoints: [
      ['GET', '/rest/api/3/issue/{key}  (Jira)'],
      ['POST', 'https://api.linear.app/graphql  (Linear)'],
    ],
  },
];

export default function ConnectorsPage() {
  const state = getState();
  const counts = eventCountsBySource(state);
  const ing = state.ingest;
  let sample = FALLBACK_SAMPLE;
  try {
    sample = fs.readFileSync(path.join(process.cwd(), 'samples', 'spend-sample.csv'), 'utf8');
  } catch {}

  return (
    <div>
      <PageHeader title="Connectors" subtitle="Bring real data in today with a CSV or Claude Code OpenTelemetry. Vendor API connectors are staged and run on demo data until a key is saved." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Seeded events" value={num(counts.seed)} sub="Northwind Labs demo data" />
        <Kpi label="CSV events" value={num(counts.csv)} tone={counts.csv ? 'emerald' : 'neutral'} sub={ing.lastCsvAt ? `last import ${dateTime(ing.lastCsvAt)}` : 'no imports yet'} />
        <Kpi label="OTel sessions" value={num(counts.otel)} tone={counts.otel ? 'emerald' : 'neutral'} sub={ing.lastOtelAt ? `last received ${dateTime(ing.lastOtelAt)}` : 'nothing received yet'} />
        <Kpi label="OTel requests" value={num(ing.otelRequests)} sub={`${num(ing.otelDataPoints)} data points`} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card title="Import a spend CSV" subtitle="Similar to the Claude Code spend report or a Cursor usage export">
          <CsvUpload sample={sample} />
        </Card>
        <Card
          title="Claude Code OpenTelemetry"
          subtitle="Point Claude Code at this server to stream cost and token metrics in real time"
          action={<Badge tone={counts.otel ? 'emerald' : 'neutral'}>{counts.otel ? 'Receiving' : 'Waiting for data'}</Badge>}
        >
          <CodeBlock code={OTEL_ENV} label="shell" />
          <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
            <li>Endpoint receives OTLP/HTTP JSON at <code>POST /api/otel/v1/metrics</code>.</li>
            <li>Reads <code>claude_code.cost.usage</code> and <code>claude_code.token.usage</code> (type: input, output, cacheRead, cacheCreation).</li>
            <li>Attributes used: <code>user.email</code>, <code>session.id</code>, <code>model</code>; resource <code>team</code> and <code>repo</code>.</li>
            <li>Set these in managed settings so repos cannot override them. Metrics export every 60 seconds by default.</li>
          </ul>
          <div className="mt-3"><CopyButton text={OTEL_ENV} label="Copy env vars" /></div>
        </Card>
      </div>

      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Vendor connectors</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CONNECTORS.map((c) => (
          <Card key={c.name}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{c.name}</h3>
                <p className="font-mono text-[11px] text-slate-400">{c.vendor}</p>
              </div>
              <Badge tone="amber">Demo data</Badge>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{c.purpose}</p>
            <div className="label-xs mb-1 mt-4">Endpoints it will call</div>
            <ul className="space-y-1">
              {c.endpoints.map(([m, p]) => (
                <li key={p} className="flex gap-2 font-mono text-[11px]">
                  <span className={`w-9 shrink-0 font-semibold ${m === 'GET' ? 'text-emerald-600 dark:text-emerald-400' : 'text-sky-600 dark:text-sky-400'}`}>{m}</span>
                  <span className="break-all text-slate-700 dark:text-slate-300">{p}</span>
                </li>
              ))}
            </ul>
            {c.write && <p className="mt-2 text-[11px] text-slate-500"><span className="font-semibold">Write action:</span> {c.write}</p>}
            <p className="mt-3 text-[11px] text-slate-500"><span className="font-semibold">Auth:</span> {c.auth}</p>
            <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"><KeyRound className="h-3.5 w-3.5" /> Save a key</div>
              <p className="mt-1 text-[11px] text-slate-500">Add this line to <code>.env.local</code> and restart the server. Keys are never stored in the app database.</p>
              <code className="mt-1.5 block rounded bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-100">{c.env}=...</code>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
