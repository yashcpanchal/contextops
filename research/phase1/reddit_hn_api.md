# Reddit + HN API research: where EMs waste time in the AI era

Data: 2186 deduplicated items (Reddit raw+raw2 posts/comments; HN hn+hn2 stories/comments). Reddit restricted to r/EngineeringManagers, r/managers, r/ExperiencedDevs, r/softwareengineering; r/cscareerquestions excluded as off-topic noise. Matching is keyword regex on body text, so counts are approximate and an item can sit in several themes. Rank = item count x ln(1+mean score). Quotes are verbatim from the data (HTML tags stripped, max 300 chars, "..." = excerpt starts mid-text). HN comments carry no points, so HN engagement is understated; r/EngineeringManagers items are boosted in within-theme ordering because they are the closest to the target buyer.

## Ranked themes

| Rank | Theme | Items | Mean score | Rank score |
|---|---|---|---|---|
| 1 | Status / reporting up | 144 | 21.0 | 445 |
| 2 | Metrics backlash (Jellyfish/LinearB/DORA/Swarmia) | 171 | 8.6 | 386 |
| 3 | Visibility / manager-doesnt-know-what-I-do | 104 | 28.1 | 351 |
| 4 | Managing agents | 141 | 7.7 | 305 |
| 5 | Estimation / story points | 125 | 9.0 | 288 |
| 6 | Perf reviews & promo packets | 104 | 11.9 | 266 |
| 7 | 1:1s | 82 | 18.8 | 245 |
| 8 | AI PR review burden | 68 | 15.3 | 190 |
| 9 | Onboarding / interns | 64 | 9.6 | 151 |
| 10 | AI ROI / token spend | 152 | 1.4 | 132 |
| 11 | Span of control / managers too thin | 81 | 3.1 | 115 |

### 1. Status / reporting up (n=144)

- "...11.05am - people wait for others to join. Crickets 11.06 am - one Eng shares the screeen and starts standup 11.06 am - someone figures out who goes first 11.07 am - The first person says he is facing a problem. Others ask what. Then two/three folks rabbit hole for 10 minutes. Others wait for their t"
  - r/ExperiencedDevs posts | thread: Is this your situation too with daily standups? Do you love them or hate them? | score: 646 | comments: 304 | https://reddit.com/r/ExperiencedDevs/comments/1lvo7fd/is_this_your_situation_too_with_daily_standups_do/
- "...founded. I know this is a rant but i am just sitting here at 1am pissed off as my CTO just ripped into my status update for not being positive enough on AI, and is demanding i rewrite/explain stuff better before their 9am management meeting. I literally feel this company is about to bleed a huge amo"
  - r/ExperiencedDevs posts | thread: New CTO/VP of product who are making crazy demands about integrating "AI" into e | score: 403 | comments: 188 | https://reddit.com/r/ExperiencedDevs/comments/1fdakjs/new_ctovp_of_product_who_are_making_crazy_demands/
- "...visibility** During a sensitive delivery period, Dev A and Dev B didn’t push WIP or give end-of-day status updates. I needed to assemble a demo/status for the PM and asked for EOD updates + more frequent progress updates given the timeline. This also got escalated, and turned into a larger meeting w"
  - r/ExperiencedDevs posts | thread: New-ish tech lead dealing with repeated “skip-level” escalation and constant pus | score: 163 | comments: 148 | https://reddit.com/r/ExperiencedDevs/comments/1qlmbbx/newish_tech_lead_dealing_with_repeated_skiplevel/
- "...Our daily scrum is intentionally lightweight: - Surface blockers - Adapt the plan if needed - Not a status update - Keep it short Leadership ("heads") regularly sit in on the daily. Recently, they've expressed dissatisfaction, saying the discussions are too past-focused and not future-focused enough"
  - r/ExperiencedDevs posts | thread: Higher ups are wanting more out of daily scrums? | score: 148 | comments: 149 | https://reddit.com/r/ExperiencedDevs/comments/1pp3b92/higher_ups_are_wanting_more_out_of_daily_scrums/
- "...meeting a day (sometimes two), and weekly meetings with my manager. Some of us keep getting harassed for status updates and details about the work. It's as if managers have little to do but to keep an eye on us now, and there's fewer of us so more load and more work. Company is on a downward trend o"
  - r/ExperiencedDevs posts | thread: Too many status meetings | score: 166 | comments: 84 | https://reddit.com/r/ExperiencedDevs/comments/1d95lwt/too_many_status_meetings/

### 2. Metrics backlash (Jellyfish/LinearB/DORA/Swarmia) (n=171)

- "...the ship around!' - l. david marquet:** for when you need to feel inspired about empowerment and not micromanaging. **ideas that actually stick (and work):** * **1:1s are sacred, and they're *their* meeting, not yours.** ask good questions ("what's blocking you?" "what's one thing you'd change?" "ho"
  - r/managers posts | thread: that "omg what books/tools/anything do i need as a manager?!" panic? here's my g | score: 367 | comments: 51 | https://reddit.com/r/managers/comments/1kg1f67/that_omg_what_bookstoolsanything_do_i_need_as_a/
- "...workforce ready as ever to start my career, and after my 2nd failed job I hated myself. My first manager micromanaged me so much I felt like if I breathed a certain way she’d ask why I chose to breathe that way. My 2nd boss pretty much was non existent, gave me no direction, no training, and only sp"
  - r/managers posts | thread: Having a good manager changed my life | score: 220 | comments: 16 | https://reddit.com/r/managers/comments/1pnu4d7/having_a_good_manager_changed_my_life/
- "...it. I recently joined this team, and it's like no other I've been on before. The primary concern is velocity, so everything that can be perceived as slowing velocity has been stripped out. - There is no planning: no meetings regarding who is doing what this week/month/cycle/whatever. We have a stand"
  - r/ExperiencedDevs posts | thread: Team is extreme in prioritising velocity. | score: 99 | comments: 113 | https://reddit.com/r/ExperiencedDevs/comments/1llr173/team_is_extreme_in_prioritising_velocity/
