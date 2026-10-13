# Round 2: Reddit direct demand mining (reddit_demand.md)

Method: Playwright browser, same-origin fetch of Reddit `search.json` and `/comments/<id>.json` (www.reddit.com/r/<sub>/search.json returned 403 on direct navigation, but worked as fetch() from a loaded reddit.com search page). About 89 search queries attempted across ExperiencedDevs, EngineeringManagers, devops, sre, QualityAssurance, cscareerquestions, startups, SaaS, cto, ProductManagement, programming, webdev (about 16 were 403 rate-limited, r/cto returned empty); 29 threads read with top comments. Window: top of past year (threads dated roughly Oct 2025 to Oct 2026). All URLs are https://www.reddit.com + the path shown. Score/comments shown as score/comments. Quotes are verbatim from retrieved text (some truncated at ~300 chars).

HONEST CAVEAT: Reddit gave almost NO literal "I would pay" statements (the phrase searches returned nothing relevant in every sub). The evidence is mostly ladder level 4 "pain + DIY workaround" (Notion pages, spreadsheets, grep, "wait for screaming"). No pricing or budget data came from Reddit. Also, many top replies say "just use tool X (FireHydrant, Wiz, Backstage)" which signals bundling risk.

## 1. Domain overview
- Reddit engineering communities are loud about AI side-effects on teams (review burden, shadow apps built by non-engineers, comprehension debt), more than about classic tooling gaps.
- The "is there a tool" and "how do you track" searches mostly surface people describing a manual workaround, not asking for a product by name.
- Strongest non-round-1 clusters: (a) ungoverned vibe-coded internal apps, (b) postmortem action items that never get done so incidents repeat, (c) unknown consumers/owners of shared modules, (d) runbook/knowledge rot.
- Round-1 territory (AI spend, status reports) shows up again: EMs spend hours assembling leadership reports and are being asked to rank people on AI token usage.
- Commenters in nearly every thread push back on "just buy a tool" with "it's a process/culture problem", which is the main sellability risk.

## 2. Demand evidence table
| signal | ladder | number | source |
|---|---|---|---|
| Non-engineers shipping prod-accessing vibe-coded apps at a huge company; devs ask to contain it | 4 | 245 score / 168 comments | /r/ExperiencedDevs/comments/1ssdsq5/ |
| DevOps asks how to secure vibe-coded internal apps deployed to Vercel/Cloudflare by marketing/sales | 4 | 123 / 141 | /r/devops/comments/1td7mxp/ |
| "Vibe coders at my company didn't pay attention to security and got a taste for it" | 4 | 901 / 190 | /r/webdev/comments/1qnnnm5/ |
| C-suite vibe-coding prototypes that were scoped at 2-4 weeks | 4 | 106 / 65 | /r/EngineeringManagers/comments/1s7xmww/ |
| Same root cause postmortem recurs; action items never done | 4 | 398 / 86 (devops) and 178 / 32 (sre) | /r/devops/comments/1oeyqqd/ ; /r/sre/comments/1onsawy/ |
| Tracked time: 15-20% of meeting time re-debating settled decisions | 3 (self-measured, n=1 team) | 75 / 43 | /r/ProductManagement/comments/1tefsv1/ |
| Tracked time: "40% of my job is Data Copy-Pasting" (EM) | 3 (self-measured) | 21 / 6 | /r/EngineeringManagers/comments/1psxb6h/ |
| Incident report for CTO took 4 hours, data scattered across Slack/Jira/PagerDuty/Docs | 3 | 58 / 34 | /r/sre/comments/1o93gix/ |
| Shared module change: consumers found via "grep", "a spreadsheet someone maintained until they left", or "ship it and see who shouts" | 4 (DIY workaround) | 10 / 114 | /r/devops/comments/1wo5fyv/ |
| GitHub assigned owners to 14,000+ repos in 45 days (less than half had a clear owner early 2025) | 2-3 (summary of vendor-employer blog, secondary) | 86 / 20 | /r/devops/comments/1v7o3i8/ |
| Notion DR runbook stale, outage (OP may be AI-assisted, commenters suspect engagement bait) | 4 (flag: possibly promotional) | 349 / 92 | /r/devops/comments/1o5mdjd/ |
| "I won't be reviewing AI generated PRs" | 4 | 1917 / 437 | /r/ExperiencedDevs/comments/1towli9/ |
| "The 'I don't know, Claude wrote this' pandemic" | 4 | 855 / 166 | /r/EngineeringManagers/comments/1u9zjhz/ |
| EM asked to stack-rank engineers on AI token usage + Jira velocity | 4 (round 1 adjacent) | 44 / 37 | /r/EngineeringManagers/comments/1tok9om/ |
| 9,300+ "I wish there was an app for this" posts analyzed (meta, secondary, unverified method) | 4/5 | 805 / 269 | /r/SaaS/comments/1q5lfur/ |

