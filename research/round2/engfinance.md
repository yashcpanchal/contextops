# Round 2: Engineering Finance (capitalization + R&D credit + AI-agent spend)

Date of research: 2026-10-13. Labels: [P] primary or Big-4/Big-accounting source, [S] secondary practitioner summary, [V] vendor claim, [U] unverified. Gaps are listed honestly in section 6.

## 1. Domain overview
- Finance teams must turn engineering work (Jira/Linear tickets, GitHub PRs) into three audit artifacts: ASC 350-40 capitalized software (financial statements), IRC §41 credit studies and §174A R&E deductions (tax), and now AI coding spend allocation.
- The manual process is real money: consultants bill 15-25%+ of the credit; engineering analytics vendors sell capitalization modules (Jellyfish avg ~$84K/yr on Vendr).
- Regulatory tailwinds are real and verified: ASU 2025-06 (agile-friendly model, effective FY beginning after Dec 15, 2027, early adoption allowed), OBBBA §174A (domestic R&E expensing back from 2025), Form 6765 Section G (mandatory TY2026), and Deloitte's Aug 2026 guidance that AI token cost is capitalizable only if tied to a specific project with evidence.
- BUT: this exact "Jira/GitHub to audit-ready capitalization + credit evidence" idea is already being built by funded players: Neo.Tax, Onshore, Taxnova (a16z Speedrun), Maestro, Allstacks, Jellyfish, LinearB. The open space is narrow: AI-agent spend attribution and mid-market/CPA-channel packaging.

## 2. Verified regulatory facts

| Claim | Verified? | Source |
|---|---|---|
| ASU 2025-06 removes "project stages" from ASC 350-40; capitalize when management has authorized/committed funding AND it is probable the project will be completed and used as intended; if "significant development uncertainty" exists, capitalization is deferred | Yes [P/S] (BDO bulletin dated 2025-09-23; FASB PDF located but not text-extractable by my tool) | https://arch.bdo.com/new-asu-on-internal-use-software-costs-guidance ; https://storage.fasb.org/ASU%202025-06.pdf |
| Effective: annual periods beginning after Dec 15, 2027 (incl. interim); early adoption permitted at start of an annual period; transition prospective, modified prospective, or retrospective; no private-company delay | Yes [P/S] | same BDO page; https://singerlewak.com/asu-2025-06-modernizing-internal-use-software-accounting-and-disclosures/ |
| ASC 985-20 (software to be sold) unchanged; website guidance moved from 350-50 into 350-40; disclosures aligned with PP&E (360-10) | Yes [S] | BDO page above |
| OBBBA created §174A: domestic R&E deductible immediately (or elect 60-month amortization); foreign R&E still 15 years; software development still treated as R&E | Yes [S] (Baker Tilly) | https://www.bakertilly.com/insights/domestic-research-expenditures-section-174-under-obbba |
| Small businesses (avg gross receipts <= $31M) could apply retroactively to tax years beginning after 12/31/2021; election within one year of enactment (7/4/2025). Practitioner sources say amended-return deadline was 7/6/2026, so that window is now closed | Yes with date wobble [S] | Baker Tilly above; https://www.aprio.com/the-one-big-beautiful-bill-makes-domestic-r-e-expenditures-deductible-again-ins-article-tax |
| All taxpayers with unamortized 2022-2024 domestic R&E could deduct it in 2025 or ratably over 2025-2026 | Yes [S] | Baker Tilly above |
| Form 6765 Section G (business-component detail): optional for TY2025 (IR-2025-99, Oct 1 2025); mandatory for TY2026 and later for all filers except qualified small businesses taking the payroll-tax credit; refund-claim perfection transition period extended to Jan 10, 2027 | Yes [S] (BDO, RSM, IRS newsroom page located; I did not read final Form instructions) | https://www.bdo.com/insights/tax/irs-extends-transition-period-for-research-credit-refund-claims ; https://www.irs.gov/newsroom/irs-extends-the-period-for-feedback-on-form-6765 |
| Tax Court demands contemporaneous records: George v. Commissioner, T.C. Memo. 2026-10 (poultry, not software); Little Sandy Coal (7th Cir.) substantiation backdrop | Yes [S] | Search result summaries (taxnotes / Journal of Accountancy); not opened |
| IFRS IAS 38: research expensed; development capitalized only when 6 criteria met (technical feasibility, intent, ability to use/sell, future benefit, resources, reliable measurement); not retroactive | Yes [S] | https://www.learnsignal.com/blog/ias-38-intangible-assets-practical-guide/ |

