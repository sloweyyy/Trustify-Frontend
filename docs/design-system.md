# Trustify — Hệ thống thiết kế

**Giai đoạn 2 · Đã duyệt · 25/10/2026.** Cơ sở: người dùng chọn **logo B — Nét ký tận tâm** và yêu cầu tiếp tục. Giữ burgundy `#AA1D39`, nền giấy ấm, Be Vietnam Pro, giọng “bạn”, khẩu hiệu “Hồ sơ rõ ràng. An tâm từng bước.” từ [brand đã duyệt](brand/brand-identity.md).

Đây là đặc tả và mock tĩnh; chưa sửa production, `public/`, Redux, route, API, `src/services/*` hoặc backend. [Bảng duyệt trực quan](design/index.html) gồm light/dark, mẫu thành phần, mẫu màn hình và wireframe cho từng route. [Audit trước thay đổi](brand/audit/existing-screen-audit.md) có 74 screenshot; không coi mock là screenshot sản phẩm đã triển khai.

## 1. Nguyên tắc

1. **Gọi đúng việc bằng tiếng Việt.** “Hồ sơ công chứng”, “Công chứng viên”, “Ký số”, “Ví tài liệu”; giải thích NFT ở nơi dùng. Nhãn cụ thể, viết hoa đầu câu, không bắt người dùng nhớ thuật ngữ kỹ thuật.
2. **Một ưu tiên trong mỗi ngữ cảnh.** Một nút chính cho màn hình hoặc nhóm hồ sơ đang xem. Hành động lặp trong từng hàng là liên kết phụ. Khi có khoản chờ, Thanh toán nổi bật trong banner, không tô đỏ mọi hành động cạnh nhau.
3. **Chia nhỏ việc, giữ ngữ cảnh.** Wizard ba bước hiện có, cho biết bước đang làm và bước tiếp. Không thêm bước, tự lưu nháp, lịch hẹn hoặc yêu cầu xác minh mới mà backend chưa hỗ trợ.
4. **Luôn biết tình trạng và điều cần làm tiếp.** Hồ sơ, thanh toán và bản ghi blockchain có nhãn riêng. Chờ xử lý nghĩa là chờ công chứng viên, không phải lỗi của người dùng. Trống/lỗi/tải dữ liệu có lời giải thích và hành động phù hợp.
5. **Niềm tin đến từ thông tin có thể đối chiếu.** Tên dịch vụ, mã hồ sơ, ngày tháng, phí và người xử lý khi có dữ liệu; không bịa chứng chỉ, SLA hoặc huy hiệu pháp lý. Biểu trưng B không dùng làm dấu công chứng thật.
6. **Dễ đọc, dễ chạm, phù hợp vai trò.** Public/User ưu tiên điện thoại và người ít quen công nghệ; Notary/Admin ưu tiên quét danh sách và xem tài liệu trên desktop. Cả hai vẫn dùng cùng nhãn, màu và cấu trúc thành phần.

## 2. Tokens

Nguồn dữ liệu đề xuất: [tokens.json](design/tokens.json), có toàn bộ scale, light/dark, trạng thái, spacing, radius và breakpoint. Đây là tài liệu tham chiếu, ứng dụng chưa import. Tái tạo bằng `python3 docs/design/tools/generate-tokens.py`.

### 2.1. Semantic light/dark

| Token | Light | Dark | Đích trong MUI / ý nghĩa |
| --- | --- | --- | --- |
| background | `#FAF8F5` | `#191B20` | `palette.background.default` |
| surface | `#FFFFFF` | `#24262B` | `palette.background.paper` |
| subtle | `#F1EEEA` | `#32353B` | `theme.trustify.surface.subtle` |
| text | `#24262B` | `#F5F3EF` | `palette.text.primary` |
| muted | `#5D6068` | `#C3C5CA` | `palette.text.secondary`; không giảm opacity |
| primary | `#AA1D39` | `#F1A7B7` | `palette.primary.main`; dark dùng sắc sáng cùng họ đỏ |
| onPrimary | `#FFFFFF` | `#271018` | `palette.primary.contrastText` |
| primaryHover | `#87172D` | `#F5BDCA` | Nút chính khi hover |
| primaryPressed | `#641123` | `#F8D3DC` | Nút chính khi nhấn |
| link | `#AA1D39` | `#F1A7B7` | Link có gạch chân trong nội dung |
| selected / onSelected | `#F8EDF0` / `#87172D` | `#45252F` / `#F8D3DC` | Điều hướng/tab được chọn, thêm vạch/nhãn |
| divider | `#DBD7D2` | `#42454C` | Phân vùng trang trí, không phải tín hiệu tương tác duy nhất |
| inputBorder | `#777A82` | `#92959E` | Biên input, radio/checkbox chưa chọn |
| focus | `#245C9A` | `#A8CDF5` | Outline 3px, offset 2px, không bán trong suốt |
| disabledBg / disabledText | `#E5E1DC` / `#5D6068` | `#32353B` / `#C3C5CA` | Không nhận input, kèm lời giải thích khi cần |

Không đảo thứ tự scale để làm dark mode. Chọn semantic theo `mode`, `background`, `text` và `onPrimary` thành một bộ; không thay mỗi primary. Giữ tài liệu PDF/hình gốc và canvas chữ ký nền trắng trong dark mode để nội dung tệp không bị đảo màu; frame/chrome xung quanh dùng dark tokens. Logo B đảo trắng trên nền burgundy; header dark có thể dùng logo B trắng trên nền surface, không đưa ô nền trắng thừa vào header.

### 2.2. Màu ý nghĩa

| Semantic | Light chữ / nền | Dark chữ / nền | Dùng cho |
| --- | --- | --- | --- |
| warning | `#805300` / `#FFF3D6` | `#F2D18A` / `#3D301B` | Chờ xử lý, cần chú ý, Chờ thanh toán |
| info | `#245C9A` / `#EDF4FC` | `#B5D0EF` / `#203147` | Đang xử lý, thông tin bản ghi |
| signature | `#67429A` / `#F3EEFA` | `#CFBBE8` / `#322940` | Chờ ký số |
| success | `#196642` / `#EAF5EF` | `#ACD7BE` / `#20382C` | Hoàn tất, Đã thanh toán |
| error | `#B42318` / `#FDEDEA` | `#F4B2A9` / `#432825` | Bị từ chối, lỗi cần xử lý |

Trong `palette.info/warning/error/success`, light `main` dùng màu chữ 700, `light` dùng nền 50, `dark` dùng 900, `contrastText` trắng. Dark `main` dùng chữ sáng ở bảng trên, `light` cùng màu main, `dark` dùng nền, `contrastText` dùng màu nền tương ứng. `signature` là nhóm riêng tại `theme.trustify.status.signature`, không truyền `color="signature"` vào MUI Chip nếu chưa khai báo variant tương ứng. `palette.secondary` dùng cùng họ brand; hành động phụ dùng `outlined`/`text`, không tạo màu xanh thứ hai để cạnh tranh primary.

[54 cặp màu đã tính tương phản](design/contrast-checks.json): chữ chính/phụ/link trên ba bề mặt, nút ở ba trạng thái, focus và border, selected và năm semantic ở hai mode. Mọi cặp kiểm tra đạt ngưỡng được ghi (4,5:1 chữ thường, 3:1 focus/biên). Ví dụ trắng/burgundy 7,13:1; chữ primary dark trên nút dark 9,33:1 (xem JSON để lấy kết quả tính chính xác). Viền/divider trang trí được loại khỏi yêu cầu chữ thường; không dùng làm placeholder hoặc nhãn. Các tổ hợp chưa kiểm tra không mặc nhiên đạt.

### 2.3. Ánh xạ scale hiện tại

Giữ tên export tạm thời để các import đang dùng không gãy; đổi dần component sang semantic, không thay global bằng regex. Phụ lục A liệt kê **mọi giá trị 50–900 mới**.

| Export hiện tại trong `src/config/theme/themePrimitives.js` | Scale đề xuất | Chuyển tiếp |
| --- | --- | --- |
| `primary[k]` | `brand[k]` | Giữ 500 = #AA1D39, 600 = #87172D; đưa `palette.primary` theo mode, không lấy 500 cố định trong dark |
| `gray[k]` | `neutral[k]` | `gray[500]` trở thành màu biên; mọi text từ index này phải đổi sang `text.secondary` |
| `dark[k]` | Alias `neutral[k]` | Deprecate direct import; không đồng nghĩa dark mode. Review từng nơi như tiêu đề Verify đang lấy `dark[500]` |
| `green[k]` | `success[k]` | Badge chữ lấy semantic fg, không dùng 500 tùy tiện |
| `red[k]` | `error[k]` | Không dùng error cho hành động thương hiệu |
| `yellow[k]` | `warning[k]` | Màu chữ warning 700, không dùng vàng sáng làm chữ trên trắng |
| `blue[k]` | `info[k]` | Thông tin/focus; thay `palette.info` đang trỏ nhầm họ primary |
| `black[k]` | Alias tạm, bảng dưới | Bỏ direct import theo từng PR; text = `text.primary`, không tìm/đổi theo tên màu |
| `white[k]` | Alias tạm, bảng dưới | Chữ nút = `primary.contrastText`; bề mặt = `background.paper` |

| Alias | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| black | #E5E1DC | #DBD7D2 | #9A9690 | #777A82 | #5D6068 | #42454C | #32353B | #24262B | #191B20 | #000000 |
| white | #FFFFFF | #FAF8F5 | #F1EEEA | #E5E1DC | #DBD7D2 | #9A9690 | #777A82 | #5D6068 | #42454C | #32353B |

Scale mới thêm `signature`. Không thay tất cả alias ngay ở PR tokens: giữ export compatibility với giá trị legacy trong giai đoạn đầu nếu còn màn hình chưa migrate; `palette` và `theme.trustify` dùng giá trị mới. Bảng mapping là **đích cuối** sau khi direct imports được review, không lệnh đổi nguyên scale trên mọi màn hình chưa QA. Chỉ xóa alias khi `rg` xác nhận hết người dùng.

### 2.4. Typography

Be Vietnam Pro 400/600, fallback `Arial, sans-serif`. Đặt `fontWeightRegular:400`, `fontWeightMedium:600`, `fontWeightBold:600`; review các weight500/700 cứng khi migrate để không phụ thuộc font tổng hợp. Không thêm họ chữ hoặc dependency; có thể self-host hai trọng lượng từ nguồn OFL đã đóng gói sau duyệt, giữ license. Hai `@import` Google Fonts hiện tại và provider auth sẽ được hợp nhất ở PR theme, không thêm preload URL chưa tồn tại.

