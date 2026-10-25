# Design 02d — File selection and attachment lists

Baseline main `2225e3f`. Eight before/after pairs cover the create-profile wizard attachment section, device/wallet source menu, locally selected files and read-only review, at desktop 1440 and mobile 390. Files were generated in browser memory; no hồ sơ was submitted and no wallet document selected. Both manifests report zero non-auth writes and no horizontal overflow.

Build, CRA ESLint and 16 tests pass. Native file events and original wrapper identities are retained. The picker uses the existing PDF/DOCX/PNG/JPG allowlist. Selected files are described as selected, without implying upload or notarization. Open/remove controls have accessible names; the read-only review omits changes.

Known scope: wallet/preview dialog content follows in 02e; original filename display follows User04 because the existing controller renames local files. The unused legacy UploadedFileList is tracked for cleanup11. API/services/Redux/routes and submission logic are unchanged.

## upload-empty-desktop

| Before | After |
| --- | --- |
| ![Before](before-upload-empty-desktop.png) | ![After](after-upload-empty-desktop.png) |

## upload-empty-mobile

| Before | After |
| --- | --- |
| ![Before](before-upload-empty-mobile.png) | ![After](after-upload-empty-mobile.png) |

## upload-menu-desktop

| Before | After |
| --- | --- |
| ![Before](before-upload-menu-desktop.png) | ![After](after-upload-menu-desktop.png) |

## upload-menu-mobile

| Before | After |
| --- | --- |
| ![Before](before-upload-menu-mobile.png) | ![After](after-upload-menu-mobile.png) |

## upload-selected-desktop

| Before | After |
| --- | --- |
| ![Before](before-upload-selected-desktop.png) | ![After](after-upload-selected-desktop.png) |

## upload-selected-mobile

| Before | After |
| --- | --- |
| ![Before](before-upload-selected-mobile.png) | ![After](after-upload-selected-mobile.png) |

## upload-review-desktop

| Before | After |
| --- | --- |
| ![Before](before-upload-review-desktop.png) | ![After](after-upload-review-desktop.png) |

## upload-review-mobile

| Before | After |
| --- | --- |
| ![Before](before-upload-review-mobile.png) | ![After](after-upload-review-mobile.png) |