- "...company, and a new manager joined our team about three months ago, from an specific country known by its micromanaging practices. The first few weeks were fine, but then the micromanaging started. If I spend more than an hour debugging something, he asks for a status update and tells me to post the "
  - r/ExperiencedDevs posts | thread: How do you deal with an obsessive manager who treats you like an idiot? | score: 113 | comments: 58 | https://reddit.com/r/ExperiencedDevs/comments/1k4yrcm/how_do_you_deal_with_an_obsessive_manager_who/
- "...added. To be fair the reason is the same as above, having ICs directly exposed to stakeholders increases velocity and empowers the devs. But it raises a question...**"What the heck do I do here?!?!?!"** So after processing this for months it dawned on me. The company (and likely industry) is moving "
  - r/ExperiencedDevs posts | thread: Reflections from a Tech Lead Manager in a post ZIRP world | score: 95 | comments: 54 | https://reddit.com/r/ExperiencedDevs/comments/1okl63a/reflections_from_a_tech_lead_manager_in_a_post/

### 3. Visibility / manager-doesnt-know-what-I-do (n=104)

- "...spent. The results were exactly what I suspected: a 55-hour work week, with nearly 20 hours of it being invisible work that keeps the wheels on but doesn't fit into a neat billable box. Now I have a report that proves my team is overworked, not underperforming. My question for the managers here is: "
  - r/managers posts | thread: My team's official metrics look bad, but they're burning out. How do I show lead | score: 576 | comments: 138 | https://reddit.com/r/managers/comments/1nrk73q/my_teams_official_metrics_look_bad_but_theyre/
- "...side projects like “convert the conference room into a media room.” These skip my boss entirely. He doesn’t know what’s on my plate, and then he adds his own projects on top. I was drowning. Delegating, prioritizing, Eisenhower matrix—it didn’t matter. Requests kept piling up. So I picked up on Cal "
  - r/managers posts | thread: Boss says I “just say no” even though I’m managing 150 people and projects with  | score: 478 | comments: 130 | https://reddit.com/r/managers/comments/1mx49v9/boss_says_i_just_say_no_even_though_im_managing/
- "...guess. * **a task/project manager that your team actually uses (asana, trello, jira, monday, whatever):** visibility is key. * **calendly or similar for scheduling:** stop the email ping pong for meetings. * **loom or other screen recording tools:** sometimes showing is faster than telling, especial"
  - r/managers posts | thread: that "omg what books/tools/anything do i need as a manager?!" panic? here's my g | score: 367 | comments: 51 | https://reddit.com/r/managers/comments/1kg1f67/that_omg_what_bookstoolsanything_do_i_need_as_a/
- "...had something like this happen? How did you handle it without overreacting, but still protecting your visibility and contributions?"
  - r/ExperiencedDevs posts | thread: Coworker repeated my private message as his stand-up update — coincidence or red | score: 294 | comments: 85 | https://reddit.com/r/ExperiencedDevs/comments/1ol0ics/coworker_repeated_my_private_message_as_his/
- "...the codebase hard for others to understand. He didn’t raise it with me first. 2. **Delivery crunch / visibility** During a sensitive delivery period, Dev A and Dev B didn’t push WIP or give end-of-day status updates. I needed to assemble a demo/status for the PM and asked for EOD updates + more freq"
  - r/ExperiencedDevs posts | thread: New-ish tech lead dealing with repeated “skip-level” escalation and constant pus | score: 163 | comments: 148 | https://reddit.com/r/ExperiencedDevs/comments/1qlmbbx/newish_tech_lead_dealing_with_repeated_skiplevel/

### 4. Managing agents (n=141)

- "...if you haven't even looked at the code), but I'm not really doing the actual work. I feel like I'm a manager at this point, just of agents rather than people. And it's impossible to enter flow with this kind of work, there's too many pauses and context switches. But not doing that is just too slow, "
  - r/ExperiencedDevs posts | thread: Is anyone else considering a career change? | score: 309 | comments: 306 | https://reddit.com/r/ExperiencedDevs/comments/1qyjb8t/is_anyone_else_considering_a_career_change/
- "...*Matey*. We’re both at the same level and both working toward promotion, which is great. The day after our manager said we should work together, I sent Matey a message asking if he’d had a chance to read through the epic we’d been assigned. I suggested we split the tasks and pair where it makes sens"
  - r/ExperiencedDevs posts | thread: Coworker repeated my private message as his stand-up update — coincidence or red | score: 294 | comments: 85 | https://reddit.com/r/ExperiencedDevs/comments/1ol0ics/coworker_repeated_my_private_message_as_his/
- "...and it lit a fire under my ass to get serious about finding something better. I started applying for manager roles again, thinking that's what I needed. Rejection after rejection. I even applied to a manager position at my old company, and someone I knew there even encouraged me to apply. They rejec"
  - r/managers posts | thread: UPDATE: I'm a Senior Manager title with no direct reports... What role am I real | score: 162 | comments: 22 | https://reddit.com/r/managers/comments/1lhsbh5/update_im_a_senior_manager_title_with_no_direct/
- "...in." Instead, he recommends engineers integrate LLMs into their workflow more and more, until they are managing multiple agents at one time. The final level in his AI Coding chart reads: "Level 8: you build your own orchestrator to coordinate more agents." At my work, this wouldn't fly-- we're still"
  - HN story | thread: Ask HN: Are you using an agent orchestrator to write code? | score: 41 | comments: 60 | https://news.ycombinator.com/item?id=46993479
- "I don't know if you are already doing it, but one thing that has worked very well for us on the management side is using AI for the follow-up of activities and decisions. For example, something you can start this week is to pass the notes or transcripts of your 1:1s and team meetings to an AI assist"
  - r/EngineeringManagers comments | thread:  | score: 2 | comments: 44 | https://reddit.com/r/EngineeringManagers/comments/1wu742t/my_story_as_an_engineering_manager/pd1809d/

### 5. Estimation / story points (n=125)

