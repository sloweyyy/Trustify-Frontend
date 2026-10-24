#!/usr/bin/env python3
"""Documentation-only tokens and measured contrast. Does not write src/."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]
keys=[50,100,200,300,400,500,600,700,800,900]
def scale(values):return dict(zip(map(str,keys),values.split()))
scales={
'brand':scale('#FCF5F7 #F8EDF0 #EED3D9 #DDA6B1 #CB7689 #AA1D39 #87172D #641123 #450C18 #23060C'),
'neutral':scale('#FAF8F5 #F1EEEA #E5E1DC #DBD7D2 #9A9690 #777A82 #5D6068 #42454C #32353B #24262B'),
'success':scale('#EAF5EF #D2EADD #ACD7BE #81C2A0 #57A882 #308158 #26734C #196642 #145035 #103D29'),
'error':scale('#FDEDEA #FAD5CF #F4B2A9 #EB8E82 #D96254 #C64032 #BC3022 #B42318 #8C1C13 #68150F'),
'warning':scale('#FFF3D6 #FFE5AD #F2D18A #E6BD60 #D8A63B #C88A18 #A66D08 #805300 #674300 #4D3200'),
'info':scale('#EDF4FC #D5E5F8 #B5D0EF #91B7E2 #6898CC #417BB6 #326BA8 #245C9A #1C4879 #15365C'),
'signature':scale('#F3EEFA #E5DAF3 #CFBBE8 #B99CDB #A17ECD #8861BB #7650AA #67429A #513479 #3B2659')}
light={'background':'#FAF8F5','surface':'#FFFFFF','subtle':'#F1EEEA','text':'#24262B','muted':'#5D6068','divider':'#DBD7D2','inputBorder':'#777A82','primary':'#AA1D39','onPrimary':'#FFFFFF','primaryHover':'#87172D','primaryPressed':'#641123','link':'#AA1D39','focus':'#245C9A','selected':'#F8EDF0','onSelected':'#87172D','disabledBg':'#E5E1DC','disabledText':'#5D6068'}
dark={'background':'#191B20','surface':'#24262B','subtle':'#32353B','text':'#F5F3EF','muted':'#C3C5CA','divider':'#42454C','inputBorder':'#92959E','primary':'#F1A7B7','onPrimary':'#271018','primaryHover':'#F5BDCA','primaryPressed':'#F8D3DC','link':'#F1A7B7','focus':'#A8CDF5','selected':'#45252F','onSelected':'#F8D3DC','disabledBg':'#32353B','disabledText':'#C3C5CA'}
semanticLight={k:{'fg':scales[k]['700'],'bg':scales[k]['50'],'border':scales[k]['700']} for k in ['warning','info','signature','success','error']}
semanticDark={k:dict(zip(['fg','bg','border'],v.split())) for k,v in {'warning':'#F2D18A #3D301B #F2D18A','info':'#B5D0EF #203147 #B5D0EF','signature':'#CFBBE8 #322940 #CFBBE8','success':'#ACD7BE #20382C #ACD7BE','error':'#F4B2A9 #432825 #F4B2A9'}.items()}
legacy={'primary':'brand','gray':'neutral','dark':'neutral (deprecated raw import; migrate by semantic role)','green':'success','red':'error','yellow':'warning','blue':'info','black':{'50':'#E5E1DC','100':'#DBD7D2','200':'#9A9690','300':'#777A82','400':'#5D6068','500':'#42454C','600':'#32353B','700':'#24262B','800':'#191B20','900':'#000000'},'white':{'50':'#FFFFFF','100':'#FAF8F5','200':'#F1EEEA','300':'#E5E1DC','400':'#DBD7D2','500':'#9A9690','600':'#777A82','700':'#5D6068','800':'#42454C','900':'#32353B'}}
tokens={'status':'phase-2-proposal-awaiting-review','brandDirection':'B','scales':scales,'modes':{'light':light,'dark':dark},'semantic':{'light':semanticLight,'dark':semanticDark},'legacyExports':legacy,'spacingBasePx':8,'spacingSteps':[0,.5,1,1.5,2,3,4,5,6,8,10,12],'radius':{'control':8,'card':12,'dialog':16,'pill':999},'touch':{'minimum':44,'default':48},'breakpoints':{'xs':0,'sm':600,'md':900,'lg':1200,'xl':1536}}
(R/'tokens.json').write_text(json.dumps(tokens,ensure_ascii=False,indent=2)+'\n')
def lum(h):
 rgb=[int(h[i:i+2],16)/255 for i in (1,3,5)];rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb];return sum(x*y for x,y in zip(rgb,[.2126,.7152,.0722]))
checks=[]
for mode,colors in tokens['modes'].items():
 pairs=[]
 for surface in ['background','surface','subtle']:
  for fg in ['text','muted','link']:pairs.append((fg+'/'+surface,colors[fg],colors[surface],4.5))
 for bg in ['primary','primaryHover','primaryPressed']:pairs.append(('onPrimary/'+bg,colors['onPrimary'],colors[bg],4.5))
 for surface in ['background','surface','subtle']:
  pairs.append(('focus/'+surface,colors['focus'],colors[surface],3))
 pairs += [('onSelected/selected',colors['onSelected'],colors['selected'],4.5),('inputBorder/surface',colors['inputBorder'],colors['surface'],3)]
 for name,color in tokens['semantic'][mode].items():
  pairs.append((name+' text',color['fg'],color['bg'],4.5));pairs.append((name+' border',color['border'],color['bg'],3))
 for name,fg,bg,threshold in pairs:
  low,high=sorted([lum(fg),lum(bg)]);ratio=(high+.05)/(low+.05);checks.append({'mode':mode,'pair':name,'foreground':fg,'background':bg,'ratio':round(ratio,2),'threshold':threshold,'pass':ratio>=threshold})
(R/'contrast-checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n')
fails=[x for x in checks if not x['pass']]
print(f'{len(checks)} contrast checks; failures: {fails}')
assert not fails
# Markdown inventory generated for exact scale mapping; values never silently reverse in dark mode.
s='\n\n## Phụ lục A — Toàn bộ scale đề xuất\n\nNguồn tái tạo: [tokens.json](tokens.json). Các scale là primitive bất biến; dark mode chọn semantic token phù hợp, không đảo ngược số scale.\n\n| Scale | '+' | '.join(map(str,keys))+' |\n| --- | '+' | '.join(['---']*10)+' |\n'
for k,v in scales.items():s+='| '+k+' | '+' | '.join('`'+v[str(i)]+'`' for i in keys)+' |\n'
(R/'token-scales.md').write_text(s)
