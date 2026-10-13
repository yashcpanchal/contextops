# Idea #8: Consent-based impact ledger to perf/promo evidence

Evaluator: startup-evaluator agent (YC-partner / ex-VP Eng lens). Date: 2026-10-13. Rubric: `RUBRIC.md`.

## 1. The idea, expanded

**What it is.** An IC-owned "impact ledger" that connects to GitHub, Jira/Linear, Slack, Google Docs/Notion, incident tools and (newly) agent sessions. Every week it drafts 3-8 impact entries, each citing a PR, ticket, doc or thread. It explicitly surfaces glue work: reviews given, onboarding help, incident coordination, design-doc authorship and cross-team unblocking. The IC edits and approves the entries. Only approved entries flow to the manager. At review, promo or calibration time, the manager gets a cited evidence packet: an exec summary, 3-5 impact stories mapped to the career ladder, and a glue-work section. It covers the full period, which counters recency bias.

**Core workflow.**
1. The IC connects their accounts.
2. On Friday they get a Slack DM: "Here's your week, approve or edit."
3. The approved entries go into the ledger.
4. Each month, the manager sees an IC-curated digest.
5. At cycle time, the system generates the self-review and the manager's packet with citations, plus a calibration card per person.

**Wedge.** A free, bottom-up IC tool ("never write a brag doc again"), with a team plan for EMs at 50-500 engineer companies before review season.

**MVP (4-6 weeks).** GitHub plus Jira/Linear OAuth, a weekly LLM summarization with citations, an approve/edit UI, and a packet export (Markdown/Google Doc) mapped to a pasted career ladder.

**Moat (claimed).** A longitudinal, IC-approved record. That gives trust and consent positioning, and creates switching cost once 1-2 cycles of history exist. Career-ladder mapping and glue-work detection are the IP.

**Pricing.** Free for ICs. Team plan at $8-15/engineer/month, or roughly $20-40k/yr for a 200-engineer org. This benchmarks against Windmill at $10/user/mo and Lattice/15Five performance modules.

## 2. New research findings

**Incumbent HR suites shipped exactly this in 2025-2026.**
- **Lattice**, July 2026: "Evidence-based Review Drafts" powered by the Lattice Agent turn "months of performance signals" into complete review drafts. **Lattice MCP** in the Claude/OpenAI/Slack marketplaces lets users "draft, refine, and submit performance reviews" while combining Lattice data with Jira, Notion and Salesforce. Lattice claims reviews were completed 47% faster (vendor claim). It does not mention GitHub. https://lattice.com/blog/july-2026-product-updates
- **15Five**, June 2026: AI-Assisted Reviews "compile roughly 80% of the first draft" from goals, feedback, 1:1s, prior reviews and "Work Context". It follows 15Five's acquisition of Kona and pitches continuous capture to reduce recency bias. https://www.businesswire.com/news/home/20260609421033/en/15Five-Launches-New-AI-Capabilities-that-Facilitate-a-Continuous-Performance-Management-Feedback-Loop
- **Culture Amp** AI Coach: it synthesizes feedback for manager reviews and, as of June 2026, helps employees "articulate their impact" in self-reflections. https://updates.cultureamp.com/150018-ai-coach-in-performance-now-available-for-self-reflections
- **Leapsome**: only has a Jira goals integration. I found no GitHub integration. https://www.leapsome.com/integration/jira
- **Hypercontext**: pivoted to AI performance reviews. https://betakit.com/hypercontext-completes-hr-pivot-with-new-ai-powered-performance-management-tool/

**The closest direct competitor is already funded.** Windmill ("Windy" in Slack) pulls context from Slack, **GitHub, Jira** and Google Workspace to draft reviews. It is free up to 10 users, then $10/user/mo. It raised a **$12M seed (Inspired Capital, Apr 2026)** and has 100+ customers (Kalshi, Rho, Merge) since its Nov 2025 launch. It explicitly says "AI is not evaluating anyone's performance", which is the same consent and trust framing this idea relies on. https://www.lowenstein.com/news-insights/firm-news/lowenstein-represents-windmill-the-ai-performance-review-leader-in-fundraise-led-by-inspired-capital ; https://help.gowindmill.com/features/performance-reviews

**Engineering-intelligence vendors are coming from the other side.**
- Pensero markets "transparent performance reviews" and leaderboards that give "clarity... for performance reviews and promotions decisions" (vendor pages). https://pensero.ai/glossary/transparent-performance-reviews
- Weave/Workweave breaks contributions down "by team or individual" for "data-driven performance reviews". https://larridin.com/blog/workweave-competitors-alternatives
- Span raised $25M. https://www.businesswire.com/news/home/20251105703479/en/

