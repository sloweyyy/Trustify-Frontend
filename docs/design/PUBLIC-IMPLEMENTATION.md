# Giai đoạn09 — Toàn bộ giao diện công khai trong một PR

Theo yêu cầu trực tiếp của chủ sản phẩm, giai đoạn này dùng **một PR**, thay giới hạn chia~800 dòng cho riêng public. Nền so sánh: `f9898e0`. Giữ các route/guard, Redux, dịch vụ và API hiện có. QA trình duyệt, ảnh trước/sau, bàn phím, zoom và production theo mọi vai trò thực hiện sau khi hoàn tất triển khai.

| Route | Nội dung triển khai |
| --- | --- |
| `/` | Nhận diện B, khẩu hiệu đã duyệt, CTA đăng nhập, các bước và liên kết dịch vụ/tra cứu/xác minh; bỏ danh xưng quốc gia và đánh giá không có căn cứ. |
| `/services` | Danh mục từ cùng service, tìm tên, mở thêm9 mục mỗi lần, lỗi/thử lại và CTA về đăng nhập. Không thêm giá hoặc thời gian xử lý. |
| `/lookup` | Nhãn mã hồ sơ, kết quả/trạng thái rõ, lỗi mạng tách khỏi không tìm thấy, chi tiết toàn màn hình mobile; mã hồ sơ dùng documentId thay mã theo dõi nội bộ. |
| `/verify` | Giải thích mã bản ghi/địa chỉ mint, thông tin devnet, liên kết metadata nguyên gốc; tìm thấy bản ghi không được diễn đạt như chứng minh pháp lý/nội dung tệp. |
| `/user-guide` | Các bước theo chức năng đang có; không hứa lịch hẹn/video/SMS/chuyển phát chưa được triển khai. |
| `/for-individuals`, `/for-notary-offices` | Phạm vi sử dụng theo vai trò, không hứa tính năng doanh nghiệp hoặc xử lý từ xa cho mọi hồ sơ. |
| `/pricing` | Phân biệt phí hồ sơ/tài liệu/giải pháp văn phòng. Không công bố các mức USD/phụ phí và cam kết gói hardcoded chưa được xác nhận; không đổi sang VND hoặc thêm mua gói. CTA email dùng cùng địa chỉ hiện có trong Footer. Cần chủ sản phẩm xác nhận bảng phí trước khi công bố. |
| `/privacy-policy`, `/payment-security`, `/terms-of-service`, `/operating-regulations`, `/dispute-resolution` | Khung đọc, mục lục neo, heading và chữ16px; **giữ nguyên thân chính sách/nghĩa vụ/danh sách/liên hệ hiện có**. Không xác nhận lại nội dung pháp lý hoặc thông tin liên hệ. |
| `/signin`, `/signup` | Khung nhận diện dùng theme chung, biểu mẫu có tên truy cập, nhãn hiện/ẩn mật khẩu tiếng Việt. Payload/validation/OAuth/đích đăng nhập giữ nguyên. Đăng nhập dùng một handler submit, bỏ handler chỉ log thông tin. |
| `/forgot-password`, `/reset-password` | Biểu mẫu có nhãn, mật khẩu ẩn, đọc được trên mobile, khóa nút khi gửi. Email/token/password và các timer/đích chuyển hướng giữ nguyên; lỗi gửi yêu cầu mở lại nút thử. |
| `/third-party`, fallback khi tải trang, `*` | Trạng thái tải và không tìm thấy trang tiếng Việt, hành động về trang chủ giữ nguyên. |

Dialog quên mật khẩu cũ trong cây SignIn được sửa từ method không tồn tại `AuthService.ForgotPasswordModal` sang `forgotPassword(email)` hiện có. Service trả về body204, không phải axios response. Link đăng nhập vẫn đi đến `/forgot-password`; không thêm endpoint.

## Chứng cứ kiểm tra mã

- `CI=false npm run build`.
- CRA ESLint cho tất cả module thay đổi.
-11 kiểm tra tập trung: danh mục/tìm/mở thêm, mã tra cứu và các kết quả200/404/500, trạng thái từ chối và documentId, mint/link metadata, email yêu cầu reset/body204, mở lại nút sau lỗi, token/mật khẩu reset, một payload Redux đăng nhập và payload đăng ký/đích chuyển hướng.
- [public-policy-parity.json](public-policy-parity.json): so sánh JSX text trong thân năm chính sách với commit nền; tất cả giống nhau. Header trang trí được thay, nội dung thân được giữ. Các mảng nội dung chính sách trong prefix cũng được giữ nguyên.
- Không đổi `src/services/`, `src/stores/`, `src/App.js`, dependencies hoặc backend. Không tạo tài khoản/hồ sơ, gửi email, ký hoặc thanh toán thực để kiểm tra.

## Kiểm tra cuối còn phải làm

Mọi route ở1440/390, bàn phím/focus/đóng dialog, chữ200%, mục lục, lỗi/empty/populated và link; role guards, auth thật bằng tài khoản QA, xác minh chỉ đọc. Chụp gallery trước/sau và xác nhận production sau giai đoạn10/11. Các thông tin chính sách/liên hệ và bảng phí cần được chủ sản phẩm xác nhận trước khi xem đó là nội dung được thẩm định.
