# Verification: "AI-agent spend ledger for capitalization" (AgentLedger)

Date: 2026-10-13. Labels: [P] firm/primary page actually retrieved, [S] secondary, [V] vendor, [U] unverified. About 25 tool calls. Quotes below were retrieved by WebFetch (a small model summarizes the page, so quotes are as returned, not independently re-read against the page).

## 0. Verdict in five lines
- The accounting premise is real and now in print: Deloitte DART (Aug 3, 2026) says token cost is capitalizable only if linked to a specific project and activity, and that usage data alone is not sufficient evidence. PwC (Q3 2026 controller piece) and EisnerAmper say the same direction [PwC and EisnerAmper via search/fetch summaries; PwC page itself returned 403].
- The demand evidence for a STANDALONE product is guidance only. I found zero public companies disclosing capitalization of AI tool costs, zero earnings-call mentions of it, zero controller/CFO posts asking for a tool, and one throwaway HN comment ("Why couldn't they capitalize token spend?").
- The money is small today and only becomes material at heavy agentic spend (see sizing). Section 174A (immediate expensing restored) removed the biggest tax pressure to document AI spend as R&E.
- Incumbent check: Jellyfish ships "AI Spend Insights" (Aug 2025) and a separate "Software Capitalization" module, but I found NO shipped link between the two. That is a real gap, but it is a feature gap an incumbent can close in a quarter.
- Scores: standalone AgentLedger 52/100; combined "ContextOps = AI spend governance (Eng) + capitalization evidence (Finance)" 61/100. Worth pursuing only as the Finance module of ContextOps, not as a separate company.

## 1. Primary text

### 1a. Deloitte DART, "Technology Spotlight: Accounting for AI Costs Associated With Internal-Use Software Development", Aug 3, 2026 [P]
URL: https://dart.deloitte.com/USDART/home/publications/deloitte/industry/technology/accounting-ai-costs-associated-internal-use-software-development
Verbatim (as returned by fetch):
- "A token-based charge is not capitalizable merely because it is measurable."
- "a fixed or subscription-based charge is not necessarily noncapitalizable merely because it is not billed by usage."
- "The payment for usage credits is initially recorded as a prepaid asset and relieved as the AI services are received."
- Minimum commitments: "the payment may function economically as a fixed fee for access to AI services."
- Example 4: "The fixed monthly capacity charge is not associated with any specific project." (expensed as overhead)
- Cites ASC 350-40-30-1: "Fees paid to third parties for services provided to develop the software during the application development stage." and: "Fees paid to third parties for use of AI do not automatically constitute a new category of capitalizable cost."
- Evidence: usage data "does not necessarily serve as sufficient evidence to identify costs eligible for capitalization." "Sources of evidence may include AI-platform reporting or billing details, project-management systems," plus tickets and project-accounting records.
- The search-result summary of the same page (not the fetch) adds: a fixed-term coding-tool subscription bought for one project can qualify if access is restricted to the project team; credits used for maintenance, production support, research, training, general productivity are expensed.

