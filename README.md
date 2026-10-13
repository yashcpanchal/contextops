# ContextOps

**FinOps for AI coding.** ContextOps unifies Claude Code, Cursor, GitHub Copilot and Codex spend, ties every dollar to what shipped, and fixes waste through approval-gated actions. Every engineering manager gets a team-level budget copilot, and there are no per-person leaderboards.

## Start here
| What | Where |
|---|---|
| Strategy and go-to-market document | [`docs/STRATEGY.md`](docs/STRATEGY.md) |
| 2-slide pitch deck | [`pitch-deck/ContextOps-pitch.pdf`](pitch-deck/ContextOps-pitch.pdf) · [`.pptx`](pitch-deck/ContextOps-pitch.pptx) · [`.html`](pitch-deck/ContextOps-pitch.html) (arrow keys to navigate) |
| MVP app (localhost) | [`app/`](app/), see "Run the MVP" below |
| MVP build spec | [`docs/MVP_SPEC.md`](docs/MVP_SPEC.md) |
| How the idea was chosen | [`research/phase1/TOP10.md`](research/phase1/TOP10.md) → [`research/phase1-scoring/SCORES.md`](research/phase1-scoring/SCORES.md) |
| All research | [`research/`](research/) (Phase 1 evidence, the 10 Opus evaluations, Phase 2 technical/GTM/competitive/feature research) |

## Run the MVP
```bash
cd app
npm install
npm run dev        # http://localhost:3000
npm test           # engine unit tests
```
The app runs in demo mode with a seeded org ("Northwind Labs", 120 engineers, 8 teams). Two ingestion paths are real:
- **CSV import** on `/connectors`. A sample file is in `app/samples/spend-sample.csv`.
- **Claude Code telemetry.** Point a real Claude Code install at the app:
  ```bash
  export CLAUDE_CODE_ENABLE_TELEMETRY=1
  export OTEL_METRICS_EXPORTER=otlp
  export OTEL_EXPORTER_OTLP_PROTOCOL=http/json
  export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:3000/api/otel
  export OTEL_RESOURCE_ATTRIBUTES=team=payments,repo=pay-api
  ```

Optional: set `ANTHROPIC_API_KEY` in `app/.env.local` to have the EM weekly digest narrative written by Claude. Without a key, a template is used.

## How this was produced
This repo was produced in one overnight multi-agent run:
1. Sonnet research agents mined Reddit (~2,200 posts and comments via public JSON and archive APIs), Hacker News, newsletters, surveys and competitor docs.
2. An Opus orchestrator synthesized 10 candidate ideas, and 10 independent Opus evaluators each scored one on a 100-point rubric.
3. The winner (AI Spend-to-Outcome Ledger, 56/100) was sharpened into "act, don't report" for the mid-market.
4. Phase 2 research covered the technical build, GTM, the competitive gap, and features and customer voice. Opus wrote the strategy.
5. Sonnet agents built the MVP and the PPTX. Opus wrote the spec, the deck and this integration.

**Known gaps:** X/Twitter could not be mined. Several statistics are vendor-sourced, and these are marked in the docs. There have been **zero customer interviews so far**, and that is the next step (see STRATEGY §12).