- "...how we used "AI" to solve problems we encountered today, with specific examples, and a "guesstimated" estimation of how much more efficient we are thanks to tools like chatgpt/co-pilot. I swear our CTO spends all day reading that and asking us for more clarification/details/better explanation, or st"
  - r/ExperiencedDevs posts | thread: New CTO/VP of product who are making crazy demands about integrating "AI" into e | score: 403 | comments: 188 | https://reddit.com/r/ExperiencedDevs/comments/1fdakjs/new_ctovp_of_product_who_are_making_crazy_demands/
- "...hired from our company. These two developers never create their own development plan, nor produce an estimate no matter how many times they are asked, and they significantly stretch the time it takes them to deliver (what should take them a day, often gets stretched to 3 days, without explanation). "
  - r/ExperiencedDevs posts | thread: Developers refusing bi-weekly tech meetings | score: 112 | comments: 212 | https://reddit.com/r/ExperiencedDevs/comments/1mty20a/developers_refusing_biweekly_tech_meetings/
- "...reverse their decisions or those responsible would be replaced. I was dead wrong about this. I underestimated the longevity of certain individuals in this company and their ability to deflect blame. This is probably my biggest mistake, trying to wait them out. Over time now, some of the newer develo"
  - r/ExperiencedDevs posts | thread: Did you ever stay too long? | score: 95 | comments: 75 | https://reddit.com/r/ExperiencedDevs/comments/1qg1veg/did_you_ever_stay_too_long/
- "...three if you count testing. Somehow it took four months. We finished the code in two weeks, like we estimated. But then the platform team had to review the API contract, who had their own backlog, and someone realized the dashboard touched a data pipeline another team owned, which meant a schema rev"
  - r/EngineeringManagers posts | thread: My team shipped a two-week feature in four months and the code was done in the f | score: 79 | comments: 23 | https://reddit.com/r/EngineeringManagers/comments/1ta0pn0/my_team_shipped_a_twoweek_feature_in_four_months/
- "...projects with this tech", which yes developer familiarity can be a reason as it can help build time / estimations etc but I don't think its a good reason on an established team, with an established project that doesn't currently use it. This was causing him quite a bit of frustration as he couldn't "
  - r/ExperiencedDevs posts | thread: Dealing with a difficult situation with co-worker | score: 65 | comments: 52 | https://reddit.com/r/ExperiencedDevs/comments/1jia4vl/dealing_with_a_difficult_situation_with_coworker/

### 6. Perf reviews & promo packets (n=104)

- "...what I will say and I’m certain I’ll get reprimanded. Somehow I’ve gotten “Meets Expectations” at every performance review I’ve ever had throughout my career, but even at my most recent one, my manger told me that I’m on the “lower end of that” (I suspect he feels that I am “Below Expectations”, but"
  - r/ExperiencedDevs posts | thread: What do you do when you’re genuinely incompetent and too dumb to be an engineer? | score: 194 | comments: 115 | https://reddit.com/r/ExperiencedDevs/comments/1r1io2i/what_do_you_do_when_youre_genuinely_incompetent/
- "...assured me “don’t worry, all your hard work will be rewarded VERY soon” which I took as a major hint with performance reviews approaching. 🥹 I know this is a novel, so seriously thank you if you’ve made it this far. The purpose of this story is to let you managers know that you do make a difference."
  - r/managers posts | thread: Having a good manager changed my life | score: 220 | comments: 16 | https://reddit.com/r/managers/comments/1pnu4d7/having_a_good_manager_changed_my_life/
- "...least some authority to tell people what to do and they're inclined to listen because you write their performance reviews (not saying this is right or a healthy culture). As an IC you have to influence without authority, which means I have to try to convince and beg people to do things and they just"
  - r/ExperiencedDevs posts | thread: Does anyone else feel like there is gatekeeping around eng management? | score: 131 | comments: 190 | https://reddit.com/r/ExperiencedDevs/comments/1k6agbz/does_anyone_else_feel_like_there_is_gatekeeping/
- "...else. I’m a former eng manager, and now a senior developer. At the end of October, I was given my first performance review by a new manager of just a couple months. After no prior feedback from him, he told me I’d been failing to meet expectations, specifically in how I communicate. I’d had a 16 yea"
  - r/ExperiencedDevs posts | thread: A PIP story | score: 137 | comments: 104 | https://reddit.com/r/ExperiencedDevs/comments/1q5wril/a_pip_story/
- "...embedded system. We don't really have a product manager, and the CTO has asked each dev on the team to write up status reports for our client. I know that the people reading our updates are not technical, and I've figured out that all they want to know is if the schedule is going to slip week-to-wee"
  - r/ExperiencedDevs posts | thread: How do you explain time spent on bugs/tech debt/non-features to non-technical st | score: 73 | comments: 75 | https://reddit.com/r/ExperiencedDevs/comments/1f98szz/how_do_you_explain_time_spent_on_bugstech/

### 7. 1:1s (n=82)

- "...people accept it. Some grumble, but they see the reality. I thought this was working great. In my last one-on-one, though, my boss told me I have a reputation for “just saying no.” I pushed back, saying I rarely say no—it’s always “not right now” with documentation. He said that was “adding friction"
  - r/managers posts | thread: Boss says I “just say no” even though I’m managing 150 people and projects with  | score: 478 | comments: 130 | https://reddit.com/r/managers/comments/1mx49v9/boss_says_i_just_say_no_even_though_im_managing/
- "...feel inspired about empowerment and not micromanaging. **ideas that actually stick (and work):** * **1:1s are sacred, and they're *their* meeting, not yours.** ask good questions ("what's blocking you?" "what's one thing you'd change?" "how's your energy/morale?") then shut up and listen. * **feedba"
  - r/managers posts | thread: that "omg what books/tools/anything do i need as a manager?!" panic? here's my g | score: 367 | comments: 51 | https://reddit.com/r/managers/comments/1kg1f67/that_omg_what_bookstoolsanything_do_i_need_as_a/