Corrections to the brief's assumptions: ASU 2025-06 was issued Sept 2025 with effective date FY2028 (not 2026); Section G is optional for TY2025, mandatory TY2026; the §174A small-business retroactive window has already closed (July 2026).

## 3. The AI-agent twist (most important new finding)

- Deloitte DART "Technology Spotlight: Accounting for AI Costs Associated With Internal-Use Software Development" (Aug 3, 2026) [P]: https://dart.deloitte.com/USDART/home/publications/deloitte/industry/technology/accounting-ai-costs-associated-internal-use-software-development
  - "A token-based charge is not capitalizable merely because it is measurable."
  - Token cost for generating/testing code on an identified project during the capitalization period may be capitalized; maintenance, research, production-support usage is expensed.
  - Prepaid credits sit as an asset, relieved as consumed; only credits used on identified qualifying projects capitalize.
  - Subscription tied to one project and team: can capitalize. Subscription across projects: "more akin to a shared technology cost or overhead-like expense"; allocating by headcount or hours doesn't make it a direct cost.
  - "The availability of usage data does not necessarily serve as sufficient evidence." Needs billing reports, project-management records, tickets, and controls linking usage to projects. If mixed-purpose usage cannot be reliably separated, the combined cost may not be capitalizable.
  - EY also published an AccountingLink (ey-tl32248-261us, 2026-09-24) on the topic; found by search, not opened: https://www.ey.com/content/dam/ey-unified-site/ey-com/en-us/technical/accountinglink/documents/ey-tl32248-261us-09-24-2026.pdf
- §41 treatment [S, practitioners; "no IRS guidance on AI in this context"]: cloud GPU/compute for qualifying work is the strongest case (computer-rental QRE under §41(b)(2)(A)(iii)); API tokens "can qualify" but an examiner may view them as payment for a finished service ("Taxpayers should document how the tool was used"); SaaS seats need allocation; owned hardware depreciation is not a QRE; contractors using AI fall under the 65% contract-research rule. Caveat quoted: when AI produces workable code, "it becomes harder to argue" technological uncertainty existed, so qualified percentage may fall as AI spend rises. Sources: https://news.bloombergtax.com/daily-tax-report/claiming-r-d-tax-breaks-for-ai-costs-requires-precise-records ; https://sourceadvisors.com/blogs/rd/ai-token-and-cloud-computing-costs-as-qualified-rd-expenses/
- Implication: agent spend needs a per-project, per-activity ledger. Seat-level Copilot/Cursor admin dashboards (e.g., Cursor Teams keeps ~30 days history, per Torii [V]) do not provide this. This is the new, unserved evidence problem.
- Scale of agent spend [S/U, blogs]: DX estimates $200-600/engineer/month total; CloudZero reports $500-2,000/month token spend per engineer in one reported case; Uber's 2026 AI coding budget reportedly exhausted by April (secondhand). https://getdx.com/blog/ai-coding-assistant-pricing/ ; https://beancount.io/blog/2026/07/27/ai-coding-tool-spend-tracking-guide

## 4. Demand evidence table

