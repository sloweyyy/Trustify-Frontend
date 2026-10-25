# Design 06c — Session creation/invitation dialogs

Baseline main7654ac1 (PR #24). Eight before/after pairs at1440×1000 and390×844 cover creation header/footer, invitation and the session member avatars. GET-only fixtures; all non-auth writes blocked. Invitation ID is a synthetic local fixture. No actual sessions/invitations created or answered.

Named MUI Dialogs, full-screen mobile creation form, visible primary/footer actions, semantic colors,16px copy and Vietnamese autocomplete controls. Shared date/time fields retained. Avatar uses the last word of an available Vietnamese name; email initial remains the fallback. Optional name affects User SessionCard only; Notary consumers retain existing presentation until07.

Build and15 tests pass. CRA ESLint explicitly uses package.json configuration (`ESLINT_USE_FLAT_CONFIG=false npx eslint --no-eslintrc --config package.json ...`) because the existing flat config cannot parse JSX. No lint/package configuration changes. Keyboard report verifies390/720/1440, Enter-open/Escape-close, creation focus restore, IDs, bounds,16px inputs and44px primary action. Mutation/reset handlers match baseline byte-for-byte. Existing field requirements and response handling retained, including their pre-existing limitations.

Preview checks pending; draft only. Local dev server started on3002 with API URL supplied to that process because the local .env file was absent. No environment/configuration files changed.
