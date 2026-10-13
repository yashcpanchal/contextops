import csv,re,json
rows=list(csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')))
pat=re.compile(r'(\$\s?[\d.,]+\s?[KMBkmb]?\b|ARR|MRR|revenue|run rate|run-rate|\d+x\b|\d+%|customers|paying|users|growth|grew|profitab|YC|backed)',re.I)
print("== TRACTION (all cohorts) ==")
for r in rows:
    t=r['Tagline']+' || '+r['Description']
    if re.search(r'(\$\s?[\d.,]+\s?[KMBkmb]\b|ARR|MRR|run.?rate|revenue|\d+x\b|\d[\d,]*\+? (paying|customers|users|teams|enterprise)|paying|profitab)',t,re.I):
        print(r['Season'],r['Name'],'|',r['Tagline'][:150],'|',' '.join(m.group(0) for m in re.finditer(r'[^.]*(\$\s?[\d.,]+\s?[KMBkmb]\b|ARR|MRR|run.?rate|revenue|\d+x\b|paying|profitab)[^.]*\.?',r['Description'],re.I))[:300])
