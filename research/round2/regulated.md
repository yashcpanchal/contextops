# Round 2: Compliance evidence for regulated software teams in the agent era

Researched 2026-10-13, about 28 tool calls. Reddit archive returned 429s/timeouts (no Reddit data). Job-posting counts were NOT retrievable (only individual postings). Most "auditors are asking about AI code" material is practitioner/vendor blogs, not regulators; labelled [vendor] or [secondary]. Nothing here is from a Big-4 or PCAOB/AICPA/FDA primary source on AI-generated code: I looked and did not find one.

## 1. Domain overview
- Regulated software teams must prove, per change, who requested it, who wrote it, who independently reviewed it, what tested it and what shipped. The rules (SOC 2 CC8.1, SOX ITGC, PCI DSS 6.x, IEC 62304, ISO 26262/DO-178C) do not mention AI. They assume the author and the reviewer are humans who understood the code.
- Agent-authored PRs break those assumptions in three places: authorship attribution (which model/session wrote it), segregation of duties (the human who prompted the agent also clicks Approve), and reviewer comprehension (rubber-stamping large diffs).
- Money is clearly moving in the compliance category (Vanta >$300M ARR, Ketryx $39M, Jama $1.2B exit, Kosli $10M), but almost none of it is yet spent on the agent-specific problem. Demand for the AI-specific piece is mostly inference plus vendor/blog signal.
- The medtech slice is already contested by a funded player (Ketryx ships Claude Code and Cursor MCP integrations for IEC 62304 traceability). The SOC 2/SOX/PCI slice is served by generic GRC tools that check "was a PR approved" but not "was the approver independent of the agent's operator".
- Regulatory calendars are moving and some got delayed (EU AI Act high-risk to Dec 2027/Aug 2028; CMMC Phase 2 suspended July 2026), which weakens "deadline-driven" urgency in two sub-segments. CRA reporting duties are live since 2026-09-11.

## 2. Demand evidence table
Ladder: 1 money moving, 2 capital/hiring, 3 pain with cost, 4 community, 5 vendor claim.

