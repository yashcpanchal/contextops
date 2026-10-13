# Phase 1: Manager<->IC Visibility and People-Management Workflow

Date: 2026-10-13. Method: web search/fetch only. WebSearch could not reach Reddit/X/HN threads directly, so **no verbatim Reddit/HN quotes were obtained**; quotes below come from pages actually fetched (jvns.ca, Gallup, Blind, Cornell, IT Brew). Items marked (secondhand) were not verified against a primary source. Nothing is fabricated; gaps are stated.

## 1. Ranked pains

1. **Manager does not know/remember what the IC did, so cannot advocate (review, promo, calibration).** Strongest, most-cited pain.
   - "the people making the decision didn't understand or remember what you did." / "your manager (no matter how great they are!) probably doesn't either." / "if your manager is going to effectively advocate for you, they need help." (Julia Evans) https://jvns.ca/blog/brag-documents/
   - Manager side: "this makes my job way easier, now I can look at the document when writing your perf review" (same page).
   - Manager transition makes it worse: new manager "may not have been aware of any of your work before" (same).
   - The workaround is fully manual (brag docs, Friday work logs, templates such as https://tonydelanuez.gumroad.com/l/promopacket). Demand is evidenced by how widespread the manual workaround is.
2. **1:1s degrade into status meetings; manager has little time.**
   - Blind (Microsoft, Oct 2022): "My manager uses my one-one-one time to talk about status updates." Author describes "zero room for growth" and is leaving. https://www.teamblind.com/post/manager-11s-short-rant-qrj8jvr2
   - Gallup (Jan 2026): only 16% of ~15,000 employees said their last manager conversation was extremely meaningful; weekly meaningful feedback "nearly triples" the engaged share. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
3. **Growing spans of control.** Gallup average direct reports 10.9 (2024) -> 12.1 (2025), ~50% up since 2013; median still 5-6; 22% of managers have 10-24 reports, 13% have 25+. 97% of managers also have IC duties, median 40% of their time. "Manager talent trumps span of control." (Same Gallup URL.) Engineering-specific figures (40% of eng leaders have more reports than a year ago; avg EM 8-12 reports) are secondhand blog citations of LeadDev 2025 and unverified: https://dev.to/d_v_/engineering-manager-overload-40-more-reports-18ho
4. **Interns / new hires get little manager time and no visibility** (matches founder anecdote). Blind: intern got no project for a month, 1:1s 10-15 min/month because manager "kept forgetting or was busy"; only feedback came at the end (ramp-up slow, didn't flag blockers early). https://www.teamblind.com/post/bad-internship-experience-1csep2rt (from search summary, not fetched in full). Also https://askamanager.org/2012/12/advice-for-interns-uninvolved-managers-attending-more-meetings-and-more.html
5. **Invisible / glue work goes unrewarded.** Evans: fuzzy work "is the most likely to fall under the radar"; people "leave this kind of work out because they don't know how to explain why it's important." Tanya Reilly's "Being Glue" (noidea.dog/glue) is the canonical essay; I could not fetch it. A Blind commenter says the manager "owns 90% of the promo" (anecdote): https://www.teamblind.com/post/l3-l4-promo-packet-baqfytmf
6. **Recency bias and packet/review writing burden.** Guides repeatedly say to log continuously because recency bias makes managers overweight recent events (https://leaddev.com/management/performance-season-made-easy-proven-strategy). A promo packet is an exec summary plus 3-5 impact stories, the slow part.
7. **Standup/status updates become copy-paste busywork.** Bot-based async standups "became copy-paste jobs" (secondhand): https://madewithlove.com/blog/communicate-or-be-micromanaged-the-engineering-edition/

## 2. Time-spent stats (weak for engineering specifically)
- ~210 hours/yr per manager on performance management (attributed to CEB/Gartner, ~10% of work year); employees ~40 hrs. Widely repeated vendor stat, no current primary source found. https://engagedly.com/on-an-average-managers-spend-210-hours-on-annual-performance-reviews/
- Korn Ferry 2018 (n=538): largest group spent 7+ hours on their own review. https://www.kornferry.com/press/disappointing-and-ineffective-welcome-to-the-world-of-performance-reviews-according-to-global-professionals-surveyed-by-korn-ferry
- LeadDev 2025 State of Eng Management (n~1,400; secondhand): 40-48% of week in meetings. Not verified.
- Gap: **no credible engineering-manager-specific benchmark for hours on status/review/promo prep.** Customer discovery must generate this.

## 3. Surveillance backlash (key risk)
- McKinsey 2023 "developer productivity can be measured" article: Kent Beck called it "absurd and naive"; Dave Farley "harmful dribble"; core objection is individual-level measurement (secondhand). https://devops.com/should-you-measure-developer-productivity
- Harness survey (n=700, commissioned; via IT Brew): 54% of developers fear performance evaluations based on AI data; 55% want improvement data separated from performance data; 49% want involvement in defining metrics; ~50% want transparency. Coderbyte's Nis Frome: "You can definitely consume lots of tokens without being a very productive engineer." https://www.itbrew.com/stories/developers-fear-performance-evaluations-based-on-ai-data-survey
- Cornell (Schlund & Zitek, Communications Psychology, 2024, ~1,200 participants): AI monitoring made people feel less autonomy; >30% criticized an AI monitor vs ~7% a human monitor; worse performance. **Framing as developmental feedback rather than evaluation removed the extra intrusiveness effect.** https://www.news.cornell.edu/stories/2024/07/more-complaints-worse-performance-when-ai-monitors-work
- JetBrains: 66% of devs distrust productivity metrics applied to them (secondhand blog). https://tianpan.co/forum/t/66-of-developers-mistrust-productivity-metrics-and-30-of-platform-teams-measure-nothing-the-600k-year-measurement-crisis/648
- Gartner review of Swarmia: customer says trust eroded and the team lost "judgement, context, and dialogue rather than surveillance"; took deliberate effort to unwind. https://www.gartner.com/reviews/product/swarmia/alternatives
- Not found: direct HN/Reddit threads (search limitation).

**How products avoid it:** team-level not individual metrics (DORA-style accepted); IC-owned data (the brag doc is by the IC, for the IC); separate improvement from evaluation; transparency about what is collected; ICs can see/edit what the manager sees; developmental framing; no keystroke/idle/AI-token leaderboards; Swarmia positions as giving engineers more control.

## 4. Existing tools and gaps
- Lattice: AI agent summarizes past feedback, 1:1s, goals for review writing; Writing Assist; Waterford.org case study (vendor-published) says managers wrote reviews 2x faster. https://lattice.com/articles/using-ai-to-write-performance-reviews-everything-you-need-to-know
- Culture Amp: sentiment/theme analysis of open text. 15Five: reviews built from check-ins. Leapsome, Betterworks: no data obtained.
- Standup/status: Geekbot, Range, Spinach (raised $2.75M pre-seed, Zoom-backed; no later news found), Fellow (rebranded Fellow.ai Jan 2026), Steady. No status/pricing info found for Range or Geekbot.
- Eng intelligence: Jellyfish (G2 4.5/5, 435 reviews), LinearB, Swarmia. Target execs/finance; individual ICs mostly absent.
- No independent evidence found on employee reception of AI-written reviews (only vendor content).
- **Gaps:** (a) HR suites are generic and not connected to where engineering work lives (PRs, design docs, incidents, Slack); they rely on what people type. (b) Eng-intelligence tools measure output metrics, not narrative impact, and carry surveillance baggage. (c) Nobody serves the IC-side evidence log that managers consume with IC consent. (d) Intern/new-hire visibility is unserved. (e) Calibration-prep evidence is manual.

## 5. Candidate startup ideas
Scores 1-5 are my judgement, not data: Demand / Sellable (not built in-house) / AI-durable / Evidence / Buyer clarity.

1. **Consent-based "work narrative" auto-brag-doc**: connects GitHub/Jira/Slack/docs, drafts weekly impact entries for the IC to approve, shares a curated summary with the manager. D5 S3 A4 E4 B3. Risk: ICs pay little; HR suites can bolt on; templates are free.
2. **Manager 1:1 + status prep brief**: before each 1:1, auto-brief per report (shipped, blockers, stuck PRs, unanswered threads) so 1:1 time goes to growth. D4 S4 A3 E3 B4 (EMs with 8+ reports). Risk: general agents (Copilot, Notion, etc.) commoditize; data-access security reviews.
3. **Review/promo-packet evidence assembler with citations** (each claim linked to PR/doc/incident, plus peer signal) for EMs and calibration. D4 S4 A4 E3 B5 (EM / Head of Eng at ~100-2000 eng companies). Risk: Lattice/Leapsome add similar; needs strong eng-system integrations (the gap).
4. **Glue-work surfacer for calibration** (review load, onboarding help, incident coordination, docs), opt-in or team-level. D3 S3 A4 E3 B3. Risk: surveillance perception unless IC-controlled; thin willingness-to-pay evidence.
5. **Intern/new-hire visibility and onboarding copilot** (30-day plan, auto progress summary to manager and mentor, flags stalled interns). D3 S3 A3 E3 B3-4 (university recruiting / eng enablement). Founder-story fit; evidence anecdotal; seasonal buyer.
6. **Large-span / skip-level weekly digest**: team risks, blockers, wins from existing systems with no new check-ins. D3 S3 A3 E3 B4. Risk: closer to surveillance; Gallup shows spans growing (tailwind).
7. **Self-writing async standup**: Slack message synthesized from activity, human edits. D3 S2 A2 E2 B3. Weak: crowded (Geekbot, Spinach, Range), feature-level once AI is built into Slack/Jira. Baseline, not a recommendation.
8. **Calibration-room assistant**: normalized evidence cards per candidate, flags recency bias. D3 S4 A4 E2 B5 (Eng VP + HRBP). Only secondhand evidence; needs interviews.

**Preliminary ranking from this angle:** 3 > 2 > 1 > 5 > 8 > 6 > 4 > 7. Idea 3 has the clearest buyer and proven pain (manager cannot remember/prove impact). Combining 1 and 3 (IC-owned evidence feeding manager packets) best handles the surveillance risk and the founder's story.

## 6. Open questions for customer discovery
- Real hours EMs spend per cycle on review/promo writing and on 1:1/status prep (no good benchmark exists).
- Will companies grant a startup read access to GitHub/Slack/Jira, and would Lattice, GitHub Copilot or Atlassian ship this natively?
- Do ICs accept manager-visible summaries if they control publishing?
- Search Reddit (r/ExperiencedDevs, r/EngineeringManagers), HN and X manually for verbatim quotes; tooling here could not.
