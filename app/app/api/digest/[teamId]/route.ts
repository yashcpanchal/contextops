import { getState } from '@/lib/store';
import { buildDigest, digestToMarkdown, templateNarrative } from '@/lib/engine/digest';
import { ok, fail } from '@/lib/api';

export const dynamic = 'force-dynamic';

const MODEL = 'claude-sonnet-5-5';

async function llmNarrative(data: unknown): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        messages: [
          {
            role: 'user',
            content:
              'Write a 3-4 sentence plain-English summary for an engineering manager of this weekly AI coding spend digest. Be factual, name no individuals, no hype. Data: ' +
              JSON.stringify(data),
          },
        ],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const j = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    return j.content?.find((c) => c.type === 'text')?.text?.trim() ?? null;
  } catch {
    return null;
  }
}

export async function GET(_req: Request, { params }: { params: { teamId: string } }) {
  try {
    const data = buildDigest(getState(), params.teamId);
    const llm = await llmNarrative(data);
    const narrative = llm ?? templateNarrative(data);
    return ok({
      data,
      narrative,
      narrativeSource: llm ? 'llm' : 'template',
      model: llm ? MODEL : null,
      markdown: digestToMarkdown(data, narrative),
    });
  } catch (e) {
    return fail(e, 404);
  }
}
