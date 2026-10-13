# New problems created by AI coding agents for engineering orgs (2025-2026)

Researched 2026-10-13. Method: web search only (no direct primary-source fetches). Most figures below come from secondary coverage and are flagged where unverified. Vendor-authored stats are marked (vendor). Nothing is invented; where I found no evidence I say so.

## 1. Pains, evidence, intensity

Intensity: 1-5 (5 = budget-owner pain today, quantified, repeatedly reported).

### P1. Review bottleneck: code generation outran review capacity. Intensity 5
- Faros AI telemetry (vendor), >10,000 devs / 1,255 teams, July 2025: high-AI-adoption teams +21% tasks, +98% merged PRs, but PR review time +91%, PR size +154%, bugs/dev +9%; no correlation with company-level outcomes. https://www.faros.ai/blog/ai-software-engineering (summary: https://blog.robbowley.net/2025/08/21/new-research-shows-ai-assisted-coding-isnt-moving-delivery/). Correlational; Faros sells analytics.
- DORA 2025 (about 5,000 respondents; 90% adoption): AI now correlates with higher throughput but also higher instability (change failures, rework). "AI is an amplifier." https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025
- Open source as leading indicator: GitHub reportedly weighing a PR "kill switch" (Feb 2026); Godot's Remi Verschelde called AI PRs "draining and demoralizing"; tldraw closed external PRs. https://www.opensourceforu.com/2026/02/github-weighs-pull-request-kill-switch-as-ai-slop-floods-open-source/ ; https://medium.com/@signadot/open-source-maintainers-are-drowning-in-ai-generated-pull-requests-enterprise-teams-are-next-a598b61b5fbc . The "1 in 10 AI PRs is legitimate" quote is one anecdote. Jazzband shutdown claim is unverified.
- Stack Overflow 2025 survey (49k responses): 46% distrust AI accuracy vs 33% trust; 66% cite "almost right but not quite"; 45% say debugging AI code takes longer. https://venturebeat.com/ai/stack-overflow-data-reveals-the-hidden-productivity-tax-of-almost-right-ai-code (secondary sources disagree slightly on trust %).
- A Substack cites a Q1 2026 survey (2,847 devs, Digital Applied) that review overtook writing as the biggest AI-era time sink; unverified. https://nicktalwar.substack.com/p/when-engineers-manage-agents-and
- Who feels it: EM and senior ICs daily. Who pays: VP Eng / Dir Eng (cycle time, DORA). Crowded: CodeRabbit, Graphite, Greptile, Copilot review. Model vendors will give much of this away.

