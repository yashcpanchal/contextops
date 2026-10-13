# Reddit evidence: where engineering managers lose time and feel pain (AI era, 2024-2026)

Method note (2026-10-13). WebSearch with `site:reddit.com` returned zero Reddit results across 8 attempts (it returns blogs/vendors). I instead pulled Reddit's public JSON endpoints through a browser session and ran ~60 subreddit-restricted searches (r/EngineeringManagers, r/ExperiencedDevs, r/SoftwareEngineering, r/agile, r/scrum, r/devops, r/cscareerquestions, plus site-wide) and read ~20 threads with top comments. Reddit then rate-limited me, so several candidate threads (listed at the bottom) are title-only. Every quote below was retrieved verbatim (some are cut at my retrieval limit; "..." marks omissions). Upvote counts are as of retrieval (Oct 2026). Caveats: Reddit skews toward complainers; r/EngineeringManagers is small (50-270 upvotes is "big" there); willingness-to-pay evidence on Reddit is weak by nature.

---

## 1. Top pain points, ranked

### P1. Producing status/reporting for leadership eats the EM's time ("the updates became the work")
Frequency: high and recurring across r/EngineeringManagers, r/ExperiencedDevs, r/agile. Intensity: high.

- "Spent most of friday writing the weekly update for leadership. Again. Pulled the Jira stuff, chased three people on Slack to find out where things actually landed, rewrote it twice so it'd read right to the VP. Couple hours gone. The thing it was reporting on didn't take much longer than that to build." (OP, 52 up) https://reddit.com/r/EngineeringManagers/comments/1ump9js/the_status_updates_became_the_actual_work_and_im/
- Same thread, top comment (15 up): "Jira, other aggregations can be automated with Codex, Claude, or Cursor. A lot can be... Is not easy, but the AI can help with building that for you." Another (3 up): "Ensure your reports keep their tickets updated. Then Claude uses Jira MCP to pull work done from date T0 to T1, summarize for intended audience, you review it, and send. No more than 10 minutes max." (Demand is real, but DIY via Claude+Jira MCP is already the workaround, so a thin wrapper is replicable.)
- Same thread, OP on root cause: "I think the reason they keep asking is they don't really trust the system to tell them, and a tidier report doesn't fix that." (A trust/visibility problem, not a formatting problem.)
- "My team shipped a two-week feature in four months" (104 up): "Every handoff added another week of waiting, and every week of waiting triggered another stakeholder asking for a status update, which triggered another meeting to produce the status update, which ate the time we could have used to unblock ourselves." https://reddit.com/r/EngineeringManagers/comments/1ta0pn0/my_team_shipped_a_twoweek_feature_in_four_months/
- IC side of the same pain, r/ExperiencedDevs (comment, 4 up): "The main issue is that everyday I need to read my progress from Jira out loud and tell a Project Manager something that he can know by the ancient art of 'reading'." https://reddit.com/r/ExperiencedDevs/comments/1osdggo/as_tech_leads_and_ems_what_are_the_main_issues/
- Titles seen, not read: "Does anyone else get status update fatigue?" (112 up) https://reddit.com/r/ExperiencedDevs/comments/1rsrnew/ ; "Is anyone writing status updates anymore?" (129 up) https://reddit.com/r/ExperiencedDevs/comments/1wvhhrz/ ; r/agile "Sprint planning burns 85% of the room's time on ticket hygiene and 15% on actual decisions" (68 up) https://reddit.com/r/agile/comments/1wuavx8/

### P2. Review/comprehension load from AI-generated code; no way to know who understands what they shipped
Frequency: the hottest AI-era theme (highest upvotes found). Intensity: very high.