## 3. Pain points ranked (count x engagement)

### P1. Ungoverned vibe-coded / AI-built internal apps by non-engineers (OUTSIDE round 1)
Count: 5 threads, combined score about 1,600, 560+ comments. Highest engagement of any tooling-shaped pain.
- "has made a tool so that any sales / operational / middle manager can make production accessing vibe coded apps. These people have no code experience at all, and no clue how it's working when asked." (245/168) /r/ExperiencedDevs/comments/1ssdsq5/
- OP in /r/devops/comments/1td7mxp/ (123/141): "more people across the company are building small internal apps on their own - not just developers, but also folks from marketing, product, and sales. These apps often get deployed quickly on platforms like Vercel, Cloudflare" ... top reply (401): "Good luck." Another (203): "Security has left the station already when it comes to AI ... Warn of the dangers, suggest they shouldn't do it, in writing." Another (40): "They're not getting deployed."
- "In my company the CTO vibe codes 'prototypes'. This is typically 20,000 lines of code on a branch. It's the responsibility of a team to move that into production." (99, in 1ssdsq5)
- Reaction type: no named product anyone recommends; replies are resignation or policy ("immediately fired"). That is a gap signal, but also a "nobody has budget authority yet" signal.

### P2. AI-generated PR review burden and unaccountable code (round 1 adjacent, not spend/status)
- "I was reviewing PRs from data scientists (python developers) for the web service. The data scientists were using Claude Code to generate changes" (1917/437) /r/ExperiencedDevs/comments/1towli9/
- "An engineer in my team asks me to go over a PR. It's quite a big one, tens of files, 1000..." (855/166) /r/EngineeringManagers/comments/1u9zjhz/
- "One of our devs submitted a PR. Code was clearly AI-generated (fine, we allow it). I asked why they'd structured it that way. They couldn't tell me." (219/124) /r/EngineeringManagers/comments/1st1u6l/ . Top reply (84) calls it an "invented problem"; another says require plans in the ticket. Weak tool pull, strong pain.

### P3. Postmortem action items never completed, incidents repeat (OUTSIDE round 1)
- "action items were increase pool size and add better monitoring. neither happened because we needed to ship features to stay competitive." (398/86) /r/devops/comments/1oeyqqd/
- "Got paged at 2am for the same Redis issue we 'fixed' in our June postmortem" (178/32) /r/sre/comments/1onsawy/ . Reply (9): "go through all the recent postmortems, find all the outstanding followup tasks, score them by risk (that's impact * likelihood), and then raise hell". Top reply (169): "Assign money values to the incidents." This is a manual process someone describes by hand, which is the product spec.
- Two near-identical threads in two subs a few days apart.

### P4. Who consumes / owns this shared thing? (OUTSIDE round 1)
- "I've seen it done with grep, with a spreadsheet someone maintained until they left, and with 'ship it and see who shouts in Slack'" (10/114) /r/devops/comments/1wo5fyv/ . Top answer (32): "Wait for screaming". One reply: "Using wiz we can see who adopted our chart on our clusters, what version they are on".
- "someone pushes a breaking change to a shared Docker image or a Terraform module, and then pipelines in other repos start failing." (24/51) /r/devops/comments/1ry0edd/ . Replies: write YAML for Backstage, use monorepo, pin versions.
- "How do you centrally track infra versions & EOLs (AWS Aurora, EKS, MQ, charts, etc.)?" (5/3, tiny) /r/devops/comments/1r11jrf/ ; reply: "everything from Excel spreadsheets to interna[l tools]".
- GitHub owner-assignment case (86/20): /r/devops/comments/1v7o3i8/

### P5. Decision memory and tribal knowledge (OUTSIDE round 1, high AI-absorption risk)
- "We spent roughly 15-20% of meeting time on some version of 'wait, why are we doing it this way?'" (75/43) /r/ProductManagement/comments/1tefsv1/ . A reply gives a DIY stack: Copilot transcripts into Claude Projects, "Ask Claude why you made a decision" (so AI already substitutes).
- "I'm facing a knowledge transfer crisis" as the oldest engineer leaves (93/56) /r/EngineeringManagers/comments/1qut5qh/ . Top replies are process advice (revoke access, forced pairing), not tools.