| Signal | Type | Number | Source |
|---|---|---|---|
| Vanta ARR | 1 | >$300M ARR, ~3x in two years; 60% YoY customer growth; 16,000+ customers; $4.15B valuation (July 2025, $150M Series D); Cursor and Harvey are customers [Fortune exclusive, company-supplied] | https://www.fortune.com/2026/04/29/exclusive-vanta-arr-300-million-sequoia-shadow-ai-claude-cursor/ |
| Drata ARR | 1 | ~$98M ARR Jan 2025 [Sacra estimate, secondary]; last round $200M Series C at $2B (2022) | https://www.channelfutures.com/channel-business/drata-gains-200-million-in-new-funding-pushing-valuation-to-2-billion |
| Secureframe | 1/2 | ~$79M raised total; revenue ~$6M 2024 [Latka estimate, low confidence] | https://getlatka.com/companies/secureframe |
| Delve (YC compliance startup) scandal, Mar 2026: $32M raised at $300M valuation; alleged templated/fake SOC 2 reports (493 of 494 leaked reports near-identical) [allegations, Delve denies] | 2/3 | Shows (a) capital flowing into compliance automation and (b) buyers/auditors now distrust automated "evidence" -> authentic, verifiable evidence is a selling point | https://captaincompliance.com/news/the-delve-scandal-fake-soc-2-audits-open-source-code-theft-and-exit-from-y-combinator/ |
| Ketryx (medtech software compliance, agents) | 2 | $39M Series B, Sept 2025, Transformation Capital; >$55M total; claims 4 of top 5 med-device makers as customers [vendor] | https://www.biopharmatrend.com/news/ketryx-gets-39-million-to-expand-ai-compliance-infrastructure-for-life-sciences-1364/ |
| Ketryx ships Claude Code + Cursor MCP connectors tracing commits to requirements/risks for IEC 62304 [vendor] | 5 | direct competitor to the medtech version of the idea | https://www.ketryx.com/integrations/claude |
| Jama Software acquired by Francisco Partners | 1/2 | $1.2B, March 2024 | https://www.geekwire.com/2024/jama-software-acquired-for-1-2b-in-significant-exit-for-portland-based-company/ |
| Kosli (SDLC change evidence for regulated/bank engineering) | 2 | $10M Series A, March 2025, led by Deutsche Bank CVC, Heavybit; $3.1M seed 2022 | https://startuprise.co.uk/kosli-secures-10-mn-in-series-a-round-funding/ |
| Opsera (DevOps/agents platform) | 2 | $20M Series B, April 2025, Prosperity7, Hitachi Ventures | https://sdtimes.com/opsera-raises-20m-to-drive-ai-powered-devops-platform-innovation-accelerating-ai-agent-adoption-and-developer-efficiency/ |
| FDA 510(k) clearances per year | 3 (market size) | ~3,082 (2024) to ~3,195 (2025), stable ~3,000-3,350/yr since 2007 [third-party trackers, not CDRH] | https://510kdatabase.net/clearances-2025 |
| FDA AI-enabled devices | 3 | record ~295 cleared in 2025; 1,451 cumulative; ~96.5% via 510(k) [secondary]. These are AI-enabled devices, NOT a SaMD count; no SaMD-specific count found | https://intuitionlabs.ai/articles/fda-ai-medical-device-tracker |
| Count of medtech software companies | - | NOT FOUND. Only: ~29,678 FDA-registered device establishments after Feb 2021 purge [secondary; all device types, not software] | https://www.medtechintelligence.com/news_article/report-fda-removed-2500-medical-device-establishments-database/amp |
| Med-device regulatory consulting rates | 1 | US $375-450/h senior, $275-325 mid, $150-200 junior; SaMD/AI-enabled 510(k) full-service $30k-$70k; fixed-fee consultant $15k-$40k, firm $30k-$80k+ [consultant marketing, secondary] | https://omcmedical.com/omc-medical-regulatory-consulting-hourly-rates-fee-schedule/ and https://meddeviceguide.com/blog/how-to-choose-medical-device-regulatory-consultant-guide |
| Tool pricing, medtech QMS/RM | 1 | Jama median ~$75k/yr (Vendr, 11 purchases); Greenlight Guru median ~$44k/yr (Vendr), sources say 2026 price rises approaching 100%; Matrix Req $920-$3,390/month flat; Qualio est. EUR 25k/yr (unverified); Orcanos from $99/feature/month [all secondary, conflicting] | https://www.g2.com/products/jama-connect/pricing ; https://erpresearch.com/erp-add-ons/healthcare/greenlight-guru/pricing ; https://openregulatory.com/matrix-requirements-pricing |
| SOC 2 audit fees | 1 | $6k-25k SMB; Type 2 $20k-60k; Big-4 Type 2 for a 100-person company ~$50k; internal labor often >= external fees; consultant ~160 hours [vendor blogs] | https://www.scrut.io/soc-2/cost-of-soc-2-audit |
| SOX ITGC and PCI QSA fees | - | NOT FOUND (SOX ITGC is bundled into the financial audit fee; PCI scales with card exposure) | - |
| EU Cyber Resilience Act | 3 (forcing function) | Reporting duties live 2026-09-11 (24h early warning, 72h notice); SBOM and full obligations 2027-12-11; fines up to EUR 15M or 2.5% turnover [law-firm summaries] | https://www.jonesday.com/en/insights/2026/07/eu-cyber-resilience-act-24hour-reporting-duties-start-september-11-2026 |
| EU AI Act high-risk | 3 | Delayed by AI Omnibus (Reg. 2026/1744, in force 2026-07-27): standalone high-risk to 2027-12-02, product-embedded to 2028-08-02 | https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/eu-ai-act-ai-omnibus-formally-adopted/ |
| CMMC 2.0 | 3 | Phase 1 live 2025-11-10 (self-assessment). Phase 2 (C3PAO) was due 2026-11-10 but DoD suspended it 2026-07-13 with a 60-day review, cancellation not ruled out; DoD est. ~$102k initial L2 assessment for a small firm; SBA says up to $600k; only 92 assessor orgs / 633 assessors late 2025 | https://www.csis.org/analysis/what-cmmc-pause-means-defense-industrial-base and https://www.lw.com/en/insights/what-defense-contractors-should-know-about-dod-suspension-of-cmmc-phase-2 |
| FINRA 2026 Oversight Report lists "Coding" as a GenAI use case; says agents "may act without human validation"; suggests "tracking agent actions and decisions", "prompt and output logs", "which model version was used" [via Debevoise summary, not FINRA text] | 3 (regulator signal) | first regulator language close to the idea | https://www.debevoise.com/insights/publications/2025/12/finras-2026-regulatory-oversight-report-continued |
| PCAOB 2026 inspection priorities reportedly include ITGCs over AI systems [one consultancy white paper, unverified] | 5 | no primary source retrieved | https://uniqus.com/internal-controls-over-generative-ai/ |
| Practitioner essay: auditors asking "Who initiated the change? Can the change be reconstructed? What was test coverage designed to test?"; claims AICPA working groups "still exploring" TSC updates for AI-assisted dev; DORA 2025 ">60% found AI-related errors after deployment" [unverified blog] | 4/5 | single blog | https://tianpan.co/blog/2026/05/05/ai-generated-code-compliance-attestation-gap |
| HN: "Who wants to be hired / hiring" medtech engineering rows (Innolitics, Stratipath) mention 62304 | 2 (weak) | anecdotal | https://news.ycombinator.com/item?id=47232351 |
| HN total for queries "SOC 2 AI generated code auditor", "IEC 62304 AI", "SOX compliance AI coding agent": no thread of the form "we need to prove AI code to auditors" with real engagement | 4 (negative) | HN community is not discussing this yet. Negative evidence. | rsearch.py hn queries, 2026-10-13 |
| Job postings (human QA/RA doing this work) | 2 | Individual postings only, e.g. Senior Software Design Quality Engineer $110-160k (Danvers MA) and Tempus "Senior Quality Engineer - Software Design Controls"; no counts retrieved | https://job-boards.greenhouse.io/tempus/jobs/7924561002 |

