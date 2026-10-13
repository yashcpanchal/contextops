# YC newest batches (Summer 2026, Fall 2026) + Requests for Startups

Date: 2026-10-13. Script: `scripts/yc_newest.py`. Keyword counts are rough regex hits on one_liner + desc + tags, so they are noisy and directional only.

## 1. Method
- Data: Summer_2026 (230), Fall_2026 (134), plus Spring_2025 (144), Summer_2025 (166), Fall_2025 (145), Winter_2026 (198), Spring_2026 (193) as baselines.
- The local `yc_rfs.txt` holds the **Fall 2026 RFS only, 13 items**. The tab list names older RFS batches, but their text is not in the file. I did not fetch ycombinator.com/rfs separately because the local text was complete for Fall 2026.
- `top_company` is 0 for every Summer/Fall 2026 company, so it carries no signal. Team sizes average about 2.9. `isHiring` is true for 39 of 230 Summer and 13 of 134 Fall companies.
- Traction checks used company sites, Launch HN (via Algolia), and web search. Neither Summer 2026 Demo Day press coverage nor any post-demo-day rounds could be found (Demo Day was listed for 2026-09-10, per dealroom). Everything below on funding is [unverified / not found].
- Batch naming caveat: companies call themselves "YC S26" and the press labels the June 2026 Demo Day "Spring 2026". The dataset's "Summer_2026" is the batch whose Demo Day was around Sept 10.

## 2. RFS (Fall 2026), all 13 items
Tags: SWE = software engineering, ENT = enterprise AI agents, GOV = AI cost/governance, MGR = managers.

| # | RFS (author) | Summary | Tags |
|---|---|---|---|
| 1 | The Primer (Miklas) | Adaptive AI tutor for young children (reading, writing, arithmetic), consumer scale, supplements teachers | none |
| 2 | Future of American Defense (Army Sec. Driscoll) | Low-cost interceptors, sensors, drones, resilient logistics, manufacturing, all on open-system architecture | none |
| 3 | A Cloud for Small Software (Koomen) | Agent-built bespoke tools for 1 to few users; a cloud that makes them easy to deploy and share like a Google Doc. Hard parts: per-company environments, auth and permissions, safe sharing of arbitrary code | SWE, ENT, GOV (auth/permissions) |
| 4 | Multiplayer AI (Epstein) | Agents are single-player today (private chat threads). Teams should drop into the same live agent session to watch, redirect and hand off. Explicitly names "engineers coding together in real time" | SWE, ENT, MGR (team visibility) |
| 5 | Compute at Sea (Chaubard) | Offshore modular compute "flotillas" because land and power are constrained | none |
| 6 | AI Consumer Products for 1B people (Schaad) | Consumer is back. Tokens cost about $1,000/month/user today and fall 10x a year | GOV-adjacent (states the token-cost curve) |
| 7 | AI for the Aging Population (Kolysh) | Voice, monitoring, robotics and caregiver coordination software | none |
| 8 | New OS for the Physical World (Warren) | Software that routes work between AI agents, robots and wearable-equipped humans in construction, maintenance and fleets; measures reliability and safety | ENT-adjacent |
| 9 | Best Time to Build in Crypto (Dalal) | Stablecoins, agentic commerce, tokenized assets, capital raising | none (agents as payment actors) |
| 10 | Data for the Real World (Tindle, Hu) | New ways of collecting dense physical-world data (Gecko, Sorcerer) | none |
| 11 | Proving You're Human (Kolysh) | Verified-human trust layer against deepfakes and voice clones, privacy-preserving | ENT-adjacent (identity) |
| 12 | AI-Native Compliance Infrastructure (Goel) | Consolidate financial compliance tools, regulatory monitoring, audit trails, multi-jurisdiction | GOV (human-compliance, not AI governance) |
| 13 | Self-Maintaining APIs (Gaddipati) | Agent scans customer codebases when an API vendor ships a breaking change or feature and opens a PR; "Dependabot for APIs". Cites 30%+ of AWS service downtime from unnoticed external changes | **SWE** |

