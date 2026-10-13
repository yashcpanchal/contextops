import json,re,collections
B=["Spring 2025","Summer 2025","Fall 2025","Winter 2026","Spring 2026","Summer 2026","Fall 2026"]
cos={}
for b in B:
    for l in open("../data/"+b.replace(" ","_")+".jsonl",encoding="utf8"):
        c=json.loads(l); cos[c["name"]]=c
M={
"AI code review":"cubic,Stage",
"Coding agents / AI SWE / software factory":"Mesmer,Compyle,Radius,Rovr,Amika,Reason Machines,Replicas,LightSprint,Linzumi,Superset,Jcode,Hoplite,Rindler,Approxima,Emdash,/dev/fast,Agent Relay,ByteAsk,Omnara,Specific,Zenbu,Datafruit,Sparkles,Proliferate,Theorem,Embedder,BootLoop,Deep Interactions,Floot,Stilta-no",
"App builders (vibe coding)":"Vybe,Bloom,Bitrig,Fastshot,CodeWisp,Polymorph,21st",
"Testing / QA (apps and agents)":"QualGent,Propolis,Docket,Lark,Autosana,TesterArmy,Composal,Bluejay,Hue,Simulithic,Workers IO,Rystic,Canary,Simantic,Daqstra",
"AI SRE / incidents / production eng":"Deeptrace,IncidentFox,Mendral,Corelayer,Kestrel AI,HyperProbe,OnePatch,Superlog,Sazabi,Interfere,Chamber,Modelence",
"Agent infra: sandboxes, runtimes, browsers, tools":"Cua,Dedalus Labs,Playgent,Manufact,Notte,KERNEL,Klaus AI,Archal,Ardent,Limrun,smol machines,machine0,Agent 37,Boat,Maritime,Terse,herdr,OpenProse,Tilion,Parse,Pomerado,Zatanna,Executor,Amorphic Labs,Capacitive,Arga Labs,Zibra Labs,InsForge (InstaCloud),Sim,Metis,Okibi",
"Agent identity, comms, payments":"AgentMail,primitive,AgentPhone,Inkbox,Locus,Orthogonal,Maven,Agentcard",
"Agent observability / evals / reliability":"TraceRoot.AI,Fulcrum,Lemma,Sentrial,The Context Company,Stacktrace,Anchorhead,Tokenless,Litmus,LLM Stats,ORO AI,Latent,Ressl AI,CoArena,Monte,Moda,Method",
"AI pentest / appsec / code security":"BitPatrol,Casco,MindFort,GhostEye,Veria Labs,Antigen,Trident,OpenHack,Fabraix,Palisade,Parameter,Tolmo,RASPIRE,Caution,Cotool,NebuSec",
"AI agent security / governance / IAM":"Golf,ContextFort,Alter,Multifactor,Agentic Fabriq,Clawvisor,Traceforce,Silmaril,Wato,truthsystems,Salus,Decawork,Oximy,Pangolin",
"Code migration / legacy / implementation FDE":"Auctor,Unisson,Lab0,Trope,Khotan (formerly Pollinate)",
"Docs / knowledge / context layer":"Nimbic AI,Sourcebot,Airweave,Hyperspell,Nessie,Mirrors,Graphify Labs,Almanac,Memory Store,Ontora,Sona8,Riften,Glen,Context.dev",
"Dev environments / CI / git forge":"Attune,StarSling,Coasts,Prized,Boxes.dev,GitCafe",
"Eng analytics / EM tooling":"Mentlio,Interfere-x",
"AI spend / token cost / gateway":"Quotient Labs,Mentlio,Codag,Experiential Labs,Orchestra,Compresr,The Token Company,Tracer",
"PM / spec / planning for coding agents":"Scott AI,OpenSpec",
"Agent-discoverability / devrel for agents":"Scope,Armature,Manicule",
}
bt=collections.defaultdict(lambda:collections.Counter()); rows={}
for t,s in M.items():
    for n in s.split(","):
        if n not in cos: 
            if not n.endswith("-no") and not n.endswith("-x"): print("MISSING",n)
            continue
        bt[t][cos[n]["batch"]]+=1
print("theme|"+"|".join(b.split()[0][:2]+b[-2:] for b in B)+"|tot")
for t in M:
    r=[bt[t][b] for b in B]; print(t,"|",r,sum(r))
alln=[sum(1 for c in cos.values() if c["batch"]==b) for b in B]
print(alln)
tot=[sum(bt[t][b] for t in M) for b in B]; print(tot,[round(100*x/y,1) for x,y in zip(tot,alln)])
# hiring/top check for named
for n in ["cubic","Mesmer","Cua","Casco","Sazabi","IncidentFox","Lemma","Dedalus Labs","KERNEL","Better Auth","AgentMail","Golf","Manufact","TesterArmy","Mentlio","Quotient Labs","Deeptrace","Stage","Sourcebot","Airweave","TraceRoot.AI","Sentrial","MindFort"]:
    c=cos[n]; print(n,c["batch"],c["team_size"],c["isHiring"],c["top_company"],c["status"],c["website"],c["yc_url"])
