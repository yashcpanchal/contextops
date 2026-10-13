# Round 2: Engineering knowledge continuity

Researched 2026-10-13. About 22 tool calls. Reddit archive rate-limited (429/422) for r/ExperiencedDevs and r/EngineeringManagers, so Reddit evidence is thin (one r/cscareerquestions pull, not relevant). HN worked. Items marked [vendor], [secondary] or [unverified] are as retrieved, not checked against primaries.

## 1. Domain overview
- The pain is real and universally nodded at (onboarding, bus factor, layoffs, "why was this built this way"), but most of it is already sold as "codebase Q&A / AI docs". That slice is crowded and is being absorbed by coding agents (Cursor, Claude Code, DeepWiki free for public repos, Amp).
- Money is moving in two places: (a) horizontal enterprise knowledge search (Glean ~$300M ARR [secondary]), and (b) a narrow, high-stakes vertical: legacy/mainframe knowledge capture (Hypercubic, YC F25, $5.3M seed Aug 2026).
- The weakest-served part is knowledge that is NOT in the repo: intent, decisions, "why", held in a departing person's head. Code-reading AI cannot recover that; it needs elicitation from the human.
- Several pure-play comprehension startups have died or pivoted (CodeSee acquired then shut; Bloop shut down April 2026 and pivoted), which is a warning on willingness to pay for generic "understand my code" tools.
- Self-serve buyers do not pay for "documentation hygiene"; they pay when a specific event (layoff, retirement, acquisition, contractor exit) creates a deadline.

## 2. Demand evidence table
| Signal | Ladder | Number | Source |
|---|---|---|---|
| Glean ARR (enterprise knowledge search), Series F $150M Jun 2025 at $7.2B | 1 [secondary] | ~$300M ARR May 2026; ~$208M end-2025 | https://valueaddvc.com/blog/glean-valuation-revenue-2026-300m-arr-enterprise-ai-search |
| Glean contract size (Vendr data via blog) | 1 [secondary] | median ~$98.9K/yr, range $29.9K-$208.9K, 174 purchases; ~$45-50/user/mo, ~100 seat min | https://www.getmacha.com/blog/glean-ai-pricing-explained , https://www.gosearch.ai/blog/glean-pricing-explained/ |
| Guru contract size (Vendr) | 1 [secondary] | median ~$37.8K/yr, 155 purchases; list ~$25/seat/mo | https://www.vendr.com/marketplace/guru , https://coworker.ai/blog/guru-pricing |
| Stack Overflow for Teams price | 1 [secondary] | free <=50; ~$6.50 / ~$13.50 per teammate/mo (sources disagree) | https://www.eesel.ai/blog/stack-overflow-for-teams-pricing |
| Mintlify Series B (docs for 20,000 cos) | 2 | $45M at $500M, Apr 2026, a16z + Salesforce Ventures; $67M total | https://mintlify.com/blog/series-b |
| Unblocked Series A | 2 | $20M USD, May 2025, B Capital + Radical; ~$30M total | https://www.techcrunch.com/2025/05/06/unblocked-raises-20-million-for-its-ai-assistant-to-help-devs-understand-legacy-codebases |
| Greptile Series A | 2 | $25M, Sep 2025, Benchmark | https://startupintros.com/news/2025-09-01-greptile-series-a |
| Hypercubic (COBOL tribal-knowledge capture) seed | 2 | $5.3M, Aug 2026, CIV led; YC F25 | https://pulse2.com/hypercubic-raises-5-3-million-seed-to-turn-mainframe-modernization-into-a-software-driven-process/ |
| Cloneable (expert-workflow capture, energy) seed | 2 [secondary] | $4.6M, Apr 2026, Congruent | search aggregator, unverified |
| Mainframe modernizers using external firms | 3 | 74% use external firms; 70% struggle to find skills (Kyndryl 2025, n=500 senior leaders) | secondhand, via search summary; verify at kyndryl.com |
| Acquired-company attrition (KPMG, 19 tech cos, 2020 deals) | 3 | annual attrition ~32-36% pre-deal -> 55-71% in 2 years post-deal; acquired staff ~2x as likely to leave | https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/2023/talent-flight-overlooked-risks-during-m-a.pdf |
| Concern about knowledge loss on departure | 3 | Sinequa: 67% concerned, 64% experienced loss; Enboarder 2025: 76.6% concerned [vendor-sponsored] | https://www.sinequa.com/company/press/sinequa-finds-over-two-thirds-of-it-leaders-are-concerned-by-organizational-knowledge-loss-from-employee-turnover/ |
| Panopto 2018: 42% of institutional knowledge unique to the person | 3 [vendor] | 42% | via search summary, secondary |
| Replacement cost of an engineer | 3 [secondary] | 50-200% of salary (SHRM-derived, widely repeated, not independently verified) | https://eltexsoft.com/blog/engineer-replacement-cost/ |
| Onboarding ramp | 3 [secondary] | 22.4 days to first merged PR (attributed to LinearB; unverified); ~$22.5-27K saved per hire by cutting ramp 10->4 wks (vendor model) | https://voxbooster.com/blog/developer-onboarding-statistics-2026 , https://fabric.so/blog/the-real-cost-of-engineering-onboarding |
| COBOL workforce | 3 [secondary] | avg age 58, ~10%/yr retiring (2019 figure) | https://www.hypercubic.ai/insights/cobol-developer-retirement-rate-vs-training-pipeline (vendor blog) |
| "Vibe coding creates a bus factor of zero" | 4 | 223 pts / 131 comments | https://news.ycombinator.com/item?id=44966856 |
| Launch HN Hypercubic | 4 | 91 pts / 58 comments | https://news.ycombinator.com/item?id=45877517 |
| Handover.ai (video KT tool) | 4 | 56 pts / 48 comments | https://news.ycombinator.com/item?id=44121925 |
| Ask HN: engineer resigns, how do you do KT? | 4 | 5 pts / 18 comments | https://news.ycombinator.com/item?id=41264901 |
| Job postings for humans doing this | 2 | NOT RETRIEVED (no LinkedIn/Greenhouse counts obtainable). Honest gap. | n/a |

