# Round 2: Requirements, specs, and product-to-engineering handoff in the agent era

Researched 2026-10-13. About 20 tool calls. Reddit archive returned 429 or timeouts (r/ExperiencedDevs, r/ProductManagement), so there are NO Reddit quotes here. Community evidence is HN only. Job-posting counts were not retrieved. Web-search summaries are secondary and are marked as such.

## 1. Domain overview
- Spec-driven development (SDD) is a hot category (GitHub Spec Kit, AWS Kiro, Tessl, OpenSpec, BMAD). It is mostly free or open source, and it is crowded with Show HN projects and platform features.
- HN sentiment is skeptical ("waterfall with new drapes"). By late 2026 an Ask HN asks whether SDD tools have "fallen off" in favor of /plan mode. That points to SDD tooling being absorbed by the agents and IDEs themselves.
- The money in requirements is in the regulated incumbents (Jama $1.2B buyout, Polarion, DOORS) and in compliance-automation startups (Ketryx $39M Series B). Traceability there is a legal obligation, not a nice-to-have.
- Cause-of-failure data says requirements are the main source of waste (PMI). No rigorous measurement was found of the time EMs and tech leads spend clarifying tickets.
- The cheap, pure-spec layer is AI-fragile. The AI-durable pocket is regulated traceability and audit evidence, where a human must sign off and a regulator reads the output.

## 2. Demand evidence table
Ladder: 1 money moving, 2 capital and hiring, 3 pain with cost, 4 community, 5 vendor claim.

| Signal | Type | Number | Source |
|---|---|---|---|
| Francisco Partners acquires Jama Software (requirements management for regulated product dev) | 1/2 | $1.2B, announced 2024-03-18; ~300 employees; recurring revenue "tripled in 5 years" [vendor-sourced press release] | https://www.geekwire.com/2024/jama-software-acquired-for-1-2b-in-significant-exit-for-portland-based-company/ and https://www.franciscopartners.com/media/francisco-partners-to-acquire-jama-software-for-12b |
| IBM DOORS Next list price | 1 | from $164 per user per month (Professional SaaS) [secondary, G2] | https://www.g2.com/products/ibm-engineering-requirements-management/pricing |
| Polarion X Base entry price | 1 | $42 per user per month, 20-user limit; other tiers are contact-sales [secondary] | https://www.g2.com/compare/jama-connect-vs-polarion |
| Jama Connect price | 1 | no public price; TrustRadius lists $57.33 per concurrent user per month, 3 minimum [secondary, unverified] | https://www.trustradius.com/compare-products/jama-connect-vs-spirateam |
| Requirements management software market size | 5 | Estimates range from $1.75B (2026) to $13.8B (2024). They are inconsistent; do not cite one without its method | https://www.verifiedmarketresearch.com/product/requirements-management-software-market/ and https://www.credenceresearch.com/report/requirements-management-software-market |
| Ketryx (AI compliance and traceability for medical-device software) | 2 | $39M Series B, Sept 2025, led by Transformation Capital, total over $55M [secondary] | https://llm.ketryx.com/content/blog/ai-startup-that-streamlines-medical-device-compliance-raises-39m.html |
| Trace.Space (AI-native requirements management for automotive, industrial and other hardware makers) | 2 | $4M seed, Feb 2025 (about $5.5M total; location and dates conflict between sources) [secondary] | https://siliconcanals.com/trace-space-raises-1-3m/ |
| Tessl (spec-centric dev, Guy Podjarny) | 2 | $125M total (a $25M seed plus a $100M Series A led by Index), Nov 2024, valuation reported at $500M or more. No 2025-26 round found | https://techfundingnews.com/tessl-raises-125m-ai-native-software-development/ |
| Tessl status | 2/5 | One review says the Framework was paused in 2025 to focus on a skills and spec registry; pricing not public [unverified secondary] | https://rywalker.com/research/tessl |
| GitHub Spec Kit adoption | 4 | roughly 95k stars (May 2026) to about 128k (Aug 2026, unverified) | https://www.star-history.com/github/spec-kit |
| Kiro (AWS) pricing | 1 | Free, $20, $40 and $200 per month tiers, with credits; sources conflict on the middle tiers | https://kiro.dev/blog/new-pricing-plans-and-auto |
| HN: "Spec-Driven Development: The Waterfall Strikes Back" | 4 | 225 points, 191 comments | https://news.ycombinator.com/item?id=45935763 |
| HN: "Verified Spec-Driven Development (VSDD)" | 4 | 211 points | https://news.ycombinator.com/item?id=47197595 |
| HN: "Understanding Spec-Driven-Development: Kiro, Spec-Kit, and Tessl" | 4 | 128 points | https://news.ycombinator.com/item?id=45610996 |
| PMI requirements survey (n over 2,000 practitioners): inaccurate requirements management is the primary cause of missed goals | 3 | 47% of failures; 5.1% of project dollars wasted [secondary summary of the PMI 2014 study] | https://www.pmi.org/learning/library/requirements-management-survey-13449 |
| PMI Pulse 2014: inaccurate requirements gathering is a primary cause of failure | 3 | 37% (32% in 2013) [secondary, old] | https://www.slideshare.net/slideshow/pba-92022368/92022368 |
| Up to 50% of rework attributed to requirements problems | 5 | Infotech claim; underlying data unverified | https://www.infotech.com/research/flawed-requirements-trigger-70-of-project-failures |
| Stack Overflow 2025 (n over 49,000): top AI frustration is "solutions that are almost right, but not quite" | 3 | 66%; 45% say debugging AI code takes longer | https://survey.stackoverflow.co/2025/ |

