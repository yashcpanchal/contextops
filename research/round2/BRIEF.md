# Round 2 research brief (shared by all scouts)

Context: a student team (CS students; one founder interned at Visa as a SWE) wants a startup in or near "AI tools for software engineering leaders/teams". Round 1 (see research/phase1-scoring/SCORES.md) chose "FinOps for AI coding" (ContextOps). It scored 56/100: real demand, but crowded and bundled by incumbents. The founders want a HIGHER-scoring idea, so round 2 explores TANGENTIAL domains. **The #1 priority is hard evidence of DEMAND.** Today is 2026-10-13.

## What counts as demand evidence (rank your evidence by this ladder, strongest first)
1. **Money already moving**: buyers paying for a workaround or a clunky incumbent (revenue/ARR figures, pricing pages, Vendr/G2 contract data), consultants or agencies billing for the manual version, budget line items, procurement RFPs.
2. **Capital & hiring**: funding rounds 2025-2026 (amount, date, investors), acquisitions, YC batches, and *job postings for humans doing the job a tool could do* (count them on LinkedIn, Indeed or Greenhouse searches if retrievable).
3. **Pain with cost attached**: quantified time or money lost (surveys with n, incident costs, fraud losses).
4. **Community signal**: Reddit/HN threads with high engagement, explicit "I'd pay for", "is there a tool that", or "we built an internal tool for this" statements. DIY workarounds are strong evidence.
5. Vendor marketing claims (weakest; label them [vendor]).

## Criteria every idea is judged on (the founders' own)
Proven demand/market · Sellable (companies won't just build it themselves) · Survives AI progress (NOT replaced by the next Copilot/Claude/ChatGPT release or a free platform feature) · Evidence-backed real problem · Specific buyer · Feasible MVP for a student team (weeks, public APIs, no SOC2 on day 1). Round 1 found that "summarize my team's work" products are being absorbed by Atlassian, Lattice and Claude itself. Avoid that trap.

## Tools
- Load web tools first: ToolSearch query "select:WebSearch,WebFetch". (`site:reddit.com` and `site:x.com` return nothing via WebSearch; don't waste calls on them.)
- Bounded Reddit + HN helper (never hangs; 20s timeout):
  `python -I "C:\users\yash panchal\cswork\CSProjects\contextops\research\tools\rsearch.py" hn "<query>" story 15`
  `... rsearch.py hn "<query>" comment 15`
  `... rsearch.py reddit-posts <subreddit> "<one or two words>" 15`
  `... rsearch.py reddit-comments <subreddit> "<words>" 15`
  The Reddit archive is rate-limited and often times out on big subreddits: use 1-2-word queries, prefer smaller subreddits, and move on after 2 failures. HN works reliably.
- Do NOT use any browser / Playwright tools (another agent owns the browser).
- Do not fabricate. Every quote needs a URL. Mark secondary or unverified items. Only quote what you actually retrieved.

## Budget
About 35 tool calls and about 30 minutes, then write your file and stop. A finished report with honest gaps beats an unfinished one.

## Deliverable format (markdown file in research/round2/)
1. **Domain overview** (5 lines).
2. **Demand evidence table**: signal | type (ladder level 1-5) | number | source URL.
3. **Pain points** ranked, with verbatim quotes + URLs.
4. **Incumbents & gaps**: who is funded, what they charge, and what users complain about.
5. **3-5 candidate startup ideas**, each with: one-line pitch, buyer (title + company size), why now, why not built in-house, why AI-durable, wedge MVP, the strongest 3 demand signals, the biggest risk, and a self-score 0-100 on the round 1 rubric (A Demand 20, B Sellable 20, C AI-durable 20, D Evidence 15, E Buyer 10, F Feasibility 15). Be harsh: 50 is mediocre, 70 strong.
6. **The single best idea from your domain** and why.

Return a summary of about 200 words as your final message.