## 3. Pain points (ranked) with quotes
1. **Departures remove the "why", and nothing in the repo recovers it.**
   - "What misses is: 'why'. And that is usually stored in laws, sub-sub-laws, etc." (wiz21c) https://news.ycombinator.com/item?id=45877517
   - "The SMEs who understand these systems are retiring, so every year that passes makes the systems more opaque." (sai18, Hypercubic founder, so interested party) same thread.
   - "...mass layoffs... tend to turn internal systems into black boxes because everybody with a deep understanding of them" [truncated in retrieval] https://news.ycombinator.com/item?id=42283799
2. **AI-written code makes ownership/understanding worse.**
   - "Unfortunately the corporate machine has been converging on a bus factor of 0." (fzeroracer) https://news.ycombinator.com/item?id=44966856
   - "every (new) AI chat session is effectively a member entering and leaving your team." (dinfinity) same.
3. **Layoff aftermath quantified (anecdotal).** A forum thread dated 2026-03-18 claims velocity -30%, incident resolution time 3x, "knowledge debt", and a cut that "saved $750K/year" on a system processing $2M daily. [Caution: usernames and tone look synthetic/possibly AI-generated; treat as low-trust illustration, not evidence.] https://tianpan.co/forum/t/we-just-lost-our-most-senior-engineer-to-layoffs-our-monoliths-tribal-knowledge-went-with-her/2730
4. **Knowledge transfer on resignation fails because of incentives, and one-off dumps do not work.**
   - "Any one-off knowledge transfer will most likely fail." (joshi4) https://news.ycombinator.com/item?id=41264901
   - "Employees are not motivated to do knowledge transfer. It goes directly against their job security." (p1esk) same.
   - "It is a social problem, not a tech problem." (codingdave) same.
   - LLM caveat: LLMs "can only produce common knowledge unless SMEs supply organization-specific content" (codingdave, paraphrased from retrieval) same.