- r/ExperiencedDevs, "Today I announced that I won't be reviewing AI generated PRs at company meeting" (1,920 up, 437 comments): "I find it very easy for me to miss issues during such PR reviews, because the AI generated code looks good and plausible, so it will lead to bugs and security issues." Top reply (1,767 up): "No one should be raising PRs they don't understand - whether it was written by AI or not." https://reddit.com/r/ExperiencedDevs/comments/1towli9/today_i_announced_that_i_wont_be_reviewing_ai/
- Same thread (115 up): "...leadership got eager and pressured for faster delivery. Manager started vibecoding and opening huge PRs that were just impossible to review."
- r/EngineeringManagers, "The 'I don't know, Claude wrote this' pandemic" (854 up, 166 comments): "I ask a question (not a small syntax question, a fundamental software architecture question) and receive a response that makes me want to scream: 'I don't know, Claude wrote this'." https://reddit.com/r/EngineeringManagers/comments/1u9zjhz/the_i_dont_know_claude_wrote_this_pandemic/
- r/EngineeringManagers, "Anyone else feel like they're one audit away from a very uncomfortable conversation about AI?" (220 up, 124 comments): "The issue is I realized I have no idea how often this is happening. I just happened to catch this one. And if someone asked me - a customer doing due diligence, a CTO asking what our AI practices look like, an auditor - I'd have to be honest and say..." (cut at retrieval). Top reply (81 up) pushes back: "IMO invented problem." https://reddit.com/r/EngineeringManagers/comments/1st1u6l/anyone_else_feel_like_theyre_one_audit_away_from/
- r/ExperiencedDevs, "How do you evaluate engineers when everyone's using AI coding tools now" (552 up, 334 comments), tech lead of 6: "Their output looks great. PRs are clean, tests pass, code compiles. On paper they look like they leveled up overnight. But when I ask them questions during review, I can tell they don't fully understand what they wrote." https://reddit.com/r/ExperiencedDevs/comments/1pn39gb/how_do_you_evaluate_engineers_when_everyones/
- r/ExperiencedDevs, tech lead (307 up, 303 comments): "Detailed feedback in reviews, MR after MR. It costs me a lot of time and I see no progress from one MR to the next (he told me he doesn't read my comments and just asks Claude to take them into account)." https://reddit.com/r/ExperiencedDevs/comments/1wteiid/im_a_tech_lead_one_of_my_developers_isnt/
- r/EngineeringManagers, "Cognitive load shift from doing work to checking AI work product" (65 up), quoting a WSJ commenter: "AI displaces the cognitive load from the actual doing of work to checking AI generated output". Reply (12 up): "Before AI, generating code took more effort. That was a kind of filtering mechanism." https://reddit.com/r/EngineeringManagers/comments/1slogmv/cognitive_load_shift_from_doing_work_to_checking/

### P3. Not knowing what is going on: span-of-control growth, memory overload, shallow visibility into individuals
Frequency: medium-high. Intensity: high for EMs; this is the failure the founder saw at Visa.

- "The engineering management memory crisis" (116 up): "I still easily remembered where every project stands, who's working on what, where I should focus next, who wants what from their career, who's struggling... Recently, I started feeling my brain is running out of RAM." Cites Gallup: direct reports per manager "grown from 8 to 12 in the last decade". https://reddit.com/r/EngineeringManagers/comments/1u07jyv/the_engineering_management_memory_crisis/
- Same thread, comments: "And now our management is making noise about managers needing to use AI, and suggesting a manager should have 25 - 50 reports because they've automated things." (4 up). Workaround: "I still use obsidian because it's all just markdown files. Easy for a local ai to parse thru too! I also made some skills to help prep for 1:1s." (6 up). (Managers are hand-rolling personal context systems with AI.)
- "Tracking story points, commits and Jira activity as an indicator.." (18 up): "Recently I made a script that aggregates my engineers' git activity (Commits, MRs, MR comments), Jira activity... and confluence... I do use it to spot outliers. It feels yucky and almost like a breach of trust." Top reply (20 up): "What other management of and/or contact with these people are you doing during the month? Surely you are aware of their progress and work generally?" The poster has "roughly 20 engineers reporting to me, with no leads in between them and myself as the manager." https://reddit.com/r/EngineeringManagers/comments/1vo17o3/tracking_story_points_commits_and_jira_activity/
- "Am I f**** in my EM career ?" (270 up, 140 comments), comment (32 up): "An EM feels like it's five jobs squashed into one." https://reddit.com/r/EngineeringManagers/comments/1qbn4o6/am_i_f_in_my_em_career/
- "What's your biggest source of wasted engineering effort?" (44 up). Engineer comment (32 up): "Providing context to other teams about what im working on to get their assistance or input on something, usually happens in the middle of a project." Others: "Meetings. Multiple strands ups per week when the nature of our work means very little changes or progresses for weeks at a time." (9 up); "Any dependencies on other teams is what wastes the most time." (3 up). https://reddit.com/r/EngineeringManagers/comments/1q1chjl/whats_your_biggest_source_of_wasted_engineering/
- Titles only: "Stop telling your engineers to 'work on visibility'" (125 up) https://reddit.com/r/EngineeringManagers/comments/1r75aql/ ; "How do you turn the invisible daily work of an EM into visible resume 'achievements'?" (40 up) https://reddit.com/r/EngineeringManagers/comments/1pnzcat/

