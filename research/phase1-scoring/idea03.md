# Idea #3: Manager Memory / Team Context Engine (evaluation)

Evaluator stance: YC partner plus former VP Eng. I scored against `RUBRIC.md` and tried to be harsh: 50 means mediocre.

## 1. The idea, expanded

**What it is.** A persistent, per-person and per-project "memory" for an engineering manager. It continuously ingests GitHub PRs and reviews, Jira/Linear tickets, Slack threads, design docs, and possibly agent-session logs (Claude Code, Cursor). It keeps a running, cited narrative for each report: what they shipped, what is stuck, what they asked for, career goals mentioned in past 1:1s, and open follow-ups. It also keeps a state for each project. Each report gets an IC view that shows exactly what the manager sees.

**Core workflow.**
1. Thirty minutes before a 1:1, the EM gets a brief in Slack or email. It covers changes since the last 1:1, PRs older than N days, unanswered asks, open action items, and 3-4 suggested topics, each with a link.
2. After the 1:1, notes and action items go back into the memory.
3. Every Monday, a team digest flags who looks blocked or overloaded, such as review queue age, a stalled ticket, or a weekend spike.
4. The IC can see and annotate their own record before the manager does.

**Wedge.** The 1:1 prep brief for EMs with 8+ reports at 50-500-person, GitHub plus Linear shops, self-serve and bottom-up.

**MVP (4-6 weeks).** OAuth to GitHub, Linear/Jira and Slack (public channels only). A per-report timeline store. An LLM brief generator with citations. A notes capture tool and an IC transparency page.

**Moat (claimed).** Longitudinal memory: months of 1:1 notes joined to work artifacts. Also trust UX, meaning the consent and IC-visibility features. Neither is strong (see C).