## 3. Sub-segment briefs (buyer, regulation, spend, pain)

### 3.1 Medical device software / SaMD
- Buyer: VP Quality / Head of RA-QA, or Director of Software Quality (design controls). Often a team of 2-10 in a 50-500-person company. Engineering lead co-signs.
- Regulation: IEC 62304 (Edition 2 reportedly due Aug 2026, three classes collapsing into two; unconfirmed from my sources), FDA 2023 premarket software guidance, FDA 524B cyber (SBOM + vuln plan), QMSR replacing 21 CFR 820 in Feb 2026 [secondary], FDA Jan 2025 draft AI-enabled device software guidance. Nothing found on FDA's stance on AI-assisted coding itself. Closest hook: FDA Computer Software Assurance (risk-based validation) for tooling.
- Spend: tooling $25-100k/yr per company (Jama, Greenlight Guru, Polarion etc., see table); consultants $30-70k per SaMD 510(k) plus hourly $150-450. Internal QA/RA headcount is the largest cost (roles $110-160k).
- Pain: DHF/traceability matrix maintained by hand; every PR must link to requirement/risk; AI agents increase PR volume while reviewers' time is fixed.
- Competition: Ketryx (funded, AI agents, Claude Code and Cursor MCP), Jama, Polarion, Matrix Req, Greenlight Guru, Orcanos. Hardest sub-segment to enter as a student team.

