# Round 2 deep-dive: governance of AI-built "shadow apps"

Researched 2026-10-13. Web figures marked [sec] are secondary or aggregator-sourced and not verified at primary source. Pricing was NOT retrievable for any incumbent. Reddit comment-level quotes were not retrievable (archive 422s/timeouts, old.reddit blocked); thread titles and first lines are from the helper's post search.

## 1. Domain overview
- Non-engineers (ops, finance, sales, COOs, marketing) now ship internal dashboards and tools with Lovable, Replit, Base44, Bolt, Claude Code and plain HTML, and IT/engineering inherits them.
- The pain is loud in r/sysadmin and r/cybersecurity (several threads of 250-1,700 upvotes), with real exposure incidents: RedAccess, Escape, Tea, Moltbook and the Lovable RLS CVE.
- Money is moving in adjacent categories (Zenity $125M Series C in Aug 2026, WitnessAI $58M, Nudge $22.5M, Backslash $19M) but nobody has been found owning "inventory + risk scan + owner + promotion path across ALL AI app builders".
- The vendors themselves are now closing the gap per tool: Lovable shipped "Workspace Insights" (inventory, owners, PII scan, abandoned-app cleanup) on 2026-07-24. This is the central durability threat.
- Verdict up front: real pain, weak budget owner, high feature-absorption risk. Best case is about 50/100, not above the 56 baseline of round 1.

