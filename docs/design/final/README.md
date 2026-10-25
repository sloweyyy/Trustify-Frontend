# Trustify — final before/after galleries

**Frontend source:** merged PR #47, commit `0a9d0f5`. **Overall production gate:** pending the unchanged Admin session-list API failure in [#46](https://github.com/sloweyyy/Trustify-Frontend/issues/46), with the backend maintainer’s fix in Backend PR15 awaiting owner merge.

[Open the interactive local gallery](index.html). The original pre-design audit contains36 route/role views + the Public chatbot (74 images). The final audit has43 route/role cases at320/390/768/1440, plus8 assistant checks. Shared authenticated Verify/Payment and the intermediate OAuth loader were not all photographed in the original audit; missing before images are explicitly marked.

Production Public images are from the merged UI. Authenticated screenshots use anonymized display data, synthetic order codes and IDs; private role images were rendered at34ea3af, the identical visual source of #47 before the nonvisual inherited Autocomplete label correction. The final production DOM audit verifies that correction. Synthetic state fixtures and local-only chatbot fulfillment are labelled. No actual document/session/profile/payment/signature/approval/chat write was submitted.

## Công khai

| Screen / route | Before desktop | After desktop | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Trang chủ · `/` | [Before](../../brand/audit/screenshots/public-home-desktop.png) | [After](../screenshots/final/routes/public-home-desktop.png) | [Before](../../brand/audit/screenshots/public-home-mobile.png) | [After](../screenshots/final/routes/public-home-mobile.png) |
| Dịch vụ công chứng · `/services` | [Before](../../brand/audit/screenshots/public-services-desktop.png) | [After](../screenshots/final/routes/public-services-desktop.png) | [Before](../../brand/audit/screenshots/public-services-mobile.png) | [After](../screenshots/final/routes/public-services-mobile.png) |
| Tra cứu hồ sơ · `/lookup` | [Before](../../brand/audit/screenshots/public-lookup-desktop.png) | [After](../screenshots/final/routes/public-lookup-desktop.png) | [Before](../../brand/audit/screenshots/public-lookup-mobile.png) | [After](../screenshots/final/routes/public-lookup-mobile.png) |
| Xác minh hồ sơ · `/verify` | [Before](../../brand/audit/screenshots/public-verify-desktop.png) | [After](../screenshots/final/routes/public-verify-desktop.png) | [Before](../../brand/audit/screenshots/public-verify-mobile.png) | [After](../screenshots/final/routes/public-verify-mobile.png) |
| Giá dịch vụ · `/pricing` | [Before](../../brand/audit/screenshots/public-pricing-desktop.png) | [After](../screenshots/final/routes/public-pricing-desktop.png) | [Before](../../brand/audit/screenshots/public-pricing-mobile.png) | [After](../screenshots/final/routes/public-pricing-mobile.png) |
| Chính sách bảo mật · `/privacy-policy` | [Before](../../brand/audit/screenshots/public-privacy-policy-desktop.png) | [After](../screenshots/final/routes/public-privacy-policy-desktop.png) | [Before](../../brand/audit/screenshots/public-privacy-policy-mobile.png) | [After](../screenshots/final/routes/public-privacy-policy-mobile.png) |
| Bảo mật thanh toán · `/payment-security` | [Before](../../brand/audit/screenshots/public-payment-security-desktop.png) | [After](../screenshots/final/routes/public-payment-security-desktop.png) | [Before](../../brand/audit/screenshots/public-payment-security-mobile.png) | [After](../screenshots/final/routes/public-payment-security-mobile.png) |
| Điều khoản sử dụng · `/terms-of-service` | [Before](../../brand/audit/screenshots/public-terms-of-service-desktop.png) | [After](../screenshots/final/routes/public-terms-of-service-desktop.png) | [Before](../../brand/audit/screenshots/public-terms-of-service-mobile.png) | [After](../screenshots/final/routes/public-terms-of-service-mobile.png) |
| Quy chế hoạt động · `/operating-regulations` | [Before](../../brand/audit/screenshots/public-operating-regulations-desktop.png) | [After](../screenshots/final/routes/public-operating-regulations-desktop.png) | [Before](../../brand/audit/screenshots/public-operating-regulations-mobile.png) | [After](../screenshots/final/routes/public-operating-regulations-mobile.png) |
| Giải quyết khiếu nại · `/dispute-resolution` | [Before](../../brand/audit/screenshots/public-dispute-resolution-desktop.png) | [After](../screenshots/final/routes/public-dispute-resolution-desktop.png) | [Before](../../brand/audit/screenshots/public-dispute-resolution-mobile.png) | [After](../screenshots/final/routes/public-dispute-resolution-mobile.png) |
| Dành cho cá nhân · `/for-individuals` | [Before](../../brand/audit/screenshots/public-for-individuals-desktop.png) | [After](../screenshots/final/routes/public-for-individuals-desktop.png) | [Before](../../brand/audit/screenshots/public-for-individuals-mobile.png) | [After](../screenshots/final/routes/public-for-individuals-mobile.png) |
| Dành cho văn phòng công chứng · `/for-notary-offices` | [Before](../../brand/audit/screenshots/public-for-notary-offices-desktop.png) | [After](../screenshots/final/routes/public-for-notary-offices-desktop.png) | [Before](../../brand/audit/screenshots/public-for-notary-offices-mobile.png) | [After](../screenshots/final/routes/public-for-notary-offices-mobile.png) |
| Hướng dẫn sử dụng · `/user-guide` | [Before](../../brand/audit/screenshots/public-user-guide-desktop.png) | [After](../screenshots/final/routes/public-user-guide-desktop.png) | [Before](../../brand/audit/screenshots/public-user-guide-mobile.png) | [After](../screenshots/final/routes/public-user-guide-mobile.png) |
| Đăng nhập · `/signin` | [Before](../../brand/audit/screenshots/public-signin-desktop.png) | [After](../screenshots/final/routes/public-signin-desktop.png) | [Before](../../brand/audit/screenshots/public-signin-mobile.png) | [After](../screenshots/final/routes/public-signin-mobile.png) |
| Đăng ký · `/signup` | [Before](../../brand/audit/screenshots/public-signup-desktop.png) | [After](../screenshots/final/routes/public-signup-desktop.png) | [Before](../../brand/audit/screenshots/public-signup-mobile.png) | [After](../screenshots/final/routes/public-signup-mobile.png) |
| Quên mật khẩu · `/forgot-password` | [Before](../../brand/audit/screenshots/public-forgot-password-desktop.png) | [After](../screenshots/final/routes/public-forgot-password-desktop.png) | [Before](../../brand/audit/screenshots/public-forgot-password-mobile.png) | [After](../screenshots/final/routes/public-forgot-password-mobile.png) |
| Đặt lại mật khẩu · `/reset-password` | [Before](../../brand/audit/screenshots/public-reset-password-desktop.png) | [After](../screenshots/final/routes/public-reset-password-desktop.png) | [Before](../../brand/audit/screenshots/public-reset-password-mobile.png) | [After](../screenshots/final/routes/public-reset-password-mobile.png) |
| Kết quả thanh toán · `/payment/redirect` | [Before](../../brand/audit/screenshots/public-payment-redirect-desktop.png) | [After](../screenshots/final/routes/public-payment-redirect-desktop.png) | [Before](../../brand/audit/screenshots/public-payment-redirect-mobile.png) | [After](../screenshots/final/routes/public-payment-redirect-mobile.png) |
| Không tìm thấy trang · `/not-a-route` | [Before](../../brand/audit/screenshots/public-not-a-route-desktop.png) | [After](../screenshots/final/routes/public-not-a-route-desktop.png) | [Before](../../brand/audit/screenshots/public-not-a-route-mobile.png) | [After](../screenshots/final/routes/public-not-a-route-mobile.png) |
| Đang hoàn tất đăng nhập · `/third-party` | Not captured | [After](../screenshots/final/routes/public-third-party-desktop.png) | Not captured | [After](../screenshots/final/routes/public-third-party-mobile.png) |