- "...interventions work best: written working agreements, RACI/DRI clarity, stronger project management, one-on-ones, involving the manager early, or something else? * Also: if any of my requests sound like bad practice (CI push, types separation, update cadence), I’m open to being wrong — I’d appreciate"
  - r/ExperiencedDevs posts | thread: New-ish tech lead dealing with repeated “skip-level” escalation and constant pus | score: 163 | comments: 148 | https://reddit.com/r/ExperiencedDevs/comments/1qlmbbx/newish_tech_lead_dealing_with_repeated_skiplevel/
- "...referred to later if there are any questions. Not some half assed chicken scratch bullshit. The first 1:1 with my manager after the meetings regarding the project, I was asked for information to test my knowledge. My manager was testing my knowledge in a way that left me feeling I was giving an oral"
  - r/ExperiencedDevs posts | thread: My experiences onboarding as a senior software engineer. | score: 74 | comments: 87 | https://reddit.com/r/ExperiencedDevs/comments/1e0jr0o/my_experiences_onboarding_as_a_senior_software/
- "...forgot. I only realized tuesday when I saw her status said "birthday yesterday :)" Brought it up Wednesday 1:1 apologized, said I'd been overwhelmed. She said fine but then got quiet. I pushed and she started crying, said she felt invisible, that I remember everyone else's, what did she do wrong. Fe"
  - r/managers posts | thread: Employee birthday automation for HR teams drowning in manual gift tracking | score: 62 | comments: 89 | https://reddit.com/r/managers/comments/1p6yvz8/employee_birthday_automation_for_hr_teams/

### 8. AI PR review burden (n=68)

- "Every third resume/CL I get now feels like AI slop. You can still spot the bad ones, especially cause I work in aerospace ( “Managed satellite systems at PayPal” -- no, you didn't) but it’s getting trickier. Real candidates are using AI too, which is fine when it’s just **bolding random phrases** or"
  - r/managers posts | thread: Drowning in AI slop applications | score: 628 | comments: 275 | https://reddit.com/r/managers/comments/1o22eop/drowning_in_ai_slop_applications/
- "...seems every job is like this, if not now then pretty soon (at my big N tech company it's around 90% AI generated code and we expect to hit \~100% by EOY). I'm not complaining that AI is bad for the software industry, I think it's going to be very good, just like industrialization was good for produc"
  - r/ExperiencedDevs posts | thread: Is anyone else considering a career change? | score: 309 | comments: 306 | https://reddit.com/r/ExperiencedDevs/comments/1qyjb8t/is_anyone_else_considering_a_career_change/
- "...1 and lay out the expectations. If they yap, then touch base offline. Btw, no one was talking about “AI slop” PRs until you brought it up. You also brought up how you do so much work with AI, that you can’t possibly fathom summarizing the high level initiative of the previous day and current day. I’"
  - r/EngineeringManagers comments | thread:  | score: 2 | comments: 55 | https://reddit.com/r/EngineeringManagers/comments/1uu97kr/is_it_normal_that_team_leads_give_little_to_no/ox4ha1h/
- "...really good at generating fake work. We’re starting to see some of the repercussions of the tech-side of AI slop as Amazon apparently is formally addressing some of the engineering issues it’s causing. but on the non-tech side, there’s endless amounts of doc slop and increasingly Slack slop, all fil"
  - HN story | thread: AI is supercharging fake work | score: 13 | comments: 10 | https://news.ycombinator.com/item?id=47347983
- "I struggle to find the right way to provide feedback on pull requests (PRs) that mostly consist of AI generated code. Co-workers submitting them have learned to disclose this -- I found it frustrating when they didn't -- and now say they have reviewed and iterated on it. But often the result is stil"
  - HN story | thread: Ask HN: Etiquette giving feedback on mostly AI-generated PRs from co-workers | score: 5 | comments: 6 | https://news.ycombinator.com/item?id=46308807

### 9. Onboarding / interns (n=64)

- "...simply haven't been trained to get the required skills. Instead on helping with releasing on time the onboarding/training make it take longer (you know, Brook's law). I’ve shared my frustrations with my boss, and he just seems to respond with random motivational phrases like, "You can do it," or "Yo"
  - r/ExperiencedDevs posts | thread: New into corporate world. Any advice to tolerate it for ~2 years? | score: 154 | comments: 76 | https://reddit.com/r/ExperiencedDevs/comments/1fg3rvl/new_into_corporate_world_any_advice_to_tolerate/
- "...overwhelmed because I feel like I don't even know what I am supposed to do. There was never really any formal onboarding process in this new team. There really is only one person who is the SME basically and we just end up going to him to ask him what needs to be done in the ticket. But even he does"
  - r/ExperiencedDevs posts | thread: When tickets are assigned to you, is it normal to have a lot of missing scope ?  | score: 106 | comments: 153 | https://reddit.com/r/ExperiencedDevs/comments/1fvncig/when_tickets_are_assigned_to_you_is_it_normal_to/
- "...asking that. - Recently Ive been asked about areas of code that I'd like to jump into to continue with my onboarding, I understand that I'm a senior engineer, I should be creating my own work which I have tried but I'll come to that in the next point. Im confused by the question from my manager, in "
  - r/ExperiencedDevs posts | thread: My experiences onboarding as a senior software engineer. | score: 74 | comments: 87 | https://reddit.com/r/ExperiencedDevs/comments/1e0jr0o/my_experiences_onboarding_as_a_senior_software/
- "...was doing TL work we had like 8 or 10 people funneling into me, most of them new to the company. I was onboarding them, leading all of their projects, supporting multiple clients, and their manager was hands off on their day to day. As a result, the team had no expectation of me even picking up tick"
  - r/EngineeringManagers comments | thread:  | score: 9 | comments: 55 | https://reddit.com/r/EngineeringManagers/comments/1uu97kr/is_it_normal_that_team_leads_give_little_to_no/ox1tpf9/
- "...push your team for better performance is a skill to know too. 7. General stuff like creating a good onboarding, offboarding process, team knowledge sharing, etc. Hope this helps!"
  - r/EngineeringManagers comments | thread:  | score: 20 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1hvkzcz/what_are_the_key_challenges_for_first_time/m5u35l7/

