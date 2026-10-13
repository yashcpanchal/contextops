import json,re,glob,collections,sys
B=["Spring 2025","Summer 2025","Fall 2025","Winter 2026","Spring 2026","Summer 2026","Fall 2026"]
D="../data/"
cos=[]
for b in B:
    for l in open(D+b.replace(" ","_")+".jsonl",encoding="utf8"):
        cos.append(json.loads(l))
sub={"B2B -> Engineering, Product and Design","B2B -> Infrastructure","B2B -> Security"}
kw=re.compile(r"\b(engineer|developer|devs?|code|coding|codebase|pull request|PRs?|devops|sre|QA|incident|software|agents? (for|that)|sandbox|CI/CD|API|SDK|LLM|MCP)\b",re.I)
sel=[c for c in cos if c["subindustry"] in sub or kw.search(c["one_liner"]+" "+c["desc"][:300])]
core=[c for c in sel if c["subindustry"] in sub]
print(len(cos),len(sel),len(core))
T=[
("AI code review / PR",r"code review|pull request|\bPRs?\b|review(s|ing)? (code|PR)"),
("Coding agents / AI SWE",r"coding agent|software engineer|ai engineer|autonomous.*(code|software)|write code|vibe cod|code gen|ships? (code|features)|app builder|build(s)? (apps|software)"),
("Testing / QA",r"\bQA\b|testing|test (suite|automation)|end-to-end test|bug"),
("AI SRE / incidents / devops",r"\bSRE\b|incident|on-?call|devops|root cause|observab|production (issue|bug)|infra(structure)? (automation|as code)|kubernetes|terraform|cloud cost"),
("Agent infra / sandboxes / runtime",r"sandbox|agent (infra|runtime|platform)|infrastructure for (ai )?agents|browser (infra|for agents)|agent(s)? (memory|identity|payments|auth)|\bMCP\b|computer use|headless browser|microvm"),
("Agent observability / evals",r"\bevals?\b|evaluat|agent (monitor|observab|reliab|debug)|llm (observab|monitor)|guardrail|tracing|simulat.*agent|test(ing)? (ai )?agents"),
("Security (AI code / appsec / AI agents)",r"appsec|vulnerabilit|pentest|penetration|red.?team|secure.*(code|agent)|AI security|agent security|prompt injection|supply chain|secrets|SAST|SOC ?2|compliance automation"),
("Code migration / modernization",r"migrat|moderniz|legacy|cobol|mainframe|refactor|upgrade"),
("Docs / knowledge / context",r"documentation|\bdocs\b|knowledge (base|graph)|context (engine|layer)|codebase (understanding|context)|onboarding"),
("Dev environments / CI / build",r"dev(elopment)? environment|\bCI\b|build (system|time)|preview environment|devbox|cloud ide|workspace"),
("Eng analytics / management",r"engineering (manager|leader|team|productivity|metrics)|developer productivity|dora|velocity|eng(ineering)? analytics"),
("AI spend / cost / gateway",r"token (cost|spend|usage)|ai spend|llm (cost|gateway)|inference cost|gateway|finops|cost optimi|model routing|usage-based billing"),
("PM / spec / design-to-code",r"product manager|\bPRD\b|spec(s|ification)|roadmap|figma|design-to-code|product requirements|user stories"),
("Data / DB / infra primitives",r"database|postgres|vector|data pipeline|etl|warehouse|storage|search api|web scraping|serverless|\bGPU\b|inference (api|platform)|fine-?tun"),
]
res=collections.defaultdict(lambda: collections.defaultdict(list))
unc=[]
for c in sel:
    t=(c["one_liner"]+" "+c["desc"]); got=False
    for n,p in T:
        if re.search(p,t,re.I): res[n][c["batch"]].append(c["name"]); got=True
    if not got: unc.append(c)
print("theme|"+"|".join(b.split()[0][:2]+b[-2:] for b in B)+"|tot")
for n,_ in T:
    r=[len(res[n][b]) for b in B]; print(n,"|"," | ".join(map(str,r)),"|",sum(r))
print("batch totals sel", [sum(1 for c in sel if c["batch"]==b) for b in B], "all",[sum(1 for c in cos if c["batch"]==b) for b in B])
print("uncategorised",len(unc))
json.dump({n:{b:v for b,v in d.items()} for n,d in res.items()},open("themes.json","w"))
# score for dump
# list of core with one-liners
with open("sel_list.txt","w",encoding="utf8") as f:
    for c in sel: f.write(f'{c["batch"][:2]}{c["batch"][-2:]}|{c["name"]}|{c["subindustry"][6:20]}|ts{c["team_size"]}|{"H" if c["isHiring"] else ""}{"T" if c["top_company"] else ""}|{c["one_liner"]}\n')
