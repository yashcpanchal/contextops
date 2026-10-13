# Round 3, YC B2B ops slice: "AI agent that does job X" (Spring 2025 to Fall 2026)

## 1. Method
- Data: all 1,210 YC companies in `data/*.jsonl`. Slice = subindustries Productivity (36), Operations (29), Finance and Accounting (26), Analytics (21), Legal (19), Human Resources (4) plus plain "B2B" (240) = **375 companies**. Per batch (in slice): S25 50, Su25 55, F25 46, W26 71, S26 59, Su26 62, F26 32 (F26 is in progress).
- Scripts: `scripts/yc_b2b.py`, `scripts/yc_jobs.py` (keyword classifier on one-liner first, then desc; first match wins). **The classifier is crude** (66 companies land in "Other"; "automate/search" words pollute generic buckets). Treat counts as +/-30%; direction and ranking are more reliable than exact numbers. Adjacent themes (spend, governance, IT, manager tools) were counted by hand from one-liners.
- `top_company` is False for every company in the slice (field is useless here). `isHiring` and `team_size` are mostly weak: median team 2-4.
- Traction: WebFetch on 8 YC pages. HN helper found no hits for Mentlio. Almost no company states revenue.

## 2. Theme map ("AI agent does job X")
| Job / theme | # (approx) | Trend by batch (S25,Su25,F25,W26,S26,Su26,F26) | Examples | Traction |
|---|---|---|---|---|
| Generic "AI employee / BPO / back-office agent" | ~66 | 5,5,9,16,14,13,4: **rising sharply since W26** | Pollen: AI employees trained on firm workflows; Zomma: AI BPO for financial services; Bernard: AI employees running appliance repair firms; Rex: AI BPO for order-to-cash | None stated |
| Vertical ERP / ops OS (manufacturing, hotels, care, STR) | ~25 (inside "IT/internal/ERP" ~54 bucket, noisy) | rising, peak Su26 | Arzana, Smartbase: AI-native ERP for manufacturers; Modern: "ServiceNow killer"; Zaplar | None |
| Accountant / auditor / tax | ~21 (35 by loose regex) | 4,3,3,5,1,4,1: flat, falling | Denki: AI financial audit firm; Arden: AI-native internal audit firm; Magnetic: AI tax preparer for CPAs; Rational, Billow: "zero-human accounting firm" | None; trend is toward AI-native services firms |
| Compliance / regulatory / KYC / fraud | ~21 | 3,4,4,5,1,1,3: flat | Regbase, ComplyDo, Hickory (BSA), Socratix AI, Payna; YC RFS has "AI-native compliance infrastructure" | ComplyDo team 17 (largest) |
| Lawyer / contracts | ~22 | 3,3,3,4,3,5,1: flat | Vesence, Neomatter (in-house legal), Erinys (AI-native law firms) | None |
| AP/AR/billing/procurement clerk | ~8 strict (57 loose) | 0,3,2,0,0,3,0 | Alder: AR AI employees; End Close: payments reconciliation; Alara: dental procurement | None; mostly vertical |
| Recruiter / HR / payroll | ~9 strict | 2,1,0,4,1,0,1 | Spine: payroll/benefits free for startups; Sira: Rippling for deskless; Asendia, Vela | Low; HR subindustry only 4 |
| Data / BI analyst | ~15 | 5,3,1,4,1,0,1: **falling** | nao Labs, Pleom, Databuddy, Menza, Netter | nao Labs is open source, 8-person-ish |
| Customer support / voice | ~11 | 0,4,1,2,2,0,2 | Certus, Humoniq, Akkari | Moved elsewhere (voice subindustry) |
| Sales / SDR / GTM | ~24 | 4,3,3,8,3,3,0: **falling** | Atlog, Chasi, Cactus | None |
| Exec assistant / meetings / email | ~5 strict | 0,2,1,0,2,0,0: thin | Slashy: Cursor for email; Bond: AI chief of staff; Char: AI notepad | None; incumbents (Granola, Gemini, Copilot) own it |
| PE / consulting / research analyst | ~24 | 4,2,2,4,7,4,1 | Zarna, DiligenceSquared, Foaster: AI-native McKinsey | None |
| **Company context / "company brain" / institutional memory for agents** | ~12 | 0,0,2(Nessie, Trace),0,6,2,3: **rising S26+** | Hyper, Savant, Glen, Ontora, Sona8, GodHands, Nessie, Trace, Kaelio | Glen and Ontora have the only real signals (see sec. 5) |
| **Agent control plane / manage agents as workers** | ~8 | 1,1,2,1,3,1,0 | Pentagon: control plane for agent-native work; Tasklet; TectoAI: "HR system for AI agents" (YC lists it Inactive); OneCLI; Clarm | No traction stated |
| **AI spend / token cost** | 5 | 0,0,0,3,0,2,0 | Carrot Labs, Quotient Labs, Mentlio, Conifer (see sec. 5) | Mentlio acquired by Factory, 2026-10-09 |
| **Measuring ROI of human+AI work** | 1-2 | S26 | Autostep: "P&L for knowledge work" | None |
| IT helpdesk / ITSM | ~3 | 0,0,0,0,1,2,0 | Assemble: autonomous IT delivery; Modern | None |
| SaaS/software procurement, license mgmt | **0** | none | (no company found) | n/a |
| Meeting/communication tools for engineering managers | **0** | none | (nearest: Memoir "everything your team ships explained to everyone it affects", 1 person) | n/a |
| R&D tax credit / engineering capitalization | **0** | none | none found | n/a |
| SOC 2 / security-questionnaire GRC | ~0-1 in this slice | n/a | (Vanta/Drata-type players already exist; YC funds few new ones) | n/a |