### 10. AI ROI / token spend (n=152)

- "Maybe it is just a new advertising strategy? step 1) Increase token usage by encouraging managers to feel like they should use AI to request daily status updates step 2) Increase token usage even more by encouraging managers to include multiple other feedback sources, and to increase the complexity "
  - r/EngineeringManagers comments | thread:  | score: 2 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1tr2ydu/i_stopped_asking_engineers_to_write_status/oomakfe/
- "...is looking at the cost from the wrong angle. In a small engineering team, the expensive part is not token usage. It’s engineers spending time every day trying to remember what they did, rewriting it into a status update, and then repeating it again in a meeting. That cost is much higher than the tok"
  - r/EngineeringManagers comments | thread:  | score: 1 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1tr2ydu/i_stopped_asking_engineers_to_write_status/ooozpse/
- "...1.2 points better code on a 10 point scale vs claude code. Downsides: takes a lot longer, much more token usage, but still reasonable at $1.60 per PR. We open sourced it: https://github.com/cluesmith/codev More details and raw results: https://cluesmith.com/blog/a-tour-of-codevos/"
  - HN story | thread: 6 Practices that turned AI from prototyper to workhorse (106 PRs in 14 days) | score: 15 | comments: 12 | https://news.ycombinator.com/item?id=47208471
- "Companies have been reported to „tokenmax“, i.e. have leaderboards of AI token usage, with the idea that consuming more tokens means better productivity. The idea sounds so obviously completely absurd to me. Could someone make an actual case for it that isn’t pure irrationality? Have you experienced"
  - HN story | thread: Ask HN: Why Are Companies Tokenmaxxing? | score: 6 | comments: 9 | https://news.ycombinator.com/item?id=47932475
- "...billing. We will loosen usage limits once usage-based billing is in effect. What's changing on June 1 for Copilot Billing Premium request units, or PRUs, will be replaced by GitHub AI Credits which are a monthly allotment of credits consumed based on token consumption (input, output, and cached toke"
  - HN story | thread: GitHub Copilot is moving to usage-based billing and retiring annual plans | score: 9 | comments: 1 | https://news.ycombinator.com/item?id=47924285

### 11. Span of control / managers too thin (n=81)

- "...some of the decisions start trickling down by the new management. They started by installing a layer of middle managers, business analysts, and architects. Along with the new roles came a heavy dose of bureaucratic processes and responsibilities for the new roles. One multiple occasions, I have been"
  - r/ExperiencedDevs posts | thread: Did you ever stay too long? | score: 95 | comments: 75 | https://reddit.com/r/ExperiencedDevs/comments/1qg1veg/did_you_ever_stay_too_long/
- "...back to IC, but mostly because I was being forced into a director level position when my org tried to flatten and I ended up with 18 direct reports across three product teams. So majority of my time was spent in 1:1s with my reports, 1:1s syncs with my product management partners, and my own 1:1 wit"
  - r/EngineeringManagers comments | thread:  | score: 18 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1p9wguq/em_to_ic/nrfan7q/
- "...shipped before I can have a meaningful conversation. No you don't. You need to sacrifice something at 15 direct reports, and, since status updates shouldn't be a topic of 1:1 conversation, stopping aggregating every PR and jira ticket is reasonable. Could you provide better technical quality guidanc"
  - r/EngineeringManagers comments | thread:  | score: 7 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1qwphmp/how_do_you_efficiently_prep_for_11s_with_15/o3qqodv/
- "You have too many direct reports. Cultivate some tech leads who will take care of (2) recent work, (3) sprint progress, and (4) patterns. Spend your 1:1 time with these people on mentoring and career discussions, 1x/month. Your tech leads should have weekly 1:1 with the people they are working with "
  - r/EngineeringManagers comments | thread:  | score: 2 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1qwphmp/how_do_you_efficiently_prep_for_11s_with_15/o3rlbpr/
- "...becomes >10 it should be broken down into sub team with individual team leads, otherwise indeed - having too many reports don't work well. On the data collection: * 1:1 is the most important tool. weekly. take as much time as needed (some talk more some less), make sure it is a safe space where they"
  - r/EngineeringManagers comments | thread:  | score: 1 | comments: 0 | https://reddit.com/r/EngineeringManagers/comments/1s2d3jp/how_are_you_balancing_team_visibility_without/oc76lmq/

## Willingness-to-pay / "we use" signals (curated from keyword hits; the automatic hit list was dominated by false positives)

Honest read: there are almost no explicit "I would pay $X" statements in this dataset. Signals are mostly (a) EMs building their own tooling, (b) incumbents named as the thing to use, (c) indie builders pricing similar products.

- "...with assignees and deadlines pulled from the conversation. **Pricing:** Free trial for 30 days with everything unlocked. After that it's $12 to $18 per user per month depending on the plan. It only counts people who actually have tasks assigned, not your whole Slack workspace. If"
  - r/EngineeringManagers posts | thread: I got tired of being a human reminder system so I built a Slack bot that does it | score: 0 | https://reddit.com/r/EngineeringManagers/comments/1rbkmps/i_got_tired_of_being_a_human_reminder_system_so_i/
- "...Jira or PRs. This is a tooling problem. Use the right tool like Jellyfish. Why bring in AI? Writing end of week status reports for leadership. What helps more are better metrics and dashboards. The last thing leadership wants is an AI generated summary. Onboarding new hires by po"
  - r/EngineeringManagers comments | thread:  | score: 6 | https://reddit.com/r/EngineeringManagers/comments/1qp88ka/if_you_could_use_an_ai_chief_of_staff_to_banish_1/o27033b/
- "...suit what you want out of it, or just don't want to trust it. I use it for all of those things you mentioned, it just took some effort to tailor it: - Preparing for meetings: I create skills for the types of meetings that I usually have and the info that I typically look to inclu"
  - r/EngineeringManagers comments | thread:  | score: 1 | https://reddit.com/r/EngineeringManagers/comments/1v5dn51/are_you_personally_seeing_value_from_ai_outside/ozqv50x/
