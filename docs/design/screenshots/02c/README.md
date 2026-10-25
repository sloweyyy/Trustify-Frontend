# Design 02c — Feedback states

Baseline: main 5e14c895. Desktop 1440×1000 and mobile 390×844 viewport captures. 18 matched before/after pairs plus four loading/error fixture screenshots.

Build, CRA ESLint and 19 targeted tests pass. Local all-role sign-in notifications and confirmation dialogs verified. No account saves, document submissions, signatures or payments. Notification timer remains 2500ms; login success uses role=status, errors retain alert. Remaining per-screen informational toast roles migrate when those screens are touched.

Queue request status/page/limit and service implementation are unchanged. The UI recognizes the existing returned error envelope and offers an explicit read-only retry. Loading/error fixtures intercept only local GET responses; no backend writes or production outage was induced. Populated pagination is covered by tests.

The existing authenticated shell still overflows at 390px; Design 03 must resolve every authenticated route. Modal and toast bounds are checked independently. Upload, stepper and responsive table/card work remain separate shared slices. Vercel primary Ready; all three QA roles and public loading clicked through. See vercel-checks.json.

## admin-confirmation-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-confirmation-desktop.png) | ![After](after-admin-confirmation-desktop.png) |

## admin-confirmation-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-confirmation-mobile.png) | ![After](after-admin-confirmation-mobile.png) |

## admin-notification-desktop

| Before | After |
| --- | --- |
| ![Before](before-admin-notification-desktop.png) | ![After](after-admin-notification-desktop.png) |

## admin-notification-mobile

| Before | After |
| --- | --- |
| ![Before](before-admin-notification-mobile.png) | ![After](after-admin-notification-mobile.png) |

## notary-confirmation-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-confirmation-desktop.png) | ![After](after-notary-confirmation-desktop.png) |

## notary-confirmation-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-confirmation-mobile.png) | ![After](after-notary-confirmation-mobile.png) |

## notary-notification-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-notification-desktop.png) | ![After](after-notary-notification-desktop.png) |

## notary-notification-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-notification-mobile.png) | ![After](after-notary-notification-mobile.png) |

## notary-pending-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-pending-desktop.png) | ![After](after-notary-pending-desktop.png) |

## notary-pending-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-pending-mobile.png) | ![After](after-notary-pending-mobile.png) |

## notary-signature-desktop

| Before | After |
| --- | --- |
| ![Before](before-notary-signature-desktop.png) | ![After](after-notary-signature-desktop.png) |

## notary-signature-mobile

| Before | After |
| --- | --- |
| ![Before](before-notary-signature-mobile.png) | ![After](after-notary-signature-mobile.png) |

## public-loading-desktop

| Before | After |
| --- | --- |
| ![Before](before-public-loading-desktop.png) | ![After](after-public-loading-desktop.png) |

## public-loading-mobile

| Before | After |
| --- | --- |
| ![Before](before-public-loading-mobile.png) | ![After](after-public-loading-mobile.png) |

## user-confirmation-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-confirmation-desktop.png) | ![After](after-user-confirmation-desktop.png) |

## user-confirmation-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-confirmation-mobile.png) | ![After](after-user-confirmation-mobile.png) |

## user-notification-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-notification-desktop.png) | ![After](after-user-notification-desktop.png) |

## user-notification-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-notification-mobile.png) | ![After](after-user-notification-mobile.png) |

## Controlled local loading/error fixtures

![after-notary-queue-error-desktop](after-notary-queue-error-desktop.png)

![after-notary-queue-error-mobile](after-notary-queue-error-mobile.png)

![after-notary-queue-loading-desktop](after-notary-queue-loading-desktop.png)

![after-notary-queue-loading-mobile](after-notary-queue-loading-mobile.png)

## Vercel preview

![vercel-admin-confirmation-desktop](vercel-admin-confirmation-desktop.png)

![vercel-admin-confirmation-mobile](vercel-admin-confirmation-mobile.png)

![vercel-notary-confirmation-desktop](vercel-notary-confirmation-desktop.png)

![vercel-notary-confirmation-mobile](vercel-notary-confirmation-mobile.png)

![vercel-notary-pending-desktop](vercel-notary-pending-desktop.png)

![vercel-notary-pending-mobile](vercel-notary-pending-mobile.png)

![vercel-notary-signature-desktop](vercel-notary-signature-desktop.png)

![vercel-notary-signature-mobile](vercel-notary-signature-mobile.png)

![vercel-public-loading-desktop](vercel-public-loading-desktop.png)

![vercel-public-loading-mobile](vercel-public-loading-mobile.png)

![vercel-user-confirmation-desktop](vercel-user-confirmation-desktop.png)

![vercel-user-confirmation-mobile](vercel-user-confirmation-mobile.png)
