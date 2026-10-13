# a16z main-fund theses and investments, 2025-2026 (Round 3 scout: beyond Speedrun)

Scope: a16z.com essays, Big Ideas 2026, CIO surveys and investment announcements. Fetched via WebFetch and WebSearch on 2026-10-13. Dates are as shown on the pages. Anything not read on the page is marked [unverified]. The portfolio page is JS-rendered, and the wp-json search endpoint returned 404, so the investment list below is a sample surfaced by search, not a complete portfolio.

## 1. Method
- Pages read in full by fetch: Big Ideas 2026 Parts 1-3, "How 100 Enterprise CIOs Are Building and Buying Gen AI in 2025" (ai-enterprise-2025), "Leaders, gainers and unexpected winners in the Enterprise AI arms race" (30 Jan 2026), "Nine Emerging Developer Patterns" (7 May 2025), "From Demos to Deals" (24 Jun 2025), "Surviving AI Price Wars" (13 Apr 2026), "You are not a model. Don't price per token" (27 Aug 2026), "Notes on AI Apps in 2026" (8 Jan 2026), and announcements for GitButler, Temporal, Runta and Keycard.
- Only seen as search snippets, not fetched: Neo, doxxnet, Armadin, Deeptune, Exa, Gimlet, Relace, Cursor, Grepr, OpenRouter, Petual, and the podcast "AI Can Write Code. Why Isn't Software Better?" (28 Sep 2026).
- No a16z 2026 edition of the CIO survey exists in search; the Jan 2026 "arms race" post is the latest budget data. Searches found no a16z-led round in engineering intelligence, FinOps for AI coding, or code review. That absence is itself a signal (see sections 4 and 6).

## 2. What enterprises are spending on (a16z's numbers)
| Datum | Source |
|---|---|
| Avg enterprise LLM spend ~$4.5M to ~$7M over two years; expected ~$11.6M this year (~65% growth). App spend expected ~$3.9M, actual nearly $6M. | a16z.com/leaders-gainers-and-unexpected-winners-in-the-enterprise-ai-arms-race/ (30 Jan 2026) |
| Expected LLM spend growth ~75% next year (May 2025 survey, 100 CIOs). Innovation budgets fell from 25% to 7% of LLM spend; spend is now in core IT and BU budgets. | a16z.com/ai-enterprise-2025/ |
| 81% use 3+ model families (68% a year earlier); in the 2025 survey 37% used 5+ models. | both posts |
| Anthropic in production at 44% of CIOs; its gain is attributed to token-heavy coding use cases. One SaaS CTO reported ~90% of code AI-generated, up from 10-15% in 12 months. | both posts |
| 65% prefer an incumbent solution when one exists (trust, integration, procurement). | arms-race post |
| Large enterprises have "meaningful, pre-allocated AI budgets"; a bank deploys 2-3 tools for the same use case by policy ("redundancy is policy"); POCs can take almost a year. | Surviving AI Price Wars |
| AI sells work output, so it draws on labor budgets, which are larger than software budgets. | From Demos to Deals |

No a16z post gives a coding-specific budget figure. Coding is repeatedly called the "killer use case," but the spend breakdown is absent. That is a data gap ContextOps could own.