- "This is a strong signal of board-reality drift. Once agent activity is high, manual status updates cannot keep up with commit/PR/test state. Best pattern I've seen: derive task state from repo signals first, then sync board status from that source rather than trusting manual upda"
  - r/EngineeringManagers comments | thread:  | score: 2 | https://reddit.com/r/EngineeringManagers/comments/1ruq3ov/how_are_you_tracking_aiassisted_work_on_your/ocu8tg0/
- "...of the company. For this reason, some months ago I decided to build my own tool in my spare time. Currently, I have a working MVP being tested at my company and I plan to start a closed beta with some friend companies by the end of January. We are tracking how the tool increases "
  - r/EngineeringManagers comments | thread:  | score: 1 | https://reddit.com/r/EngineeringManagers/comments/1hodzzl/what_do_you_use_for_performance_reviews_and_ic/m4cw4tx/
- "...Quietly. What i observed was telling: * A Notion doc called "Actual Tasks" * A pinned Slack thread labeled "REAL Status" * A CLI bot that updates Jira without ever opening it * A custom-built React dashboard that leadership never sees These aren't "hacks." They're productivity re"
  - r/EngineeringManagers posts | thread: Why do engineers secretly build simple excel or notion tools to replace enterpri | score: 51 | https://reddit.com/r/EngineeringManagers/comments/1jysxcc/why_do_engineers_secretly_build_simple_excel_or/
- "...probably never worked at a startup? I think this is looking at the cost from the wrong angle. In a small engineering team, the expensive part is not token usage. It’s engineers spending time every day trying to remember what they did, rewriting it into a status update, and then r"
  - r/EngineeringManagers comments | thread:  | score: 1 | https://reddit.com/r/EngineeringManagers/comments/1tr2ydu/i_stopped_asking_engineers_to_write_status/ooozpse/
- "...Product Hunt today. Current stats: #73. 6 points. 1 comment. Not exactly the explosive launch I dreamed about lol. But here's the thing — I built this because I was genuinely drowning in spreadsheets managing my team. 1:1s in one sheet, impact stories in Notion, GitHub metrics no"
  - r/EngineeringManagers posts | thread: We're live on Product Hunt. Sitting at #73. 6 upvotes. 1 comment. | score: 1 | https://reddit.com/r/EngineeringManagers/comments/1u15ebm/were_live_on_product_hunt_sitting_at_73_6_upvotes/

## Backlash signals (n=205)

- "...understand everything one level deeper than currently required. I am quite practical in general, but I hate it when there is something that works/doesn't work and I have no idea why exactly. This is why my personal rule of thumb is that I need some knowledge runway to reason about an issue or concep"
  - r/ExperiencedDevs posts | thread: What is something you started/stopped doing and it significantly improved your p | score: 510 | comments: 182 | https://reddit.com/r/ExperiencedDevs/comments/1s0uwkx/what_is_something_you_startedstopped_doing_and_it/
- "...the ship around!' - l. david marquet:** for when you need to feel inspired about empowerment and not micromanaging. **ideas that actually stick (and work):** * **1:1s are sacred, and they're *their* meeting, not yours.** ask good questions ("what's blocking you?" "what's one thing you'd change?" "ho"
  - r/managers posts | thread: that "omg what books/tools/anything do i need as a manager?!" panic? here's my g | score: 367 | comments: 51 | https://reddit.com/r/managers/comments/1kg1f67/that_omg_what_bookstoolsanything_do_i_need_as_a/
- "...scheduled. I really think if there are more than 5 or so people on a call at one time it’s a complete waste of time and most people are just there for show."
  - r/ExperiencedDevs posts | thread: Why does Agile boil down to constant deadlines? | score: 155 | comments: 156 | https://reddit.com/r/ExperiencedDevs/comments/1donpa4/why_does_agile_boil_down_to_constant_deadlines/
- "...workforce ready as ever to start my career, and after my 2nd failed job I hated myself. My first manager micromanaged me so much I felt like if I breathed a certain way she’d ask why I chose to breathe that way. My 2nd boss pretty much was non existent, gave me no direction, no training, and only sp"
  - r/managers posts | thread: Having a good manager changed my life | score: 220 | comments: 16 | https://reddit.com/r/managers/comments/1pnu4d7/having_a_good_manager_changed_my_life/
- "...company, and a new manager joined our team about three months ago, from an specific country known by its micromanaging practices. The first few weeks were fine, but then the micromanaging started. If I spend more than an hour debugging something, he asks for a status update and tells me to post the "
  - r/ExperiencedDevs posts | thread: How do you deal with an obsessive manager who treats you like an idiot? | score: 113 | comments: 58 | https://reddit.com/r/ExperiencedDevs/comments/1k4yrcm/how_do_you_deal_with_an_obsessive_manager_who/
- "...when I was very junior dev, a very old-school company I worked at measured our performance based on lines of code. The result was all of us changed our coding style and started adding empty lines and brackets in new lines and all kind of stuff that made the code worse. It's the same with tokens. * D"
  - r/ExperiencedDevs posts | thread: 3 years as a CTO - Another follow up | score: 88 | comments: 39 | https://reddit.com/r/ExperiencedDevs/comments/1tc0ktj/3_years_as_a_cto_another_follow_up/
- "I’ve realized that "How’s it going?" is a useless question for Engineering Managers. It usually just gets a "fine" while the team is actually drowning in manual drag or hidden technical debt. I used to think I needed more meetings to fix this, but clarity actually comes from emptying the head and ma"
  - r/EngineeringManagers posts | thread: Why I stopped asking my engineers "How’s it going?" | score: 34 | comments: 15 | https://reddit.com/r/EngineeringManagers/comments/1t6ec46/why_i_stopped_asking_my_engineers_hows_it_going/
