# Phase 2: ICP, Go-to-Market and Pricing for "FinOps for AI Coding"

Date: 2026-10-13. Context: Phase 1 scored this idea 56/100 (idea01.md). The problem is real, but DX/Atlassian, Jellyfish, Faros, Larridin, Span and the native vendor consoles already ship cross-vendor cost per PR. This document therefore assumes the down-market wedge: orgs with 20-300 engineers, 2+ AI coding tools and no SEI platform. It is sold on savings, not on dashboards.

Labels: [S] = cited source. [A] = my assumption (change it). [V] = vendor-sourced or secondary, treat with caution. Where I found no source I say so.

---

## 1. Segment sizing

### 1.1 Inputs

| Input | Value | Source |
|---|---|---|
| US software developers (SOC 15-1252), May 2025 | 1,687,890 | [S] BLS OEWS via https://www.michigan.gov/mcda/labor-market-information/michigans-labor-market-news/2026/10/08/software-developers-focus |
| Developers using AI tools | 50.6% of professional devs daily; 84% of all respondents using or planning to | [S] https://survey.stackoverflow.co/2025/ai |
| Share using multiple tools at once | 70% of Pragmatic Engineer readers use 2-4 tools, 15% use 5+ | [S, skewed reader sample] https://newsletter.pragmaticengineer.com/p/ai-tooling-2026 |
| Work-use by tool (JetBrains AI Pulse, Jan 2026, 10k+ devs) | Copilot 29%, Cursor 18%, Claude Code 18% | [V/secondary, via search summary; verify at JetBrains] |
| Median billed AI-coding spend | ~$213/week (~$920/month) per engineer who merged code and had billed spend; p90 ~$911/week. Larridin calls it a floor | [V] https://larridin.com/data and https://www.saastr.com/saastr-ai-app-of-the-week-larridin-the-median-engineer-now-bills-213-a-week-in-ai-coding-tokens-larridin-tells-you-what-it-bought/ |
| Token cost as share of engineering headcount cost | ~2-10%, up ~10x in 6 months | [V] Larridin blog (see its data page) |
| Per-engineer caps in the wild | Uber $1,500/employee/month/tool; Atlassian wallets $500-2,000/month; one CTO caps at $5,000, a peer SVP at $200 | https://www.beri.net/article/uber-2026-ai-budget-burned-token-billing-crisis (secondary), https://thenextweb.com/news/atlassian-ai-wallets-tokenmaxxing, https://www.cloudzero.com/blog/engineer-ai-spend-5000-per-month |
| Pragmatic Engineer reader reports | $200/dev/month blocked at a games studio; seed-stage 7 devs went ~$200 to ~$3,000/dev/month; finance firm's $100/user limit gone in 3-5 days; $1,400 in one day on one engineer | [S] https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets |
| Ramp AI Index | Top 1% of AI-adopting companies spend ~$7,500/employee/month on AI (all AI, not only coding) | [V/secondary]; verify at Ramp |

Gaps I could not fill from public sources:
- No source gives the count of companies with 20-300 engineers. Census CBP (NAICS 5112 and 541511 by employee size class) and LinkedIn Sales Navigator are the places to get it. The search tool could not retrieve either.
- No independent, credible figure for the share of inactive Copilot seats. The best I found is GitHub's own inactive-user workflow (remind at 30 days, revoke after 30 more): https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/remind-inactive-users. Hivel's "utilization" claims are an unsourced vendor pitch. Do not put a seat-waste percentage in a deck until our own design-partner data produces one.
- No survey I found directly reports "% of orgs paying for 2+ AI coding vendors". Pragmatic Engineer's 70% is the best proxy and it is biased upward.

### 1.2 Bottom-up math (all assumptions [A])

