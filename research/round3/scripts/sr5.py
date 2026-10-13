import csv,re,sys
sys.stdout.reconfigure(encoding='utf-8')
rows=list(csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')))
kw=r'(coding agent|claude code|cursor|copilot|codex|code review|pull request|\bPRs?\b|software engineer|developer|engineering team|CI/CD|\bSOC ?2|compliance|audit|FinOps|token (spend|cost|usage)|AI spend|cost of AI|governance|observab|agent (security|identity)|context (layer|engineering)|knowledge capture|onboarding)'
for r in rows:
    t=r['Tagline']+' '+r['Description']
    m=set(x.group(0).lower() for x in re.finditer(kw,t,re.I))
    if m and r['Season'] in('SR004','SR005','SR006','SR007'):
        print(r['Season'],r['Name'],'|',r['Tagline'][:110],'|',','.join(sorted(m))[:70])