Gaps: no hard figure was found for EM or tech-lead hours spent clarifying requirements. The only direct study found (arXiv 2507.13553) says clarification in open-source feature requests is rare and does not quantify time. No Indeed or LinkedIn counts of requirements, systems-engineering or regulatory-affairs roles were retrieved.

## 3. Pain points, ranked
1. **Ambiguous input produces wrong code and rework.** Evidence for the direction is strong; the measured numbers are old (PMI 2014, n over 2,000), plus the Stack Overflow 2025 "almost right" 66%.
   - HN builder: "When I ship bugs, it's 'almost' never a code mistake. It's because I misunderstood a requirement or missed an edge case while rushing. Vague tickets like 'Add Twilio support' don't help" (Show HN "Relay" ticket-grilling agent, 3 points, no comments, so it is a weak signal; https://news.ycombinator.com/item?id=46136914).
2. **Specs cannot fully pin down behavior.**
   - "There is always more detail in implementations than can be specified by any less than the code itself" (fl0ki, https://news.ycombinator.com/item?id=46955747).
   - "the spec is not comprehensive enough to guarantee one specific implementation" (vivekyyy, https://news.ycombinator.com/item?id=49182353).
3. **SDD is perceived as waterfall and bureaucracy.**
   - "Much of the hype around SDD is really about developers never having experienced a real waterfall project" (constantcrying, https://news.ycombinator.com/item?id=45935763).
   - "write a spec for years, run the LLM agent every 6 months, blame techs for the bad result" (eric-burel, same thread).
   - "Spec driven development is waterfall... I'm not sold, but consultants love it" (https://news.ycombinator.com/item?id=49544095).
4. **Agents invent features outside the spec, and specs are valued for visibility into what was built.** "Agents are getting very good also on inventing features" (2dera, https://news.ycombinator.com/item?id=49182353). Specs "give control over it".
5. **SDD tooling is fading into built-in plan modes.** From an Ask HN post: "Nowadays though, it seems like all the SDD tools have kinda fallen off but all of the complaints remain... Did we all just collectively decide that /plan mode was enough?" (https://news.ycombinator.com/item?id=49182353). Only four comments, so this is weak evidence of a trend.
6. **In regulated shops, documentation and traceability cannot be skipped.** "If you work in banking you generally can't just FTX-and-hope your prototype... you're going to have traceability requirements that can only be satisfied... the documentation exists and, indeed, is a must to satisfy compliance and regulatory frameworks" (bartread, https://news.ycombinator.com/item?id=49698564). Also: "DO-178C requires checks for compliance to requirements, coding standards, traceability" (https://news.ycombinator.com/item?id=48762154), and the RTM "in an Excel silo" complaint (https://news.ycombinator.com/item?id=46597635).

PM-prototype handoff (v0, Lovable, Bolt) and design-to-code: HN search returned nothing usable, and Reddit failed. No evidence collected for this theme.

## 4. Incumbents and gaps
- **Free or open spec tooling:** GitHub Spec Kit (about 100k+ stars, MIT-style open source), OpenSpec, BMAD. These are commodity, and the IDE and agent vendors keep adding the same planning features.
- **Kiro (AWS):** spec-first IDE, $0 to $200 per month. A commenter uses "Kiro IDE primarily as a spec generator" (https://news.ycombinator.com/item?id=47330762), so specs are a feature, not a standalone product.
- **Tessl:** $125M raised, but the product has pivoted toward a skills and spec registry for agents, and pricing is not public.
- **Regulated RM incumbents:** Jama ($1.2B, PE-owned), Polarion (Siemens), DOORS (IBM). They charge per seat, quote-based, and sell enterprise-wide. Inflectra (a competitor, so a biased source) says they are expensive and complex. They cover the traceability record but not the AI-agent code-to-requirement link.
- **New AI-native entrants:** Ketryx (medical device software, $55M+ total) and Trace.Space (hardware, $4M seed). Their existence validates demand but also means this space is already being contested.
- **Gap candidates:** (a) PR-level proof that an AI-written change satisfies a named requirement or acceptance criterion and which tests cover it, in tools engineers actually use (GitHub, Linear and Jira); (b) readiness scoring of tickets before an agent runs; (c) mid-market regulated teams (fintech, small medtech and auto suppliers) priced out of Jama or DOORS.

## 5. Candidate ideas

### Idea A: Agent-PR traceability for regulated teams ("requirements-to-PR evidence")
- **Pitch:** a GitHub app that links each AI-authored PR to the ticket or requirement ID and acceptance criteria, checks coverage with tests, and auto-builds an audit-ready traceability matrix (RTM).
- **Buyer:** Head of Engineering or QA/Quality Lead at a 50-500 person fintech, medtech or auto-software supplier.
- **Why now:** AI coding makes PR volume jump, and auditors still ask which requirement a change satisfies. "Spec is the source of truth" is now a tooling trend.
- **Why not in-house:** compliance evidence must be consistent and audit-trailed, and teams already pay for Jama or Polarion rather than build it. Mid-market teams often keep their RTM in spreadsheets.
- **Why AI-durable:** the value is the regulator-facing evidence chain, which a Copilot release will not produce under an auditor's accepted format. The linking itself could be absorbed, so the moat has to be audit templates and integrations.
- **Wedge MVP:** GitHub app plus Jira or Linear import; parses `Refs REQ-123` in PRs; LLM drafts the link; exports an RTM CSV or PDF. Feasible in weeks.
- **Top 3 signals:** Jama $1.2B buyout; Ketryx $39M Series B; HN regulated traceability comments (items 49698564, 48762154).
- **Biggest risk:** Ketryx and Jama will add this, and it needs credibility with QA and RA buyers and long sales cycles.
- **Self-score:** A 14, B 12, C 14, D 9, E 7, F 10 = **66** (not 70, because strong funded competitors exist and the exact wedge is unproven by direct buyer evidence).

### Idea B: Ticket-readiness gate for agent work ("is this ticket safe to hand to an agent?")
- **Pitch:** scores Linear or Jira tickets for missing acceptance criteria, edge cases and owners, and asks the PM clarifying questions before an agent picks it up.
- **Buyer:** EM or tech lead, 20-200 engineer teams.
- **Why now:** agents run on tickets, and "almost right" is the top AI frustration (66%).
- **Why not in-house:** a prompt is easy to build, so this is a weak point.
- **Why AI-durable:** weak. Planning modes already ask clarifying questions, and Atlassian or Linear will ship it.
- **Wedge MVP:** Linear app that comments on ticket gaps. A few days of work.
- **Top 3 signals:** PMI 47% requirements-caused failure; Stack Overflow 66%; the Relay Show HN (3 points only).
- **Biggest risk:** absorbed by incumbents and by agents' own clarification behavior, with no revenue evidence.
- **Self-score:** A 8, B 6, C 5, D 7, E 6, F 14 = **46**.

### Idea C: Mid-market regulated requirements workspace (cheap Jama alternative with AI)
- **Pitch:** Git-native requirements, risk and test linkage for 10-100 person medtech or fintech teams that cannot afford Jama or DOORS.
- **Buyer:** QA/RA lead or CTO at an early-stage medtech or device-software company.
- **Why now:** Jama and DOORS are quote-based and seen as heavy; Trace.Space and Ketryx show investors fund the category.
- **Why not in-house:** teams that build their own RTM face audit risk.
- **Why AI-durable:** moderate. Validation and quality-system acceptance is a barrier AI doesn't remove, but it also slows a student team.
- **Wedge MVP:** Markdown or YAML requirements in the repo, with a CI check and a report.
- **Top 3 signals:** Jama $1.2B; Polarion entry price $42 per user per month; Trace.Space seed.
- **Biggest risk:** compliance credibility (validation, 21 CFR Part 11) and sales cycles are heavy for students.
- **Self-score:** A 12, B 10, C 13, D 8, E 7, F 6 = **56**.

### Idea D: PM prototype-to-engineering handoff spec extractor
- **Pitch:** turns a v0 or Lovable prototype into a ticketed spec with behavior, states, data and open questions.
- **Buyer:** product lead at a 20-200 person company.
- **Why now:** PMs ship prototypes.
- **Evidence:** none gathered, so demand is unproven. The platforms (Lovable, v0) can add export of specs themselves.
- **Self-score:** A 5, B 5, C 4, D 2, E 5, F 11 = **32**. Included only for completeness.

## 6. Best idea from this domain
**Idea A, agent-PR traceability for regulated teams (about 66/100, my own score).** It is the only candidate with money already moving: Jama's $1.2B exit, per-seat DOORS pricing, and Ketryx's $39M. Regulators demand the output, so the work does not disappear when the next model ships. The pure-spec layer (Spec Kit, Kiro, Tessl, ticket linting) looks poor to build on, since it is free, commoditized, and HN is already writing it off. Validate Idea A by interviewing 10 QA or RA leads about how they prove AI-written changes against requirements today, and check Ketryx's feature roadmap before building, since it is the closest competitor. The 66 stays unproven until a buyer says he would pay.
