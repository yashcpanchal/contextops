# Round 2 shortlist (Opus synthesis of 15 round-2 reports)

Sources: research/round2/*.md, which cover incidents, migrations, hiring and hiring_deep, qa, agentops, specs, regulated, knowledge, outsourcing_dd, moneyflow, engfinance, ai_capitalization_verify, shadow_apps and reddit_demand.

## Cross-cutting findings
1. **Funded categories are crowded.** The places money visibly moves have already been funded:
   - AI SRE: Resolve $1B
   - AI code review: CodeRabbit $1.5B
   - Testing: Antithesis $105M, Qodo $70M
   - Agent sandboxes: Modal $4.65B
   - AI hiring assessments: HackerRank Chakra, CodeSignal and Karat all shipped in 2025-26
2. **Loud pain without a budget owner scores low.** Viral community pain (shadow vibe-coded apps, 1,000+ upvote r/sysadmin threads; knowledge loss) consistently scored about 50, because no budget line exists and platforms are absorbing the feature (for example Lovable Workspace Insights, 2026-07-24).
3. **The best-scoring ideas sit where a regulation, an audit or a transaction forces spending.** Examples: tech due diligence fees, SOC 2/PCI change-management evidence, capitalization and R&D-credit documentation (Deloitte DART Aug 2026 on token capitalization; Form 6765 Section G mandatory for tax year 2026).
4. **Desk research has a ceiling.** No domain produced explicit "I'd pay $X" statements. Every scout recommends buyer interviews.

## Shortlist to score (independent Opus evaluators; the round 1 rubric)
| ID | Idea | Source file(s) | Scout self-score |
|---|---|---|---|
| R2-1 | **ContextOps + Finance**: AI coding spend governance for Eng, plus an audit-ready attribution of AI spend to capitalizable projects and R&D-credit (Section G) evidence for the Controller | engfinance.md, ai_capitalization_verify.md, docs/STRATEGY.md | 61 |
| R2-2 | **Automated tech due-diligence tier** ($1.5-5K) for small M&A/PE/search-fund deals: code, security, team and process audit from repo + Jira access | outsourcing_dd.md | 62 |
| R2-3 | **AI-agent-aware change evidence** for SOC 2 / PCI DSS 4.0 / SOX ITGC: an auditor-ready chain requirement→ticket→agent session→PR→independent human review→test→deploy; flags self-approval of agent changes; entry point is a free scanner | regulated.md, specs.md | 61 |
| R2-4 | **Repo-specific, agent-proof hiring work samples**: generates tasks from the customer's own codebase with planted bugs; the candidate directs an AI agent; graded on judgment | hiring_deep.md, hiring.md | 61 |
| R2-5 | **Migration Ledger**: tracks framework/EOL/CVE migrations across hundreds of repos, gives proof of completion, and forecasts finish dates; sold to platform/VP Eng | migrations.md | 59 |
| R2-6 | **Change-risk and incident follow-through ledger**: links incidents to the PRs (AI-authored or not) that caused them, gates risky AI changes using that history, and tracks postmortem action items to completion | incidents.md, qa.md, reddit_demand.md | 57-59 |
| R2-7 | **Capitalization and Section G evidence builder sold through CPA / R&D-credit firms** (channel play; not AI-specific): Jira/GitHub to business-component evidence and Form 6765 Section G exports | engfinance.md | 55-58 |
| R2-8 | **Departure-triggered knowledge capture**: when an engineer gives notice, or a contractor or vendor rolls off, it runs targeted capture interviews driven by an ownership/understanding-risk map from git | knowledge.md | 57 |
| R2-9 | **Deploy-request intake for AI-built shadow apps**: IT/platform intake that scans a vibe-coded app (secrets, auth, data exposure), produces a risk report and routes approval | shadow_apps.md, reddit_demand.md | 50 |
| R2-10 | **Flaky-test cost triage with auto-fix PRs**: quantifies flaky-test cost in CI minutes and engineer hours, then auto-quarantines and auto-fixes | qa.md, moneyflow.md | 53 |
| CAL | **Calibration control**: ContextOps as in docs/STRATEGY.md (round 1 winner, scored again blind) | docs/STRATEGY.md | (blind) |