**Pricing.** Realistically $10-20 per manager per month self-serve, or $5-8 per seat for the whole engineering org if positioned as a team tool. Comparable products sit at Fellow Pro at $7/user/mo ([fellow.co/pricing](https://fellow.co/pricing)), Dailybot at about $2-5/user/mo plus a $3 AI add-on ([AppPricingLab](https://saas.apppricinglab.com/product/dailybot/), [Fitgap](https://us.fitgap.com/products/033202/dailybot-ai)), and Lattice's 1:1 agent, which is free for existing customers.

## 2. What the new research found

**The pain is real but concentrated in a minority of managers.**
- Gallup (Jan 2026) puts the average span at 12.1 in 2025, up from 10.9 in 2024 and about 50% above 2013. The *median* is still 5-6, though.
  - 66% of managers have fewer than 10 reports; 22% have 10-24 and 13% have 25+.
  - The rising average is driven mostly by growth in the 25+ bucket.
  - 97% of managers also do IC work, a median 40% of their time.
  - Gallup concludes that "Manager talent trumps span of control" ([Gallup](https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx)).
- So the target user (8-25+ reports) is roughly a third of managers. That is a real but not universal segment.
- Prior research adds community evidence:
  - The r/EngineeringManagers "engineering management memory crisis" thread (116 upvotes: "my brain is running out of RAM").
  - An EM with about 20 direct reports who scripted git/Jira aggregation himself and called it "yucky and almost like a breach of trust".
  - LeadDev 2025: 52% of EMs took on more reports (secondary source).

**The killer finding: the DIY and platform replacement is already published.**
- G2's VP Engineering published (April 2026) a playbook that does exactly this MVP. Claude plus the Slack, GitHub, Atlassian and Google Drive MCP connectors takes a report's name and returns a ranked 1:1 brief. It claims "2-3 hours/week per manager" ([G2 playbook](https://ai.g2.com/playbook/bzBuPGlvhQw9k1F)).
- Notion's EM runs a similar agent that compiles 24-hour activity from Slack and GitHub into a pre-read ([ZenML LLMOps DB](https://www.zenml.io/llmops-database/ai-powered-engineering-management-and-autonomous-development-workflows)).
- Prior Reddit research found EMs using Obsidian plus "skills to help prep for 1:1s".
- The core feature is a prompt over connectors that already exist. Claude's directory has GitHub, Linear, Atlassian and Slack ([Claude support](https://support.claude.com/en/articles/11724452-browsing-and-connecting-to-tools-from-the-directory)). ChatGPT has GitHub, Linear and Slack apps ([Coupler](https://blog.coupler.io/best-chatgpt-connectors/)).

**Incumbents are converging from every side.**
- **Lattice** launched an "AI Agent in 1:1s" at Lattiverse '26. It covers agenda suggestions, notes, action items and coaching across reviews, feedback and goals, at no extra cost. It has no GitHub or Jira integration that I could confirm ([Lattice blog](https://lattice.com/blog/introducing-the-lattice-ai-agent-in-1-1s)). That gap is the only open lane, and it is a connector away from closing.
- **Fellow** offers AI pre-meeting briefs and Ask Copilot over past 1:1s, at $7/user ([fellow.app](https://fellow.app/one-on-one-software)).
- **Atlassian Rovo** has a Meeting Insights agent you can query about conversations with a specific teammate, plus no-code Rovo Studio agents over Jira and Confluence. It has no dedicated 1:1 agent yet ([Atlassian Community](https://community.atlassian.com/forums/Teamwork-Collection-articles/Introducing-our-new-Rovo-Teamwork-Agent-The-Meeting-Insights/ba-p/3083114)).
- **Glean** agents "prepare meeting briefs" with company context and permissions ([Glean webinar](https://www.glean.com/webinars/build-deploy-ai-agents)).
- **Notion** has custom agents, generally available since May 2026, that run on schedules and triggers over GitHub, Slack and Linear connectors, and AI Meeting Notes can now trigger agents ([Slite guide](https://slite.com/ja/learn/how-to-use-notion-ai), [Notion 2.51](https://www.notion.com/en-gb/releases/2025-05-13)).
- **Weave** (YC W25) has the "Wooly" agent answering questions about org and individual output via app or MCP. **Span** ($25M) builds an "engineering work graph" from agent traces, code, tickets and org structure ([Weave vs Span](https://www.plushcap.com/content/weave/blog/weave-weave-vs-span)).
- **Small direct entrants show traction is weak.** All three below are effectively zero-traction launches. Tometo's builder previously reported that analysis was "not directly actionable" and that judging relevance was the hard part (prior research).
  - Accordia, a structured 1:1 tool with GitHub, Linear and Slack, got a Show HN with 4 points in Sept 2026 ([HN 49785956](https://news.ycombinator.com/item?id=49785956)).
  - Ledger, a "private workspace for EMs", got 2 points ([HN 46513326](https://news.ycombinator.com/item?id=46513326)).
  - Vereda posted "we heard the feedback and are offering a lighter weight tool" and had already retreated to "manager mode" ([HN 47417959](https://news.ycombinator.com/item?id=47417959)).
  - Other EM-assistant startups (Emily, iftrue) are still in discovery ([f4.fund](https://f4.fund/startups/emily-team), [hunted.space](https://hunted.space/dashboard/iftrue)).

**Privacy and regulation are a structural headwind, not just PR.**
- Under the EU AI Act, AI used to monitor or evaluate worker performance is Annex III high-risk. Human-in-the-loop does not remove the classification, and profiling defeats the Art. 6(3) carve-out. The draft Commission guidelines (June 2026) reinforce this ([Faegre Drinker](https://www.faegredrinker.com/en/insights/publications/2026/6/draft-commission-guidelines-on-high-risk-ai-implications-for-the-workplace), [Baker McKenzie](https://insightplus.bakermckenzie.com/bm/data-technology/european-union-the-eu-artificial-intelligence-act-key-takeaways-for-hr)).
- German works councils have co-determination rights under §87 BetrVG.
- "Who's blocked or struggling" per person drifts straight into this zone.
- Prior research adds more evidence:
  - Harness: 54% of developers fear evaluations based on AI data.
  - Cornell: AI monitoring draws more than 4x the complaints of human monitoring, *unless* it is framed developmentally.
  - A Swarmia customer reported trust erosion.
- The practitioner guide on AI in EM workflows warns that models "invent moods from terse messages" ([Rework](https://resources.rework.com/guides/engineering-manager-playbooks/ai-in-em-workflow)). A tool that reads Slack and opines on who is "struggling" is a liability.

## 3. Scoring

**A. Proven demand / market: 10/20**
- Strong qualitative pain and a solid trend: Gallup span growth, LeadDev, and a 116-upvote thread.
- But the money signal is poor:
  - The category's prices are $2-7 per seat, and Lattice gives it away.
  - Direct EM-tool launches get 2-6 HN points.
  - There is no revenue-proven independent player in "1:1 prep from work data".
- The median span of 5-6 means most managers don't feel the pain acutely.
- Demand for the *outcome* exists; demand for a *separate paid product* is unproven.

**B. Sellable (won't build in-house; will pay): 6/20**
- This is the weakest criterion. The in-house build is a published prompt: Claude plus 4 MCP connectors, written up by a VP Eng.
- Buyers already pay for Glean, Rovo, Notion Business or Lattice, all of which ship this as a bundled feature.
- There is no cross-vendor neutrality argument strong enough to justify a new vendor reading private Slack and HR-adjacent notes.
- The budget line is murky. The EM has no budget, the Dir Eng sees "a nice-to-have", and HR owns 1:1 tooling (Lattice).

**C. AI-durability: 5/20**
- The core value is "summarize recent activity across connectors for person X". That is exactly what better models plus first-party connectors plus memory do natively.
- It gets *worse*, not better, as models improve: longer context, agent memory, and scheduled agents (Notion Custom Agents, Claude and ChatGPT tasks) close the gap.
- The claimed moat of longitudinal 1:1 memory lives in whoever owns the notes, which is Lattice, Fellow, Notion or Rovo.
- IC-consent UX is a feature, not a moat.
- This is precisely the feature Atlassian, Notion, Lattice or Anthropic ship next quarter. Several already have.

**D. Evidence-backed real problem: 10/15**
- Multiple independent sources:
  - Gallup span data and the 16% "meaningful conversation" stat.
  - Reddit EM threads with workarounds.
  - The LeadDev survey.
  - Practitioner DIY builds, which prove the job-to-be-done.
- Missing: any benchmark of hours spent on 1:1 prep, and any willingness-to-pay evidence. Several time-saved claims are vendor estimates.

**E. Specific, reachable buyer: 6/10**
- The user is clear (EM with 8+ reports) and reachable via r/EngineeringManagers, LeadDev, Rands Slack, and the founder's network.
- But the buyer and the user split. The Dir Eng or HR signs off on data access, and Slack/GitHub org-wide OAuth needs admin approval.
- Self-serve bottom-up is possible only for the public-channel or GitHub-only slice.

**F. Feasibility & wedge for a student team: 8/15**
- The MVP is technically easy, a few weeks with public APIs. That is also the problem: easy for everyone.
- Real deployment requires:
  - org-admin OAuth on GitHub, Slack and Jira;
  - security review for a tool storing per-person, HR-sensitive narratives;
  - an EU AI Act and works-council posture if it ever touches evaluation.
- Differentiation against a free Claude/Notion prompt is thin.
- The founders' Visa-style enterprise anecdote implies a buyer that will never let a student startup read Slack DMs.

| Criterion | Score |
|---|---|
| A. Demand | 10/20 |
| B. Sellable | 6/20 |
| C. AI-durability | 5/20 |
| D. Evidence | 10/15 |
| E. Buyer | 6/10 |
| F. Feasibility/wedge | 8/15 |
| **Total** | **45/100** |

## 4. Verdict

The pain is genuine and growing for the third of managers with wide spans. But the product is a thin synthesis layer over connectors that Claude, ChatGPT, Notion, Rovo, Glean and Lattice already own, and practitioners already replicate it with a one-page MCP prompt. The idea only becomes interesting if it is reframed as part of something with its own data and a trust position. For example, an IC-owned, consent-first evidence ledger (idea #8) whose output managers consume, rather than a manager-side "who's struggling" radar that collides with surveillance norms and EU high-risk rules.

**Biggest risk:** Commoditization. "Claude/ChatGPT + GitHub/Slack/Jira connectors + a 1:1 prompt" (already published by G2's VP Eng) and Lattice's free 1:1 agent make a standalone paid product nearly impossible to sell.

FINAL SCORE: 45/100
