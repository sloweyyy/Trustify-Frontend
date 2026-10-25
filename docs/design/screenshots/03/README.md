# Design 03 — Authenticated shell

Baseline main b25ab519. 40 before/after pairs cover 20 route/role combinations at 1440×1000 and 390×844. Nine additional screenshots show expanded mobile menus and collapsed desktop navigation.

Build, CRA ESLint and 21 targeted tests pass. Browser checks confirm full-width main content, no document overflow at390px, mobile focus trap/restore, route-change close, cancellation focus restore and desktop80/288px navigation. No blanket horizontal clipping/scroll rule was added to main. Existing tables retain their own horizontal scroll until table/card migration.

No backend/services/Redux/route definitions changed. No account/document/signature/payment mutations; payment result was opened without transaction parameters. Legacy secretary routes are blank placeholders with no supplied QA account; role menu is unit-tested. Full route-role metrics are in overflow-audit.json.

Vercel preview QA pending. Public header/footer follows separately in03b. Remaining shared upload/table-card work resumes after the shell, as Claude requested on PR13. Black wizard CTA and screen-specific polish remain for User04.

| Role | Route | Before width at390 | After width |
| --- | --- | --- | --- |
| user | /user/create-notarization-profile | 1056 | 390 |
| user | /user/history | 1146 | 390 |
| user | /user/notarization-session | 444 | 390 |
| user | /user/document-wallet | 461 | 390 |
| user | /profile | 686 | 390 |
| user | /payment/redirect | 428 | 390 |
| notary | /notary/dashboard | 552 | 390 |
| notary | /notary/pending-notarization-documents | 449 | 390 |
| notary | /notary/awaiting-signature-documents | 449 | 390 |
| notary | /notary/notarization-history | 554 | 390 |
| notary | /notary/notary-session-management | 636 | 390 |
| notary | /profile | 686 | 390 |
| notary | /payment/redirect | 428 | 390 |
| admin | /admin/dashboard | 1440 | 390 |
| admin | /admin/employee-management | 1076 | 390 |
| admin | /admin/user-management | 1076 | 390 |
| admin | /admin/notary-management | 1440 | 390 |
| admin | /admin/settings | 390 | 390 |
| admin | /profile | 686 | 390 |
| admin | /payment/redirect | 428 | 390 |

## admin-admin-dashboard-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-dashboard-desktop.png) | ![After](after-admin-admin-dashboard-desktop.png) |

## admin-admin-dashboard-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-dashboard-mobile.png) | ![After](after-admin-admin-dashboard-mobile.png) |

## admin-admin-employee-management-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-employee-management-desktop.png) | ![After](after-admin-admin-employee-management-desktop.png) |

## admin-admin-employee-management-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-employee-management-mobile.png) | ![After](after-admin-admin-employee-management-mobile.png) |

## admin-admin-notary-management-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-notary-management-desktop.png) | ![After](after-admin-admin-notary-management-desktop.png) |

## admin-admin-notary-management-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-notary-management-mobile.png) | ![After](after-admin-admin-notary-management-mobile.png) |

## admin-admin-settings-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-settings-desktop.png) | ![After](after-admin-admin-settings-desktop.png) |

## admin-admin-settings-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-settings-mobile.png) | ![After](after-admin-admin-settings-mobile.png) |

## admin-admin-user-management-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-user-management-desktop.png) | ![After](after-admin-admin-user-management-desktop.png) |

## admin-admin-user-management-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-admin-user-management-mobile.png) | ![After](after-admin-admin-user-management-mobile.png) |

## admin-payment-redirect-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-payment-redirect-desktop.png) | ![After](after-admin-payment-redirect-desktop.png) |

## admin-payment-redirect-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-payment-redirect-mobile.png) | ![After](after-admin-payment-redirect-mobile.png) |

## admin-profile-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-profile-desktop.png) | ![After](after-admin-profile-desktop.png) |

## admin-profile-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-profile-mobile.png) | ![After](after-admin-profile-mobile.png) |