| Signal | Type | Number | Source |
|---|---|---|---|
| Federal R&D credit tax expenditure | 1 (market size) | JCT: $188.9B FY2025-2029 for the credit; $104.1B for R&E expensing (JCX-45-25 per CRS) | https://www.congress.gov/crs-product/R48848 (403 to my fetch; figures via https://www.everycrsreport.com/reports/R48848.html and search summary) |
| Last IRS SOI claim data I could retrieve | 1 | 2014: $12.6B claimed; Information sector 17%, professional/technical 10%, manufacturing 59%. No newer SOI numbers found [gap] | https://www.everycrsreport.com/reports/R48848.html |
| Software share of private R&D-credit-provider claims | 1 | Boast: software/internet = 80.6% of 6,907 claims from 2,298 companies; avg claim $768,233; 6.59% audited (software 5.28%) [V, selection-biased] | https://lite.aol.com/tech/story/0022/20260326/9679167.htm |
| Credit-study provider fees | 1 | Strike 20% contingency; Arvo/Clarus annual fee + 20% of credit; Neo.Tax 10% (7.5% via Capbase, undated) or "2% of QREs" (Capterra, conflicting); Swanson Reed (competitor) says 15-25% typical | https://www.striketax.com/journal/how-to-choose-an-r-d-tax-credit-provider ; https://capbase.com/our-partnership-with-neo-tax ; https://www.swansonreed.com/research-tax-credit/faqs/what-is-the-standard-contingency-fee-for-rd-tax-credit-advisors/ |
| Engineering-analytics capitalization module pricing | 1 | Jellyfish avg ~$84K/yr, max ~$406K (Vendr); LinearB Essentials $29/user/mo (published; sources conflict) | https://www.vendr.com/buyer-guides/jellyfish-co ; Pensero/G2 summaries via search |
| Funding: Onshore (formerly SPRX) | 2 | $31M Series B, Feb 2026, led by FPV Ventures (Vertex, ADP Ventures, YC); total ~$46M; claims 28-day studies vs 270 days [V] | https://ventureburn.com/onshore-raises-31m/ ; https://pulse2.com/onshore-31-million-series-b-raised-for-ai-based-tax-platform/amp/ |
| Funding: Neo.Tax | 2 | $10M Series A Feb 2022 (Infinity Ventures, GV, Acrew, Lux...); CB Insights lists $12M Series A-II 3/12/2025 [U, single source]; Feb 2026 HN job post says "preparing for a Series B", 7-person eng team, $190-210K, building software capitalization product; "help companies like Notion, Mercury, Brex, and Whoop" [V] | https://techcrunch.com/2022/02/10/neo-tax-raises-10m-to-help-startups-get-rd-tax-credits/ ; https://news.ycombinator.com/item?id=46862175 |
| Funding: Taxnova | 2 | $1M pre-seed Feb 2026, a16z Speedrun; connects GitHub, Jira, Linear, Slack, Notion; Top-5 advisory firm pilot [V] | https://fintech.global/2026/02/04/taxnova-joins-a16z-speedrun-after-1m-pre-seed-raise/ |
| Funding: Jellyfish | 2 | $71M Series C Feb 2022 (Accel, Insight, Tiger); totals $43.5M-$114.5M conflict [U] | https://jellyfish.co/newsroom/jellyfish-raises-71-million-series-c-funding-led-by-accel-insight-partners-and-tiger-global/ |
| Funding: Boast | 2 | $100M (Boast Capital/venture debt-type) and $23M Series A (older) | https://venturebeat.com/business/boast-ai-secures-100-million-to-help-startups-claim-rd-tax-credits |
| Hiring | 2 | Humans doing the job: Deloitte "Tax Software Specialist - Credits & Incentives"; EY "R&D Software Engineer STEM Senior Analyst"; Cherry Bekaert R&D credit/§174 associates; KBKG specialists; Amazon in-house "Tax Analyst, R&D Tax Credit" (Hyderabad). No counts retrievable; no in-house "capitalization analyst" postings found [gap] | https://apply.deloitte.com/en_US/careers/JobDetail/Tax-Software-Specialist-Credits-Incentives/325861 |
| Material weaknesses tied to capitalized software | 3 | Historic only: Schawk FY2007 10-K (internal-use software costs), Ceridian 2004 ("system for tracking costs that qualify for capitalization needs improvement"), Jack Henry SEC comment 2013. No 2025-26 examples found [gap] | https://www.sec.gov/Archives/edgar/data/0000719164/000095013708006124/c25746e10vk.htm ; https://www.sec.gov/Archives/edgar/data/0001124887/000095013405003409/c89555e10vq.htm |
| Audit scrutiny trend | 3 | Taxnova claims UK enquiry rates rose 0.5% to 20% in 3 yrs [V, UK]; KPMG 2026 "Research credit audits: updates and considerations" exists (PDF unreadable to my tool) ; IRS historically refers internal-use-software exams to MITRE (via search summary) | https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/2026/research-credit-audits-updates-and-considerations.pdf |
| DIY / internal workaround | 4 | HN "rootusrootus": "My company has spent the last few years really going 1000% on the capitalization of software expenses" - leads to extra required Jira fields at a 5,000-person company | https://news.ycombinator.com/item?id=46315991 |
| Spreadsheet guesswork | 4/5 | Maestro-quoted VP Eng (100+ engineers): "I go through and guess on allocations of people when I do these exercises, which is not fun or very realistic." [V, vendor-selected] | https://getmaestro.ai/use-cases/rd-tax-credits-capitalization |
| Timesheet resistance | 4 | HN poster jjazwiecki (Ask HN, Sep 2024): "companies with strong engineering cultures don't focus on time tracking, unless they're billing clients by the hour" ; only 1 reply (low engagement) | https://news.ycombinator.com/item?id=41641620 |
| Reddit practitioner thread | 4 | r/Accounting: "I've been tasked with creating a checklist and cost tracking list for determining if a software asset ... can be capitalized" (IFRS/IAS 38); 2 score / 5 comments; r/Accounting "Software project capitalization" thread. Low engagement; full text not retrievable (reddit fetch blocked) | https://reddit.com/r/Accounting/comments/1i133ho/checklist_and_cost_tracking_for_intangible_asset/ ; https://reddit.com/r/Accounting/comments/1e7dqvp/software_project_capitalization/ |