| Vai trò MUI | Mobile | Desktop | Weight / line-height |
| --- | --- | --- | --- |
| h1 (hero) | 32px / 2rem | 48px / 3rem | 600 / 1,4 |
| h2 (tiêu đề trang) | 28px / 1,75rem | 36px / 2,25rem | 600 / 1,4 |
| h3 | 24px / 1,5rem | 28px / 1,75rem | 600 / 1,4 |
| h4 | 22px / 1,375rem | 24px / 1,5rem | 600 / 1,45 |
| h5 | 20px / 1,25rem | 22px / 1,375rem | 600 / 1,45 |
| h6 | 18px / 1,125rem | 20px / 1,25rem | 600 / 1,5 |
| subtitle1 | 18px | 18px | 600 / 1,6 |
| subtitle2 | 16px | 16px | 600 / 1,6 |
| body1 | 18px / 1,125rem | 18px | 400 / 1,65 |
| body2, input, button | 16px / 1rem | 16px | 400 nội dung, 600 nút/nhãn / 1,6 |
| caption, overline | 14px / 0,875rem | 14px | 400 hoặc 600 / 1,6; chỉ metadata phụ |

Base HTML 16px; cỡ triển khai dùng rem, không khóa zoom/scale text. Không buộc input một dòng bằng height cố định; min-height và padding. `font-variant-numeric: tabular-nums` cho tiền, số liệu, bảng. Nội dung hướng dẫn dài tối đa khoảng 72ch. Heading chọn theo ngữ nghĩa (mỗi trang một h1), có thể `component="h1" variant="h2"`.

Custom variant cũ `body3/body4` → 16px, `body5/caption1/caption2/caption3` → 14px metadata; `label` → 16px/600. Giữ alias tạm để không vỡ render, sau đó đổi call sites về body2/caption. Không giữ `caption3` 10px cho thông tin pháp lý/quan trọng. Desktop throughput dùng mật độ khoảng cách, không thu body dưới 16px.