- "...work. And again, nothing wrong with that but you can't know this without spending the time in those "useless meetings" learning about what's happening on the field, what users are doing and thinking, and etc... This is even doubly so for bigger orgs and B2B/B2B2C type things than B2C where it can ge"
  - r/EngineeringManagers comments | thread:  | score: 1 | comments: 73 | https://reddit.com/r/EngineeringManagers/comments/1ulgx1z/is_it_a_myth_that_tech_people_cant_think_from_a/ovaqr7y/
- "...other colleagues from other depts. I don’t prompt this as far as I’m aware, it isn’t disciplinary talks, micromanaging, I’m not asking questions to push them into telling me things etc.. it’s people venting to me and getting emotional about anything and everything. I just listen. I literally feel li"
  - r/managers posts | thread: Advice for BIG emotions… | score: 52 | comments: 16 | https://reddit.com/r/managers/comments/1u2wl1y/advice_for_big_emotions/
- "...issues there. Spending “a large part of your day articulating for juniors” sounds like an even greater waste of time than the standup itself. If they can’t articulate verbally, then ask them to write it down. If they can’t write it down, then it’s very likely they’re not doing much. Pull them aside "
  - r/EngineeringManagers comments | thread:  | score: 2 | comments: 55 | https://reddit.com/r/EngineeringManagers/comments/1uu97kr/is_it_normal_that_team_leads_give_little_to_no/ox4ha1h/


### Additional curated backlash (metrics and surveillance)

- "...would like to present DX team another metric. It is called "not wanting to work in a company that is insulting me with measures like metrics, spying on screens, squeezing every drop of sweat and exploiting its workers for already huge profit. My last job change was exactly due to"
  - HN comment | thread: Measuring developer productivity with the DX Core 4 | score: 0 | https://news.ycombinator.com/item?id=49067421
- "...titled "Measuring developer productivity with the DX Core 4". Diffs/engineer, even if not at the individual level, is still meant as a proxy for individual throughput. The question they are trying to answer is "how do we make Ganesh X% more productive?" My argument is that that i"
  - HN comment | thread: Dev productivity metrics suck. Ops reviews are key for AI-accelerated eng orgs | score: 0 | https://news.ycombinator.com/item?id=48894869
- "Maybe it is just a new advertising strategy? step 1) Increase token usage by encouraging managers to feel like they should use AI to request daily status updates step 2) Increase token usage even more by encouraging managers to include multiple other feedback sources, and to incr"
  - r/EngineeringManagers comments | thread:  | score: 2 | https://reddit.com/r/EngineeringManagers/comments/1tr2ydu/i_stopped_asking_engineers_to_write_status/oomakfe/
- "...the absolute worst part of management. It makes the devs feel watched and the manager feel like a nag. It is interesting you mentioned the Claude Code angle. AI is definitely making it easier to write code, but it seems like it's actually making the coordination problem harder. W"
  - r/EngineeringManagers comments | thread:  | score: 1 | https://reddit.com/r/EngineeringManagers/comments/1sn6rdb/i_stopped_asking_my_engineers_for_status_updates/ogoo2mk/
- "Companies have been reported to „tokenmax“, i.e. have leaderboards of AI token usage, with the idea that consuming more tokens means better productivity. The idea sounds so obviously completely absurd to me. Could someone make an actual case for it that isn’t pure irrationality? "
  - HN story | thread: Ask HN: Why Are Companies Tokenmaxxing? | score: 6 | https://news.ycombinator.com/item?id=47932475

## HN Show/Launch HN launches for EM-adjacent tools (n=24, top 14)

- **Show HN: Tegon: Open-source alternative to Jira, Linear** | points 163 | comments 128 | https://news.ycombinator.com/item?id=40912920
  - pitch: "Hi HN, we're Harshith, Manoj and Manik and we're building Tegon (https://github.com/tegonhq/tegon), open-source issue tracking software that uses AI to smartly automate manual workflows or provide more context to engineers for a given task. There's a"
    - reaction: none in dataset
- **Show HN: Optio – Orchestrate AI coding agents in K8s to go from ticket to PR** | points 88 | comments 60 | https://news.ycombinator.com/item?id=47520220
  - pitch: "I think like many of you, I've been jumping between many claude code/codex sessions at a time, managing multiple lines of work and worktrees in multiple repos. I wanted a way to easily manage multiple lines of work and reduce the amount of input I ne"
    - reaction: none in dataset
- **Show HN: Tegon: Open source alternative to Jira and Linear** | points 27 | comments 4 | https://news.ycombinator.com/item?id=40855069
  - pitch: "Hey HN! We're Harshith, Manoj, and Manik, and we're thrilled to re-introduce Tegon, an open-source issue tracker built with engineers in mind. Here is our demo video (https://www.loom.com/share/b664b01e9b064a02be5791c12b77a107?...) You can check the "
    - reaction: none in dataset
- **Show HN: Pull Request Reviewed by LLM** | points 9 | comments 5 | https://news.ycombinator.com/item?id=42215963
  - pitch: "This year I’ve reviewed more than 1000 code changes. Most of the time was spent catching obvious mistakes rather than debating complex design decisions. If we estimate ~10 minutes per review, that’s 160+ hours spent reviewing code in just one year. S"
    - reaction: none in dataset
- **Show HN: Open-source pull request review agent** | points 8 | comments 6 | https://news.ycombinator.com/item?id=41443605
  - pitch: "Hey HN! I'm Hussam, a Senior Algorithm Engineer at CodiumAI. We launched PR Agent a little over a year ago — it’s a free and open-source tool that helps with reviewing pull requests. The response has been great and more than 70 contributors have adde"
    - reaction: none in dataset
- **Show HN: Accordia – Structured 1-on-1s for engineering managers** | points 4 | comments 0 | https://news.ycombinator.com/item?id=49785956
  - pitch: "Hi everyone, I'm a solo developer in Lincolnshire, UK. I've recently built Accordia. It is a 1-on-1 tool for engineering managers. You build a reusable agenda per report, run the meeting against it, and anything that turns into an action gets tracked"
    - reaction: none in dataset
