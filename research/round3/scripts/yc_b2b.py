import json,glob,re,collections
order=['Spring 2025','Summer 2025','Fall 2025','Winter 2026','Spring 2026','Summer 2026','Fall 2026']
rows=[]
for b in order:
    rows+=[json.loads(l) for l in open('data/'+b.replace(' ','_')+'.jsonl',encoding='utf8')]
subs={'B2B -> Productivity','B2B -> Operations','B2B -> Finance and Accounting','B2B -> Analytics','B2B -> Legal','B2B -> Human Resources','B2B'}
S=[r for r in rows if r['subindustry'] in subs]
print(len(S),collections.Counter(r['subindustry'] for r in S))
print(collections.Counter(r['batch'] for r in rows))
themes={
'accounting/bookkeeping/tax':r'accounting|bookkeep|tax\b|audit|close\b|general ledger',
'finance ops AP/AR/procurement':r'procure|accounts payable|accounts receivable|invoice|AP\b|spend|expense|billing|FinOps|payment',
'compliance/GRC/regulatory':r'complian|SOC ?2|GRC|regulat|governance|risk',
'legal':r'legal|lawyer|contract|law firm|litigation',
'HR/recruiting':r'recruit|hiring|HR\b|talent|payroll|employee|candidate',
'IT/helpdesk/internal tools':r'IT (ops|support|team|help)|helpdesk|internal tool|back.?office|workflow automation',
'meetings/notes/comm':r'meeting|notetaker|note.taking|transcri|calendar|email|inbox',
'agent mgmt/governance/observability':r'agent (observ|monitor|govern|manag|orchestr|fleet)|AI agents? (observ|governance|security|spend|cost)|manage.*agents|agent.*workforce|digital worker|AI employee',
'AI spend/cost':r'AI (spend|cost)|token (spend|cost)|LLM cost|cost of AI|inference cost',
'analytics/BI/data analyst':r'analyst|analytics|BI\b|dashboard|text-to-sql|data warehouse',
'customer support/ops':r'customer support|support ticket|helpdesk|customer service',
'sales/GTM':r'sales|outbound|GTM|SDR|CRM|lead',
'procurement software/SaaS mgmt':r'saas manag|software (spend|procure|licen)|vendor manag|SaaS',
'knowledge/enterprise search':r'knowledge|enterprise search|wiki|docs\b|documentation',
'project/product mgmt':r'project manag|product manag|PM\b|roadmap|jira|ticket|standup|sprint',
'insurance/healthcare admin':r'insurance|claims|prior auth|healthcare',
'supply chain/ops':r'supply chain|logistics|freight|inventory|manufactur',
'real estate/construction':r'real estate|construction|property',
}
res=collections.defaultdict(lambda:collections.Counter()); ex=collections.defaultdict(list)
for r in S:
    t=(r['one_liner']+' '+r['desc'])
    for k,p in themes.items():
        if re.search(p,t,re.I if k not in('x',) else 0):
            res[k][r['batch']]+=1; ex[k].append(r)
for k in themes:
    print(k,sum(res[k].values()),[res[k][b] for b in order])
json.dump({k:[(r['name'],r['batch'],r['one_liner'],r['team_size'],r['isHiring'],r['top_company'],r['website'],r['yc_url']) for r in v] for k,v in ex.items()},open('scripts/yc_b2b_ex.json','w'))
json.dump([(r['name'],r['batch'],r['subindustry'],r['one_liner'],r['team_size'],r['isHiring'],r['top_company'],r['website'],r['yc_url']) for r in S],open('scripts/yc_b2b_all.json','w'))
