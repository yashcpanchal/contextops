# Idea #7: Agent governance and audit trail for regulated enterprises

Evaluator stance: YC partner plus former VP Eng. Scored against `RUBRIC.md` (50 = mediocre, 70 = strong). Research date: 2026-10-13.

## 1. The idea, expanded

**What it is.** A system of record for every code change an AI agent touches. For each change it records the agent, the model, the prompt and plan, the tool calls, the files touched and the human approver. It also enforces policy-as-code over what agents may touch (for example, "no agent edits under `/auth`, `/payments` or PII schemas without two human approvers"), and it produces audit-ready evidence packs for SOX ITGC change management, PCI DSS v4.0 Requirement 6 (bespoke software change control) and model-risk or AI-governance reviews.

**Core workflow.**
1. Platform deploys a hook/OTel collector to Claude Code, Cursor, Copilot and Codex (via managed settings or MDM) and a GitHub/GitLab app.
2. Every agent session is linked to the commits and PR it produced: session → diff → reviewer → merge → deploy.
3. Policy engine (OPA/Rego-style) runs at hook time (to block) and at PR time (to require approvals or labels on sensitive paths).
4. Each quarter, Risk/Internal Audit clicks "export", and the tool generates per-control evidence ("all 1,412 production changes in in-scope repos had an independent human approver; 37 were agent-authored on payment paths; each has a linked session").

**Wedge.** The first wedge is a "SOX/PCI change-evidence pack for agent-authored code" for one repo set at a mid-size fintech. The bet is that internal audit, not the CISO, is the pain owner, because they have to sign off ITGCs.

**MVP (6-8 weeks).** Claude Code hooks plus a Cursor/Copilot log ingester, a GitHub app that stamps PRs with agent provenance trailers, a YAML path policy, and a CSV/PDF evidence export mapped to SOX ITGC and PCI 6.5.x controls.

**Moat (claimed).** Cross-vendor neutrality, control-mapping content, and a tamper-evident evidence store that auditors come to accept. **Pricing (hypothesized).** $30-60 per developer per month, or a $50-150k platform fee per year for banks.

## 2. What the new research shows

**Incumbents are already shipping this exact product, mostly in the last 7 months.**
- **Endor Labs** launched "AI Code Governance", which "puts policy and an audit trail on every agent", streams every prompt, tool call, file read and shell command to a central audit trail "your compliance team can query", ships 29 default hook-layer policies, and inventories agents, models and MCP servers (brief published 2026-07-27). https://www.endorlabs.com/learn/ai-code-governance-secure-ai-generated-code-and-govern-the-agents-that-write-it , https://www.endorlabs.com/learn/agent-governance
- **Legit Security VibeGuard 2.0** (2026-08-03) is an endpoint agent covering Claude Code, Cursor and Copilot. It provides command visibility, policy blocking, MCP controls and anti-tamper. https://www.legitsecurity.com/press-releases/legit-security-launches-vibeguard-2.0
- **Zenity** discovers and monitors coding agents (Claude Code, Cursor, Copilot) on endpoints. https://www.zenity.io/use-cases/agent-type/device-based
- **Snyk** launched Agent Security plus Evo AI-SPM at RSA 2026 (2026-03-23), aimed at Claude Code, Cursor and Devin. Snyk says Evo is 60% of its new deal volume. https://snyk.io/news/snyk-launches-agent-security-solution/ , https://snyk.io/es/news/agentic-ai-security-moves-into-production/
- **Platform-native audit:** GitHub's agent control plane adds `actor_is_agent` and on-behalf-of user fields to the audit log, plus agent session records. https://github.blog/changelog/2025-10-28-enterprise-ai-controls-the-agent-control-plane-are-in-public-preview/ . Anthropic's Compliance API now covers Claude Code sessions (prompts, responses, tool calls, verified user ID) for Enterprise. https://claude.com/blog/compliance-api-cowork-and-claude-code
- **Capital and M&A** validate the category, but they validate it for the incumbents. Lasso raised a $30M Series A in Sept 2026 and reports 500%+ revenue growth. https://aiweekly.co/alerts/lasso-security-raises-30m-ships-leap-cpu-only-guardrail-with-sub-5ms-verdicts . CB Insights lists Prompt Security as acquired in Aug 2025 (buyer not shown there; reportedly SentinelOne). https://www.cbinsights.com/company/prompt-security/financials
- **The long tail is saturated.** HN Algolia shows at least 10 Show HNs since 2025 for "audit trail for AI coding agents": Gryph, Ponytrail (24 pts), MartinLoop, Cupcake (OPA for agents), Blue, ACP, DACP, a "tamper-evident audit trail" and others. Most have fewer than 5 points. The MVP is a weekend project, and nobody is pulling. https://news.ycombinator.com/item?id=46857391 , https://news.ycombinator.com/item?id=48631043 , https://news.ycombinator.com/item?id=46218813

