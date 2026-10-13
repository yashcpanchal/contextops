# Round 2: Incident response, on-call and reliability in the AI era

Researched 2026-10-13. About 12 tool calls. Reddit archive returned 429 or timeouts on all attempts (r/sre, r/devops, r/kubernetes), so community evidence is HN-only. Secondary or unverified items are marked.

## 1. Domain overview
- AI SRE is the hottest funded category in dev tooling: Resolve AI is at $1B to $1.5B valuation, with Traversal, Cleric and Ciroos also funded. Capital is flowing to *automated investigation/root cause*, the single most crowded layer.
- Classic incident tooling is consolidating. PagerDuty is stalled (ARR $499M, +1%, net retention 98%). FireHydrant was acquired by Freshworks. Opsgenie reaches end of life April 2027, which forces a migration wave.
- DORA 2025 says AI raises throughput but still raises delivery instability, so there is more change failure and rework downstream.
- Toil is not falling. Alert noise is the clearest quantified pain: 77% of on-call teams get at least 10 alerts a day, and 57% say under 30% are actionable (NeuBird survey, n=1,039, [vendor]).
- Unsolved or weakly served: postmortem follow-through, on-call fairness and compensation, runbook rot, and SLO/error-budget governance. All are mostly human and process problems, and the AI SRE funding is not aimed at them.

## 2. Demand evidence table

| Signal | Ladder | Number | Source |
|---|---|---|---|
| Resolve AI Series A, Lightspeed, confirmed Feb 2026 | 2 | $125M at $1B | https://techcrunch.com/2026/02/04/ai-sre-resolve-ai-confirms-125m-raise-unicorn-valuation/ |
| Resolve AI Series A extension, DST + Salesforce Ventures, Apr 2026 (one source only, unverified) | 2 | $40M at $1.5B; total over $190M | https://www.beri.net/article/resolve-ai-190m-ai-sre-production-incidents-2026 |
| Resolve AI ARR (third-party profile, unverified) | 1 | about $4M ARR, 125+ staff, Jun 2026. Customers listed: Coinbase, DoorDash, Salesforce, MongoDB, Zscaler, Toast | https://siliconvalleyinvestclub.com/companies/resolve-ai/ |
| Traversal seed + A, Sequoia and Kleiner, Jun 2025; Amex Ventures strategic Mar 2026 | 2 | $48M (PitchBook $53M total); no valuation | https://pitchbook.com/profiles/company/607973-14 |
| incident.io Series B, Insight, Apr 2025 | 2 | $62M at $400M; total over $96M | https://techcrunch.com/2025/04/10/incident-io-raises-62m-at-a-400m-valuation-to-help-it-teams-move-fast-when-things-break |
| incident.io Series C (single tracker, unverified) | 2 | $60M at $750M, Jun 2026 | https://techstackipo.com/stack/incident-io |
| Ciroos seed/A, Energy Impact Partners, Jun 2025 | 2 | $21M | https://pulse2.com/ciroos-21-million-raised-for-advancing-ai-based-sre-teammate |
| Cleric | 2 | $4.3M seed (Mar 2024); company-reported $9.8M total (Dec 2025 launch); aggregator shows $5.5M second round, unverified | https://pulse2.com/cleric-4-3-million-raised-and-autonomous-ai-site-reliability-engineer-unveiled |
| Rootly | 2 | $12M Series A, Aug 2023, $15.2M total. No newer round found. Hiring in the Oct 2026 HN "Who is hiring" thread | https://news.ycombinator.com/item?id=49926195 |
| Parity (YC) | 2 | Sources conflict ($0.5M vs $28.7M); unverified | https://www.vcbacked.co/company/parity-san-francisco |
| FireHydrant acquired by Freshworks (trackers differ on date, Dec 2025 or Jan 2026) | 2 | $88.7M cash | https://vectorshift.ai/research/deals/freshworks-firehydrant-2026 |
| PagerDuty FY26: stalled incumbent | 1 | ARR $499M (+1%); NRR 98% vs 106% prior; 15,351 paid customers; churn under 10% of ARR; stock about $6-10 per a tracker (unverified) | https://www.sec.gov/Archives/edgar/data/1568100/000156810026000012/pd-20260131.htm |
| Datadog Bits AI SRE pricing | 1 | Was about $500 per 20 investigations. Now AI Credits at $500 per 500 credits, $1.30 on demand. About 6.5 credits per investigation, so about $6.50 (secondary) | https://datadoghq.com/pricing |
| Seat pricing, competitor-written, treat as [vendor] | 1/5 | PagerDuty Pro from $21/user. incident.io Pro $45/user all-in. Rootly negotiated $30-35/user. FireHydrant $25 per responder, AI only in Enterprise | https://incident.io/blog/best-rootly-alternatives-incident-management |
| Opsgenie end of life April 2027 forces migrations | 3 | deadline April 2027 (via incident.io guide) | https://incident.io/blog/best-rootly-alternatives-incident-management |
| DORA 2025: AI adoption "is currently associated with increasing instability" | 3 | about 5,000 respondents; one secondary reading: +25% AI adoption goes with -7.2% stability (not confirmed vs primary) | https://redmonk.com/rstephens/2025/12/18/dora2025/ |
| Alert noise survey [vendor, NeuBird] | 3 | n=1,039 (Feb 2026). 77% get at least 10 alerts a day; 57% say under 30% actionable; 16% say AI increased their workload | https://www.logicmonitor.com/resources/2026-observability-ai-trends-outlook-2 (search snippet; NeuBird figures not independently checked) |
| Median toil | 3 | 34% of work (SRE Report 2026; n not shown) | same search |
| Many DIY/OSS AI SRE and on-call tools on HN | 4 | Nightwatch (33 pts), AI SRE Arena benchmark (24 pts), LogClaw (19 pts/34 comments), Superlog YC P26 (74 pts/49 comments), Rootly's On-Call Health | https://news.ycombinator.com/item?id=48195021 |

