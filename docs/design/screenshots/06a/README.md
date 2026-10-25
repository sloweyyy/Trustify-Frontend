# User session list and cards — Design 06a / PR #23

Baseline: main bb65710. Source: c8f7da2. Six views (list, filtered, no results, empty, error, loading), each at 1440×1000 and 390×844: 12 before/after pairs. Synthetic session GET fixtures only; all non-auth writes blocked.

Before: 12px card text, an unlabelled borderless search field, overlapping layout rules/margins, participant status conveyed only by dots, and a search fallback that showed all sessions when there were zero matches. Read failures were presented as an empty list. After: a clear create action, labelled search, readable theme-based grid/cards, canonical lifecycle labels, visible Vietnamese participant states, live result count, and distinct retry/empty/no-results states.

`CI=false npm run build` passes with existing repository warnings. CRA ESLint passes four touched files. 13 tests cover six-item pagination, the original rejected-participant exclusion, case-insensitive search/zero matches/clear, malformed read retry, loading/empty, create refresh callback, exact invitation ID/query removal, Redux upload-success reset, original detail object/close callback, visible participant labels and accessible card description.

local-smoke.json verifies no overflow, create target at least44px, pagination/search, detail Enter/Escape/opener restoration and create-form open/close/focus at390×844,720×500,1440×1000.720×500 is a layout-equivalent200% check, not native browser zoom. No session creation, join, upload or signing request is submitted.

Existing service calls, raw states, six-item page size,300ms matching debounce, countdown thresholds, invitation flow, detail/form callbacks and Redux behavior remain. `unknown` is the existing editable session before it is sent for processing, displayed as “Chưa gửi xử lý”. Session form/detail/signature internals follow06b. No dependencies added. Prior#22 production Ready/HTTP200 evidence is committed in ../05d/production-health.json.

## Preview QA

Primary Vercel Ready for c8f7da2. QA User has no sessions,so the real successful empty state was checked at1440/390;mobile width390/390px,create target48px. The existing labelled creation form opens and closes with focus restored,without submitting. Populated cards/search/pagination are covered by local GETfixtures and13tests,not claimed as real preview data. Notary navigation and Admin shared verify/navigation/logout pass. Allthree roles logged out;five preview captures. No create,join,upload,signature or payment action.
