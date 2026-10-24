#!/usr/bin/env python3
"""Regenerate Phase 1 vector proposals and the local brand review board. Stdlib only."""
from pathlib import Path
import base64, html, json
R = Path(__file__).resolve().parents[1]
for folder in ('logos','applications','previews'):
    (R/folder).mkdir(exist_ok=True)
fonts = ''.join('@font-face{font-family:Be Vietnam Pro;src:url(data:font/ttf;base64,'+base64.b64encode((R/'fonts'/f'BeVietnamPro-{name}.ttf').read_bytes()).decode()+') format("truetype");font-weight:'+str(weight)+';font-style:normal;}' for name,weight in [('Regular',400),('SemiBold',600)])
P='#AA1D39'; INK='#24262B'; MUTED='#5D6068'; BG='#FAF8F5'
def svg(w,h,body,title,embed=True):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{html.escape(title)}"><title>{html.escape(title)}</title><defs><style>{fonts if embed else ""}text{{font-family:Be Vietnam Pro,Arial,sans-serif}}</style></defs>{body}</svg>'
def text(x,y,s,size=16,fill=INK,weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}">{html.escape(s)}</text>'
def rect(x,y,w,h,fill,rx=12,stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"'+(f' stroke="{stroke}"' if stroke else '')+'/>'
def symbol(c,color=P):
    if c=='a':
        # A folded document with a deliberately open lower-right edge for a confirmation mark.
        return f'<g fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M38 7H17a6 6 0 0 0-6 6v38a6 6 0 0 0 6 6h15M38 7l15 15v9M38 7v15h15M22 32h15M22 41h8"/><path d="m36 48 7 7 15-19"/></g>'
    if c=='b':
        return f'<g fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 14h42M32 14v27c0 14-12 18-12 8 0-7 12-12 24-17M11 53c13-6 29-7 43-3"/><path d="m44 37 5 5 10-13"/></g>'
    return f'<g fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7 20 0 15 15v20L42 57H22L7 42V22Z"/><path d="M21 22h22M21 31h12m-9 10 7 7 14-17"/></g>'
variants={'color':(P,'#FFFFFF'),'mono':(INK,'#FFFFFF'),'inverse':('#FFFFFF',P)}
for c in 'abc':
    for v,(fg,bg) in variants.items():
        for size in ['favicon','app-icon','header']:
            if size=='favicon':
                s=svg(32,32,rect(0,0,32,32,bg,4)+f'<g transform="translate(1 1) scale(.46875)">{symbol(c,fg)}</g>',f'Trustify — hướng {c.upper()} — biểu tượng 32 px — {v}',False)
            elif size=='app-icon':
                s=svg(192,192,rect(0,0,192,192,bg,38)+f'<g transform="translate(32 32) scale(2)">{symbol(c,fg)}</g>',f'Trustify — hướng {c.upper()} — biểu tượng ứng dụng — {v}',False)
            else:
                s=svg(240,64,rect(0,0,240,64,bg,0)+f'<g transform="translate(4 7) scale(.78)">{symbol(c,fg)}</g>'+text(66,42,'Trustify',32,fg,600),f'Trustify — hướng {c.upper()} — chữ và biểu tượng — {v}')
            (R/'logos'/f'{c}-{size}-{v}.svg').write_text(s)

def logo(x=32,y=20):
    return f'<g transform="translate({x} {y}) scale(.6)">{symbol("b")}</g>'+text(x+48,y+29,'Trustify',25,P,600)
def btn(x,y,w,label):
    return rect(x,y,w,52,P,8)+text(x+20,y+33,label,16,'#FFFFFF',600)
def label(x,y,s):return text(x,y,s,14,MUTED)
# Brand applications: illustrative surfaces, no API, route or component specification.
body=rect(0,0,1120,760,BG,0)+logo()+text(820,46,'Hướng dẫn  ·  Liên hệ hỗ trợ',14,MUTED)
body+=text(64,210,'Hồ sơ rõ ràng.',36,INK,600)+text(64,266,'An tâm từng bước.',36,P,600)
for y,s in [(326,'Chuẩn bị giấy tờ và theo dõi hồ sơ công chứng'),(356,'ngay trên điện thoại của bạn.'),(420,'01   Gửi hồ sơ'),(464,'02   Công chứng viên kiểm tra'),(508,'03   Theo dõi và nhận kết quả')]:body+=text(64,y,s,17,MUTED)
body+=rect(612,118,444,530,'#FFFFFF',16,'#DBD7D2')+text(648,178,'Đăng nhập',28,INK,600)+text(648,212,'Tiếp tục theo dõi hồ sơ của bạn.',16,MUTED)
for y,name,placeholder in [(258,'Email','Nhập địa chỉ email'),(362,'Mật khẩu','Nhập mật khẩu')]:
    body+=text(648,y,name,16,INK,600)+rect(648,y+16,372,56,'#FFFFFF',8,'#777A82')+text(664,y+50,placeholder,16,MUTED)
body+=text(867,466,'Quên mật khẩu?',14,P)+btn(648,490,372,'Đăng nhập')+text(680,590,'Chưa có tài khoản? Đăng ký',16,P)+text(64,710,'Bản đề xuất nhận diện · Dữ liệu minh họa',14,MUTED)
(R/'applications'/'sign-in.svg').write_text(svg(1120,760,body,'Ứng dụng nhận diện: trang đăng nhập'))
body=rect(0,0,640,470,BG,0)+rect(24,24,592,422,'#FFFFFF',14,'#DBD7D2')+label(48,64,'HỒ SƠ CÔNG CHỨNG · DỮ LIỆU MINH HỌA')
body+=text(48,112,'Bản sao bằng tốt nghiệp',25,INK,600)+text(48,148,'Mã hồ sơ: HS-2026-00124',16,MUTED)+rect(48,177,154,36,'#FFF3D6',18)+text(62,201,'◷ Chờ xử lý',15,'#805300',600)+label(48,252,'Ngày gửi')+text(48,281,'25/10/2026',17)+label(320,252,'Lệ phí dự kiến')+text(320,281,'50.000 ₫',17)
body+=rect(48,309,544,60,BG,8)+text(64,335,'Bước tiếp theo',14,MUTED)+text(64,358,'Công chứng viên kiểm tra hồ sơ của bạn.',16)+btn(48,385,220,'Xem hồ sơ')
(R/'applications'/'profile-card.svg').write_text(svg(640,470,body,'Ứng dụng nhận diện: thẻ hồ sơ công chứng'))
body=rect(0,0,680,680,BG,0)+rect(24,24,632,632,'#FFFFFF',14,'#DBD7D2')+rect(24,24,632,8,P,0)+logo(48,50)+text(48,134,'Bản ghi tài liệu công chứng',27,INK,600)+text(48,169,'Bản minh họa · Không có giá trị pháp lý',15,P)
body+=rect(48,198,584,96,BG,10)+text(68,237,'Bản sao bằng tốt nghiệp',23,INK,600)+text(68,270,'Mã hồ sơ: HS-2026-00124',16,MUTED)+rect(48,319,148,36,'#EAF5EF',18)+text(64,343,'✓ Hoàn tất',15,'#196642',600)
body+=label(48,399,'Thông tin công chứng viên')+text(48,430,'Hiển thị theo hồ sơ đã xác minh',17)+label(48,477,'Bản ghi blockchain (NFT)')+text(48,507,'Mã đối chiếu để kiểm tra thông tin tài liệu.',16)+text(48,536,'Mạng thử nghiệm Solana devnet.',15,MUTED)+btn(48,574,232,'Xem thông tin đối chiếu')
(R/'applications'/'certificate-card.svg').write_text(svg(680,680,body,'Ứng dụng nhận diện: thẻ bản ghi tài liệu và NFT thử nghiệm'))
body=rect(0,0,720,440,BG,0)+rect(40,32,640,376,'#FFFFFF',8,'#DBD7D2')+rect(40,32,640,6,P,0)+logo(72,61)+text(72,150,'Hồ sơ của bạn đã được tiếp nhận',24,INK,600)+text(72,195,'Chào bạn,',17)+text(72,231,'Bạn có thể xem tiến độ và các yêu cầu bổ sung',17)+text(72,261,'trong mục Lịch sử hồ sơ.',17)+btn(72,293,228,'Xem tiến độ hồ sơ')+text(72,382,'Trustify · Email thông báo · Dữ liệu minh họa',13,MUTED)
(R/'applications'/'email-header.svg').write_text(svg(720,440,body,'Ứng dụng nhận diện: email giao dịch'))
body=rect(0,0,1200,630,BG,0)+rect(914,0,286,630,P,0)+logo(64,52)+text(64,232,'Hồ sơ rõ ràng.',56,INK,600)+text(64,310,'An tâm từng bước.',56,P,600)+text(64,380,'Công chứng trực tuyến cùng Trustify',25,MUTED)+text(64,547,'Gửi hồ sơ  →  Theo dõi tiến độ  →  Nhận kết quả',20,INK)+f'<g transform="translate(954 228) scale(3.2)">{symbol("b","#FFFFFF")}</g>'+text(64,600,'Bản đề xuất nhận diện · Không chứa dữ liệu hồ sơ thật',14,MUTED)
(R/'applications'/'social-share.svg').write_text(svg(1200,630,body,'Ứng dụng nhận diện: ảnh chia sẻ 1200 × 630'))
# Typography specimen includes every currently defined theme size and proposed mobile minimum.
sizes=[10,12,14,16,18,20,24,28,32,40,64]
body=rect(0,0,1440,1750,'#FFFFFF',0)+text(40,64,'Be Vietnam Pro · Kiểm tra dấu tiếng Việt',30,INK,600)+text(40,104,'Nét thường 400 và nét đậm 600 · Các cỡ hiện có trong theme',17,MUTED)
y=150
for size in sizes:
    body+=text(40,y,str(size)+' px',14,MUTED)
    body+=text(130,y,'ắ ầ ẩ ữ ợ ỹ · Hồ sơ công chứng'+(' · Nguyễn Thị Mỹ' if size<64 else ''),size,INK,400)
    y+=max(size*1.65,40)
    body+=text(130,y,'ắ ầ ẩ ữ ợ ỹ · Hồ sơ công chứng'+(' · Nguyễn Thị Mỹ' if size<64 else ''),size,INK,600)
    y+=max(size*1.85,55)
body+=text(40,1680,'10–14 px: mẫu kiểm tra, không dùng cho nội dung chính trên điện thoại.',17,P)
(R/'applications'/'type-specimen.svg').write_text(svg(1440,1750,body,'Mẫu kiểm tra dấu tiếng Việt, nét 400 và 600'))
# contrast evidence; values are rounded for reporting, decisions use unrounded values.
def lum(h):
    rgb=[int(h[i:i+2],16)/255 for i in (1,3,5)]
    rgb=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb]
    return sum(a*b for a,b in zip(rgb,[.2126,.7152,.0722]))
