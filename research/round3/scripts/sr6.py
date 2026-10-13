import csv,sys
sys.stdout.reconfigure(encoding='utf-8')
names=['Alike','Elu','AgentCat','Sparta','Tenera','ZeroDrift','ChatOverflow','Contxt','Sentra','Pen.dev','Brief','Modaic','Zoah','Hoid','Bead AI']
for r in csv.DictReader(open('data/speedrun_all.csv',encoding='utf-8')):
    if r['Name'] in names: print('##',r['Name'],r['Season'],r['Website'],'\n',r['Description'].replace('\n',' ')[:520])