5. **Docs rot.** "Documentation rots a lot more quickly than the code" https://news.ycombinator.com/item?id=47302108 . Counter: "documentation rot has gotten way better. You can deterministic force a documentation sync process on every PR" (AI-coded envs) https://news.ycombinator.com/item?id=48142788 . So generic doc-sync is getting solved by the agents themselves.
6. **Trust/privacy objection to KT capture tools.** "realistically this type of tool is going to be used by HR right before they fire an employee" (keiferski); "all of your secret sauce ends up on somebody else's server" (LennyHenrysNuts) https://news.ycombinator.com/item?id=44121925
7. Intern/new-grad angle: the founder's Visa experience (manager did not know his project) is anecdotal and not corroborated by anything I retrieved. The r/cscareerquestions pull returned mentor/intern-quality posts, no knowledge-continuity signal. No evidence found that anyone pays for intern-program knowledge tooling.

## 4. Incumbents and gaps
| Player | Funding / price | Notes |
|---|---|---|
| Glean | $765M total [secondary], $7.2B val; ~$45-75/user/mo, ~100 seat min, ~$99K median | Horizontal; gets bought by CIOs, not eng leaders. Does not elicit tacit knowledge. |
| Guru | median ~$38K/yr; ~$25/seat [secondary]; no 2025-26 funding found | Wiki/verification model; classic doc-rot complaints. |
| Stack Overflow for Teams | ~$6.50-$13.50/user/mo | Q&A requires people to write; low engagement is the standing issue. |
| Unblocked | $20M A (May 2025); paid tiers renamed Code Review / Platform; ~$19/user/mo unverified | Closest direct competitor to codebase Q&A + context from Slack/Jira/PRs. Pivoting toward agent context and code review. |
| Swimm | $27.6M A (2021), ~$33M total [secondary]; no pricing/status news found in 2026 | Code-coupled docs. Status unclear; no growth signal. |
| Sourcegraph / Amp | Amp spun out Dec 2025 [secondary]; usage-based, 0% markup, enterprise +50% | Moved to agents; Cody de-emphasized. |
| DeepWiki (Cognition) | Free for public repos, paid for private; Cognition $26B val / $492M run-rate [single secondary source] | Direct commodity pressure on "chat with repo". |
| Greptile | $25M A, Sep 2025, Benchmark | Pivoted to AI code review. |
| Mintlify | $45M B at $500M, Apr 2026 | External API/product docs, not internal knowledge. |
| GitBook, Readme, Notion AI | not researched (gap) | Docs/wiki platforms bundling AI. |
| CodeSee | Acquired by GitKraken May 2024, commercial ops shut down (a post says Feb 22; year unconfirmed) | Cautionary tale: code visualization did not sustain. |
| Bloop | Shut down Apr 10, 2026; pivoted to mainframe modernization then Vibe Kanban [secondary] | Same warning; note the pivot target is the same legacy niche as Hypercubic. |
| Driver AI, Onboard AI | No reliable info found | Likely small/inactive; unverified. |
| Hypercubic (YC F25) | $5.3M seed | HyperTwin does AI interviews/observation of SMEs; targets Fortune 500 mainframes; pricing undisclosed. Only vendor in set with explicit tacit-knowledge elicitation. |
| Handover.ai | HN launch, no funding found | Video-based KT; drew skepticism. |

**Are general AI assistants absorbing this? Honest answer: mostly yes, for the in-repo half.**
- Codebase Q&A, architecture diagrams, auto-generated docs, onboarding guides: Claude Code, Cursor, Copilot, DeepWiki do this free or bundled. The comprehension startups' fates (CodeSee, Bloop dead; Greptile and Amp pivoted away; Unblocked repositioning) back this up.
- NOT absorbed: (1) knowledge held only by people (needs structured elicitation, a workflow, and incentives); (2) cross-source "why" reconstruction with provenance an auditor can rely on; (3) risk quantification across the org (which modules have no living owner); (4) deadline-driven, buyer-owned events (layoff, acquisition, vendor exit, retirement) where someone has budget now. Defensible niches: regulated retention, M&A integration, legacy/vendor handover. Only the legacy one has capital proving demand (Hypercubic); regulated and M&A are hypotheses with only adjacent evidence (KPMG attrition).

