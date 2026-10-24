# PR 02 — Approved tokens and MUI v6 overrides

PR #8 merged as `6df1f8a32006b4042c347b3011c44f5ee0ca4cf7` on25/10/2026. This implementation starts from that merged main commit.

## Result

- `src/config/theme/tokens.json`: approved light/dark semantic palette, complete scales, status colors, spacing, radii and breakpoints.
- `createTrustifyTheme`: one composed factory for the app and existing auth providers. Every Mui component key has one owner; duplicate owners fail explicitly rather than silently dropping styles.
- Semantic buttons/inputs/focus, accessible control minima, severity-aware alerts, cards/dialogs, chips, navigation/stepper and Vietnamese table/DataGrid defaults in the existing customization files.
- Memoized light app theme plus CssBaseline. Existing auth providers use the same theme options. Dark mode is implemented/tested in the theme; app default remains light while screens still contain legacy styles.
- Locally bundled Be Vietnam Pro400/600 with OFL notice, replacing the duplicate Google Fonts imports. Body/control text uses approved rem sizes; custom legacy typography aliases remain valid.
- Legacy raw color exports and their exact values remain in `legacyPrimitives.js` for unmigrated inline styles. New theme styles use semantic tokens, not those aliases. MUI spacing base remains8px and all25 shadow entries remain valid.

No route, role guard, Redux state, service, API contract, backend or dependency change. This PR does not redesign screen structure, merge shared business components, alter chart datasets, or change payment/signature behavior. App.js diff is limited to theme wiring, memoization and CssBaseline.

## Validation

- **`CI=false npm run build` passed**. [Build log](build.log), ANSI/trailing whitespace normalized. Existing lint/CRA/Babel/Browserslist warnings remain.
- **7 focused tests pass**: contrast for both modes, app/auth composition, independent theme instances/spacing/legacy contract, lifecycle raw keys, actual rendered alert severity, destructive-button intent and small-button touch size. [Test log](tests.log). Command: `CI=true npm test -- --watchAll=false --runInBand --detectOpenHandles --runTestsByPath src/config/theme/createTrustifyTheme.test.js`.
- `--detectOpenHandles` identifies the existing Babel private-property plugin's delayed warning timer; tests exit0. The installed Testing Library also emits the React act deprecation warning. No dependency change was made to suppress these toolchain warnings.
- [Real MUI browser results](theme-browser-results.json): light/dark rendering, loaded local fonts, visible input text ≥16px, primary touch target ≥44px, 3px keyboard focus ring, readable destructive-button hover in both modes, and dialog Escape. No uncaught browser errors. Text enlargement uses32px root font as a200% approximation, not a claim of native browser-zoom compliance.
- [App route smoke](app-smoke-results.json): Public/User/Notary/Admin views render at desktop/mobile with the same route path, no uncaught errors, and no Google Fonts requests. These are read-only route/login checks, not a full notarization transaction.

## Before / after

[Complete 144-image route gallery](../../screenshots/01/README.md) (72 matched pairs), same API QA accounts and viewports; production main before, local theme implementation after. The original representative comparisons below are retained. Desktop1440×1000; mobile390×844. Existing horizontal overflow is preserved in screenshots rather than hidden.

[Desktop comparisons](desktop-comparison.png) · [Mobile comparisons](mobile-comparison.png). Thumbnails crop the top; full images are linked below.

