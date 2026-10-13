# Round 2 deep-dive: evaluating engineering candidates in the AI era

Research date 2026-10-13. Builds on hiring.md; does not repeat its identity/deepfake material. Labels: [P] primary source opened; [2nd] secondary; [vendor] vendor claim; [est] third-party estimate. Reddit archive returned 429/422/timeouts for r/EngineeringManagers, r/recruiting, r/TalentAcquisition (gap, not "no signal"). HN worked.

## 1. Domain overview
- **The thesis of hiring.md Idea 1 ("AI-native work sample scored on judgment") was validated by the market in the last 6 months, and that is bad news for a startup.** HackerRank took Chakra (AI interviewer, "AI fluency and judgment", real-repo tasks) GA on Oct 5 2026 and launched a billboard campaign "Sorry, we made you grind LeetCode" on Oct 12 2026. CodeSignal shipped "agentic coding assessments" (Claude Code, Cursor, Codex) on Apr 2 2026. Karat shipped NextGen (human-led, AI-enabled) Dec 10 2025 and bought Byteboard Jan 2025. Meta, Canva and (per secondary sources) Shopify run AI-enabled rounds. A YC P26 startup (Saffron) and a seed-funded one (Utkrusht) sell the exact "real codebase + AI tools + record prompts/diffs" product.
- Remaining white space is NOT "the work sample". It is (a) proof the AI-fluency score predicts job performance, (b) content that cannot be leaked or one-shot by agents, (c) interviewer/loop calibration, (d) candidate-side prep for the new formats.
- Practitioners are split: many hiring managers tried AI-allowed interviews and report mixed or inverted signal (below), so buyers do not yet trust any vendor's score. Validity evidence is the scarce asset.
- Price points in the category are low for self-serve ($79-$450/mo) and high for human-delivered (Karat ~$200-450 per interview [2nd]). Enterprise is quote-based.

## 2. Who allows AI in interviews (verified)

| Company | Policy and format | Status of evidence |
|---|---|---|
| Canva | Since Jun 11 2025, backend/ML/frontend candidates are expected to use Copilot/Cursor/Claude; new "AI-Assisted Coding" round piloted, replacing the CS-fundamentals screen. Evaluates "when and how to leverage AI", fixing issues in AI-generated code, handling ambiguous requirements. Reason given: AI trivially solves old questions and covert use is hard to detect. | [P] https://canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews |
| Meta | Replaced one of two onsite coding rounds with a 60-min session in a multi-file codebase with an AI assistant (CoderPad 3-panel; GPT-5/Claude/Gemini models reported). Rollout reported from Oct 2025, SWE and EM roles. Reasons: reflect the job, make LLM cheating less effective. | [2nd] https://hellointerview.com/blog/meta-ai-enabled-coding ; https://www.storyboard18.com/digital/meta-to-test-job-applicants-with-ai-powered-coding-interviews-77958.htm ; HN https://news.ycombinator.com/item?id=44729701. Not opened at Meta. |
| Shopify | Reported two AI-enabled coding interviews (screen and onsite), bring-your-own-IDE and AI tools, empty repo. A Glassdoor review reports an interviewer stopping LLM use in a pair round (inconsistent). | [2nd] https://www.hellointerview.com/blog/shopify-ai-enabled-coding ; Pragmatic Engineer excerpt. No Shopify primary found. |
| Rippling | Only a Glassdoor review saying AI was allowed in a phone screen, and an aggregator list. | Unverified. |
| **Anthropic (correction)** | Does NOT allow it by default. "Live interviews: This is all you - no AI assistance unless we indicate otherwise." Take-homes: "Complete these without Claude unless we indicate otherwise." (updated Jul 10 2025). | [P] https://www.anthropic.com/candidate-ai-guidance . HN commenters use it as proof that hard skills still matter: https://news.ycombinator.com/item?id=48404805 |
| Coinbase | Blog "Interviewing Engineers in the AI Era: Lessons from a Year of Rebuilding" (403, not opened). HN thread of 63 points / 64 comments. | [2nd] https://www.coinbase.com/blog/interviewing-engineers-in-the-ai-era-lessons-from-a-year-of-rebuilding ; https://news.ycombinator.com/item?id=49162299 |
| Large EU tech co (anonymous), "a popular AI startup" (anon) | AI allowed in live coding; "build a search UI" exercises. | HN anecdotes https://news.ycombinator.com/item?id=49505033 ; https://news.ycombinator.com/item?id=45110797 |

