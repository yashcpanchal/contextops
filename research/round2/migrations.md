# Round 2: Code migrations, tech debt and legacy modernization

Scout notes. Date 2026-10-13. About 20 tool calls. All figures below come from search-result summaries unless marked [primary]. I did not open most primary pages, so treat "secondary" items as unverified.

## 1. Domain overview
- Migration money is real and large, but it is dominated by system integrators (Accenture, Infosys, TCS, Cognizant) and by the model labs and clouds now bundling "agentic" migration (AWS Transform, Anthropic's COBOL and large-migration posts).
- Venture money has flowed to the *execution* layer (Moderne $30M, Mechanical Orchard $50M, Endor Labs $93M). The execution layer is the part most exposed to Claude Code, Copilot and AWS Transform.
- The *management* layer is thinly served and what leaders complain about: estimating, tracking progress across hundreds of repos, and proving a migration is done. Evidence there is mostly big-company engineering blogs (Google, Uber, Airbnb), not purchase data.
- Biggest threat to any idea here: February 2026 showed that one Anthropic blog post wiped about 13% off IBM in a day. Execution-side migration tooling is not AI-durable. Verification and governance might be.

## 2. Demand evidence table

| Signal | Ladder | Number | Source |
|---|---|---|---|
| Moderne Series B (Acrew lead; Morgan Stanley, Amex Ventures, TIAA Ventures, Allstate, Intel Capital), Feb 2025. Customers claimed: Allstate, Choice Hotels, Walmart, five top NA banks; customer base +250% in 2024 (company claim) | 2 | $30M | https://fintech.global/2025/02/12/moderne-raises-30m-series-b-to-accelerate-ai-powered-code-transformation/ and https://www.intelcapital.com/moderne-secures-30m-to-drive-billions-in-enterprise-code-modernization-savings-based-on-its-innovative-tech-used-by-aws-microsoft-and-broadcom-ai-assistants/ |
| Mechanical Orchard Series B (GV lead), Aug 2024; Series A $24M Feb 2024 (Emergence), $95M valuation | 2 | $50M (+$24M) | https://pulse2.com/mechanical-orchard-50-million-series-b-raised-to-help-companies-transition-away-from-legacy-software |
| Honeycomb acquired Grit (migration agent; seed $7M Founders Fund) Apr 2025; standalone product sunset | 2 (exit, but as acqui-hire for instrumentation) | undisclosed | https://www.honeycomb.io/blog/honeycomb-acquires-grit-and-expands-leadership-team-to-accelerate-customer-value-and-enterprise |
| Endor Labs Series B Apr 2025 (DFJ Growth), $163M total | 2 (adjacent: dependency risk and auto-fix) | $93M | https://www.maginative.com/article/endor-labs-raises-93m-to-safeguard-ai-generated-code/ |
| Chainguard Series D Apr 2025 at $3.5B valuation | 2 (adjacent) | $356M | https://news.crunchbase.com/venture/biggest-funding-rounds-chainguard-supabase/ |
| Pixee (automated vuln fixes) round 2025 | 2 | $15M (dates conflict across sources) | https://finder.techleap.nl/news/feed/pixee-ai-secures-15m-investment |
| Application modernization services market size (analyst-firm estimates, not Gartner/IDC; I found no Gartner/IDC figure) | 3 | about $13B to $25B for 2025; CAGR 14-17% | https://www.marketsandmarkets.com/PressReleases/application-modernization-services.asp |
| Bank of Ireland: Accenture chosen as delivery partner for 5-year modernisation (undated report) | 1 (SI contract) | about EUR 500M | https://fintechfutures.com/?p=615462 |
| Bank of America / Infosys corporate banking modernization (2019, unconfirmed) | 1 (old) | about $600M "believed" | https://www.fintechfutures.com/bankingtech/bank-of-america-embarks-on-corporate-banking-tech-modernisation |
| Infosys / Hertz: 3M lines COBOL to microservices with AI, "60% lower cost, 60% faster" (annual report; contract value not disclosed) | 5 [vendor] | n/a | https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/2025-26/hertz.pdf |
| AWS Transform year one: 4.5B lines of code processed, 1.69M hours saved (AWS claims) | 5 [vendor] | n/a | https://docs.aws.amazon.com/transform/latest/launchguide/aws-transform.html |
| Anthropic COBOL post (23 Feb 2026): IBM -13% in one day, largest drop since 2000; Indian IT stocks -5 to -7% | 3 (market belief that modernization fees compress) | about $27B market cap in a day | https://www.cio.com/article/4137185/anthropics-claim-that-ai-can-quickly-refactor-cobol-rattles-ibm-investors.html and https://cxotoday.com/daily-news/anthropics-offer-to-modernize-cobol-using-ai-triggers-double-digit-slide-for-ibm/ |
| McKinsey: CIOs say tech debt is 20-40% of tech estate value; 10-20% of new-product budget diverted to tech debt (n=50 CIOs, financial services and tech, >$1B revenue, July 2020) | 3 | n=50 | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-debt-reclaiming-tech-equity |
| McKinsey: worst-quartile tech-debt firms 40% more likely to have incomplete or cancelled modernizations | 3 | 40% | https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/breaking-Technical-Debts-vicious-cycle-to-modernize-your-business |
| Stripe Developer Coefficient (2018): about 17.3 h/week on maintenance and tech debt vs 13.5 h on features; est. $85B/yr global cost. Old; $300B/$3T figures could not be confirmed | 3 | 17.3 h/week | https://insights.dice.com/2018/12/06/technical-debt-bad-code-bigger-impact-think/ |
| Google: 39 migrations by 3 devs in 12 months, 595 changelists, 93,574 edits; self-estimated 50% time cut | 3 | see left | https://arxiv.org/html/2501.06972v1 |
| Veracode (via Pixee summary): 82% of orgs carry security debt, 60% critical debt (1.6M apps) | 3 (secondary) | 82% | https://www.pixee.ai/blog/vulnerability-remediation-statistics-2026 |
| Edgescan 2026: mean time to remediate high/critical app and API vulns 54.81 days | 3 | 55 days | https://edgescan.com/what-the-2026-vulnerability-statistics-report-tells-us-about-the-state-of-security |
| Percona survey: 97% of 300 US DB professionals run at least one end-of-support database | 3 | n=300 | https://www.digitaltoday.co.kr/en/view/104057/us-companies-97-percent-still-use-end-of-support-databases-why-they-cannot-switch |
| EOL deadlines forcing spend: Red Hat OpenJDK 8 full support ends 30 Nov 2026; .NET Framework 4.6.2 ends 12 Jan 2027; Oracle Java 8 extended support to Dec 2030 | 3 (deadline) | dates | https://endoflife.ai/article-java-eol-by-vendor and https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-framework |
| Jobs: contract COBOL/RPG migration roles (Workstate, 18-month GCP modernization, posted 2026-10-06; Societe Generale "migrate obsolete technologies" role). I could not count postings; the search tool gave anecdotes only | 2 (weak) | n/a | https://apply.workable.com/workstate/jobs/view/98102C29C9.md and https://careers.societegenerale.com/en/sg_careers_offers_entity/91935 |
| Thomson Reuters via AWS Transform: 1.5M LOC/month, "30% lower costs" (vendor-reported) | 5 [vendor] | n/a | https://docs.aws.amazon.com/transform/latest/launchguide/aws-transform.html |

Gaps: no Gartner/IDC spend figure retrieved; no per-seat or per-repo prices (Moderne is "contact us", Capterra/G2 list no price); no job-posting counts; no Vendr data.

## 3. Pain points ranked

1. **Proving it is done and nothing broke.** Verification is the sticking point in every AI-migration story. IBM's response to Anthropic: Rob Thomas, "Translation captures almost none of the actual complexity. The modernization challenge is not a COBOL language problem." (https://www.cio.com/article/4137185/anthropics-claim-that-ai-can-quickly-refactor-cobol-rattles-ibm-investors.html, as relayed in search summary). HN on Anthropic's Bun Zig-to-Rust post (https://news.ycombinator.com/item?id=48966044): commenters pushed back that merged is not shipped, and that "Nineteen regressions surfaced after merge" (as quoted from the article in comments). Mechanical Orchard sells exactly "continuous proof of successful migration" (pulse2 link above, secondary).
2. **Estimating.** Google's headline "50% reduction" is an engineer self-estimate, not a measured baseline (https://itpro.com/software/development/Ai-code-migration-Google). Airbnb's "1.5 years to 6 weeks" compares actuals to an estimate (secondary). HN estimate on Bun: "Some quick fermi estimates place it at between 15-100 years depending on how much automated tooling is used" (https://news.ycombinator.com/item?id=48966044). Nobody has a trusted effort model; McKinsey notes tech-debt remediation adds 10-20% on top of project costs.
3. **Tracking progress across hundreds of repos.** Real tools are home-grown: Uber's GodWit has a dashboard plus a Jira tracker for revisions (https://dpe.org/files/sessions/2022/2022_DPE_Summit_fast_not_furious_developer_experience.pdf); Google tracks by changelist count and a nightly-running system. This is a DIY signal (ladder 4) but I did not find a manager complaining in their own words; HN search for "tracking migration progress across repos" returned 0 hits. Honest gap.
4. **Long-tail dependency and framework debt that nobody owns.** HN, "Build It Yourself": "my day job, wherein we run scores of Spring Boot apps written in Java 8 that have pages of vulnerabilities from tens of dozens of dependencies, which are not easy to update because updating one library necessitates..." (https://news.ycombinator.com/item?id=42823179).
5. **Trust in vendor claims.** HN on Amazon Q's "4500 years" claim: "If it's OpenRewrite recipes (not just the AI) making those Java upgrades happen, then Amazon should say so." (https://news.ycombinator.com/item?id=41354591). Buyers have no neutral way to measure outcomes.
6. **Deadlines.** EOL dates (OpenJDK 8 Red Hat Nov 2026, .NET 4.6.2 Jan 2027) force budgeted work but are known years ahead and calendar-trackable for free (endoflife.date).

## 4. Incumbents and gaps

| Player | Funding / status | Notes |
|---|---|---|
| Moderne | $30M Series B, Feb 2025; OpenRewrite creator; enterprise-only pricing, not public | Executes recipes across thousands of repos; OpenRewrite is embedded in AWS Q/Transform, Broadcom, Copilot, so its engine is also distributed by competitors |
| Grit | $7M seed 2023; acquired by Honeycomb Apr 2025; standalone sunset | Cautionary: a migration-agent startup was absorbed as a feature |
| Mechanical Orchard | $74M total, $95M valuation at A | Mainframe rewrites with parity proof; services-heavy |
| AWS Transform | GA May 2025; free-ish with AWS usage | Mainframe, .NET, VMware; vendor claims only |
| Anthropic / Claude Code | Public COBOL and large-migration posts | Collapses execution moat; leaves verification/governance |
| IBM watsonx Code Assistant for Z, Google, Microsoft agents | not researched here | gap |
| Endor Labs, Chainguard, Pixee, Mobb | $93M, $356M, $15M, $5.4M | CVE remediation; crowded and security-budget funded |
| Renovate / Dependabot | free | Dependency PRs only; no program-level view |
| Sourcegraph Batch Changes | not researched | gap |
| SIs (Accenture, Infosys, TCS, Cognizant) | Cognizant claims 10,000+ mainframe specialists, 300+ live engagements [vendor]; no disclosed AI-modernization deal values found | Revenue under threat from AI per the Feb 2026 stock moves |

Gap users keep hitting: execution tools report their own success; nobody offers a vendor-neutral, cross-tool ledger of "which repos are migrated, verified, and how much effort it really took".

## 5. Candidate ideas

### Idea A: Migration Ledger (program-level tracker and "done" certificate)
- **Pitch:** Connect GitHub/GitLab orgs, define a migration (e.g. Java 8 to 21, Spring Boot 2 to 3, Jest to Vitest, log4j to X) as a detection rule; get a per-repo, per-team burn-down, owner nudges, and an evidence-backed "done" report (code signals plus build/deploy/runtime version proof) that auditors and VPs accept.
- **Buyer:** Director/VP Platform or Developer Productivity at a 500-5,000 engineer company; second buyer risk/compliance at banks and payments (the Visa-like world).
- **Why now:** Agents now generate migration PRs in bulk (Google, Airbnb, Anthropic), so the bottleneck shifts to review, tracking and proof. OpenJDK 8 and .NET 4.6.2 EOL dates fall within months.
- **Why not in-house:** Uber, Google built it in-house, so large firms do. Mid-size firms do not; they use spreadsheets (inferred, no direct quote found).
- **AI-durable:** Mostly. It is cross-tool, cross-repo state plus evidence; a model release does not provide the org's ledger. Bundling risk from IDP vendors (Backstage, Cortex, OpsLevel, Port scorecards; not researched here, from background knowledge) and Moderne.
- **Wedge MVP:** GitHub App that scans org repos for version/API signals (build files, lockfiles, GritQL/ast-grep rules), renders a burn-down, opens tracking issues. Weeks, public APIs only.
- **Top 3 signals:** Google/Uber DIY tracking infra; McKinsey 40% incomplete or cancelled modernizations; Anthropic-Bun commenters demanding verification.
- **Biggest risk:** No retrieved evidence of a buyer paying for tracking alone; Moderne or an IDP adds a dashboard.
- **Score:** A 11/20, B 11/20, C 13/20, D 7/15, E 6/10, F 11/15 = **59**.

### Idea B: Migration cost/effort estimator from a repo scan
- **Pitch:** Point at a codebase, get calibrated hours, risk hotspots and a quote-ready plan for an upgrade or rewrite.
- **Buyer:** Engineering manager or architect planning budget; also SIs bidding.
- **Why now:** Everyone says AI cut effort 50-80% with no baseline.
- **Why not in-house:** Rarely worth it.
- **AI-durable:** Weak; a coding agent can produce a plan or estimate directly.
- **MVP:** Static scan plus heuristics; needs calibration data we lack.
- **Signals:** Google 50% is self-estimate; Bun 15-100 yr Fermi guess; McKinsey 10-20% overrun. All pain, no spend.
- **Risk:** Estimates are unprovable and pre-sales only.
- **Score:** A 8, B 6, C 6, D 6, E 5, F 8 = **39**.

### Idea C: Behavioral-parity evidence for legacy rewrites (shadow traffic / characterization tests)
- **Pitch:** Capture production I/O of the old system, replay against the rewrite, and produce a diff report as the audit artifact.
- **Buyer:** Bank/payments modernization lead, $1B+ firms.
- **Why now:** AI makes the rewrite cheap; proof becomes the cost (IBM's rebuttal).
- **Why not in-house:** Mechanical Orchard does it as a service, which shows it is hard to DIY.
- **AI-durable:** Yes in principle.
- **MVP:** Not feasible for students: needs production data access, SOC2-class trust, mainframe environments.
- **Signals:** Mechanical Orchard $74M; IBM quote; Infosys/Hertz.
- **Risk:** Feasibility and sales cycle.
- **Score:** A 13, B 12, C 16, D 8, E 8, F 3 = **60**, but unbuildable for the team.

### Idea D: EOL and deprecation exposure radar
- **Pitch:** Map org SBOM/repos/infra to EOL dates and licensing costs (e.g. Oracle Java 8, .NET Framework), forecast spend.
- **Buyer:** CIO office, FinOps.
- **Why now:** Dated deadlines in 2026-27.
- **Why not in-house:** Mostly free (endoflife.date) plus Renovate.
- **AI-durable:** Moderate.
- **Signals:** Redress Compliance fees on Java 8 licensing; Percona 97%; Red Hat date.
- **Risk:** Feature of SCA/asset tools (Endor, Snyk, Sonatype).
- **Score:** A 9, B 8, C 11, D 7, E 6, F 12 = **53**.

### Idea E: "Merge confidence" for bulk migration PRs
- **Pitch:** Rank agent-generated migration PRs by regression risk using test coverage, blast radius and history, so reviewers approve in batches.
- **Buyer:** Platform team lead.
- **Why now:** Agents create PR floods; Dependabot-style ignored backlogs.
- **AI-durable:** Medium; Copilot/Claude review can encroach.
- **Signals:** Bun "19 regressions" thread; Dependabot-risk HN comments; Google reviewing/landing time counted.
- **Risk:** Mend, Renovate already have merge-confidence features (from background knowledge, not verified).
- **Score:** A 9, B 9, C 9, D 5, E 6, F 10 = **48**.

## 6. Best idea in this domain
**Idea A (Migration Ledger), with a banking/payments evidence angle borrowed from Idea C.** It is the only candidate that is feasible in weeks, targets the "tracking and proving done" pain the brief names, and gets more valuable as agents flood orgs with migration PRs. Be honest about its weakness: I found no purchase evidence for tracking alone (ladder 1-2 money is all on execution tools and SIs), and the domain overall scores only about 59 by my harsh rubric, probably not above ContextOps' 56 by enough to matter. Validate by checking whether Moderne, Cortex or OpsLevel customers keep a spreadsheet alongside, before committing.