**The IC brag-doc space is a graveyard of side projects.**
- Products: Bragdoc.ai (CLI plus web; https://www.npmjs.com/package/@bragdoc/cli), brag-ai on PyPI, bragbot, promoteme (a Rust CLI using Claude/Gemini), and ready-made Claude "brag-doc" skills (https://claudeskills.info/skill/brag-doc/).
- HN Algolia, 2024-2026: "Reflect: An AI tool to generate your brag document" got 4 points (https://news.ycombinator.com/item?id=43519484). "Show HN: Generate brag documents from your Git history" got 1 point (https://news.ycombinator.com/item?id=46607235). "Automate Brag Sheets for Engineers" got 1 point, twice. "Show HN: Engineer Your Next Promotion" got 2 points.
- Conclusion: there is no organic pull, and the IC side is trivially DIY with Claude plus GitHub MCP.

**Time and cost of reviews.** The commonly cited figure is that managers spend ~210 hours/yr on performance management (CEB/Gartner). That number circulates second-hand through vendors. Bottom-up vendor estimates put it at 5-8 hours per review, with 1-2 hours of that on calibration. https://gowindmill.com/resources/guides/ai-performance-reviews-roi-business-case/ . The pain is real but quantified mostly by sellers.

**How developers and employees receive AI in reviews.** The reception is mixed and suspicious.
- 72% of employees suspect their manager uses AI to write reviews (Kickresume, n=1,365). https://sea.peoplemattersglobal.com/news/performance-management/72percent-of-employees-suspect-their-managers-use-ai-to-evaluate-performance-report-47521
- SHL: only 27% fully trust employers to use AI responsibly. https://www.shl.com/c/global/ai-at-work-in-2025-report/
- On HN, one commenter says AI spend and "% of code written by AI is tracked all the way down to the individual person... this will be used in performance reviews" (https://news.ycombinator.com/item?id=48325832). Another describes a boss fired partly because his performance reviews were "pure AI slop" (https://news.ycombinator.com/item?id=48423019).
- This supports the consent framing, but it also means any manager-facing output is presumed to be surveillance.

**Prior phase-1 research.**
- Strongest qualitative pain: "the people making the decision didn't understand or remember what you did" (Julia Evans, https://jvns.ca/blog/brag-documents/). Glue-work invisibility (Tanya Reilly) and recency bias (LeadDev) back it up.
- But reddit.md found "little Reddit evidence that EMs complain about writing performance reviews as a time sink".

## 3. Scores

**A. Proven demand / market: 11/20**
- Money is clearly spent on performance management: Lattice, Culture Amp and 15Five have thousands of customers, and Windmill got a $12M seed with 100+ customers in 5 months.
- That proves demand for *AI review drafting*. It does not prove demand for an *IC-owned engineering evidence ledger*.
- The IC-facing variant shows near-zero pull: a dozen launches, all at 1-4 HN points.
- The trend is growing (spans widening, AI making individual contribution illegible), but the budget sits with incumbents.

**B. Sellable (won't build in-house; will pay): 8/20**
- Companies won't build it in-house, but they don't have to: their existing HR suite (Lattice/15Five/Culture Amp) now ships it as an included feature, and Windmill sells it at $10/user.
- The HR budget line is owned by the HRIS/perf vendor, and replacing it means a rip-and-replace that HR resists.
- ICs, the daily users, have very low willingness to pay, and free CLIs and Claude skills already exist.
- The only defensible sell is "the engineering-data layer the HR suite lacks". That makes it a plug-in/integration with a ~$5/user price ceiling, and Lattice MCP plus GitHub MCP already lets a manager do this in Claude.

**C. AI-durability: 6/20**
- The core artifact (summarize my PRs and tickets into impact bullets with links) is exactly what a general LLM with GitHub/Jira MCP does today. Claude "brag-doc" skills already exist.
- Lattice put its review workflow *inside* Claude/ChatGPT via MCP, so the model vendors and HR suites are converging on this from both sides.
- GitHub/Atlassian (Rovo already summarizes a user's Jira/Confluence work) could ship "your quarter in review" trivially.
- The only durable moats are the longitudinal approved record and consent-based trust. Both are weak versus the system of record that owns the review form.

**D. Evidence-backed real problem: 9/15**
- Multiple independent qualitative sources support the problem: Julia Evans, Tanya Reilly, LeadDev on recency bias, Blind anecdotes, and HN quotes on AI in reviews.
- Survey data on trust exists.
- But the time-cost numbers (210 hours, 5-8 hours/review) are vendor-sourced or second-hand, and Reddit shows weak EM complaint volume.
- The problem is real but intermittent: acute only 1-2 times a year.

**E. Specific, reachable buyer: 5/10**
- "Head of Eng + HRBP" is a two-headed buyer. HR owns the perf tool decision and budget, while Eng owns the data access.
- ICs are reachable (dev communities, Product Hunt), but they don't pay and don't control GitHub org installs.
- EMs at 50-500 engineer companies are reachable via LinkedIn/communities, but they rarely hold budget for HR tooling.

**F. Feasibility & wedge for a student team: 8/15**
- An MVP is easy in weeks using public APIs (GitHub, Jira, Linear, Slack) plus an LLM. That is also the problem, because anyone can build it.
- Org-wide adoption requires org-level OAuth to code and Slack, plus storing data used in employment decisions. That triggers HR/legal review, SOC2, and EU works-council and AI Act "high-risk employment" scrutiny well before revenue.
- Differentiation from Windmill (same integrations, same "AI isn't evaluating you" stance, funded, with customers) is thin.
- The team does have the founder-story fit (the Visa visibility anecdote), which helps.

## 4. Verdict

| Criterion | Score |
|---|---|
| A. Demand | 11/20 |
| B. Sellable | 8/20 |
| C. AI-durability | 6/20 |
| D. Evidence | 9/15 |
| E. Buyer | 5/10 |
| F. Feasibility | 8/15 |
| **Total** | **47/100** |

The problem (managers can't remember or prove what engineers did) is real and emotionally resonant. But in 2026 the "AI drafts evidence-backed reviews" slot is being filled from three directions at once:
- HR suites: Lattice Agent and MCP, 15Five plus Kona, Culture Amp Coach;
- a funded engineering-aware startup: Windmill, with $12M and GitHub/Jira/Slack integrations;
- general LLMs plus MCP: free brag-doc skills.

The consent/IC-owned angle is a positioning choice, not a moat, and the IC user won't pay. It is best kept as a feature of idea #3 (Manager Memory) rather than a standalone company.

**Biggest risk:** commoditization. The HR suite that owns the review form (Lattice/15Five/Windmill) and Claude-with-GitHub-MCP both already produce cited review drafts, so there is no budget line or durable moat left for a standalone ledger.

FINAL SCORE: 47/100
