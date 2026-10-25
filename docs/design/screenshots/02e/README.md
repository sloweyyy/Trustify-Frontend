# Design 02e — Wallet picker and document preview dialogs

Baseline main `febf4dd`. Sixteen before/after pairs cover the wallet picker (populated, empty, failed GET, loading) and file preview (image, failed metadata GET, loading, unsupported DOCX), at 1440 and390. All wallet/IPFS GET responses here are local fixtures, not real documents. The image visibly says it has no legal value. No wallet document was selected or submitted.

Build, CRA ESLint and19 tests pass. Original service calls, metadata URI, positive-amount filtering/sorting, six-month expiry display and selected object callbacks remain. A retry repeats the same GET. Dialogs use unique accessible titles, keyboard trapping and44px close controls; nested preview Escape restores its opener. Manifests show no overflow and zero non-auth writes. Read-only wallet/preview interactions were exercised; callbacks are tested with mocks.

Known scope: wallet page/cards follow User06; document detail layouts follow their role PRs. The existing six-month expiry calculation is retained, not a new policy. PDF metadata/source is unit-tested; no real signatures, transfers, purchases or notarization submissions are used for QA. Vercel all-role QA pending.

## wallet-success-desktop

| Before | After |
| --- | --- |
| ![Before](before-wallet-success-desktop.png) | ![After](after-wallet-success-desktop.png) |

## wallet-success-mobile

| Before | After |
| --- | --- |
| ![Before](before-wallet-success-mobile.png) | ![After](after-wallet-success-mobile.png) |

## wallet-empty-desktop

| Before | After |
| --- | --- |
| ![Before](before-wallet-empty-desktop.png) | ![After](after-wallet-empty-desktop.png) |

## wallet-empty-mobile

| Before | After |
| --- | --- |
| ![Before](before-wallet-empty-mobile.png) | ![After](after-wallet-empty-mobile.png) |

## wallet-error-desktop

| Before | After |
| --- | --- |
| ![Before](before-wallet-error-desktop.png) | ![After](after-wallet-error-desktop.png) |

## wallet-error-mobile

| Before | After |
| --- | --- |
| ![Before](before-wallet-error-mobile.png) | ![After](after-wallet-error-mobile.png) |

## wallet-loading-desktop

| Before | After |
| --- | --- |
| ![Before](before-wallet-loading-desktop.png) | ![After](after-wallet-loading-desktop.png) |

## wallet-loading-mobile

| Before | After |
| --- | --- |
| ![Before](before-wallet-loading-mobile.png) | ![After](after-wallet-loading-mobile.png) |

## preview-success-desktop

| Before | After |
| --- | --- |
| ![Before](before-preview-success-desktop.png) | ![After](after-preview-success-desktop.png) |

## preview-success-mobile

| Before | After |
| --- | --- |
| ![Before](before-preview-success-mobile.png) | ![After](after-preview-success-mobile.png) |

## preview-error-desktop

| Before | After |
| --- | --- |
| ![Before](before-preview-error-desktop.png) | ![After](after-preview-error-desktop.png) |

## preview-error-mobile

| Before | After |
| --- | --- |
| ![Before](before-preview-error-mobile.png) | ![After](after-preview-error-mobile.png) |

## preview-loading-desktop

| Before | After |
| --- | --- |
| ![Before](before-preview-loading-desktop.png) | ![After](after-preview-loading-desktop.png) |

## preview-loading-mobile

| Before | After |
| --- | --- |
| ![Before](before-preview-loading-mobile.png) | ![After](after-preview-loading-mobile.png) |

## preview-unsupported-desktop

| Before | After |
| --- | --- |
| ![Before](before-preview-unsupported-desktop.png) | ![After](after-preview-unsupported-desktop.png) |

## preview-unsupported-mobile

| Before | After |
| --- | --- |
| ![Before](before-preview-unsupported-mobile.png) | ![After](after-preview-unsupported-mobile.png) |
