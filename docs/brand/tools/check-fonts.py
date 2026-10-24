#!/usr/bin/env python3
"""Check required Vietnamese glyphs in TrueType cmap format 4 (Python stdlib)."""
from pathlib import Path
import struct, hashlib, json
R=Path(__file__).resolve().parents[1]
def u16(b,o):return struct.unpack_from('>H',b,o)[0]
def u32(b,o):return struct.unpack_from('>I',b,o)[0]
results=[]
for p in sorted((R/'fonts').glob('*.ttf')):
 b=p.read_bytes(); tables={}
 for i in range(u16(b,4)):
  off=12+16*i; tag=b[off:off+4].decode('ascii'); tables[tag]=u32(b,off+8)
 cmap=tables['cmap']; subtables=[]
 for i in range(u16(b,cmap+2)):
  entry=cmap+4+8*i; platform=u16(b,entry); encoding=u16(b,entry+2); off=cmap+u32(b,entry+4)
  if platform in (0,3) and u16(b,off)==4:subtables.append(off)
 def glyph(cp):
  for off in subtables:
   n=u16(b,off+6)//2; end=off+14; start=end+2*n+2; delta=start+2*n; ranges=delta+2*n
   for i in range(n):
    if u16(b,start+2*i)<=cp<=u16(b,end+2*i):
     d=u16(b,delta+2*i); ran=u16(b,ranges+2*i)
     if ran==0:g=(cp+d)%65536
     else:
      g=u16(b,ranges+2*i+ran+2*(cp-u16(b,start+2*i)))
      if g:g=(g+d)%65536
     if g:return g
  return 0
 chars='ắầẩữợỹHồ sơ công chứngNguyễn Thị Mỹ'
 missing=sorted({c for c in chars if not glyph(ord(c))})
 results.append({'font':p.name,'sha256':hashlib.sha256(b).hexdigest(),'requiredCharacters':chars,'missing':missing,'pass':not missing})
 assert not missing,(p,missing)
(R/'font-checks.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print('Required Vietnamese characters present in both fonts.')