Mẫu [brand diacritics](brand/previews/type-specimen.png) kiểm tra mọi cỡ theme cũ 10–64px; [mẫu cỡ mới](design/index.html#typography) kiểm tra **14,16,18,20,22,24,28,32,36,48px**, 400 và 600, chuỗi `ắ ầ ẩ ữ ợ ỹ`, “Hồ sơ công chứng”, “Nguyễn Thị Mỹ”. Yêu cầu không cắt dấu, không đặt line-height thấp, không áp letter-spacing âm cho tiếng Việt. Kiểm tra NFC và NFD cho tên nhập từ người dùng; không normalize dữ liệu gửi API ngoài logic đã có.

### 2.5. Spacing, radius, elevation, motion

- **Giữ MUI spacing base 8px** để `sx` cũ không đổi kích thước hàng loạt. Bước hợp lệ: 0, 0,5, 1, 1,5, 2, 3, 4, 5, 6, 8, 10, 12 → 0/4/8/12/16/24/32/40/48/64/80/96px. Không chuyển base từ 8 sang 4.
- Gutter trang: 16px mobile, 24px tablet, 32px desktop. Gap label–input 8px; field–helper 4px; giữa field 24px; nhóm nội dung 32px; section 48px. Card padding 16px mobile/24px desktop, toolbar 12–16px.
- Radius: control 8px (`shape.borderRadius`), card 12px, dialog 16px, status pill 999px. Không dùng bo tròn lớn cho mọi nút. MUI `sx borderRadius:2` = 2×shape, không phải token card 12px; dùng callback lấy `theme.trustify.radius.card` bằng chuỗi px để rõ nghĩa.
- Elevation: surface 0 (viền), nâng nhẹ 1 `0 2px 8px rgba(36,38,43,.08)`, menu 4 `0 8px 24px rgba(36,38,43,.14)`, dialog 8 `0 16px 48px rgba(0,0,0,.20)`. Dark dùng border và shadow đen (.30/.40/.50), không phủ trắng để tạo độ nổi. Các index shadow MUI khác giữ hợp lệ, không trả mảng rút ngắn.
- Chuyển trạng thái 120–160ms; panel 200ms; không animate màu/số liệu vô hạn, không `transition: all`. Tôn trọng `prefers-reduced-motion`; tắt shimmer khi giảm chuyển động. Loading không đặt phần trăm giả khi API không cung cấp tiến độ.
- Z-index theo MUI: app bar 1100, drawer 1200, modal 1300, snackbar 1400, tooltip 1500. Launcher trợ lý dưới modal (1050); khi mở panel dùng Dialog đúng layer/focus. Không đặt launcher cao hơn modal thanh toán/ký.

## 3. Layout theo vai trò

Giữ breakpoint MUI: xs0/sm600/md900/lg1200/xl1536. Toàn bộ flex/grid main có `min-width:0`; bỏ `minWidth` trang desktop và các width dạng `100vw` cộng sidebar gây tràn.

| Surface | Desktop | Mobile / zoom làm hẹp viewport |
| --- | --- | --- |
| Public | Header logo B + nav tác vụ; nội dung tối đa 1200px; form tra cứu/auth 480–560px | Logo + nút Mở menu 44px, Drawer nav tiếng Việt. Form và CTA một cột. Footer nhóm mục có heading/accordion |
| User | Sidebar 248px từ lg; main tối đa 1200px, form 720px + hướng dẫn phụ | Dưới lg: AppBar 64px + Drawer tạm, không giữ sidebar 288px. Header chỉ tên trang, CTA nằm trong nội dung |
| Notary/Admin | Sidebar 248px từ lg; main linh hoạt. Bảng rộng trong khung riêng. Review detail 40% thông tin / 60% preview từ lg | Drawer tạm; danh sách thành card; detail Dialog full-screen, tabs Thông tin/Tài liệu thay cho hai cột quá hẹp |
| Mọi vai trò | Header người dùng/account lấy dữ liệu có thật; link profile theo role hiện có | Menu đóng trả focus, selected có `aria-current`; không thêm bottom tab bar làm đổi toàn bộ thói quen điều hướng |

Layout là thay đổi trình bày; không thay `PublicRoute` redirect cho người đã đăng nhập hoặc `PrivateRoute.allowedRoles`. Shared `/verify`, `/profile`, `/payment/redirect` vẫn giữ quyền truy cập hiện có.

## 4. Thành phần và mapping MUI v6

Tài liệu [MUI v6 theme components](https://v6.mui.com/material-ui/customization/theme-components/) là căn cứ cho `defaultProps`, `styleOverrides`, `variants`. Ưu tiên theme cho appearance; composition nhỏ cho cấu trúc/semantics. Không thể sửa overflow trang, xử lý upload hay signature bằng theme đơn thuần.

### 4.1. Nút và hành động

- Primary contained burgundy, chữ contrastText, không gradient/shadow inset; hover/pressed theo token. Secondary outlined, biên inputBorder, nền surface; tertiary text. Nút destructive dùng error và xác nhận khi hành vi hiện có yêu cầu.
- Min-height mặc định 48px; small vẫn 44px, padding x16/x20, cho wrap chữ. Không cố định height khiến 200% text bị cắt. IconButton 44×44 tối thiểu, icon20–24, có `aria-label` tiếng Việt; giữ focus ring dù disableRipple.
- Loading giữ nhãn (“Đang gửi hồ sơ…”), spinner và `aria-busy`; chặn kích hoạt lặp ở UI trong cùng request, không đổi retry/network handler. Tránh disable không lời giải thích.
- **Mapping:** `customizations/inputs.js`: `MuiButtonBase`, `MuiButton` (root/containedPrimary/outlined/text), `MuiIconButton`. Xóa gradient gray của primary trong overrides cũ. Dùng Button component router Link cho navigation để không biến link thành hành động POST.

### 4.2. Input, CCCD, điện thoại, ngày, tiền

Label 16px/600 luôn hiện; placeholder 16px muted chỉ ví dụ, không thay label. Input min-height52px, padding12×16px; lỗi 16px gần field, `aria-invalid` và `aria-describedby`, không chỉ toast. Required hiển thị “(bắt buộc)” khi cần rõ; không đánh dấu tất cả bằng màu đỏ.

| Loại | Trình bày | Giữ nghiệp vụ / lưu ý |
| --- | --- | --- |
| CCCD riêng | input text + inputMode numeric; giữ số 0 đầu; ví dụ che dữ liệu | Không ép số bằng parseInt. Chỉ gợi 12 chữ số khi field thật là CCCD và validation hiện có yêu cầu |
| CMND/CCCD/Hộ chiếu hiện có | input text, nhãn đầy đủ; cho chữ/số theo rule hiện có | `requesterInfo.citizenId` hiện dùng chung, **không** áp regex 12 số cho mọi trường hợp |
| Điện thoại | type tel, autocomplete tel, inputMode tel; ví dụ 090 123 4567 | Không tự đổi +84, khoảng trắng hoặc số 0 trong payload ngoài logic hiện có |
| Ngày | text/calendar hiện có, nhãn định dạng `dd/mm/yyyy`, ví dụ 25/10/2026 | Trình bày bằng dayjs/Intl hiện có. Không tự đổi timestamp/timezone, min/max ngày hay wire format |
| Tiền | `Intl.NumberFormat('vi-VN', {style:'currency',currency:'VND'})`, ví dụ `1.250.000 ₫`; số tabular, canh phải trong bảng | Không coi amount ở wizard là tiền; không đổi số tiền hoặc làm tròn khác hợp đồng API. USD giữ đúng đơn vị nếu source USD |
| Số bản sao | Nhãn “Số bản sao”, số nguyên theo rule hiện có | `notarizationData.amount` = quantity. Không thêm ký hiệu ₫ hoặc mask tiền |

**Mapping:** `inputs.js`: `MuiTextField`, `MuiInputBase.input`, `MuiOutlinedInput.root/input/notchedOutline`, `MuiFormLabel`, `MuiInputLabel`, `MuiFormHelperText`, `MuiCheckbox`, `MuiRadio`, `MuiSwitch`, `MuiAutocomplete`. Dùng đúng notchedOutline hoặc border ngoài, không vẽ hai viền. Focus/error/disabled dùng selectors `.Mui-focused`, `.Mui-error`, `.Mui-disabled`. Checkbox/radio visual20px trong hit area44px; không giữ style 16px kèm margin của template. `navigation.js`: `MuiSelect.select/icon`, `MuiMenuItem.root` min44px. MUI X DatePicker đã cài: cấu hình locale/format tại provider/instance, không viết bằng override giả vào Material theme. Không cài date library mới.

### 4.3. Tải tài liệu và xem trước

Khối nhãn loại giấy tờ từ `required_documents` → mô tả ngắn → nút “Chọn tệp từ thiết bị” và “Chọn từ ví tài liệu” (secondary) → danh sách tệp (tên hiển thị, loại, dung lượng khi có) → Xem trước/Xóa tệp. Drag/drop chỉ bổ trợ, không bắt kéo thả; chỉ triển khai nếu không đổi handler và có bằng chứng browser support.

Giữ `.pdf,.docx,.png,.jpg` trong `VALID_FORMATS` hiện có; không tự thêm JPEG/HEIC, OCR, nén, scan hoặc giới hạn 10MB chưa được xác nhận. Nếu chưa có limit số byte trong contract, không bịa con số. PDF/image preview dùng logic hiện tại; DOCX fallback “Không xem trước được định dạng này. Mở tệp để xem.” Chỉ báo loading indeterminate khi không có progress thật. Tên dài wrap; filename/ID đổi tên nội bộ không lộ làm tên chính nếu đã có tên người đọc được.

**Mapping:** `surfaces.js` `MuiPaper/MuiCard`; `inputs.js` `MuiButton`, `MuiIconButton`; `feedback.js` `MuiLinearProgress`, `MuiDialog`; wrapper upload dùng style theo tokens. Tái dùng `FileUploadSection`, `UploadedFileList`, `UserWalletModal`, `FilePreviewModal`; bố cục và refs/focus cần sửa tại composition, giữ upload/metadata/fileIds/customFileNames và callbacks.

### 4.4. Stepper

Giữ 3 bước wizard: “Chọn loại công chứng” → “Cung cấp thông tin” → “Kiểm tra lại yêu cầu”. Desktop có số bước32px + nhãn; mobile “Bước 2/3 · Cung cấp thông tin” và thanh tiến độ, không minWidth connector120px. Hoàn tất bước có check + text, bước hiện tại `aria-current="step"`; số bước không giả làm nút nếu không có click handler. “Quay lại” luôn là phụ; “Gửi hồ sơ” chỉ bước3. Focus vào heading bước hoặc field lỗi đầu khi chuyển/validation theo kết quả hiện có.

**Mapping:** `navigation.js` `MuiStepper`, `MuiStep`, `MuiStepLabel`, `MuiStepIcon`, `MuiStepConnector`; sửa `CreateNotarizationProfileStepper` để bỏ icon number nhỏ12px và connector cứng. Giữ currentStep và validation checks; không biến các bước chưa hoàn tất thành navigation tự do.

### 4.5. Status chip và tiến trình

Pill min32px, text14px/600 + icon16px, padding6×12; dòng quan trọng mô tả16px ngoài badge. Badge không click chỉ là text, không cần44px; filter/chip click được có hit area44px và trạng thái selected/aria-pressed. Label wrap thay vì cắt dấu/ellipsis khó đọc. Dùng adapter hiển thị cùng dictionary, không thay raw enum.

**Mapping:** `dataDisplay.js` `MuiChip.root/label/icon`; một wrapper `DocumentStatusChip` dự kiến nhận raw status + optional secondary step, style qua `theme.trustify.status`. `StatusBox`, `VerificationStatusBox` có ngữ nghĩa khác nhau, không merge thành một “success” chung. Lifecycle chi tiết ở mục5.

### 4.6. Bảng và card mobile

Desktop: heading + số lượng nếu có → tìm kiếm/filters → hàng tiêu đề có nhãn → rows ít nhất56px (48px cho tác vụ dày nhưng mọi nút vẫn44px) → pagination tiếng Việt. Identifier dài chỉ rút gọn trực quan khi có cách xem/copy toàn bộ; tooltip không phải cách duy nhất. Không làm toàn hàng click là lối vào duy nhất; có nút/link “Xem hồ sơ”. Giữ selection/sort/filter/page/limit hiện tại; không thêm bulk approve, export hay server-side search mới.

Dưới md hoặc container quá hẹp: cùng tập dữ liệu/page thành card với nhãn rõ (Mã hồ sơ, Ngày gửi, Trạng thái, Dịch vụ), CTA cuối card; chỉ một rendition hiện diện trong accessibility tree. Không hiển thị đồng thời table và cards bằng CSS opacity. Hai bảng quản trị hồ sơ/phiên vẫn là hai vùng với trạng thái riêng.

**Mapping:** `dataDisplay.js` `MuiTable`, `MuiTableHead`, `MuiTableCell`, `MuiTableRow`, `MuiTableSortLabel`, `MuiTablePagination`; `MuiDataGrid` (X v7 đang cài) trong cùng file hoặc file dataGrid.js mới khi triển khai. `MuiDataGrid` không là Material Table: dùng styleOverrides root/columnHeaders/cell và localeText/slots hỗ trợ bản X hiện có; không dùng Pro-only API. “Số dòng mỗi trang”, “Không có dữ liệu”, aria labels pagination. Adapter card là composition, không “theme responsive DataGrid” một cách giả định. Responsive wrapper giữ state trên parent để không reset page khi resize.

### 4.7. Modal, toast, trạng thái tải/trống/lỗi

- Dialog: max-width560px form nhỏ, 960px chi tiết, tới1280px review tài liệu; dưới sm/md tùy loại dùng full-screen. Header rõ + Đóng44px, content scroll riêng, footer trong flow hoặc sticky có phần đệm; không che hàng cuối ở zoom. Escape đóng nếu hành vi hiện cho phép; có trạng thái unsaved không tự thêm auto-save/discard policy. Focus trap, focus ban đầu hợp lý, restore opener. `Modal` cũ có thể đổi sang `Dialog` nhưng giữ props/callbacks và điều kiện đóng.
- Toast: giữ **react-toastify** để không thêm hai hệ thống thông báo. Theme MUI không tự style ToastContainer. Adapter CSS lấy semantic tokens/font/44px close và `role=status` cho thông báo thường, `alert` cho lỗi quan trọng. Lỗi field hiển thị gần trường; lỗi ảnh hưởng tiền/ký tồn tại trên trang, không biến mất sau 2,5s. Không tự đổi global timer/redirect nghiệp vụ trong PR theme; persistence chỉ cho các thông báo được phân loại và review.
- Empty: tiêu đề “Chưa có hồ sơ…” + lý do phù hợp + CTA hiện có; tìm kiếm rỗng có “Không có kết quả phù hợp” + Xóa bộ lọc. Không dùng vùng trắng hoặc số trang1 làm empty state.
- Loading: Skeleton đúng bố cục rồi dữ liệu, `aria-busy`; chỉ một thông báo aria-live “Đang tải hồ sơ…”. Không vô hạn spinner nếu handler đã có error. Không tự thêm polling, retry/backoff, timeout, caching hoặc network request.
- Error: tóm tắt tự nhiên + “Thử lại” gọi lại read handler hiện có khi an toàn, giữ thông tin đã nhập và mô tả lỗi từ hiện trạng. Mutation không auto-retry để tránh gửi trùng. Nếu source đang nuốt lỗi (PendingPayments), không giả hiển thị data lỗi chưa có; phân loại issue để review khi đến component đó.

**Mapping:** `feedback.js` `MuiAlert` variants theo severity (bỏ override vàng cho mọi loại), `MuiAlertTitle`, `MuiDialog.paper`, `MuiDialogTitle`, `MuiDialogContent`, `MuiDialogActions`, `MuiLinearProgress`, `MuiCircularProgress`, `MuiSkeleton`. `surfaces.js` `MuiPaper`, `MuiCard`. Nếu Snackbar MUI đã xuất hiện ở đâu thì style tương thích, nhưng không chuyển toàn bộ Toastify sang MUI trong redesign.

### 4.8. Navigation và trợ lý

`Header`, `Sidebar`, `Footer`, `SidebarItem` dùng tokens; brand B luôn đồng nhất. Sidebar selected có vạch dọc, chữ600, nền selected, `aria-current=page`. Menu nhỏ dùng Drawer tạm, đóng khi chọn link, trả focus; giữ các route/quyền đang có. Tên người dùng là text không thay avatar bằng thông tin giả. Không thêm dashboard SaaS với search global, workspace switcher hay nhiều dãy KPI cho User.

Trợ lý: launcher48px có text/aria-label “Mở trợ lý”; panel360px desktop, gần toàn màn hình mobile, tối thiểu ô nhập16px; giữ lịch sử/chat service. Không mở tự động hoặc chặn công việc chính. Ngữ cảnh trả lời là hướng dẫn, không tư vấn pháp lý. Mở trên mọi trang bằng mount phù hợp trong `App.js` ở PR shared components, không truyền token/hồ sơ làm ngữ cảnh mới. Không đổi send payload, chỉ rendering/focus/layout; tooltip không thay accessible name.

**Mapping:** `navigation.js` `MuiAppBar`, `MuiToolbar`, `MuiDrawer`, `MuiMenu`, `MuiMenuItem`, `MuiListItemButton`, `MuiTabs`, `MuiTab`, `MuiLink`, `MuiPaginationItem`. `dataDisplay.js` List/Icon/Text. Trợ lý dùng Dialog + TextField + IconButton; source hiện dùng SVG onClick và `3vw`, cần sửa composition thành button44/48px.

### 4.9. Signature pad

Giữ `react-signature-canvas`, callbacks `toBlob`/onSignatureSave và payload hiện có của `NotaryFeedback`/`SessionFeedback`. Canvas nằm trong khung trắng rộng100%, min-height240px; tính kích thước từ container thay `width - 600` có thể âm trên điện thoại. Resize/DPR phải bảo toàn nét vẽ đã có (toData/fromData tương thích thư viện), không xóa chữ ký khi xoay thiết bị hoặc đổi tab. Không CSS-scale bitmap khiến nét lưu sai tọa độ; trước PR kiểm tra tọa độ pointer và PNG đầu ra với DPR1/2.

Nhãn: “Vẽ chữ ký”, trợ giúp “Ký trong khung bên dưới”; “Xóa và ký lại” phụ, “Lưu chữ ký” chính. Nếu action cuối thực sự là ký số theo workflow, dùng nhãn ký số cho action đó và giữ bước xác nhận; không đánh đồng ảnh chữ ký với chữ ký số/chứng thư. Empty canvas không lưu; thông báo kiểm tra này nếu chưa có là presentation guard cần test với callback cũ, không tạo server validation mới.

Keyboard tới heading, hướng dẫn, Xóa/Lưu/Đóng; canvas có accessible description nhưng không giả chữ ký bằng tên gõ. Với việc vẽ đường nét mang tính thiết yếu, ghi rõ giới hạn tương tác không gian; không tuyên bố toàn bộ tính năng ký đạt keyboard accessibility chỉ nhờ thêm aria-label. Nếu cần phương án ký tương đương cho người không vẽ được, phải có quyết định nghiệp vụ riêng, không tự thêm tải ảnh/chữ ký gõ làm thay đổi tính pháp lý. Xem [WCAG Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html).

**Mapping:** frame `MuiPaper` (surfaces), helper `MuiTypography`, actions `MuiButton` (inputs), dialog (feedback). Canvas không có override `MuiSignaturePad`; style wrapper dùng tokens, handler nằm tại component hiện có.

## 5. Ngôn ngữ vòng đời hồ sơ

```text
Chờ xử lý → Đang xử lý → Chờ ký số → Hoàn tất
                  └──────────────→ Bị từ chối
Thanh toán: Chờ thanh toán / Đã thanh toán (thông tin song song)
Bản ghi: Có bản ghi được cấp / chưa có thông tin (thông tin song song)
```

Sơ đồ là mô hình giao tiếp, không phải state machine thay thế backend. Không ép tất cả hồ sơ qua mọi mốc, không tạo transition hoặc nút cho phép client thay enum.

| Raw trạng thái hồ sơ | Nhãn bắt buộc mọi nơi | Màu / icon đề xuất | Bước tiếp theo hiển thị |
| --- | --- | --- | --- |
| pending | Chờ xử lý | warning / ScheduleOutlined | Công chứng viên sẽ kiểm tra hồ sơ; không hứa thời hạn |
| processing | Đang xử lý | info / PendingActionsOutlined | Theo dõi yêu cầu bổ sung nếu có feedback |
| verification (đã có trong source) | Đang xử lý + dòng phụ “Bước xác minh” | info / FactCheckOutlined | Giữ raw verification, filter có thể ghi “Đang xử lý · Xác minh” để phân biệt lựa chọn cũ |
| digitalSignature | Chờ ký số | signature / DrawOutlined | Xem yêu cầu ký theo dữ liệu và quyền hiện có |
| completed | Hoàn tất | success / TaskAltOutlined | Kiểm tra thanh toán và tài liệu được cấp; không suy ra đã mint |
| rejected | Bị từ chối | error / HighlightOffOutlined | Xem lý do thực có, không tự đưa hướng “Gửi lại” nếu chưa hỗ trợ |
| không nhận biết / thiếu | Chưa có thông tin trạng thái | neutral / HelpOutline | Không giả Hoàn tất; giữ raw cho debug nhưng không in lỗi kỹ thuật cho người dùng |

Không dùng “Sẵn sàng ký số”, “Hoàn thành”, “Không hợp lệ” thay các nhãn chính. Raw values/data objects giữ nguyên. `STATUS_TYPES` và chart legend/filter/tab dùng dictionary hiển thị thống nhất; current filters có phụ thuộc label cần adapter đảm bảo tập kết quả cũ trước/sau tương đương. `readyToSign` và `approvalStatus` của phiên là hệ riêng, không rename thành document status; tiêu đề ký có thể nhất quán nhưng điều kiện quyền không gộp.

### Thanh toán và bản ghi blockchain

- UI payment `pending` → **Chờ thanh toán**, `paid` → **Đã thanh toán** là tên hiển thị chuẩn. Service hiện trả status `pending/success/failed/cancelled`, callback dùng `PAID/CANCELLED`: adapter hiển thị `success` thành Đã thanh toán khi chính dữ liệu đó được phép dùng, **không đổi wire enums**. `failed/cancelled` có nhãn đúng tình trạng khi có dữ liệu, không suy ra từ màu hồ sơ.
- Banner `PendingPayments` giữ mỗi khoản một `checkoutUrl`; hiển thị mã hồ sơ/phiên, số tiền và **“Thanh toán”**. Bản mobile CTA dưới nội dung. Không biến click thành mint hoặc đánh dấu paid cục bộ. Khi nhiều khoản, từng banner có nhãn và CTA riêng; không gộp thanh toán hàng loạt.
- `minted` là nhãn trình bày khi response có bản ghi/nftItem thực, không thêm thuộc tính backend. Dùng **“Đã tạo bản ghi blockchain”**, phụ **“Mạng thử nghiệm Solana devnet”**; tài liệu đang ở ví không có nghĩa pháp lý được xác nhận độc lập.
- Nếu đã thanh toán nhưng chưa có NFT trong dữ liệu: chỉ nói **“Chưa có bản ghi trong ví tài liệu.”** Không khẳng định “đang tạo” khi không có job state, không spin/poll tự động. Nếu trạng thái mint lỗi không được API cung cấp, không bịa lỗi hoặc CTA mint lại.
- Trang verify chỉ đối chiếu thông tin bản ghi theo mint address; không dùng check xanh đồng nghĩa “nội dung văn bản đúng” hoặc “giá trị pháp lý được bảo đảm”.

## 6. Accessibility và kiểm chứng

Mục tiêu WCAG AA; **44px** là chuẩn chạm sản phẩm theo yêu cầu người dùng, chặt hơn mức tối thiểu24px của WCAG2.2 AA SC2.5.8 trong một số điều kiện. Không gọi44px là ngưỡng AA bắt buộc cho mọi inline link. Nguồn: [W3C Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

| Yêu cầu | Cách kiểm tra ở PR triển khai |
| --- | --- |
| Contrast | Chữ thường ≥4,5:1, chữ lớn ≥3:1, biên/icon cần nhận biết/focus ≥3:1; cả hai mode. Kiểm tra ảnh chữ/charts riêng, không chỉ palette |
| Keyboard | Tab theo DOM, focus nhìn rõ, link/nút có tên, menu/dialog trap và trả focus, Enter/Space đúng semantics; không dựa vào hover-only |
| 200% text | Zoom browser thật200% và text-only resize nếu hỗ trợ; label/CTA/helper không cắt, modal/footer không che nội dung. [W3C Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) |
| Reflow | 320/390/768/1440px; nội dung chính không cuộn ngang, bảng rộng trong khung riêng hoặc mobile card. Không đặt user-scalable=no |
| Form | Label liên kết input; trợ giúp/lỗi qua aria-describedby; tên accessible của icon password/upload; tổng kết lỗi nếu nhiều field |
| Status & loading | Badge có text; thông báo aria-live một lần, không đọc lại bảng toàn bộ; skeleton không tạo hàng giả cho screen reader |
| Chart.js | Canvas có tên và mô tả; cùng dữ liệu có bảng HTML, đơn vị VND/% rõ; legend text, pattern/line style hoặc phân vùng biên để không chỉ dựa vào màu |
| Signature | Keyboard tới controls và hướng dẫn; pointer geometry/DPR; mô tả giới hạn spatial input, không tự coi pad là workflow ký thay thế |
| Hình/tài liệu | Ảnh trang trí alt rỗng; preview iframe có title tiếng Việt, fallback mở tệp; tệp gốc không đảo màu |
| Chatbot | Nút mở44/48px, panel tên rõ, Đóng trả focus, message live polite có kiểm soát; không cướp focus khi mới tới trang |

[Kiểm tra proposal](design/validation.md) chỉ chứng minh mock/contrast/font đã xét, không thay audit app sau triển khai. Trước mỗi role PR cần dùng data QA đại diện (rỗng/có dữ liệu/lỗi/hồ sơ dài) và không thực hiện thanh toán/ký thật chỉ để chụp ảnh.

## 7. Kế hoạch tích hợp MUI và di chuyển

### 7.1. Hiện trạng đã đọc

- `App.js` gọi `createTheme(getDesignTokens())`; chưa compose các object trong `customizations/`. Các file template hiện có style primary xám/gradient và control36–40px; không thể chỉ sửa primary để đạt nhận diện.
- SignIn/SignUp và TemplateFrame dùng provider lồng gọi `getAuthTheme`. `getAuthTheme` chỉ trả primitives; `getSignUpTheme.js` có Inter/màu xanh nhưng không được import trong luồng active đã tìm. Không chỉnh file chết rồi kỳ vọng UI đổi.
- `MuiAlert` hiện vàng cho mọi severity; stepper template giấu số; toast dùng Toastify; chart config dùng Roboto/#000; signature pad width-600. Các điểm này có owner cụ thể trong bảng dưới.
- Đếm ban đầu 1.620 `sx={{}}` tại142file. Con số là baseline tìm kiếm text, không metric chất lượng; `sx` vẫn phù hợp layout riêng theo màn hình.

### 7.2. Ownership và tái sử dụng

| Có sẵn | Quyết định | Việc thay đổi về trình bày |
| --- | --- | --- |
| `Header`, `Sidebar`, `Footer`, `static/SidebarItem` | Tái dùng, hợp nhất nav presentation | Responsive drawer, logo B, selected/focus, label Việt; giữ route/role |
| `CreateNotarizationProfileStepper` | Tái dùng handler, thay render | Bước mobile gọn, giữ3bước; bỏ width cố định |
| `CustomTextField`, `CustomAutocompleteField`, `modals/LabeledTextField` | Hợp nhất style qua theme; wrapper chỉ giữ label/helper cần thiết | Không gom logic validation/state vào design-system form engine |
| `FileUploadSection`, `UploadedFileList`, `UserWalletModal` | Tái dùng | Layout/tokens/actions accessible, giữ FormData và callback |
| `services/FilePreviewModal`, `notary/FileField` | Một presentation preview chung khi props tương thích | Giữ fetch IPFS/blob hiện có, không gộp nguồn metadata thành API mới |
| `services/StatusBox`, `StatusFilterButton`, `VerificationStatusBox` | Dictionary chung + wrapper chip, giữ các panel khác nghĩa | Đổi label và màu, không gộp verify success vào completed |
| `HorizontalCard`, `BoxCard` trong ví | Hợp nhất nội dung card shared, hai layout responsive | Một formatter ngày/tiền/label; giữ share/purchase/transfer callback |
| `HistoryDataTable` và skeleton | Tái dùng state + thêm card rendition | Không tạo lần fetch thứ hai khi đổi breakpoint |
| Admin `employee-management/DataTable`, `user-management/UserDataTable`, notary-management grids | Chia sẻ style/toolbar/empty/pagination nhỏ | Giữ columns/permissions/controller mỗi domain; không một “UniversalCrud” |
| Notary `NotaryDocumentCard`, `NotarySessionCard`, `HistoryCard`, `RecentlyDocuments` | Tái dùng nội dung, cải thiện khả năng quét | Lựa chọn queue/table tùy dữ liệu, giữ history event |
| `DetailDocumentModal`, `DetailHistoryDocumentModal`, `DetailProcessingSessionModal`, `DetailReadyToSignSessionModal`, `HistoryDetailModal` | Shared shell/tài liệu preview, giữ nội dung và mutation theo role | Hai cột desktop, fullscreen mobile; không một modal khổng lồ chứa mọi nghiệp vụ |
| `payment/PendingPayments`, `PaymentSuccess`, `PaymentCancel`, `PaymentRedirect` | Tái dùng, chỉ presentation | Banner, copy, padding, focus; không đổi checkoutUrl/callback/query handling |
| `NotaryFeedback`, `SessionFeedback` | Hợp nhất signature frame/controls, giữ callbacks riêng | Container sizing, keyboard controls, không thay đổi PNG/Blob contract |
| `profile/InfoField`, admin InfoField variants | Hợp nhất presentation label/value khi props tương thích | Giữ nguồn dữ liệu và quyền hiển thị |
| `ChatAssistant`, `Chatbox` | Tái dùng, thay launcher/panel presentation | Mount mọi page, bỏ3vw, giữ send handler |
| `Loader`, Skeleton variants | Tái dùng/merge visual loading | Không thêm global loading state hoặc đổi điều kiện request |
| `chartConfig.js`, admin chart sections | Tái dùng Chart.js | Font, màu, legend/tick contrast; HTML data equivalent, giữ dataset |
| `Settings` placeholder | Restyle thông báo hiện tại | Không thêm settings backend hoặc toggle không hoạt động |

### 7.3. Cách compose theme dự kiến (chỉ mã minh họa trong tài liệu)

```js
// Khi triển khai: một factory dùng chung, không thêm UI kit.
const base = getDesignTokens(mode); // default mode 'light', có semantic + trustify
const themeOptions = {
  ...base,
  components: mergeComponentKeys(
    base.components,
    inputsCustomizations,
    dataDisplayCustomizations,
    feedbackCustomizations,
    navigationCustomizations,
    surfacesCustomizations,
  ),
};
```

`mergeComponentKeys` ở đây là pseudocode: triển khai merge theo từng `Mui*`, từng `defaultProps/styleOverrides/variants` khi trùng; không ghi đè cả `components` hoặc dùng `...` làm rơi `MuiMenuItem` cũ mà không review. Tốt hơn gom mỗi Mui key về một owner duy nhất trong folder, rồi compose không trùng; thêm kiểm tra duplicate owner thay vì phụ thuộc thứ tự merge. Theme có `MuiCssBaseline` cho body/font/focus/link global phù hợp. Memoize theme theo mode; auth provider dùng cùng factory hoặc bỏ provider dư nếu không cần, không tắt auth guard/state.

Dark mode tokens đầy đủ nhưng không tự thêm cài đặt người dùng hoặc lưu server. Giữ light là mặc định trong đợt migrate; bật dark vào app khi các route của đợt đó đã kiểm tra và cách chọn mode thống nhất được duyệt, không để auth light riêng với shell dark. Xem [MUI v6 dark mode](https://v6.mui.com/material-ui/customization/dark-mode/). Không áp dụng API v7 hoặc thay MUI version.

### 7.4. Di chuyển 1.620 sx có kiểm soát

1. Chụp baseline theo audit và lưu dấu commit; kiểm kê `rg -n 'sx=\{\{|#[0-9A-Fa-f]{3,8}|linear-gradient|minWidth|100vw' src`. Phân nhóm màu/type/control lặp so với layout riêng, không đo hoàn tất bằng số sx giảm.
2. Theme PR thêm tokens/overrides có kiểm soát; giữ alias legacy ở màn hình chưa migrate. Không thay `spacing` base, global typographic element hay borderRadius một cách không chụp ảnh toàn bộ.
3. Dời style appearance lặp (button, input, chip, card, modal) vào owner theme. Tại từng call site xóa `sx` xung đột để theme có tác dụng; giữ grid/gap/breakpoint riêng bằng tokens. Không đánh `!important` lên theme để thắng mọi inline style.
4. Trích wrapper nhỏ khi có ít nhất2–3 ngữ cảnh thật dùng chung cấu trúc, ví dụ status chip hoặc file preview shell. Trước merge giữ callbacks/state ở parent. Không viết abstraction chỉ để đổi tên Box.
5. Migrate màn hình theo thứ tự User → Notary → Admin → Public; chặn thêm hardcoded appearance trong vùng đã migrate qua review, không buộc xóa mọi sx trong toàn repo cùng lúc. Ghi số direct color imports/hardcodes còn lại theo folder vào PR.
6. Sau role cuối: `rg` xác nhận không còn alias consumers cần xóa, dọn template chết (`getSignUpTheme`) ở PR riêng nếu được xác minh không dùng. Không xóa unused code phục vụ việc khác chỉ vì audit thương hiệu.

### 7.5. Chuỗi PR sau khi giai đoạn 2 được duyệt

| PR | Phạm vi | Before/after và kiểm tra trọng tâm |
| --- | --- | --- |
| 01 — Logo B / favicon / public assets | Outline wordmark, hint favicon16/32, 192/512, manifest, asset imports | Header/footer, favicon/appicon; không đổi tên route hoặc schema |
| 02 — Tokens / theme overrides | Factory chung, semantic, type, controls và alias strategy; không migrate mọi screen | Auth + form + trạng thái + dark preview; tất cả route spot check do global impact |
| 03 — Shared components | Nav, status chip, form labels, upload/preview, table/card, modal, toast, signature frame, chatbot | State fixtures, mobile menu, focus trap, chip labels, pad DPR và panel width |
| 04+ — User | Wizard → history/Thanh toán → session → wallet → shared profile/payment presentation; chia thành PR nhỏ nếu cần | Ba bước wizard, filter/data equality, banner URL, empty/populated, mobile and desktop |
| 05+ — Notary | Dashboard → pending → awaiting signature → sessions → history; có preview hai cột | Queue/pagination giữ nguyên, quyền/handler không đổi; không ký/approve thật để QA visual |
| 06+ — Admin | Dashboard/charts → employee → user → notarization → settings placeholder | Dataset/tổng số trước sau tương đương, bảng HTML, tiếng Việt, empty response |
| 07+ — Public | Home/services → lookup/verify → auth → pricing/guide/policies | Mobile-first, anonymous/auth guard parity, copy claims, trạng thái tìm kiếm |

Mỗi PR có `CI=false npm run build` và before/after desktop/mobile, ghi width/mode/data state/commit tương ứng; ảnh mock phase2 không thay after screenshot của app. Với shared changes, đối chiếu các route bị ảnh hưởng, không chỉ trang demo. Build xanh chưa đủ: kiểm tra hành động chính còn gọi đúng callback, payload không đổi, không mất filters/selection/currentStep, không phát sinh fetch/mutation ngoài scope.

Không viết test ảnh hưởng thấp chỉ để soi implementation; nơi rủi ro có test có ý nghĩa: dictionary giữ raw/filter set; formatter không mất số0 hoặc coi quantity là tiền; banner giữ checkoutUrl; signature resize bảo toàn dữ liệu; dialog keyboard/focus; table/card dùng cùng state; role route parity. Tận dụng test tooling có sẵn, không thêm UI kit/Tailwind.

## 8. Ranh giới và mốc duyệt

Cải thiện UX có thể đòi thay đổi business logic được ghi riêng: payment query chưa xác định/callback failure, PendingPayments nuốt error, notary/admin pagination NaN, save signature Blob semantics, và phương án ký thay thế. Những vấn đề này không được sửa ngầm trong PR theme. UI không được thêm chức năng “Lưu nháp”, ký hàng loạt, mint lại, giá mới, hạn xử lý, export mới hay settings API.

**Đã duyệt giai đoạn 2:** light/dark tokens; định dạng và component rules; nav/table/card/review layout; wireframe từng role; migration order. Người dùng đã phê duyệt và yêu cầu PR production đầu tiên cho logo B, favicon và public brand assets. Các đợt triển khai tiếp theo giữ thứ tự đã thống nhất; không gộp chúng vào PR 01.


## Phụ lục A — Toàn bộ scale đề xuất

Nguồn tái tạo: [tokens.json](design/tokens.json). Các scale là primitive bất biến; dark mode chọn semantic token phù hợp, không đảo ngược số scale.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| brand | `#FCF5F7` | `#F8EDF0` | `#EED3D9` | `#DDA6B1` | `#CB7689` | `#AA1D39` | `#87172D` | `#641123` | `#450C18` | `#23060C` |
| neutral | `#FAF8F5` | `#F1EEEA` | `#E5E1DC` | `#DBD7D2` | `#9A9690` | `#777A82` | `#5D6068` | `#42454C` | `#32353B` | `#24262B` |
| success | `#EAF5EF` | `#D2EADD` | `#ACD7BE` | `#81C2A0` | `#57A882` | `#308158` | `#26734C` | `#196642` | `#145035` | `#103D29` |
| error | `#FDEDEA` | `#FAD5CF` | `#F4B2A9` | `#EB8E82` | `#D96254` | `#C64032` | `#BC3022` | `#B42318` | `#8C1C13` | `#68150F` |
| warning | `#FFF3D6` | `#FFE5AD` | `#F2D18A` | `#E6BD60` | `#D8A63B` | `#C88A18` | `#A66D08` | `#805300` | `#674300` | `#4D3200` |
| info | `#EDF4FC` | `#D5E5F8` | `#B5D0EF` | `#91B7E2` | `#6898CC` | `#417BB6` | `#326BA8` | `#245C9A` | `#1C4879` | `#15365C` |
| signature | `#F3EEFA` | `#E5DAF3` | `#CFBBE8` | `#B99CDB` | `#A17ECD` | `#8861BB` | `#7650AA` | `#67429A` | `#513479` | `#3B2659` |


## Phụ lục B — Đặc tả và wireframe từng màn hình

Các khung dưới đây là thứ tự và cấu trúc thông tin. [Bảng duyệt tương tác](design/index.html) hiển thị cùng dữ liệu và mock đại diện; [screens.json](design/screens.json) là bản máy đọc được. Desktop công chứng viên/quản trị ưu tiên thông lượng; mobile không yêu cầu cuộn toàn trang theo chiều ngang.

### home — Công chứng trực tuyến

- **Vai trò / route:** public · `/`.
- **Hành động chính:** Tạo hồ sơ công chứng
- **Giữ lại:** `src/pages/home/Home.js`.
- **Chi tiết:** Giữ CTA hiện tại và guard chuyển hướng theo role. Bỏ danh xưng quốc gia, hạng nhất và số đánh giá chưa có bằng chứng. Chỉ hiển thị đơn vị/đối tác đã được xác minh; không thêm huy hiệu pháp lý.

Wireframe desktop:

```text
│ Thanh đầu: logo B · Dịch vụ · Tra cứu · Xác minh · Đăng nhập
│ Hồ sơ rõ ràng. An tâm từng bước. | Tạo hồ sơ công chứng
│ Chuẩn bị giấy tờ → Gửi hồ sơ → Theo dõi và nhận kết quả
│ Dịch vụ thường dùng · Hướng dẫn · Liên hệ · Chính sách
```

Wireframe mobile:

```text
↓ Logo B + nút Mở menu
↓ Tiêu đề → mô tả ngắn → Tạo hồ sơ công chứng
↓ Các bước xếp dọc → dịch vụ → chân trang gọn
```

### services — Dịch vụ công chứng

- **Vai trò / route:** public · `/services`.
- **Hành động chính:** Tạo hồ sơ
- **Giữ lại:** `src/pages/services/Services.js`.
- **Chi tiết:** Dữ liệu lĩnh vực/dịch vụ giữ service hiện có. Một CTA chính trên mỗi thẻ, không thêm giá/thời gian xử lý nếu response không có. Tìm kiếm không làm thay đổi dữ liệu.

Wireframe desktop:

```text
│ Tiêu đề + tìm dịch vụ
│ Danh sách lĩnh vực | Thẻ dịch vụ: tên · giấy tờ · Tạo hồ sơ
│ Hướng dẫn quy trình và phạm vi áp dụng
```

Wireframe mobile:

```text
↓ Tìm dịch vụ toàn chiều ngang
↓ Bộ lọc lĩnh vực mở gọn
↓ Thẻ dịch vụ một cột, CTA trong từng thẻ
```

### lookup — Tra cứu trạng thái hồ sơ

- **Vai trò / route:** public · `/lookup`.
- **Hành động chính:** Tra cứu
- **Giữ lại:** `src/pages/services/LookupNotarizationProfile.js`.
- **Chi tiết:** Phân biệt lookup trạng thái với verify bản ghi. Không hứa tìm bằng tên/CCCD. Không mở rộng dữ liệu cá nhân trong kết quả; giữ response hiện tại.

Wireframe desktop:

```text
│ Tiêu đề + nơi lấy mã
│ Mã hồ sơ [________________] [Tra cứu]
│ Kết quả: mã · loại dịch vụ · trạng thái · thông tin hiện được phép công khai
```

Wireframe mobile:

```text
↓ Nhãn và ô mã toàn chiều ngang
↓ Tra cứu dưới ô nhập
↓ Kết quả dạng card, chuỗi mã xuống dòng
```

### verify — Xác minh hồ sơ công chứng

- **Vai trò / route:** public · `/verify`.
- **Hành động chính:** Xác minh
- **Giữ lại:** `src/pages/services/VerifyNotarizationProfile.js`.
- **Chi tiết:** Giữ NFTService.getNFTMetadata(mint). Nhãn thân thiện không thay loại ID. Không diễn giải response mint thành bảo đảm pháp lý hoặc đã kiểm tra nội dung tệp.

Wireframe desktop:

```text
│ Giải thích: đối chiếu thông tin bản ghi tài liệu
│ Mã bản ghi (địa chỉ mint NFT) [________________] [Xác minh]
│ Kết quả tìm thấy / không tìm thấy / chưa tải được; mạng devnet
```

Wireframe mobile:

```text
↓ Hướng dẫn lấy mã từ ví tài liệu
↓ Trường mã cho phép dán và xuống dòng kết quả
↓ Card kết quả với nhãn mạng thử nghiệm
```

### pricing — Bảng giá dịch vụ

- **Vai trò / route:** public · `/pricing`.
- **Hành động chính:** Liên hệ tư vấn
- **Giữ lại:** `src/pages/static/product/Pricing.js`.
- **Chi tiết:** Không quy đổi giá USD đang có sang VND bằng tỷ giá tự đặt. Nội dung VND dùng formatter chung khi giá thực có. Dùng CTA liên hệ hiện có; không thêm quy trình đăng ký gói hoặc thanh toán gói.

Wireframe desktop:

```text
│ Phân biệt gói cho văn phòng với phí từng hồ sơ
│ Các gói: phạm vi · mức giá hiện có · điều kiện · CTA hiện có
│ Thông tin phí và cách liên hệ
```

Wireframe mobile:

```text
↓ Giới thiệu rõ đối tượng văn phòng
↓ Các gói một cột, không carousel
↓ Giá và đơn vị ngay dưới tên gói
```

### privacy — Chính sách bảo mật

- **Vai trò / route:** public · `/privacy-policy`.
- **Hành động chính:** Xem mục liên quan
- **Giữ lại:** `src/pages/static/policy/PrivacyPolicy.js`.
- **Chi tiết:** Phạm vi dữ liệu · quyền truy cập · liên hệ. Giữ nội dung nghĩa vụ hiện tại; biên tập câu chữ cần kiểm tra chủ sở hữu chính sách, không tự tạo thời hạn, đảm bảo bảo mật hay quyền mới. Không có nút gửi giả.

Wireframe desktop:

```text
│ Tiêu đề · ngày cập nhật khi có căn cứ
│ Mục lục bên trái | Nội dung rộng tối đa 72ch
│ Phạm vi dữ liệu · quyền truy cập · liên hệ
│ Liên hệ theo thông tin đã xác nhận
```

Wireframe mobile:

```text
↓ Tiêu đề → Mục lục mở gọn
↓ Nội dung một cột, heading rõ, link mục neo
↓ Liên hệ cuối bài
```

### payment-policy — Bảo mật thanh toán

- **Vai trò / route:** public · `/payment-security`.
- **Hành động chính:** Xem mục liên quan
- **Giữ lại:** `src/pages/static/policy/PaymentSecurity.js`.
- **Chi tiết:** Phương thức hiện hỗ trợ · thông tin giao dịch · liên hệ. Giữ nội dung nghĩa vụ hiện tại; biên tập câu chữ cần kiểm tra chủ sở hữu chính sách, không tự tạo thời hạn, đảm bảo bảo mật hay quyền mới. Không có nút gửi giả.

Wireframe desktop:

```text
│ Tiêu đề · ngày cập nhật khi có căn cứ
│ Mục lục bên trái | Nội dung rộng tối đa 72ch
│ Phương thức hiện hỗ trợ · thông tin giao dịch · liên hệ
│ Liên hệ theo thông tin đã xác nhận
```

Wireframe mobile:

```text
↓ Tiêu đề → Mục lục mở gọn
↓ Nội dung một cột, heading rõ, link mục neo
↓ Liên hệ cuối bài
```

### terms — Điều khoản sử dụng

- **Vai trò / route:** public · `/terms-of-service`.
- **Hành động chính:** Xem mục liên quan
- **Giữ lại:** `src/pages/static/policy/TermsOfService.js`.
- **Chi tiết:** Phạm vi dịch vụ · trách nhiệm · điều kiện sử dụng. Giữ nội dung nghĩa vụ hiện tại; biên tập câu chữ cần kiểm tra chủ sở hữu chính sách, không tự tạo thời hạn, đảm bảo bảo mật hay quyền mới. Không có nút gửi giả.

Wireframe desktop:

```text
│ Tiêu đề · ngày cập nhật khi có căn cứ
│ Mục lục bên trái | Nội dung rộng tối đa 72ch
│ Phạm vi dịch vụ · trách nhiệm · điều kiện sử dụng
│ Liên hệ theo thông tin đã xác nhận
```

Wireframe mobile:

```text
↓ Tiêu đề → Mục lục mở gọn
↓ Nội dung một cột, heading rõ, link mục neo
↓ Liên hệ cuối bài
```

### regulations — Quy chế hoạt động

- **Vai trò / route:** public · `/operating-regulations`.
- **Hành động chính:** Xem mục liên quan
- **Giữ lại:** `src/pages/static/policy/OperatingRegulations.js`.
- **Chi tiết:** Quy trình · quyền và nghĩa vụ · phối hợp xử lý. Giữ nội dung nghĩa vụ hiện tại; biên tập câu chữ cần kiểm tra chủ sở hữu chính sách, không tự tạo thời hạn, đảm bảo bảo mật hay quyền mới. Không có nút gửi giả.

Wireframe desktop:

```text
│ Tiêu đề · ngày cập nhật khi có căn cứ
│ Mục lục bên trái | Nội dung rộng tối đa 72ch
│ Quy trình · quyền và nghĩa vụ · phối hợp xử lý
│ Liên hệ theo thông tin đã xác nhận
```

Wireframe mobile:

```text
↓ Tiêu đề → Mục lục mở gọn
↓ Nội dung một cột, heading rõ, link mục neo
↓ Liên hệ cuối bài
```

### disputes — Cơ chế giải quyết khiếu nại

- **Vai trò / route:** public · `/dispute-resolution`.
- **Hành động chính:** Xem mục liên quan
- **Giữ lại:** `src/pages/static/policy/DisputeResolution.js`.
- **Chi tiết:** Bước gửi yêu cầu · thông tin cần chuẩn bị · kênh tiếp nhận. Giữ nội dung nghĩa vụ hiện tại; biên tập câu chữ cần kiểm tra chủ sở hữu chính sách, không tự tạo thời hạn, đảm bảo bảo mật hay quyền mới. Không có nút gửi giả.

Wireframe desktop:

```text
│ Tiêu đề · ngày cập nhật khi có căn cứ
│ Mục lục bên trái | Nội dung rộng tối đa 72ch
│ Bước gửi yêu cầu · thông tin cần chuẩn bị · kênh tiếp nhận
│ Liên hệ theo thông tin đã xác nhận
```

Wireframe mobile:

```text
↓ Tiêu đề → Mục lục mở gọn
↓ Nội dung một cột, heading rõ, link mục neo
↓ Liên hệ cuối bài
```

### individuals — Dành cho cá nhân

- **Vai trò / route:** public · `/for-individuals`.
- **Hành động chính:** Tìm văn phòng công chứng
- **Giữ lại:** `src/pages/static/product/ForIndividuals.js`.
- **Chi tiết:** Giữ đích CTA hiện có; không tạo công cụ tìm văn phòng nếu chưa có chức năng đó. Các giá/phí phải được xác nhận, không đưa giá mock vào production.

Wireframe desktop:

```text
│ Đối tượng · dịch vụ có thể hỗ trợ · CTA hiện có
│ Cần chuẩn bị gì · phí hiện được công bố · các bước
│ Hướng dẫn và liên hệ
```

Wireframe mobile:

```text
↓ Giới thiệu ngắn → CTA
↓ Giấy tờ, phí và các bước dạng khối xếp dọc
```

### offices — Dành cho văn phòng công chứng

- **Vai trò / route:** public · `/for-notary-offices`.
- **Hành động chính:** Yêu cầu giới thiệu
- **Giữ lại:** `src/pages/static/product/ForNotaryOffices.js`.
- **Chi tiết:** Việt hóa demo thành giới thiệu sản phẩm; giữ handler/đích yêu cầu và tải tài liệu hiện có, không thêm lead API. Không hứa chức năng chưa tồn tại.

Wireframe desktop:

```text
│ Giải pháp cho văn phòng · CTA yêu cầu demo hiện có
│ Tiếp nhận → xử lý → ký số → quản lý hồ sơ
│ Tài liệu giới thiệu và liên hệ
```

Wireframe mobile:

```text
↓ Giá trị thực dụng → CTA
↓ Nhóm khả năng một cột → liên hệ
```

### guide — Hướng dẫn sử dụng

- **Vai trò / route:** public · `/user-guide`.
- **Hành động chính:** Xem bước cần hỗ trợ
- **Giữ lại:** `src/pages/static/UserGuide.js`.
- **Chi tiết:** Giữ nội dung liên quan tính năng thực; đồng nhất tên miền live và tên mục. Không thêm cam kết mọi thủ tục hoàn tất từ xa.

Wireframe desktop:

```text
│ Mục lục các bước | Nội dung từng bước và hình minh họa
│ Tạo tài khoản → gửi hồ sơ → theo dõi → ký → nhận tài liệu
│ Link dịch vụ/tra cứu liên quan
```

Wireframe mobile:

```text
↓ Chọn bước bằng danh sách mở gọn
↓ Một bước mỗi khối, chú thích ngay dưới ảnh
↓ Hướng dẫn không vượt chiều ngang
```

### signin — Đăng nhập

- **Vai trò / route:** public · `/signin`.
- **Hành động chính:** Đăng nhập
- **Giữ lại:** `src/pages/signin/SignIn.js`.
- **Chi tiết:** Giữ Google OAuth ở đăng nhập/đăng ký. Giữ validation, token, hành vi gửi và bảo mật tài khoản hiện có. Đổi cách đặt nhãn/lỗi, không tự nới hoặc siết quy tắc. Không thêm số điện thoại/CCCD vào form đăng ký.

Wireframe desktop:

```text
│ Logo B + đường về trang chủ
│ Thông điệp thương hiệu | Biểu mẫu: Email · Mật khẩu · Hiện mật khẩu · Quên mật khẩu?
│ CTA chính · đường dẫn tài khoản liên quan
```

Wireframe mobile:

```text
↓ Logo → tiêu đề → biểu mẫu một cột
↓ Email · Mật khẩu · Hiện mật khẩu · Quên mật khẩu?
↓ CTA đủ rộng · liên kết phụ dưới CTA
```

### signup — Đăng ký

- **Vai trò / route:** public · `/signup`.
- **Hành động chính:** Đăng ký
- **Giữ lại:** `src/pages/signup/SignUp.js`.
- **Chi tiết:** Giữ Google OAuth ở đăng nhập/đăng ký. Giữ validation, token, hành vi gửi và bảo mật tài khoản hiện có. Đổi cách đặt nhãn/lỗi, không tự nới hoặc siết quy tắc. Không thêm số điện thoại/CCCD vào form đăng ký.

Wireframe desktop:

```text
│ Logo B + đường về trang chủ
│ Thông điệp thương hiệu | Biểu mẫu: Họ và tên · Email · Mật khẩu
│ CTA chính · đường dẫn tài khoản liên quan
```

Wireframe mobile:

```text
↓ Logo → tiêu đề → biểu mẫu một cột
↓ Họ và tên · Email · Mật khẩu
↓ CTA đủ rộng · liên kết phụ dưới CTA
```

### forgot — Quên mật khẩu?

- **Vai trò / route:** public · `/forgot-password`.
- **Hành động chính:** Gửi yêu cầu
- **Giữ lại:** `src/pages/signin/ForgotPassword.js`.
- **Chi tiết:** Giữ validation, token, hành vi gửi và bảo mật tài khoản hiện có. Đổi cách đặt nhãn/lỗi, không tự nới hoặc siết quy tắc. Không thêm số điện thoại/CCCD vào form đăng ký.

Wireframe desktop:

```text
│ Logo B + đường về trang chủ
│ Thông điệp thương hiệu | Biểu mẫu: Email · Sau khi gửi, kiểm tra hộp thư
│ CTA chính · đường dẫn tài khoản liên quan
```

Wireframe mobile:

```text
↓ Logo → tiêu đề → biểu mẫu một cột
↓ Email · Sau khi gửi, kiểm tra hộp thư
↓ CTA đủ rộng · liên kết phụ dưới CTA
```

### reset — Đặt lại mật khẩu

- **Vai trò / route:** public · `/reset-password`.
- **Hành động chính:** Đặt lại mật khẩu
- **Giữ lại:** `src/pages/signin/ResetPassword.js`.
- **Chi tiết:** Giữ validation, token, hành vi gửi và bảo mật tài khoản hiện có. Đổi cách đặt nhãn/lỗi, không tự nới hoặc siết quy tắc. Không thêm số điện thoại/CCCD vào form đăng ký.

Wireframe desktop:

```text
│ Logo B + đường về trang chủ
│ Thông điệp thương hiệu | Biểu mẫu: Mật khẩu mới · Xác nhận mật khẩu · Quy tắc hiện tại
│ CTA chính · đường dẫn tài khoản liên quan
```

Wireframe mobile:

```text
↓ Logo → tiêu đề → biểu mẫu một cột
↓ Mật khẩu mới · Xác nhận mật khẩu · Quy tắc hiện tại
↓ CTA đủ rộng · liên kết phụ dưới CTA
```

### third-party — Đang hoàn tất đăng nhập

- **Vai trò / route:** public · `/third-party`.
- **Hành động chính:** Không có thao tác ghi; chỉ thông báo trạng thái.
- **Giữ lại:** `src/App.js`.
- **Chi tiết:** Route trung gian hiện render Loader. Không thêm nút đăng nhập lần nữa hoặc timer/redirect mới. Đặc tả lỗi nếu handler hiện cung cấp lỗi; không tự tạo flow OAuth.

Wireframe desktop:

```text
│ Logo B
│ Đang hoàn tất đăng nhập… · chỉ báo đang tải
```

Wireframe mobile:

```text
↓ Logo → thông báo đang tải
```

### not-found — Không tìm thấy trang

- **Vai trò / route:** public · `*`.
- **Hành động chính:** Về trang chủ
- **Giữ lại:** `src/pages/notfound/NotFound.js`.
- **Chi tiết:** Giữ catch-all route. Không dùng nút quay lại tự đoán khi không có lịch sử.

Wireframe desktop:

```text
│ Logo B + điều hướng
│ Không tìm thấy trang · mô tả ngắn · Về trang chủ
```

Wireframe mobile:

```text
↓ Logo → lời giải thích → CTA
```

### create — Tạo hồ sơ công chứng

- **Vai trò / route:** user · `/user/create-notarization-profile`.
- **Hành động chính:** Tiếp tục / Gửi hồ sơ
- **Giữ lại:** `src/pages/services/create-notarization-profile/CreateNotarizationProfile.js`.
- **Chi tiết:** Bước 1: lĩnh vực + dịch vụ từ API. Bước 2: fullName, phoneNumber, citizenId, email, amount = SỐ BẢN SAO, giấy tờ theo required_documents; lấy tệp từ máy/ví. Bước 3: rà soát các dữ liệu đó và gửi. Giữ currentStep, FormData và handler submit; không thêm bước thanh toán vào wizard. Không hứa lưu nháp khi chưa có persistence.

Wireframe desktop:

```text
│ Điều hướng người dùng | Bước 1 Chọn loại → 2 Thông tin → 3 Kiểm tra
│ Khối chính 720px | Hướng dẫn theo dịch vụ
│ Quay lại (phụ) · Tiếp tục hoặc Gửi hồ sơ (chính)
```

Wireframe mobile:

```text
↓ Menu gọn → Bước 1/3 và tên bước
↓ Các trường một cột; thông tin → tài liệu
↓ Quay lại và CTA dưới nội dung; không che lỗi
```

### history — Lịch sử hồ sơ công chứng

- **Vai trò / route:** user · `/user/history`.
- **Hành động chính:** Thanh toán (khi có khoản chờ) / Xem hồ sơ
- **Giữ lại:** `src/pages/services/HistoryNotarizationProfile.js`.
- **Chi tiết:** Tái dùng PendingPayments: giữ getMyPayments(pending), filter checkoutUrl và href. Không tạo checkout, đánh dấu đã thanh toán hoặc gộp nhiều khoản vào một URL. Chi tiết hồ sơ dùng HistoryDetailModal; không đổi sắp xếp/filter state.

Wireframe desktop:

```text
│ Tiêu đề + mô tả
│ Banner từng khoản chờ: mã hồ sơ · số tiền · Thanh toán
│ Lọc trạng thái + tìm kiếm
│ Bảng hồ sơ: mã · ngày gửi · người yêu cầu · trạng thái · dịch vụ
```

Wireframe mobile:

```text
↓ Tiêu đề → banner, số tiền và Thanh toán đủ rộng
↓ Tìm kiếm → Bộ lọc → card hồ sơ
↓ Card có nhãn trạng thái và Xem hồ sơ
```

### sessions — Phiên công chứng

- **Vai trò / route:** user · `/user/notarization-session`.
- **Hành động chính:** Tạo phiên công chứng
- **Giữ lại:** `src/pages/services/CreateNotarizationSession.js`.
- **Chi tiết:** Giữ CreateNotarizationSession, JoinSessionModal, SessionCard và NotarizationSessionDetailsModal. Không thêm video call, lịch hẹn hay hệ thống mời mới. Trống: Chưa có phiên công chứng; dùng CTA đang có.

Wireframe desktop:

```text
│ Tiêu đề + Tạo phiên công chứng
│ Tìm kiếm · danh sách phiên · trạng thái từng người khi có
│ Chi tiết: thành viên · tài liệu · yêu cầu hiện có
```

Wireframe mobile:

```text
↓ Tiêu đề → CTA → tìm kiếm
↓ Card phiên một cột
↓ Chi tiết toàn màn hình trên mobile
```

### wallet — Ví tài liệu

- **Vai trò / route:** user · `/user/document-wallet`.
- **Hành động chính:** Xem tài liệu
- **Giữ lại:** `src/pages/services/DocumentWallet.js`.
- **Chi tiết:** Giữ nftItems, metadata và modal hiện có. SHOW MINT ADDRESS đổi thành Xem mã bản ghi. Tách trạng thái hồ sơ, thanh toán và bản ghi; ghi Solana devnet khi hiển thị thông tin mạng. Không quảng bá NFT là tài sản/chứng thư pháp lý.

Wireframe desktop:

```text
│ Tên trang + giải thích bản ghi blockchain (NFT)
│ Danh sách tài liệu: tên · ngày nhận · hạn dùng nếu có
│ Xem tài liệu · Chia sẻ tài liệu · Mua thêm theo hành vi hiện có
```

Wireframe mobile:

```text
↓ Giải thích ngắn có thể mở lại
↓ Card một cột: tên, ngày Việt, thông tin đối chiếu phụ
↓ Xem tài liệu ưu tiên; chia sẻ/mua thêm ở khu vực phụ
```

### profile — Thông tin cá nhân

- **Vai trò / route:** shared · `/profile`.
- **Hành động chính:** Chỉnh sửa
- **Giữ lại:** `src/pages/profile/UserProfile.js`.
- **Chi tiết:** Một route chung user/notary/admin/secretary, không thêm route profile theo role. Giữ ProvinceSelector, dữ liệu địa chỉ, định dạng upload và update handler. Nhãn CMND/CCCD/Hộ chiếu không biến thành CCCD-only.

Wireframe desktop:

```text
│ Điều hướng theo role | Thông tin cá nhân
│ Ảnh đại diện · Họ tên · thông tin tài khoản
│ Giấy tờ định danh · địa chỉ · Chỉnh sửa
```

Wireframe mobile:

```text
↓ Menu theo role → tiêu đề
↓ Ảnh/đổi ảnh → thông tin một cột
↓ Dialog chỉnh sửa toàn màn hình, Lưu khi đang chỉnh sửa
```

### payment — Kết quả thanh toán

- **Vai trò / route:** shared · `/payment/redirect`.
- **Hành động chính:** Về trang chủ (hiện có)
- **Giữ lại:** `src/pages/services/PaymentRedirectPage.js`.
- **Chi tiết:** PaymentRoute mở cho mọi role và khách. Không đổi PAID/CANCELLED/ERROR query handling, updatePaymentStatus, guard hoặc timer. Giảm khẳng định trong copy: khi hệ thống chỉ nhận chuyển hướng, không nói đã độc lập xác nhận ngân hàng. Unknown/error normalization và đổi CTA về history là issue riêng cần scope sau, không lén sửa logic.

Wireframe desktop:

```text
│ Logo/điều hướng theo trạng thái đăng nhập
│ Card kết quả: đang xử lý / thông báo từ luồng hiện có
│ Tham chiếu giao dịch nếu đã có → CTA hiện có
```

Wireframe mobile:

```text
↓ Thông báo → mô tả → CTA toàn chiều ngang
```

### notary-home — Tổng quan công chứng

- **Vai trò / route:** notary · `/notary/dashboard`.
- **Hành động chính:** Mở danh sách chờ xử lý
- **Giữ lại:** `src/pages/notary/NotaryDashboard.js`.
- **Chi tiết:** Giữ số liệu/hành vi hiện có. Nếu thẻ số liệu chưa có handler, chỉ bổ sung link tới route hàng chờ có sẵn, không query hay quyền mới.

Wireframe desktop:

```text
│ Sidebar công chứng viên | Tiêu đề + thao tác
│ Các hàng chờ và số hồ sơ cần xử lý
│ Yêu cầu gần đây: tên · loại · trạng thái | chỉ số tổng quan
```

Wireframe mobile:

```text
↓ Số liệu xếp 2 rồi 1 cột khi cần
↓ Lối vào hàng chờ đủ rộng → danh sách gần đây
```

### notary-pending — Hồ sơ chờ xử lý

- **Vai trò / route:** notary · `/notary/pending-notarization-documents`.
- **Hành động chính:** Mở hồ sơ để xem xét
- **Giữ lại:** `src/pages/notary/ProcessingNotarizationDocuments.js`.
- **Chi tiết:** Giữ endpoint/phân trang hiện tại, card hoặc queue hiển thị cùng dữ liệu đã trả về. Preview dùng FilePreviewModal, không tải đồng loạt tất cả tệp. Hàng chờ rỗng phải có thông báo.

Wireframe desktop:

```text
│ Sidebar công chứng viên | Tiêu đề + thao tác
│ Hàng chờ: người yêu cầu · dịch vụ · trạng thái · Mở hồ sơ
│ Chi tiết: thông tin và tài liệu bên trái | preview bên phải
│ Yêu cầu bổ sung / từ chối / xác nhận theo quyền hiện có
```

Wireframe mobile:

```text
↓ Danh sách một cột
↓ Mở hồ sơ toàn màn hình
↓ Tab Thông tin / Tài liệu, hành động theo quyền hiện có
```

### notary-sign — Hồ sơ chờ ký số

- **Vai trò / route:** notary · `/notary/awaiting-signature-documents`.
- **Hành động chính:** Mở hồ sơ chờ ký số
- **Giữ lại:** `src/pages/notary/AwaitingSignatureDocuments.js`.
- **Chi tiết:** Không suy luận signatureImage = đã ký số hợp lệ. Hiển thị dữ liệu chữ ký được cung cấp; không thêm ký hàng loạt.

Wireframe desktop:

```text
│ Sidebar công chứng viên | Tiêu đề + thao tác
│ Hàng chờ ký: người yêu cầu · dịch vụ · tình trạng chữ ký
│ Chi tiết thông tin | tài liệu + chữ ký hiện có
│ Xác nhận theo handler hiện có; không đổi thứ tự ký
```

Wireframe mobile:

```text
↓ Danh sách một cột → chi tiết toàn màn hình
↓ Thông tin/chữ ký/preview xếp dọc hoặc tab
```

### notary-sessions — Quản lý phiên công chứng

- **Vai trò / route:** notary · `/notary/notary-session-management`.
- **Hành động chính:** Mở phiên cần xử lý
- **Giữ lại:** `src/pages/notary/SessionManagement.js`.
- **Chi tiết:** Giữ DetailProcessingSessionModal, DetailReadyToSignSessionModal, pagination và session statuses; không ép session status vào document status.

Wireframe desktop:

```text
│ Sidebar công chứng viên | Tiêu đề + thao tác
│ Tìm phiên + lọc trạng thái
│ Danh sách: tên phiên · người tạo · trạng thái
│ Chi tiết phiên: người tham gia · tài liệu · chữ ký
```

Wireframe mobile:

```text
↓ Tìm kiếm → Bộ lọc → card phiên
↓ Chi tiết toàn màn hình; phần tài liệu mở riêng
```

### notary-history — Lịch sử công chứng

- **Vai trò / route:** notary · `/notary/notarization-history`.
- **Hành động chính:** Xem chi tiết hồ sơ
- **Giữ lại:** `src/pages/notary/NotarizedHistory.js`.
- **Chi tiết:** Không tự gộp/xóa event vì card lặp: giữ ngữ nghĩa lịch sử, đặt nhãn mốc rõ. Không làm thay đổi sort/pagination để chuyển sang table.

Wireframe desktop:

```text
│ Sidebar công chứng viên | Tiêu đề + thao tác
│ Tìm kiếm · lĩnh vực · trạng thái
│ Danh sách hồ sơ/mốc lịch sử theo dữ liệu hiện có
│ Chi tiết read-only | preview tài liệu
```

Wireframe mobile:

```text
↓ Bộ lọc mở gọn → card một cột
↓ Mốc lịch sử xếp dọc trong chi tiết
```

### admin-home — Tổng quan quản trị

- **Vai trò / route:** admin · `/admin/dashboard`.
- **Hành động chính:** Lọc kỳ thống kê
- **Giữ lại:** `src/pages/admin/dashboard/AdminDashboard.js`.
- **Chi tiết:** Giữ Chart.js/react-chartjs-2, dataset, tính toán và export handler hiện có. Biểu đồ có đơn vị, legend và bảng tương đương, không tạo số liệu giả khi response lỗi.

Wireframe desktop:

```text
│ Sidebar quản trị | tiêu đề
│ Kỳ thống kê · Xuất theo chức năng hiện có
│ Doanh thu · tài liệu · phiên
│ Biểu đồ doanh thu + bảng dữ liệu tương đương
│ Bảng theo lĩnh vực/dịch vụ
```

Wireframe mobile:

```text
↓ Bộ chọn kỳ → chỉ số một cột
↓ Biểu đồ rộng theo khung → bảng dữ liệu mở gọn
```

### employees — Quản lý nhân viên

- **Vai trò / route:** admin · `/admin/employee-management`.
- **Hành động chính:** Thêm nhân viên
- **Giữ lại:** `src/pages/admin/employee-management/EmployeeManagement.js`.
- **Chi tiết:** Giữ CreateNotaryAccountModal và hành vi tạo tài khoản; không thêm thư ký hoặc role mới chỉ vì có nhãn lọc. Biểu đồ cơ cấu chỉ ở vùng tổng quan phụ.

Wireframe desktop:

```text
│ Sidebar quản trị | tiêu đề
│ Tiêu đề + Thêm nhân viên
│ Số lượng + nhóm chức vụ · tìm kiếm
│ Bảng: tên · chức vụ · trạng thái · xem chi tiết
│ Modal chi tiết / tạo tài khoản theo quyền hiện có
```

Wireframe mobile:

```text
↓ CTA → tìm → Bộ lọc
↓ Card nhân viên; chi tiết toàn màn hình
```

### users — Quản lý người dùng

- **Vai trò / route:** admin · `/admin/user-management`.
- **Hành động chính:** Xem thông tin người dùng
- **Giữ lại:** `src/pages/admin/user-management/UserManagement.js`.
- **Chi tiết:** Giữ filters và modal hiện tại. Không tạo thao tác khóa/xóa/hàng loạt nếu không có handler. Không hiển thị thêm CCCD ngoài quyền hiện có.

Wireframe desktop:

```text
│ Sidebar quản trị | tiêu đề
│ Tổng số người dùng · các nhóm hiện có
│ Tìm kiếm + bảng: tên · email · trạng thái · số hồ sơ
│ Chi tiết: thông tin được phép + lịch sử
```

Wireframe mobile:

```text
↓ Tìm → lọc → card có nhãn trường
↓ Email xuống dòng; mở chi tiết qua nút có tên
```

### notarizations — Quản lý công chứng

- **Vai trò / route:** admin · `/admin/notary-management`.
- **Hành động chính:** Xem chi tiết công chứng
- **Giữ lại:** `src/pages/admin/notary-management/NotaryManagement.js`.
- **Chi tiết:** Giữ hai nguồn dữ liệu và bộ lọc riêng, không trộn pagination. Việt hóa locale DataGrid. Hiển thị empty overlay khi mảng rỗng; lỗi NaN do dữ liệu/pagination phải điều tra riêng, không bịa rowCount.

Wireframe desktop:

```text
│ Sidebar quản trị | tiêu đề
│ Chỉ số hồ sơ / phiên
│ Phần hồ sơ: trạng thái + tìm kiếm + bảng
│ Phần phiên: bộ lọc + bảng riêng
```

Wireframe mobile:

```text
↓ Hai section tuần tự, bộ lọc trong từng section
↓ Card hồ sơ/phiên theo loại, không tràn ngang
```

### settings — Cài đặt

- **Vai trò / route:** admin · `/admin/settings`.
- **Hành động chính:** Không có thao tác ghi; chỉ thông báo trạng thái.
- **Giữ lại:** `src/pages/admin/Settings.js`.
- **Chi tiết:** Source hiện chỉ render Settings; không tạo form, toggle, API, Save hay quyền mới. Route vẫn truy cập như cũ; chỉ trình bày placeholder rõ ràng.

Wireframe desktop:

```text
│ Sidebar quản trị | tiêu đề
│ Tiêu đề Cài đặt
│ Thông báo: Chức năng cài đặt chưa được cung cấp.
```

Wireframe mobile:

```text
↓ Tiêu đề → thông báo một cột
```

### assistant — Trợ lý hướng dẫn

- **Vai trò / route:** all · `Widget trên mọi trang`.
- **Hành động chính:** Mở trợ lý / Gửi câu hỏi
- **Giữ lại:** `src/components/ChatAssistant.js`.
- **Chi tiết:** Giữ Chatbox và chatbot service. Hiện App chỉ render khi chưa đăng nhập: phase 3 có thể di chuyển mount ra ngoài điều kiện mà không đổi API/auth. Không gửi hồ sơ/CCCD tự động, không biến hướng dẫn thành tư vấn pháp lý hoặc cam kết kết quả.

Wireframe desktop:

```text
│ Nút Trợ lý 48×48, không đè CTA
│ Panel 360px bên phải: lời giới thiệu · lịch sử · ô hỏi · Gửi
│ Đóng và quay lại nút mở
```

Wireframe mobile:

```text
↓ Nút Trợ lý 48px tránh vùng thao tác
↓ Panel gần toàn màn hình, không co còn 30% chiều rộng
↓ Ô nhập và nút gửi luôn nhìn thấy khi mở bàn phím
```