- **Show HN: DiffDeck, a PR review tool with file context and code navigation** | points 2 | comments 1 | https://news.ycombinator.com/item?id=47274437
  - pitch: "I built DiffDeck because I was struggling to review larger pull requests in GitHub, especially ones with a lot of AI-assisted code. GitHub's diff view works well for smaller changes, but once a PR gets big I usually want more of an editor-style workf"
    - reaction: none in dataset
- **Show HN: Choji – turn Slack threads into ready-to-merge PR with Choji** | points 3 | comments 0 | https://news.ycombinator.com/item?id=48909234
  - pitch: "Hi HN - we're Chris and Jacob, and over the past few months, we've been building a way for teams (non-technical and technical) to easily get the agents they need to handle things like creating engineering tickets, drafting pull requests, and code rev"
    - reaction: none in dataset
- **Show HN: Max – AI-powered performance review writer for busy professionals** | points 3 | comments 0 | https://news.ycombinator.com/item?id=41927340
  - pitch: "Hey HN! I'm excited to share Max, a SaaS tool that helps busy professionals write compelling performance reviews quickly with the assistance of AI. What is Max? Max is an AI-powered platform designed to solve the common problem of writing thorough pe"
    - reaction: none in dataset
- **Show HN: I built a local open-source tracker to bypass Jira UI friction** | points 3 | comments 0 | https://news.ycombinator.com/item?id=47501731
  - pitch: "I originally built SheepCat (https://github.com/Chadders13/SheepCat-TrackingMyWork) to solve a massive personal pain point. When you are holding a complex mental model of a C# backend or trying to optimize a heavy SQL query, the absolute worst thing "
    - reaction: none in dataset
- **Show HN: I am building "Jira" for AI coding agents** | points 3 | comments 0 | https://news.ycombinator.com/item?id=46935631
  - pitch: "Hello HN, I have been building a Task Manager for AI coding agents like Claude Code. It has a concept called “gates” where an agent cannot close a task unless at least one gate is tied to the task, a gate could be as “Ensure the project builds withou"
    - reaction: none in dataset
- **Show HN: Pulsar, a browser-only GitHub PR monitor for engineering manager** | points 2 | comments 0 | https://news.ycombinator.com/item?id=47351511
  - pitch: "I built Pulsar to solve a daily annoyance: GitHub's PR view doesn't give you a clean at-a-glance picture of what needs attention across multiple repos. Pulsar is a lightweight dashboard that runs entirely in your browser. You paste in a GitHub PAT an"
    - reaction: none in dataset
- **Show HN: Engineering Metrics Powered by AI** | points 2 | comments 0 | https://news.ycombinator.com/item?id=42323854
  - pitch: "Show HN: Wellcode CLI - Open-source engineering metrics powered by AI I built Wellcode CLI after getting frustrated with expensive engineering metrics tools that cost thousands per month but weren't actually helpful as a new engineering manager. The "
    - reaction: none in dataset
- **Show HN: A local MCP server that wraps Swarmia's Export API** | points 2 | comments 0 | https://news.ycombinator.com/item?id=45231501
  - pitch: ""
    - reaction: none in dataset

### Reaction summary for EM-tool launches
- Dedicated EM tools posted as Show HN drew almost no engagement: Accordia (1:1s) 4 points / 0 comments, Pulsar (PR monitor for EMs) 2 / 0, Wellcode (AI engineering metrics, pitched against "expensive engineering metrics tools that cost thousands per month") 2 / 0, Max (AI perf review writer) 3 / 0, Tickr (AI PM in Slack replacing Jira) 1 / 0, Ordia (standup from GitHub and Jira) 1 / 0, brag-document tools 1-4 / 0-1.
- Strong HN engagement exists only adjacent to EM work: Tegon open-source Jira/Linear alternative (163 / 128), "How to manage oncall as an engineering manager?" (68 / 56), "Measuring developer productivity with the DX Core 4" (47 / 38), Atlassian acquiring DX for $1B (13 / 3).
- Dataset contains no reply threads for the EM-tool Show HNs, so reaction detail is limited to the DX Core 4 thread above (metrics skepticism: a commenter proposes "not wanting to work in a company that is insulting me with measures like metrics, spying on screens").

## Implications for candidate ideas

1. Status/visibility automation (generate status for leadership from Git/Jira/Slack, no human input) is the strongest, most consistent pain: top-ranked theme, and r/EngineeringManagers threads literally titled "the status updates became the actual work" and "I stopped asking engineers to write status updates". But the r/EM replies show it is already being DIY-solved with Claude Code/Codex scripts and MCPs, and HN tools in this niche (Ordia, Tickr) got ~1 point. Differentiate on trust and leadership-ready output, not on summarization.
2. IC-facing visibility and brag/perf-packet tooling: the "invisible work" language is very high-engagement in r/managers (576 score), but HN brag-doc tools drew 1-4 points. Likely an EM-bought, IC-fed workflow rather than a standalone consumer product.
3. Metrics dashboards (Jellyfish/LinearB/DX class) face strong backlash: gaming, "tokens as KPI", surveillance. Anything position as individual measurement will be rejected; frame as team-level "explain the work to leadership", a context tool rather than a scorecard.
4. AI ROI / token-spend is discussed by many HN commenters but with near-zero engagement counts and no buyer language; the "tokenmaxxing" backlash suggests EMs are being forced to report AI usage and dislike it. Treat as a secondary wedge: help EMs defend or explain AI impact rather than police it.
5. AI PR review burden and "managing agents" show real EM/IC anxiety ("a manager ... of agents"), but the data has few EM-specific quotes and most HN launches here are agent infrastructure, not EM tools. Needs more targeted research before building.
6. 1:1 prep with 15+ reports (span-of-control thread) is a concrete, repeated EM pain; the advice given is process, not tooling, so a prep-from-PRs-and-tickets copilot is plausible, though Accordia-type 1:1 tools show weak HN pull.
7. Willingness to pay is unproven here: only indie pricing ($12-18/user/month Tickr) and "use Jellyfish" as an incumbent reference. Validate with direct interviews before committing.
