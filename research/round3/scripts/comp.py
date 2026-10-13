import json,glob,csv,re
kw=r"token (spend|cost|usage)|ai (coding )?(spend|cost)|finops|\broi\b|developer productivity|engineering (metrics|intelligence|manager|team|leader)|\bdora\b|governance|provenance|audit|capitaliz|r&d (tax )?credit|standup|claude code|cursor|copilot|coding agent|observab|code review|ai-generated code|ai code|llm cost|cost track|spend"
rows=[]
for f in sorted(glob.glob("data/*.jsonl")):
    if 'speedrun' in f: continue
    for l in open(f,encoding='utf8'):
        try:d=json.loads(l)
        except: continue
        t=(d.get('one_liner','')+' '+d.get('desc','')+' '+str(d.get('tags',''))).lower()
        if re.search(kw,t): rows.append(d)
print(len(rows))
for d in rows:
    print(d['batch'],'|',d['name'],'|',d.get('team_size'),d.get('isHiring'),'|',d['one_liner'][:110])
