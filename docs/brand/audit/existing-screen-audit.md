# Trustify — Đánh giá giao diện trước thay đổi

**Ngày: 25/10/2026 (giờ Việt Nam).** Đánh giá trước khi đề xuất brand; không sửa production. Nguồn chính: https://trustify-notary.vercel.app, đăng nhập UI bằng ba tài khoản QA do người dùng cung cấp. Không gửi hồ sơ, ký số, thanh toán, gửi email, đổi dữ liệu hay gọi thao tác quản trị.

## Phạm vi và bằng chứng

- **36 lượt màn hình theo route/vai trò + 1 trạng thái chatbot = 74 ảnh PNG**: Public 19 route (gồm 404 và payment redirect), User 5, Notary 6, Admin 6; mỗi lượt chụp desktop 1440×1000 và mobile 390×844, full-page. Mobile overflow được giữ nguyên để thể hiện lỗi; ảnh có thể rộng hơn 390px vì nội dung tràn.
- [Gallery có link từng ảnh](index.html), [manifest gồm URL thực tế, nội dung và chiều rộng](manifest.json). Contact sheets: [Public](public-contact-sheet.png), [User](user-contact-sheet.png), [Notary](notary-contact-sheet.png), [Admin](admin-contact-sheet.png). Tất cả ảnh được xem bằng contact sheet; các màn hình tràn và mock thương hiệu được xem thêm ở kích thước lớn.
- Local frontend commit tham chiếu: `d75854a2609666e8965a6a04b9bd781f23785060`, branch `feat/free-tier-deploy`. Không biết commit triển khai của Vercel: bằng chứng live và nhận xét source được phân biệt, không khẳng định chúng giống hệt nhau.
- `pageerror` không ghi nhận uncaught exception trong các lượt capture. Không có nghĩa không có console warnings, request lỗi hoặc lỗi nghiệp vụ; logger không thu mọi `console.error`/network response.
- Figma trả 403 qua browser và không đọc được bằng công cụ web. Không suy diễn nội dung Figma. Các tham chiếu ngân hàng chỉ đọc website công khai, chưa kiểm tra app nội bộ hoặc đăng nhập.

## Những vấn đề chính cần phục vụ qua thương hiệu

1. **Dễ hiểu trước khi trang trí:** “mint NFT”, nhãn tiếng Anh, ngày kiểu Mỹ, chữ hoa và trạng thái không đồng nhất làm tăng nỗ lực đọc.
2. **Niềm tin phải có cơ sở:** trang chủ gợi dịch vụ quốc gia và có đánh giá/xếp hạng, các trang dịch vụ hứa bảo mật tuyệt đối. Đề xuất brand phải bỏ cách khẳng định quá mức, không mô phỏng con dấu nhà nước.
3. **Thấy được bước tiếp theo:** vùng rỗng ở hàng chờ, ví tài liệu/phiên thiếu hướng dẫn, người dùng khó phân biệt hoàn tất hồ sơ với chờ thanh toán và NFT.
4. **Mobile là thiếu sót lớn:** thanh bên và các min-width giữ bố cục desktop, che khuất tác vụ chính. Đo chiều rộng cụ thể bên dưới.
5. **Thông lượng công chứng viên:** card lặp lại sự kiện khó quét, cần ngôn ngữ trạng thái chung và bố cục phù hợp xem hồ sơ; chưa thể khẳng định tính hiệu quả của preview khi hàng chờ không có dữ liệu.
6. **Hệ thống hiện có nên được tận dụng:** `src/components/payment/PendingPayments.js` đã có banner Thanh toán; không xây lại luồng. `src/App.js` hiện chỉ render `ChatAssistant` khi chưa đăng nhập. `themePrimitives.js` có burgundy và Be Vietnam Pro; đếm source ghi nhận 1.620 `sx={{}}` ở 142 file.

## Từng màn hình