**The regulatory pull is real but indirect.**
- **FINRA 2026 Oversight Report:** autonomous AI agents "may require novel oversight, including tracking actions and restricting system access"; existing recordkeeping and supervision obligations still apply. The report targets agents generally, not coding agents. https://datamatters.sidley.com/2025/12/16/finra-issues-2026-regulatory-oversight-report/
- **SOX ITGC:** change management requires approved, logged, tested changes plus segregation of duties. An agent that both writes and merges code is an obvious SoD issue. I found no PCAOB or Big Four guidance specific to coding agents. https://uniqus.com/wp-content/uploads/2026/04/Internal-Controls-Over-Generative-AI.pdf . Auditors still test outcomes (independent approval, testing), and Git plus branch protection already evidence those outcomes.
- **EU AI Act:** coding assistants are not Annex III high-risk, and the high-risk dates slipped to Dec 2027 and Aug 2028 under the Digital Omnibus. This is a weak driver. https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/
- **OCC/SR 11-7 model risk** governs models used in decisions, not developer tools, so "model-risk audit" export is mostly a stretch.

**Banks are adopting at scale and building their own controls.** Bank of America says 18,000 developers use coding agents. https://www.ciodive.com/news/bank-of-america-AI-agents-strategy-compliance/805178/ . Goldman is deploying hundreds of Devin instances. Citi built "Arc", an internal platform to "build, govern and scale AI agents". https://paymentsindustryintelligence.com/?p=59623 . I found no public bank policy specific to coding agents (the same gap ai_era.md notes).

**Sales-cycle reality.** Bank third-party security reviews run about 6 weeks for standard-tier vendors and 3-6 months for higher tiers. SOC 2 Type II is "table stakes" before integration. https://iomergent.com/soc-2-for-fintech/ , https://www.ampcuscyber.com/downloads/case-study/risk-intelligence-us-financial-company-wizard-tprm.pdf . A tool that ingests source code and prompts from developer laptops is high-risk tier by definition.

**Community evidence from earlier phase-1 work:** r/EngineeringManagers "one audit away from a very uncomfortable conversation about AI" (220 up), whose top reply is "IMO invented problem" (81 up) (reddit.md). Apiiro reports 10x security findings in AI-heavy Fortune 50 repos (vendor data; ai_era.md). GitLab's 2026 report says 92% of organizations report governance challenges with AI code (vendor survey, via Augment Code).

## 3. Scoring

| Criterion | Score | Justification |
|---|---|---|
| A. Proven demand / market (20) | **12** | The money is real and moving: Snyk Evo at 60% of new deals, Lasso $30M, Prompt Security acquired, Endor/Legit/Zenity all launching. But the spend is on AI *security* bought by CISOs. A pure "audit evidence" budget is unproven, no auditor is yet demanding agent-session evidence, and the main regulatory text (FINRA) is generic. |
| B. Sellable (20) | **7** | This is the weakest part. Neutral cross-vendor coverage, the supposed reason to buy, is already offered by Endor, Legit, Zenity and Snyk, all of whom are already approved vendors inside banks. GitHub and Anthropic ship native agent audit logs. Large banks build in-house (Citi Arc). A startup has to displace an existing AppSec vendor's free add-on, which is a feature sale, not a platform sale. |
| C. AI-durability (20) | **10** | The value isn't the LLM, which is good, and better models make governance *more* necessary. But the data layer is being absorbed by the agent vendors (Compliance API, GitHub agent control plane) and the policy layer by AppSec platforms. The only durable moat would be auditor-accepted evidence and trust, which a student team cannot build fast. |
| D. Evidence-backed problem (15) | **8** | Multiple sources: the FINRA report, SOX SoD logic, the Reddit thread, and vendor stats (Apiiro, GitLab). But most quantified evidence is vendor-produced, the top Reddit reply calls it an "invented problem", and there is no bank-specific coding-agent policy or audit-finding data. |
| E. Specific, reachable buyer (10) | **4** | The buyer is specific (CISO / Head of Platform / Internal Audit at banks and fintechs with 500+ engineers) but effectively unreachable for students. These buyers buy through existing AppSec relationships, RSA/Gartner and procurement. Mid-size fintechs are more reachable but feel less regulatory pressure. |
| F. Feasibility & wedge (15) | **4** | A demo is technically trivial (hooks, OTel, GitHub app), which is exactly why at least 10 Show HNs exist and the build is not differentiated. Selling it requires SOC 2 Type II, a 3-6 month high-risk vendor review, and custody of source code and prompts on day 1. This is the opposite of the rubric's "no enterprise sales cycle or SOC2 on day 1." |

**Total: 12 + 7 + 10 + 8 + 4 + 4 = 45**

## 4. Verdict

The problem is real and getting budget, but this is a feature war already being fought by well-funded AppSec incumbents (Endor, Legit, Snyk, Zenity) and by the agent platforms themselves (GitHub, Anthropic). The target buyer is the hardest possible for a student team: bank CISOs behind SOC 2 and 3-6 month vendor reviews. The only plausible salvage is narrower: auditor-facing control-evidence mapping (a SOX/PCI evidence pack that consumes GitHub, Anthropic and Endor logs rather than competing with them), sold to mid-size fintechs through their audit firms. Even that is thin.

Biggest risk: the audit trail ships for free inside tools banks already pay for (GitHub Enterprise, Claude Enterprise Compliance API, Snyk/Endor), and no bank will run a student startup through high-risk vendor onboarding to get a duplicate.

FINAL SCORE: 45/100