## Người dùng

| Screen / route | Before desktop | After desktop | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Tạo hồ sơ công chứng · `/user/create-notarization-profile` | [Before](../../brand/audit/screenshots/user-user-create-notarization-profile-desktop.png) | [After](../screenshots/final/routes/user-user-create-notarization-profile-desktop.png) | [Before](../../brand/audit/screenshots/user-user-create-notarization-profile-mobile.png) | [After](../screenshots/final/routes/user-user-create-notarization-profile-mobile.png) |
| Lịch sử hồ sơ công chứng · `/user/history` | [Before](../../brand/audit/screenshots/user-user-history-desktop.png) | [After](../screenshots/final/routes/user-user-history-desktop.png) | [Before](../../brand/audit/screenshots/user-user-history-mobile.png) | [After](../screenshots/final/routes/user-user-history-mobile.png) |
| Phiên công chứng · `/user/notarization-session` | [Before](../../brand/audit/screenshots/user-user-notarization-session-desktop.png) | [After](../screenshots/final/routes/user-user-notarization-session-desktop.png) | [Before](../../brand/audit/screenshots/user-user-notarization-session-mobile.png) | [After](../screenshots/final/routes/user-user-notarization-session-mobile.png) |
| Ví tài liệu · `/user/document-wallet` | [Before](../../brand/audit/screenshots/user-user-document-wallet-desktop.png) | [After](../screenshots/final/routes/user-user-document-wallet-desktop.png) | [Before](../../brand/audit/screenshots/user-user-document-wallet-mobile.png) | [After](../screenshots/final/routes/user-user-document-wallet-mobile.png) |
| Thông tin cá nhân · `/profile` | [Before](../../brand/audit/screenshots/user-profile-desktop.png) | [After](../screenshots/final/routes/user-profile-desktop.png) | [Before](../../brand/audit/screenshots/user-profile-mobile.png) | [After](../screenshots/final/routes/user-profile-mobile.png) |
| Xác minh hồ sơ · `/verify` | Not captured | [After](../screenshots/final/routes/user-verify-desktop.png) | Not captured | [After](../screenshots/final/routes/user-verify-mobile.png) |
| Kết quả thanh toán · `/payment/redirect` | Not captured | [After](../screenshots/final/routes/user-payment-redirect-desktop.png) | Not captured | [After](../screenshots/final/routes/user-payment-redirect-mobile.png) |

