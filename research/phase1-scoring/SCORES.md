# Phase 1 scoring results and the decision

Each idea was scored 0-100 by an independent Opus evaluator against RUBRIC.md. Full write-ups are in ideaNN.md.

| Rank | # | Idea | A Demand /20 | B Sellable /20 | C AI-durable /20 | D Evidence /15 | E Buyer /10 | F Feasible /15 | Total |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | AI Spend-to-Outcome Ledger | 16 | 8 | 8 | 12 | 6 | 6 | **56** |
| 2 | 5 | Review-capacity orchestrator | 14 | 7 | 5 | 13 | 6 | 7 | 52 |
| 3 | 6 | AI-PR comprehension / provenance | 12 | 7 | 4 | 12 | 5 | 8 | 48 |
| 3 | 9 | Flow & dependency risk radar | 10 | 9 | 7 | 9 | 6 | 7 | 48 |
| 5 | 8 | Consent-based impact ledger | 11 | 8 | 6 | 9 | 5 | 8 | 47 |
| 6 | 2 | True Cost of Delivery (original idea, reframed) | 10 | 8 | 9 | 7 | 5 | 7 | 46 |
| 6 | 4 | Evidence-linked status autopilot | 9 | 7 | 5 | 9 | 6 | 10 | 46 |
| 8 | 3 | Manager Memory / Team Context Engine | 10 | 6 | 5 | 10 | 6 | 8 | 45 |
| 8 | 7 | Agent governance & audit (regulated) | 12 | 7 | 10 | 8 | 4 | 4 | 45 |
| 10 | 10 | Human+agent work router | 7 | 7 | 5 | 6 | 5 | 8 | 38 |

## Meta-findings (orchestrator)
- **Nothing broke 60.** The evaluators were deliberately harsh, and the 2026 market is fast-moving. Atlassian (DX acquisition, the Rovo Jira Delivery Agent from 2026-07-27), Anthropic, GitHub, Cursor, CodeRabbit and Lattice shipped features in 2026 that cover most "EM copilot" surfaces. Building a summary-style "EM copilot" is a commodity trap.
- **Demand (criterion A) is the scarcest asset, and #1 has the most of it:** Gartner, the FinOps Foundation (98% manage AI spend), Atlassian's $500-2,000 "AI wallets", Uber's budget cap, DX's 86%, and the Reddit "tokenomics meetings". Money is moving here now.
- **The evaluators of #2, #5, #9 and #10 each said "better as a feature inside #1/#2".** So #1 is the natural platform, and the others are later modules: the rubber-stamp/review-debt signal, which ticket types agents land, and per-epic cost forecasting (the founders' original idea).

## Decision: Idea #1 wins, with a sharpened wedge to validate in Phase 2
#1's weaknesses (B, C, F) all come down to "a reporting dashboard that DX/Jellyfish/Faros already bundle". The Phase 2 hypothesis to test:
1. **Act, don't report.** An agent that finds and fixes waste: idle or duplicated seats across tools, spend on abandoned or reverted PRs, runaway sessions, over-powered model choice for simple tasks, and budget pacing per team. It is sold on savings ("pays for itself"), like the classic cloud-FinOps wedge (Vantage, ProsperOps) rather than an SEI dashboard.
2. **The underserved segment.** Companies with 20-300 engineers that run 2+ AI coding tools and have no SEI platform (DX/Jellyfish are sales-led, $30-60K+/yr). Self-serve, set up in 15 minutes.
3. **The EM as a daily user.** EMs now own token budgets (Pragmatic Engineer; Atlassian wallets). Give the EM a team-level budget co-pilot: no per-person leaderboards, which is a trust-first stance.
4. **The founders' estimation idea returns as a derived feature:** "this epic will cost $X-Y in AI spend" once history exists.
