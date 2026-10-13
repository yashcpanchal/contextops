import json,re,collections
import sys
sys.path.insert(0,'.')
order=['Spring 2025','Summer 2025','Fall 2025','Winter 2026','Spring 2026','Summer 2026','Fall 2026']
A=json.load(open('scripts/yc_b2b_all.json'))
# need desc: reload
D={}
for b in order:
    for l in open('data/'+b.replace(' ','_')+'.jsonl',encoding='utf8'):
        r=json.loads(l); D[r['name']]=r
jobs=[
('Accountant/bookkeeper/auditor/tax',r'accountant|accounting|bookkeep|audit|tax|reconcil|month-end|general ledger|CPA|CFO|FP&A'),
('AP/AR/billing/procurement clerk',r'accounts (payable|receivable)|invoice|procure|billing|collections|order-to-cash|purchase order|expense'),
('Compliance/regulatory/KYC officer',r'complian|regulat|KYC|AML|BSA|licens|fraud|financial crime|SOC ?2'),
('Lawyer/paralegal/contracts',r'lawyer|legal|law firm|paralegal|contract|litigation|attorney|patent'),
('Recruiter/HR/payroll',r'recruit|HR\b|payroll|talent|hiring|benefits|candidate|staffing|people team'),
('Customer support / CS',r'customer support|support agent|customer service|customer success|call center|voice agent|renewal'),
('Sales/SDR/GTM',r'sales|SDR|outbound|lead gen|GTM|revenue|CRM|marketing'),
('Data/BI analyst',r'data analyst|analytics|BI\b|business intelligence|text-to-sql|dashboard|data warehouse|data team|spreadsheet|Excel'),
('Back-office/ops generic AI employee/BPO',r'back.?office|AI employee|BPO|operations|workflow|ops\b|coworker|workforce|automate'),
('IT / internal tools / ERP',r'\bIT\b|ERP|internal tool|helpdesk|ServiceNow|DevOps|no-code'),
('Exec assistant/meetings/email',r'meeting|notetak|email|inbox|assistant|calendar|scheduling'),
('Research/consulting/PE diligence analyst',r'due diligence|private equity|consult|research|investment|analyst|McKinsey'),
('Knowledge/enterprise search/memory',r'knowledge|search|memory|context|wiki'),
('Healthcare/insurance admin',r'insurance|claims|prior auth|health|clinic|patient'),
('Supply chain/logistics/procurement ops',r'supply chain|logistics|freight|inventory|manufactur|dispatch'),
]
tab=collections.defaultdict(collections.Counter); ex=collections.defaultdict(list)
for r in A:
    d=D[r[0]]; t=d['one_liner']+' '+d['desc']
    hit=None
    for j,p in jobs:
        if re.search(p,d['one_liner'],re.I): hit=j;break
    if not hit:
        for j,p in jobs:
            if re.search(p,t,re.I): hit=j;break
    hit=hit or 'Other/unclassified'
    tab[hit][r[1]]+=1; ex[hit].append(r[0])
print('job | total |',order)
for j,c in sorted(tab.items(),key=lambda x:-sum(x[1].values())):
    print(j,sum(c.values()),[c[b] for b in order],ex[j][:5])
print(collections.Counter(r[1] for r in A))
