# PR 01 — Logo B, favicon and public brand assets

Approved direction: **B — Nét ký tận tâm**. Phase 2 approved on 25/10/2026; this is the first production implementation slice.

## Result

- Shared outlined `BrandLogo` replaces the old header/footer artwork and the expanded sidebar text title. Footer uses the approved Vietnamese tagline. Existing navigation, role menus and collapse behavior are retained.
- `public/brand/` contains transparent color/mono/inverse wordmarks and symbols, an opaque favicon, app-icon source, maskable512 icon, and the1200×630 social image.
- Real multi-resolution ICO (16/24/32/48/64), SVG favicon,180px Apple touch icon and192/512 app icons. Manifest color is #AA1D39, with an explicit maskable entry and matching actual sizes.
- Vietnamese HTML language/description/noscript, social title/description/alt and canonical production image URLs. The share card contains no document data or legal guarantee. Production social URL becomes available when these assets are deployed; local asset and dimensions were verified here.
- Logo and social lettering are paths: no font fetch, embedded base64 font or SVG `<text>` in production assets. Editable source, recorded glyph positions, unmodified OFL fonts and export tools are included for reproducibility.

No theme-token migration, screen restyling, route/Redux/service/API/backend changes, dependencies or merges in this PR. Prior design-review documents remain in the local workspace; this PR includes only the selected source, font license, export tools and implementation evidence.

## Before / after

Baseline: frontend main `40b8530`. Both sets were captured locally from the same codebase and same hosted API with supplied QA accounts, at1440×1000 and390×844. Screenshots are full-page, so existing mobile overflow is intentionally visible. No document/profile/payment mutation was performed. Credentials are not stored in this report.

Quick comparisons: [Public header/footer](public-brand-comparison.png), [all desktop captures](desktop-comparison.png), [all mobile captures](mobile-comparison.png). Comparison contact sheets crop thumbnails; links below open full images.

| Surface | Viewport | Before | After |
| --- | --- | --- | --- |
| public `/` | 1440×1000 | [Before](screenshots/before-public-home-desktop.png) | [After](screenshots/after-public-home-desktop.png) |
| public `/` | 390×844 | [Before](screenshots/before-public-home-mobile.png) | [After](screenshots/after-public-home-mobile.png) |
| public `/signin` | 1440×1000 | [Before](screenshots/before-public-signin-desktop.png) | [After](screenshots/after-public-signin-desktop.png) |
| public `/signin` | 390×844 | [Before](screenshots/before-public-signin-mobile.png) | [After](screenshots/after-public-signin-mobile.png) |
| public `/lookup` | 1440×1000 | [Before](screenshots/before-public-lookup-desktop.png) | [After](screenshots/after-public-lookup-desktop.png) |
| public `/lookup` | 390×844 | [Before](screenshots/before-public-lookup-mobile.png) | [After](screenshots/after-public-lookup-mobile.png) |
| user `/profile` | 1440×1000 | [Before](screenshots/before-user-profile-desktop.png) | [After](screenshots/after-user-profile-desktop.png) |
| user `/profile` | 390×844 | [Before](screenshots/before-user-profile-mobile.png) | [After](screenshots/after-user-profile-mobile.png) |
| notary `/profile` | 1440×1000 | [Before](screenshots/before-notary-profile-desktop.png) | [After](screenshots/after-notary-profile-desktop.png) |
| notary `/profile` | 390×844 | [Before](screenshots/before-notary-profile-mobile.png) | [After](screenshots/after-notary-profile-mobile.png) |
| admin `/profile` | 1440×1000 | [Before](screenshots/before-admin-profile-desktop.png) | [After](screenshots/after-admin-profile-desktop.png) |
| admin `/profile` | 390×844 | [Before](screenshots/before-admin-profile-mobile.png) | [After](screenshots/after-admin-profile-mobile.png) |

## Validation

- **`CI=false npm run build` passed, exit0**. [Full log](build.log), normalized only for ANSI color/trailing whitespace. Existing ESLint/CRA/Babel/Browserslist warnings remain; no unrelated cleanup or dependency changes.
- Every manifest target exists and is served with an image content type from the production build. All icons have the advertised dimensions; Pillow verified all five ICO sizes.
- SVG XML parses; production vectors have no text/font imports. Visual review includes16px favicon, social card, and before/after Public/User/Notary/Admin captures.
- [Browser smoke results](smoke-results.json): built sign-in header/footer images decode, home/auth hrefs preserved, Vietnamese metadata and burgundy browser color, mobile menu open/Escape, existing sidebar collapse/expand.
- `git diff --check` passes. Existing page layouts, typography, accessibility gaps and policy/home copy outside the branding are intentionally deferred to their approved later PRs.

## Asset provenance and reproduction

Original Trustify logo B and compositions, derived from the approved Phase1 vectors. Symbol gesture retained. Glyph coordinates in `../../source/lettering-positions.json` preserve the original browser-shaped lettering; the arrow separator is a vector stroke because Be Vietnam Pro has no arrow glyph. The proposal-only footer note was removed from the social card. No third-party logo/icon artwork is copied.

Unmodified Be Vietnam Pro Regular/SemiBold source: [Google Fonts Regular](https://github.com/google/fonts/blob/main/ofl/bevietnampro/BeVietnamPro-Regular.ttf) / [SemiBold](https://github.com/google/fonts/blob/main/ofl/bevietnampro/BeVietnamPro-SemiBold.ttf), downloaded25/10/2026. [SIL Open Font License](../../fonts/OFL.txt), also copied to `public/brand/OFL.txt`. Production wordmark SVG is about2.8KB versus the font-embedded proposal; no new runtime dependency.

Asset tooling uses an isolated Python environment and existing Sharp installation; these are **not** React dependencies:

```sh
python3 -m venv /tmp/trustify-brand-assets-venv
/tmp/trustify-brand-assets-venv/bin/pip install fonttools==4.60.2 pillow==11.3.0
/tmp/trustify-brand-assets-venv/bin/python3 docs/brand/tools/export-production-assets.py
SHARP_MODULE=/absolute/path/to/sharp node docs/brand/tools/rasterize-production-assets.cjs
/tmp/trustify-brand-assets-venv/bin/python3 docs/brand/tools/export-production-assets.py --ico
CI=false npm run build
```

Edit SVG source/lettering positions only when intentionally changing the approved artwork; regenerate vectors, then rasters, then ICO in that order. The approved gesture and outlines are retained in `docs/brand/source/`. Old unrelated illustrations stay in place because guide/static content still references them.