Các nhận xét dưới đây là vấn đề UX quan sát hoặc giới hạn cần kiểm tra ở phase 2, chưa phải wireframe/thiết kế mới.

| Vai trò | Route / trạng thái | Vấn đề chính | Mobile: chiều rộng nội dung | Ảnh |
| --- | --- | --- | --- | --- |
| public | `/` | Nhãn “CÔNG CHỨNG QUỐC GIA”, số lượng đánh giá và xếp hạng tạo kỳ vọng chưa được chứng minh. Nội dung dài; hero và hướng dẫn tràn mobile. | 867px · tràn | [Desktop](screenshots/public-home-desktop.png) · [Mobile](screenshots/public-home-mobile.png) |
| public | `/services` | Danh sách dài, phần giới thiệu và lợi ích cạnh tranh với tác vụ tìm dịch vụ. Có “bảo mật tuyệt đối” và lời hứa pháp lý bao quát. Tràn ngang mobile. | 444px · tràn | [Desktop](screenshots/public-services-desktop.png) · [Mobile](screenshots/public-services-mobile.png) |
| public | `/lookup` | Thiếu ví dụ mã hồ sơ và chỉ dẫn lấy mã ở đâu; vùng tìm kiếm cô lập, nhiều khoảng trắng. | 390px | [Desktop](screenshots/public-lookup-desktop.png) · [Mobile](screenshots/public-lookup-mobile.png) |
| public | `/verify` | Đưa “địa chỉ mint NFT” và “blockchain” vào hướng dẫn chính, chưa giải thích cho người dùng phổ thông. | 390px | [Desktop](screenshots/public-verify-desktop.png) · [Mobile](screenshots/public-verify-mobile.png) |
| public | `/pricing` | Giá USD dạng khoảng, jargon NFT/AI và tên gói làm người Việt khó ước tính phí; cần phân biệt phí dịch vụ văn phòng và phí từng hồ sơ. | 390px | [Desktop](screenshots/public-pricing-desktop.png) · [Mobile](screenshots/public-pricing-mobile.png) |
| public | `/privacy-policy` | Nội dung dài thiếu điều hướng/tóm tắt thực dụng; có tràn ngang nhẹ. | 401px · tràn | [Desktop](screenshots/public-privacy-policy-desktop.png) · [Mobile](screenshots/public-privacy-policy-mobile.png) |
| public | `/payment-security` | Các cam kết bảo mật mạnh chưa kèm bằng chứng; trang dài, có tràn ngang nhẹ. | 401px · tràn | [Desktop](screenshots/public-payment-security-desktop.png) · [Mobile](screenshots/public-payment-security-mobile.png) |
| public | `/terms-of-service` | Khối nội dung và tiêu đề trang trí chiếm ưu thế; khó tìm quyền/nghĩa vụ cụ thể trên mobile, có tràn nhẹ. | 401px · tràn | [Desktop](screenshots/public-terms-of-service-desktop.png) · [Mobile](screenshots/public-terms-of-service-mobile.png) |
| public | `/operating-regulations` | Quy chế dài; thiếu mục lục giúp đọc nhanh và tìm quy trình có liên quan. | 390px | [Desktop](screenshots/public-operating-regulations-desktop.png) · [Mobile](screenshots/public-operating-regulations-mobile.png) |
| public | `/dispute-resolution` | Khó tìm ngay bước khiếu nại và nơi cần liên hệ giữa các đoạn giới thiệu dài. | 390px | [Desktop](screenshots/public-dispute-resolution-desktop.png) · [Mobile](screenshots/public-dispute-resolution-mobile.png) |
| public | `/for-individuals` | Thông báo phí dùng VND dạng văn bản dài; CTA “Tìm văn phòng” cần kiểm tra đích đến trong triển khai, không suy đoán chức năng. | 390px | [Desktop](screenshots/public-for-individuals-desktop.png) · [Mobile](screenshots/public-for-individuals-mobile.png) |
| public | `/for-notary-offices` | Khối giải pháp và CTA demo/tài liệu cần rõ điều gì xảy ra tiếp theo; hiện chưa kiểm tra hành vi gửi yêu cầu. | 390px | [Desktop](screenshots/public-for-notary-offices-desktop.png) · [Mobile](screenshots/public-for-notary-offices-mobile.png) |
| public | `/user-guide` | Nội dung hướng dẫn quá rộng trên mobile; nhắc tên miền trustify.work khác bản live đang xem. | 996px · tràn | [Desktop](screenshots/public-user-guide-desktop.png) · [Mobile](screenshots/public-user-guide-mobile.png) |
| public | `/signin` | Form nằm giữa nội dung trang công khai, bản đồ và footer lớn; nút toàn chữ hoa, nhãn lẫn cách viết hoa. | 390px | [Desktop](screenshots/public-signin-desktop.png) · [Mobile](screenshots/public-signin-mobile.png) |
| public | `/signup` | Form có bối cảnh marketing/bản đồ lấn át hướng dẫn; chưa thể hiện rõ bước sau đăng ký ở trạng thái ban đầu. | 390px | [Desktop](screenshots/public-signup-desktop.png) · [Mobile](screenshots/public-signup-mobile.png) |
| public | `/forgot-password` | Tràn ngang rõ rệt; thiếu lời giải thích sẽ nhận email và bước tiếp theo. | 598px · tràn | [Desktop](screenshots/public-forgot-password-desktop.png) · [Mobile](screenshots/public-forgot-password-mobile.png) |
| public | `/reset-password` | Tràn ngang rõ rệt; chụp trạng thái không có reset token, chưa kiểm tra việc đặt mật khẩu thật. | 598px · tràn | [Desktop](screenshots/public-reset-password-desktop.png) · [Mobile](screenshots/public-reset-password-mobile.png) |
| public | `/payment/redirect` | Không có tham số thanh toán vẫn hiển thị “không thành công”; thiếu trạng thái chưa xác định và đường trở về hồ sơ. Chỉ quan sát, chưa thực hiện giao dịch. | 390px | [Desktop](screenshots/public-payment-redirect-desktop.png) · [Mobile](screenshots/public-payment-redirect-mobile.png) |
| public | `/not-a-route` | 404 chỉ dẫn về trang chủ, chưa giúp tiếp tục tác vụ trước đó; dùng hình minh họa không gắn với hồ sơ. | 390px | [Desktop](screenshots/public-not-a-route-desktop.png) · [Mobile](screenshots/public-not-a-route-mobile.png) |
| user | `/user/create-notarization-profile` | Sidebar vẫn chiếm chiều ngang mobile, stepper ngang và form rộng. Màu nút tiếp tục đen tách khỏi brand. Chỉ chụp bước 1, chưa gửi hồ sơ. | 1056px · tràn | [Desktop](screenshots/user-user-create-notarization-profile-desktop.png) · [Mobile](screenshots/user-user-create-notarization-profile-mobile.png) |
| user | `/user/history` | Banner chờ thanh toán 2.000 VNĐ và nút Thanh toán đã có. Bảng và filter tràn mobile; nhãn “Sẵn sàng ký số”/“Không hợp lệ” khác bộ nhãn yêu cầu. | 1088px · tràn | [Desktop](screenshots/user-user-history-desktop.png) · [Mobile](screenshots/user-user-history-mobile.png) |
| user | `/user/notarization-session` | Trạng thái trống không giải thích cách bắt đầu ngoài nút ở góc; sidebar làm vùng làm việc nhỏ trên mobile. | 424px · tràn | [Desktop](screenshots/user-user-notarization-session-desktop.png) · [Mobile](screenshots/user-user-notarization-session-mobile.png) |
| user | `/user/document-wallet` | “SHOW MINT ADDRESS”, ngày kiểu Mỹ, tên tệp kỹ thuật và thiếu giải thích NFT; nhiều hành động ngang hàng. Có hai tài liệu QA, chưa chia sẻ/mua thêm. | 461px · tràn | [Desktop](screenshots/user-user-document-wallet-desktop.png) · [Mobile](screenshots/user-user-document-wallet-mobile.png) |
| user | `/profile` | Form thông tin và tải ảnh chưa ưu tiên việc cần làm; sidebar và nhóm trường gây tràn mobile. Không sửa thông tin cá nhân. | 686px · tràn | [Desktop](screenshots/user-profile-desktop.png) · [Mobile](screenshots/user-profile-mobile.png) |
| notary | `/notary/dashboard` | “Dashboard” tiếng Anh, nhiều nhãn kiểu Title Case. Số liệu tổng quan chưa ưu tiên hàng chờ; “Hoàn thành” và “Sẵn sàng ký số” khác nhãn chuẩn. | 586px · tràn | [Desktop](screenshots/notary-notary-dashboard-desktop.png) · [Mobile](screenshots/notary-notary-dashboard-mobile.png) |
| notary | `/notary/pending-notarization-documents` | Hàng chờ rỗng chỉ có phần đầu và số trang “1”, không có lời giải thích rỗng hay hướng quay lại. Không có dữ liệu để quan sát duyệt/preview. | 433px · tràn | [Desktop](screenshots/notary-notary-pending-notarization-documents-desktop.png) · [Mobile](screenshots/notary-notary-pending-notarization-documents-mobile.png) |
| notary | `/notary/awaiting-signature-documents` | Hàng chờ ký số rỗng không có empty state rõ; chưa quan sát được ký số hoặc signature pad do không có hồ sơ phù hợp. | 427px · tràn | [Desktop](screenshots/notary-notary-awaiting-signature-documents-desktop.png) · [Mobile](screenshots/notary-notary-awaiting-signature-documents-mobile.png) |
| notary | `/notary/notary-session-management` | Bộ lọc và ô tìm kiếm đứng trên vùng trắng, thiếu thông báo không có phiên và chỉ dẫn tiếp theo. | 636px · tràn | [Desktop](screenshots/notary-notary-notary-session-management-desktop.png) · [Mobile](screenshots/notary-notary-notary-session-management-mobile.png) |
| notary | `/notary/notarization-history` | Nhiều card lặp cùng người/mã theo từng mốc, khó quét nhanh trạng thái hiện tại. Nên đánh giá queue/table và preview cạnh nhau ở giai đoạn 2. | 554px · tràn | [Desktop](screenshots/notary-notary-notarization-history-desktop.png) · [Mobile](screenshots/notary-notary-notarization-history-mobile.png) |
| notary | `/profile` | Form thông tin và tải ảnh chưa ưu tiên việc cần làm; sidebar và nhóm trường gây tràn mobile. Không sửa thông tin cá nhân. | 686px · tràn | [Desktop](screenshots/notary-profile-desktop.png) · [Mobile](screenshots/notary-profile-mobile.png) |
| admin | `/admin/dashboard` | Phối màu biểu đồ không theo hệ thống ý nghĩa; nhiều vùng trắng, bảng/chart rất rộng; còn tiếng Anh và định dạng phần trăm chưa Việt hóa. | 1440px · tràn | [Desktop](screenshots/admin-admin-dashboard-desktop.png) · [Mobile](screenshots/admin-admin-dashboard-mobile.png) |
| admin | `/admin/employee-management` | Biểu đồ tròn chiếm diện tích lớn dù chỉ có một công chứng viên; toolbar/bảng cần ưu tiên tác vụ tra cứu và quản lý. | 1076px · tràn | [Desktop](screenshots/admin-admin-employee-management-desktop.png) · [Mobile](screenshots/admin-admin-employee-management-mobile.png) |
| admin | `/admin/user-management` | “Rows per page”, email và bảng dày; nhóm người dùng chưa giải thích ý nghĩa. Bảng tràn mobile. | 1076px · tràn | [Desktop](screenshots/admin-admin-user-management-desktop.png) · [Mobile](screenshots/admin-admin-user-management-mobile.png) |
| admin | `/admin/notary-management` | Hai bảng cùng màn hình và nhiều tab/filter; trạng thái tiếng Anh “No rows”, phân trang “1–NaN of undefined” ở danh sách phiên rỗng. Ghi nhận lỗi hiển thị, không sửa nghiệp vụ. | 1440px · tràn | [Desktop](screenshots/admin-admin-notary-management-desktop.png) · [Mobile](screenshots/admin-admin-notary-management-mobile.png) |
| admin | `/admin/settings` | Hiện chỉ có chữ “Settings”; source cũng là placeholder. Không giả định có cài đặt hoặc endpoint để thêm chức năng. | 390px | [Desktop](screenshots/admin-admin-settings-desktop.png) · [Mobile](screenshots/admin-admin-settings-mobile.png) |
| admin | `/profile` | Form thông tin và tải ảnh chưa ưu tiên việc cần làm; sidebar và nhóm trường gây tràn mobile. Không sửa thông tin cá nhân. | 686px · tràn | [Desktop](screenshots/admin-profile-desktop.png) · [Mobile](screenshots/admin-profile-mobile.png) |
| public | `/lookup · chatbot open` | Launcher là SVG onClick, không phải nút có tên rõ cho keyboard; kích thước source 3vw, đo ~11,7×11,7px trên mobile. Panel mở trên mobile chỉ chiếm phần hẹp bên phải, tiêu đề bị xuống dòng và ô nhập co nhỏ. Chưa gửi tin nhắn, không xác minh câu trả lời AI. | 390px | [Desktop](screenshots/public-chatbot-desktop.png) · [Mobile](screenshots/public-chatbot-mobile.png) |

