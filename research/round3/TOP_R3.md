# Round 3 shortlist (Opus synthesis of 6 scout reports on YC + a16z batches)

Data: 1,210 YC companies (Spring 2025 through Fall 2026), all 321 a16z Speedrun companies (SR001-SR007), the YC Fall 2026 RFS, and a16z main-fund theses. Reports: yc_devtools.md, yc_b2b_ops.md, yc_newest_rfs.md, a16z_speedrun.md, a16z_theses.md and contextops_competitors.md.

## Cross-cutting findings
1. **AI-spend tooling is now an investor theme, but nobody has shown traction.** YC went from 0 such companies in 2025 to 3 in W26 and 5 in S26, about 8 in total: Mentlio, Carrot Labs/SuperPenguin, Quotient Labs, Conifer, Codag, Compresr, Orchestra, The Token Company. None shows named customers or ARR. Self-serve prices range from $0 to $499/mo. Mentlio's YC page reportedly says Factory acquired it on 2026-10-09 [unverified].
2. **Buyers pay for evidence, review and outcomes, not cost dashboards.**
   - Taxnova (Speedrun SR006) turns Jira/GitHub data into R&D-tax and CapEx evidence, with customers incident.io, causaLens and Augment.
   - cubic (YC S25) sells AI code review with 8+ named customers.
   - Mesmer sells engineering outcomes as a managed service.
   - ZeroDrift (AI-message audit evidence, $10M seed [unverified]) and Bead AI (SOX audit agents) show compliance evidence is being funded.
3. **a16z's main-fund theses** (Aug 2026): finance and IT "can't trace AI spend to a department, project or invoice"; token costs are hard to forecast; failed agent runs still burn tokens; 81% of CIOs use 3+ model families; average enterprise LLM spend is about $7M, heading to about $11.6M. a16z has funded no AI-coding FinOps or engineering-intelligence company.
4. **YC RFS gaps.** Fall 2026 #13 "Self-Maintaining APIs" (an agent opens PRs when an API vendor ships breaking changes, i.e. Dependabot for APIs) has 0 companies in S26/F26. #4 "Multiplayer AI" (teams share live agent sessions) has about 4 entrants. #3 "Cloud for Small Software" overlaps shadow apps, which round 2 scored at 49.
5. **Crowded, so avoid:** sandboxes and agent infrastructure, coding-agent harnesses, AI SRE, AI pentesting, agent evals and observability, "context/memory layers" (10+), generic back-office agents (~66), token compression.

## Candidates for Opus scoring (same rubric; benchmark = ContextOps 58)
| ID | Idea | Evidence files |
|---|---|---|
| R3-1 | **ContextOps repositioned as "AI engineering spend evidence"**. Lead with attributing AI coding spend to project, epic and department for Finance: chargeback, capitalization packets, R&D-credit evidence, with audit-grade lineage across Claude Code, Cursor, Copilot and Codex. Engineering outcome views (cost per merged PR, waste) are secondary. Approval-gated savings actions stay as an upsell. Buyer: Controller/VP Finance plus VP Eng at companies with 50-1,000 engineers. | contextops_competitors.md, a16z_theses.md, yc_b2b_ops.md, round2/engfinance.md, round2/ai_capitalization_verify.md, round2-scoring/R2-1.md, round2-scoring/CAL.md |
| R3-2 | **Self-maintaining API integrations ("Dependabot for APIs", YC RFS #13)**. Watches the third-party APIs and SDKs a codebase uses (Stripe, Twilio, OpenAI, Salesforce, Shopify and so on) for deprecations and breaking changes, then opens tested PRs. Buyer: VP Eng / platform lead. | yc_newest_rfs.md, round2/migrations.md, round2-scoring/R2-5.md |
| R3-3 | **Enterprise AI spend chargeback across ALL AI usage, not only coding**: ChatGPT/Claude Enterprise seats, API keys, Bedrock/Vertex, agents. Allocates spend to departments and projects for Finance/IT. ContextOps would become one vertical of it. | a16z_theses.md, yc_b2b_ops.md, round2-scoring/CAL.md |
| R3-4 | **Multiplayer agent sessions for engineering teams, with manager visibility (YC RFS #4)**. Teams share live coding-agent sessions and plans; EMs and tech leads see what each person and their agents are working on and can step in. This ties to the founder's origin story: his manager didn't know what he was working on. | yc_newest_rfs.md, yc_devtools.md, round1 (phase1) visibility research |