## 5. Candidate ideas
Scoring: A Demand 20, B Sellable 20, C AI-durable 20, D Evidence 15, E Buyer 10, F Feasibility 15.

### Idea 1: Exit-interview-for-code ("departure knowledge capture")
- **Pitch:** When an engineer gives notice or is laid off, an agent reads their last 2 years of PRs, commits, tickets, and Slack, then runs a structured interview that only asks what the artifacts cannot answer, producing ADR-style "why" records and a runbook, linked back to code owners.
- **Buyer:** VP/Director of Engineering or Eng Manager, 100-2,000 person company; HR/Legal as blockers.
- **Why now:** layoffs plus AI-written code; agents now read the artifacts cheaply so the interview can be short and targeted.
- **Why not in-house:** teams do not build tools for an event that happens ad hoc; "wiki a day" attempts fail on incentives.
- **AI-durable:** the value is elicitation from a person plus provenance; a frontier model cannot fetch what is only in someone's head. Risk: Claude/ChatGPT with connectors can run a decent interview prompt for free.
- **Wedge MVP:** GitHub + Slack export -> gap-targeted interview questions -> markdown ADR bundle in the repo (weeks, public APIs).
- **Top 3 signals:** HN KT thread (joshi4 and others describe failure of one-off dumps, and a founder building Savvy for this); Handover.ai 56 pts/48 comments with "I'm in the middle of this right now.. Handover would be super helpful." (zknowledge); Hypercubic $5.3M for the legacy analog of the same elicitation.
- **Biggest risk:** employee incentives and privacy backlash (the "used by HR right before they fire" objection); departing people can refuse; no paid-customer proof for non-legacy engineering.
- **Score:** A 11, B 9, C 12, D 8, E 6, F 11 = **57**.

### Idea 2: Ownership and understanding-risk map (bus factor 2.0 for AI-written code)
- **Pitch:** Git/PR analysis flags modules whose authors left, that were AI-generated and lightly reviewed, or where nobody on the current team has touched or been asked about them, ranked by incident and revenue criticality, with a "comprehension test" quiz on owners.
- **Buyer:** VP Eng / CTO, 50-1,000 engineers, also M&A or audit teams.
- **Why now:** "bus factor of zero" resonates (223 pts).
- **Why not in-house:** a git script is easy to DIY; the sellable layer is the criticality and test layer.
- **AI-durable:** medium; risk metrics persist, but any agent can compute basic bus factor, and open-source tools exist (CodePulse Show HN).
- **Wedge MVP:** read-only GitHub app, dashboard in a week.
- **Signals:** HN bus-factor thread; Sinequa 67%/64% [vendor]; HN CodePulse Show HN (2 pts, weak).
- **Biggest risk:** looks like another dev-metrics dashboard (LinearB, DX, Jellyfish bundle it); weak willingness to pay.
- **Score:** A 9, B 7, C 9, D 7, E 7, F 14 = **53**. Best as a feature of Idea 1, not standalone.

### Idea 3: Post-acquisition engineering knowledge map for M&A
- **Pitch:** For acquirers (PE operating partners, corp dev, integration leads), index the target's code, docs, tickets and people in the first 90 days, identify who holds single-point knowledge, and generate a retention-priority list.
- **Buyer:** PE operating partner / VP Corp Dev / CTO of acquirer, mid-market.
- **Why now:** KPMG: attrition roughly doubles after tech deals and strongest people leave first; Willis Towers Watson via BDO: retention budgets ~1-2% of price [secondary].
- **Why not in-house:** acquirers do a few deals a year; consultants (Gotara-style operator firms) bill for the manual version.
- **AI-durable:** high; relationship, data access, and deal-process embedding.
- **Wedge MVP:** diligence-time repo + org-chart analysis report as a paid fixed-fee deliverable.
- **Signals:** KPMG study (level 3); Gotara operator-led M&A integration consulting [vendor, no pricing found]; general BCG note that value is delayed 12-24 months.
- **Biggest risk:** long, relationship-heavy sales cycle; confidentiality of target code; student team lacks credibility; no pricing data retrieved for the manual version. No direct evidence anyone pays specifically for engineering knowledge mapping.
- **Score:** A 8, B 10, C 15, D 6, E 6, F 6 = **51**.