### P2. AI tool spend governance and ROI proof. Intensity 5
- Gartner press release 2026-06-24: AI coding costs predicted to surpass average developer salary by 2028; overspend blamed on ungoverned agent autonomy, bloated context, no feedback loops; vendors lack mature cost optimization. https://gartner.com/en/newsroom/press-releases/2026-06-24-gartner-predicts-ai-coding-costs-will-surpass-average-developer-salary-by-2028-as-token-consumption-surges
- Peer Insights figures reported: 23% of tech leaders spend $200-500/dev/month on tokens; 6% spend >$2,000/dev/month. https://www.technologydecisions.com.au/content/it-management/article/ai-coding-costs-predicted-to-surpass-average-developer-s-salary-by-2028-1432763014
- Uber reportedly burned its 2026 AI budget in about four months, then capped agentic tools at $1,500/employee/month (TechCrunch via secondary coverage; https://letsdatascience.com/news/ai-compute-costs-overtake-payroll-for-some-companies-5720f22f). A Microsoft/Claude Code license claim is unverified.
- Anthropic enterprise average reported via secondary blogs: about $13/dev/active day, $150-250/dev/month; multi-agent sessions about 7x tokens. https://getdx.com/blog/ai-coding-assistant-pricing/ (verify before citing)
- Jellyfish H1 2026 report is titled "Exploding spend, diverging returns" (vendor): https://jellyfish.co/blog/author/brian-buijellyfish-co/
- Who feels it: VP Eng/CTO (budget), CFO (ROI). EM feels it as caps and rationing. Who pays: CTO/VP Eng budget, CFO sponsors.

### P3. Agents as "team members": ownership, assignment, audit. Intensity 3
- Evidence is mostly think-pieces: sprint planning shifts from sizing to "routing" tasks to agents (https://hackernoon.com/ai-coding-agents-are-breaking-the-two-week-sprint ; https://codex.danielvaughan.com/2026/04/12/adapting-agile-ceremonies-ai-coding-agents/). No survey found on accountability for agent PRs.
- Who feels it: EM, staff engineers. Who pays: unclear; likely platform/DevEx. Real but early; could become a Jira/Linear/GitHub feature.

### P4. Knowledge loss, junior learning, managers losing codebase understanding. Intensity 3
- Anthropic RCT (52 mostly junior engineers, new async library): AI group quiz scores about 17% lower; speed gain not statistically significant; delegators scored under 40%, conceptual-query users 65%+. Single one-hour session, not long-term. https://www.anthropic.com/research/AI-assistance-coding-skills ; https://infoq.com/news/2026/02/ai-coding-skill-formation/
- No hard data found on junior hiring decline (gap). Onboarding-with-agents pain is plausible but I have no quantified evidence.
- Who feels it: EM, tech leads. Who pays: nobody clearly (training budget at best). Weak buyer.

### P5. Security/compliance of AI-written code. Intensity 4 in regulated orgs, 3 overall
- Veracode 2025 (vendor): 45% of test cases introduced OWASP Top-10 vulns across 100+ models; March 2026 update says pass rate flat at about 55%. https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/ ; CSA note https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/04/CSA_research_note_ai-generated-code-vulnerability-surge_20260404-csa-styled.pdf
- Apiiro (vendor, Fortune 50 repos, Dec 2024-Jun 2025): 10x monthly security findings; privilege-escalation paths +322%, design flaws +153%, syntax errors -76%. https://apiiro.com/blog/faster-code-greater-risks-the-security-trade-off-of-ai-driven-development
- Financial regulators expect reconstructable agent decisions and audit trails (secondary blog summaries of FINRA; a RegTech 2026 survey says only 43% rate their AI governance adequate). https://joinble.io/en/blog/finra-ai-agents-bank-compliance-2026 . No survey found specific to coding agents in banks (gap). Visa/bank specifics not verified.
- Who feels it: CISO, AppSec, risk/compliance; EMs get the tickets. Who pays: CISO. Crowded by AppSec vendors (Snyk, Veracode, Apiiro, Semgrep) who will add AI provenance.

### P6. Estimation breaking down. Intensity 3
- Practitioner reports (anecdotal): same ticket no longer has stable size; velocity inflates without more delivery; one Scrum.org team did 150+ points with 3 people. https://www.scrum.org/node/94752 ; https://kollabe.com/posts/ai-agents-changing-story-points . No rigorous study.
- METR RCT (16 experienced OSS devs, 246 tasks, early 2025, Cursor + Claude 3.x): 19% SLOWER with AI, while devs predicted 24% faster and afterward believed 20% faster. Lesson: self-reported speed is unreliable and variance by task is large. Dated models, small n. https://the-decoder.com/ai-coding-can-make-developers-slower-even-if-they-feel-faster/ (secondary; metr.org original not opened)
- Who feels it: EM, PM. Who pays: small EM/Dir budgets; nobody is desperate.

### P7. Performance evaluation when AI writes the code. Intensity 3
- Vendor blogs and a conference round table (https://sfelc.com/annual2025/roundTables/measuring-ai-engineering-performance-review-edition). The "41-42% of code is AI-generated" claim is vendor-sourced, unverified. Concerns: AI detection penalizing humans; PR/LOC metrics meaningless (Faros: PRs +98% with no org gain).
- Who feels it: EM (writes reviews), HR. Who pays: VP Eng/HR. Politically sensitive: individual-level tooling invites employee backlash.

## 2. Competitive reality check
Engineering-intelligence vendors already pivoted to "AI impact": Jellyfish (AI Impact module; claims 100M+ PRs / 275k engineers analyzed, Sept 2026), Swarmia (about $11M Series A June 2025), LinearB, DX, Faros. "Measure AI ROI from git/PR data" is NOT white space for a student team; they have data moats and enterprise sales. https://sacra.com/c/jellyfish ; https://sacra.com/c/swarmia

## 3. Candidate startup ideas (scored 1-5; higher is better; "survives" = not killed by next Copilot/Claude release)

| # | Idea | Proven demand | Sellable (not in-house) | Survives AI progress | Evidence | Specific buyer | Total /25 |
|---|------|---|---|---|---|---|---|
| 1 | AI spend attribution and guardrails (tokens/seats by team, repo, ticket; anomaly alerts; caps/routing policy) | 5 | 4 | 3 | 5 | 5 (VP Eng/CTO + FinOps) | 22 |
| 2 | Ticket-level cost of delivery: tokens + review time + rework per ticket/feature, linking agent traces to Jira/Linear | 4 | 4 | 4 | 3 | 4 (VP Eng, finance) | 19 |
| 3 | Agent change provenance and audit trail for regulated orgs (which agent, prompt, human approver; exportable for SOX/model risk) | 3 | 4 | 4 | 3 | 4 (CISO, risk) | 18 |
| 8 | AI-code risk gate: policy-as-code for what agents may touch (auth, payments, PII) with evidence reports | 4 | 3 | 3 | 4 | 4 (CISO/Platform) | 18 |
| 4 | Review-load triage: risk/size/AI-origin routing, reviewer capacity planning, auto-split big PRs | 5 | 2 | 2 | 5 | 3 (EM) | 17 |
| 7 | Fair performance-evidence packets for EMs (impact narratives from tickets, reviews, incidents, not LOC) | 3 | 3 | 4 | 2 | 3 (EM/HR) | 15 |
| 5 | Human-vs-agent work routing and forecasting calibrated on your own history | 3 | 3 | 3 | 2 | 3 (EM/Dir) | 14 |
| 6 | Codebase comprehension and onboarding for managers/juniors | 3 | 3 | 2 | 3 | 2 | 13 |

Notes:
- #1 has the best demand evidence (Gartner, Uber cap, Peer Insights ranges). Vendors (Anthropic/Cursor admin dashboards, FinOps tools, Jellyfish) are moving in; the durable part is cross-vendor attribution to team/ticket. A shallow dashboard is a feature, not a company.
- #4 has the most pain but is the most likely to be absorbed by GitHub, CodeRabbit and model vendors.
- #3/#8 are the best regulated wedge but need trust, SOC 2 and long sales cycles; hard for students.

## 4. Honest take: "estimate cost of a feature/ticket from agentic coding behavior + employee efficiency"

Verdict: the need is real, but framed as a precise ex-ante ESTIMATOR it is the weak version. The strong version is cost ATTRIBUTION first, calibrated forecasting later.

For:
- Cost visibility is the best-evidenced pain (P2); finance wants unit economics, and the ticket is the unit managers plan in. I found no tool shipping cost-per-ticket across vendors.
- Estimation is visibly broken (P6); story points lost meaning, so a data-driven alternative has an opening.
- Agent traces (tokens, retries, tool calls, review rounds) are new data and a possible moat.

Against / risks:
- Prediction is hard: METR showed even developers cannot judge their own speedup (predicted +24%, actual -19%). Task-level variance is huge; a model trained on one or two orgs will be noisy. Expect wide intervals.
- "Employee efficiency" per person is toxic (surveillance, fairness, detection errors). Pitch team/ticket level only.
- Token price per unit of work and pricing models change with every release (Gartner notes shift to consumption-based licensing), so predictors need continuous recalibration. The dominant cost is likely human review/rework (Faros: review time +91%), which is less observable than tokens.
- Data access is the hard part: Jira/Linear + GitHub + vendor usage APIs + CI. Incumbents (Jellyfish, DX, Faros) hold much of it and can add "cost per work item".
- I found no evidence buyers pay for estimation specifically; they pay for spend control and ROI proof.

Recommended shape: start with #1 + #2 (attribute actual spend and review time to tickets, show distributions and outliers), earn the data, then add forecasting with honest ranges after a few hundred closed tickets per customer. Interview 10-15 VP Eng / finance people before building; I found no direct customer-interview evidence, only reports.

## 5. Gaps / caveats
- Searches hit rate limits; Reddit/HN threads were not retrieved directly. No raw community quotes beyond those inside cited articles.
- Primary reports (Faros, METR, DORA, GitClear, Veracode) were not opened; numbers come from secondary summaries. GitClear (2025, 211M changed lines): duplicated code and falling refactoring (about 25% to under 10% of changed lines 2021-2024), per https://blog.robbowley.net/2025/02/17/gitclears-latest-report-indicates-genai-is-having-a-negative-impact-on-code-quality/ ; the churn 3.3% to 7.1% figure is single-source and unverified.
- No data found on junior hiring decline or bank-specific coding-agent policies.