Direct hits for our space: **#13 (SWE), #4 (SWE and team visibility), #3 (SWE and governance of permissions)**. No RFS item names AI cost/FinOps or engineering managers. Item 6 states the token-price curve as a premise. The RFS is a "why now" signal and does not prove demand.

## 3. What is new in Summer/Fall 2026 vs 2025 (keyword share of batch; Spr25 / Sum25 / Fall25 / Win26 / Spr26 / Sum26 / Fall26)
| Theme | Counts (share) | Reading |
|---|---|---|
| Coding / developer keywords | 37(26%) 32(19%) 27(19%) 29(15%) 31(16%) 33(14%) 20(15%) | Share falling, from over 25% to about 15%. The regex is very broad ("code", "developer"), so treat it as relative only |
| Agent infra, sandboxes, MCP, runtimes | 4% 4% 3% 2% 6% 3% 4% | Steady. New specific forms: agent VMs and sandboxes (machine0, Agent 37, Boat, Archal), MCP gateways (Executor, Pomerado, Amorphic) |
| AI cost / inference / GPU | 3% 2% 2% 3% 2% 4% 4% | Slowly rising. Summer 2026 has Mentlio, Rindler, Orchestra, OneTriangle, Codag; Fall has fewer |
| Multiplayer / shared agents | 3% 1% 2% 2% 2% 2% 3% | Small but newly explicit. Mosaic, Dock (Summer), Agent Relay, Terse (Fall) arrive in the same cycle as the RFS |
| Physical ops / robotics | 16% 14% 15% 16% 15% **28%** 21% | Biggest jump (partly regex-wide: "manufactur", "maintenance") |
| Compute / datacenter / energy | 8% 4% 4% 9% 6% **20%** 12% | Big jump, with the RFS "Compute at Sea" |
| Defense / drone | 1% 2% 3% 3% 6% 6% 8% | Rising steadily |
| Compliance | 9% 10% 11% 11% 6% 6% 6% | Falling by half |
| Education / tutor | 3% 3% 1% 0 0 1% 0 | Nearly gone, yet the RFS asks for the Primer |
| Engineering-manager / eng-productivity | about 0 in every batch | Essentially no YC company targets managers |

New in 2026 relative to 2025:
- Agents-for-agent-fleets tooling: Rindler, "the IDE for tokenmaxxers"; herdr, "open agent runtime"; Agent Relay, "infrastructure to run coding agents for your team".
- Production-side AI engineers: HyperProbe (Summer), OnePatch (AI SRE, Fall), Papaya and Mirrors (agent optimization and context, Fall).
- Shared memory and context layers: Mosaic, Mirrors, Sona8 (context layer).
- Inference cost cutters: Orchestra, Mentlio.

## 4. Under-filled RFS items (YC asked, few companies in S26/F26 deliver)
Estimated from keyword scans plus reading hits. Judgment calls are marked.
| RFS | Companies found in Sum26+Fall26 | Verdict |
|---|---|---|
| #13 Self-Maintaining APIs | **0 direct.** Only adjacent: HyperProbe (prod debugging) and Archal (API sandboxes for testing). In earlier batches: scattered, 4 in Sum25, 5 in Win26, 1 or 2 in Spr26 on the loose regex | **Most under-filled and entirely in SWE.** Dependabot-for-APIs is unclaimed in the latest two batches |
| #11 Proving You're Human | 0 direct (fraud keyword hits are not proof-of-human) | Under-filled, not our domain |
| #1 Primer / tutor | 0 | Under-filled, not our domain |
| #5 Compute at Sea | 0 | Under-filled, not feasible for us |
| #3 Cloud for Small Software | About 2 (Floracene for healthcare internal tools; Executor partially) | Thin, and not many cover permissions or sharing |
| #4 Multiplayer AI | About 4 (Mosaic, Dock, Agent Relay, Terse) | Moderately filled, early. Mosaic and Agent Relay are the SWE versions |
| #12 Compliance | About 10 (financial and vertical: Hickory, TovenAI, Tire Swing) | Filled in finance. Nobody in AI-agent governance specifically |
| #8 Physical OS, #7 Aging, #2 Defense, #10 data | Many (dozens) | Crowded |

