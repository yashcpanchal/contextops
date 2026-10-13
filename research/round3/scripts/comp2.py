import sys; sys.stdout.reconfigure(encoding="utf-8",errors="replace")
import json,glob,csv,re
names="Mentlio|Carrot Labs|Allowance|Quotient Labs|Conifer|Codag|Mesmer|Memoir|Scott AI|Stage|cubic|Rindler|Linzumi|Agent Relay|Glen|Truthsystems|Agentic Fabriq|Orchestra|Superset".lower().split('|')
kw=r"engineering (intelligence|productivity|metrics|manager|leader|org)|engineering team|developer productivity|\bdora\b|token (spend|cost|optim)|ai spend|cost attribution|pull request|\bpr\b|code provenance|ai-generated|ai-written|soc ?2|r&d|capitaliz|status update|standup|1:1"
for f in sorted(glob.glob("data/*.jsonl")):
    if 'speedrun' in f: continue
    for l in open(f,encoding='utf8'):
        try:d=json.loads(l)
        except: continue
        t=(d.get('one_liner','')+' '+d.get('desc','')).lower()
        if d['name'].lower() in names or re.search(kw,t):
            print(d['batch'],'|',d['name'],'|',d.get('team_size'),d.get('isHiring'),d.get('top_company'),d.get('website'),'\n   ',d['one_liner'][:100],'||',d['desc'][:330].replace('\n',' '))
print("=====SR")
for r in csv.DictReader(open("data/speedrun_all.csv",encoding='utf8')):
    t=(r['Tagline']+' '+r['Description']).lower()
    if re.search(kw+r"|claude code|cursor|copilot|coding agent|finops|ai code|code review",t):
        print(r['Season'],'|',r['Name'],'|',r['Team Size'],'|',r['Website'],'\n   ',r['Tagline'][:100],'||',r['Description'][:250].replace('\n',' '))
