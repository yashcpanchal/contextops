# Idea #6: AI-PR comprehension and provenance layer

Evaluator stance: YC partner plus former VP Eng. Date: 2026-10-13. Scored against `RUBRIC.md`.

## 1. The idea, expanded

**What it is.** A GitHub App plus local agent hooks (Claude Code, Cursor, Codex, Copilot). For every pull request it:
1. Captures the agent session(s) behind the diff: prompts, plan, tool calls and model, linked to line ranges.
2. Posts a reviewer-facing "why/how" explainer that covers intent, design choices the agent made, alternatives it rejected, and the risky spots.
3. Optionally runs a short author comprehension check, with 2-3 questions generated from the diff and session, before review is requested.
4. Rolls this up into an EM/tech-lead view: % AI per PR, which PRs merged with low-comprehension signals, and an exportable AI-usage audit trail.

**Core workflow.** A dev works with an agent, and hooks record the session. The dev opens a PR, and the bot comments with the explainer and session link. The author answers the comprehension prompt in the PR thread. The reviewer reads the explainer and session instead of reverse-engineering the diff. The EM gets a weekly "AI PRs merged without demonstrated understanding" digest.

**Wedge.** "Stop 'I don't know, Claude wrote this'": a free GitHub App for teams of 5-50 that already use Claude Code or Cursor. It installs in 2 minutes and attaches session plus explainer to each PR.

**MVP (4-6 weeks).** GitHub App, Claude Code hooks (plus reading the Cursor/Agent Trace format), session-to-PR linking, an LLM explainer comment, an optional quiz check, and a basic EM dashboard.

**Moat (claimed).** A cross-agent session corpus tied to review outcomes (which PRs got reverted or caused incidents, and comprehension scores). Over time, that corpus would let the product predict which AI PRs are risky.

**Pricing.** Free for OSS and individuals; $15-25/dev/month for team; enterprise audit export at $40+/dev/month.

## 2. New research findings (Oct 2026)