pairs=[('Nút chính / nền trắng','#FFFFFF',P),('Thương hiệu / giấy ấm',P,BG),('Chữ chính',INK,BG),('Chữ phụ',MUTED,'#FFFFFF'),('Viền trường nhập','#777A82','#FFFFFF'),('Hoàn tất','#196642','#EAF5EF'),('Chờ xử lý / thanh toán','#805300','#FFF3D6'),('Đang xử lý','#245C9A','#EDF4FC'),('Chờ ký số','#67429A','#F3EEFA'),('Bị từ chối','#B42318','#FDEDEA')]
rows=[]
for name,fg,bg in pairs:
    l=sorted([lum(fg),lum(bg)])
    ratio=(l[1]+.05)/(l[0]+.05)
    rows.append({'usage':name,'foreground':fg,'background':bg,'ratio':round(ratio,2),'normalTextAA':ratio>=4.5,'largeTextAndUI':ratio>=3})
(R/'contrast-checks.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
css='''@font-face{font-family:Brand;src:url(fonts/BeVietnamPro-Regular.ttf);font-weight:400}@font-face{font-family:Brand;src:url(fonts/BeVietnamPro-SemiBold.ttf);font-weight:600}*{box-sizing:border-box}body{margin:0;background:#FAF8F5;color:#24262B;font:16px/1.65 Brand,Arial,sans-serif}header{padding:48px max(24px,calc((100vw - 1280px)/2));background:#AA1D39;color:white}h1{font-size:clamp(30px,5vw,48px);line-height:1.3;margin:12px 0}h2{font-size:28px;line-height:1.4}h3{font-size:19px}p{max-width:78ch}main{max-width:1328px;padding:24px;margin:auto}section{margin:40px 0 64px}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:white;border:1px solid #DBD7D2;border-radius:12px;padding:24px}.recommended{border:2px solid #AA1D39}.tag{color:#AA1D39;font-weight:600}img{max-width:100%;height:auto}figure{margin:0 0 24px}figcaption{padding:8px 0;color:#5D6068}.versions{display:grid;grid-template-columns:repeat(3,1fr);align-items:center;gap:12px}.versions img{width:100%;border:1px solid #DBD7D2;border-radius:6px}.icons{display:flex;align-items:center;gap:20px;margin:20px 0}.icons img:first-child{width:32px}.icons img:last-child{width:88px}.swatches{display:flex;flex-wrap:wrap;gap:16px}.swatch{padding:20px;border-radius:8px;min-width:160px;border:1px solid #DBD7D2}.apps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.wide{grid-column:1/-1}a{color:#AA1D39}header a{color:white}table{border-collapse:collapse;width:100%;background:white}td,th{text-align:left;border-bottom:1px solid #DBD7D2;padding:14px}button{font:inherit}nav{display:flex;flex-wrap:wrap;gap:24px}.note{border-left:4px solid #AA1D39;padding:12px 20px;background:white}@media(max-width:850px){.grid,.apps{grid-template-columns:1fr}.wide{grid-column:auto}.card{padding:18px}main{padding:16px}header{padding:28px 20px}table{font-size:14px}td,th{padding:8px}}'''
board='<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trustify · Đề xuất nhận diện thương hiệu</title><style>'+css+'</style><body><header><div>TRUSTIFY · GIAI ĐOẠN 1 · ĐÃ DUYỆT HƯỚNG B</div><h1>Hồ sơ rõ ràng.<br>An tâm từng bước.</h1><p>Dịch vụ công chứng trực tuyến với ngôn ngữ gần gũi, thông tin rõ ràng và tinh thần phục vụ tận tâm.</p><nav><a href="#logos">Biểu trưng</a><a href="#palette">Màu sắc</a><a href="#applications">Ứng dụng</a><a href="#type">Chữ tiếng Việt</a><a href="audit/index.html">Ảnh giao diện hiện tại</a></nav></header><main><p class="note">Hướng B đã được duyệt ngày 25/10/2026. Các hình minh họa không phải giao diện đã triển khai, chứng nhận pháp lý hay đặc tả hệ thống thiết kế.</p><section id="logos"><h2>Ba hướng biểu trưng</h2><div class="grid">'
names={'a':('Hồ sơ xác nhận','Hướng thay thế','Tờ giấy gấp góc và dấu kiểm mở: quen thuộc, rõ ở cỡ nhỏ, gắn với việc của người dùng.'),'b':('Nét ký tận tâm','Đã duyệt','Chữ T và nét ký chuyển động: mang tính cá nhân hơn, nhưng khó nhận ra ở cỡ nhỏ.'),'c':('Dấu kết nối','Hướng thay thế','Khung tám cạnh gợi dấu xác nhận: trang trọng, nhưng dễ bị hiểu thành con dấu chính thức.')}
for c,(name,tag,desc) in names.items():
    board+=f'<article class="card {"recommended" if c=="b" else ""}"><div class="tag">{c.upper()} · {tag}</div><h3>{name}</h3><p>{desc}</p><img width="240" height="64" src="logos/{c}-header-color.svg" alt="Biểu trưng {name}"><div class="icons"><img width="32" height="32" src="logos/{c}-favicon-color.svg" alt="Biểu tượng 32 px"><img width="88" height="88" src="logos/{c}-app-icon-color.svg" alt="Biểu tượng ứng dụng"></div><p>Màu · Một màu · Đảo trắng</p><div class="versions">'
    for v in variants:board+=f'<img src="logos/{c}-header-{v}.svg" alt="Chữ và biểu tượng {v}">'
    board+='</div><div class="versions">'
    for v in variants:board+=f'<img src="logos/{c}-app-icon-{v}.svg" alt="Ứng dụng {v}">'
    board+='</div><div class="versions">'
    for v in variants:board+=f'<img width="32" height="32" style="width:32px;margin:12px auto" src="logos/{c}-favicon-{v}.svg" alt="Favicon {v}">'
    board+='</div></article>'
board+='</div></section><section id="palette"><h2>Đỏ trầm, nền giấy ấm</h2><p>Giữ #AA1D39 để nối tiếp nhận diện hiện có. Nền sáng và khoảng trắng làm dịu sắc đỏ; màu trạng thái luôn đi cùng nhãn chữ.</p><div class="swatches">'
for name,color,fg in [('Đỏ Trustify',P,'white'),('Đỏ đậm','#87172D','white'),('Giấy ấm',BG,INK),('Mực',INK,'white'),('Chữ phụ',MUTED,'white'),('Xác nhận','#196642','white')]:board+=f'<div class="swatch" style="background:{color};color:{fg}">{name}<br>{color}</div>'
board+='</div><h3>Kiểm tra tương phản</h3><table><thead><tr><th>Cặp màu</th><th>Tỷ lệ</th><th>Chữ thường AA</th></tr></thead><tbody>'
for row in rows:board+=f'<tr><td>{row["usage"]}</td><td>{row["ratio"]}:1</td><td>{"Đạt" if row["normalTextAA"] else "Không đạt"}</td></tr>'
board+='</tbody></table></section><section id="applications"><h2>Nhận diện trong ngữ cảnh sử dụng</h2><p>Tất cả hồ sơ, phí và mốc thời gian dưới đây là dữ liệu minh họa. Hướng B được dùng nhất quán để đánh giá cảm giác thương hiệu.</p><div class="apps">'
for key,name in [('sign-in','Trang đăng nhập'),('profile-card','Thẻ hồ sơ công chứng'),('certificate-card','Thẻ bản ghi tài liệu / NFT'),('email-header','Đầu email giao dịch'),('social-share','Ảnh chia sẻ 1200 × 630')]:
    board+=f'<figure class="{"wide" if key in ["sign-in","social-share"] else ""}"><img src="applications/{key}.svg" alt="{name}"><figcaption>{name} · <a href="applications/{key}.svg">SVG</a> · <a href="previews/{key}.png">PNG</a></figcaption></figure>'
board+='</div></section><section id="type"><h2>Be Vietnam Pro · Dấu tiếng Việt phải rõ</h2><p>Một họ chữ, hai vai trò: 600 cho tiêu đề và nhãn; 400 cho nội dung. Giữ tiếng Việt dễ đọc thay vì thêm một font trang trí. Phóng to mẫu để kiểm tra dấu ở kích thước thật.</p><img src="applications/type-specimen.svg" alt="Kiểm tra các dấu ắ ầ ẩ ữ ợ ỹ ở các cỡ chữ hiện có"><p><a href="brand-identity.md">Đọc hồ sơ nhận diện</a> · <a href="audit/existing-screen-audit.md">Đọc đánh giá giao diện hiện tại</a></p></section></main></body></html>'
(R/'index.html').write_text(board)
print('Generated 27 logo SVGs, 6 application/type SVGs, contrast report and review board.')