### P6. EM admin: reports, 1:1 prep, promotion evidence (ROUND 1 territory: status reports, absorbed by Lattice/Atlassian)
- "Spent most of friday writing the weekly update for leadership. Again. Pulled the Jira stuff, chased three people on Slack" (55/23) /r/EngineeringManagers/comments/1ump9js/ . Reply: "can be automated with Codex, Claude, or Cursor."
- "CTO wants to know mttr, incident frequency by service, on call load per person ... cool let me just pull that from... nowhere because its scattered across slack jira pagerduty and google docs" (58/34) /r/sre/comments/1o93gix/ . Top reply (57): "Pulling that data from FireHydrant ... is pretty easy". So incumbents already cover it.
- "When promo time comes around, everything turns into a memory + narrative exercise" (26/20) /r/EngineeringManagers/comments/1qnbm2g/ ; one reply says he uses a tool (CodePulse) that pulls evidence from GitHub.
- 1:1 prep: Notion/Google Doc per person is the standard workaround (24/26) /r/ExperiencedDevs/comments/1oihrz2/ ; (67/55) /r/EngineeringManagers/comments/1qwphmp/ where top reply says reduce reports instead.
- Glue-work documentation (285/66) /r/ExperiencedDevs/comments/1twf46y/ top comment just links a static essay.

### P7. Runbook rot and incident evidence (OUTSIDE round 1)
- "The Notion 'DR runbook' was authored years ago by someone who left the company last quarter. Nobody ever updated it or tested it" (349/92) /r/devops/comments/1o5mdjd/ (commenter suspects the post is engagement bait/promo, treat as weak).
- "customers are asking about how we test incident response ... we've never really treated it as something that needed evidence" (48/21) /r/devops/comments/1q0nrdy/
- "What changed?" during an incident (0/59, comments cynical, likely a market-research post) /r/devops/comments/1vatqr6/

### P8. AI makes infra/DevOps the bottleneck; shared-tool fragmentation
- "Anyone else seeing AI make DevOps/infra the bottleneck?" (188/125) /r/devops/comments/1w42bxs/ ; top reply (158): solved by "opinionated, self-service IaC".
- "no one wants to use shared tools anymore - they just build their own ... In an afternoon" (137/89) /r/ExperiencedDevs/comments/1rngpbv/ ; also a build-vs-buy warning: internal tools get built in an afternoon.

### P9. Measuring AI performance of people (ROUND 1 territory: AI spend)
- "My company started tracking AI usage - token usage and spend ... now my manager wants me to stack-rank my engineers on 'AI performance'" (44/37) /r/EngineeringManagers/comments/1tok9om/ . Demand exists but sentiment is hostile to the metric.

## 4. Incumbents & gaps (from what commenters named; I did not research funding)
- Incident mgmt (FireHydrant named by a top commenter; PagerDuty/Opsgenie named elsewhere): reporting is "easy" for those who own the tool; gap is cross-tool rollups and tying action items to cost/risk (commenters describe doing it by hand).
- Service/ownership catalogs (Backstage named in /r/devops/comments/1ry0edd/; Wiz named for chart adoption): users still use grep and spreadsheets; Backstage YAML maintenance is itself seen as manual burden.
- EM people tools: Notion/Google Docs dominate; CodePulse mentioned once for GitHub-evidence promo packets.
- Shadow-app governance: NO product was recommended in any thread; replies were resignation or policy. (Adjacent categories like SaaS management / AppSec exist but I did not verify.)
- Meta: In r/sre, "Every AI SRE tool on my feed just raised money.. what do we think this is actually signaling" (11/25) /r/sre/comments/1stfo39/ indicates the AI-SRE space is crowded; avoid.

## 5. Candidate startup ideas (Reddit-derived; scores harsh, rubric A20 B20 C20 D15 E10 F15)

