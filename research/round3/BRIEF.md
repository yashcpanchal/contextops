# Round 3 brief: mine YC + a16z's latest batches (shared by all scouts)

Context: a student team (CS students; one founder was a SWE intern at Visa) is building in or near "AI tools for software engineering leaders and teams". Today is 2026-10-13. Where things stand:
- **Round 1** (research/phase1-scoring/SCORES.md) picked ContextOps, cross-vendor FinOps for AI coding (docs/STRATEGY.md). It scored 56, and **58** when re-scored blind.
- **Round 2** (research/round2-scoring/SCORES_R2.md) explored about 20 adjacent domains. Nothing beat 58, mostly because incumbents had already shipped.

**Round 3 question.** What are the best investors (YC, a16z) funding RIGHT NOW? Use that as a demand and "why now" signal to find:
- (a) a better idea than ContextOps;
- (b) a sharper wedge for ContextOps;
- (c) themes that are already too crowded to enter.

## Local data (read with python; never print whole files into your context)
Folder: `C:\users\yash panchal\cswork\CSProjects\contextops\research\round3\data\`
- `Spring_2025.jsonl` … `Fall_2026.jsonl` contain all 1,210 YC companies from Spring 2025 to Fall 2026 (Fall 2026 is the current batch). Fields: name, batch, one_liner, desc (600 chars), industry, subindustry, tags, team_size, status, isHiring, top_company, website, yc_url.
- `speedrun_all.csv` contains all 321 a16z Speedrun companies, SR001-SR007 (SR007 is the newest). Columns: Name, Tagline, Description, Season, Founded, Team Size, Founders, Speedrun Profile, Website, LinkedIn, X, Categories, Location.
- `speedrun.jsonl` contains the SR007 cohort "preambles", which often state traction such as "$7M ARR, grew 8x".
- `yc_rfs.txt` is YC's current Requests for Startups (text).
- `a16z_news.txt` is the a16z news/content index (text, partial).

Write analysis scripts in `C:\users\yash panchal\cswork\CSProjects\contextops\research\round3\scripts\` (create it). Run them with `python -I`. Print only compact aggregates and short excerpts.

## Web tools
- Load them via ToolSearch "select:WebSearch,WebFetch". The WebSearch quota may be limited: prefer WebFetch on known URLs (company websites, ycombinator.com/companies/<slug>, ycombinator.com/launches, a16z.com articles, speedrun.a16z.com/companies/<slug>).
- Bounded HN helper: `python -I "C:\users\yash panchal\cswork\CSProjects\contextops\research\tools\rsearch.py" hn "<query>" story 15`. Launch HN and Show HN posts reveal traction and buyer reactions.
- Do NOT use browser/Playwright tools.
- Do not fabricate. Cite URLs. Mark anything [unverified].

## Evidence ladder (strongest first)
1. Money moving: stated ARR or revenue, paying customers named, pricing pages.
2. Capital: post-demo-day rounds, top-company flags, Speedrun traction claims.
3. Hiring and team growth: isHiring, team_size.
4. Community or buyer reaction: Launch HN/YC engagement.
5. Investor thesis statements: the RFS, a16z essays. These are weakest as proof of demand, but strong as a "why now" signal.

## Rubric (unchanged; be harsh: 50 = mediocre, 70 = strong)
A Demand 20 · B Sellable (won't be built in-house) 20 · C AI-durable (not replaced by the next Copilot/Claude release or a free platform feature) 20 · D Evidence 15 · E Specific buyer 10 · F Feasible for a student team 15.

## Budget
About 35 tool calls and about 35 minutes. Then write your file and stop.

## Deliverable (markdown in research/round3/)
1. **Method**: what data you analysed and the counts.
2. **Theme map**: a table of theme | # companies | batches (trend rising/falling) | example companies (name: one-liner) | traction evidence.
3. **Crowded themes to avoid**, and why.
4. **Under-served gaps**: pains we documented in rounds 1-2 that few or no funded companies address, or that one company addresses with clear traction while others are absent.
5. **Direct ContextOps competitors and adjacents in these batches**: names, what they do, any traction. This section is mandatory.
6. **3-5 candidate ideas** (with the pitch, buyer, why now (cite the batch evidence), why not crowded, why AI-durable, wedge MVP, top 3 demand signals, biggest risk, and a harsh self-score), plus how each relates to ContextOps (replace, pivot, or module).

Return a summary of about 200 words as your final message.
