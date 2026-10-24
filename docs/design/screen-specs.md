

## Phụ lục B — Đặc tả và wireframe từng màn hình

Các khung dưới đây là thứ tự và cấu trúc thông tin. [Bảng duyệt tương tác](index.html) hiển thị cùng dữ liệu và mock đại diện; [screens.json](screens.json) là bản máy đọc được. Desktop công chứng viên/quản trị ưu tiên thông lượng; mobile không yêu cầu cuộn toàn trang theo chiều ngang.

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