### 3.2 Fintech / payments (the founder's home turf)
- Buyer: Head of Compliance / GRC lead, IT audit manager, Head of Platform or DevEx at 50-1,000-person fintech/SaaS. Also internal audit at banks.
- Rules: SOC 2 CC8.1 (authorize, design, test, approve, implement changes; no AI language). SOX 404 ITGC: auditors sample changes and test for independent approval and segregation of duties between developer and deployer. PCI DSS v4.0.1: bespoke code review before release by someone other than the author and approved by management (6.2.3/6.2.3.1 per a cloudaware mapping; confirm numbering against the standard), component inventory (6.3.2), change control (6.5.x).
- Auditor testing method (practitioner sources): pull a sample of changes across the period, match each to ticket, approval, test evidence and deployment record; exception if the approver was the author or approval is missing. GitHub does not enforce SoD by itself. A screenshot of an approved PR proves only what was visible then.
- Agent-authored case: no AI-specific rule. Guidance converges on: agent must not be able to merge or deploy; named human approver distinct from the proposer; retain reviewed commit SHA, reasoning and merge record outside ephemeral CI. When the person who prompted the agent is also the sole approver, the "author" is arguably the human operator, so self-approval is an exception under a strict reading. This is interpretation, not auditor-published policy; confirm with an auditor [vendor/secondary: hoop.dev, zof.ai, augmentcode, tianpan].
- Spend: SOC 2 audit $20-60k plus GRC platform (Vanta/Drata roughly $10-50k+ per year, not verified) plus internal labor. SOX and PCI costs are embedded in larger audits; no clean figures found.
- Do GRC platforms cover code-change evidence? Vanta's own integration pages say tests verify PR approvals and branch protection (Bitbucket/GitLab pages retrieved; GitHub page not retrieved); Drata via GitHub captures PR approval data [tray.ai connector page]. Neither visibly addresses agent identities, AI authorship, or operator-equals-approver. Vanta's AI product is an agent for evidence/policy work, and its "shadow AI" message is about SaaS tools, not code provenance. AuditBoard (SOX) not researched. Kosli does append-only SDLC change evidence (SOC 2, ISO 27001, NIST; I found no SOX/PCI material and no coding-agent features).

### 3.3 Automotive / aerospace / defense
- ISO 26262 / ASPICE / DO-178C require traceability and tool qualification (DO-330, TQL levels; qualification costs "hundreds of hours per KSLOC" for a tool [secondary]). Vendors: Codebeamer, Polarion (with ISO 26262 TQK), LDRA, VectorCAST. No market-size or pricing data found; no certification-authority guidance on generative AI found. Vendor stance (Qt/Axivion): analysis tools must stay non-AI so they remain qualifiable.
- CMMC: Phase 1 live; Phase 2 mandatory third-party assessment suspended 2026-07-13; Task Force report due ~late Sep/early Oct 2026, outcome not found. Compliance cost is primarily security controls (NIST 800-171), not code-change evidence. Poor wedge: buyers are small, cost-sensitive, and the program's future is uncertain.
- Verdict: long cycles, heavy tool qualification, no AI-specific demand signal. Skip for a student team.

### 3.4 EU
- CRA: manufacturers of products with digital elements must run vulnerability handling and report actively exploited vulnerabilities and severe incidents (24h/72h/14d) via ENISA's single platform since 2026-09-11; SBOM (top-level dependencies, machine-readable) and the rest from 2027-12-11. Applies to software publishers selling into the EU, including US firms. The reporting obligation is real now; it needs an evidence trail (who triaged what, when), but the SBOM/vuln tooling market is crowded (Mend, Anchore, Docker, Snyk class) and not agent-specific.
- AI Act: high-risk obligations delayed to Dec 2027 / Aug 2028. Providers of high-risk systems need technical documentation and logging. Applies to AI product makers, not to teams that merely use coding agents. Weak driver for "AI-assisted code evidence".

## 4. Who pays, how much (summary)
- Tooling: medtech QMS/RM $25-100k/yr; GRC platforms (Vanta/Drata) five figures; Jama median ~$75k/yr; DOORS $164/user/month (from specs.md).
- Consulting: US med-device regulatory $150-450/hour; SaMD 510(k) package $30-70k; SOC 2 readiness ~160 consultant hours; CMMC L2 assessment DoD est. ~$102k (small firm), SBA says up to $600k all-in.
- Audit fees: SOC 2 $6-60k; Big-4 SOC 2 ~$50k for 100 people; SOX/PCI not found.
- Is anyone asking about AI code? Evidence level: LOW-MEDIUM. FINRA 2026 report names coding as a GenAI use and calls for agent action tracking and model-version logs (strongest regulator signal, via secondary summary). PCAOB inspection focus on AI claimed by one consultancy only. No Big-4 publication, no FDA statement, no AICPA criteria change found. The essays saying "auditors are asking" are single blogs. Treat "regulators will force this" as a hypothesis to test in interviews.

