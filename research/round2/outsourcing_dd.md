# Round 2: Non-engineering buyers who pay to understand engineering work (outsourcing, tech DD, non-tech founders, capitalization)

Scout notes: about 14 tool calls. Reddit archive was rate-limited (429/timeouts) and WebFetch cannot open reddit.com, so r/Accounting, r/cto, r/Entrepreneur, r/SaaS gave nothing. Job-posting counts were NOT retrieved. Web-search summaries are secondary; items are marked [vendor] or [secondary].

## 1. Domain overview
- Four buyer groups with real budgets and no engineering literacy: outsourcing clients, PE/VC/M&A investors, non-technical founders, and CFO/finance teams (software capitalization).
- Money is moving in two of them: tech DD (consultants bill $15K-$150K per deal; Crosslake did 400+ in 2020) and capitalization (Jellyfish ~ $95K/yr, Neo.Tax, DX CapEx). Outsourcing is the biggest market by size, but I found no tooling spend there.
- Non-technical-founder "CTO audit" has maker signal (people building it) but near-zero buyer signal on HN.
- Biggest structural risk: DD is episodic and consultant-led (human trust is the product); capitalization is already contested by funded incumbents.
- The niche that looks most open: automated, evidence-based repo analysis ("what did we actually get / is this vendor delivering") for non-engineers, priced per engagement.

## 2. Demand evidence table
| Signal | Ladder | Number | Source |
|---|---|---|---|
| Crosslake completed 400+ technical DD projects (2020) plus 100+ post-close projects | 1 [secondary, from 2021 acquisition announcement via search summary] | 400+ projects/yr at one firm | https://www.gofractional.com/companies/crosslake |
| AKF Partners tech DD: Standard $25K-$40K, Expanded $40K-$75K | 1 [vendor price page] | $25K-$75K | https://akfpartners.com/services/technical-due-diligence |
| Empat tech DD: light $5-15K, standard $15-40K, deep $40-150K+; rule of thumb 0.3-0.7% of deal size | 1 [vendor] | $5K-$150K+ | https://www.empat.tech/blog/technical-due-diligence-investor-m-a-checklist-2026 |
| Reyem DD: $7.5K standard, from $15K extended (low-end entrants exist, so price pressure) | 1 [vendor] | $7.5K+ | https://www.reyem.tech/service/technical-due-diligence |
| Kolonell (EU): 8K-25K EUR over 2-4 weeks | 1 [vendor] | 8-25K EUR | https://kolonell.com/en/blog/technical-due-diligence-code-audit-cost-london-2026 |
| Jellyfish annual subscription ~ $95K, expands by module (Sacra estimate) | 1 [secondary estimate] | ~$95K/yr | https://sacra.com/chat/h/5ce186bb-d6e7-44ec-b17e-dc176186f4b1/ |
| Swarmia Vendr median contract $19,890/yr (8 purchases) | 1 | ~$20K/yr | https://vendr.com/marketplace/swarmia |
| PowerSchool saves 1,000 dev hours/month on capitalization time tracking; Optimizely 30 min/engineer/week; Iterable -98% time | 3 [vendor case studies] | 1,000 hrs/mo | https://jellyfish.co/case-studies/powerschool/ |
| Neo.Tax automates R&D credit + ASC 350-40 capitalization; $10M Series A Feb 2022 (GV, Infinity); customers named Notion, Mercury, Brex, Whoop; still hiring Dec 2024, Feb 2026, Jun 2026 (HN "Who is hiring", senior eng $190-210K) | 1-2 | $13M raised by 2022; hiring through Jun 2026 | https://techcrunch.com/2022/02/10/neo-tax-raises-10m-to-help-startups-get-rd-tax-credits/ ; https://news.ycombinator.com/item?id=48362254 |
| DX markets CapEx reporting from Jira (example org: 2,000 staff, $200M R&D spend) | 5 [vendor] | n/a | https://getdx.com/blog/maximize-rd-tax-savings-with-capex/ |
| AI DD adjacent funding: DiligenceSquared $5M seed (PE commercial DD), Veridue $4M pre-seed, Xapien $10M Series A (all non-code) | 2 [secondary] | $4-10M each | https://fintech.global/?p=234408 |
| Code-DD tool launches on HN: CodeDD (Show HN, 1 pt), Borehole (Show HN, 2 pts, ex-Amazon author doing DD "for years"), CodeJourney. No funding found. | 4 (weak) | 1-2 pts each | https://news.ycombinator.com/item?id=43026898 ; https://news.ycombinator.com/item?id=49962275 |
| IT outsourcing market $484B-$810B (2025) depending on analyst; software dev outsourcing ~$150B-$590B | 3 [secondary, definitions vary] | $0.5-0.8T | https://10pearls.com/blog/software-development-outsourcing-statistics/ |
| Non-technical founder "CTO audit" tool Ask HN: 1 point, 0 comments | 4 (negative) | 1 pt | https://news.ycombinator.com/item?id=44287529 |
| r/startups offshore-dev advice threads: 5 pts/36 comments, 4 pts/1 comment | 4 (weak-moderate) | 36 comments | https://reddit.com/r/startups/comments/1ojlo2v/i_will_not_promote_looking_for_advice_on_us_based/ |