## Công chứng viên

| Screen / route | Before desktop | After desktop | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Tổng quan công chứng · `/notary/dashboard` | [Before](../../brand/audit/screenshots/notary-notary-dashboard-desktop.png) | [After](../screenshots/final/routes/notary-notary-dashboard-desktop.png) | [Before](../../brand/audit/screenshots/notary-notary-dashboard-mobile.png) | [After](../screenshots/final/routes/notary-notary-dashboard-mobile.png) |
| Hồ sơ chờ xử lý · `/notary/pending-notarization-documents` | [Before](../../brand/audit/screenshots/notary-notary-pending-notarization-documents-desktop.png) | [After](../screenshots/final/routes/notary-notary-pending-notarization-documents-desktop.png) | [Before](../../brand/audit/screenshots/notary-notary-pending-notarization-documents-mobile.png) | [After](../screenshots/final/routes/notary-notary-pending-notarization-documents-mobile.png) |
| Hồ sơ chờ ký số · `/notary/awaiting-signature-documents` | [Before](../../brand/audit/screenshots/notary-notary-awaiting-signature-documents-desktop.png) | [After](../screenshots/final/routes/notary-notary-awaiting-signature-documents-desktop.png) | [Before](../../brand/audit/screenshots/notary-notary-awaiting-signature-documents-mobile.png) | [After](../screenshots/final/routes/notary-notary-awaiting-signature-documents-mobile.png) |
| Quản lý phiên công chứng · `/notary/notary-session-management` | [Before](../../brand/audit/screenshots/notary-notary-notary-session-management-desktop.png) | [After](../screenshots/final/routes/notary-notary-notary-session-management-desktop.png) | [Before](../../brand/audit/screenshots/notary-notary-notary-session-management-mobile.png) | [After](../screenshots/final/routes/notary-notary-notary-session-management-mobile.png) |
| Lịch sử công chứng · `/notary/notarization-history` | [Before](../../brand/audit/screenshots/notary-notary-notarization-history-desktop.png) | [After](../screenshots/final/routes/notary-notary-notarization-history-desktop.png) | [Before](../../brand/audit/screenshots/notary-notary-notarization-history-mobile.png) | [After](../screenshots/final/routes/notary-notary-notarization-history-mobile.png) |
| Thông tin cá nhân · `/profile` | [Before](../../brand/audit/screenshots/notary-profile-desktop.png) | [After](../screenshots/final/routes/notary-profile-desktop.png) | [Before](../../brand/audit/screenshots/notary-profile-mobile.png) | [After](../screenshots/final/routes/notary-profile-mobile.png) |
| Xác minh hồ sơ · `/verify` | Not captured | [After](../screenshots/final/routes/notary-verify-desktop.png) | Not captured | [After](../screenshots/final/routes/notary-verify-mobile.png) |
| Kết quả thanh toán · `/payment/redirect` | Not captured | [After](../screenshots/final/routes/notary-payment-redirect-desktop.png) | Not captured | [After](../screenshots/final/routes/notary-payment-redirect-mobile.png) |