### 1b. The cloud-computing-arrangement (CCA) question, answered precisely
- Deloitte's spotlight does NOT use the terms "cloud computing arrangement", "service contract", or "implementation vs usage fees" (fetch result: "The article does not address these arrangement types directly"). The first pass implied it did; it does not.
- The right framing: the AI tool is a hosted service the company consumes, but the relevant guidance is not the ASU 2018-15 CCA implementation-cost model (which governs costs of implementing a hosting service the entity uses). It is ASC 350-40's treatment of external direct costs of services consumed in developing the entity's OWN internal-use software (30-1 above). So the live question is "are these third-party fees for services used to develop our software on an identified project", not "implementation vs subscription".
- Where CCA language does appear: EisnerAmper (https://www.eisneramper.com/insights/technical-accounting-advisory/accounting-for-ai-data-consumption-cost-0726/) [S, fetched]: in a SaaS arrangement the customer "accounts for the implementation cost in accordance with ASC 350-40 and ASU 2018-15", while "the ongoing subscriptions to the services and usage fees are typically expensed as incurred." This is about SaaS the company implements (e.g., a data platform), which is the opposite default from Deloitte's dev-services case. Practical consequence: auditors may start from "usage fees are expensed" and the company must argue the dev-services exception. That raises the evidence bar, which helps the product but shrinks the capitalized amount.
- EisnerAmper also: "the AI token usage needs to be tracked in granular detail" and "The standard requires a clear link between the direct cost incurred and the software asset created", and "Hands-on project management is essential for software projects to identify and track token consumption by project phase."

### 1c. Other firms
- EY: AccountingLink ey-tl32248-261us (2026-09-24) exists per first pass. The PDF returned as binary to WebFetch and I have no PDF library, so I could NOT read it. Search surfaced no EY text on tokens. [U]. URL: https://www.ey.com/content/dam/ey-unified-site/ey-com/en-us/technical/accountinglink/documents/ey-tl32248-261us-09-24-2026.pdf
- PwC: "Q3 2026: What controllers need to know for quarter end", https://www.pwc.com/us/en/services/audit-assurance/national-office/q3-2026-closing-statements.html. My fetch got 403. Only the search-engine summary: broad enterprise-wide AI subscriptions "should typically be expensed as incurred"; incremental costs for coding agents, API usage, tokens, or dedicated AI development services "may be capitalized if they are project-specific, measurable, and incurred after the capitalization threshold is met"; "AI may be doing more every day, but it doesn't rewrite the accounting rules; it does raise the bar on documentation." [S/U, not verbatim-verified]
- KPMG: Feb 2026 handbook update covers ASU 2025-06 and AI development; hot topic https://kpmg.com/kpmg-us/content/dam/kpmg/frv/pdf/2026/hot-topic-software-data-costs-frv.pdf, PDF unreadable. [U]
- RSM: nothing found. Crowe: article exists (https://www.crowe.com/insights/accounting-for-ai-implementation-costs), 403 to fetch; summary says ASU 2025-06 principles-based model; whether it helps AI projects "will depend on how entities apply it" [S].
- Net: Big-4 direction is consistent (project-specific, documented, after threshold). Nobody says a tool-generated attribution is sufficient or insufficient; that is a gap, see kill risks.

## 2. Size of the prize

### 2a. What do public companies capitalize today
- Procore FY2025 10-K (https://www.sec.gov/Archives/edgar/data/1611052/000162828026011055/pcor-20251231.htm): gross capitalized software $285.5M vs $205.2M prior year; net $142.2M; SaaS-platform amortization $48.8M. R&D expense about $362.4M per an aggregator (macrotrends, not verified against filing) [S]. Additions to capitalized software are about $80M gross-change, or about 20%+ of R&D (my arithmetic from the gross balance change; includes acquisitions possibly). So Procore capitalizes in the low 20s % of R&D. Heavy-capitalizer example.
- WM Technology: capitalized $13.6M (2025) and $11.6M (2024); Haemonetics: $7.7M and $6.6M [from 10-K search summaries]. R&D denominators not retrieved.
- I did not complete a clean set of "capitalized as % of R&D" for 5+ SaaS names (search tool would not return the ratio). Rule of thumb from filings I know of in this area: wide range, roughly 0-30% of R&D; many SaaS companies capitalize little. [U, from memory, not verified here].

### 2b. Spend per engineer (inputs)
- CloudZero (https://www.cloudzero.com/blog/ai-coding-tools-cost) [V]: "Between $10 and $200 per developer per month in subscriptions", "Vendor-published consumption benchmarks put realistic agentic usage at $100 to $250 per developer monthly", Anthropic "roughly $13 per developer per active day across enterprise deployments". Article does not mention capitalization.
- Gartner, June 24, 2026 via CFOtech (https://cfotech.news/story/gartner-warns-ai-coding-costs-may-top-developer-pay-by-2028) [S]: AI coding costs expected to exceed average developer salary by 2028. No per-dev dollar figure given in the article.
- Broader token-heavy cases (Uber budget exhausted in four months; Salesforce $300M Anthropic tokens) are secondhand [S/U].

### 2c. EBITDA arithmetic (my model, not sourced)
Assume 200 engineers, loaded cost $200K => $40M engineering cost/yr.
| AI spend / eng / mo | Annual AI spend | % of eng cost | If 40% is capitalizable (new-build, identified project) | EBITDA uplift |
|---|---|---|---|---|
| $250 (CloudZero typical) | $0.6M | 1.5% | $0.24M | +$0.24M (0.6% of eng cost) |
| $1,000 | $2.4M | 6% | $0.96M | +$0.96M |
| $2,000 (heavy agentic) | $4.8M | 12% | $1.9M | +$1.9M |
Notes: EBITDA rises only in the capitalization year (amortization sits below EBITDA); cash and tax are unchanged. Capitalized tokens are a rounding error next to capitalizing salaries (a company already capitalizing 20% of $40M gets $8M). So the AI line is 3-25% of the total capitalization pot only if spend is $1,000+/eng/mo. The audit risk of the AI slice (Deloitte: mixed use can be wholly non-capitalizable) is high relative to the dollars, so many controllers will simply expense it. That is a rational outcome.
- Tax: §174A (https://www.bakertilly.com/insights/domestic-research-expenditures-section-174-under-obbba) restored immediate domestic expensing, so AI tokens are deductible regardless. The §41 credit angle is at most ~6-10% effective credit on a small, contestable base (practitioners say examiners may view API tokens as payment for a finished service) [S per first pass]. Tax need is weak.

### 2d. Does any public company disclose capitalizing AI tool costs
Not found. Searches for earnings-call transcripts returned commentary on token costs and analysts asking about token expense (Corporate Counsel July 28, 2026 summary of a Bloomberg report, https://www.thecorporatecounsel.net/blog/?p=59364 [S]) but no CFO saying "we capitalize tokens". Only advocacy: Broadcom ValueOps blog urging capitalization to protect adjusted EBITDA (https://valueops.broadcom.com/blog/accounting-best-practices-for-ai-use-in-software-development) [V]. 10-K full-text search was not run (no tool for EDGAR FTS); this remains a gap.

## 3. Do incumbents already do this
| Player | What ships (verified) | AI-spend-to-capitalization? |
|---|---|---|
| Jellyfish | Press release Aug 26, 2025 (https://jellyfish.co/newsroom/end-to-end-ai-impact-sdlc/): "AI Spend Insights", "real-time, usage-based spend data", "tie AI spend directly to outcomes to determine ROI at the team, individual, and initiative level". Nav lists "AI Token Cost Management" and "Software Capitalization" (under DevFinOps: "Align with Finance and automate financial reporting"). Claude Code dashboard page (https://jellyfish.co/platform/claude-code-dashboard/): "links Claude Code usage and spend to delivery outcomes"; no capitalization mention. | Not shipped as far as public pages show. Both halves exist in one platform and "initiative" is the join key, so the integration is a small engineering step. HIGHEST threat. |
| Neo.Tax | R&D credit, ASC 350-40 capitalization, §174 from Jira/GitHub/payroll/org data | No AI-token feature found. Thomson Reuters ONESOURCE integration exists. |
| Onshore | $31M Series B, credits only | None found |
| Maestro, Allstacks, DX, Swarmia, LinearB | marketing pages only | search found nothing at all on token capitalization |
| CloudZero / Vantage | allocate AI vendor spend "to the teams, products, and features that generated it" (CloudZero) [V] | cost allocation yes, GAAP workpaper no |
Caveat: this is a 5-query search, not a product-by-product docs audit. Absence of evidence.

## 4. Buyer voice (thin)
- Nothing from Journal of Accountancy, CFO Dive, CFO.com or WSJ CFO Journal surfaced for AI coding tool accounting. LinkedIn not searchable via WebSearch.
- HN: "Why couldn't they capitalize token spend?" by piker, on the JetBrains net-loss thread, https://news.ycombinator.com/item?id=49978363. One comment, no replies. This is the only direct "capitalize token spend" community mention I found, and it is a pundit not a controller.
- HN former CFO andrewlgood (https://news.ycombinator.com/item?id=44231537): "The FASB accounting rules drive the capitalization of software expenses, not the tax rules"; GAAP "demands significant detailed tracking"; auditors enforce; without a complete "paperwork/digital audit trail" a firm can't capitalize. Supports pain with auditor-grade trail, but pre-AI and not about tokens.
- HN rootusrootus and jjazwiecki threads from first pass remain the only DIY signal (https://news.ycombinator.com/item?id=46315991, https://news.ycombinator.com/item?id=41641620). `rsearch.py` queries "capitalize engineering", "ASC 350-40", "software capitalization", "R&D tax credit software" returned 0-1 relevant stories. HN "section 174" has huge engagement (2,439 points on item 44226145) but is about the now-reversed tax rule.
- Ladder summary: level 1-2 evidence exists for generic capitalization (Jellyfish $84K ACV, Onshore $31M, Neo.Tax Series B prep) but level 1-4 evidence for AI-token capitalization specifically is essentially zero. Level 5 only: Big-4 guidance and Broadcom marketing.

## 5. Kill risks
1. Auditors accepting automated attribution. Unknown. Deloitte lists acceptable evidence ("AI-platform reporting or billing details, project-management systems", tickets) but also says usage data alone is insufficient. No firm says tool-generated attribution suffices. Automated attribution is reproducible but a PR-to-ticket heuristic is not a "direct cost" tie; auditors will likely test samples, which favors good evidence packets over automation claims. Risk: medium-high. Also, no auditor-acceptance proof exists even for Jellyfish (first pass: Salsify "audited twice" is a vendor testimonial).
2. Too small to matter. High risk. See 2c; at $250/eng/mo it is 0.6% of engineering cost in EBITDA uplift; materiality thresholds mean many controllers will expense (and Deloitte/PwC both say shared/enterprise seats are expensed anyway). It matters only at $1,000+/eng/mo AND for companies that already capitalize (public or PE-backed, adjusted EBITDA-sensitive). That is a smaller buyer set than "all software companies".
3. Jellyfish ships it. Moderate-high. Both components live in one product; no technical blocker; they already sell to finance. Probability of announcement in 2 quarters: my estimate 30-40%; I have no source.
4. ASU 2025-06 timing: mandatory FY2028 (annual periods beginning after Dec 15, 2027), so urgency is 12-18 months out, and the new "probable to complete" model is expected to lower burden [first pass, BDO].
5. Model vendors adding project tags / cost allocation to their admin APIs shrinks the integration moat; cross-vendor + Jira join remains.
6. Tax motive weakened by §174A.

## 6. Scores (harsh, round 1 rubric)

### Standalone AgentLedger (AI spend capitalization ledger): 52/100
| | Pts | Reason |
|---|---|---|
| A Demand (20) | 8 | Guidance-driven demand only; no buyer asking, no company disclosing, no budget line. Generic capitalization demand is real but is not this product. |
| B Sellable (20) | 8 | Small dollars at typical spend; controller would put it in a spreadsheet or ask Jellyfish. Not clearly an in-house impossibility, but a monthly journal-entry export is easy to DIY. |
| C AI-durable (20) | 14 | Problem exists because of AI coding; cross-vendor neutrality helps; vendor project-tagging and Jellyfish are real threats. |
| D Evidence (15) | 7 | Strong primary accounting text, no demand evidence. |
| E Buyer (10) | 7 | Controller/technical accounting lead is specific; but only capitalizing companies with heavy AI spend. |
| F Feasibility (15) | 8 | Usage APIs + GitHub/Jira join is a 4-6 week MVP, but auditor-grade evidence and controls (SOC 1-ish) are not a student MVP, and credibility with finance is the product. |
Sum = 52.

### Combined: ContextOps = AI coding spend governance (Eng) + capitalization/R&D evidence (Finance): 61/100
| | Pts | Reason |
|---|---|---|
| A Demand (20) | 13 | Spend-governance demand is real (Gartner, Uber, CloudZero spend figures [S/V]); capitalization adds a second budget holder without standalone proof. |
| B Sellable (20) | 11 | Two-buyer story (VP Eng + Controller) raises ACV and justifies a purchase over DIY; still crowded (Jellyfish, CloudZero, DX). |
| C AI-durable (20) | 13 | Spend attribution survives; Anthropic/Cursor dashboards still lack cross-vendor project join, but Jellyfish bundles. |
| D Evidence (15) | 8 | Guidance plus spend data; no purchase evidence for the finance half. |
| E Buyer (10) | 8 | CFO sponsor increases willingness to pay; sales cycle is longer. |
| F Feasibility (15) | 8 | ContextOps already attributes spend to tickets/PRs (docs/STRATEGY.md per brief), so a capitalization export is incremental (weeks), but auditor credibility is slow. |
Sum = 61. Round 1 gave ContextOps 56; the finance module adds about 5, mostly via buyer and sellability, not demand.

## 7. Recommendation
- Do NOT build a standalone capitalization ledger. Add a "Finance export" to ContextOps: per-project/activity AI spend roll-forward (prepaid credits), Deloitte-style evidence packet (billing record + ticket + PR + project authorization date), with explicit "mixed-use / not eligible" flags. Cheap, differentiates against Jellyfish/CloudZero for a quarter or two.
- Validate before building: (1) interview 5 controllers at companies that already capitalize (Series C+ SaaS, PE-backed) and ask whether they currently capitalize AI spend and what their auditor said; (2) ask an audit senior whether a PR/ticket-linked usage report would be accepted as evidence; (3) check Jellyfish's changelog monthly.
- Gaps: EY/KPMG/Crowe/PwC primary text unread (PDF/403); no EDGAR full-text search for "tokens" + "capitalized"; no clean set of capitalized-software/R&D ratios; no LinkedIn/CFO-press voices.
