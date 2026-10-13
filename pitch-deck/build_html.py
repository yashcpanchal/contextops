"""Assemble the slide files into one self-contained, presentable HTML deck.

Usage: python build_html.py  ->  writes ContextOps-pitch.html next to this script.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
deck = json.loads((ROOT / "project" / "deck.json").read_text(encoding="utf-8"))

slides = []
for slide_id in deck["order"]:
    html = (ROOT / "project" / "slides" / f"{slide_id}.html").read_text(encoding="utf-8")
    html = re.sub(r"<aside>.*?</aside>", "", html, flags=re.S)  # speaker notes stay out of the page
    slides.append(html)

fonts = "\n".join(
    f'<link rel="stylesheet" href="{face["href"]}">' for face in deck["faces"].values() if "href" in face
)

page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{deck["title"]}</title>
{fonts}
<style>
  html, body {{ margin: 0; height: 100%; background: #0B1422; overflow: hidden; }}
  .stage {{ position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; }}
  section {{ position: absolute !important; left: 50%; top: 50%; width: 1920px; height: 1080px;
             box-sizing: border-box; transform-origin: center center; }}
  section:not(.active) {{ display: none !important; }}
  section * {{ margin: 0; box-sizing: border-box; }}
  section ul {{ padding-left: 1.2em; }}
  section table {{ border-collapse: collapse; width: 100%; }}
  section th, section td {{ border-bottom: 1px solid #DCDDD5; padding: 12px 14px; vertical-align: top; }}
  .hint {{ position: fixed; bottom: 10px; right: 16px; color: #8A97A8; font: 13px system-ui, sans-serif; }}
  @media print {{
    @page {{ size: 1920px 1080px; margin: 0; }}
    html, body {{ overflow: visible; height: auto; background: none; }}
    .stage {{ position: static; display: block; }}
    section, section:not(.active) {{ display: flex !important; position: relative !important; left: 0; top: 0; transform: none !important; page-break-after: always; }}
    .hint {{ display: none; }}
  }}
</style>
</head>
<body>
<div class="stage">
{"".join(slides)}
</div>
<div class="hint">← → to navigate · Ctrl/Cmd+P to save as PDF</div>
<script>
  const slides = [...document.querySelectorAll('section')];
  let i = 0;
  function fit() {{
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    slides.forEach(el => el.style.transform = 'translate(-50%, -50%) scale(' + s + ')');
  }}
  function show(n) {{
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((el, k) => el.classList.toggle('active', k === i));
  }}
  addEventListener('keydown', e => {{
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) show(i + 1);
    if (['ArrowLeft', 'PageUp'].includes(e.key)) show(i - 1);
  }});
  addEventListener('click', () => show(i + 1 >= slides.length ? 0 : i + 1));
  addEventListener('resize', fit);
  fit(); show(0);
</script>
</body>
</html>
"""
(ROOT / "ContextOps-pitch.html").write_text(page, encoding="utf-8")
print("wrote", ROOT / "ContextOps-pitch.html")
