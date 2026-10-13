# Round 2: Technical hiring in the AI era (engineering-manager view)

Research date 2026-10-13. WebSearch was rate-limited for part of the session, so some figures are secondary and marked [2nd]. Reddit archive timed out or returned 429 on several queries; HN worked. Items marked [vendor] are vendor claims. No primary source for Gartner was reached.

## 1. Domain overview
- Remote technical interviews are no longer trustworthy. AI overlays (Interview Coder, Cluely), proxy interviewees, deepfakes and state-sponsored fake workers all attack the same step: "is the person on the screen the person who will do the job, and can they do it unaided".
- Money is moving fastest at the identity layer (Persona, Socure, Incode, Deel buying Clarity) and at AI-notes/ATS tooling (Metaview). The assessment layer (HackerRank, CodeSignal, Karat) is repositioning toward "AI-allowed" interviews.
- Big employers' response is cheap and analog: bring back an onsite round (Google, reportedly Cisco and McKinsey [2nd]). That works for large firms and is poor for the startups and mid-size remote-first firms that cannot fly everyone in.
- Engineering managers feel it as lost interviewer hours, false trust in remote signals, and security exposure (laptop farms, data exfiltration).
- Open gap: nobody credibly measures "can this candidate work WITH AI agents", the thing managers now say they actually want.

## 2. Demand evidence table

| Signal | Type | Number | Source |
|---|---|---|---|
| Deel acquires Clarity (deepfake/workforce identity), Aug 3 2026 | 2 (acquisition) | reported $40-50M, terms undisclosed | https://thenextweb.com/news/deel-acquires-clarity-deepfake-detection ; https://dealroom.co/news/142736-deel-acquires-clarity-to-strengthen-identity-verification-surpasses-1-5b/ |
| Metaview Series C, Sep 30 2026, led by Insight Partners (GV, Seedcamp et al.) | 2 | $60M; $110M total raised; Series B was ~$35M Jun 2025 (GV) | https://inforcapital.com/news/metaview-raises-60m-series-c/ ; https://startupintros.com/news/2025-06-01-metaview-series-b |
| Cluely (cheat tool) seed, Apr 2025 | 2 | $5.3M (Abstract, Susa) | https://techcrunch.com/2025/04/21/columbia-student-suspended-over-interview-cheating-tool-raises-5-3m-to-cheat-on-everything |
| Cluely round led by a16z, Jun 2025 | 2 | $15M (headline only; I did not open the article) | https://techcrunch.com/2025/06/20/cluely-a-startup-that-helps-cheat-on-everything-raises-15m-from-a16z |
| Persona launched Candidate Verification (Ashby, Greenhouse, Workday integrations), Mar 11 2026 | 1/2 (incumbent building product) | n/a | https://www.streetinsider.com/PRNewswire/Persona+Launches+Candidate+Verification+to+Stop+Hiring+Fraud+Before+Day+One/26144703.html |
| Socure Workforce Verification launched Jul 2025; Socure says it is itself targeted by fake candidates | 2/5 | n/a | https://www.helpnetsecurity.com/2025/07/17/socure-workforce-verification/ |
| BrightHire + Zoom deepfake/fraud signals inside live interviews, Jun 2026 | 2 | n/a | https://www.biometricupdate.com/202606/brighthire-uses-zoom-signals-to-detect-deepfakes-in-job-interviews |
| DOJ June 2025: NK IT-worker scheme | 3 | 100+ US companies, 80+ stolen US identities, >$3M legal/remediation costs; FBI searched 21 laptop farms in 14 states, seized 137 laptops | https://gvwire.com/2025/06/30/doj-announces-arrest-indictments-in-north-korean-it-worker-scheme/ |
| DOJ May 2024 case | 3 | 300+ US companies defrauded, 2020-2023 | https://securityaffairs.com/?p=163349 |
| Gartner (Jul 2025 survey of 3,000 candidates) [2nd] | 3 | 6% admit interview fraud; forecast 1 in 4 candidate profiles fake by 2028 | https://blog.theinterviewguys.com/?p=4752 (secondary; not verified at Gartner) |
| Greenhouse survey of 4,136 hiring managers [2nd] | 3 | 31% interviewed a suspected/confirmed deepfake candidate | via WebSearch summary of https://hrexecutive.com/deepfakes-in-the-talent-pool-how-ai-is-reshaping-hiring/ (not opened) |
| Pindrop single dev role [2nd] | 3 | ~100 of 827 applicants (12.5%) fake identities | https://www.fortune.com/2025/04/11/job-applicants-deepfake-ai-imposters-how-to-bust-imposters-hiring-managers-hr-leaders |
| Detection vendor dataset [vendor] | 5 | 38.5% of 19,368 live interviews flagged, Jul 2025-Jan 2026; no vendor publishes false-positive rates | https://blog.theinterviewguys.com/?p=17305 |
| Google brings back at least one in-person round (Pichai); Cisco, McKinsey reported same [2nd] | 3 (behavior change) | n/a | https://www.storyboard18.com/amp/brand-makers/google-to-reintroduce-in-person-interviews-amid-rising-ai-cheating-concerns-79624.htm ; https://www.computerworld.com/in/hiring/ |
| Cost per hire (SHRM 2025, n=2,371) | 3 | $5,475 non-exec; $35,879 exec. Engineer-specific figure not verified (one secondary source says $8.4-12k) | search summary; no primary URL opened |
| Cost of bad hire | 3 (weak) | "30% of first-year pay" rule is unverified; median software developer wage $148,100 (BLS May 2025) => ~$44k illustrative (my math); indirect estimates $30k-150k+ [2nd, Toggl Hire] | https://stealthagents.com/research/true-cost-of-a-bad-hire-2026-statistics-and-benchmarks (unopened) |
| Karat | 1/2 | $110M Series C at $1.1B, 2021; revenue ~ $73.6M is a third-party estimate (unreliable) | https://techcrunch.com/2021/10/13/karat-raises-110m-on-a-1-1b-valuation-to-grow-its-technical-interviewing-as-a-service-platform |
| HackerRank pricing | 1 | Starter ~$199/mo (120 attempts/yr); Pro/Enterprise quote-only | https://www.lodely.com/blog/hackerrank-pricing-2026 |
| CodeSignal pricing | 1 | Build ~$79/mo annual; credit-based | https://resources.rework.com/tools/recruiting-ats/hackerrank-vs-codesignal |
| r/ExperiencedDevs "AI is ruining our hiring efforts" | 4 | 1,116 upvotes / 658 comments | https://reddit.com/r/ExperiencedDevs/comments/1fpdw0x/ai_is_ruining_our_hiring_efforts/ |
| r/ExperiencedDevs "Cheating interviewees epidemic" | 4 | 672 / 386 | https://reddit.com/r/ExperiencedDevs/comments/1emevfz/cheating_interviewees_epidemic/ |
| r/ExperiencedDevs "What the heck does a good experienced dev interview look like in 2026?" | 4 | 143 / 146 | https://reddit.com/r/ExperiencedDevs/comments/1su50a4/what_the_heck_does_a_good_experienced_dev/ |
| HN "The engineering interview process is broken, AI cheating is exposing it faster" | 4 | 6 pts / 18 comments | https://news.ycombinator.com/item?id=43882116 |
| HN launches by small teams (Lyra/ShivonAI, Prepto, Work Simulation, "transcripts over code" take-homes) | 4 (many DIY entrants, low traction) | 1-6 pts each | https://news.ycombinator.com/item?id=42887460 ; https://news.ycombinator.com/item?id=46243705 ; https://news.ycombinator.com/item?id=47338535 |