## 5. Pain points (ranked)
1. Engineers' time is not tracked, so allocation is reconstructed after the fact. Evidence: Maestro quote above [V]; Allstacks: "Engineering leaders spend too much time with auditors and finance while ignoring their day jobs" and developers resist time tracking [V] https://www.allstacks.com/blog/what-is-rd-software-capitalization ; HN rootusrootus (custom Jira fields imposed company-wide).
2. Defensibility: Section G (TY2026 mandatory), refund-claim substantiation up front, and Tax Court insistence on contemporaneous records (George, T.C. Memo. 2026-10 [S]).
3. New: AI agent spend cannot be attributed to projects; Deloitte says usage data alone is insufficient, mixed-purpose usage may be wholly non-capitalizable [P].
4. Cost and misaligned incentives of credit consultants: 20%+ contingency fees; boilerplate narratives; audit-defense bundled only by some (Strike page [V]).
5. Rule churn: GAAP stage model vs ASU 2025-06 transition choice (3 methods); IFRS entities use different six-criteria test; state conformity to §174A varies [S].

## 6. Incumbents and gaps

| Player | What | Price / funding | Complaint or gap |
|---|---|---|---|
| Jellyfish DevFinOps | Classifies capitalizable work from Jira/Git; SOC 1 Type II claimed; Salsify testimonial "audited twice" [V] | ~$84K avg/yr (Vendr); $71M Series C 2022 | Per-contributor pricing compounds (Tempo, competitor [V]); no independent evidence of auditor acceptance; no AI agent spend ledger found |
| LinearB | Splits each day equally across touched issues; published pricing | ~$29/user/mo [conflicting] | Jellyfish says no SOC 1, manual setup [V] |
| Allstacks, Maestro | "Ditch the timesheets"; auto-categorize | pricing not public; Maestro funding not found | Marketing only; no customers quoted |
| Swarmia, DX | Not capitalization-focused (Swarmia "intentionally light on financial reporting" [V]); DX sells AI cost/ROI benchmarks | n/a | gap for finance-grade output |
| Neo.Tax | R&D credit + ASC 350-40 capitalization + §174; ingests Jira/GitHub/payroll/org data; targets enterprise tax teams and auditors | ~$10-25M raised [U]; Series B in prep | Most direct competitor to the "evidence from Jira/GitHub" idea; moving upmarket |
| Onshore (SPRX) | AI R&D credit studies, business-component-level | $31M B, Feb 2026 | Credit-only focus, expanding to other tax workflows |
| Taxnova | Evidence trails from GitHub/Jira/Linear; sells alongside advisors | $1M pre-seed | Very early; UK-heavy |
| Boast, Strike, alliantgroup, Leyton, Big 4 | Services + software, contingency fee | 20%-ish | Slow (Onshore: 270 days traditional [V]); sampling-based estimates |
| ClickTime and timesheet tools | Timesheet-based documentation for 350-40 and §41 | n/a | Engineers resist timesheets |

