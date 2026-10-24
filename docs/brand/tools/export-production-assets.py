#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Export approved logo B with outlined lettering. Documentation tooling only.
Requirements: fonttools==4.60.2, pillow==11.3.0 (not app dependencies).
Run from any directory; output is restricted to public/brand and named root icons.
"""
from pathlib import Path
import copy,json,shutil,sys,xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
ROOT=Path(__file__).resolve().parents[3]
BRAND=ROOT/'docs/brand'; PUBLIC=ROOT/'public'; OUT=PUBLIC/'brand'
NS='http://www.w3.org/2000/svg';ET.register_namespace('',NS)
def tag(n):return '{'+NS+'}'+n
OUT.mkdir(exist_ok=True)

def outline(name):
 root=ET.parse(BRAND/'source'/f'{name}.svg').getroot()
 runs=json.loads((BRAND/'source/lettering-positions.json').read_text())[name]
 for node in list(root.iter(tag('text'))):
  parent=next(p for p in root.iter() if node in list(p))
  run=next(r for r in runs if r['text']==node.text and r['size']==float(node.get('font-size')))
  assert len(run['positions'])==len(run['text']),run['text']
  font=TTFont(BRAND/'fonts'/('BeVietnamPro-SemiBold.ttf' if run['weight']==600 else 'BeVietnamPro-Regular.ttf'))
  glyphs=font.getGlyphSet();cmap=font.getBestCmap();scale=run['size']/font['head'].unitsPerEm
  group=ET.Element(tag('g'),{'fill':node.get('fill','#24262B')})
  for char,(x,y) in zip(run['text'],run['positions']):
   if char=='→':
    # Original specimen used a fallback glyph; draw the separator as original vector artwork.
    size=run['size'];cy=y-size*.3
    ET.SubElement(group,tag('path'),{'d':f'M{x+1:g} {cy:g}h{size*.7:g}m{-size*.25:g} {-size*.22:g}l{size*.25:g} {size*.22:g}l{-size*.25:g} {size*.22:g}','fill':'none','stroke':node.get('fill','#24262B'),'stroke-width':'1.5','stroke-linecap':'round','stroke-linejoin':'round'})
    continue
   pen=SVGPathPen(glyphs);glyphs[cmap[ord(char)]].draw(pen);d=pen.getCommands()
   if d:ET.SubElement(group,tag('path'),{'d':d,'transform':f'translate({x:g} {y:g}) scale({scale:g} {-scale:g})'})
  parent.insert(list(parent).index(node),group);parent.remove(node);font.close()
 return root

def save(root,name):
 out=ET.tostring(root,encoding='unicode')+'\n'
 assert '<text' not in out and '@font-face' not in out and 'data:' not in out and 'http' not in out.replace(NS,'')
 (OUT/name).write_text(out)

def colors(root,color):
 result=copy.deepcopy(root)
 for node in result.iter():
  for attr in ['fill','stroke']:
   if node.get(attr)=='#AA1D39':node.set(attr,color)
 return result

if '--ico' in sys.argv:
 from PIL import Image
 image=Image.open(OUT/'favicon-64.png')
 image.save(PUBLIC/'favicon.ico',format='ICO',sizes=[(16,16),(24,24),(32,32),(48,48),(64,64)])
 print('Exported favicon.ico: 16/24/32/48/64px.')
 sys.exit(0)

logo=outline('logo-b')
for variant,color in [('color','#AA1D39'),('mono','#24262B'),('inverse','#FFFFFF')]:save(colors(logo,color),'logo-'+variant+'.svg')
mark=ET.Element(tag('svg'),{'width':'64','height':'64','viewBox':'0 0 64 64','role':'img','aria-label':'Trustify'})
ET.SubElement(mark,tag('title')).text='Trustify — Nét ký tận tâm'
# Exact gesture of approved B. It is a brand symbol, not a valid legal signature.
g=ET.SubElement(mark,tag('g'),{'fill':'none','stroke':'#AA1D39','stroke-width':'4','stroke-linecap':'round','stroke-linejoin':'round'})
ET.SubElement(g,tag('path'),{'d':'M11 14h42M32 14v27c0 14-12 18-12 8 0-7 12-12 24-17M11 53c13-6 29-7 43-3'})
ET.SubElement(g,tag('path'),{'d':'m44 37 5 5 10-13'})
for variant,color in [('color','#AA1D39'),('mono','#24262B'),('inverse','#FFFFFF')]:save(colors(mark,color),'mark-'+variant+'.svg')
# Opaque white favicon avoids disappearing against either browser-tab color.
# 4 design units become a 1px stroke at 16px and a 2px stroke at 32px.
favicon=copy.deepcopy(mark);favicon.set('width','32');favicon.set('height','32')
favicon.insert(1,ET.Element(tag('rect'),{'width':'64','height':'64','rx':'8','fill':'#FFFFFF'}))
save(favicon,'favicon.svg');shutil.copyfile(OUT/'favicon.svg',PUBLIC/'favicon.svg')
# 2/3-size symbol with generous margin also fits the maskable icon safe circle.
icon=ET.Element(tag('svg'),{'width':'512','height':'512','viewBox':'0 0 192 192','role':'img','aria-label':'Trustify'})
ET.SubElement(icon,tag('title')).text='Trustify'
ET.SubElement(icon,tag('rect'),{'width':'192','height':'192','fill':'#FFFFFF'})
wrapper=ET.SubElement(icon,tag('g'),{'transform':'translate(32 32) scale(2)'})
wrapper.append(copy.deepcopy(g));save(icon,'app-icon.svg')
save(outline('social-share'),'social-share.svg')
shutil.copyfile(BRAND/'fonts/OFL.txt',OUT/'OFL.txt')
print('Exported font-independent logo variants, marks, favicon, app icon, social SVG and OFL notice.')
