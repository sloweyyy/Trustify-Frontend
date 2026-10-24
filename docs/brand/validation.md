# Phase 1 validation

Date: 25/10/2026, Vietnam time. Scope: documentation, original vector concepts, PNG renditions and captured existing UI. No production asset installation, UI restyling or API/backend changes.

| Check | Evidence / result |
| --- | --- |
| Existing screens | 36 route/role views plus open chatbot, desktop and mobile = 74 PNGs in `audit/screenshots/`. Three QA UI logins succeeded. See `audit/manifest.json`. |
| Browser/render engine | Headless Chromium through the existing Playwright installation on this machine. PNGs are browser renders, not simulated screenshots of the live application. Application proposals and live before screenshots are stored separately. |
| SVG validity | All 33 SVGs parsed as XML. |
| Vector/text bounds | `tools/render-previews.cjs` checks every text element bounding box in six application/type SVGs; no clipped text after iteration. Original 64px specimen was too long and was shortened before delivery. |
| PNG outputs | Five brand applications, typography specimen, full desktop/mobile boards, three concept comparison cards, all 27 logo assets, and a 16/32px favicon size board rendered. |
| Review board mobile | `document.documentElement.scrollWidth` = 390 at a 390×844 viewport. This verifies the documentation board, not production mobile screens. Brand application SVGs remain fixed-size illustrations, not responsive form specs. |
| Vietnamese font coverage | `python3 docs/brand/tools/check-fonts.py` confirms required characters in both actual TTF cmap tables. SHA-256 and results in `font-checks.json`. |
| Font loading | Browser inspection of the SVG specimen confirmed both embedded Be Vietnam Pro faces (400/600) loaded and `document.fonts.check` true for `ắ ầ ẩ ữ ợ ỹ` at 16px. All theme sizes 10–64px shown in specimen. |
| Visual inspection | Reviewed all four role contact sheets, mobile overflow example and chatbot; inspected all three concepts, sign-in, profile card, certificate/NFT, email header, social share and final type specimen. All five brand applications were inspected as rendered PNGs. |
| Contrast | `contrast-checks.json`: all nine proposed normal-text pairs pass 4.5:1. Input boundary pair is 4.29:1, passes non-text 3:1 but fails normal-text 4.5:1; explicitly restricted to boundary use. Decorative dividers are not interaction boundaries. |
| Build | **`CI=false npm run build` passed (exit 0), compiled with warnings.** Existing ESLint warnings include unused imports, hook dependencies, `eqeqeq`, `no-throw-literal`; toolchain also reports stale Browserslist data and CRA/Babel undeclared dependency. No source/dependency changes made to suppress these. |
| Change scope | `git status --short` shows only new `docs/` content. No tracked files changed. Production `public/`, `src/`, package manifest/lock and backend were not edited. |
| Local links | Documentation/galleries checked for missing relative targets. External Figma access failed (403) and is documented. |

## Limits retained for later phases

No end-to-end notarization/payment/signature action was performed. Empty notary queues mean the audit does not establish behavior of populated review or signing screens. No screen-reader, keyboard-flow, 200% app zoom or cross-platform accessibility certification is claimed. Dark-mode tokens, MUI component overrides and per-role wireframes await brand approval. These proposals are not proof of legal validity, encryption or production blockchain guarantees.

## Reproduce

See [README.md](README.md) for vector, font and PNG commands. No production dependency was added; PNG rendering needs an existing Playwright installation. Historical live captures are kept as evidence and should not be overwritten when generating future after screenshots.
