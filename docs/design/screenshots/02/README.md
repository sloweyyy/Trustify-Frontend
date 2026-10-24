# Design 02 — Shared document statuses and filters

Base: merged PR #10 (`227606e4ea568309b46e19034975b483d910be48`), whose primary Vercel production deploy reached Ready and live `/` returned HTTP 200 with no page errors.

This is the first small slice of stage 02, not the entire shared-component migration. A single display dictionary now supplies the theme and shared chips. The five lifecycle labels, colors and icons agree across the touched User history, Notary dashboard/history and Admin document grid. Verification remains a separate raw state and filter, displayed as Đang xử lý with Bước xác minh. Session readyToSign remains separate.

Existing translated filter keys are deliberately retained; the adapter changes their visible labels. Table search also accepts the newly visible labels. Raw response objects, permissions, callbacks, filters/sorting/pagination and service calls are unchanged. Search fields in the touched lists no longer autofocus. New text uses the approved 400/600 faces.

## Validation

- `CI=false npm run build`: passed; [log](build.log).
- `ESLINT_USE_FLAT_CONFIG=false npx eslint` on all changed JS: passed using existing CRA config; [log](eslint.log).
- 21 tests: shared chip states, unknown/session-state handling, legacy filter callback values, verification separation, actual table filtering/searching, and theme regression tests; [log](tests.log).
- Real QA account browser checks on local app: User history filters/search; Notary history filters (six records → two awaiting signature or two completed); Admin grid filters; no initial list autofocus or uncaught errors. [Results](browser-checks.json).
- Vercel QA click-through evidence is recorded separately before adding ready-for-review.

## Boundaries

Legacy detail dialogs and other role-specific statuses migrate in their owning PRs. Responsive shells/table cards, empty/loading/error compositions, forms/dialogs/toasts, upload and stepper remain in the stage 02/03 queue. Existing mobile page overflow is visible in the captures. The Admin session grid’s empty pagination currently renders invalid counts; this pre-existing presentation issue will be addressed with the Admin grid. No new dependency or backend change.

## Before and after

Baseline and after are the same local app/API QA fixtures at 1440×1000 and 390×844. Data timestamps can change.

<details><summary>user /user/history — 1440px</summary>

![Before](before-user-user-history-desktop.png)

![After](after-user-user-history-desktop.png)

</details>

<details><summary>user /user/history — 390px</summary>

![Before](before-user-user-history-mobile.png)

![After](after-user-user-history-mobile.png)

</details>

<details><summary>notary /notary/dashboard — 1440px</summary>

![Before](before-notary-notary-dashboard-desktop.png)

![After](after-notary-notary-dashboard-desktop.png)

</details>

<details><summary>notary /notary/dashboard — 390px</summary>

![Before](before-notary-notary-dashboard-mobile.png)

![After](after-notary-notary-dashboard-mobile.png)

</details>

<details><summary>notary /notary/notarization-history — 1440px</summary>

![Before](before-notary-notary-notarization-history-desktop.png)

![After](after-notary-notary-notarization-history-desktop.png)

</details>

<details><summary>notary /notary/notarization-history — 390px</summary>

![Before](before-notary-notary-notarization-history-mobile.png)

![After](after-notary-notary-notarization-history-mobile.png)

</details>

<details><summary>admin /admin/notary-management — 1440px</summary>

![Before](before-admin-admin-notary-management-desktop.png)

![After](after-admin-admin-notary-management-desktop.png)

</details>

<details><summary>admin /admin/notary-management — 390px</summary>

![Before](before-admin-admin-notary-management-mobile.png)

![After](after-admin-admin-notary-management-mobile.png)

</details>
