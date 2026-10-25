# Trustify design revamp progress

All timestamps use Asia/Ho_Chi_Minh (UTC+07). Merge requires Claude’s `review:approved` label.

| Step | PR | Status | Updated | Summary |
| --- | --- | --- | --- | --- |
| Brand assets | #8 | Merged | 2026-10-25 | Approved Logo B, favicon and public brand assets. |
| 01 — Tokens and MUI | #10 (supersedes #9) | Merged; production healthy | 2026-10-25 05:08 | Existing implementation renamed to required design/01 branch; GitHub closed #9 on branch rename. Theme, auth composition, fonts, AA status colors; build/tests passed. Build + 7 tests + CRA ESLint pass; 144 route screenshots and authenticated Vercel QA completed. |
| 02 — Shared status slice | #11 | Merged; production healthy | 2026-10-25 06:10 | 760 source lines. Central chips/filter adapter, canonical rejected + legacy invalid support, verification separation, and stable Admin toolbar focus. Build, CRA ESLint, 30 tests, real QA filters and all-three-role Vercel click-through pass; 16 before/after + 8 preview screenshots. Remaining shared primitives are separate small PRs. |

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

- PR #11 review round 1: nowrap labels, centered chips, minimum status-column widths, and true 390px viewport images implemented. Build/ESLint/30 tests and browser geometry/pixel-width checks pass; updated Vercel preview verified with all three QA roles; actual Admin chip center within 0.5px and all 24 image widths verified. Re-requesting Claude review.

- PR #11 merged with review approval; main production Ready and homepage healthy. Design 03 acceptance: temporary Drawer at xs/sm and no horizontal overflow at 390px on every authenticated route. Admin empty pagination count follows in step 08.
- 02b — Shared form controls, PR #12, 2026-10-25 07:02: build, CRA ESLint and 22 tests pass; 15 before/after pairs and all-role local read-only QA complete. Vercel primary Ready; authenticated User/Notary/Admin preview click-through complete, 10 preview screenshots. Ready for Claude review.

- PR #12 review round 1: removed three border-suppressing rules and linked all five session fields through FieldLabel/useId. Local 1440/390 captures and computed border checks pass; build/ESLint/23 tests pass. Vercel updated deployment Ready; five linked inputs have solid 1px borders, and 1440/390 preview screenshots refreshed. Re-requesting Claude review. Profile save action footer follows in step 06.

- PR #12 merged after Claude round-2 approval; production main 5e14c895 Ready, homepage HTTP200/no uncaught errors at 07:12.
- 02c — Feedback states, PR #13, 2026-10-25 07:18: confirmation Dialog, themed Toastify, shared loading/empty/error and two Notary queue adoptions. Build/ESLint/19 tests and local all-role browser checks pass; 18 paired before/after captures plus four simulated GET fixtures. Primary Vercel Ready; all-role click-through, User stay/Notary logout/Admin Escape, both queue empties and public loader verified; 12 preview captures. Ready for Claude review.

- PR #13 approved and merged; production main b25ab519 Ready, HTTP200/no uncaught errors at07:25. Claude requested03 before further02x slices.
- 03 — Authenticated shell, PR #14, 2026-10-25 07:32: temporary Drawer below md, mobile appbar, accessible current links/skip link, desktop collapse; removed wizard fixed width and reflowed overflowing Admin toolbars/chart and Notary pagination. Build/ESLint/21 tests pass. All20 supported QA route/role combinations have document width390 at390px, with zero page errors; keyboard/focus checks pass.40 before/after pairs+9 nav captures. Vercel primary Ready; all-role navigation and collapse click-through pass, six measured preview views are390px wide with390px main, keyboard focus restoration passes,12 captures. Ready for Claude review; public header/footer follows03b.

- PR #14 approved and merged; production main b9b098a Ready and HTTP200/no uncaught errors at07:52. Supplemental /verify checks pass for all3 roles (23 total supported auth route-role cases);720px zoom-equivalent audit passes20 cases. Native browser zoom is not claimed.
- Claude follow-ups from #14: User05 must use mobile hồ sơ cards (ID,date,DocumentStatusChip,service); Admin08 must widen period Select and make trend deltas meaningful by sign/base.
- 03b — Public shell, PR #15, 2026-10-25 08:01: accessible mobile Drawer, active desktop navigation,44px links, skip link and stacked footer.762 source changed lines; build/ESLint/11 tests pass.44 before/after pairs, footer contrast12.76:1 and local focus/bounds checks pass. Final preview source6b94396 Ready; all3 roles and keyboard navigation verified,10 preview captures. Ready for Claude review. Existing Home/Services/User Guide body overflow and Home copy remain for09; chatbot launcher for10.

- PR #15 pre-review fixes: Header sits outside skip target; internal footer links return focus to content; page-level Suspense keeps navigation/transitions mounted during lazy route loads. Public sequence and20 authenticated390px regressions pass; route/service/Redux contracts retained.

- PR #15 approved and merged; production main2225e3f Ready, HTTP200/no uncaught errors at08:46. Claude follow-up Chatbot10:44px launcher,16px edge inset and safe-area padding.
- 02d — File selection and attachment lists, PR pending, 2026-10-25 09:05: build/CRA ESLint/16 tests pass; eight paired desktop/mobile captures show no overflow and no non-auth writes. Original file events/wrapper callbacks retained. Preview/wallet content follows02e; original filename display User04; unused legacy UploadedFileList cleanup11. Vercel QA pending.