**The provenance half is already a funded, crowded category, and the platforms are absorbing it.**
- **Entire** (ex-GitHub CEO Thomas Dohmke) raised a record **$60M seed at a $300M valuation** in Feb 2026, led by Felicis with M12 participating. Its CLI hooks git to capture agent sessions (Claude Code, Codex, Gemini CLI, OpenCode) as "checkpoints" stored on a side branch. Its web app shows session timelines and agent-vs-human line attribution. Its docs explicitly recommend "review sessions during code review to understand changes." It also has "Dispatches": readable summaries of what changed for "reviewers, product partners." That is almost exactly this idea's explainer. [TechCrunch](https://techcrunch.com/2026/02/10/former-github-ceo-raises-record-60m-dev-tool-seed-round-at-300m-valuation/embed/), [Entire sessions docs](https://docs.entire.io/web/sessions), [Entire dispatches](https://docs.entire.io/guides/dispatches/overview), [Thoughtworks Radar](https://www.thoughtworks.com/radar/tools/entire-cli)
- **Git AI** is an open-source git extension with line-level AI attribution in git notes and AI Blame that links lines to prompts. It supports 10+ agents, including Cursor, Claude Code, Copilot and Codex. Its Teams tier offers a prompt store, % AI by PR, and incident-to-session linking, and it claims "many in the Fortune 100." **Its founders were hired by OpenAI's Codex team (Sep 2026)**, and the site now says "Git AI is now part of OpenAI." [usegitai.com](https://usegitai.com/), [The New Stack](https://thenewstack.io/openai-hires-git-ai/)
- **Cursor** published **Agent Trace**, an open RFC (v0.1.0, Jan 2026) for line-level AI attribution linked to conversations. Partners include Cognition, Cloudflare, Vercel, Amp, Cline, Jules and git-ai. Cursor also ships **Cursor Blame** (Enterprise), which shows hover summaries of the conversation that produced each AI line. [agent-trace.dev](https://agent-trace.dev/), [Cursor Blame docs](https://cursor.com/docs/integrations/cursor-blame)
- **GitHub** ships Copilot agent session logs (`gh agent-task --log`), an Agents tab that links sessions to PRs (Jan 2026), and more session visibility (Mar 2026). In June 2026 it added a "get agent logs" tool, so Copilot Chat can answer questions about "changes, validation, and rationale" of an agent PR. VS Code turned on Copilot co-author trailers by default (v1.118). [GitHub docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/track-copilot-sessions), [Changelog Mar 2026](https://github.blog/changelog/2026-03-19-more-visibility-into-copilot-coding-agent-sessions/), [VS Code 1.118](https://code.visualstudio.com/updates/v1_118#_copilot-added-as-a-git-coauthor-by-default)
- **Anthropic** Claude Code adds Co-Authored-By trailers, PR attribution lines and a claude.ai **session URL** for cloud/Remote Control sessions (`attribution.sessionUrl`). There is no built-in transcript-in-PR yet, but the link is the first step. [ClaudeLog](https://claudelog.com/faqs/attribution-setting-claude-code/), [SSD Nodes](https://www.ssdnodes.com/learn/claude-code-commit-attribution)
- Other OSS entrants: **Semantica** (MIT CLI, session lineage), **SpecStory** (saves agent chats; HN 35 pts in 2025). [Semantica](https://pkg.go.dev/github.com/semanticash/cli), [HN SpecStory](https://news.ycombinator.com/item?id=43557698)

**The comprehension-check half is a weekend project that already exists for free.** Examples are PR Guard (a GitHub Action that asks 3 why/risk/test questions and fails until answered), PR Quiz (Show HN), the PRown MVP gate, and several Claude Code "pr-quiz" skills. None shows funding or traction. [PR Guard](https://github.com/ym2132/pr_guard), [PR Quiz Show HN](https://hn.svelte.dev/item/44726672), [pr-quiz skill](https://skillsmp.com/creators/stirling-tools/stirling-pdf/claude-skills-pr-quiz)

**The explainer half is already commoditized** by AI reviewers. CodeRabbit (est. ~$40M ARR) posts PR walkthroughs, and Copilot code review began fully reviewing Copilot-agent PRs in Aug 2026. [GitHub changelog Aug 2026](https://github.blog/changelog/2026-08-27-copilot-code-review-resolution-reasons-and-expanded-capabilities), competitors.md

**The problem itself is real and loudly discussed.**
- Codemanship, "Comprehension debt: a ticking time bomb of LLM-generated code": **532 points / 338 comments on HN** [HN](https://news.ycombinator.com/item?id=45423917). Addy Osmani and O'Reilly Radar followed in 2026 [Osmani](https://addyosmani.com/blog/comprehension-debt/), [O'Reilly](https://www.oreilly.com/radar/comprehension-debt-the-hidden-cost-of-ai-generated-code/).
- Anthropic RCT (n=52): the AI group scored 17% lower on comprehension (50% vs 67%), and delegators scored under 40% [Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills).
- Sonar State of Code (n=1,100+, vendor survey): 96% don't fully trust AI code, only 48% always check it before committing, and 38% say AI code is harder to review. Werner Vogels calls this "verification debt." [Sonar](https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/), [The Register](https://www.theregister.com/2026/01/09/devs_ai_code/)
- Reddit (from reddit.md): "won't review AI PRs" (1,920 up), "I don't know, Claude wrote this" (854 up), "can tell they don't understand what they wrote" (552 up), and "one audit away" (220 up, though its top reply calls it an "invented problem").

## 3. Scoring

### A. Proven demand / market: 12/20
The pain is real and growing, and capital has clearly flowed into the provenance layer: Entire's $60M seed, Git AI's Teams/Enterprise tier and OpenAI hire, and Cursor Blame as an Enterprise upsell. But the money is going to **capture and attribution infrastructure** owned by agent vendors or a heavyweight founder. Nobody has shown paid demand for **comprehension checks** specifically; every quiz tool is a free hobby project. "Comprehension debt" is a discourse, not yet a budget. Demand exists for the category, not for this team's slice.

### B. Sellable (won't build in-house; will pay): 7/20
The cross-agent neutrality argument is real, but it is **already taken**. Entire is cross-agent and has $60M, Git AI is OSS and cross-agent, and Agent Trace is an open standard that makes session capture interoperable for everyone. That lowers the barrier for incumbents more than for a startup. A platform team can wire hooks plus a GitHub Action plus an LLM explainer in a sprint, and PR Guard shows the quiz half takes a day. There is no clear budget line: EMs rarely own tooling spend, and the audit angle belongs to a CISO buyer (idea #7). Charging $15-25/dev/month on top of CodeRabbit and Copilot seats would be a hard sell.

### C. AI-durability: 4/20
This is the idea's fatal weakness. Every component is either a native feature of the agent vendors or a commodity LLM call:
- session-to-PR linking: GitHub Agents tab, Claude session URLs, Entire, Cursor Blame
- attribution: Agent Trace, Git AI (now OpenAI), VS Code co-author defaults
- rationale Q&A: Copilot Chat "get agent logs"
- explainer: CodeRabbit and Copilot review
- quizzes: free Actions

As models improve, vendors will auto-generate better rationale and "explain this to the reviewer" summaries inside their own PR flows, so the product gets *more* replaceable. This is precisely "a feature GitHub, Anthropic or Cursor will ship next quarter," and in several cases they already have. The only durable asset, a cross-org corpus linking sessions to review and incident outcomes, is exactly what Entire and Git AI/OpenAI are racing to own with far more distribution.

### D. Evidence-backed real problem: 12/15
This is among the best-evidenced problems in the Top 10. It has multiple independent high-engagement community signals (Reddit 1,920/854/552 up, HN 532 points), a randomized controlled trial (Anthropic), a large survey (Sonar, which is a vendor and so discounted), and named practitioners (Osmani, Vogels, Storey). Points are deducted because the evidence is about the *problem*, not about a tool fixing it. Also, a significant minority frames the solution as a norm ("don't raise PRs you don't understand") rather than software.

### E. Specific, reachable buyer: 5/10
EMs and tech leads at AI-heavy startups are reachable through r/EngineeringManagers, LeadDev and HN, and they will install a free GitHub App. But they are users more than buyers, and the payer is unclear. The split between "EM for comprehension" and "security for audit" is two different buyers with two different products. Surveillance backlash is also a risk (54% of devs fear AI-based evaluation, per TOP10): a quiz gate that managers can see reads as a PIP tool.

### F. Feasibility & wedge for a student team: 8/15
Technically this is very feasible. Claude Code hooks, the Agent Trace spec, the GitHub App API and an LLM explainer make an MVP in 3-5 weeks with no SOC2 needed for a free tier. The trouble is differentiation, which is close to nil against Entire (same founder story as GitHub, $60M, already cross-agent with summaries) and free OSS quiz Actions. Capturing prompts also raises immediate security and IP questions about storing proprietary code and prompts, which pushes real customers toward self-hosting and longer sales cycles.

## 4. Verdict
This is a real, painful, well-documented problem, but in 2026 the product is a set of features being shipped by GitHub, Cursor, Anthropic and OpenAI (via Git AI), with Entire's $60M seed sitting on the neutral cross-agent position. A student team could build it in a month and still have no defensible reason to exist. The only salvageable angle is to fold "comprehension/understanding signals" into a broader product (review-capacity orchestration, #5, or the regulated audit trail, #7) as an input, not a company.

**Biggest risk:** platform absorption. Session capture, PR rationale and attribution are already native in Copilot, Cursor Blame, Claude Code session links and Entire. That leaves nothing defensible for a new entrant to charge for.

FINAL SCORE: 48/100