## 3. Pain points, ranked

1. **Alert noise and on-call load.** Quantified above (NeuBird, [vendor]). Rootly built On-Call Health to "detect signs of overload in on-call incident responders": https://news.ycombinator.com/item?id=46975314. Its sibling post cites "97% of engineers experience stress during inc[idents]" (truncated in the snippet): https://news.ycombinator.com/item?id=47355682
2. **On-call compensation and fairness, with no consensus model.** HN comments (retrieved snippets):
   - "Some companies do on-call bonuses, overtime pay for on-call incidents, or other schemes. In my experience, it's not a net win. They've budgeted the same amount for compensation either way" https://news.ycombinator.com/item?id=41097274
   - "I've yet to hear of any alternative compensation model that actually works." https://news.ycombinator.com/item?id=44516898
   - "If on-call engineers were to receive compensation for each incident they resolved, it would incentivize them to intentionally build systems that fail" (quoting an article) https://news.ycombinator.com/item?id=43499476
   - "I cannot go for a run, I cannot go to the movies, I cannot go for a dinner with family" https://news.ycombinator.com/item?id=43401441
3. **Runbooks are hard to author and hard to keep current.** Atuin Desktop co-author: "authoring runbooks is difficult, most people barely document their work let alone make it executable" https://news.ycombinator.com/item?id=49914235. Another commenter says the first line of defense is now "an LLM with the runbook in its context and the human in the loop being woken up at 3 am" https://news.ycombinator.com/item?id=49883828
4. **AI-generated changes causing outages.** HN item on Amazon outages tied to its Kiro AI coding tool: https://news.ycombinator.com/item?id=47085498 (headline only retrieved). DORA 2025 instability finding above.
5. **Skepticism that AI SRE products beat a general model.** "why wouldn't I just use Claude instead of an AI SRE tool? Or if there are some features of an AI SRE tool that make it better than Claude + some MCPs" https://news.ycombinator.com/item?id=50009404. Another: "The right context and tools can be more important than the AI SRE" https://news.ycombinator.com/item?id=50017163. This is a direct AI-durability warning for investigation-only products.
6. **Pricing opacity and add-on creep at incumbents** (PagerDuty status pages, AIOps add-ons; AI behind Enterprise tiers). Source is competitor blogs [vendor]: https://incident.io/blog/pagerduty-pricing-breakdown-2026
7. **Postmortem toil.** The only strong sign is the volume of public postmortems on HN (Cloudflare Nov 2025 postmortem: 1,465 pts/916 comments, https://news.ycombinator.com/item?id=45973709). I found NO quantified evidence of buyers paying for postmortem tooling or complaining about authoring time in this pass. This is a gap.

## 4. Incumbents and gaps

| Player | Funding / status | Price | Gap |
|---|---|---|---|
| Resolve AI | $125M A at $1B, plus reported ext. at $1.5B | enterprise, contact sales | Enterprise-only, long sales cycles |
| Traversal | $48M, Amex Ventures | contact sales | Same |
| Cleric | about $10M | n/a | Small; "self-learning" claim [vendor] |
| Ciroos | $21M | n/a | Early, enterprise |
| Parity | YC; funding unclear | n/a | Kubernetes focus; early |
| Datadog Bits AI SRE | public company feature | $500 per 500 credits (about $6.50 per investigation) | Tied to Datadog telemetry; priced per use |
| incident.io | $62M B ($400M), reported C ($750M, unverified) | $45/user Pro with on-call | Seat-priced; AI SRE added |
| Rootly | $15.2M total | about $20-35/user; AI SRE "contact us" | Small raise relative to rivals |
| FireHydrant | acquired by Freshworks, about $88.7M | $25/responder; AI only Enterprise | Absorbed into ITSM suite |
| PagerDuty | public, ARR $499M, NRR 98% | from $21/user plus add-ons | Seat downgrades; the "PagerDuty churn wave" is real but shows up as seat optimization and downgrades, not mass logo churn (churn under 10% of ARR per 10-K) |

Takeaway: the investigation layer (root cause) has the capital, and the price signal is concrete: roughly $6.50 to $36 per investigation (Datadog), or seats at $20-45. Nobody visible is funded around postmortem follow-through, on-call fairness analytics, runbook freshness or SLO governance. Rootly's free On-Call Health suggests the burnout piece is being given away as a feature.

## 5. Candidate ideas

**A. Runbook freshness / executable runbooks from incident history ("runbook rot" fixer)**
- Pitch: reads past incidents, Slack threads, postmortems and infra changes, then proposes PRs that update or create runbooks and flags runbooks that reference things that no longer exist.
- Buyer: Head of SRE / platform lead, 100-1,000 eng orgs.
- Why now: runbooks are now agent context ("LLM with the runbook in its context"), so stale ones become dangerous; AI SRE tools need good runbooks.
- Why not in-house: cross-tool plumbing (PagerDuty, Slack, Confluence, repos); nobody owns it.
- AI-durable: partial. A general model can draft a runbook, but drift detection against live infra and incident history needs integrations. Risk that AI SRE vendors add it.
- Wedge MVP: GitHub/Confluence runbook scanner plus Slack incident ingest that outputs a staleness report and suggested diffs.
- Top 3 signals: Atuin runbook-authoring quote (HN 49914235); runbook as LLM context (HN 49883828); AI SRE vendors say context is the bottleneck (HN 50017163).
- Biggest risk: weak direct payment evidence; may be a feature of Resolve/incident.io.
- Score: A 8, B 9, C 11, D 6, E 6, F 11 = **51**.

**B. Postmortem action-item follow-through and incident analytics**
- Pitch: tracks whether postmortem action items ship, links repeat incidents to unfinished actions, and quantifies recurring-incident cost for EMs.
- Buyer: VP Eng / EM, 50-500 eng orgs.
- Why now: AI code raises change failure, so more incidents mean more postmortems nobody finishes.
- Why not in-house: Jira/incident tools each have part of it, nobody joins them.
- AI-durable: moderate; incident.io, Rootly can add it.
- Wedge MVP: import incident.io/PagerDuty incidents and Jira tickets; dashboard for repeat incidents and open actions.
- Signals: DORA instability; Cloudflare postmortem engagement (HN 45973709, interest not payment); incident vendors' rapid funding. All indirect.
- Risk: I found no evidence anyone pays for this specifically. Incident platforms already include action tracking.
- Score: A 8, B 8, C 9, D 5, E 7, F 12 = **49**.

**C. On-call fairness and compensation analytics**
- Pitch: measures real on-call load per person (pages, night wake-ups, weekend hours), recommends rotations and comp/time-off-in-lieu amounts.
- Buyer: Engineering manager / HR-adjacent eng director, 50-500 eng.
- Why now: HN debate shows no accepted model; burnout framing is mainstream.
- Why not in-house: sensitive, cross-system data; EMs use spreadsheets (an HN "Leash: Spreadsheet Based PagerDuty Alternative" shows the DIY impulse: https://news.ycombinator.com/item?id=45686454).
- AI-durable: yes, since it is data plus policy, not text generation.
- Wedge MVP: PagerDuty/Opsgenie API pull, load report, fairness score.
- Risk: Rootly's On-Call Health is already free and OSS-like; low willingness to pay; likely a feature.
- Score: A 8, B 6, C 16, D 6, E 6, F 14 = **56**.

**D. Change-risk gate for AI-generated PRs tied to incident history**
- Pitch: scores each PR/deploy by blast radius, past incidents on those files/services, and whether it is AI-authored; blocks or routes to extra review.
- Buyer: Head of Platform / VP Eng, 200-2,000 eng.
- Why now: DORA 2025 ties AI use to instability; Amazon/Kiro outage story.
- Why not in-house: needs joined incident, service-catalog and code data; large orgs build partial versions.
- AI-durable: good if built on proprietary incident-to-code linkage. Code-review vendors and AI coding vendors are adjacent competitors.
- Wedge MVP: GitHub App scoring PRs from incident postmortems linked to repos plus CODEOWNERS.
- Signals: DORA instability; Amazon Kiro HN story; AI SRE boom as proof incident budgets exist.
- Risk: crowded (code review tools, feature-flag platforms); evidence is about the pain, not about payment for this tool.
- Score: A 11, B 9, C 12, D 8, E 8, F 9 = **57**.

**E. SLO / error-budget governance for engineering leaders**
- Pitch: translates SLOs and burn into release-freeze and prioritization decisions an EM can act on.
- Weak: I found no demand evidence in this pass. Score about **40**, not recommended.

## 6. Best idea in this domain
**D (change-risk gate linking AI-authored changes to incident history) edges out C,** but only at 57 against a 70 "strong" bar. Reasoning: the demand is the AI-induced instability (DORA) plus money visibly flowing into incidents, and the data join (incidents to code to owners) is a defensible asset that a general model cannot replicate. Honest conclusion: this domain is well funded but its funded layer (AI investigation) is both crowded and exposed to the "just use Claude + MCP" objection; the unsolved layers (postmortem, runbook, on-call fairness, SLO) show weak direct payment evidence. Nothing here clearly beats the Round 1 score of 56; treat it as a comparable, not superior, option.

## Gaps
- No Reddit data (rate-limited). No job-posting counts. No Vendr/G2 contract data. Postmortem tooling and SLO governance demand unverified. Several funding figures come from aggregators and are marked unverified. The PagerDuty "churn wave" is better described as seat downgrades than logo churn.
