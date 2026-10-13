import csv
rows=list(csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')))
for cat in ['Dev Tools & DevOps','Future of Work','Enterprise SaaS','AI Infra']:
    print('\n==',cat)
    for r in rows:
        if cat in [x.strip() for x in r['Categories'].split(',')]:
            print(r['Season'],r['Name'],'|',r['Tagline'][:130],'|',r['Team Size'])