### P4. Cannot justify AI tool/agent spend or prove productivity gains
Frequency: medium, growing in 2026. Intensity: high where present (budget fights).

- "Is AI / token spend becoming a real problem inside companies?" (13 up, 22 comments). OP lists unanswered questions: "Which teams are driving the most AI/token spend? Which workflows are actually worth the cost?... Do managers have any visibility into cost per developer, repo, workflow, or feature?" https://reddit.com/r/EngineeringManagers/comments/1uai5wa/is_ai_token_spend_becoming_a_real_problem_inside/
  - Comment (1 up): "Our bill has doubled every month for 5 mm months. We're at about 60k a month right now. It's not sustainable for a business to grow a cost center that much without provable ROI... What I cannot do is point at commensurate cash flow generation for cost. We're now running POCs for multiple vendors to try and find asse..." (cut at retrieval)
  - Comment (11 up): "...we've been drunk on unlimited token supply for the past few years. Not only was the tooling for spend tracking not there, but there really wasn't any desire to cap spending. But right on cue... I'm now pulled into all kinds of 'tokenomics' meetings."
  - Comment (2 up): "...finance flagged $40k/month in shadow spend. What worked: central API gateway with per-team budgets and a simple dashboard showing cost-per-feature."
  - Comment (1 up): "...the issue is more how do I connect what is being spent on producing (here tokens) to what is coming in as hard cash... If you count tokens now, did you count SLOC before as well...?"
  (Caveat: low upvotes, and the OP appears to be scouting a product idea; treat as anecdotal.)
- "How is engineering right now in your org?" (59 up, 86 comments): "In my company, it is expected from everyone to use it. We have Claude Code and 3k per month per user. Many people haven't written code in months, they became plan and code reviewers." (53 up) https://reddit.com/r/EngineeringManagers/comments/1w1n3ln/
- "AI productivity gains: 10% instead of 10x?" (143 up): "Anecdotally, I'm seeing a pretty wide variance in productivity gains on my teams after adoption of AI tooling..." (22 up); "The problem I'm seeing is the productivity gain in dev/bug fixing is offset by the amount of bad code the weaker devs can produce using AI, which means more time spent fixing those mistakes." https://reddit.com/r/EngineeringManagers/comments/1s8tnd5/ai_productivity_gains_10_instead_of_10x_a_reality/
- Titles seen, not read: "Your team's 'AI productivity' number is probably bullshit" (58 up) https://reddit.com/r/EngineeringManagers/comments/1v2xp68/ ; "AI isn't making developers more productive - it's making them busier. A 741% increase in code written..." (60 up) https://reddit.com/r/EngineeringManagers/comments/1u2tcy3/ ; r/ExperiencedDevs "The AI coding productivity data is in and it's not what anyone expected" (1,401 up) https://reddit.com/r/ExperiencedDevs/comments/1rnkv2t/

### P5. Delivery estimation, surfacing slippage late, cross-team dependency waits
Frequency: medium. Intensity: medium (everyone agrees it is broken; few expect a tool to fix it).