## Quản trị viên

| Screen / route | Before desktop | After desktop | Before mobile | After mobile |
| --- | --- | --- | --- | --- |
| Tổng quan quản trị · `/admin/dashboard` | [Before](../../brand/audit/screenshots/admin-admin-dashboard-desktop.png) | [After](../screenshots/final/routes/admin-admin-dashboard-desktop.png) | [Before](../../brand/audit/screenshots/admin-admin-dashboard-mobile.png) | [After](../screenshots/final/routes/admin-admin-dashboard-mobile.png) |
| Quản lý nhân viên · `/admin/employee-management` | [Before](../../brand/audit/screenshots/admin-admin-employee-management-desktop.png) | [After](../screenshots/final/routes/admin-admin-employee-management-desktop.png) | [Before](../../brand/audit/screenshots/admin-admin-employee-management-mobile.png) | [After](../screenshots/final/routes/admin-admin-employee-management-mobile.png) |
| Quản lý người dùng · `/admin/user-management` | [Before](../../brand/audit/screenshots/admin-admin-user-management-desktop.png) | [After](../screenshots/final/routes/admin-admin-user-management-desktop.png) | [Before](../../brand/audit/screenshots/admin-admin-user-management-mobile.png) | [After](../screenshots/final/routes/admin-admin-user-management-mobile.png) |
| Quản lý công chứng · `/admin/notary-management` | [Before](../../brand/audit/screenshots/admin-admin-notary-management-desktop.png) | [After](../screenshots/final/routes/admin-admin-notary-management-desktop.png) | [Before](../../brand/audit/screenshots/admin-admin-notary-management-mobile.png) | [After](../screenshots/final/routes/admin-admin-notary-management-mobile.png) |
| Cài đặt · `/admin/settings` | [Before](../../brand/audit/screenshots/admin-admin-settings-desktop.png) | [After](../screenshots/final/routes/admin-admin-settings-desktop.png) | [Before](../../brand/audit/screenshots/admin-admin-settings-mobile.png) | [After](../screenshots/final/routes/admin-admin-settings-mobile.png) |
| Thông tin cá nhân · `/profile` | [Before](../../brand/audit/screenshots/admin-profile-desktop.png) | [After](../screenshots/final/routes/admin-profile-desktop.png) | [Before](../../brand/audit/screenshots/admin-profile-mobile.png) | [After](../screenshots/final/routes/admin-profile-mobile.png) |
| Xác minh hồ sơ · `/verify` | Not captured | [After](../screenshots/final/routes/admin-verify-desktop.png) | Not captured | [After](../screenshots/final/routes/admin-verify-mobile.png) |
| Kết quả thanh toán · `/payment/redirect` | Not captured | [After](../screenshots/final/routes/admin-payment-redirect-desktop.png) | Not captured | [After](../screenshots/final/routes/admin-payment-redirect-mobile.png) |