Main read: the "agent does job X" pattern is **horizontalizing into "AI employees / AI BPO / AI-native firms"** (rising since W26), while narrow single-job tools (SDR, BI analyst, notetaker) are falling. The newest wave (S26-F26) shifts to "context layer / company brain" and "agent control plane", i.e. infrastructure for running agents inside a company.

## 3. Crowded themes to avoid
- AI accountant / auditor / bookkeeper / tax: ~21-35 companies in 7 batches, plus the "AI-native firm" variant. Incumbents (Intuit, Basis, Rillet) ahead.
- AI lawyer / contracts: 22 companies; Harvey, Legora, and Ironclad own the budget.
- Generic "AI employee / back-office agent": 66 and still rising; undifferentiated, no named customers.
- Notetaker / email / assistant: few YC entries now because Granola, Gemini, Copilot already absorbed it.
- SDR / sales agent and BI analyst: falling; YC has stopped funding them.
- Token routing / "cut Claude Code cost by 47-70%" (Quotient, Conifer, Mentlio's compression): 3 companies in two batches, and the vendors keep shipping native caching and routing. Not durable.

## 4. Under-served gaps (rounds 1-2 pain, YC funded 0-1)
| Pain from rounds 1-2 | YC companies in slice | Verdict |
|---|---|---|
| Engineering R&D capitalization / AI-spend audit packet (R2-1, R2-7) | **0** | Open. Closest is Carrot Labs "AI coding cost per PR", no finance-grade export. |
| Agent-change SOC 2/SOX/SoD evidence (R2-3) | **0** (TectoAI "AI governance" is Inactive; Clarm/Glen not evidence tooling) | Open, but YC RFS compliance request is financial-services focused, not SDLC. |
| Software procurement / license rightsizing for AI tools | **0** | Open. |
| Shadow AI-built app intake for IT (R2-9) | **0** (Assemble, Modern are ITSM) | Open. |
| Manager-facing comms/meeting tools for eng orgs | **0** | Open, but low evidence of budget. |
| Departure-triggered knowledge capture (R2-8) | **1-2**: Ontora (interviews employees to map work, 5 design partners, 150+ inbound), Sona8 (voice agents survey employees) | Ontora has traction; both target process mapping, not departing engineers. |
| Cross-vendor AI spend joined to outcomes (ContextOps core) | **3-4**, all tiny (Carrot, Mentlio, Quotient, Conifer) | Contested at the cost layer, open at the finance-evidence and outcome layer. |
| Measuring human+AI work ROI | 1 (Autostep, solo founder) | Weak team, but the framing validates "paired cost + value view". |

## 5. Direct ContextOps competitors and adjacents (mandatory)
Traction checked via YC pages fetched 2026-10-13 (https://www.ycombinator.com/companies/<slug>).
1. **Mentlio** (Su26): "Engineering intelligence and token optimization". Maps PRs to normalized "Delivery Points" to tie AI spend to output; claims ~30% spend cut via routing/context/prompt compression; targets VP Eng/CTO at 15+ engineer orgs. **Direct ContextOps competitor. Factory acquired it on 2026-10-09 (stated on its YC page; no deal terms; [unverified] elsewhere).** Reads as an acqui-hire into a coding-agent vendor: validates the demand, shows the vendor-absorption risk, and the buyer was not an independent platform.
2. **Carrot Labs** (W26, product site superpenguin.ai): tracks AI spend across 14 providers, per-request SDK attribution, AI coding cost per PR through Cursor, budget alerts. Direct overlap on cost. Team 2, no customers or revenue stated, and the company pivots toward custom models.
3. **Quotient Labs** (W26): cut Claude Code cost 47% in one-line install. Cost reduction, not governance. Team 2, no traction found.
4. **Conifer** (Su26): least-cost model routing inside Claude Code/Codex, local-first. Team 4; asks for intros to high-token-spend teams, which means it has none yet.
5. **Glen** (Su26): institutional learning layer capturing agent sessions (Claude Code, Codex, Cursor), Slack, PRs. Adjacent (context, not spend). Composio design partner expanding from 2 to ~20 users to company-wide; "a dozen+" startups; evals show -29% token spend, -21% task time; team 1, hiring. Best traction in the set.
6. **Ontora** (S26, Berlin): adjacent (employee interviews to a context layer). 5 design partners (PE firm, 800+ and 1,000-person firms), 150+ inbound demos, $700K raised pre-round. Not engineering-specific.
7. **Pentagon** (S26): "control plane for agent-native work", agents coordinate on a canvas. Adjacent to "managing agents as workers". Team 1, no customers.
8. **TectoAI** (Su25): "HR system for AI agents" (inventory, onboarding, monitoring, compliance). Closest to AI-governance buyer (GRC, infosec, IT). **YC lists status Inactive** and no customers: a failure signal for horizontal AI governance sold to GRC.
9. **Autostep** (S26): measures ROI of human and agent work via desktop app; solo founder, no named customers.
10. Others seen outside my slice but relevant: Nia (S25, Launch HN 131 pts, context for coding agents), Scott AI (F25, planning layer for coding-agent teams), Nessie (F25, shared context layer), Mendral (W26, AI DevOps engineer). Presumably covered by the engineering-slice scout.

Takeaway: in the 375-company slice, ZERO companies combine cross-vendor AI spend, outcomes and finance/audit exports. All four spend tools are 2-4 person teams with no stated revenue, one already acquired by a vendor. Cost visibility alone gets absorbed; the finance-evidence layer is untouched.

## 6. Candidate ideas
All scores use the rubric (A20 B20 C20 D15 E10 F15); harsh.

**Idea 1. AI-spend capitalization and audit packet (ContextOps Finance module).** Relation: module of ContextOps.
- Pitch: map coding-agent spend to projects/tickets and export controller-ready capitalization (ASC 350-40) and audit evidence.
- Buyer: controller / VP Finance at 100-1000 engineer, capitalizing companies.
- Why now: Deloitte DART 2026-08-03 note (from round 2); YC batches show 4 spend-visibility startups in W26/Su26 but none with finance output; Ramp calls AI token spend a new category.
- Not crowded: 0 YC companies on engineering capitalization or R&D credit.
- AI-durable: depends on accounting rules and ticket joins, not model capability; vendors will not build cross-vendor attribution.
- Wedge MVP: import Claude/Cursor/Copilot usage CSVs + Jira/Linear project keys, output a monthly journal-entry-ready CSV with a methodology memo.
- Demand signals: (1) Deloitte DART quote; (2) r/EngineeringManagers "CFO now cares" (277 upvotes); (3) Mentlio/Carrot built "per PR" cost but no finance export.
- Risk: finance buyers want a Big-4-blessed methodology; Mentlio acquisition shows Factory-type vendors may bundle it.
- Self-score: A12 B8 C12 D8 E7 F9 = **56**.

**Idea 2. Software and AI-tool procurement/rightsizing for engineering orgs.** Relation: pivot or module.
- Pitch: unify seat, token, and licence spend across Copilot/Cursor/Claude/other dev SaaS; flag idle seats, vendor overlap, renewal dates.
- Buyer: head of IT / eng ops / procurement.
- Why now: tool sprawl; zero YC entries in software procurement; IT/ITSM entries only 3.
- AI-durable: moderate; vendors only show their own seat usage.
- MVP: SSO + billing-export ingestion, an idle-seat report.
- Demand signals: failed DIY nightly job (round 2); SAP token capping story; Vantage/CloudZero already track some of this (competition).
- Risk: Zylo, Vendr, and Productiv are incumbents in SaaS management. Round 2 already found this contested.
- Self-score: A11 B7 C9 D6 E7 F11 = **51**.

**Idea 3. Agent-as-worker registry and change evidence for regulated engineering (SoD, SOC 2).** Relation: module (R2-3).
- Pitch: treat each coding agent as an identity with owner, permissions, approvals, and evidence trail; export auditor-ready packets.
- Buyer: security/compliance lead and VP Eng at SOC 2/PCI companies.
- Why now: GitHub Copilot approvals counting as reviews (preview 2026-09-01); YC RFS asks for AI-native compliance; TectoAI "HR for agents" shows the thesis exists but went inactive, suggesting selling to GRC alone fails; sell via engineering.
- Not crowded: 0 funded in SDLC evidence.
- Risk: GitHub/Vanta/Drata ship it; weak "I'd pay" evidence.
- Self-score: A10 B8 C9 D6 E7 F10 = **50**.

**Idea 4. Human+agent work ROI for engineering ("P&L per team").** Relation: replace-adjacent / ContextOps outcomes layer.
- Pitch: combine spend with PR outcomes, incident rates, review load per team to say where AI helps.
- Buyer: CTO/VP Eng.
- Why now: Autostep (S26) and Mentlio "Delivery Points" prove YC interest; SAP "paired view" quote.
- Risk: crowded by Jellyfish, LinearB, DX, Faros (not YC, but the incumbents); Mentlio exit shows a bundle path.
- Self-score: A12 B7 C8 D7 E6 F8 = **48**.

**Idea 5. Departure/onboarding context capture for engineers (Ontora for engineering).** Relation: new idea or module.
- Pitch: voice/chat agents interview leaving engineers and tie answers to repos/PRs for the next agent.
- Why now: Ontora (150+ inbound demos, 5 design partners) and Sona8 show the pattern working in non-engineering orgs; Glen shows engineering context demand.
- Risk: Ontora/Glen adjacent and funded; the sale is episodic.
- Self-score: A9 B7 C8 D6 E5 F10 = **45**.

Verdict: nothing in this slice beats ContextOps (58). The strongest implication is for the wedge: sharpen toward **finance-evidence and outcome join (Idea 1)**, since YC's four spend startups all stop at cost visibility, and Mentlio's acquisition by Factory shows cost-only tools get absorbed.

Caveats: counts from keyword classification; traction from self-reported YC pages; the Factory acquisition is [unverified] outside Mentlio's own YC page.