Gap summary: nobody I found offers (a) a per-project AI-agent/token ledger that outputs capitalization journal entries and §41 computer-rental/supply schedules, (b) a controller-grade ASU 2025-06 "probable-to-complete" decision log, or (c) a cheap self-serve product for the 50-300 employee company that cannot afford Jellyfish ($84K) and is too small for Big-4.

## 7. Candidate startup ideas

### Idea A: AgentLedger - AI-agent spend attribution to capitalizable projects (ASC 350-40 + §41)
- Pitch: Connect Claude Code/Cursor/Copilot/Codex usage APIs, GitHub, and Jira/Linear; attribute every token and credit to a project and activity (new feature vs maintenance vs research); output a monthly capitalization schedule, prepaid-credit roll-forward, and §41 supply/computer-rental QRE workpaper with evidence links.
- Buyer: Controller / VP Finance / technical accounting lead at 100-2,000 employee software companies (CFO sponsor); secondary buyer, Head of Eng Productivity.
- Why now: Deloitte Aug 2026 and EY Sept 2026 guidance say usage must be linked to projects; agent spend is $200-2,000/engineer/month [S]; ASU 2025-06 early-adopt decisions; Section G mandatory TY2026.
- Why not in-house: requires reconciling multiple vendor billing/usage APIs with project systems and keeping auditor-grade logs; finance teams lack engineering capacity; internal Jira-field mandates (HN example) already show attempts are painful.
- Why AI-durable: the problem is created by AI coding adoption; Anthropic/OpenAI/Cursor dashboards report per-seat or per-key usage, not accounting-project attribution, and vendors will not produce GAAP workpapers across competitors' tools. Risk: model vendors add project tags (partial mitigation: cross-vendor and Jira join remain).
- Wedge MVP (4-6 weeks): ingest Anthropic/OpenAI admin usage exports + GitHub PR metadata + Jira ticket-type; heuristic PR-to-ticket-to-project join; CSV/PDF capitalization schedule with sample-level evidence packets. No SOC 2 on day 1 using read-only exports from design partners.
- Strongest 3 demand signals: (1) Deloitte DART Aug 2026 explicit requirements for usage-to-project linkage; (2) DX/CloudZero spend figures showing material dollars [S]; (3) Jellyfish ($84K ACV) and Neo.Tax show finance buys capitalization evidence.
- Biggest risk: capitalizable AI spend is small relative to salaries today (tokens $500-2,000/engineer/month vs ~$15K+/month loaded salary), so it must be a feature of a broader capitalization product to reach ACV; Neo.Tax/Jellyfish can add it in a quarter.
- Self-score: A 12/20, B 13/20, C 16/20, D 10/15, E 8/10, F 11/15 = **70**. (Harsh note: Demand evidence for the AI-specific wedge is guidance-driven, not purchase-driven; 62-65 is more defensible.)

### Idea B: Controller-grade capitalization evidence for mid-market (the brief's idea)
- Pitch: Automatic Jira/GitHub-derived capitalization and R&D credit evidence packs for 50-1,000 employee software companies, priced $15-40K/yr.
- Buyer: Controller/CFO, 50-1,000 employees.
- Why now: ASU 2025-06, §174A, Section G, Tax Court emphasis on contemporaneous records.
- Why not in-house: auditors want repeatable, reviewable method; engineers resist time tracking.
- Why AI-durable: moderate; LLMs can classify tickets, but the audit trail, controls, and credibility are the product.
- Wedge MVP: Jira+GitHub classification, quarterly allocation report, PDF evidence pack.
- Signals: Neo.Tax Series B prep and hiring; Onshore $31M; Jellyfish $84K average contracts; Maestro/Allstacks/Taxnova all targeting it.
- Biggest risk: crowded with funded players; Neo.Tax is explicitly doing this (enterprise-first, SOC 2); buyers may prefer Jellyfish (already installed) or their CPA firm.
- Self-score: A 15, B 11, C 11, D 11, E 9, F 11 = **58**.