## 2. Demand evidence table
| Signal | Ladder | Number | Source |
|---|---|---|---|
| Lovable ARR: $100M (summer 2025) -> $300M (Feb 2026); $400M raise at $13.3B valuation reported; "large enterprises moving from testing to production" [sec] | 1/2 | $300M ARR, $13.3B | https://www.vktr.com/ai-platforms/lovable-raises-400-million-at-133-billion-valuation/ ; https://finder.techleap.nl/news/feed/lovable-hits-300m-arr-after-tripling-revenue-since-summer |
| Replit: $400M Series D at $9B (Mar 2026), claims 85% of Fortune 500 users (Replit's own blog, [vendor]); ARR figures inconsistent (2025 rev about $240M [sec]) | 2 | $9B | https://www.trendingtopics.eu/replit-raises-400m-tripling-its-valuation-to-9-billion-in-six-months/ |
| Torii usage data: Replit in 68% of its customers' companies, Lovable 64%, Base44 38%; Lovable "Shadow IT index" 64%, Base44 100% (i.e. mostly unsanctioned) [vendor data] | 3 | 64% of Lovable use unsanctioned | https://www.toriihq.com/research/articles/diy-shadow-it-the-ai-augmented-citizen-developer |
| Torii Feb 2026 benchmark: avg enterprise 830+ apps, 61%+ outside IT oversight [vendor, via search summary] | 3/5 | 61% | search result summary, Torii SaaS Benchmark Feb 2026 |
| RedAccess (May 2026): about 5,000 vibe-coded apps on Lovable/Replit/Base44/Netlify with little security; about 40% exposed sensitive data (medical, financial, strategy decks); found with plain Google/Bing | 3 | 5,000 apps; 380k assets scanned | https://securityboulevard.com/2026/05/thousands-of-vibe-coded-apps-exposing-corporate-personal-data-redaccess/ ; https://www.axios.com/2026/05/07/loveable-replit-vibe-coding-privacy |
| Escape.tech scan of 5,600 public vibe-coded apps (Oct 2025) [sec] | 3 | 5,600 | via search result summary |
| CVE-2025-48757: Lovable insufficient RLS, CVSS 9.3; "170+ apps" figure is from scanner-vendor writeups, vendor disputes (customer responsibility) | 3 | CVSS 9.3 | https://nvd.nist.gov/vuln/detail/CVE-2025-48757 |
| Tea app: Firebase bucket open, 72k images then 1.1M DMs (Jul 2025) | 3 | 72k / 1.1M | https://hackmag.com/news/tea-leaks |
| Gartner survey (n=302 security leaders, Mar-May 2025): 69% suspect or have evidence of prohibited public GenAI use; predicts 40%+ of enterprises will have shadow-AI incidents by 2030 | 3 | 69% | via search result summary of Gartner |
| Cloud Security Alliance note citing Gartner-linked stat: 82% of CIOs say employees create AI agents/apps faster than IT can govern [sec] | 3 | 82% | https://labs.cloudsecurityalliance.org/research/csa-research-note-shadow-ai-apps-enterprise-20260530-csa-sty/ |
| Zenity $125M Series C led by Norwest (Aug 3, 2026), $180M+ total; earlier $38M B (Oct 2024); claims avg large enterprise has about 80,000 low-code/AI agents, apps, automations with 62% having vulnerabilities [vendor] | 2 | $125M | https://pulse2.com/zenity-raises-125-million-series-c-to-expand-ai-agent-security-platform/ ; https://zenity.io/company-overview/newsroom/company-news/zenity-raises-38m-series-b-funding-round-to-secure-agentic-ai |
| Nudge Security $22.5M Series A (Nov 2025, Cerberus), about 200 customers, 3x ARR two years running | 2 | $22.5M | https://fintech.global/2025/11/19/nudge-security-secures-22-5m-to-expand-ai-governance/ |
| WitnessAI $58M (Jan 2026, Sound Ventures), ARR +500% [vendor]; Backslash $19M Series A (Feb 2026) "vibe coding security"; Vybe $10M seed (First Round, undated) ; Harmonic $17.5M A (Apr 2025); Prompt Security acquired by SentinelOne | 2 | see left | https://axios.com/2026/01/13/witnessai-funding-enterprise-ai ; https://www.backslash.security/press-releases/backslash-security-raises-19m-series-a-to-secure-vibe-coding-boom-in-the-enterprise-bolsters-board-with-cybersecurity-industry-leader |
| Microsoft ended CoE Starter Kit development (May 2026), shifts to PPAC + Inventory API (GA Mar 2026); single-tenant, gaps in per-app governance | 1-ish (proves low-code governance is a paid gap: Rencore, Syskit sell around it) | n/a | https://hexaware.com/blogs/the-coe-starter-kit-is-retiring-will-your-power-platform-governance-adapt-or-drift/ ; https://rencore.com/en/blog/power-platform-coe-starter-kit-end-of-life |
| r/ITManagers: someone launching a paid "review vibe-coded apps before launch" service, looking for testers (0 score, 3 comments, so weak, shows services angle only) | 1 (weak) | 0/3 | https://reddit.com/r/ITManagers/comments/1w6hg42/i_put_together_a_team_that_reviews_vibecoded_apps/ |
| Job postings for humans doing this: NOT checked (no retrievable data in budget) | - | GAP | - |

## 3. Pain points, ranked, with quotes
Quotes below are the first lines of posts returned by the helper (not comments).
1. **IT/sysadmins forced to run or deploy the apps.**
   - "Non-technical COO 'discovered' AI coding, generated an entire dashboard in a single HTML file, and now wants me to review and maintain it." (1029 score / 347 comments) https://reddit.com/r/sysadmin/comments/1wngmab/nontechnical_coo_discovered_ai_coding_generated/
   - "We are getting increasingly frequent requests along the lines of 'I have developed a custom application that will be a dashboard for company employees. Can you install this version of Python, an application SDK, and give..." (293/180) https://reddit.com/r/sysadmin/comments/1tjochk/vibecoded_app_deployment_requests_from_end_users/
   - "Lately we've had a boom of requests for letting users deploy their own (obviously) vibe coded apps... 'why my colleagues are not able to access the app I deployed at lo[calhost]'" (269/234) https://reddit.com/r/sysadmin/comments/1u3uub1/vibe_coded_apps_how_are_you_dealing_with_them/
   - "If I have to troubleshoot one more vibe-coded 'dashboard', I'm going ape shit... Sally the accountant why her hand-rolled HTML file on Sharepoint isn't loading" (769/113) https://reddit.com/r/sysadmin/comments/1udyi3b/if_i_have_to_troubleshoot_one_more_vibecoded/
   - "I'm quitting my job due to vibe coders and poor leadership... exec leadership is making a big push for AI" (1762/474) https://reddit.com/r/sysadmin/comments/1roi3ne/im_quitting_my_job_due_to_vibe_coders_and_poor/
   - "A few months into letting non-technical staff use AI coding tools" (267/73; earlier post: company gave Claude Code to non-technical staff "without much of a plan around review, ownership, access, or support") https://reddit.com/r/sysadmin/comments/1tr5esp/a_few_months_into_letting_nontechnical_staff_use/
2. **Production data access with no review** (from reddit_demand.md, already verified there): "any sales / operational / middle manager can make production accessing vibe coded apps" (245/168) /r/ExperiencedDevs/comments/1ssdsq5/ ; DevOps asking how to secure Vercel/Cloudflare apps built by marketing/sales, top reply "Good luck." (123/141) /r/devops/comments/1td7mxp/
3. **Platform-hosted apps look like approved SaaS traffic, so security tooling is blind** (RedAccess: CASB sees ordinary traffic to an approved domain) [sec] https://diyhaven858.wasmer.app/?p=93518 (low-quality mirror).
4. **Security researchers find them trivially.** "I vibe hacked a Lovable-showcased app. 16 vulnerabilities. 18,000+ users exposed. Lovable closed my support ticket." (1114/62) https://reddit.com/r/cybersecurity/comments/1rffin3/i_vibe_hacked_a_lovableshowcased_app_16/
5. **HN, long-term outlook:** "Long-term SWEs at non-tech companies will spend much of their time reviewing vibe coded features/prototypes/scripts from non-technical employees and scaling them once they become critical infrastructure." https://news.ycombinator.com/item?id=45586062 ; "The CEO vibe-coded an app last week and shat it out onto Railway, contravening the company's security, testing, and CI/CD practices." https://news.ycombinator.com/item?id=49866743

Gap: I found NO explicit "I'd pay for / is there a tool" or budget statements in this domain. Replies in the threads seen earlier are resignation or policy.

## 4. Incumbents and gaps
| Category | Who | Funding / price | Covers | Gap for AI-built apps |
|---|---|---|---|---|
| SaaS mgmt / shadow IT | Torii (about $15M raised older), Zluri ($32M total), Nudge Security ($22.5M A, Nov 2025), Grip ($66M total), Productiv, BetterCloud, Josys | Pricing not retrievable (typically per-employee, quote-based) | Discover SaaS and OAuth sign-ups; Torii publishes Lovable/Replit/Base44 adoption | They see "the user signed up for Lovable". They do NOT see which apps were built/published, what data they hit, or whether they are exposed. I found no evidence any of the three has an AI-built-app inventory feature (searched, nothing). |
| Shadow-AI / agent security | Zenity ($180M+ total, Gartner "frontrunner" in AI agent governance Apr 2026), WitnessAI ($58M), Harmonic ($17.5M A), Prompt Security (to SentinelOne), Noma (not verified) | Not retrievable | Prompt/data-leak control, agent runtime control, low-code agent security (Copilot Studio etc.) | Focus is agents and data going INTO AI, not static internal web apps shipped from Lovable/Replit. Zenity is the closest threat: it has low-code app inventory heritage and fresh $125M. |
| Vibe-coding security | Backslash ($19M A, Feb 2026), VibeAppScanner (small, vendor content), Escape.tech, RedAccess (research/product) | small | Scan code/agents in dev, or external exposure scans | Pre-deployment dev side or external research; not an IT-owned registry with ownership and lifecycle. |
| Platform-native | Lovable Workspace Insights (2026-07-24: inventory, owner flags, security findings, cost, PII scans, abandoned-app auto-cleanup, scheduled Deep Scan, SSO/SCIM, audit logs, SOC2/ISO) ; Replit (SSO, SOC2, RBAC, private deployments, Security Agent, Fabric tie-up Jun 2026; audit/environment gaps unverified) | Enterprise plan, price not published | Own-platform governance | Single-tool only. Does not cover Replit+Base44+Bolt+Vercel+Cloudflare+Claude artifacts+SharePoint HTML. Vendors say customers are responsible for config (Lovable, Replit CEO statements in RedAccess coverage). |
| Low-code governance | Microsoft Power Platform CoE Starter Kit (deprecated May 2026) -> PPAC + Inventory API; Rencore, Syskit sell add-ons | free / paid add-ons | Microsoft stack | Single-tenant, no per-app governance; irrelevant for web apps off-Microsoft. |

**Does anyone own "inventory + risk scan + ownership + promotion-to-production across AI-built apps"?** Not found as of today. Pieces exist (Lovable per-tool; Zenity for agents; Nudge/Torii for the sign-up layer; Backslash for dev-time). Unverified: whether Nudge/Torii/Zenity have shipped something in the last 3 months that I could not find via search.

## 5. Candidate ideas (harsh scores; rubric A20 B20 C20 D15 E10 F15)

### Idea 1. Cross-builder AI-app registry and exposure scanner
- Pitch: Discover every app employees built or published on Lovable, Replit, Base44, Bolt, Vercel, Netlify, Cloudflare, Claude artifacts, then probe externally for open auth, exposed keys and public data, assign an owner, and track lifecycle.
- Buyer: Head of Security / IT Director, 300-5,000 employees.
- Why now: RedAccess/Axios press, Lovable CVE, 64% Lovable shadow share, exec mandates to "vibe code".
- Why not in-house: discovery crosses tools and OAuth/DNS. Weak: one security engineer with Google dorks plus a script can do the first version; RedAccess did exactly that.
- Why AI-durable: governance of AI output grows with AI. But each platform adds native inventory (Lovable did in July 2026).
- Wedge MVP: Google/Okta OAuth-grant and domain/subdomain-pattern scan plus Vercel/Netlify/Cloudflare read APIs, passive exposure checks. 4-6 weeks.
- Top 3 signals: RedAccess 5,000 apps; sysadmin threads (1,029/347, 293/180, 269/234); Zenity $125M and Nudge $22.5M in adjacent space.
- Biggest risk: Nudge/Torii/Zenity add a "vibe-coded apps" module (easy extension of OAuth discovery) and platforms ship native inventory. Unauthorized probing of other people's apps is also a legal grey area; must limit to the customer's own domains.
- Score: A 12, B 9, C 11, D 8, E 5, F 11 = **56**? Harsh adjustment: no budget quotes, no pricing evidence, and crowded buyer. Final **48**.

### Idea 2. "Deploy request" intake and triage for IT (adopt / sandbox / reject)
- Pitch: A front door where an employee submits a repo, zip or published URL. The tool auto-produces a risk report (secrets, auth model, outbound data calls, dependencies, DB policies), a one-page "what does this do" summary, and routes to IT with a recommended action. Approved apps get an SSO-wrapped, audited internal hosting target.
- Buyer: IT / sysadmin manager (the person writing the r/sysadmin posts), 200-2,000 employees; budget likely small (IT tooling line), possibly paid by security.
- Why now: the threads literally describe the intake problem ("requests for deployment", "why my colleagues cannot access localhost").
- Why not in-house: a sysadmin could script a Semgrep/Gitleaks pipeline, so differentiation is the workflow plus plain-language report for non-coders.
- Why AI-durable: moderate. A future Claude/Copilot agent can review a repo; the durable part is the policy, approvals, audit trail and hosting target, which is workflow not intelligence.
- Wedge MVP: GitHub-repo or zip upload, run open-source scanners, LLM-written report, Slack/Jira approval flow. 3-4 weeks, public tools only.
- Top 3 signals: sysadmin 1tjochk (293/180), 1u3uub1 (269/234), 1wngmab (1029/347).
- Biggest risk: IT managers have no budget and reply with policy ("no"); the segment that says "no" does not buy a tool. Also nearly every scanning component is free.
- Score: A 11, B 9, C 11, D 8, E 5, F 13 = **57**, harsh-adjusted to **50**.

### Idea 3. Orphan and ownership tracker for AI-built apps (offboarding and expiry)
- Pitch: Link each app to an owner, a data classification and an expiry; fire when the owner leaves or the app is unused; force re-attestation.
- Buyer: IT / GRC lead, same size.
- Why not in-house: spreadsheets work initially ("spreadsheet someone maintained until they left" pattern in reddit_demand P4).
- AI-durability: high, but this is a feature of Idea 1 and Lovable already ships abandoned-app cleanup and owner flags.
- Wedge MVP: HRIS (offboarding webhook) + app list import. 2-3 weeks.
- Signals: reddit_demand P4 ownership threads (generic, not AI apps); Lovable shipping the feature (validates demand but kills single-tool wedge); Power Platform CoE (Microsoft built it for low-code).
- Biggest risk: it is a feature, not a company.
- Score: **38**.

### Idea 4. "Prototype-to-production" engineering handoff (PR-ready refactor of CTO/COO vibe-coded prototypes)
- Pitch: Ingest an AI-generated prototype (the "20,000 lines on a branch"), map data flows, identify missing tests/auth/secrets handling, and output a prioritized production-readiness plan or draft PR set for the engineering team.
- Buyer: VP Eng / Platform lead, 100-1,000 engineers.
- Why not in-house: engineers say they absorb it as unpaid toil; they would rather build ad hoc agents with Claude Code. This is exactly what Claude Code does when asked.
- AI-durable: poor. Core value is replicated by the next coding-agent release.
- Signals: ExperiencedDevs 1ssdsq5 (245/168; "20,000 lines of code on a branch. It's the responsibility of a team to move that into production" at 99), HN 45586062.
- Risk: dies to Claude Code / Copilot agent; no budget line.
- Score: **33**.

### Idea 5. Managed "paved-road" hosting for citizen-built apps (governed deploy target)
- Pitch: One-click publish from Lovable/Replit/Claude export to a company-controlled runtime with SSO, scoped data connectors, secrets vault, audit log and kill switch. Security-by-construction instead of detection.
- Buyer: CIO/IT Director.
- Why not in-house: platform teams do build this (Backstage-like) but non-engineers will not use it; vendor needed for UX.
- Durability: Retool, Superblocks, Vybe ($10M seed, First Round), Replit "Governed internal app factory", Microsoft Power Apps all attack this. Heavy competition and heavy build.
- Wedge MVP: not a weeks-scale MVP (runtime, identity, connectors).
- Score: A 12, B 12, C 10, D 6, E 6, F 5 = **51**, but infeasible for a student team; adjusted **44**.

## 6. Best idea in this domain
**Idea 2 (deploy-request intake and triage), optionally bundled with a light version of Idea 1's inventory**, scored about 50. Reasons: the strongest verifiable pain is IT being asked to deploy and maintain these apps (three r/sysadmin threads of 269-1,029 upvotes), MVP is feasible in weeks with open-source scanners, and it targets the person already hurting. Caveats stated plainly:
- It does not beat the round 1 score (56) with current evidence; domain ceiling about 50-57.
- No budget owner has been verified; the "pay" signal is only inferred from Zenity/Nudge/WitnessAI funding in adjacent categories.
- Platform vendors (Lovable Workspace Insights, 2026-07-24) are already shipping native inventory, ownership, scanning and cleanup; Replit and Microsoft will follow. The cross-tool view is the only durable wedge, and Nudge/Torii/Zenity are one product sprint away from it.
- Unresolved before building: (1) call 10 r/sysadmin-style IT managers and ask who pays; (2) check Nudge/Torii/Zenity/Grip changelogs for AI-built-app discovery; (3) count LinkedIn/Indeed postings for "AI governance"/"citizen developer governance" roles (not done); (4) get actual pricing.
