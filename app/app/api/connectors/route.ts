import { getState } from '@/lib/store';
import { eventCountsBySource } from '@/lib/engine/ledger';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

const card = (id: string, name: string, endpoints: string[], note: string) => ({
  id,
  name,
  status: 'demo_data' as const,
  endpoints,
  note,
});

export async function GET(req: Request) {
  const s = getState();
  const origin = new URL(req.url).origin;
  const counts = eventCountsBySource(s);
  return ok({
    counts,
    totalEvents: counts.seed + counts.csv + counts.otel,
    ingest: s.ingest,
    otel: {
      endpoint: origin + '/api/otel',
      env: {
        CLAUDE_CODE_ENABLE_TELEMETRY: '1',
        OTEL_METRICS_EXPORTER: 'otlp',
        OTEL_EXPORTER_OTLP_PROTOCOL: 'http/json',
        OTEL_EXPORTER_OTLP_ENDPOINT: origin + '/api/otel',
        OTEL_RESOURCE_ATTRIBUTES: 'team=payments,repo=pay-api',
      },
    },
    csvColumns: ['date', 'tool', 'user_email', 'model', 'input_tokens', 'output_tokens', 'cost_usd', 'repo'],
    connectors: [
      card('anthropic', 'Anthropic Admin API', ['GET /v1/organizations/usage_report/claude_code', 'GET /v1/organizations/usage_report/messages', 'GET /v1/organizations/cost_report'], 'Needs an Admin API key (sk-ant-admin01-...). Put ANTHROPIC_ADMIN_KEY in .env.local.'),
      card('cursor', 'Cursor Admin API', ['POST /teams/daily-usage-data', 'POST /teams/spend', 'POST /teams/filtered-usage-events', 'POST /teams/user-spend-limit'], 'Needs a Cursor Admin API key. Put CURSOR_API_KEY in .env.local.'),
      card('copilot', 'GitHub Copilot', ['GET /orgs/{org}/copilot/billing/seats', 'GET /orgs/{org}/copilot/metrics/reports/users-1-day', 'DELETE /orgs/{org}/copilot/billing/selected_users'], 'Needs a token with manage_billing:copilot. Put GITHUB_TOKEN in .env.local.'),
      card('github', 'GitHub PRs', ['GET /repos/{o}/{r}/pulls?state=closed', 'GET /repos/{o}/{r}/pulls/{n}'], 'GitHub App with Pull requests: read.'),
      card('jira_linear', 'Jira / Linear', ['GET /rest/api/3/issue/{key}', 'POST https://api.linear.app/graphql'], 'OAuth app or API key.'),
    ],
  });
}
