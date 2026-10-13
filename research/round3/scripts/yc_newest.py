import json,re,glob,collections
B=['Spring_2025','Summer_2025','Fall_2025','Winter_2026','Spring_2026','Summer_2026','Fall_2026']
D={b:[json.loads(l) for l in open(f'data/{b}.jsonl',encoding='utf8')] for b in B}
print({b:len(v) for b,v in D.items()})
T={
'coding/SWE agents':r'coding agent|code review|software engineer|developer|codebase|pull request|devops|\bcode\b|vibe cod',
'agent infra/security/governance':r'agent (security|governance|observab|identity|infra|sandbox|runtime|orchestrat)|guardrail|ai governance|mcp\b|agent.{0,20}(permission|audit)|sandbox',
'AI cost/FinOps':r'token cost|llm cost|inference cost|finops|cloud cost|ai spend|cost optimi|gpu',
'multiplayer/team agents':r'multiplayer|collaborat.{0,30}agent|shared agent|team.{0,15}agent',
'small software/vibe-hosting':r'vibe|internal tools?|no-code|prototype|deploy.{0,20}app|personal software',
'API/dependency maint':r'breaking change|dependency|dependabot|api (change|update|migration)|sdk',
'compliance':r'complian|soc 2|audit|regulat',
'proof of human/deepfake':r'deepfake|proof of (human|personhood)|verify.{0,15}human|identity verification|fraud',
'physical ops/robotics':r'robot|construction|field service|fleet|maintenance|warehouse|manufactur',
'defense/drone':r'defense|drone|military|army|interceptor',
'crypto/stablecoin':r'stablecoin|crypto|blockchain|tokeniz',
'aging/caregiving':r'senior|elder|aging|caregiv|dementia',
'education tutor':r'tutor|k-12|students|learning app|education',
'consumer AI':r'consumer|companion|dating|social app',
'compute/datacenter/energy':r'data ?cent|compute|energy|power grid|cooling',
'physical-world data':r'sensor|satellite|weather|geospatial|drone data',
'manager/engineering mgmt':r'engineering manager|engineering leader|engineering productiv|\bcto\b|standup|sprint|performance review',
}
tot={b:len(D[b]) for b in B}
res={}
for k,p in T.items():
    r=re.compile(p,re.I);row=[]
    for b in B:
        c=[x for x in D[b] if r.search((x['one_liner'] or '')+' '+(x['desc'] or '')+' '+' '.join(x['tags'] or []))]
        row.append(len(c));res[(k,b)]=c
    print(f"{k:34}"+' '.join(f"{n:4}({100*n/tot[b]:.0f}%)" for n,b in zip(row,B)))
import pickle
for k in ['coding/SWE agents','agent infra/security/governance','AI cost/FinOps','multiplayer/team agents','API/dependency maint','small software/vibe-hosting','manager/engineering mgmt','proof of human/deepfake']:
    print('##',k)
    for b in ['Summer_2026','Fall_2026']:
        for x in res[(k,b)][:9]:
            print(' ',b[:2],x['name'],'|',(x['one_liner'] or '')[:100],'|',x['team_size'],x['isHiring'],x['top_company'])