## notary-notary-awaiting-signature-documents-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-awaiting-signature-documents-desktop.png) | ![After](after-notary-notary-awaiting-signature-documents-desktop.png) |

## notary-notary-awaiting-signature-documents-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-awaiting-signature-documents-mobile.png) | ![After](after-notary-notary-awaiting-signature-documents-mobile.png) |

## notary-notary-dashboard-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-dashboard-desktop.png) | ![After](after-notary-notary-dashboard-desktop.png) |

## notary-notary-dashboard-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-dashboard-mobile.png) | ![After](after-notary-notary-dashboard-mobile.png) |

## notary-notary-notarization-history-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-notarization-history-desktop.png) | ![After](after-notary-notary-notarization-history-desktop.png) |

## notary-notary-notarization-history-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-notarization-history-mobile.png) | ![After](after-notary-notary-notarization-history-mobile.png) |

## notary-notary-notary-session-management-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-notary-session-management-desktop.png) | ![After](after-notary-notary-notary-session-management-desktop.png) |

## notary-notary-notary-session-management-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-notary-session-management-mobile.png) | ![After](after-notary-notary-notary-session-management-mobile.png) |

## notary-notary-pending-notarization-documents-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-pending-notarization-documents-desktop.png) | ![After](after-notary-notary-pending-notarization-documents-desktop.png) |

## notary-notary-pending-notarization-documents-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notary-pending-notarization-documents-mobile.png) | ![After](after-notary-notary-pending-notarization-documents-mobile.png) |

## notary-payment-redirect-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-payment-redirect-desktop.png) | ![After](after-notary-payment-redirect-desktop.png) |

## notary-payment-redirect-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-payment-redirect-mobile.png) | ![After](after-notary-payment-redirect-mobile.png) |

## notary-profile-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-profile-desktop.png) | ![After](after-notary-profile-desktop.png) |

## notary-profile-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-profile-mobile.png) | ![After](after-notary-profile-mobile.png) |

## user-payment-redirect-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-payment-redirect-desktop.png) | ![After](after-user-payment-redirect-desktop.png) |

## user-payment-redirect-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-payment-redirect-mobile.png) | ![After](after-user-payment-redirect-mobile.png) |

## user-profile-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-profile-desktop.png) | ![After](after-user-profile-desktop.png) |

## user-profile-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-profile-mobile.png) | ![After](after-user-profile-mobile.png) |

## user-user-create-notarization-profile-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-user-create-notarization-profile-desktop.png) | ![After](after-user-user-create-notarization-profile-desktop.png) |

## user-user-create-notarization-profile-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-user-create-notarization-profile-mobile.png) | ![After](after-user-user-create-notarization-profile-mobile.png) |

## user-user-document-wallet-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-user-document-wallet-desktop.png) | ![After](after-user-user-document-wallet-desktop.png) |

## user-user-document-wallet-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-user-document-wallet-mobile.png) | ![After](after-user-user-document-wallet-mobile.png) |

## user-user-history-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-user-history-desktop.png) | ![After](after-user-user-history-desktop.png) |

## user-user-history-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-user-history-mobile.png) | ![After](after-user-user-history-mobile.png) |

## user-user-notarization-session-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-user-notarization-session-desktop.png) | ![After](after-user-user-notarization-session-desktop.png) |

## user-user-notarization-session-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-user-notarization-session-mobile.png) | ![After](after-user-user-notarization-session-mobile.png) |

## Navigation states

![after-admin-menu-collapsed-desktop](after-admin-menu-collapsed-desktop.png)

![after-admin-menu-mobile](after-admin-menu-mobile.png)

![after-notary-menu-collapsed-desktop](after-notary-menu-collapsed-desktop.png)

![after-notary-menu-mobile](after-notary-menu-mobile.png)

![after-user-menu-collapsed-desktop](after-user-menu-collapsed-desktop.png)

![after-user-menu-mobile](after-user-menu-mobile.png)