## Phạm vi chưa quan sát và điều không suy diễn

- Create-profile chỉ ở bước chọn dịch vụ. Chưa chụp bước thông tin/kiểm tra lại, upload preview, lỗi validation, ký số, kết quả xác minh thành công hoặc thanh toán thành công. Không tạo dữ liệu mới chỉ để phục vụ audit thương hiệu.
- Hàng chờ phê duyệt/ký số và phiên công chứng viên không có bản ghi phù hợp. Không có bằng chứng live về modal review, side-by-side preview hoặc signature pad; sẽ đọc source/đánh giá ở giai đoạn 2 và dùng hồ sơ QA phù hợp trong PR triển khai nếu có.
- Các modal thêm nhân viên, sửa hồ sơ, gửi quên mật khẩu và tương tác AI không được submit. Bảng/chart được chụp với dữ liệu QA có sẵn, không seed/sửa backend.
- Payment redirect là trạng thái truy cập không có query. Không gọi URL thanh toán, không diễn giải trạng thái đó là kết quả một giao dịch thật.
- Role secretary có route placeholder trong source nhưng nằm ngoài bốn nhóm được yêu cầu và không có tài khoản QA; không tự tạo màn hình hoặc quyền mới.
- Chưa chạy user testing với người cao tuổi, screen reader, browser matrix hoặc kiểm tra WCAG toàn bộ app. Các vấn đề đo được và các giả thuyết usability được giữ tách biệt.

## Hướng xử lý sau duyệt

Brand: hướng nhận diện đáng tin nhưng không giống cơ quan nhà nước; ngôn ngữ “bạn”, thuật ngữ Việt, dấu rõ và màu có nghĩa. Design system sau duyệt brand mới xác định layout, component, dark mode, ánh xạ theme và wireframe từng route. Lỗi dữ liệu/hiển thị như NaN cần giữ là issue riêng nếu việc sửa vượt phạm vi visual; không đổi API để che lỗi.
