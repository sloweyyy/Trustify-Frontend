# Trustify — Nhận diện thương hiệu

**Giai đoạn 1 · Đã duyệt hướng B · 25/10/2026.** Người dùng xác nhận “Logo B, continue”. Chọn B — Nét ký tận tâm; tiếp tục palette, typography, giọng nói và khẩu hiệu đã đề xuất. Đây là mốc đặc tả thương hiệu trước triển khai. Xem [gallery và kết quả triển khai cuối](../design/final/README.md); hợp đồng API, Redux và luồng nghiệp vụ được giữ nguyên.

Xem [bảng nhận diện trực quan](index.html), [ảnh xem trước](previews/brand-board.png), [đánh giá giao diện hiện tại](audit/existing-screen-audit.md) và [thư viện ảnh trước thay đổi](audit/index.html).

## 1. Định vị

**Trustify giúp người Việt chuẩn bị, gửi và theo dõi hồ sơ công chứng trực tuyến, với thông tin rõ ràng và công chứng viên đồng hành.**

Điều người dùng nên nhớ: **“Tôi biết hồ sơ đang ở đâu và mình cần làm gì tiếp theo.”** Đây là định hướng đề xuất từ yêu cầu sản phẩm, chưa phải kết luận nghiên cứu người dùng.

| Nhóm | Việc cần hoàn thành | Giá trị thương hiệu cần thể hiện |
| --- | --- | --- |
| Cá nhân, bao gồm người lớn tuổi | Chuẩn bị đúng giấy tờ, gửi hồ sơ, bổ sung, ký số, thanh toán, nhận và tra cứu kết quả | Dễ hiểu, có hướng dẫn, nhìn thấy trạng thái và bước tiếp theo |
| Doanh nghiệp | Theo dõi nhiều hồ sơ, người tham gia và chi phí | Rõ người phụ trách, thông tin nhất quán, dễ đối chiếu; không hứa chức năng phân quyền doanh nghiệp chưa có |
| Văn phòng công chứng và công chứng viên | Tiếp nhận, xem xét tài liệu, quản lý phiên và ký số | Trang trọng, chính xác, tập trung vào xử lý công việc |

### Lời hứa cốt lõi và giới hạn diễn đạt

Định hướng dài hạn: **công chứng trực tuyến có giá trị pháp lý theo điều kiện áp dụng, với thông tin tài liệu có thể đối chiếu bằng bản ghi blockchain.** Giá trị pháp lý đến từ quy trình, điều kiện của hồ sơ và chủ thể có thẩm quyền; biểu trưng và NFT không chứng minh thay các điều kiện đó.

