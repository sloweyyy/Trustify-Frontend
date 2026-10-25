# Design 03b — Public header and footer

Baseline main b9b098a.19 public routes × desktop1440/mobile390 give38 paired views; six additional footer views give44 before/after pairs. The menu has an additional mobile capture. Footer-top/bottom baselines use the same main deployment; initial route baselines were local.

Build, CRA ESLint and11 tests pass. Browser checks verify header/footer bounds at390/720/1280/1440,44px link targets, skip-link focus, Drawer focus trap/Escape restoration and route-close behavior. Footer white text on approved primary.dark has contrast12.76:1. Existing destinations/contact data are retained; no forms submitted, credentials changed or transactions initiated.

Known existing content overflow remains on Home(703px), Services(399px) and User Guide(645px) at390; this PR does not clip it. Header/footer themselves fit the viewport. Those page bodies, old Home governmental-looking copy, and the small existing chatbot launcher remain for Public09/Chatbot10. Vercel preview QA pending.

## dispute-resolution-desktop

| Before | After |
| --- | --- |
| ![Before](before-dispute-resolution-desktop.png) | ![After](after-dispute-resolution-desktop.png) |

## dispute-resolution-mobile

| Before | After |
| --- | --- |
| ![Before](before-dispute-resolution-mobile.png) | ![After](after-dispute-resolution-mobile.png) |

## footer-bottom-desktop

| Before | After |
| --- | --- |
| ![Before](before-footer-bottom-desktop.png) | ![After](after-footer-bottom-desktop.png) |

## footer-bottom-mobile

| Before | After |
| --- | --- |
| ![Before](before-footer-bottom-mobile.png) | ![After](after-footer-bottom-mobile.png) |

## footer-desktop

| Before | After |
| --- | --- |
| ![Before](before-footer-desktop.png) | ![After](after-footer-desktop.png) |

## footer-mobile

| Before | After |
| --- | --- |
| ![Before](before-footer-mobile.png) | ![After](after-footer-mobile.png) |

## footer-top-desktop

| Before | After |
| --- | --- |
| ![Before](before-footer-top-desktop.png) | ![After](after-footer-top-desktop.png) |

## footer-top-mobile

| Before | After |
| --- | --- |
| ![Before](before-footer-top-mobile.png) | ![After](after-footer-top-mobile.png) |

## for-individuals-desktop

| Before | After |
| --- | --- |
| ![Before](before-for-individuals-desktop.png) | ![After](after-for-individuals-desktop.png) |

## for-individuals-mobile

| Before | After |
| --- | --- |
| ![Before](before-for-individuals-mobile.png) | ![After](after-for-individuals-mobile.png) |

## for-notary-offices-desktop

| Before | After |
| --- | --- |
| ![Before](before-for-notary-offices-desktop.png) | ![After](after-for-notary-offices-desktop.png) |

## for-notary-offices-mobile

| Before | After |
| --- | --- |
| ![Before](before-for-notary-offices-mobile.png) | ![After](after-for-notary-offices-mobile.png) |

## forgot-password-desktop

| Before | After |
| --- | --- |
| ![Before](before-forgot-password-desktop.png) | ![After](after-forgot-password-desktop.png) |

## forgot-password-mobile

| Before | After |
| --- | --- |
| ![Before](before-forgot-password-mobile.png) | ![After](after-forgot-password-mobile.png) |

## home-desktop

| Before | After |
| --- | --- |
| ![Before](before-home-desktop.png) | ![After](after-home-desktop.png) |

## home-mobile

| Before | After |
| --- | --- |
| ![Before](before-home-mobile.png) | ![After](after-home-mobile.png) |

## lookup-desktop

| Before | After |
| --- | --- |
| ![Before](before-lookup-desktop.png) | ![After](after-lookup-desktop.png) |

## lookup-mobile

| Before | After |
| --- | --- |
| ![Before](before-lookup-mobile.png) | ![After](after-lookup-mobile.png) |

## operating-regulations-desktop

| Before | After |
| --- | --- |
| ![Before](before-operating-regulations-desktop.png) | ![After](after-operating-regulations-desktop.png) |

## operating-regulations-mobile

| Before | After |
| --- | --- |
| ![Before](before-operating-regulations-mobile.png) | ![After](after-operating-regulations-mobile.png) |

## payment-redirect-desktop