NOT found: any outsourcing-vendor-verification SaaS with revenue; disputed-billing statistics; PE deal-volume figures (I did not retrieve one); job-posting counts for "technical diligence analyst" etc. (Crosslake lists recurring "Technical Due Diligence Consultant" openings on job boards, https://www.workingnomads.com/jobs/technical-due-diligence-consultant-crosslake-technologies-llc-823491, count not taken).

## 3. Pain points (ranked) with quotes
1. **Tech DD is slow, manual, consultant-hours.** Borehole author (HN): "I've done technical due diligence on acquisitions for years at Amazon. This is typically a very time consuming process, taking weeks to months of back and forth with technical interviews with engineers and poring th[rough]..." (truncated by my tool) https://news.ycombinator.com/item?id=49962275 . Same author's later post: "Most of what changes a deal is answerable from the repository" https://news.ycombinator.com/item?id=49954718
2. **Capitalization time tracking is miserable.** Jellyfish guide (secondary summary): agile "made accurate time tracking nearly impossible"; Jira-based approach "largely dependent how diligent the engineering team is." PowerSchool spent a full year validating before trusting automated data. https://jellyfish.co/case-studies/powerschool/ ; HN Ask thread on how companies do it had 3 pts and one reply (tracked hours only for grants), so little public discussion: https://news.ycombinator.com/item?id=41641620
3. **Hiring offshore devs without technical vetting.** r/startups: "Avoiding finding offshore developers through agencies. Chances are the guy vetting them isn't a dev himself, and gives crap candidates, like I got." https://reddit.com/r/startups/comments/1irqjrc/lessons_when_hiring_a_developer_i_will_not_promote/ . Another: "weighing whether to keep development entirely US-based or split ... How has communication and accountability compared?" https://reddit.com/r/startups/comments/1ojlo2v/i_will_not_promote_looking_for_advice_on_us_based/
4. **Non-technical founders lack visibility.** From the HN builder (not a buyer): founders "Have no visibility into where cloud infra costs are going (or why they're growing)" (paraphrase/short quote via fetch summary) https://news.ycombinator.com/item?id=44287529 . No buyer voices found.
5. **AI-generated code is a new DD unknown.** SIG: only a minority of orgs can say where AI-generated code sits [secondary summary] https://www.softwareimprovementgroup.com/blog/ai-and-private-equity/

## 4. Incumbents & gaps
- **Tech DD consultancies:** Crosslake, AKF, Sema/Black Duck-style audits, Corsis, Software Improvement Group, Clarkston, many boutiques. Pricing $7.5K-$150K+. Gap: weeks of human time, inconsistent output; low-end shops already at $7.5K-$15K so prices are compressing. Black Duck (formerly Synopsys) does OSS/licence audits for M&A (https://www.blackduck.com/blog/software-due-diligence-for-pe-vc.html). Tools: CodeDD, Borehole (tiny, unfunded as far as I found).
- **Capitalization:** Jellyfish (~$95K/yr, per-contributor pricing; allocation approach, may not satisfy a strict time-record requirement per Tempo comparison, https://www.tempo.io/blog/jellyfish-alternatives), DX CapEx, Swarmia (adding capitalizable-work classification), Neo.Tax (accountant/tax-led, funded). Gap: auditors' defensibility, cost for sub-200-engineer companies who cannot pay Jellyfish prices, Jira hygiene.
- **Outsourcing oversight:** no dedicated funded tool found. Competing "solutions" are dev-shop-side: Jira/Tempo timesheets, Upwork/Toptal time tracking, and fractional CTOs (human). Gap exists but demand not quantified.
- **Non-technical founders:** fractional CTO and "code audit" freelancers. Tool category unproven.

## 5. Candidate ideas

### A. Repo-evidence "vendor delivery audit" for outsourcing clients
- Pitch: connect read-only GitHub/Jira access the agency grants; get a plain-English monthly report of what the agency billed vs what shipped (commits, PRs, review rate, churn, bus factor, AI-generated share).
- Buyer: founder/COO/head of product at a 10-200 person company paying an agency or offshore team $10K-$100K/month.
- Why now: AI coding makes hours-billed vs output gaps wider and invisible; agencies themselves use Copilot while billing hourly.
- Not built in-house: buyer is non-technical; independence from the vendor is the product.
- AI-durable: the value is third-party attestation plus cross-client benchmarks, not summarization. Partially exposed (a founder can paste a repo into Claude).
- Wedge MVP: GitHub app + templated report, per-engagement $500-$2K or $300/mo.
- Top 3 signals: r/startups offshore threads (36 comments); $0.5-0.8T outsourcing market [secondary]; Borehole/CodeDD show the repo-only analysis is feasible.
- Biggest risk: no money-moving evidence found; buyers may just want a freelancer reviewer; agencies may block repo access.
- Score: A 8/20, B 12/20, C 11/20, D 5/15, E 6/10, F 12/15 = **54**

### B. Self-serve "AI-era tech DD" for small deals ($2K-$10K tier)
- Pitch: automated, evidence-based repo diligence report (review practices, key-person risk, licence/AI-code provenance, dependency risk) for search funds, micro-PE, angel groups and acquirers of sub-$10M SaaS.
- Buyer: partner/principal at a small PE/search fund, or acquisition lead at an SMB acquirer; also sellers pre-sale.
- Why now: consultancies' $25K+ minimums price out small deals; AI code provenance is a new diligence question; marketplaces (Acquire.com, searchfunders: https://searchfunder.com/post/technical-dd-code-infrastructure-controls-on-a-saas-company) show demand for cheap DD.
- Not built in-house: investors do 1-10 deals a year, episodic.
- AI-durable: access to the repo, a credentialed report that lenders/LPs accept, and benchmark dataset across deals. Chat LLMs can do a rough version, so trust/brand matters.
- Wedge MVP: read-only repo scan + git-history analytics + human reviewer sign-off, $1.5-5K.
- Signals: Crosslake 400+ DD/yr; AKF/Empat/Reyem price ladder $7.5K-$150K; Borehole/CodeDD exist but unfunded (suggests either early or thin market).
- Risk: low volume per customer, services-heavy (human sign-off), incumbents can discount down; HN tools had 1-2 pts, so buzz is thin.
- Score: A 12/20, B 12/20, C 11/20, D 8/15, E 7/10, F 12/15 = **62**

### C. Mid-market software capitalization without Jellyfish pricing
- Pitch: auditor-ready capitalization workpapers (ASC 350-40) built from Jira/GitHub, priced for 20-150 engineer companies.
- Buyer: controller/VP Finance at Series B-D SaaS.
- Why now: Section 174 restoration/changes and AI-assisted coding change allocation of dev time; finance teams still use spreadsheets.
- Not built in-house: auditors want defensibility, finance has no engineering data skills.
- AI-durable: moderate; requires auditor-accepted methodology and integrations.
- Wedge MVP: Jira export -> allocation rules -> journal-entry workpaper.
- Signals: Jellyfish ~$95K/yr; Neo.Tax raised $13M+, hiring through Jun 2026; PowerSchool 1,000 hrs/mo (vendor).
- Risk: crowded (Jellyfish, DX, Swarmia, Neo.Tax, plus Big-4 templates); needs accounting credibility; students lack it. Round 1 already found bundling by incumbents.
- Score: A 13/20, B 11/20, C 10/20, D 8/15, E 8/10, F 8/15 = **58**

### D. Non-technical founder "CTO in a box" monthly health report
- Pitch: monthly plain-English dev-team report for non-technical founders.
- Buyer: solo non-technical founder of a seed company.
- Evidence: the only HN post found has 1 point and 0 comments. Low willingness to pay, high churn, and ChatGPT-replaceable.
- Score: A 4, B 6, C 5, D 3, E 4, F 13 = **35**

## 6. Single best idea in this domain
**B (small-deal tech DD)**, ~62, but only as a weak recommendation. Why: it is the only candidate where I found consultants already billing real prices per engagement ($7.5K-$150K), a named firm doing 400+ engagements a year, and a hard-dollar buyer with episodic urgency. The AI wedge (repo-history analytics plus AI-code provenance) is real, and the MVP uses public git APIs. It still faces thin community buzz, services-heavy fulfillment, and a ceiling on repeat revenue. Honest overall: this whole domain scores around 55-62, near the Round 1 idea (56), not clearly above it. The strongest unanswered question is deal volume and willingness-to-pay at the sub-$10K tier; validate with 10 calls to search funders and small PE shops before building.