Ở phiên bản hiện tại, diễn đạt: **“Chuẩn bị và theo dõi hồ sơ công chứng trực tuyến. Kiểm tra thông tin bản ghi tài liệu khi được cấp.”** Sản phẩm đang dùng Solana devnet theo brief; tài liệu Solana mô tả devnet là môi trường thử nghiệm và token không phải tài sản thật. Không mô tả NFT thử nghiệm là chứng nhận pháp lý, tài sản đầu tư hay bằng chứng tài liệu đã được mã hóa. Xem [nguồn Solana](https://solana.com/docs/references/clusters).

“Documents secured on blockchain” cần được cụ thể hóa thành **“thông tin đối chiếu được ghi nhận trên blockchain”**, chỉ cho những trường dữ liệu thực sự được backend cung cấp. Không nói toàn bộ tệp được lưu trên chuỗi, không thể mất, không thể bị xem trái phép hoặc được bảo mật tuyệt đối. Hồ sơ thật, chữ ký và bản ghi blockchain là các đối tượng khác nhau. Các ví dụ trong tài liệu này không xác nhận tính hợp pháp của hệ thống đang chạy.

### Khác với đến phòng công chứng trực tiếp

| Cách làm quen thuộc | Hướng trải nghiệm Trustify |
| --- | --- |
| Hỏi giấy tờ cần mang, quay lại nếu thiếu | Xem hướng dẫn trước khi gửi và biết nội dung cần bổ sung |
| Hỏi tiến độ tại quầy hoặc qua điện thoại | Theo dõi cùng một mã hồ sơ, nhãn trạng thái và bước tiếp theo |
| Giữ giấy hẹn, biên nhận, bản giấy | Tìm lại thông tin hồ sơ và kết quả trong ví tài liệu khi được cấp |
| Gặp công chứng viên tại văn phòng | Phối hợp qua quy trình/phiên trực tuyến đối với trường hợp được hỗ trợ; không hứa mọi thủ tục đều hoàn thành từ xa |

Đây là cách chuyển tải giá trị, không thêm lịch hẹn, SLA, hoàn tiền, chứng thư hay tính năng mới vào hệ thống.

### Khẩu hiệu

| Tiếng Việt | English equivalent | Nhận định |
| --- | --- | --- |
| **Hồ sơ rõ ràng. An tâm từng bước.** | **Clear documents. Confidence at every step.** | Đề xuất chọn: nhấn vào sự rõ ràng và cảm giác được hướng dẫn, không hứa tốc độ hoặc quyền lực pháp lý |
| Công chứng trực tuyến, gần bạn hơn. | Online notarization, closer to you. | Dễ hiểu, ấm áp; tính khác biệt thấp hơn |
| Rõ hồ sơ. Vững niềm tin. | Clear records. Lasting trust. | Gọn cho truyền thông; “hồ sơ rõ ràng” tự nhiên hơn trong sản phẩm |

Tiếng Anh chỉ dùng trong tài liệu đối chiếu; UI và nội dung hướng tới người dùng Việt dùng tiếng Việt.

## 2. Tính cách và giọng nói

| Tính cách | Thể hiện qua thương hiệu |
| --- | --- |
| **Đáng tin cậy** | Thông tin đúng mức; phân biệt hồ sơ, thanh toán, ký số và bản ghi blockchain |
| **Rõ ràng** | Tên hành động cụ thể; ngày tháng, phí và trạng thái đọc được ngay |
| **Tận tâm** | Hướng dẫn bước tiếp theo; giúp sửa lỗi; không đổ lỗi cho người dùng |
| **Điềm tĩnh** | Ít màu nhấn; chuyển động tiết chế; không dùng giọng khẩn cấp để thúc thanh toán |
| **Chuẩn mực** | Giữ đúng thuật ngữ công chứng; trang trọng vừa đủ, tránh văn phong hành chính dài dòng |

### Quy tắc tiếng Việt

- Chọn **“bạn”** cho UI, email giao dịch và trợ lý. Phù hợp cá nhân, ngắn và dễ đọc; lịch sự thể hiện bằng lời chỉ dẫn và sự tôn trọng. “Quý khách” chỉ dùng nếu văn bản giao dịch chính thức đã có quy chuẩn; không trộn hai cách xưng hô trong một luồng. Trang công chứng viên/quản trị ưu tiên câu trực tiếp, không cần xưng hô ở mỗi nhãn.
- Viết hoa đầu câu: “Tạo hồ sơ công chứng”, không “Tạo Hồ Sơ Công Chứng” hay toàn bộ chữ hoa. Giữ CCCD, PDF và tên riêng đúng dạng.
- Mỗi câu giải quyết một ý. Nêu điều gì xảy ra, tác động tới hồ sơ, rồi cách tiếp tục. Không dùng mã kỹ thuật làm nội dung lỗi chính; mã hỗ trợ chỉ ở phần chi tiết khi thực sự có.
- Không gắn nhãn “AI”, “NFT”, “mint”, “smart contract” vào hành động chính. Không đổi “ký số” thành “vẽ chữ ký”: chữ ký vẽ trong signature pad không tự động là chữ ký số hợp lệ.
- Phí dùng `1.250.000 ₫`; ngày dùng `25/10/2026`; không tự đổi tiền USD trong bảng giá khi chưa có dữ liệu VND được xác nhận. Trình bày giá minh họa phải ghi rõ.
- Dùng một bộ nhãn: **Chờ xử lý → Đang xử lý → Chờ ký số → Hoàn tất / Bị từ chối**. Thanh toán **Chờ thanh toán / Đã thanh toán** và bản ghi **Đã tạo bản ghi blockchain** là thông tin riêng, không thay thế trạng thái hồ sơ. `verification` đang tồn tại trong source phải giữ nguyên giá trị nghiệp vụ; cách giải thích hiển thị sẽ quyết định ở giai đoạn 2.

### Giải thích blockchain/NFT

Lần đầu trong ví tài liệu: **“Bản ghi blockchain (NFT) là mã đối chiếu gắn với tài liệu, giúp bạn kiểm tra thông tin được ghi nhận. Bạn không cần hiểu công nghệ này để xem tài liệu.”** Chỉ hiển thị phần giải thích một lần ở ngữ cảnh cần thiết, có thể mở lại qua “Bản ghi blockchain là gì?”.

Với môi trường hiện tại thêm: **“Bản ghi trên mạng thử nghiệm Solana devnet.”** Không gọi đó là con dấu của cơ quan nhà nước hoặc cam kết giá trị pháp lý. Trên trang xác minh, giữ trường đầu vào theo API hiện hữu: nhãn có thể là **“Mã bản ghi tài liệu (địa chỉ mint NFT)”**, hướng dẫn **“Sao chép mã từ phần thông tin tài liệu trong ví tài liệu.”** Không hứa tra cứu bằng CCCD, tên hay mã hồ sơ nếu API xác minh chỉ nhận mint address.

### Ví dụ nên / tránh

| Ngữ cảnh | Nên dùng | Tránh |
| --- | --- | --- |
| Nút hồ sơ | “Tạo hồ sơ công chứng”; “Xem hồ sơ”; “Tiếp tục” kèm tên bước | “Submit”; “Bắt đầu ngay!!!”; “OK” không rõ kết quả |
| Nút thanh toán | “Thanh toán” đi cùng số tiền và mã hồ sơ | “Mint NFT ngay”; “Nhận chứng nhận hợp pháp” |
| Nút ký | “Ký số” khi thực sự chạy luồng ký số; “Lưu chữ ký” cho hình chữ ký vẽ | Gọi mọi thao tác trên signature pad là ký số |
| Lỗi trường | “Số CCCD cần gồm 12 chữ số. Bạn kiểm tra lại giúp nhé.” | “Invalid input”; “Bạn đã nhập sai!” |
| Lỗi mạng | “Chưa tải được hồ sơ. Bạn kiểm tra kết nối rồi thử lại.” + “Thử lại” | “Error 500”; “Đã có lỗi” không có lối tiếp tục |
| Thanh toán chưa xác định | “Chưa xác nhận được kết quả thanh toán. Bạn kiểm tra lại trạng thái hồ sơ trước khi thanh toán tiếp.” | Khẳng định “Thất bại” chỉ vì thiếu tham số chuyển hướng |
| Email tiếp nhận | Chủ đề: “Trustify đã tiếp nhận hồ sơ [mã hồ sơ]”. Nội dung: “Chào bạn, hồ sơ đã được tiếp nhận. Bạn có thể xem tiến độ trong Lịch sử hồ sơ.” | “Hồ sơ được bảo đảm pháp lý 100%”; gửi tên giấy tờ nhạy cảm ở subject |
| Email yêu cầu bổ sung | “Hồ sơ [mã hồ sơ] cần bổ sung thông tin. Bạn đăng nhập để xem yêu cầu của công chứng viên.” | Liệt kê CCCD, tệp hoặc dữ liệu cá nhân nhạy cảm trong bản xem trước email |
| Ví tài liệu trống | “Bạn chưa có tài liệu trong ví. Tài liệu được cấp sẽ xuất hiện tại đây.” | “No NFTs found”; coi ví trống là lỗi |
| Hàng chờ trống | “Chưa có hồ sơ chờ ký số.” | Khung trắng chỉ còn số trang “1” |
| Trợ lý | “Bạn cần hướng dẫn về bước nào?” + “Thông tin hướng dẫn không thay thế ý kiến của công chứng viên.” | “Tôi bảo đảm hồ sơ của bạn hợp pháp”; giả làm người có thẩm quyền |

Ví dụ CCCD và trạng thái là định hướng giọng nói, chưa thay đổi kiểm tra dữ liệu hay mapping hiện tại.

## 3. Biểu trưng

Ba hướng là hình vector mới được vẽ trong repo, không sao chép biểu trưng chính phủ, ngân hàng hay biểu tượng Material. Wordmark dùng Be Vietnam Pro 600.

| Hướng | Ý tưởng | Điểm mạnh | Đánh đổi |
| --- | --- | --- | --- |
| **A — Hồ sơ xác nhận** | Tờ giấy gấp góc, hai dòng nội dung, nét kiểm mở ở góc phải | Gắn với việc công chứng, nét đơn giản ở favicon, cân bằng trang trọng và gần gũi | Biểu tượng tờ giấy là hình quen thuộc; cần dùng tỷ lệ và nét vẽ nhất quán để tạo nhận diện |
| **B — Nét ký tận tâm** | Chữ T, nét ký và dấu kiểm | Cá tính, nhấn vào sự đồng hành của con người | Nét giao nhau kém rõ ở 16px; có thể bị hiểu là ứng dụng chữ ký |
| **C — Dấu kết nối** | Khung tám cạnh và dấu kiểm | Gợi dấu xác nhận, có trọng lượng thị giác | Dễ gợi con dấu có thẩm quyền; không nên chọn nếu muốn giảm liên tưởng cơ quan nhà nước |

**Quyết định duyệt: B — Nét ký tận tâm.** A và C được giữ làm phương án tham khảo, không triển khai song song. Hướng B cần ưu tiên bản đơn giản/pixel-hinted ở favicon 16px trước khi phát hành; không thay đổi hình dáng đã chọn trong phase 2.

Mỗi hướng có 9 SVG: `logos/{a,b,c}-{favicon,app-icon,header}-{color,mono,inverse}.svg`. Tổng cộng **27 file**. Bảng trực quan cho thấy đủ ba kích thước và ba phiên bản. [A](previews/logo-a.png) · [B](previews/logo-b.png) · [C](previews/logo-c.png).

- Favicon: biểu tượng riêng, bản SVG 32×32; đã kiểm tra thêm ở 16×16 qua bản PNG [size checks](previews/favicon-size-checks.png). Giữ hình gấp góc và dấu kiểm, không cố thu wordmark vào favicon. Bản 16px cần pixel hinting trước xuất ICO ở PR sản xuất.
- App icon: 192×192, biểu tượng nằm trong vùng an toàn 128×128, nền trắng hoặc burgundy. PR asset sau duyệt sẽ xuất thêm 512×512 và cập nhật manifest; giai đoạn này chưa chạm `public/`.
- Header: 240×64, hiển thị symbol khoảng 50px và wordmark 32px. Dùng SVG, không kéo giãn; trên thanh điều hướng thấp cần xuất tỷ lệ phù hợp, không thu đến mức chữ khó đọc.
- Màu: burgundy trên trắng. Một màu: mực #24262B trên trắng. Đảo: trắng trên burgundy. Biểu tượng đảo có nền để xem trước; khi dùng trên nền thương hiệu có thể bỏ nền lặp lại.
- Khoảng bảo vệ đề xuất: ít nhất 1/4 chiều cao symbol. Không ghép với quốc huy, ngôi sao, vòng chữ “quốc gia”, tên cơ quan hay hình con dấu nhà nước. Không đóng logo lên chứng thư như chữ ký hoặc dấu xác nhận thật.
- Các SVG wordmark nhúng font OFL để preview độc lập. Trước phát hành, chuyển chữ wordmark thành path để giảm dung lượng và loại khác biệt renderer; giữ source có chữ để chỉnh sửa. Đây là concept, chưa xác minh đăng ký nhãn hiệu.

## 4. Màu sắc

**Giữ primary #AA1D39.** Sắc đỏ trầm nối tiếp sản phẩm hiện có, phù hợp cảm giác trang trọng mà brief mong muốn. Đây là diễn giải thiết kế, không phải kết luận tất cả người Việt cảm nhận màu đỏ giống nhau. Tránh đỏ cờ chiếm diện tích lớn, ánh vàng kim, viền tròn kiểu con dấu và gradient đỏ-đen dễ gợi ngân hàng. Trắng và nền giấy ấm là diện tích chủ đạo; đỏ dành cho nhận diện và hành động ưu tiên.

| Vai trò thương hiệu | Màu | Lý do |
| --- | --- | --- |
| Đỏ Trustify | `#AA1D39` | Nhận diện và hành động chính |
| Đỏ đậm | `#87172D` | Nhấn mạnh, trạng thái nhấn của thương hiệu; sẽ kiểm tra cặp màu trong theme ở giai đoạn 2 |
| Phấn nhạt | `#F8EDF0` | Nền thương hiệu nhẹ, không dùng thay màu cảnh báo |
| Giấy ấm | `#FAF8F5` | Cảm giác tài liệu, giảm lạnh và độ chói của nền trắng liên tục |
| Trắng | `#FFFFFF` | Mặt tài liệu, trường nhập và vùng đọc |
| Mực | `#24262B` | Nội dung, tiêu đề, phiên bản logo một màu |
| Chữ phụ | `#5D6068` | Thông tin hỗ trợ, vẫn đủ tương phản |
| Viền bề mặt | `#DBD7D2` | Phân vùng trang trí; không dùng làm viền duy nhất để nhận biết input |
| Viền tương tác | `#777A82` | Ranh giới trường nhập trên trắng, đạt yêu cầu phi văn bản |

### Màu ý nghĩa đề xuất

| Ý nghĩa | Chữ / nền | Nhãn mẫu | Tương phản |
| --- | --- | --- | --- |
| Chờ xử lý, cần chú ý, thanh toán chờ | `#805300` / `#FFF3D6` | Chờ xử lý; Chờ thanh toán | 6,04:1 |
| Đang xử lý, thông tin | `#245C9A` / `#EDF4FC` | Đang xử lý | 6,17:1 |
| Chờ người dùng ký số | `#67429A` / `#F3EEFA` | Chờ ký số | 6,53:1 |
| Hoàn tất, thanh toán đã xác nhận | `#196642` / `#EAF5EF` | Hoàn tất; Đã thanh toán | 6,23:1 |
| Lỗi, bị từ chối | `#B42318` / `#FDEDEA` | Bị từ chối | 5,78:1 |

Bản ghi NFT dùng màu thông tin kèm nhãn riêng, không có hiệu ứng sưu tầm, giá token hoặc độ hiếm. Luôn dùng chữ và hình phù hợp; không yêu cầu phân biệt đỏ/xanh để hiểu trạng thái. Đỏ thương hiệu và đỏ lỗi phải khác cả ngữ cảnh, nhãn và biểu tượng.

### Kiểm tra tương phản

Kết quả tính theo relative luminance sRGB, lưu đầy đủ ở [contrast-checks.json](contrast-checks.json); generator tái tạo kết quả. Trắng trên burgundy **7,13:1**; burgundy trên giấy ấm **6,73:1**; mực trên giấy ấm **14,28:1**; chữ phụ trên trắng **6,29:1**. Viền input #777A82 trên trắng **4,29:1**, đủ cho ranh giới điều khiển (3:1), **không dùng màu viền làm chữ thường** vì chưa đạt 4,5:1. Đường viền trang trí #DBD7D2 không phải tín hiệu tương tác độc lập.

Theo [W3C SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), chữ thường cần tối thiểu 4,5:1; chữ lớn 3:1. Đây là kiểm tra bảng màu thương hiệu, chưa phải chứng nhận accessibility toàn ứng dụng. Dark mode, focus, disabled và ánh xạ scale hiện có sẽ được xây dựng sau khi duyệt brand, trong giai đoạn 2.

## 5. Chữ viết

**Giữ Be Vietnam Pro.** Pairing theo vai trò trong cùng họ chữ: **SemiBold 600** cho tiêu đề/nhãn/wordmark, **Regular 400** cho nội dung. Không thêm font trang trí. Tính nhất quán và dấu tiếng Việt rõ quan trọng hơn một cặp serif/sans lạ mắt. Fallback `Arial, sans-serif`; khi font chính chưa tải, bố cục vẫn cần giữ khoảng thở và dấu.

Nhóm tác giả mô tả việc tinh chỉnh dấu tiếng Việt để tăng khả năng đọc; xem [nguồn dự án Be Vietnam Pro](https://github.com/bettergui/BeVietnamPro). Hai file TTF được lấy từ [Google Fonts](https://github.com/google/fonts/tree/main/ofl/bevietnampro), dùng SIL Open Font License 1.1, kèm [OFL.txt](fonts/OFL.txt). Font trong `docs/brand/fonts/` chỉ phục vụ preview ngoại tuyến, chưa thay font loader trong ứng dụng.

### Kiểm tra dấu

Mẫu bắt buộc: **ắ ầ ẩ ữ ợ ỹ**, “Hồ sơ công chứng”, “Nguyễn Thị Mỹ”. [SVG kiểm tra](applications/type-specimen.svg) và [PNG kích thước thật](previews/type-specimen.png) bao phủ tất cả cỡ đang có trong `themePrimitives.js`: **10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 64px**, ở cả 400 và 600. Xem [biên bản kiểm tra](validation.md) để biết phạm vi renderer và kiểm tra font thực tải.

Dấu được hiển thị, không cắt trên/dưới trong mẫu đã render. 10–12px vẫn quá nhỏ cho nội dung quan trọng; mẫu tồn tại để đánh giá theme cũ, không khuyến nghị tiếp tục dùng. Đặt định hướng **body tối thiểu 16px trên mobile**, ưu tiên 18px cho hướng dẫn dài; line-height nội dung khoảng 1,6, tiêu đề khoảng 1,35–1,45. Không dùng height cố định, letter spacing âm hoặc chữ hoa kéo dài làm dấu chạm nhau. Cỡ 64px chỉ dành cho truyền thông màn hình rộng; scale responsive sẽ được đặc tả ở giai đoạn 2.

Kiểm tra phát hành sau này vẫn cần Android/iOS, Windows, 200% zoom, chuỗi dài và font fallback; một mẫu desktop không chứng minh mọi trình duyệt đều đạt.

## 6. Biểu tượng, minh họa và hình ảnh

### Biểu tượng

Tiếp tục dùng **@mui/icons-material v6** đã có. Chọn nhánh `Outlined` nhất quán: `DescriptionOutlined` (hồ sơ), `FactCheckOutlined` (kiểm tra), `DrawOutlined` (chữ ký), `AccountBalanceWalletOutlined` (ví tài liệu), `PaymentsOutlined` (thanh toán), `HelpOutline` (hướng dẫn). Tên export cần xác nhận khi triển khai; không cài thêm bộ icon.

Biểu tượng gợi nghĩa, nhãn tiếng Việt giải thích hành động. Màu thương hiệu chỉ cho phần đang chọn/hành động chính; icon cơ bản dùng mực/chữ phụ. Icon nhìn 20–24px nhưng vùng bấm tối thiểu 44px. Không dùng icon làm nút không tên, không gắn quốc huy hoặc búa thẩm phán vào nút thông thường.

Nguồn: [MUI Material Icons](https://mui.com/material-ui/material-icons/) và [Google Material Design Icons](https://github.com/google/material-design-icons). Wrapper MUI theo MIT, hình icon gốc theo Apache 2.0; giữ license/notice liên quan khi phân phối. Không gán Apache cho logo mới của Trustify.

### Minh họa

Hướng đề xuất: vector phẳng, ít chi tiết, nét rõ; tài liệu, tập hồ sơ, người đang đọc giấy tờ và thao tác điện thoại. Phối burgundy với giấy ấm, dùng xanh xác nhận tiết chế. Con người có bối cảnh Việt Nam qua cách dùng, ngôn ngữ và giấy tờ minh họa, không qua đồng phục hay khuôn mẫu vùng miền. Không dùng robot, đồng coin 3D, chuỗi khối phát sáng, huy hiệu vàng hoặc công chứng viên giả tạo cảm giác chứng thực thật.

Ưu tiên vector tự vẽ theo từng ngữ cảnh và lưu SVG nguồn. Bộ logo và năm ứng dụng hiện tại đều là vector tạo cho đề xuất này. Không dùng ảnh stock hay AI raster, không phát sinh dependency hoặc giấy phép stock. Chưa chọn bộ minh họa bên thứ ba; mọi bổ sung sau phải ghi URL nguồn, tác giả, license và ngày lấy trong asset ledger.

### Ảnh chụp

Chỉ dùng ảnh thật nếu có quyền sử dụng và đồng ý của người xuất hiện: cảnh công chứng viên hướng dẫn, bàn hồ sơ sáng, điện thoại đang đọc tài liệu. Tông tự nhiên, bố cục gọn; không chụp rõ CCCD, chữ ký thật hoặc tài liệu cá nhân. Không tự tạo ảnh trụ sở, chứng chỉ, con dấu hay đối tác chưa xác thực. Trước khi có ảnh được cấp quyền, dùng vector hiện có của proposal. Chưa có nguồn ảnh stock nào được đưa vào gói này.

## 7. Ứng dụng nhận diện

Tất cả hình dưới đây là **mock thương hiệu**, dùng dữ liệu giả và hướng B. Không nối backend, không quy định component mới, không thay đổi route. Các mức phí và mã hồ sơ chỉ là ví dụ.

| Ứng dụng | Điều muốn kiểm chứng | Tệp |
| --- | --- | --- |
| Trang đăng nhập | Logo nhỏ dễ nhận, nền giấy ấm, lời chào và nhãn rõ; thương hiệu không lấn át biểu mẫu | [SVG](applications/sign-in.svg) · [PNG](previews/sign-in.png) |
| Thẻ hồ sơ công chứng | Tên tài liệu, mã hồ sơ, trạng thái, ngày gửi và bước tiếp theo dễ đọc | [SVG](applications/profile-card.svg) · [PNG](previews/profile-card.png) |
| Thẻ chứng nhận / bản ghi NFT | Có chất liệu tài liệu trang trọng nhưng ghi rõ bản minh họa, không giả dấu hay chứng thư; NFT là thông tin đối chiếu phụ | [SVG](applications/certificate-card.svg) · [PNG](previews/certificate-card.png) |
| Đầu email giao dịch | Logo và thanh burgundy, nội dung gọn, một đường dẫn quay về hồ sơ | [SVG](applications/email-header.svg) · [PNG](previews/email-header.png) |
| Ảnh chia sẻ 1200×630 | Khẩu hiệu dễ đọc, nhận diện nhất quán, không đưa thông tin cá nhân vào ảnh | [SVG](applications/social-share.svg) · [PNG](previews/social-share.png) |

Mẫu đăng nhập chỉ để xét nhận diện, không có nghĩa xóa đăng nhập Google đang có. Mẫu thẻ hồ sơ có ngày, phí minh họa không trở thành hợp đồng API. Không dùng thẻ NFT thay bản công chứng được cấp. Khi dựng email thật, CTA phải là HTML có thể đọc bằng trình đọc màn hình; không gửi toàn bộ email dưới dạng ảnh.

## 8. Cơ sở tham khảo và khác biệt

Brief yêu cầu sự rõ ràng của VNeID/Cổng Dịch vụ công Quốc gia và mức chỉn chu của Vietcombank, MoMo, Techcombank. Dùng đó như hướng cảm nhận: tác vụ cụ thể, nhãn Việt, thông tin tiến độ và chi phí rõ, khả năng đọc tốt. Không sao chép palette hay điều hướng của ngân hàng; không giả sản phẩm nhà nước.

Đã đọc website công khai của [Vietcombank](https://www.vietcombank.com.vn/), [MoMo](https://www.momo.vn/), [Techcombank](https://techcombank.com/) để tham khảo cách gọi nhóm khách hàng, tiện ích và hỗ trợ. Đây là tham khảo nội dung công khai, **không phải audit app ngân hàng đã đăng nhập**. Trang VNeID bị chặn, Cổng Dịch vụ công bị timeout trong công cụ nghiên cứu; không khẳng định quan sát được thiết kế hiện hành của hai ứng dụng đó. Liên kết Figma gốc trả 403 trong cả công cụ web và browser, vì vậy chưa sử dụng nội dung Figma làm bằng chứng.

Nguồn thực tế chính cho đề xuất là 36 lượt màn hình theo vai trò trên bản live, cộng widget trợ lý; xem audit. Không có phỏng vấn hay thử nghiệm người cao tuổi trong giai đoạn này; độ dễ dùng cần được xác nhận qua thử nghiệm ở giai đoạn triển khai.

## 9. Mốc duyệt và giai đoạn tiếp theo

Ngày 25/10/2026, người dùng duyệt **logo B** và yêu cầu tiếp tục. Giữ **#AA1D39 + nền giấy ấm; Be Vietnam Pro 400/600; cách xưng “bạn”; khẩu hiệu “Hồ sơ rõ ràng. An tâm từng bước.”** làm cơ sở giai đoạn 2.

**Giai đoạn 1 đã qua mốc duyệt.** Giai đoạn 2 được ghi trong [`docs/design-system.md`](../design-system.md), bao gồm nguyên tắc, light/dark tokens và mapping scale cũ, component/MUI overrides, wireframe cho mọi role, lifecycle, accessibility và kế hoạch di chuyển 1.620 `sx={{}}` (đếm hiện tại: 1.620 matches, 142 files). Chưa viết production code hay cập nhật `public/`.

Sau khi giai đoạn 2 được duyệt mới triển khai theo các PR nhỏ: **logo/favicon/public assets → tokens/theme overrides → shared components → User → Notary → Admin → Public**. Mỗi PR triển khai chạy `CI=false npm run build` và lưu before/after cho các màn hình bị tác động. Không thay route, Redux state, `src/services/*`, API contracts hoặc backend. Các lỗi chức năng phát hiện qua audit được ghi lại để phân biệt với phạm vi thay đổi giao diện, không sửa ngầm.