## 5. Traction checks, 8 Summer 2026 companies
Vendor claims are unverified. No post-demo-day funding announcement was found for any of them. [unverified]

| Company | What | Evidence |
|---|---|---|
| Mentlio (mentlio.com) | Engineering intelligence plus token optimization. Per-engineer AI spend vs delivery; "Route" model routing; integrates GitHub, Claude, OpenAI, Cursor, Linear, Jira; Slack and Teams digests | No customers named, no pricing (free audit plus demo), team size listed 0, no Launch HN. Claims 40% waste and 25% lower cost at 99% accuracy on Terminal-Bench, unverified. **Closest direct ContextOps competitor** |
| Rindler / Maxxwell (maxxwell.dev) | Desktop app managing many Claude Code and Codex lanes | Free (bring your own keys), no customers, no metrics |
| Mosaic (mosaic.inc) | Shared memory across teams' coding-agent sessions (Homebrew CLI) | Site is bare; no pricing, customers or funding. Started as a real-time coding environment, then pivoted [per YC description] |
| Dock (trydock.ai) | Multiplayer agent workspace with 20 business-function agents | Waitlist, no pricing or customers. Business agents, not SWE |
| HyperProbe (hyperprobe.co) | Read-only live production probes for coding agents; AI on-call | Real pricing ($99/service/month, 3-service minimum; enterprise adds RBAC and approval gates), two named testimonials (CheQ Digital, Housing.com), Launch HN 2026-08-05, 69 points, about 51 comments. Skeptics asked about differentiation versus Rollbar and about misdiagnosis. Best traction in the group [Algolia HN item 49185389] |
| Orchestra (orchestra.ai) | Distills smaller models from traces; claims 83% lower cost per task | No customers, no pricing, baseline unspecified |
| Archal (archal.ai) | Stateful simulated API sandboxes for agent CI and evals | $0.10 per environment-minute, $20 credit, "paid continuation not yet available", no customers |
| Executor (executor.sh) | Open-source MCP and tool gateway | About 4.2k GitHub stars (site-shown) and user testimonials on X. Strongest community pull; no paid-customer evidence |

Takeaway: the only company with visible pricing plus named users is HyperProbe. Mentlio is nearest to ContextOps but has no public proof. Hacker News interest was highest in prod-debugging, which relies on a fixed pain.

## 6. Implications for ContextOps (from this slice)
- **Direct competition has arrived from YC:** Mentlio (S26) sells per-engineer AI spend vs delivery plus a savings layer. Bear in mind that there is no public traction yet and its pitch is "engineering intelligence", not cross-vendor budget governance. Ours must differ, for example on enterprise budget controls, chargeback, and policy.
- **RFS #13 (Self-Maintaining APIs / Dependabot for APIs) is a free, YC-requested wedge** with zero direct occupants in the last two batches. It has a specific buyer (API vendors that want upgrades adopted, or platform teams) and is feasible: scan repos for SDK or API usage, match against changelogs, open PRs. Risk: Dependabot, Renovate and Copilot or Claude agents can extend into this. API providers may build it in house. A neutral multi-vendor service is the durable position.
- **RFS #4 / Mosaic / Agent Relay:** multiplayer coding-agent sessions could add a "team context and cost attribution" module for ContextOps. It is early and crowded in concept (two Summer and two Fall entrants).
- Managers: zero YC companies target engineering managers or leaders directly. This is an untapped buyer segment but also a possible sign of weak demand.
- Crowded to avoid: agent sandboxes and VMs, MCP gateways, AI SRE (HyperProbe, OnePatch), physical-world robotics, compute.

Sources: local `data/*.jsonl`, `data/yc_rfs.txt`; https://mentlio.com; https://mosaic.inc; https://trydock.ai; https://maxxwell.dev; https://hyperprobe.co; https://orchestra.ai; https://www.archal.ai; https://executor.sh; https://news.ycombinator.com/item?id=49185389; https://dealroom.co/events/yc-s26-demo-day/; https://techcrunch.com/2026/06/18/the-11-standout-startups-from-ycs-demo-day-according-to-vcs/ (Spring 2026 Demo Day).