- "Software engineering managers: how do you realize a project is under-estimated?" (37 up): "All projects are underestimated. For a few reasons: developers tend to be naively optimistic... developers tend to consider effort when they give estimates, managers immediately convert it into wallclock time and that's wrong..." (16 up). "Almost any task more than a few days is underestimated... If tasks are overestimated then you have an even bigger problem because people have started padding time to estimates rendering it useless" (8 up). https://reddit.com/r/EngineeringManagers/comments/1q6px2y/
- The two-week/four-month thread, top comment (50 up): "The zeitgeist seems to be that if you make the coding part faster you'll get more features. That 2 week feature would not have shipped faster if it was done in 4 days instead!" Another (8 up): "...every handoff is also a risk transfer. The platform team's review, the schema approval, the stakeholder update - each one exists because someone got burned before when they didn't do it. So the process isn't irrational. It's scar tissue." https://reddit.com/r/EngineeringManagers/comments/1ta0pn0/
- r/ExperiencedDevs on AI in Jira (6 up): "Linear, a competitor, has a tool where you only provide the title and it creates the body content... but it's pure garbage." (5 up): "Sprint planning is manual and should stay like that, because the value is in the discussion itself." The OP there said "most tools just bolt on summaries or estimates and are not that useful." https://reddit.com/r/ExperiencedDevs/comments/1osdggo/
- Titles only: r/SoftwareEngineering "Our team stopped doing standups, story points and retros - and nothing broke" (153 up) https://reddit.com/r/SoftwareEngineering/comments/1rq16fl/ ; r/agile "A Field Guide to the Wildly Inaccurate Story Point" (50 up) https://reddit.com/r/agile/comments/1qu5brj/

### P6. Evaluating people in the AI era; juniors who cannot explain their code; skill atrophy
Frequency: medium-high. Intensity: medium-high; a judgment problem more than a tooling one.

- "How do you evaluate engineers when everyone's using AI coding tools now", top comment (660 up): "Merging stuff without understanding it is completely unacceptable behavior, no matter if you're a junior or senior." Another (96 up): "...ultimately it's them you're reviewing, not ChatGPT." https://reddit.com/r/ExperiencedDevs/comments/1pn39gb/
- Skill atrophy raised by a manager (6 up): "...I talked to everyone about it like it was having a conversation about drugs. That they needed to be aware of cognitive decline and loss of skill because AI is tied to money, and a external service and if there is no money for tokens or the the AI goes down they will need to be able to fix production issues by hand." https://reddit.com/r/EngineeringManagers/comments/1w1n3ln/
- Titles only: "How to deal with juniors that produce 100% AI written stuff that is painful to review?" (123 up) https://reddit.com/r/EngineeringManagers/comments/1va07wd/ ; "Should junior devs read AI code before submitting it for review" (71 up, 142 comments) https://reddit.com/r/EngineeringManagers/comments/1vcj5bl/ ; r/ExperiencedDevs "Anthropic: AI assisted coding doesn't show efficiency gains and impairs developers abilities." (1,099 up) https://reddit.com/r/ExperiencedDevs/comments/1qqy2ro/ ; "Cognitive Debt: When Velocity Exceeds Comprehension" (59 up) https://reddit.com/r/EngineeringManagers/comments/1r7fusx/