| Before | After |
| --- | --- |
| ![Before](before-payment-redirect-desktop.png) | ![After](after-payment-redirect-desktop.png) |

## payment-redirect-mobile

| Before | After |
| --- | --- |
| ![Before](before-payment-redirect-mobile.png) | ![After](after-payment-redirect-mobile.png) |

## payment-security-desktop

| Before | After |
| --- | --- |
| ![Before](before-payment-security-desktop.png) | ![After](after-payment-security-desktop.png) |

## payment-security-mobile

| Before | After |
| --- | --- |
| ![Before](before-payment-security-mobile.png) | ![After](after-payment-security-mobile.png) |

## pricing-desktop

| Before | After |
| --- | --- |
| ![Before](before-pricing-desktop.png) | ![After](after-pricing-desktop.png) |

## pricing-mobile

| Before | After |
| --- | --- |
| ![Before](before-pricing-mobile.png) | ![After](after-pricing-mobile.png) |

## privacy-policy-desktop

| Before | After |
| --- | --- |
| ![Before](before-privacy-policy-desktop.png) | ![After](after-privacy-policy-desktop.png) |

## privacy-policy-mobile

| Before | After |
| --- | --- |
| ![Before](before-privacy-policy-mobile.png) | ![After](after-privacy-policy-mobile.png) |

## reset-password-desktop

| Before | After |
| --- | --- |
| ![Before](before-reset-password-desktop.png) | ![After](after-reset-password-desktop.png) |

## reset-password-mobile

| Before | After |
| --- | --- |
| ![Before](before-reset-password-mobile.png) | ![After](after-reset-password-mobile.png) |

## services-desktop

| Before | After |
| --- | --- |
| ![Before](before-services-desktop.png) | ![After](after-services-desktop.png) |

## services-mobile

| Before | After |
| --- | --- |
| ![Before](before-services-mobile.png) | ![After](after-services-mobile.png) |

## signin-desktop

| Before | After |
| --- | --- |
| ![Before](before-signin-desktop.png) | ![After](after-signin-desktop.png) |

## signin-mobile

| Before | After |
| --- | --- |
| ![Before](before-signin-mobile.png) | ![After](after-signin-mobile.png) |

## signup-desktop

| Before | After |
| --- | --- |
| ![Before](before-signup-desktop.png) | ![After](after-signup-desktop.png) |

## signup-mobile

| Before | After |
| --- | --- |
| ![Before](before-signup-mobile.png) | ![After](after-signup-mobile.png) |

## terms-of-service-desktop

| Before | After |
| --- | --- |
| ![Before](before-terms-of-service-desktop.png) | ![After](after-terms-of-service-desktop.png) |

## terms-of-service-mobile

| Before | After |
| --- | --- |
| ![Before](before-terms-of-service-mobile.png) | ![After](after-terms-of-service-mobile.png) |

## third-party-desktop

| Before | After |
| --- | --- |
| ![Before](before-third-party-desktop.png) | ![After](after-third-party-desktop.png) |

## third-party-mobile

| Before | After |
| --- | --- |
| ![Before](before-third-party-mobile.png) | ![After](after-third-party-mobile.png) |

## user-guide-desktop

| Before | After |
| --- | --- |
| ![Before](before-user-guide-desktop.png) | ![After](after-user-guide-desktop.png) |

## user-guide-mobile

| Before | After |
| --- | --- |
| ![Before](before-user-guide-mobile.png) | ![After](after-user-guide-mobile.png) |

## verify-desktop

| Before | After |
| --- | --- |
| ![Before](before-verify-desktop.png) | ![After](after-verify-desktop.png) |

## verify-mobile

| Before | After |
| --- | --- |
| ![Before](before-verify-mobile.png) | ![After](after-verify-mobile.png) |

## Public mobile navigation

![Menu](after-menu-mobile.png)

Pre-review accessibility correction: public Header now sits outside the page-content target. After activating the skip link, the next Tab bypasses the header. Fresh local screenshot/focus/build/ESLint checks pass.

Final pre-review keyboard corrections: internal footer navigation focuses the content wrapper; a page-level Suspense boundary keeps shell transitions alive during lazy route changes. Reproduced overlay issue is resolved; public focus sequence and all20 authenticated route-role390px checks pass. Routes/services/Redux remain unchanged. Updated preview QA pending.
