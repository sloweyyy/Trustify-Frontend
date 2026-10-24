# Trustify — Phase 2 review package

Based on **logo B**, approved on 25/10/2026 (“Logo B, continue”). Phase 2 approved on 25/10/2026; the user requested implementation PR 01 for logo B, favicon and public brand assets.

Open [index.html](index.html) directly in a browser, or use the existing local server at [review board](http://127.0.0.1:4173/docs/design/index.html). The board embeds its JSON inputs and uses local fonts, CSS and JavaScript; it calls no application APIs. Theme switches, screen selection and wizard-step controls are review aids. Buttons never submit hồ sơ, pay, sign, send email or chat with the backend.

- [Full design-system specification](../design-system.md): principles, exact tokens, MUI v6 ownership/overrides, component behavior, lifecycle, accessibility, reuse and migration.
- [36 screen/widget specs](screens.json): 19 public routes (including OAuth intermediary and catch-all), 4 User screens, 5 Notary, 5 Admin, 2 shared screens (profile/payment), and chatbot. Shared profile applies to every role already allowed by the app.
- [Full scales](tokens.json), [54 contrast checks](contrast-checks.json), [readable screen appendix](screen-specs.md).
- `previews/`: representative light/dark Public, User, Notary, Admin and chatbot mocks; component/typography samples. These are **proposals**, not after screenshots of production.
- [Validation](validation.md) and [machine-readable results](validation-results.json).
- [Historic before audit](../brand/audit/existing-screen-audit.md) remains unchanged apart from a descriptive note about chatbot panel width. No need to rerun real login/mutation flows to inspect this proposal.

Regenerate documentation data and board:

```sh
python3 docs/design/tools/generate-tokens.py
python3 docs/design/tools/generate-screens.py
python3 docs/design/tools/generate-board.py
```

`generate-board.py` synchronizes generated appendices A/B into `docs/design-system.md`; keep hand-authored sections before appendix A. It embeds updated JSON in the board. CSS/JS are ordinary documentation assets. SVG chart in this mock is illustrative; production stays on Chart.js with its existing datasets.

Render/verify using an existing Playwright installation, without adding a project dependency:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
# In another terminal:
PLAYWRIGHT_MODULE=/absolute/path/to/playwright node docs/design/tools/validate-and-render.cjs
```

No production code, route, Redux state, service call, API contract, backend or package dependency changed. Implementation PR 01 is in progress. Approved order: brand assets → tokens/overrides → shared components → User → Notary → Admin → Public, with build and actual before/after evidence per PR.