Not found / weak: little Reddit evidence that EMs complain about writing performance reviews as a time sink. Closest: "Managers, its yearly performance review time. Any blogs, podcasts, or resources..." (28 up, https://reddit.com/r/EngineeringManagers/comments/1ryyw8d/). Also "I ran 1:1s wrong for my first year as an engineering manager" (267 up, title only).

---

## 2. Willingness-to-pay signals and existing tools

Honest summary: weak, and leaning negative for the incumbent category.
- Engineering analytics (Jellyfish, LinearB, Swarmia) is viewed with suspicion, mostly by ICs. r/ExperiencedDevs "What is the point of LinearB" (21 up): "Every single week for the past two months management has introduced a pejorative change to our established jira+gitlab workflow for the sake of tracking our work on linearB... these changes make our work more complicated and introduce so much manual bureaucracy that it makes us actually slower." Replies: "Presumably it puts numbers on someone's screen that they can use to justify a raise or bonus or whatever" (20 up); "Used well - provides insights into how your team/orf is working and what slows you down (flaky tests, takes 2 days to get a pr reviewed, bugs, etc) so management can fix it. Negatively - performance management and numbers they can use to backup a pip / firing." (4 up) https://reddit.com/r/ExperiencedDevs/comments/1syynbq/what_is_the_point_of_linearb/ (Someone is buying LinearB, and it burdens the team to feed it.)
- r/Hacking_Tricks (low-quality sub, 9 up): "The general consensus seems to be that engineering analytics are at best a mild signal for inefficiencies and at worst dangerous micromanagement tools... did they mostly gather dust after the initial implementation excitement?" Reply: "Small team? Watch out for pricing tiers, they jump fast." https://reddit.com/r/Hacking_Tricks/comments/1oeqai2/which_one_doesnt_suck_between_jellyfish_linearb/
- DIY substitution is the dominant alternative: managers script git+Jira aggregation themselves (P3), use Claude + Jira MCP for reports (P1), Obsidian + local AI for 1:1 prep (P3). It shows managers want to automate, and that a thin wrapper loses to DIY.
- Companies are spending real money on AI tooling ("Claude Code and 3k per month per user", "$60k a month... doubled every month for 5 months") and running "POCs for multiple vendors" for tracking. A buyer with budget and an unmet attribution/ROI need exists, but only low-upvote anecdotes support it.
- Non-Reddit aside (vendor-hosted reviews, skew positive): G2 shows LinearB 4.6 (80 reviews), Jellyfish 4.5 (~432). https://www.g2.com/compare/hatica-vs-linearb-vs-jellyfish-2025-10-22

---

## 3. AI-era-specific new pains (consolidated)

1. Review debt: AI makes code cheap to produce and expensive to review ("looks good and plausible"). Seniors/EMs become the bottleneck; some refuse to review (1,920 up).
2. Comprehension/ownership gap: authors cannot explain the diff ("Claude wrote this", 854 up); managers cannot tell how widespread it is (audit thread, 220 up).
3. AI spend attribution: no per-team/per-feature cost visibility; ROI not tied to revenue; "tokenomics" meetings starting.
4. Productivity measurement is broken: wide variance between engineers; output volume up but outcomes unclear ("busier, not more productive").
5. Evaluating people: output no longer signals skill; juniors look senior on paper.
6. Skill atrophy and dependency risk: managers raise it, no tooling.
7. Managers themselves vibe-coding huge PRs; leadership pressure to go faster; "a manager should have 25 - 50 reports because they've automated things."
8. Bottleneck displacement: faster coding does not shorten calendar time (handoffs, reviews, dependencies).

---

## 4. Candidate startup ideas

Scoring: Y = yes, P = partial, N = no. Columns: Demand (proven on Reddit), Sellable (companies will not build in-house), AI-proof (survives Copilot/Claude absorbing it), Evidence (real problem, quotes above), Buyer (specific).

| # | Idea | Demand | Sellable | AI-proof | Evidence | Buyer |
|---|------|--------|----------|----------|----------|-------|
| 1 | AI spend + outcome attribution: token/agent cost per team, repo, ticket, PR, tied to shipped work and review burden (FinOps for AI coding) | P | Y (cross-vendor; vendors have no incentive to be neutral) | Y (vendor dashboards are siloed) | P (low-upvote anecdotes: $60k/mo, "tokenomics" meetings) | VP Eng / CTO + finance |
| 2 | Comprehension/provenance layer for AI-assisted PRs: capture the plan/session behind a diff, flag "author can't explain" risk, give EMs an AI-usage audit trail | Y (854-1,920 up threads) | P (GitHub could ship basics) | P (cross-tool provenance harder to absorb) | Y | EM / tech lead; security/compliance for the audit angle |
| 3 | Trusted status for leadership: pull Jira+GitHub+Slack, write the weekly update with each claim linked to evidence | Y (many threads) | P (Claude+Jira MCP is the stated DIY substitute) | N-P (summary is easy for a general agent; defensible part is cross-system evidence and stakeholder views) | Y | EM / director |
| 4 | "Manager memory": persistent per-person and per-project context across 1:1s, PRs, Slack, tickets; prep briefs; surfaces who is blocked/struggling; for managers with 12-25+ reports | Y (116 up; Obsidian+AI workarounds) | P (HR-sensitive data trust barrier) | P (needs deep integrations; big vendors could ship) | Y (matches founder's Visa anecdote) | EM / director with large span |
| 5 | Review triage for seniors: predict which PRs need human attention (risk, novelty, author understanding), route and cut senior review load | Y | P (many AI review vendors exist; not verified on Reddit in this pass) | P | Y | Tech leads, staff engineers |
| 6 | Cross-team dependency/handoff tracker predicting calendar delay (reviews, schema approvals, platform queues), not coding effort | P (one strong thread, 104 up) | Y (spans teams; no single team builds it) | Y (org-graph data, not coding speed) | P | Director / VP Eng, TPMs |
| 7 | Evidence-backed performance/calibration support: dated, sourced record of each engineer's work for review and promotion cases, incl. "understands what they ship" signals | P (little direct Reddit demand) | P | P | N-P | EM; HR sponsor |
| 8 | AI-adoption analytics: which engineers gain vs. lose from AI and why (workflow patterns), for targeted enablement | P (variance quotes, 22 up) | Y (cross-org benchmarking) | P | P | VP Eng / enablement lead |

My ranking by evidence-weighted promise: #2 and #4 (strongest pain, closest to the founder's "EM leverage / know what my team does" story), then #1 (best on sellable + AI-proof, weakest Reddit signal; validate off-Reddit), then #3 and #6. #3 is the most demanded but the easiest to DIY.

---

## 5. Honest take on "estimate the cost of a feature/Jira ticket from agentic coding behavior + employee efficiency"

Verdict: as the headline wedge, I would not lead with it. Reddit evidence is thin and partly against it. It may survive as a feature inside a broader product (ideas #1 or #6).

Against:
- Nobody on Reddit asked for ticket cost estimation. Estimation threads show resignation, not demand: "All projects are underestimated" (16 up); "Sprint planning is manual and should stay like that, because the value is in the discussion itself" (5 up).
- Calendar time is dominated by non-coding delay. The strongest estimation-related thread (104 up) shipped a "two-week" feature in four months with code done in two weeks; top comment (50 up): "That 2 week feature would not have shipped faster if it was done in 4 days instead!" A model of agentic coding effort plus employee efficiency would have predicted the 2 weeks and missed the 4 months.
- "Employee efficiency" modeling collides with the surveillance backlash: "numbers they can use to backup a pip / firing" (LinearB thread); "It feels yucky and almost like a breach of trust" (git/Jira activity thread). Selling per-person efficiency to build estimates invites resistance from the engineers whose data you need.
- AI-bolted estimation is already mocked ("most tools just bolt on summaries or estimates and are not that useful"; AI-generated ticket bodies are "pure garbage").
- For agentic work, token cost per ticket is small relative to review, integration, and waiting cost.

For (the surviving kernel):
- Managers have the adjacent unanswered question: "Do managers have any visibility into cost per developer, repo, workflow, or feature?" and "how do I connect what is being spent on producing (here tokens) to what is coming in as hard cash." That is retrospective cost attribution (what a feature actually cost in tokens, review time, and waiting), a different and better-supported product than prospective estimation.
- EMs feel under-estimation pain ("how do you realize a project is under-estimated?"), so flagging slippage early from real signals (review queue age, dependency waits, AI-heavy PRs with low comprehension) is plausible, but sell it as risk detection, not cost estimation.

Suggested reframe: "true cost and true status of work" (retrospective attribution plus early risk signals including review and handoff delay), built on the same data pipeline, aimed at EM/Director as a reporting time-saver (P1) and at VP Eng as AI-ROI proof (P4). Validate with 10-15 EM/VP interviews because Reddit cannot confirm willingness to pay.

---

## Retrieval limits and unverified items
- Reddit rate-limited my session before I could open these threads (titles/scores from search results only): r/ExperiencedDevs 1wvhhrz, 1rsrnew; r/EngineeringManagers 1va07wd, 1vcj5bl, 1v2xp68, 1u2tcy3, 1ttusa1, 1umjtlq; r/agile 1wuavx8; r/SoftwareEngineering 1rq16fl.
- Not found: solid Jellyfish-specific Reddit reviews (only one low-quality subreddit thread), Copilot/Cursor ROI threads in r/sysadmin, r/startups/r/SaaS demand for EM tools, a standalone IC-side "manager doesn't know what I'm working on" thread. r/ProductManagement search errored.
- A blog (devleader.ca, 2026-05-17, "When Reddit says quit your manager") summarizes an r/ExperiencedDevs thread about a manager who did not understand the work, advice mostly "leave". I did not locate or verify the original thread.