Not found: job-posting counts for humans doing interview-fraud review; Karat/CodeSignal/HackerRank current ARR; funding for dedicated interview-cheating detectors (Truely, Sherlock, Polygraf) - searches returned no round, so I cannot report any. Treat as gap, not as "none exist".

## 3. Pain points, ranked
1. Candidates cheating live in remote interviews, so interview signal is untrustworthy.
   - "Twice in as many weeks, I've encountered interviewees cheating during their interview, likely with AI." (r/ExperiencedDevs, TL at a large company) https://reddit.com/r/ExperiencedDevs/comments/1fpdw0x/ai_is_ruining_our_hiring_efforts/
   - "...85% of the people we interview are reading from a chatbot or are having someone voice their interview while they poorly mouth..." (single panel's anecdote, not representative) https://reddit.com/r/ExperiencedDevs/comments/1emevfz/cheating_interviewees_epidemic/
2. Nobody knows what a good interview is now. "I'm in charge of designing our interview process after a year of hiring freezes and I have no idea where to even start. I've interviewed hundreds of mid to senior level devs but I feel like none of the things we used as..." https://reddit.com/r/ExperiencedDevs/comments/1su50a4/what_the_heck_does_a_good_experienced_dev/
3. Take-homes, online tests and live remote all compromised: "...finding it increasingly difficult to assess candidate quality now that AI tools can assist with take-home tasks, online tests, and even live remote interviews." (HN Ask, remote engineering hiring) https://news.ycombinator.com/item?id=46729684
4. Fake identities and security exposure (NK workers, laptop farms): DOJ numbers above; HN thread "North Korean IT workers have infiltrated the Fortune 500" https://news.ycombinator.com/item?id=43618416
5. Ethical/market normalisation of cheating tools: HN "Tell HN: Big name VCs funded a interview AI cheating tool" https://news.ycombinator.com/item?id=43131106
6. Resume spam from AI auto-apply: I did not retrieve evidence (r/recruitinghell queries failed). Gap.
7. Time per hire: no sourced number retrieved. Gap.

## 4. Incumbents and gaps
- Assessment: HackerRank (~$199/mo starter, bundled AI interviewer), CodeSignal (~$79/mo build, credits), Codility. Karat ($1.1B 2021 valuation, human-interviewers-as-a-service). Complaint themes in the sources: assessments leak, are cheatable, and LeetCode-style tests do not reflect the job (HN 43882116). Gap: vendors answer by "allowing AI", but no one has a trusted scoring standard for AI-collaboration skill.
- Notes/intelligence: Metaview ($110M raised, $60M C Sep 2026) and BrightHire (Zoom partnership). Both are moving into fraud signals, so detection is a feature for them, not a standalone category.
- Identity: Persona, Socure, Incode, Deel+Clarity. Funded and integrated with Greenhouse/Ashby/Workday; they own the "is this a real person" question.
- Cheat tools: Cluely ($5.3M seed then reported $15M a16z), Interview Coder. Arms race favours the cheat side because overlays are invisible to screen share.
- Detector startups (Truely, Sherlock, Polygraf, Lyra): I found no funding data in this session. Detectors publish no false-positive rates, an accuracy/trust gap.

## 5. Candidate startup ideas

### Idea 1: AI-native work-sample platform ("work with agents" scorecard)
- Pitch: A realistic repo + agent sandbox where the candidate must ship a change with Claude/Cursor allowed, recording the full prompt/diff/test transcript and scoring judgment (verification, scoping, review of agent output).
- Buyer: VP Eng / EM at 50-1000-person software companies.
- Why now: Reddit/HN managers say old formats are dead; HackerRank/CodeSignal only bolt AI on.
- Why not in-house: designing and calibrating tasks and rubrics is expensive; managers are asking what a good interview looks like (146 comments).
- AI-durable: the harder agents get, the more it matters; scoring AI-collaboration is a moving target.
- Wedge MVP: 3 task templates + transcript replay + rubric scoring with an LLM judge; free for a pilot with 5 startups.
- Top 3 signals: r/ExperiencedDevs 2026 "what does a good interview look like" (143/146); HN "work simulation" and "transcripts over code" launches show DIY demand; Metaview $60M C shows hiring-tool money.
- Biggest risk: HackerRank/CodeSignal ship the same; buyers are used to paying little ($79-199/mo).
- Score: A 12, B 10, C 14, D 9, E 7, F 11 = 63.

### Idea 2: Hiring-loop calibration/audit for engineering managers
- Pitch: Ingest interview transcripts and scorecards and tell the EM which interviewer questions still predict performance and which are now cheatable/LLM-answerable.
- Buyer: Head of Eng / Talent Ops, 200-2000 people.
- Why now: interviews were redesigned under AI; no feedback loop exists (only 20% track quality of hire per SHRM 2025 [2nd]).
- Why not in-house: needs cross-company benchmarks.
- AI-durable: moderate; Metaview and BrightHire can add it.
- Wedge MVP: Greenhouse/Ashby export + LLM question-leakage score.
- Signals: SHRM 20% tracking; Metaview/BrightHire investment; reddit threads on broken process.
- Risk: it is a feature of Metaview/Greenhouse. This is the "summarize your hiring" trap.
- Score: A 10, B 8, C 8, D 8, E 7, F 12 = 53.

### Idea 3: Remote-first candidate trust layer for small companies
- Pitch: Cheap identity + live-session integrity check (liveness, device/IP, proxy-interviewer re-verification at onboarding) packaged for non-enterprise teams that cannot afford Persona/Socure enterprise contracts.
- Buyer: Founder/CTO of 10-200 person startup hiring remote.
- Why now: DOJ 100-300+ company victims; Deel acquiring Clarity proves value.
- Why not in-house: identity/deepfake detection is hard.
- AI-durable: arms race sustains it, but accuracy is the moat and the big players are moving in.
- Wedge MVP: Chrome/Zoom-bot that compares interview face/voice to onboarding session; no SOC2 day 1 hard.
- Signals: Deel/Clarity $40-50M; Persona/Socure launches; DOJ cases.
- Risk: Persona/Socure/Zoom own distribution; also privacy/biometric law (BIPA).
- Score: A 14, B 9, C 9, D 11, E 7, F 6 = 56.

### Idea 4: Structured in-person/onsite logistics and "live pairing" kit
- Pitch: Make onsite/live-verification rounds cheap: scheduling, local partner venues, proctored pairing sessions.
- Why now: Google/Cisco/McKinsey return to onsite. Risk: weak evidence, logistics business, not software. Score: 35.

## 6. Best idea from this domain
Idea 1 (AI-native work-sample evaluation of working with agents). It is the only one that rides the AI trend rather than fighting an arms race, it answers the open question managers raise in 2026 threads, and an MVP is feasible in weeks. Honest weakness: direct price points in the category are low ($79-199/mo), the evidence of willingness to pay is indirect (hiring-tool funding, not purchases of this product), and the big assessment vendors can copy it. Identity/deepfake (Idea 3) has the strongest money signals but is already won by well-funded firms and an acquirer.