## Evidence and limits

- [Production172-case audit](production-route-audit.json), [local172-case audit](local-route-audit.json), [homepage HTTP200 health](production-health.json).
- [27 synthetic state captures and interaction checks](state-audit.json), including actual canvas ink without saving, four Notary previews, error/retry, charts and their HTML tables.
- [14 wizard captures](wizard-audit.json): three steps, file-menu/selection and review; no hồ sơ sent.
- [Native Chrome200% observations](native-zoom.json): representative views from all four roles and a confirmation dialog; the responsive matrix is not mislabelled as native zoom. The Mac locked before the dedicated localhost QA origin’s temporary zoom could be reset; the QA tab was closed. No production browser zoom changed.
- [Source invariants](invariants.json):55 Route/guard entries unchanged (including the preexisting empty/duplicate Secretary placeholders); Redux, dependencies and lockfile unchanged; services have only the documented lint-only changes. Secretary has no implemented workflow screens or supplied QA login and is outside the approved four-role screen specification; no new workflow was invented.
- [Full test result](tests.log):68 suites/350 tests pass. [Build result](build.log):compiled successfully. Strict build/test CI passed on #47.
- [Original audit and source limits](../../brand/audit/existing-screen-audit.md). Before and after use the same route/viewport but backend data changed during the project; visual comparisons do not assert an identical dataset.
- Solana devnet records remain a test-network reference. No independent legal or cryptographic certification is claimed by this UI.

## Remaining follow-ups

1. **Completion gate:** backend maintainer’s PR15 must be merged/deployed, then repeat the real Admin session GET/UI check and close frontend issue #46. This task does not merge or edit backend code.
2. PaymentRedirect retains the preexisting unknown/bare-query handling and timer by the approved guardrail; improving the return destination/unknown status is a separate product change. Never test a fabricated live orderCode.
3. Consider an explicit recipient/document/quantity confirmation for real wallet sharing in a separate behavioral change. Existing handler and eligibility rules were retained.
4. Existing legal policy wording/contact facts were preserved, not independently revalidated. Fee schedules remain unpublished until authoritative catalog data is provided.
5. Preexisting empty Secretary routes and unused legacy modules can be addressed separately; no route or permission was removed during the revamp.

## Implementation PRs

