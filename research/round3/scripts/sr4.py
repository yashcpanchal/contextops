import csv,re,sys
sys.stdout.reconfigure(encoding='utf-8')
rows=list(csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')))
k=re.compile(r'(\$\s?[\d.,]+\s?[KMBkmb]\b[^.]{0,40}(ARR|MRR|run|revenue|cARR|pipeline|contract|sales|bookings)|ARR|MRR|cARR|run.?rate|\d+x\b|MoM|WoW|\d+%\s*(MoM|growth|WoW)|paying customers|\d+ (enterprise )?customers)',re.I)
out=[]
for r in rows:
    if r['Season'] not in('SR005','SR006','SR007'):continue
    t=(r['Tagline']+'\n'+r['Description']).replace('\n',' ')
    ss=[s.strip() for s in re.split(r'(?<=[.!?])\s+',t) if k.search(s) and re.search(r'\$|\d',s)]
    if ss: print(r['Season'],r['Name'],'[',r['Categories'][:60],'] ::',' / '.join(ss)[:420]);