## 3. What a16z says is broken (and relevance to ContextOps)
1. **Token spend is unpredictable and unattributable.** "Finance and IT teams need to trace AI spend to departments, projects, clients, or invoices"; token forecasting is hard because of context length, retries and reasoning time; failed agent runs still burn tokens (Aug 2026 posts). This directly validates the ContextOps pain, but from the vendor-pricing angle. Buyers asked for chargebacks and budgets.
2. **Multi-vendor sprawl.** Redundancy by policy plus 3+ model families means cross-vendor spend is structurally fragmented. This supports the "cross-vendor" part of ContextOps.
3. **Switching costs and agent QA.** Prompts and guardrails tuned for one model make switching slow; agent quality assurance is hard (2025 CIO survey).
4. **ROI is positive but less dramatic than claimed; enterprises "don't know what good looks like until they try."** Microsoft Copilot NPS dropped 48 points after developers tried Cursor (arms-race post). This supports the outcome-join half of ContextOps (which tool pays off).
5. **Demo-to-production gap, durable execution, agent identity, git for parallel agents.** Temporal (Series D, 17 Feb 2026), Keycard (21 Oct 2025), GitButler (Series A, 8 Apr 2026), Runta (seed, 16 Jul 2026). All are runtime and infrastructure plays, not management or finance plays.
6. **Governance roles are forecast but unfunded.** Big Ideas Part 2 (Seema Amble) expects "agent supervisors" and "governance leads" to audit agent fleets, and says turning siloed knowledge into shared context is "a key opportunity." No explicit founder ask.

## 4. Where a16z explicitly asks for startups
Almost none of the essays say "we want to back." Asks are implicit.
- Part 1: "startups that build the platform that extracts structure from documents, images, and videos" (Jennifer Li, data entropy); "AI-native tools" for level-1 security work (Joel de la Garza); agent-native control plane with "routing, locking, state management, and policy enforcement" (Malika Aubakirova); the "context problem" in the AI data stack (Jason Cui).
- Part 2: James da Costa says to sell to AI startups and other customers "not captive to incumbents"; Joe Schmidt says forward-deployed motions in legacy verticals.
- Part 3: Know Your Agent / agent credentialing (Sean Neville), usage-based attribution and payments for agents (Harkavy), secrets-as-a-service (Abiodun).
- May 2025 developer-patterns essay: AI-native Git, docs as knowledge systems, "Beyond .env" scoped credentials with audit trails, async agent work. The cost and observability opportunities in that essay were my inference, not a16z text.
- "Notes on AI Apps in 2026": coding tools are "crowded or proven" (Cursor furthest along). Open: ideation and prioritization of what to build, and non-technical enterprise workflows. The piece contains no spend or retention data.

**Not asked for anywhere I found:** FinOps for AI, engineering-leader analytics, AI coding ROI measurement, or code-review governance. a16z invests in the agent runtime and builders (Cursor, Relace, GitButler, Temporal, Runta, Keycard, Neo, OpenRouter). It does not appear to fund the management and measurement layer for the buyer. This means either a white space or a category a16z considers a feature of someone else.

## 5. a16z investments seen (coding, agent infra, adjacent)
| Company | Date | What | Relevance |
|---|---|---|---|
| Cursor | earlier | AI IDE | The incumbent ContextOps would meter. |
| Relace | ~2025, $23M Series A | small models for coding agents | Cost lever. |
| GitButler | Apr 2026, Series A | Git for parallel agents | Adjacent; no cost or governance. |
| Temporal | Feb 2026, Series D | durable execution for agents | Adjacent infra. |
| Runta | Jul 2026, seed | stateful computer for agents, with policy controls | Adjacent, execution plane. |
| Keycard | Oct 2025 | agent identity, task-scoped tokens, audit | Closest on governance, but access, not spend. |
| Neo | 2026 [date unverified] | security layer for agents | Security. |
| OpenRouter | ~2025 | model gateway; "control plane for observability, monitoring and usage management" | Direct adjacent: gateway-level spend visibility, but for API use, not seat-based coding tools. |
| Grepr | older | observability cost optimization | FinOps-flavoured, for telemetry data. |
| Deeptune, Exa, Gimlet, Mirendil, doxxnet, Armadin, Petual | 2026 | RL envs, search, inference cloud, AI R&D models, agent networking, offensive security, audit AI | Not relevant to ContextOps. |

Direct ContextOps competitors in a16z main-fund announcements: none found. OpenRouter is the nearest adjacent (usage management over APIs; does not cover Claude Code, Cursor and Copilot seat or plan spend).