### Idea 4: Vendor/contractor handover acceptance audit
- **Pitch:** On contract end, an agent tests the delivered docs and repo ("could a new engineer rebuild and operate this?") and scores completeness before final payment is released.
- **Buyer:** Eng/IT director or procurement, firms outsourcing to agencies (50-5,000 employees).
- **Why now:** heavy outsourcing, AI code from contractors.
- **Why not in-house:** buyers rarely have the spare senior time to audit.
- **AI-durable:** medium-high; independence and a milestone-payment tie-in are the moat.
- **Wedge MVP:** upload repo + docs, get a gap report and a generated "missing handover" question list.
- **Signals:** weak. HN contractor-handover search returned 0 hits. Only generic KT demand evidence. I found no evidence of budgets for this.
- **Biggest risk:** no demand proof; episodic usage.
- **Score:** A 6, B 8, C 11, D 4, E 6, F 12 = **47**.

### Idea 5: Regulated "decision provenance" ledger
- **Pitch:** For banks/insurers, capture and retain the rationale behind system changes with audit-grade provenance (who decided, what evidence), as ADRs auto-assembled from tickets/PRs/chat.
- **Buyer:** Head of Engineering Risk / CISO org / model risk in regulated firms (1,000+ employees).
- **Why now:** AI-generated changes raise audit questions.
- **AI-durable:** high on compliance, but requires SOC2-grade trust and long sales.
- **Signals:** none retrieved directly; only the Visa/regulated-finance anecdote from the founder and Hypercubic targeting banks/insurers. I did not find an RFP, budget line or consultant billing for it.
- **Biggest risk:** compliance burden on day 1 (outside the brief's feasibility bar), and no evidence of demand beyond hypothesis.
- **Score:** A 6, B 9, C 14, D 3, E 7, F 4 = **43**.

## 6. Best idea from this domain
**Idea 1, narrowed: departure-triggered knowledge capture, with Idea 2's risk map as the targeting layer** (score ~57, mediocre-to-decent, and I am being harsh). Why: it is the only part of this domain that general coding assistants structurally cannot do alone (the knowledge lives in a person), it has an event-driven buyer with a deadline, there is an adjacent funded proof (Hypercubic's $5.3M for the same elicitation in COBOL), and the MVP is a few weeks on public APIs.

Caveats the team must weigh honestly:
- No ladder-1 evidence (money moving) for the non-legacy, general-engineering version exists in what I found. Evidence is community pain (level 4) and surveys (level 3, partly vendor-sponsored).
- It could land lower than the 56 baseline. It beats ContextOps only if a paying-pilot test shows layoff/offboarding events produce budget. Fastest test: cold-message 20 engineering managers who recently had layoffs or attrition and offer a free one-person capture.
- Cheapest way to de-risk: verify whether Hypercubic's HyperTwin is actually in paid use, and whether the "legacy/COBOL vertical" (where Bloop also fled) is a better wedge than general engineering. Evidence suggests the legacy niche has more capital but also more incumbents (IBM watsonx Code Assistant, AWS Blu Age) and enterprise sales weight.

## Gaps
- No job posting counts, no Reddit threads from the three target subs, no Vendr data for Unblocked/Swimm, no pricing for Notion AI/GitBook/Readme, no primary-source verification of onboarding stats (22.4 days; LinearB/DORA attribution unconfirmed).
- Status of Swimm, Driver AI, Onboard AI unknown.
- Kyndryl 2025 and Meta "tribal knowledge in data pipelines" article not read at the primary source.
