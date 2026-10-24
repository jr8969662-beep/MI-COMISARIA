# Regenera jurisdicciones.json a partir de los KMZ oficiales.
# Uso (desde la raíz del repo):  python3 herramientas/generar-jurisdicciones.py
import zipfile,glob,re,json,sys,os
RAIZ=os.path.abspath(os.path.join(os.path.dirname(__file__),'..'))
SALIDA=os.path.join(RAIZ,'jurisdicciones.json')
os.chdir(os.path.join(RAIZ,'datos-originales','mapas-kmz'))
def coords(t):
    pts=[]
    for tok in t.split():
        p=tok.split(",")
        if len(p)>=2: pts.append([round(float(p[0]),6),round(float(p[1]),6)])
    # drop consecutive dups
    out=[]
    for p in pts:
        if not out or out[-1]!=p: out.append(p)
    return out
res=[]
for f in sorted(glob.glob("*.kmz")):
    if f.startswith("DDP-"): continue
    z=zipfile.ZipFile(f); k=z.read([n for n in z.namelist() if n.endswith(".kml")][0]).decode("utf8","ignore")
    name=re.search(r"<Placemark>.*?<name>(.*?)</name>",k,re.S)
    name=(name.group(1) if name else re.search(r"<name>(.*?)</name>",k).group(1)).strip()
    polys=[]
    for P in re.findall(r"<Polygon>(.*?)</Polygon>",k,re.S):
        outer=coords(re.search(r"<outerBoundaryIs>.*?<coordinates>(.*?)</coordinates>",P,re.S).group(1))
        holes=[coords(h) for h in re.findall(r"<innerBoundaryIs>.*?<coordinates>(.*?)</coordinates>",P,re.S)]
        polys.append({"ext":outer,"huecos":holes})
    if not polys: print("SIN POLIGONO:",f); continue
    m=re.match(r"DUR(\d+)",name.replace(" ",""))
    res.append({"nombre":re.sub(r"\s+"," ",name),"dur":int(m.group(1)) if m else None,"poligonos":polys})
json.dump({"fuente":"KMZ oficiales DEPENDENCIAS POLICIA PROVINCIA DE SALTA","jurisdicciones":res},open(SALIDA,"w"),ensure_ascii=False,separators=(",",":"))
print(len(res),"jurisdicciones", os.path.getsize(SALIDA)//1024,"KB")