Base rate [vendor]: Karat's 2025-26 report says almost two-thirds of companies still prohibit AI in interviews and under 30% are updating assessments or training interviewers (as relayed in Karat's Dec 2025 NextGen release coverage; https://karat.com/karat-launches-nextgen-interviews-the-first-human-led-ai-enabled-talent-evaluation-solution/ search result, not opened). CodeSignal [vendor]: about one-third of its clients adopted AI-assisted format through 2025.

## 3. Incumbents and new entrants (money)

| Player | AI-era product | Money | Source |
|---|---|---|---|
| HackerRank | Chakra "agentic interviewer": voice/video structured interviews, evidence scorecards, AI-fluency scoring, repo-style tasks; GA Oct 5 2026 after >500k beta interviews (Snowflake, Snorkel, Capgemini); suspicious-activity flags 70-80% lower than classic tests [vendor]; July 2026 locked-down desktop app. Pricing for Chakra not published. | Revenue only [est]: Latka $221M (2024); UnifyGTM $378M; a SWOT template claims $120M-$160M ARR. These conflict; treat as unknown. Self-serve list prices conflict: Starter $79/mo annual (noon.ai, 60 attempts) vs $165-$199/mo (Toolradar, Capterra, Rework); Pro $419-$449/mo; overage $20/attempt; Enterprise custom. | [P] https://www.hackerrank.com/writing/why-were-sorry ; [2nd] https://www.newsbytesapp.com/news/science/hackerrank-launches-chakra-ai-interviewer-after-over-500000-beta-interviews/tldr ; https://www.noon.ai/blog/articles/327-hackerrank-pricing-2026 ; https://www.capterra.com/p/143549/HackerRank/reviews/1515935/ |
| CodeSignal | Cosmo AI assistant in IDE (May 28 2025, Co-Pilot and Guided modes, session replays and AI transcripts) [P]; Agentic Coding Assessments with Claude Code/Cursor/Codex (Apr 2 2026) [2nd]. No published scoring rubric in the 2025 release. | Raised $25M Series B (2020) + $50M Series C (Index, 2021); total ~$87.5M. Revenue [est]: Latka $40.3M (2023), down ~6% YoY. No 2026 round found. | [P] https://codesignal.com/newsroom/press-releases/codesignal-launches-ai-assisted-coding-assessments-and-interviews-redefining-technical-hiring-in-the-ai-era/ ; https://www.gunder.com/news/codesignal-raises-50m-series-c-financing ; https://www.interviewquery.com/p/codesignal-ai-assisted-technical-interviews (429) |
| Karat | NextGen Interviews (Dec 10 2025): multi-file project + integrated AI assistant + human Interview Engineer. Acquired Byteboard Jan 16 2025 (third acquisition; terms undisclosed; Byteboard raised $5-13M). Customers PayPal, Atlassian, Citi; "70% YoY enterprise growth" [vendor]. | $110M Series C at $1.1B (Oct 2021, Tiger Global); total raised $152-169M (sources disagree); no revenue disclosed; no 2026 round. Per-interview price ~$200-450 [2nd, from a competing staffing firm: https://www.hireinsouth.com/post/karat-pricing]; interviewer paid ~$100 per interview. | [P] https://karat.com/karat-acquires-byteboard/ ; https://techcrunch.com/2021/10/13/karat-raises-110m-on-a-1-1b-valuation-to-grow-its-technical-interviewing-as-a-service-platform |
| CoderPad | AI Assist, Qualify AI Reviewer, anti-cheat/proctoring on top tier; Meta's AI round runs in a CoderPad-style IDE [2nd]. | Pricing conflicts: $70-$120/mo Starter, $375-$400/mo Team (2026 comparisons). Funding not retrieved. | https://playcode.io/blog/coderpad-alternatives-2026 [2nd] |
| interviewing.io | Practice AI interviewer; a news item says Meta piloted AI-assisted interviews on the platform (Jan 20 2026), not verified. | Not retrieved. | search result only |
| Saffron (YC P26) | Candidate gets real codebase + AI tools, records prompts, diffs, decisions in sandbox; AI review agents auto-score; assessment built from a GitHub repo in <5 min; first assessment free. Team of 3 (ex-Jane Street x2). | YC + Afore Capital; ~$500k pre-seed [2nd, Caplight]. | [P] https://www.ycombinator.com/companies/saffron |
| Utkrusht AI | "Watch-them-work" assessments in live production-like environments, tracks AI tool use. Claims 10,000+ candidates assessed, -70% time to hire [vendor]. | Seed, size undisclosed, ~May-Jun 2026. | [2nd] https://dealroom.co/news/133631-utkrusht-ai-raises-seed-round-for-watch-them-work-hiring-platform/ |
| Alex (AI recruiter, screening interviews) | Not engineering-specific. | $17M Series A (Peak XV, YC) Sep 29 2025 + $3M seed; revenue undisclosed; "thousands of interviews a day". | [P] https://techcrunch.com/2025/09/29/ai-recruiter-alex-raises-17m-to-automate-initial-job-interviews |
| Ribbon (Toronto) | AI screening interviewer. | $8.2M (Radical Ventures), Mar 31 2025. | [2nd] https://www.torys.com/work/2025/03/61993aea-898c-4cc0-9967-62353d814411 |
| Apriora | AI video interviewer. | $2.8M seed (YC et al.). | [2nd] https://www.vcbacked.co/company/apriora |
| micro1 | AI interviewer "Zara" used to vet experts for AI data labeling; this is a different market (contractor supply for AI labs), not engineering hiring tooling. | ~$100M at $4B valuation (Forbes), up from $500M in Sep 2025 ($35M Series A); revenue run-rate claims range $100M-$500M. | [2nd] https://www.forbes.com.au/news/uncategorized/this-25-year-old-raised-us100-million-for-his-ai-startup-at-a-us4-billion-valuation/ |
| Mercor | Started as AI recruiter, now AI data labeling; ignore for this domain. Series B $100M at $2B (Feb 2025); reported talks at $10-20B. | [2nd] https://www.tipranks.com/news/private-companies/mercor-secures-100-million-series-b-valuation-soars-to-2-billion |
| Woven, Hatchways, Canditech, Kira | Searches returned nothing usable. Gap, not "none". | | |

**Takeaways.** (1) Self-serve assessment is a small-ticket market: even HackerRank's list is roughly $1k-$5k/yr per small team. Enterprise and human-delivered (Karat) carry the money. (2) Capital for AI-interviewing is flowing mostly to screening-interview bots and AI-labor-marketplace pivots (Alex, micro1, Mercor), not to engineering work-sample startups (Saffron ~$0.5M). (3) Market size claims range from $440M (narrow "technical skills screening") to $6.8B (broad skills assessment); definitions differ (low-visibility research publishers: https://www.gii.tw/report/smrc2024012-technical-skill-assessment-platforms-market.html ; https://datahorizzonresearch.com/tech-assessment-platform-market-75984). Use ~$0.5-2.5B as honest range.

## 4. Demand evidence table

| Signal | Type | Number | Source |
|---|---|---|---|
| HackerRank pivot, billboards, Chakra GA after 500k beta interviews | 1/2 (incumbent with money moving) | 500k interviews [vendor] | https://www.hackerrank.com/writing/why-were-sorry ; HN https://news.ycombinator.com/item?id=50050762 (41 pts) |
| CodeSignal agentic assessments; ~1/3 of customers on AI-assisted format in 2025 [vendor] | 1/5 | n/a | https://www.interviewquery.com/p/codesignal-ai-assisted-technical-interviews (via search) |
| Karat NextGen + Byteboard acquisition | 2 | undisclosed | https://karat.com/karat-acquires-byteboard/ |
| Meta, Canva, Shopify AI-enabled rounds | 3 (behavior change at buyers) | n/a | section 2 |
| Saffron YC P26, Utkrusht seed | 2 | ~$0.5M; undisclosed | section 3 |
| Karat interviewers paid ~$100 per hour-long interview, buyers pay ~$200-450 | 1 (labor arbitrage proves per-interview willingness to pay) | $200-450 [2nd] | https://www.hireinsouth.com/post/karat-pricing |
| Interview time per hire | 3 | 44 hours of interview time per hire (Lightspeed, via LSVP, all roles, excludes disruption) | [P] https://lsvp.com/stories/the-critical-hiring-metric/ |
| Technical hiring takes ~2x interview hours of non-technical roles; median technical time-to-hire 40 days | 3 | Ashby 2026 report via blog, unverified | search summary; no primary opened |
| Engineering hours per hire | 3 | 5-10 hrs (vendor models, low) vs 44 (Lightspeed); at $80-150/hr loaded => $400-$6,600 per hire | [2nd] https://www.barraiser.com/interview-outsourcing/interview-outsourcing-roi |
| Cost per hire non-exec $5,475 (SHRM 2025) | 3 | from hiring.md | |
| Fabric dataset: cheating signals in 38.5% of 19,368 technical interviews (48% in technical roles) | 5 [vendor] | | https://fabrichq.ai/blogs/interview-cheating-in-2026-the-rise-of-ai-tools-like-cluely-and-interview-coder |
| HN: Coinbase "Interviewing Engineers in the AI Era" | 4 | 63 pts / 64 comments | https://news.ycombinator.com/item?id=49162299 |
| HN: Yegge "The Last Technical Interview" | 4 | 271 pts / 275 comments | https://news.ycombinator.com/item?id=48328405 |
| HN: Ask HN "Hiring in the age of AI-assisted coding: what works?" | 4 | | https://news.ycombinator.com/item?id=47724105 |
| HN: Ask HN "What do your job interviews look like?" (Summer 2026) | 4 | 30 pts / 12 comments | https://news.ycombinator.com/item?id=49505033 |
| Not found: dollar WTP quotes from EMs per assessment; Greenhouse/Gem engineering-specific hours-per-hire; Reddit EM/recruiting threads. | gap | | |

## 5. Pain points (what managers actually say)
1. **AI-allowed interviews do not yet produce trusted signal.** Aurornis (HN, relaying a manager peer group): "Most of them have gone full circle and returned back to no-AI interviews." and "They started getting inverted signals because the hardcore vibecoders knew all the tricks to brute force the problem with high token spend." and the test "become[s] a test of how familiar the candidate is with the specific AI tool you're letting them use." https://news.ycombinator.com/item?id=47724105 (fetched summary; quotes as returned by the tool)
2. **Agent-using candidates can look worse.** cess11 on "Beyond agentic coding": "I allow interview candidates to use agentic coding tools and candidates who do so consistently performed worse" https://news.ycombinator.com/item?id=46933174
3. **False positives are the real fear; some interviewers have seen them.** vanuatu: "the more junior candidates figured out you could one shot the problem but were unable to explain their code"; o0ower0o: "Some candidates had a unit test fail and couldn't debug it for his life"; Muromec: "We stopped giving take-home assignments because they don't produce a signal anymore." https://news.ycombinator.com/item?id=49162299 . Also b112: "I've personally hired someone who clearly cheated during the remote phone interview ... literally couldn't even code a function in any language in person." https://news.ycombinator.com/item?id=42911031
4. **Scoring judgment is the unsolved part.** mbil: "What I'm looking for is how they interact with the AI agent. Do they ask the agent to plan first?" (https://news.ycombinator.com/item?id=49162299). pixel_popping: "we might have tests that are more about testing your 'agentic skill'" (https://news.ycombinator.com/item?id=47949339). Skeptics: lr0 on HackerRank launch: "agent behavior is not deterministic," so one candidate may get luckier than another (https://news.ycombinator.com/item?id=50050762) - a reproducibility problem a vendor must solve.
5. **Cost/time of alternatives.** tptacek: work-sample hiring at Matasano gave "a *drastic* reduction in turnover" and "you start by recognizing that everybody is going to be using AI and designing the tests accordingly" (https://news.ycombinator.com/item?id=48328405). Cost of in-person: "second round comes with a plane ticket" (gopher_space), "quite expensive, especially for smaller companies" (satvikpendem) https://news.ycombinator.com/item?id=42911031 . Yegge-style paid multi-day trials criticised for candidate risk.
6. **Trust in vendor claims is low.** HN on HackerRank: "They were never 'sorry'" (rvz); accountrequired: "I wonder which LLM provider is actually running the inference" https://news.ycombinator.com/item?id=50050762. No vendor publishes predictive-validity data (none found in sources retrieved).
7. **Cheat tools still work against live rounds** (overlays invisible to screen share; Fabric [vendor]). AI-allowed formats remove the incentive for assisted cheating but not identity fraud or proxy candidates.

## 6. Spend math
- Interview time per hire: 44 hrs (Lightspeed) as upper-bound all-stages; vendor models 5-10 hrs for technical rounds only. Take ~15 engineer-hours per technical hire for a mid-size company as a working assumption (my assumption, between the two). At $100/hr loaded => ~$1,500 per hire, plus 40-day time-to-hire delay.
- A company hiring 20 engineers/yr: ~300 EM/engineer hours (~$30k). Karat-style outsourcing at $250-350 per interview x ~6 interviews per hire x 20 hires => $30-42k/yr. This is the price band a buyer already accepts for human-delivered interviews.
- Self-serve assessment tools: $1-5k/yr (HackerRank/CodeSignal/CoderPad lists). A new tool sells at either per-assessment $20-100 (HackerRank overage is $20/attempt) or enterprise $20-100k.
- Bad hire: ~$44k illustrative (30% of $148k median dev wage; 30% rule unverified) - one avoided bad hire pays for several years of a small-company plan.
- Willingness-to-pay for a validated AI-era assessment: no direct quote found. Best proxy: Karat per-interview $200-450.

## 7. Is there a defensible product? Would HackerRank/CodeSignal just ship it?
They already did (Chakra, Agentic Assessments, NextGen), and a YC startup (Saffron) is selling the same thing with a free first assessment. A new entrant selling "repo + agent + transcript + LLM judge" would face: distribution (ATS integrations, 10,000s of customers), brand budget (billboards), and free-tier pricing. Student team cannot out-ship this on features.

What the incumbents are structurally weak at:
- **Validity evidence.** They sell scores; no one publishes outcome-linked validation (manager ratings, retention, performance at 6-12 months). They hold candidate data, not post-hire outcomes. A neutral third party with outcome data from many small companies is hard for incumbents to replicate quickly. But getting the data takes a year-plus.
- **Customer-specific tasks.** Incumbent banks are generic and leak (HN: "test banks that get rotated"). Customers want their own stack. Saffron builds from a GitHub repo, so this is contested too.
- **Interviewer-side calibration.** Karat says <30% of companies train interviewers for AI-era evaluation (vendor). Human judgment of agent transcripts is now the bottleneck, and Metaview/BrightHire can add it.
- **Candidate side.** Prep for AI-enabled rounds (Meta etc.) has paying B2C demand with no incumbent assessment vendor serving it well; the buyer is a candidate, not a protected enterprise budget.

## 8. Candidate ideas (BRIEF format)

### Idea A: "Agent-proof" private task generator from the customer's own repo (planted-bug content engine)
- Pitch: Point it at a company's repo; it generates fresh work-sample tasks with planted bugs, misleading agent-bait, ambiguous specs and a hidden-test grader, rotates them per candidate, and checks they are not one-shot by frontier agents (red-teams its own tasks with Claude Code/Codex before shipping).
- Buyer: Head of Eng / Staff engineer owning hiring, 50-1,000 engineers; also sold as an engine to assessment vendors.
- Why now: AI-allowed formats require harder, non-leaky tasks; Canva says it redesigned questions to be "more complex and realistic"; Aurornis: tasks get brute-forced by high-spend vibecoders.
- Why not in-house: designing and calibrating tasks that agents cannot one-shot but humans-with-agents can is expert work, and decays every model release.
- AI-durable: each model improvement forces regeneration; task-hardness verification is a moving target and sells more as agents improve.
- Wedge MVP: GitHub app + 3 task types (bug hunt, ambiguous feature, review-the-agent's-PR), an auto "agent-solvability" score, 5 pilot startups. Weeks, public APIs.
- Top 3 signals: Canva post; HN "inverted signals ... brute force" (47724105); Saffron/Utkrusht funded, proving buyers for the surrounding product.
- Biggest risk: Saffron already builds assessments from a GitHub repo; HackerRank can ship an LLM task generator; low self-serve price.
- Score: A 11, B 9, C 14, D 9, E 7, F 11 = **61**.

### Idea B: Independent predictive-validity / benchmark service for AI-era engineering assessments
- Pitch: Track candidate scores against 6-month manager ratings and ramp-up outcomes across many small companies; publish which AI-collaboration signals (planning first, test-writing, review of agent diffs) actually predict performance.
- Buyer: VP Eng / Head of Talent at 200-2,000 person companies; later assessment vendors who need credible validation.
- Why now: every vendor sells an "AI fluency" score with no validation; HN trust in HackerRank low; hiring managers say signals inverted.
- Why not in-house: needs cross-company outcomes data; a single company has too few hires.
- AI-durable: yes, definitions shift each model generation; data moat.
- Wedge MVP: free plugin that logs interviewer scorecard + 90-day manager rating from Greenhouse/Ashby exports; first publication of validity for 3 formats.
- Top 3 signals: no vendor validity data found; SHRM 20% track quality of hire (from hiring.md, [2nd]); HN split on whether AI-allowed signal works (49162299).
- Biggest risk: cold-start is slow (hires -> 6 months), small n, and incumbents hold bigger datasets and could publish; hard to sell before data exists. This is partly the "summarize your hiring" trap.
- Score: A 9, B 7, C 15, D 8, E 7, F 8 = **54**.

### Idea C: Candidate-side prep for AI-enabled coding rounds (Meta/Canva/Shopify style)
- Pitch: Practice environments that mimic Meta's CoderPad AI round and Canva's format, with graded feedback on how you directed the agent, caught its bugs, and explained decisions.
- Buyer: Individual SWE candidates/new grads ($20-50/mo or per-pack) and university career centres.
- Why now: Meta rolled out AI-enabled onsite round; candidates are told to practice; Hello Interview and others publish guides (indicating traffic/demand); students are the target users and founders know them.
- Why not in-house: candidates cannot self-grade judgment; no one else gives calibrated feedback for this skill.
- AI-durable: formats change faster than guides; but a frontier model can role-play grader (weak moat).
- Wedge MVP: 3 Meta-style scenarios in browser + LLM grader + shareable transcript; launch to r/leetcode/Blind.
- Top 3 signals: Meta AI-enabled round (2nd sources); multiple prep guides (hellointerview, dglearning); interviewing.io/Hello Interview exist as paid-prep category (revenue not retrieved).
- Biggest risk: Hello Interview/interviewing.io/LeetCode ship it; B2C CAC high; no hard revenue evidence retrieved; ethical optics fine, but weak "buyer pays" proof.
- Score: A 10, B 9, C 7, D 6, E 6, F 13 = **51**.

### Idea D: AI-era interviewer certification and calibration for engineering managers
- Pitch: Train and certify EMs/staff engineers to run and score AI-allowed interviews (rubrics, shadow scoring of recorded sessions against a gold panel, drift alerts).
- Buyer: Head of Eng/Talent Ops at 100-2,000 person firms.
- Why now: Karat [vendor] says <30% train interviewers; Karat's business is human interviewers whose skill is the product.
- Why not in-house: need gold-labeled transcripts and calibration across companies.
- AI-durable: moderate; LLM scorers could replace human calibration, but human-in-loop remains per Karat/HackerRank positioning.
- Wedge MVP: web course + calibration test on 20 anonymised agent transcripts; sell to 10 companies at $2-5k.
- Signals: Karat's 28 Dec release data (vendor); HN managers asking "how do I design this" (Reddit 146 comments, hiring.md); Karat charging $200-450 per interview shows judgment is monetized.
- Biggest risk: training budgets small, services-heavy, low software leverage, Karat could offer it.
- Score: A 9, B 8, C 9, D 6, E 7, F 11 = **50**.

### Idea E: Integrity layer for AI-allowed assessments (prove who drove the agent)
- Pitch: Lightweight session-integrity SDK for work-sample tools: keystroke/prompt provenance, second-agent detection (candidate runs hidden agent that drives the visible one), plagiarism of agent transcripts across candidates.
- Buyer: assessment vendors and mid-size companies running their own work samples.
- Why now: AI-allowed formats shift cheating to "outsourced to a better person/agent"; HackerRank added a locked-down desktop app (Jul 2026) so it is a priority they pay for.
- Why not in-house: arms-race expertise; vendors may buy.
- AI-durable: arms race; but invites platform absorption.
- Wedge MVP: browser extension + transcript-similarity detection; pilot with Saffron-like tools.
- Signals: HackerRank desktop lockdown; Fabric 38.5% [vendor]; Persona/Socure candidate verification.
- Biggest risk: absorbed by HackerRank/Persona (hiring.md Idea 3 conclusion); selling to vendors who compete; accuracy unverifiable.
- Score: A 10, B 6, C 8, D 6, E 5, F 9 = **44**.

## 9. Best idea from this domain
Idea A (private, agent-proof task generation and verification from the customer's own repo), with Idea B (validity data) as the long-term moat, but only with an honest caveat: the generic "AI-native work sample" is now a crowded space (HackerRank GA, CodeSignal, Karat, Saffron) and I would NOT build the assessment itself. Score of 61 is lower than hiring.md's 63 because evidence retrieved this round shows incumbents shipping, price points of $79-$450/mo, and inverted-signal reports. No direct dollar willingness-to-pay quotes from EMs were found; the Karat $200-450 per interview and 44 hrs of interview time per hire are the best proxies. The domain as a whole is likely below the ~56 ContextOps baseline once incumbent absorption is priced in unless a founder has a design partner who owns hiring for 100+ engineers per year.
