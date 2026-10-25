# Final QA findings — implementation follow-up

Status: fixes verified locally; final production confirmation and complete gallery remain in progress. Phase11c, baseline d9ad42c (same UI as phase11 e8a2e3d).

Initial source/production route pass covered43 route-role cases at1440×1000,390×844,320×844 and768×1000. All routes retained their expected path, all assistant open/Escape/focus-restoration checks passed, and no uncaught page errors or non-auth writes occurred. Route manifests and screenshots will be collected with the final gallery. This is an implementation audit, not a claim of complete WCAG certification.

| Finding | Correction | Evidence |
| --- | --- | --- |
| Admin employee/user search labels overflowed at768px (document width790px) |280px responsive field with max-width100%; floating label constrained to its control | Final geometry pass measures768px document width |
| Footer “Giá” target31×44; table sorting targets26px high | Minimum44px width/height in link style and MUI TableSortLabel override | Computed target sizes; no sorting callbacks change |
| Assistant covered the center of the signup link at390px | Compact48px mobile launcher with unchanged accessible name and tooltip; desktop keeps visible text | Browser hit-test before/after; full-screen dialog unchanged |
| FAQ had duplicate content IDs generated both by Accordion and AccordionDetails | Let MUI own the region ID referenced by Summary | Duplicate-ID audit and current expansion test |
| Dialog accessible name included metadata/close controls | Label points only to title text, with a separate outer DialogTitle ID to prevent MUI context duplicating it | Exact-name browser checks and four Notary review test assertions |
| Session guest identity required hover | Always-visible readable identity, wrapping long email and named remove action | Synthetic unsent guest draft before/after; callback/hide/creator tests |
| Policy sections still imported fixed legacy colors | Semantic text, selected/hover backgrounds and divider/primary borders; contrastText for numbered steps | Five policy body text SHA256 values unchanged |

The one-pixel dashboard scrollWidth rounding in the initial1440px capture is below the audit’s >1px failure tolerance. The later corrected pass fits the viewport. Hidden native Select mirror inputs are excluded from missing-label checks; the visible controls keep linked labels.

No backend/API/service/Redux changes in this follow-up. No actual create, upload, invitation, signature, approval, rejection, sharing, purchase, payment or chatbot message is submitted during browser QA. The guest example only edits an unsent local draft. Existing QA logins and read requests are authorized. Auth display fields and document identities are anonymized for local screenshots; order codes in final screenshot data are synthetic.

Validation: CI=false npm run build; changed-file CRA ESLint; exact CI=true npm test -- --watchAll=false passes68 suites/350 tests. The test count drops6 because nine obsolete hover/CSS tests become three tests for the current visible identity and unchanged action contract. No suites are skipped or excluded. Full build/test CI gates were added and merged in #45.