## 5. What a student team uniquely has
- A founder who interned at Visa (a PCI environment): can credibly speak the language of PCI change control, has seen what engineers actually do to satisfy auditors, and has a warm network of fintech engineers and compliance folks for 20 discovery interviews. That is a genuine edge over a generic student team in the fintech sub-segment, and none in medtech.
- Students can build and OSS a GitHub-native evidence generator in weeks, using only public APIs (GitHub, Linear/Jira, agent PR trailers). They have no SOC 2 yet: self-hosted/open-source distribution (no customer code leaves their infra) sidesteps the vendor-security review that kills young compliance startups. Note the Delve scandal: authenticity and verifiability will be a plus.
- Disadvantage: compliance buyers value credibility and references; an unaudited student vendor selling "audit evidence" faces trust friction.

## 6. Candidate ideas

### Idea 1: Agent-aware change evidence (the proposed idea), fintech/SaaS-first
- Pitch: a GitHub App/Action that, for every PR, assembles the auditor-ready chain requirement/ticket -> agent session (model, version, prompt summary) -> PR -> independent human review -> test results -> deploy, continuously checks segregation of duties, and exports evidence packs for SOC 2 CC8.1, SOX ITGC and PCI 6.x.
- Buyer: Head of Compliance/GRC or Head of Platform at a 50-1,000-person fintech/SaaS company with SOC 2/PCI scope; second user is the auditor.
- Why now: agent PRs are exploding; FINRA 2026 report names coding and agent-action tracking; auditors sample changes and AI muddies "author"; Delve scandal pushes buyers to verifiable evidence.
- Why not in-house: a bash script can check "approver != author", but not cross-system chain (ticket, agent logs, CI, deploy), versioned evidence retention, and auditor-accepted formatting. Medium risk: sophisticated platform teams (e.g., at big fintechs) will build it.
- Why AI-durable: moderate-high. The deliverable is an independent record that a human accountable party approved, which a model vendor will not credibly attest to about itself. But GitHub/Vanta/Drata could add "agent PR" checks in a quarter.
- Wedge MVP (4-6 weeks): GitHub App reading PRs, commits (Co-Authored-By trailers, bot accounts), reviews, check runs and deployments; flags exceptions (agent-authored with operator-as-sole-approver, self-merge, approval before last commit, missing ticket/test link); monthly CSV/PDF evidence pack. Free for open-source/self-hosted.
- Strongest 3 demand signals: Vanta >$300M ARR / 16k customers (budget exists for SOC 2 evidence); Kosli $10M Series A led by Deutsche Bank CVC (a bank paid to fund change-evidence); FINRA 2026 report language on agent action/model-version logging.
- Biggest risk: no direct buyer evidence yet that anyone budgets for the AI-specific part; Vanta/Drata/GitHub can bundle it as a check; unaudited vendor trust.
- Self-score: A Demand 11/20, B Sellable 11/20, C AI-durable 12/20, D Evidence 8/15 (category strong, AI-specific thin), E Buyer 7/10, F Feasibility 12/15 = **61**.

### Idea 2: Same idea for medtech (IEC 62304 / 21 CFR 820), requirement -> agent -> PR -> DHF
- Pitch: as Idea 1 but outputs design-history-file traceability for SaMD teams.
- Buyer: Director of Software Quality / QA-RA at a 50-300-person SaMD company.
- Why now: AI agents write code in teams that must link every change to requirements and risks; QMSR transition.
- Why not in-house: validated-tool expectations and DHF format.
- Why AI-durable: regulatory documents require human accountability.
- Wedge MVP: Markdown/YAML requirements in-repo plus CI check plus RTM export (as in specs.md Idea A).
- Strongest signals: Ketryx $39M and agent integrations (validates demand but also the competitor); Jama $1.2B; $30-70k consulting per SaMD submission.
- Biggest risk: Ketryx already ships Claude Code/Cursor MCP connectors, is UL-certified for 62304/13485/14971, and has top-5 device customers. A student team has no QMS credibility or domain contacts.
- Self-score: A 13, B 10, C 12, D 10, E 7, F 6 = **58**. Lower than Idea 1 because of an entrenched funded competitor and no founder edge; keep as phase-2 vertical, not a start.

