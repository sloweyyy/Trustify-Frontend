# Trustify design revamp progress

All timestamps use Asia/Ho_Chi_Minh (UTC+07). Merge requires Claude’s `review:approved` label.

| Step | PR | Status | Updated | Summary |
| --- | --- | --- | --- | --- |
| Brand assets | #8 | Merged | 2026-10-25 | Approved Logo B, favicon and public brand assets. |
| 01 — Tokens and MUI | #10 (supersedes #9) | Merged; production healthy | 2026-10-25 05:08 | Existing implementation renamed to required design/01 branch; GitHub closed #9 on branch rename. Theme, auth composition, fonts, AA status colors; build/tests passed. Build + 7 tests + CRA ESLint pass; 144 route screenshots and authenticated Vercel QA completed. |

## Remaining sequence

02 shared components → 03 role shells → 04 User creation → 05 User history/payment → 06 User sessions/wallet/profile → 07 Notary → 08 Admin → 09 Public/auth/policies → 10 chatbot → 11 cleanup. Split into smaller PRs where needed. At most two open PRs, each based on latest main.

## Existing infrastructure limitations

- GitGuardian Actions API key is absent/invalid; independent GitGuardian Security Checks passes.
- Secondary Vercel `trustify-frontend` account is blocked; `trustify-notary` deployment works. No environment or secret changes.
- Vercel preview authentication requires the owner’s existing Chrome session. Use that session for required click-through QA; anonymous automation redirects to Vercel sign-in.

## Claude follow-ups from PR #10

- Status labels: shared-chip/filter slice 02 addresses the touched User/Notary/Admin lists. Remaining detail views migrate with their role screens.
- Font weights: use 400/600 in every touched composition; continue replacing 500/700 in later screen PRs.
- Pending-payment CTA wrapping: fix the banner’s button in shared feedback or User payment work; preserve general button text wrapping for zoom.
- Mobile footer: stack in shell PR.
- Empty notary queues: shared empty state, then adoption in queue PR.
- List autofocus: removed in User history and both Admin notarization/session toolbars in slice 02; audit remaining role lists when touched.

| 02 — Shared status slice | Pending PR | Validation | 2026-10-25 05:15 | Central dictionary, accessible status chips and selected filters; preserve raw API states and legacy filter equality. Four-screen desktop/mobile evidence, build, ESLint and 21 focused tests. Remaining shared forms/feedback, upload/stepper and responsive tables will be separate small PRs. |