| Role / route | Viewport | Before | After |
| --- | --- | --- | --- |
| public `/signin` | 1440×1000 | [Before](../../screenshots/01/before-public-signin-desktop.png) | [After](../../screenshots/01/after-public-signin-desktop.png) |
| public `/signin` | 390×844 | [Before](../../screenshots/01/before-public-signin-mobile.png) | [After](../../screenshots/01/after-public-signin-mobile.png) |
| public `/signup` | 1440×1000 | [Before](../../screenshots/01/before-public-signup-desktop.png) | [After](../../screenshots/01/after-public-signup-desktop.png) |
| public `/signup` | 390×844 | [Before](../../screenshots/01/before-public-signup-mobile.png) | [After](../../screenshots/01/after-public-signup-mobile.png) |
| public `/lookup` | 1440×1000 | [Before](../../screenshots/01/before-public-lookup-desktop.png) | [After](../../screenshots/01/after-public-lookup-desktop.png) |
| public `/lookup` | 390×844 | [Before](../../screenshots/01/before-public-lookup-mobile.png) | [After](../../screenshots/01/after-public-lookup-mobile.png) |
| public `/verify` | 1440×1000 | [Before](../../screenshots/01/before-public-verify-desktop.png) | [After](../../screenshots/01/after-public-verify-desktop.png) |
| public `/verify` | 390×844 | [Before](../../screenshots/01/before-public-verify-mobile.png) | [After](../../screenshots/01/after-public-verify-mobile.png) |
| user `/user/create-notarization-profile` | 1440×1000 | [Before](../../screenshots/01/before-user-user-create-notarization-profile-desktop.png) | [After](../../screenshots/01/after-user-user-create-notarization-profile-desktop.png) |
| user `/user/create-notarization-profile` | 390×844 | [Before](../../screenshots/01/before-user-user-create-notarization-profile-mobile.png) | [After](../../screenshots/01/after-user-user-create-notarization-profile-mobile.png) |
| user `/user/history` | 1440×1000 | [Before](../../screenshots/01/before-user-user-history-desktop.png) | [After](../../screenshots/01/after-user-user-history-desktop.png) |
| user `/user/history` | 390×844 | [Before](../../screenshots/01/before-user-user-history-mobile.png) | [After](../../screenshots/01/after-user-user-history-mobile.png) |
| notary `/notary/pending-notarization-documents` | 1440×1000 | [Before](../../screenshots/01/before-notary-notary-pending-notarization-documents-desktop.png) | [After](../../screenshots/01/after-notary-notary-pending-notarization-documents-desktop.png) |
| notary `/notary/pending-notarization-documents` | 390×844 | [Before](../../screenshots/01/before-notary-notary-pending-notarization-documents-mobile.png) | [After](../../screenshots/01/after-notary-notary-pending-notarization-documents-mobile.png) |
| admin `/admin/dashboard` | 1440×1000 | [Before](../../screenshots/01/before-admin-admin-dashboard-desktop.png) | [After](../../screenshots/01/after-admin-admin-dashboard-desktop.png) |
| admin `/admin/dashboard` | 390×844 | [Before](../../screenshots/01/before-admin-admin-dashboard-mobile.png) | [After](../../screenshots/01/after-admin-admin-dashboard-mobile.png) |

### Real MUI theme fixture

The fixture imports the **actual production theme**, React18, installed MUI6 and MUI X7. It is not imported by the app and adds no production route, query parameter, dependency or API call. Its baseline is a serialized theme-options snapshot from the merged PR8 commit, using the same fixture content; actual app before/after evidence is above.

- [Baseline theme](theme-before-desktop.png)
- [Light desktop](theme-light-desktop.png) / [mobile](theme-light-mobile.png)
- [Dark desktop](theme-dark-desktop.png) / [mobile](theme-dark-mobile.png)
- [200% text-size approximation](theme-text-200.png)

Build with existing project tooling, then serve the temporary output:

```sh
node docs/design/implementation/pr-02/build-theme-gallery.cjs
python3 -m http.server 4175 --bind 127.0.0.1 --directory /tmp/trustify-theme-gallery
```

Open `http://127.0.0.1:4175/` or `?baseline=1` for the baseline fixture. Fonts are bundled from `src/assets/fonts/` by webpack and the app's regular CSS loader, with no Google Fonts calls.

## Migration boundaries and limitations

Legacy `sx`, styled components and hard-coded colors still override parts of the new theme; the next shared-component and role PRs remove those deliberately. This means not every app badge or button has the final approved appearance yet. The new lifecycle dictionary is available under `theme.trustify.documentStates`; existing filters and raw response enums are not rewritten here.

Existing fixed-width forms/tables/sidebars remain. At390px the legacy User history grows from1088px to1108px content width as controls/text become readable; a card rendition is part of the shared-component phase. A320px sign-in probe still measures349px content width; full page reflow is not claimed by this theme PR. The isolated theme fixture fits its720px test viewport with doubled root text. Complete accessibility QA, native zoom, screen readers and mobile layout completion remain requirements for the later component/screen PRs.

Chart.js colors/fonts, signature canvas geometry, Toastify styling and responsive navigation/card composition are left to their owning component PRs. CSS theme overrides cannot safely rewrite those structures/handlers. The empty notary queue is captured without inventing or mutating live data.

MUI v6 references: [theme components](https://v6.mui.com/material-ui/customization/theme-components/), [dark mode](https://v6.mui.com/material-ui/customization/dark-mode/). No MUI version change or additional UI kit.

## Autonomous review-loop handoff

Changed JS passes `ESLINT_USE_FLAT_CONFIG=false npx eslint` with the existing CRA configuration. The repository flat configuration cannot parse JSX. Removed unused imports; retained existing mount-only reset-token behavior with an explicit lint explanation. Theme tests now query alert roles directly. [ESLint log](eslint.log).

Vercel preview is authenticated through the existing Chrome session. QA user creation → history → wallet, notary dashboard → pending queue, and admin dashboard → management are checked without submitting hồ sơ or modifying users. Screenshots are in the Design 01 gallery. No payment was completed.