### Idea C: Section G business-component evidence builder for R&D credit providers and CPA firms
- Pitch: White-label SaaS that pulls Jira/GitHub/Linear evidence per business component (uncertainty, experimentation, qualified time) and populates Form 6765 Section G for advisors.
- Buyer: Practice leader at regional CPA / R&D credit boutique (10-200 staff) serving software clients; fee per study ($500-3,000) or per seat.
- Why now: Section G mandatory TY2026 (filing season 2027); data collection claimed as ~75% of study time [V, Taxnova].
- Why not in-house: advisors lack engineering integrations; small firms cannot build.
- AI-durable: workflow, integrations, and evidence storage stay; narrative drafting is commoditized but is not the moat.
- Wedge MVP: GitHub/Jira connector + business-component narrative generator + Section G export in Excel/PDF.
- Signals: Section G rule change (IRS IR-2025-99); Deloitte/EY/Cherry Bekaert hiring analysts to do this manually; Onshore/Taxnova raising to automate it.
- Biggest risk: advisors are slow adopters and may build with Onshore/Neo.Tax APIs; channel sales cycle; study volume seasonal.
- Self-score: A 13, B 12, C 12, D 10, E 7, F 11 = **55**.

### Idea D: ASU 2025-06 transition and probable-to-complete decision log
- Pitch: Workflow that records management authorization, funding commitment, and "significant development uncertainty" assessments per project, linked to engineering milestones, so controllers can show auditors their threshold judgments and compare transition methods.
- Buyer: Technical accounting manager / Controller at private software companies.
- Why now: early adoption possible; FY2028 mandatory.
- Weaknesses: urgency is 12-18 months away; likely absorbed into Idea B; ASU designed to ease burden ("not expected to require significant time or costs" per BDO).
- Self-score: A 8, B 8, C 12, D 6, E 8, F 12 = **54** (as standalone, more like 45; best as a module).

### Idea E: Sample-testing assistant for auditors (reperformance of capitalization and R&D credit support)
- Pitch: Give mid-tier audit/tax-defense teams a tool that re-derives allocations from client Jira/GitHub exports and flags unsupported capitalization.
- Buyer: Audit senior manager / R&D credit exam defense lead.
- Risk: independence concerns, long sales cycle, no evidence of purchase intent; speculative.
- Self-score: A 6, B 7, C 11, D 4, E 6, F 9 = **43**.

## 8. Best idea from this domain
Idea A (AgentLedger) as the wedge, expanding into Idea B/C: it is the only item with a genuinely new, AI-created evidence requirement that the Big 4 (Deloitte Aug 2026, EY Sept 2026) just made explicit, and which Jellyfish/Neo.Tax/Onshore have not publicly addressed (I found no AI-spend-to-capitalization feature on any of them, but my search was shallow; verify before committing). The generic version (Idea B) is crowded and Neo.Tax is already doing it enterprise-first.

Honest verdict: eng-finance scores roughly 58-65 vs ContextOps 56, only if the AI-agent ledger is the entry point. Main doubt: small dollars in agent spend today and whether buyers will pay a standalone price.

## 9. Gaps (not verified)
- Latest IRS SOI claimant counts and dollars (only 2014 found) and software-specific share; number of annual claimants not retrieved.
- Final text of ASU 2025-06 and Form 6765 instructions were not read directly (PDF extraction failed); relied on BDO, Singer Lewak, RSM, BDO tax summaries.
- No verbatim controller/CPA quotes from r/Accounting, r/CPA (Reddit archive failed or fetch blocked); only vendor-selected quotes and one HN comment.
- No job-posting counts; no 2025-26 material weakness examples for capitalized software.
- Neo.Tax 2025 round, customer list (Brex, Whoop), and SOC 2 status unverified; MainStreet R&D-credit shutdown status not found; Capitalize-type startups beyond those listed not found.
- Contingency fees for alliantgroup and Leyton not published.