### Idea A. Shadow-app registry and guardrails for vibe-coded internal apps
- Pitch: Auto-discover internal apps built by non-engineers on Vercel/Replit/Lovable/Cloudflare (via SSO/OAuth, DNS, domain and cloud-account scans), assign an owner and expiry, flag prod-data access and public exposure, and give security a one-click "adopt, quarantine or kill".
- Buyer: Head of Security / Head of Platform / VP Eng at a 200-5,000 person company where "everyone is an engineer now".
- Why now: Cursor/Claude Code/Replit have non-devs shipping; company-provided vibe-coding platforms (1ssdsq5) are spreading.
- Why not in-house: security teams lack the discovery surface; this crosses SaaS, cloud and identity. Why AI-durable: it is governance of AI output, which grows with AI progress (a model release makes more shadow apps, not fewer).
- Wedge MVP: read-only connector to Google/Okta OAuth grants plus Vercel/Cloudflare/Netlify team APIs and a DNS/subdomain scan; weeks of work, public APIs.
- Top 3 signals: 1ssdsq5 (245/168), 1td7mxp (123/141 + no tool named), 1qnnnm5 (901/190).
- Biggest risk: category may be absorbed by SaaS-management/CASB/AppSec vendors and the platform vendors themselves; Reddit shows pain but zero budget statements.
- Self-score: A 13, B 12, C 16, D 8, E 6, F 10 = 65 (with Reddit-only evidence; must be validated with buyer interviews and incumbent research).

### Idea B. Incident follow-through ledger (postmortem action items to risk-scored backlog)
- Pitch: Pull action items from postmortems across tools, link to Jira, score by recurrence and dollar cost, detect "same root cause again", and report a weekly "unfixed risk" number to the VP.
- Buyer: Director of SRE/Platform or VP Eng, 100-1,000 engineers.
- Why now: repeat-incident pain is vivid (two viral threads); AI-written code raises incident volume (inference).
- Why not in-house: dull glue work nobody owns; but incident tools could add it. AI-durable: partly; summarizing is commoditized, cross-tool accountability and cost attribution less so.
- Wedge: Slack + Jira + Google Docs/Confluence postmortem parser; GitHub issues as sink.
- Top signals: 1oeyqqd (398/86), 1onsawy (178/32, comment describing the manual scoring method), 1o93gix (58/34).
- Biggest risk: FireHydrant/incident.io/PagerDuty bundle this; commenters say "your tool should do it".
- Self-score: A 10, B 10, C 13, D 8, E 7, F 11 = 59.

### Idea C. Internal-dependency consumer map and blast-radius check
- Pitch: Auto-build "who consumes this module/base image/Helm chart/CI template" from repo scans (GitLab/GitHub), warn on PRs that change shared artifacts, and list owners to notify.
- Buyer: Platform engineering lead, 300+ engineers with hundreds of repos.
- Why now: AI makes people fork/build their own shared libs (1rngpbv) and ship more changes.
- Not in-house: org spreadsheet rots ("maintained until they left"); Backstage requires hand-maintained YAML. AI-durable: needs org-wide graph, not a model release.
- Wedge: GitHub App that scans for Dockerfile FROM, Terraform module sources, workflow `uses:` and comments on PRs.
- Signals: 1wo5fyv (10/114, direct DIY quotes), 1ry0edd (24/51), 1v7o3i8 (86/20).
- Risk: low virality, Backstage/Cortex/OpsLevel and Wiz-style adoption views; scores are small.
- Self-score: A 9, B 9, C 15, D 7, E 7, F 9 = 56.

### Idea D. AI-authorship accountability trail for PRs (provenance and comprehension attestations)
- Pitch: Record which parts of a PR were AI-generated, require the author to attest/answer a short comprehension check, and give auditors a log.
- Buyer: EM/Director with audit or regulatory exposure.
- Signals: 1towli9 (1917/437), 1u9zjhz (855/166), 1st1u6l (219/124).
- Risk: top replies call it an "invented problem" or solvable by plans-in-ticket; GitHub/Copilot can ship this natively.
- Self-score: A 12, B 8, C 8, D 8, E 6, F 8 = 50.

### Idea E (rejected). Decision memory / "why did we decide this" (1tefsv1). Commenters already solve it with Copilot transcripts + Claude Projects. A 8, B 5, C 4, D 6, E 5, F 9 = 37.

## 6. Single best idea from this domain
Idea A (shadow-app registry and guardrails), tentatively, because it has by far the highest engagement, no named incumbent in any thread, the pain grows with every AI release (the opposite of the round-1 absorption trap), and a student-feasible read-only MVP. Be honest about the weakness: Reddit shows pain and helplessness, not budget; confirm with 10 security/platform buyer calls and a check of SaaS-management and AppSec incumbents before committing. Runner-up: Idea B, which has more concrete "I do this by hand" spec text but more bundling risk.

Themes in round 1 territory (de-prioritize): EM weekly status/leadership reports (P6), AI usage ranking (P9). Themes OUTSIDE round 1: P1, P3, P4, P5, P7, P8.
