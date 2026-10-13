import csv,collections,re
rows=list(csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')))
print(len(rows))
coh=collections.Counter(r['Season'] for r in rows);print(sorted(coh.items()))
cat=collections.defaultdict(collections.Counter)
for r in rows:
    for c in [x.strip() for x in r['Categories'].split(',') if x.strip()]:
        cat[c][r['Season']]+=1
seasons=sorted(coh)
print('cat total',*seasons)
for c,v in sorted(cat.items(),key=lambda x:-sum(x[1].values())):
    print(f"{c}|{sum(v.values())}|"+' '.join(str(v[s]) for s in seasons))