## 6. Mapping to ContextOps and Round 2 ideas
- **ContextOps (58):** The a16z spend data supports Demand (A) and "why now" (C/E): LLM spend rising ~65%, chargeback demand, multi-vendor by policy, ROI unclear. It does not support Evidence (D) at the buyer-for-this-tool level, because a16z speaks in vendor-pricing terms. Risk: a16z's own point that 65% of enterprises prefer incumbents suggests Cursor, Anthropic and GitHub dashboards will be the default answer, and the "Surviving AI Price Wars" and "Don't price per token" essays push vendors toward credits plus usage transparency, which will make vendor-side reporting better. That is a threat to the "unify the bill" half and favors the "join spend to outcomes, across vendors" half.
- **Sharper wedge:** lead with the chargeback and attribution problem that a16z names ("trace AI spend to a department, project, client, or invoice"), starting with engineering-org cost centers. Pair it with the Copilot-to-Cursor NPS story: "which tool actually pays off" evidence per team.
- **R2-1 (ContextOps + Finance, capitalization and audit packet):** best fit with the "finance and IT teams need chargebacks" language. Moderate support.
- **R2-3 (AI-agent change evidence for SOC2/PCI/SOX) and R2-6 (AI change-escape ledger):** align with the "governance leads / agent supervisors" forecast and Keycard-style audit trails. a16z funds identity and access but not change-evidence. Moderately open, but see the funded-competitor check in other scout files.
- **R2-9 (shadow AI-built app intake):** "every team should be a software team" (Acharya) implies a flood of non-engineer-built apps. This is an a16z-flagged trend, but a16z frames it as upside, not a problem, so there is no investor pull [inference].
- **R2-4, R2-5, R2-8, R2-10:** nothing in the a16z material speaks to them.

## 7. Crowded themes to avoid (per a16z behavior)
AI IDEs and coding agents (Cursor, Cognition and others, with a16z explicitly calling it proven). Agent execution and sandboxes (Runta, Temporal). Agent identity (Keycard, Neo, Catena). Model gateways (OpenRouter). Vertical AI apps (Harvey-style).

## 8. Candidate takeaways
1. **Keep ContextOps, reposition around chargeback and outcome attribution.** The strongest a16z-sourced "why now" line is the Aug 2026 finance and IT chargeback language, plus pre-allocated budgets and the 3+ vendor sprawl. Self-score unchanged, about 58-60.
2. **Agent-fleet audit trail for engineering leaders (module).** Covers who or what agent changed what, at what cost, with what approval, combining R2-3/R2-6 with spend. Rides the "governance lead" forecast. Risk: Keycard and Runta may add audit. About 52.
3. **Coding-specific enterprise AI budget benchmark (data product).** a16z has no coding spend number; surveys generalize. A benchmark from ContextOps customers could become a lead-gen asset rather than a standalone product. About 40 as a product, but useful as top-of-funnel.

## Biggest caveat
a16z essays are weak proof of demand and are investor marketing (a16z is an OpenAI investor, which the arms-race post acknowledges). The survey is 100 non-randomly selected Global 2000 executives, self-reported.

## Sources
- https://a16z.com/ai-enterprise-2025/
- https://a16z.com/leaders-gainers-and-unexpected-winners-in-the-enterprise-ai-arms-race/
- https://a16z.com/newsletter/big-ideas-2026-part-1/ , -part-2/ , -part-3/
- https://a16z.com/nine-emerging-developer-patterns-for-the-ai-era/
- https://a16z.com/insights-for-enterprise-ai-builders/
- https://a16z.com/surviving-ai-price-wars-without-destroying-your-business/
- https://a16z.com/you-are-not-a-model-dont-price-per-token/
- https://a16z.com/notes-on-ai-apps-in-2026/
- https://a16z.com/announcement/investing-in-gitbutler/ , -temporal/ , -runta/ , -keycard/ (others via search snippets)
- https://a16z.com/podcast/big-ideas-2026-the-enterprise-orchestration-layer/
