# Phase 2 validation

**25/10/2026 · Design proposal only.** Brand direction B is approved; the design system and production implementation await review.

## Scope and evidence

- [36 screen/widget specs](screens.json): Public19 (including `/third-party` and catch-all), User4, Notary5, Admin5, shared2 (`/profile`, `/payment/redirect`), chatbot1. Shared profile keeps all currently permitted roles. Each has a desktop wireframe, mobile wireframe, primary action or explicit read-only state, source owner and implementation constraints.
- [Tokens](tokens.json) contain complete scales, light/dark values, semantic states, aliases, spacing, radius and breakpoints. [54 measured contrast pairs](contrast-checks.json) all pass their recorded thresholds (4.5 normal text, 3 boundaries/focus).
- [Machine-readable browser results](validation-results.json) cover **144 width checks** (36 views × 320/390/768/1440px) plus **4 enlarged-root-text checks** at720px. No document horizontal overflow at those viewports after correcting a long technical identifier in the verification view's documentation note.
- The enlarged-root-font check uses `html { font-size:32px }`, a **200% text-size approximation** on rem-based text. It is not a native browser zoom test or proof that the production application passes WCAG. Native zoom/reflow and assistive-technology checks remain PR acceptance requirements.
- Six interaction checks pass: wizard preview steps2/3, native dialog opening, Escape and opener focus return, inert payment mock, mobile menu opening. These exercise the documentation board, not app business behavior.
- Browser `pageerror`: none in the validation run. External requests: none; fonts and all assets come from loopback. No app service, backend, payment, signing, email or chatbot request is made by this board.
- Local Be Vietnam Pro400/600 loaded in Chromium. New-size specimens cover14/16/18/20/22/24/28/32/36/48px with Vietnamese diacritics, NFC and decomposed-name samples. Existing TTF coverage and license evidence remain in [brand font checks](../brand/font-checks.json).
- Representative light/dark screenshots in `previews/`: Home, Sign in mobile, Create-profile mobile, History desktop/mobile, Wallet mobile, Notary review desktop, Admin charts desktop, Chatbot mobile. Also component sheets, type specimen and text-size approximation. Create steps2/3 have separate mobile images.
- SVG chart in the mock is static review artwork. Production chart implementation remains Chart.js; the proposal specifies labels, accessible data tables and theme adaptation without dataset changes.

## Build and change boundary

`CI=false npm run build` **passed (exit0)** after documentation creation, with existing ESLint, CRA/Babel and stale Browserslist warnings. No dependencies were added to remove warnings. Working tree has only new `docs/` content; tracked production files are unchanged.

Logo B has been applied only to brand-documentation compositions and the static review board. `public/`, `src/`, route definitions, Redux state, services, package manifests/locks and the backend have not been edited. No production PR, push or deployment has started.

## Limits

Mock buttons are inert or switch local review state. Filters, uploads, mutations and payment logic are not reimplemented in the mock. Some screens show representative layouts rather than every dialog/condition; their per-route wireframes and behavior constraints are in the specification. Full live empty/populated/error/signing coverage still needs suitable QA fixtures during the appropriate implementation PR. The historic audit records the empty queues and other limits.

This package does not certify legal validity, cryptographic security, keyboard accessibility of freehand drawing, or a completed WCAG audit of the current app.

## Reproduce

See [README.md](README.md). Token generation, screen generation, board assembly and browser rendering use only documentation scripts. Browser rendering uses an existing Playwright installation; it is not added to the React application dependencies.
