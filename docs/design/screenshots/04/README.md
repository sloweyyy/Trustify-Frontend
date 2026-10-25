# Design 04 — Create a notarization profile

Baseline main `2ca180c`. Fourteen paired views cover service selection, information, empty/source-menu/selected attachments, review and review attachments at1440/390. Two more pairs cover the reviewer-requested document-preview footer; those baseline images are the identical source/state fixtures from02e. Extra validation and failed-read captures are after-only. Seven720×500 views audit layout equivalent to200% of1440×1000; this is not native browser zoom.

Build/CRA ESLint/29 tests pass. JPEG/JPG matching is case-insensitive, original filenames are UI-only and renamed files retain their request format. Native file bytes/sizes, FormData keys/requesterInfo/amount and wallet fileIds/customFileNames are tested. Back navigation retains values. Failed reads retry their existing GET; a failed submission preserves the review and files. Submission tests mock the service; no real hồ sơ was submitted.

The three-step wizard uses one primary action, explicit next-step guidance, heading/first-error focus, inline required-field feedback without duplicate popup notices, readable review rows and mobile attachment spacing. An unreachable fourth payment-success composition was removed; no payment step was added. Services/Redux/routes/dependencies remain unchanged.

The local browser selected/removed generated JPG/JPEG files and an existing QA wallet document; the controller only changes client state for selection/removal. The request monitor records zero non-auth writes. The earlier assumption that wallet selection itself updates remote metadata was not supported by the controller; no remote metadata method is called here. Primary Vercel Ready; User full three-step preview/review/back and Notary/Admin navigation/logout pass. Final source rechecks inline-only validation and direct wallet access;11 preview captures. See vercel-checks.json for source revisions and exact scope.

## step1-service-desktop

| Before | After |
| --- | --- |
| ![Before](before-step1-service-desktop.png) | ![After](after-step1-service-desktop.png) |

## step1-service-mobile

| Before | After |
| --- | --- |
| ![Before](before-step1-service-mobile.png) | ![After](after-step1-service-mobile.png) |

## step2-information-desktop

| Before | After |
| --- | --- |
| ![Before](before-step2-information-desktop.png) | ![After](after-step2-information-desktop.png) |

## step2-information-mobile

| Before | After |
| --- | --- |
| ![Before](before-step2-information-mobile.png) | ![After](after-step2-information-mobile.png) |

## step3-review-desktop

| Before | After |
| --- | --- |
| ![Before](before-step3-review-desktop.png) | ![After](after-step3-review-desktop.png) |

## step3-review-mobile

| Before | After |
| --- | --- |
| ![Before](before-step3-review-mobile.png) | ![After](after-step3-review-mobile.png) |

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

## preview-unsupported-desktop

| Before | After |
| --- | --- |
| ![Before](before-preview-unsupported-desktop.png) | ![After](after-preview-unsupported-desktop.png) |

## preview-unsupported-mobile

| Before | After |
| --- | --- |
| ![Before](before-preview-unsupported-mobile.png) | ![After](after-preview-unsupported-mobile.png) |
