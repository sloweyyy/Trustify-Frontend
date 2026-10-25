# Design 06f — Shared profile

Baseline main6371756 (PR29).24 before/after pairs cover User/Notary/Admin profile view/header/address and edit/header/address at1440×1000 and390×844.

Authorized QA login responses are locally fulfilled with synthetic display identity fields (name, email, phone, citizen ID and address); actual role/ID/tokens remain runtime-only. All non-auth writes blocked. No real profiles saved and no credentials/tokens committed. Government identity/address visible in screenshots is fixture data only.

Semantic profile fields use16px labels/values and responsive grids. Given-name avatar initial replaces the static generic portrait; unsupported photo-upload control and fake synchronous loading state removed. Edit uses a named MUI Dialog, full-screen on mobile with visible save/cancel footer. Existing ProvinceSelector and LabeledTextField remain untouched. Display mapping, validation/address resets and Redux update handler retained byte-for-byte; see handler-contract-check.json.

Build/changed-file CRA ESLint/18 tests pass. Tests verify the original Redux id/updatedUserInfo shape, verified-email permission, address reset/empty-key omission, validation and no update on dismissal. Existing functional tests retained with theme/current semantic controls; the obsolete flex-style assertion removed in favour of real browser bounds/focus checks.

Keyboard report covers all three roles at390/720/1440: page/dialog bounds,16px identity text,44px save, unique IDs, verified email disabled, Tab containment, Enter/Escape, focus restoration and discarded-edit values restored from Redux. User at390 also passes200% root text enlargement (not exhaustive browser-zoom certification).

Production all-role read-only QA will follow after merge per the PR26 protected-preview exception. Prior PR29 production reports and header-only dialog captures carried in06e/ exclude actual document names/codes. No services/Redux/routes/backend/API/dependencies/configuration modified.
