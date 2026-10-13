import { getState } from '@/lib/store';
import { forecastOpenEpics, MONTE_CARLO_DRAWS, MIN_TEAM_SAMPLE, LOW_CONFIDENCE_BELOW } from '@/lib/engine/forecast';
import { ok } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok({
    beta: true,
    epics: forecastOpenEpics(getState()),
    methodology: {
      draws: MONTE_CARLO_DRAWS,
      minTeamSample: MIN_TEAM_SAMPLE,
      lowConfidenceBelow: LOW_CONFIDENCE_BELOW,
      text: 'For each unfinished ticket in an open epic, draw the attributed AI cost of a past closed ticket of the same type (team history if n>=8, else org). Sum over 1,000 seeded Monte Carlo draws to get p10/p50/p90. The baseline is the sum of per-type medians. Tickets with no AI cost are excluded from history. Beta: it conditions on ticket type only, not scope.',
    },
  });
}
