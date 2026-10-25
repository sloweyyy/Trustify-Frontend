# Design 05a — History, mobile hồ sơ cards and pending payments

Baseline main `8fba197`. Twenty before/after pairs cover populated history/payment banners, the table/mobile list, search matches/no results, empty history, history read failure/loading, payment read failure/loading and the successful-submit handoff, each at1440/390. Read fixtures use local history/payment responses; checkout URLs are non-production examples and never activated.

Build/CRA ESLint/34 tests pass. Desktop and mobile retain the original comparator, filter values, translated-status search and record IDs. Filtering resets/clamps visual pagination and counts the filtered rows. Table rows and card buttons open the existing detail modal with the same raw document ID. Unused bulk-selection checkboxes were removed; no backend bulk action existed. Cards include ID, date, service and the shared DocumentStatusChip. Dates now label createdAt as Ngày gửi.

PendingPayments still calls getMyPayments(pending), excludes missing checkoutUrl and uses each exact href and amount. It now distinguishes loading/failure from an empty list, retries only that GET and gives44px payment actions. No payment status is updated. Successful wizard submits clear wallet selections and navigate to the existing /user/history route. FormData remains unchanged; failed submissions stay in review.

Safety/evidence: read-only captures and local keyboard/filter checks record zero non-auth writes. The success handoff separately fulfills one upload POST locally with status200 and blocks every other non-auth write; no upload reaches the backend. FormData/native bytes and wallet clearing/navigation are unit-mocked. No real submission, signing or checkout occurred. Existing detail-modal/signature presentation follows05c; payment-result presentation follows05b. Vercel all-role QA pending.

## history-payments-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-payments-desktop.png) | ![After](after-history-payments-desktop.png) |

## history-payments-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-payments-mobile.png) | ![After](after-history-payments-mobile.png) |

## history-list-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-list-desktop.png) | ![After](after-history-list-desktop.png) |

## history-list-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-list-mobile.png) | ![After](after-history-list-mobile.png) |

## history-filtered-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-filtered-desktop.png) | ![After](after-history-filtered-desktop.png) |

## history-filtered-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-filtered-mobile.png) | ![After](after-history-filtered-mobile.png) |

## history-no-results-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-no-results-desktop.png) | ![After](after-history-no-results-desktop.png) |

## history-no-results-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-no-results-mobile.png) | ![After](after-history-no-results-mobile.png) |

## history-empty-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-empty-desktop.png) | ![After](after-history-empty-desktop.png) |

## history-empty-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-empty-mobile.png) | ![After](after-history-empty-mobile.png) |

## history-error-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-error-desktop.png) | ![After](after-history-error-desktop.png) |

## history-error-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-error-mobile.png) | ![After](after-history-error-mobile.png) |

## history-loading-desktop

| Before | After |
| --- | --- |
| ![Before](before-history-loading-desktop.png) | ![After](after-history-loading-desktop.png) |

## history-loading-mobile

| Before | After |
| --- | --- |
| ![Before](before-history-loading-mobile.png) | ![After](after-history-loading-mobile.png) |

## payment-error-desktop

| Before | After |
| --- | --- |
| ![Before](before-payment-error-desktop.png) | ![After](after-payment-error-desktop.png) |

## payment-error-mobile

| Before | After |
| --- | --- |
| ![Before](before-payment-error-mobile.png) | ![After](after-payment-error-mobile.png) |

## payment-loading-desktop

| Before | After |
| --- | --- |
| ![Before](before-payment-loading-desktop.png) | ![After](after-payment-loading-desktop.png) |

## payment-loading-mobile

| Before | After |
| --- | --- |
| ![Before](before-payment-loading-mobile.png) | ![After](after-payment-loading-mobile.png) |

## wizard-success-desktop

| Before | After |
| --- | --- |
| ![Before](before-wizard-success-desktop.png) | ![After](after-wizard-success-desktop.png) |

## wizard-success-mobile

| Before | After |
| --- | --- |
| ![Before](before-wizard-success-mobile.png) | ![After](after-wizard-success-mobile.png) |