### Idea 3: "SoD radar": free open-source auditor-style scan for agent-era change exceptions
- Pitch: a CLI/GitHub Action that replays the auditor's sampling over 100% of last quarter's PRs and outputs the exception list (self-approved, stale approvals, bot approvals, agent-authored with operator-as-approver, direct pushes) before the auditor sees it; paid tier retains evidence and monitors continuously.
- Buyer: IT audit manager / compliance lead / DevEx lead at fintechs; entry through engineers.
- Why now: auditors sample, tools can test 100%; AI makes exceptions more frequent and less visible.
- Why not in-house: easy to script once, hard to maintain across GitHub/GitLab/Bitbucket quirks and auditor definitions; this is the weakness (a script can do the free tier).
- Why AI-durable: deterministic checks over platform metadata; a model is not the control.
- Wedge MVP (2-3 weeks): GitHub GraphQL; Co-Authored-By/bot-detection heuristics; HTML report. Great founder-led-growth hook (HN/Show HN, "run it on your repo").
- Signals: GitHub does not enforce SoD natively [secondary]; FINRA/PCI language; Vanta/Bitbucket page shows tools only check "approved PR + branch protection".
- Risk: thin moat, a feature of Idea 1; monetization unclear.
- Self-score: A 9, B 7, C 11, D 7, E 6, F 14 = **54**. Best used as the top-of-funnel for Idea 1.

### Idea 4: Evidence-integrity layer sold to auditors / small CPA firms (post-Delve)
- Pitch: tool for SOC 2/SOX auditors to pull and independently verify change evidence directly from client repos (read-only), including AI-authorship, rather than trusting screenshots or GRC-platform summaries.
- Buyer: partner/IT audit lead at a mid-size CPA firm or a SOC 2 audit boutique.
- Why now: Delve scandal (Mar 2026), AICPA peer-review told reviewers to flag identical testing across clients [secondary]; auditors need defensible testing of AI-era changes.
- Why not in-house: audit firms are not software builders; but they are tiny and tool-averse.
- Risk: auditors are a slow, cost-sensitive, fragmented buyer; unclear willingness to pay; clients must grant access.
- Self-score: A 7, B 7, C 12, D 6, E 5, F 11 = **48**.

### Idea 5: CRA/EU "vulnerability-handling evidence" ledger for non-EU software exporters
- Pitch: log of vulnerability triage, 24h/72h reports, SBOM versions and fix PRs mapped to CRA Art. 14 for manufacturers selling into the EU.
- Buyer: Head of Product Security at a 100-1,000-person device/software maker.
- Why now: reporting duties live since 2026-09-11; SBOM duty Dec 2027.
- Risk: crowded (SCA/SBOM vendors, Docker, Mend, Anchore) and not agent-specific; the SBOM duty is 14 months away so urgency is partial; EU sales motion for US students.
- Self-score: A 10, B 8, C 9, D 7, E 7, F 9 = **50**.

## 7. Best idea from this domain and an honest verdict
Idea 1, scoped to fintech/SaaS with SOC 2 + PCI first, entering through Idea 3's free scanner, with medtech as a later vertical (about 61/100, my own score). Reasons: the budget exists (GRC platforms, audit fees, Kosli's bank-backed round), the founder has a real PCI-environment edge, an MVP needs only public GitHub APIs, and the deliverable (an independent, human-accountable record) is something model vendors cannot self-certify. Why not higher: (1) I could not find a single primary-source regulator or Big-4 statement requiring evidence about AI-generated code; the demand for the AI-specific piece is inferred and sits at ladder levels 4-5; (2) Vanta/Drata/GitHub could add agent-PR checks as a feature; (3) medtech, the most legally forced slice, is already owned by a funded competitor shipping the exact integration. This does not clearly beat round 1's 56 by a wide margin; it beats it only if 10-15 discovery interviews (start with the founder's Visa network, plus 5 SOC 2/SOX auditors) confirm that a compliance lead has hit an audit finding or auditor question about agent-authored changes in the last 12 months and has budget. If interviews show no one has been asked yet, the idea is early, and the right move is to ship the free scanner and wait for the first auditor questions rather than raise on it.

Gaps to close next: PCI SSC/QSA official position on AI-authored code; PCAOB primary text; Vanta/Drata GitHub test definitions and bot handling; AuditBoard SOX coverage; real job-posting counts; medtech software company count; Delve fallout details.
