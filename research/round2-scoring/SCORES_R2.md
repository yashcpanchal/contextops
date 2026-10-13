# Round 2 scoring results (independent Opus evaluators, same rubric as round 1)

| Rank | ID | Idea | A /20 | B /20 | C /20 | D /15 | E /10 | F /15 | Total | Scout self-score |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | CAL | **ContextOps (round 1 winner, re-scored blind with fresh research)** | 14 | 9 | 10 | 11 | 6 | 8 | **58** | (56 in round 1) |
| 2 | R2-1 | ContextOps + Finance (AI-spend capitalization / audit packet add-on) | 12 | 9 | 12 | 9 | 6 | 9 | 57 | 61 |
| 3 | R2-7 | Section G evidence builder via CPA / R&D-credit firms | 11 | 10 | 10 | 8 | 6 | 9 | 54 | 55-58 |
| 4 | R2-3 | AI-agent-aware change evidence (SOC 2 / PCI / SOX) | 10 | 9 | 10 | 6 | 7 | 10 | 52 | 61 |
| 4 | R2-4 | Repo-specific, agent-proof hiring work samples | 10 | 8 | 10 | 9 | 6 | 9 | 52 | 61 |
| 6 | R2-6 | AI change-escape / incident ledger | 10 | 7 | 9 | 9 | 6 | 9 | 50 | 57-59 |
| 7 | R2-9 | Shadow AI-built app intake for IT | 10 | 7 | 8 | 9 | 5 | 10 | 49 | 50 |
| 8 | R2-8 | Departure-triggered knowledge capture | 8 | 7 | 9 | 8 | 5 | 11 | 48 | 57 |
| 9 | R2-5 | Migration Ledger | 10 | 7 | 9 | 7 | 5 | 9 | 47 | 59 |
| 10 | R2-2 | Automated tech due diligence for small deals | 10 | 8 | 6 | 7 | 6 | 9 | 46 | 62 |
| 11 | R2-10 | Flaky-test cost triage + auto-fix | 10 | 5 | 3 | 12 | 6 | 9 | 45 | 53 |

Research caveat: the session's shared WebSearch quota ran out early in this phase. Evaluators compensated with direct page fetches (about 15 each) and HN API queries, and Reddit was mostly rate-limited. Scores rest on the 15 round-2 scout reports plus this verification.

## What round 2 established
1. **ContextOps remains the winner, and the score is stable.** A blind re-score with fresh research gave 58, against 56 in round 1. 31 ideas have now been scored across ~20 domains, and none broke 60.
2. **Scouts were systematically optimistic, by 5-16 points.** Independent evaluators kept finding incumbents the scouts missed: developer portals for migrations, HackerRank Chakra, Datadog/CircleCI flaky-test fixes, Lovable scanning, and GitHub's native AI-approver rules.
3. **Four evaluators independently concluded "this is best as a ContextOps module":** R2-1 (finance/capitalization), R2-3 (AI self-approval / segregation-of-duties evidence), R2-6 (AI change-escape ledger) and R2-10 (CI waste ledger). That points to ContextOps as the hub of an "AI engineering operations" platform: spend, outcomes, risk and evidence for AI-written code.
4. **Why desk research can't push past ~60.** Every visible budget is contested, which caps B (sellable) and C (AI-durable), and no public source shows "I'd pay $X" for a standalone tool in this space. The only way to raise A and D materially is primary evidence: interviews, pilots and LOIs.

## New demand evidence for ContextOps found in round 2 (added to STRATEGY.md)
- r/EngineeringManagers, manager of ~40 developers: "We built the nightly job to track coding agent spend and it only covers a third of the bill". This is a failed DIY attempt.
- r/EngineeringManagers (277 upvotes): "our token bill hit six figures and now the CFO cares" (a 500-developer company, above our initial segment).
- SAP finance leadership: token capping, model routing and tool cuts contained a "triple-digit-million-dollar financial risk" in under four months; "finance needs a paired view: cost metrics alongside value metrics."
- Weave raised a $13.5M Series A (2026-07-28) for AI-spend ROI measurement across 500+ companies. Ramp ($750M raise) named AI token spend a new spend category.
- Deloitte DART (2026-08-03): token costs are capitalizable only when tied to an identified project with evidence ("A token-based charge is not capitalizable merely because it is measurable").
- Amazon reportedly requires senior sign-off on AI-assisted changes after outages (HN, 659 points). Faros (22K developers) reports incidents per PR up 14.5%.
- GitHub preview (2026-09-01): Copilot approvals can count toward required reviews. This opens a new segregation-of-duties evidence gap.

## Absorption risks surfaced in round 2 (must be addressed)
- Native caps shipped in mid-2026: Copilot budgets at enterprise/cost-center/user level with auto-stop; Cursor team/group/user limits; Claude Team/Enterprise spend caps and per-user reports.
- Cost platforms now cover Cursor and Claude Code (Vantage, CloudZero, Finout, Datadog), and Stacklet ships "wallet" governance.
- Ramp is moving toward the CFO's token line.
- What remains defensible: the **cross-vendor spend↔outcome↔risk join at PR/epic level**, sold to companies with 20-300 engineers, with finance-grade evidence exports.