| PR | Change |
| --- | --- |
| [#8](https://github.com/sloweyyy/Trustify-Frontend/pull/8) | Apply approved logo B, favicon and public brand assets |
| [#10](https://github.com/sloweyyy/Trustify-Frontend/pull/10) | Design 01: Tokens and MUI theme overrides |
| [#11](https://github.com/sloweyyy/Trustify-Frontend/pull/11) | Design 02: Shared document statuses and filters |
| [#12](https://github.com/sloweyyy/Trustify-Frontend/pull/12) | Design 02b: Shared form controls |
| [#13](https://github.com/sloweyyy/Trustify-Frontend/pull/13) | Design 02c: Confirmation and feedback states |
| [#14](https://github.com/sloweyyy/Trustify-Frontend/pull/14) | Design 03: Responsive authenticated app shell |
| [#15](https://github.com/sloweyyy/Trustify-Frontend/pull/15) | Design 03b: Public navigation and responsive footer |
| [#16](https://github.com/sloweyyy/Trustify-Frontend/pull/16) | Design 02d: Accessible file selection and attachments |
| [#17](https://github.com/sloweyyy/Trustify-Frontend/pull/17) | Design 02e: Responsive wallet and document preview dialogs |
| [#18](https://github.com/sloweyyy/Trustify-Frontend/pull/18) | Design 04: Clear notarization wizard and JPEG support |
| [#19](https://github.com/sloweyyy/Trustify-Frontend/pull/19) | Design 05a: History and reliable submission handoff |
| [#20](https://github.com/sloweyyy/Trustify-Frontend/pull/20) | Design 05b: payment result presentation |
| [#21](https://github.com/sloweyyy/Trustify-Frontend/pull/21) | Design 05c: history detail dialog and lifecycle |
| [#22](https://github.com/sloweyyy/Trustify-Frontend/pull/22) | Design 05d: responsive signature pad and notary feedback |
| [#23](https://github.com/sloweyyy/Trustify-Frontend/pull/23) | Design 06a: User session list and cards |
| [#24](https://github.com/sloweyyy/Trustify-Frontend/pull/24) | Design 06b: session detail and signature presentation |
| [#26](https://github.com/sloweyyy/Trustify-Frontend/pull/26) | Design 06c: session creation and invitation dialogs |
| [#27](https://github.com/sloweyyy/Trustify-Frontend/pull/27) | Design 06d: clarify document wallet and unify responsive cards |
| [#29](https://github.com/sloweyyy/Trustify-Frontend/pull/29) | Design 06e: wallet sharing and purchase dialogs |
| [#30](https://github.com/sloweyyy/Trustify-Frontend/pull/30) | Design 06f: shared profile and responsive edit dialog |
| [#31](https://github.com/sloweyyy/Trustify-Frontend/pull/31) | Design 07: notary overview and document queues |
| [#32](https://github.com/sloweyyy/Trustify-Frontend/pull/32) | Design 07b: side-by-side notary processing review |
| [#33](https://github.com/sloweyyy/Trustify-Frontend/pull/33) | Design 07c: notary signature and history review |
| [#34](https://github.com/sloweyyy/Trustify-Frontend/pull/34) | Design 07d: notary history and session lists |
| [#35](https://github.com/sloweyyy/Trustify-Frontend/pull/35) | Design 07e: notary processing-session review |
| [#36](https://github.com/sloweyyy/Trustify-Frontend/pull/36) | Design 07f: notary session signatures and cards |
| [#38](https://github.com/sloweyyy/Trustify-Frontend/pull/38) | Design 08: Admin dashboard metrics and charts |
| [#39](https://github.com/sloweyyy/Trustify-Frontend/pull/39) | Design 08b: employee and user management lists |
| [#40](https://github.com/sloweyyy/Trustify-Frontend/pull/40) | Design 08c: management account dialogs |
| [#41](https://github.com/sloweyyy/Trustify-Frontend/pull/41) | Design 08d: Admin management states and mobile grids |
| [#42](https://github.com/sloweyyy/Trustify-Frontend/pull/42) | Design 09: all public screens |
| [#43](https://github.com/sloweyyy/Trustify-Frontend/pull/43) | Design 10: accessible chatbot across every role |
| [#44](https://github.com/sloweyyy/Trustify-Frontend/pull/44) | Design 11: cleanup retired styles and semantic colors |
| [#45](https://github.com/sloweyyy/Trustify-Frontend/pull/45) | Design 11b: full-suite tests in CI and final lint cleanup |
| [#47](https://github.com/sloweyyy/Trustify-Frontend/pull/47) | Design 11c: final responsive and accessibility QA fixes |

The final gallery/report PR will be linked in PROGRESS.md once created. The “Design revamp complete” issue is deliberately not opened while the production API gate remains unresolved.