Step 1: companies.
- Assume 25% of US developers sit in companies whose engineering org is 20-300 people: 1,687,890 x 25% = ~420k engineers.
- Assume 70 engineers on average: 420k / 70 = **~6,000 US companies**.
- Global multiplier 2.5x [A, no source] = **~15,000 companies**.
- Sanity check: Carta sees roughly 1,100-1,400 new US venture rounds a quarter across all stages (https://carta.com/data/state-of-private-markets-q3-2025/). Funded startups are only one slice of 20-300-engineer orgs. 6,000 is plausible but unverified; replacing it with Census/LinkedIn counts is task one.

Step 2: serviceable segment (US, 2+ paid tools, API-accessible admin plans on GitHub/GitLab, no SEI platform).
- 2+ paid AI coding vendors: 50% [A] (Pragmatic Engineer's 70% is skewed; JetBrains per-tool shares of 18-29% imply large overlap but not universality).
- Uses GitHub/GitLab plus Team/Enterprise plans with admin APIs: 70% [A].
- Not already on DX/Jellyfish/Faros/LinearB: 70% [A].
- SAM companies = 6,000 x 0.5 x 0.7 x 0.7 = **~1,470 US companies** (~103k engineers).

Step 3: price. Per-active-user $6-8/month (section 3). At 70 engineers, ACV ~ $5-6.7k/yr.
- TAM (US, all 6,000) = 6,000 x ~$6k = **~$36-40M/yr**. Global (15,000) = **~$90-100M/yr**.
- SAM (US, 1,470) = **~$8-10M/yr**.

Step 4: savings view (the actual pitch).
- Assume blended mid-market AI coding spend of $250/engineer/month [A] (far below Larridin's $920 median, which skews to heavy users and enterprise).
- 70 x $250 x 12 = **$210k/yr per company**.
- Assume addressable waste of 15-25% [A, unvalidated; the number design partners must confirm or kill] = $31k-$52k/yr avoidable.
- A 10-20% savings share = $3k-$10k/yr, about equal to per-seat ACV. So both models converge at roughly $5-10k ACV for a 70-engineer company. That is small and does not support a field sales team.

Step 5: SOM (3 years, student team, PLG/OSS).
- Year 1: 3-5 paying design partners at ~$5k = $15-25k ARR.
- Year 2: 25-40 customers at ~$7k = $175-280k ARR.
- Year 3: 80-120 customers at ~$8k = **$0.6-1.0M ARR**, i.e. 5-8% of US SAM at the high end.
- That is a good indie/seed-scale outcome, not a venture-scale one. The venture case needs up-market movement (300-1,000 engineers, $30-50k ACV per idea01) or becoming a data layer for other products. Be honest with any investor.

Sensitivity: if only 25% of firms run 2+ tools, SAM halves to ~$5M. If real waste is 5% rather than 15-25%, there is nothing to sell on savings and the product reduces to a dashboard DX already ships.

---

## 2. Personas

| Persona | Role in the deal | Triggers | Objections |
|---|---|---|---|
| **VP Eng / CTO (Series A-C, 30-300 eng)** | Economic buyer and signer. Under ~100 engineers also champion and user. | Surprise bill; CFO or board asking "what did we get for the AI spend"; vendor renewal (Cursor, Copilot, Claude Team/Enterprise); move from seats to metered pricing (Copilot per-request billing from June 1, 2026 per https://tech-insider.org/ai-coding-tools-pricing-metered-2026/ [V]). Gartner's Nitish Tyagi: leaders find token spend "harder to justify, with budgets often being depleted earlier than expected" (https://cfotech.co.uk/story/gartner-warns-ai-coding-costs-may-top-developer-pay-by-2028). | "Native consoles are free" (Anthropic spend report, Cursor groups, Copilot cost centers). "I don't want to slow adoption" (several Pragmatic Engineer respondents say leadership will not throttle). "Another vendor wanting admin keys and repo access" (security review). "AI is 2-10% of headcount cost, not worth a tool." |
| **Head of Platform / DevEx / Dev Productivity** | Champion and primary user: connects keys, owns rollout, builds the report. Often already maintains the manual spreadsheet (e.g. a Dev Productivity Lead reporting spend monthly at a ~2,000-person SaaS, Pragmatic Engineer pulse above). | Asked to build chargeback; building an internal gateway or wallet (Atlassian; the Reddit "central API gateway" commenter in idea01); needs evidence for policy (caps, model allowlists). | "We can build this in a sprint from vendor APIs and OTel." This in-house script is the biggest competitor. "Do not rank individuals." |
| **FinOps practitioner / finance partner** | Influencer and co-owner of the budget line. Dedicated FinOps staff exist mostly at 150+ engineer firms; at 20-100 it is the CFO or an ops lead. FinOps Foundation: 98% of FinOps teams manage or expect to manage AI spend, up from 31% two years earlier (https://www.linuxfoundation.org/press/state-of-finops-survey-ai-value-and-skills-top-priorities-as-finops-matures-across-technology-value-98-manage-ai-90-saas-64-licensing-48-data-center-1). | Month-end close with an unattributable "AI" line; chargeback by cost center; forecast variance. | "Must tie to invoices, not estimates" (estimated vs billed accuracy is a real risk). "Already in our FinOps platform (Finout, Harness, Vantage, Datadog)." |
| **Engineering manager** | User, not buyer. Consumes team-level budget views and alerts. | Told their team is over budget; wants to justify team spend; approves limit bumps (the CloudZero post describes a $200 cap, self-bump of $100, then manager approval). | "Surveillance of my team." "No time for another dashboard." Must arrive in Slack/email and be useful in under 2 minutes a week. |

Deal shape: at 20-100 engineers the VP Eng/CTO is signer, champion and user. At 100-300 there is usually a Platform/DevEx champion plus finance sign-off above a procurement threshold. Keep ACV under ~$10k [A] to stay in card/no-procurement territory and offer read-only billing/analytics keys only, to delay the security questionnaire.

The real competition per Phase 1 is build vs native console vs a bundled SEI module, not any single named startup.

---

## 3. Pricing benchmarks and recommendation

### 3.1 Benchmarks

| Vendor | Model | Data point | Quality |
|---|---|---|---|
| ProsperOps (cloud commitments) | % of realized savings ("Savings Share") | Third-party estimates 30-35%; not published | [V] https://prosperops.com/pricing, https://help.prosperops.com/how-does-prosperops-bill, https://spendark.com/blog/prosperops-alternative/ |
| nOps | Savings-share positioning (AWS); rate not found | Free savings analysis as hook | [V] https://www.nops.io/blog/prosperops-pricing/ |
| Vantage, CloudZero, Finout | Subscription / quote-based; no savings-share found | n/a | [V] https://aicoolies.com/comparisons/prosperops-vs-cloudzero-vs-finout |
| Kubecost (OSS wedge) | Free tier (250 cores, 15-day retention); Business from $449/month | | [V] https://www.finout.io/blog/kubecost-pros/cons-pricing-tutorial-alternatives-2026-guide (competitor source) |
| Swarmia | Per developer; reports range $25-55/dev/month; Vendr: $286-433/dev/yr at 50 devs | Conflicting | [V] https://www.vendr.com/marketplace/swarmia, https://sacra.com/research/swarmia |
| LinearB | ~$30/dev/month Pro; free to 10 devs | | [V] https://toolradar.com/tools/linearb/pricing |
| Jellyfish | Custom; ~$95k average annual contract (Sacra) | | [V] https://toolradar.com/tools/jellyfish/pricing |
| DX | Custom; Vendr median $53,760/yr (range $21.2k-$129k, 111 purchases) | | [V] https://www.vendr.com/marketplace/dx |
| Span | ~$24/dev/month (Sacra); Vendr median $51.9k/yr (range $18.7k-$162k) | Larridin claims ~$45; conflicting | [V] https://www.vendr.com/marketplace/span |
| Faros | From $29/contributor/month (published); higher tiers quote-based | | https://faros.ai/pricing |
| Larridin | From $25,000/yr, annual contract | | [V] https://larridin.com/compare/larridin-vs-jellyfish/ |
| Exceeds AI | Claims "outcome-based pricing under $20,000/yr" | Unverified, vendor blog | [V] https://blog.exceeds.ai/span-app-pricing-2026 |

Takeaways:
1. SEI tools cluster at $25-55/dev/month and $20-130k/yr realized contracts; their AI-cost modules are the bundled comparison.
2. Pay-on-savings is proven for cloud commitments (ProsperOps) because savings are mechanical and verifiable. AI-coding waste is only partly mechanical: a reclaimed seat is verifiable, a "model downgrade" saving is counterfactual. Apply percent-of-savings only to the verifiable categories (reclaimed/downgraded seats, plan consolidation, overage stopped against an agreed baseline).
3. At 70 engineers there is only ~$30-50k/yr to save [A], so the absolute price ceiling is low.

### 3.2 Recommendation (savings-linked door-opener plus a floor)

| Tier | Price | Who / why |
|---|---|---|
| **Free / OSS** | Open-source CLI with local report. Hosted free up to 25 engineers, 1 tool plus read-only billing, 30-day history | Wedge, trust, design-partner pipeline (Kubecost free-tier and LinearB free-to-10 patterns) |
| **Team** | $6 per active AI-tool user per month (not per seat held, so we do not tax the waste we remove), minimum $150/month. 2+ tools, Slack digests, EM budgets, anomaly alerts, CSV chargeback | 20-150 engineers; ~$5k/yr at 70 users; below procurement thresholds |
| **Savings share** (alternative to Team) | Free to start; 15% of verified, realized savings for 12 months, capped monthly, with a $150/month floor after month 3 | Fits "sold on savings". Verified = seat reclaims, plan changes, stopped overage vs a pre-agreed baseline, with the calculation shown transparently (attribution disputes are the usual failure mode; my inference, not sourced) |
| **Business** | $12 per active user per month; SSO, audit log, policy enforcement (caps, model allowlists), Jira/Linear outcome join, API; min $10k/yr | 150-300+ engineers, finance-led buyers |

Rationale: per-active-user stays well under SEI list prices ($24-55) and bundles easily; savings share is a risk-free door-opener for design partners; the free tier feeds the OSS funnel. Revisit at 10 customers: if savings share closes faster and renews, make it the default.

---

## 4. Go-to-market

### 4.1 OSS wedge case studies
- **Infracost** (cloud cost in PRs): open source from late 2020; ~4,000 stars at seed (Sequoia, YC, SV Angel; ~$2.2M per SDBJ), later a $15M Series A led by Pruven; 3,500+ companies reported using the platform; revenue and customers up more than 4x in the year to the Series A (https://www.infracost.io/blog/infracost-sequoia-seed/, https://www.sdbj.com/technology/infracost-raises-15m-series-a/). The founder calls stars a feedback loop and VC top-of-funnel (https://www.infracost.io/blog/github-stars-matter-here-is-why/). Series A date is inconsistent across sources (2024 vs 2025). Lesson: it works because the CLI sits in the PR workflow engineers already use.
- **OpenCost / Kubecost**: OpenCost is the CNCF open-source core; Kubecost sold the commercial layer and was acquired by IBM in Sept 2024, terms undisclosed (https://blog.kubecost.com/blog/ibm-acquisition-announcement). Forrester says Kubecost lost share to Finout/Vantage/CAST AI and that acquisition "was the only path forward" (https://www.forrester.com/blogs/ibm-vies-for-positioning-as-the-de-facto-finops-solution). Lesson: OSS gives distribution, not a durable moat; suite acquisition is a realistic exit (an acqui-hire is plausible for a student team too).
- **Counter-evidence**: idea01 found many Show HN AI-spend trackers with 1-3 points (items 48767736, 47391414, 45894242, 47308185). A bare CLI is not enough; it needs a vivid hook (a dollar-savings number) and a distribution event.

### 4.2 Channels for a student team

| Channel | Why it fits | How to use it |
|---|---|---|
| **Open-source `ai-spend` CLI** (reads local Claude Code logs plus Cursor/Copilot admin APIs; prints "you could save $X") | No procurement, builds trust, produces leads | GitHub Action posting AI cost per PR (Infracost pattern); opt-in "claim your org dashboard". 90-day goal [A]: 500 stars, 50 orgs running it |
| **Show HN, Reddit r/ClaudeAI / r/cursor, dev.to** | Cost pain is hot | Lead with original data or a tool, not a pitch; use mainly to recruit design partners |
| **FinOps Foundation community and Slack** | 98% of FinOps teams own or expect AI spend | Post a cost-allocation template for AI coding; offer free audits. Reaches practitioners at 150+ engineer firms |
| **Rands Leadership Slack, LeadDev, CTO/EM Slacks** | Where EMs and VPs Eng ask how others budget Cursor/Claude | Answer questions; run an anonymous benchmark survey and publish results (a data asset like Larridin's) |
| **Pragmatic Engineer audience** | Already covers the topic (token-spend pulse) and collects reader reports | Offer benchmark data; do not expect coverage without original data |
| **Product Hunt** | Weak for B2B finance buyers | Optional CLI launch for backlinks only |
| **University and alumni networks** | Warmest source of the first 3-5 design partners. YC: first customers usually come from people you know (https://www.ycombinator.com/blog/ycs-essential-startup-advice/) | Alumni who are VP Eng/CTO at 20-300-engineer startups |
| **Vendor marketplaces** (GitHub App/Action) | Discovery | Optional; vendors may ship the same feature |
| **Outbound LinkedIn/email to VP Eng at Series A-C** | Direct | Use a "free savings analysis" offer (the nOps/ProsperOps hook); slow for students, do after proof points |

### 4.3 First 90 days
- Days 0-14: hand-build 5 cost reports; run 15 interviews (script below); recruit 5 design partners (alumni, Slack, warm intros); replace section 1 assumptions with Census/LinkedIn counts.
- Days 15-45: ship OSS CLI v0 (Claude Code local logs, Cursor and Copilot admin APIs, seat-utilization and top-outlier report, no PR join yet). Install at 3-5 partners with read-only keys; deliver a "first savings report" to each. Metric: dollars of identified waste per partner.
- Days 46-75: add PR join (GitHub label and session timestamps) and Slack digest; publish an anonymized benchmark ("what N teams spend on AI coding and what was wasted") with partner permission; Show HN.
- Days 76-90: ask each partner to convert (Team or savings share). Target 2-3 paid and 5+ qualified inbound conversations; evaluate against kill criteria.

### 4.4 First 10 customers
1-5: design partners from alumni and warm network (30-120 engineers, 2+ tools). 6-8: inbound from the CLI, FinOps Foundation, Rands/LeadDev threads and the benchmark. 9-10: partner referrals. Price low or savings-share early, and trade for a written case study and permission to quote.

---

## 5. Design partner plan and interview script

### 5.1 Plan
- Target 5 partners with 30-200 engineers, 2+ tools, a named owner of the AI budget, GitHub. Exclude firms already running DX/Jellyfish AI cost modules.
- Give: free service for 90 days, a weekly waste report, founder access. Get: read-only billing/analytics keys, a weekly 30-minute call, a letter of intent to pay a stated price if savings exceed a threshold (e.g. 5x the fee), and permission to publish an anonymized benchmark.
- Success per partner: waste found above a pre-agreed dollar amount; EM budget views used weekly; at least one decision changed (seat removed, plan consolidated, cap set).
- Do it manually first (YC: get early customers by any means, even unscalable ones): analyses in a notebook, delivered as a PDF, before building product.

### 5.2 Interview script (10 questions, 30 minutes; ask about past behavior)
1. Walk me through the last time someone asked what you spend on AI coding tools. Who asked, and what did you do?
2. Which tools do you pay for (Claude Code, Cursor, Copilot, Codex, others), on what plans, who owns each contract, and when are renewals?
3. What did you spend last month in total? How did you get that number and how long did it take?
4. Have you had a surprise bill, an overrun, or a cap exhausted early? What happened next?
5. What controls exist today (per-user caps, groups, cost centers, an internal gateway)? What do you dislike about them?
6. How do you know which seats or users are not using their tool? What have you done about it?
7. Does finance, the CEO or the board ask for ROI or chargeback on AI tools? What would a satisfying answer look like?
8. Would you build this, use the vendors' consoles, or buy something? What have you already evaluated (DX, Jellyfish, Faros, Larridin, Finout, Datadog) and why did you stop?
9. If a tool found $20k of avoidable spend in month one with no upfront cost, how would you want to pay (flat, per engineer, share of savings)? What number is clearly worth it and what makes you walk? Who else must approve, and what security review do read-only billing keys need?
10. Would you commit to a 90-day pilot next week, and sign an LOI to pay the discussed price if savings are proven? If not, what is missing? Who else should I talk to?

Score each interview: pain recency (last 90 days), workaround effort, budget owner named, price tolerance, pilot commitment.

---

## 6. Kill criteria

Stop or pivot (for example into idea #2 cost-of-delivery or idea #10 routing) if, after 20 qualified interviews and 90 days:
- Fewer than 8 of 20 describe a spend problem from the last 90 days with a named budget owner.
- Fewer than 3 of 5 design partners provide keys and meet weekly.
- Measured addressable waste is below 8% of AI spend, or below ~$10k/yr per 70-engineer company (product cannot cover its price and acquisition cost).
- Fewer than 2 partners sign an LOI or pay at 70-engineer-equivalent ACV of at least $3k/yr.
- 3 or more interviewees say native consoles or an existing SEI suite are "good enough" for reasons our product does not change.
- A first-party release removes the cross-vendor gap (Anthropic, Cursor or GitHub cross-vendor view, or DX's report bundled free into the SMB segment). Re-evaluate immediately.
- No path to ACV above ~$10k by month 12 (up-market or extra modules), since $5-7k ACV does not support any sales motion.

---

## 7. Evidence that buyers will pay (and caveats)

Spend pressure:
- Gartner: AI coding costs may exceed average developer pay by 2028. Tyagi: "Software engineering leaders are increasingly concerned as token-driven AI spend becomes harder to justify, with budgets often being depleted earlier than expected"; "Most organisations still lack the maturity and frameworks to effectively measure cost versus business impact." https://cfotech.co.uk/story/gartner-warns-ai-coding-costs-may-top-developer-pay-by-2028
- Uber: reportedly used its 2026 AI budget in about four months; $500-2,000/month per heavy user; cap $1,500/employee/month/tool (The Information/Bloomberg via secondary https://www.beri.net/article/uber-2026-ai-budget-burned-token-billing-crisis; primary sources not opened).
- Atlassian: AI wallets of $500-2,000/month with warn-then-stop. https://thenextweb.com/news/atlassian-ai-wallets-tokenmaxxing
- Pragmatic Engineer readers: "Some developers are now spending $500 a day (!!) on Claude Code"; "We have already had to raise our API budget limits multiple times in April"; $100/user limit gone in 3-5 working days; ~$10K in a week from a caching mistake. https://newsletter.pragmaticengineer.com/p/the-pulse-token-spend-breaks-budgets
- CloudZero (a FinOps vendor with an interest): 25x gap between a $5,000 and a $200 monthly cap; leaders who cannot answer the CFO's ROI question will have a limit "chosen for them"; its banner stat "87% of finance leaders are raising AI budgets they can't justify" is unverified. https://www.cloudzero.com/blog/engineer-ai-spend-5000-per-month
- FinOps Foundation: 98% of FinOps teams manage or expect to manage AI spend, up from 31% (link in section 2).
- Larridin: tokens at 2-10% of headcount cost, ~10x in six months [V].
- Adjacent market money: Span $25M raise, DX/Atlassian acquisition (~$1B per idea01), Weave reportedly $13.5M (non-primary). Published prices: Faros $29/contributor/month, Larridin from $25k/yr, Vendr medians for DX and Span ~$52-54k/yr. Companies pay for adjacent tools, but at the larger-company end.

Missing or weak (be honest):
- No credible public statistic on inactive Copilot/Cursor seat share. Pitch the audit, not a percentage.
- Willingness to pay for a standalone AI-spend tool is unproven: Show HN trackers get 1-3 points; the strongest buyer evidence is at 500+ person firms that build in-house (Atlassian, Reddit gateway commenter).
- Several respondents say budget "is not the concern right now" and leadership will not slow adoption, which weakens a savings-led pitch in 2026 and favors a visibility-led one.
- Vendor-sourced data (Larridin, Hivel, Exceeds, CloudZero, Finout) dominates. Prefer our own design-partner measurements.

Conclusion: the pain is real and quantified, the segment is likely a few thousand US companies, but unit economics at 20-300 engineers (~$5-10k ACV) only work with a PLG/OSS motion and low-touch sales. The design-partner phase is the experiment that decides whether the waste percentage in section 1 is real.
