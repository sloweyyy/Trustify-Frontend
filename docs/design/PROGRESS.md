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
- 02d — File selection and attachment lists, PR #16, 2026-10-25 09:06: build/CRA ESLint/16 tests pass; eight paired desktop/mobile captures show no overflow and no non-auth writes. Original file events/wrapper callbacks retained. Preview/wallet content follows02e; original filename display User04; unused legacy UploadedFileList cleanup11. Primary Vercel Ready; User/Notary/Admin preview click-through complete, eight captures. Native chooser opens, but fixture selection is extension-permission-limited; actual selection/removal/review passed locally. Ready for Claude review.

- PR #16 approved and merged; production mainfebf4dd Ready and HTTP200/no uncaught errors at09:22. Claude User04 follow-ups: accept .jpeg alongside .jpg with case-insensitive JPG/JPEG tests; reduce nested attachment padding at390. The backend DOCX session-upload limitation is owned separately by Claude; no backend changes here.
- 02e — Wallet picker and document preview dialogs, PR #17, 2026-10-25 09:28: Vietnamese controls, responsive Dialogs, loading/empty/error/retry and keyboard access. Existing GET methods, metadata sources, positive-amount filter/order, six-month display calculation and selected object callbacks retained. Build/CRA ESLint/19 tests pass. Sixteen paired desktop/mobile state captures show no overflow or non-auth writes; nested preview Escape/focus and wallet keyboard trap pass. Primary Vercel Ready; User populated wallet/code display/preview failure and retry/nested focus restoration checked, no selection. Notary queue/navigation and Admin navigation/verify/logout pass. Eight preview captures. Ready for Claude review.

- PR #17 approved and merged; main2ca180c production Ready and HTTP200/no uncaught errors at09:45. Claude explicitly requested04 next. Shared table/mobile cards and signature framing remain in role05/06; they are not complete yet. Preview footer xs full-width/primary-first follow-up is included04.
- 04 — Create-profile wizard, PR #18, 2026-10-25 09:54: three-step Vietnamese composition, retained values/original display names, JPEG support/case-insensitive tests, mobile spacing, inline validation/focus, read retry and failed-submit data retention. Build/CRA ESLint/29 tests pass;16 before/after pairs, zero-write local User flow and720px layout audit pass. FormData and wallet payload contracts tested with mocked submission. Primary Vercel Ready; User full three-step wallet/review/back/removal and Notary/Admin click-through pass. Final source removes duplicate validation toast that obscured mobile choices; inline focus and direct wallet opening rechecked.11 preview captures. Ready for Claude review.

- PR #18 approved and merged; production main8fba197 Ready and HTTP200/no uncaught errors at10:18. Claude05 follow-ups: navigate to history on successful submission and clear wallet selections; included05a.
- 05a — History/mobile cards and pending payments, PR #19, 2026-10-25 10:35: table/card filter and ID parity, keyboard detail action, truthful empty/loading/error states, readable payment amounts/unchanged checkout hrefs, and successful-submit history handoff/wallet reset. Build/CRA ESLint/39 tests pass;20 before/after pairs. Read scenarios zero non-auth writes; submit handoff is a locally fulfilled HTTP201/document-body POST fixture. Payment result05b and detail/signature05c remain. Primary Vercel Ready; User real history/filter/search/detail keyboard and final source bounds checks pass; Notary/Admin navigation/logout pass.8 preview captures. Checkout not activated; actual created-document success/reveal verified via local intercepted HTTP201 and39 tests, including Strict Mode. Ready for Claude review.

- 05a contract audit: caught a regression in the prior wizard error handling. Backend main2350e752 responds201 with a serialized Document (`id`), not a status200 envelope. Frontend interpretation corrected without service/API changes; created ID is revealed once in history.39 tests cover wire/legacy responses and pagination; network-failure copy directs users to check history before retrying.

- PR #19 approved and merged; production main739c5ca Ready, HTTP200/no uncaught errors at11:15. Production-app mocked HTTP201 submission opens history and highlights the returned ID at1440/390; upload fulfilled locally, no real record created.
- 05b — Payment result presentation, PR #20, 2026-10-25 11:22: shared themed result card, Vietnamese redirect-aware copy and shared loading state. Callback query handling, guard,1500ms timer and return destinations retained. Local callback fixtures only; no real payment updates.

- PR #20: build/CRA ESLint/11 tests pass. Ten before/after pairs at1440/390;52px return action and keyboard Enter at390/720/1440 pass with zero non-auth writes. Primary Vercel Ready; guest/User/Notary/Admin safe ERROR-without-orderCode result and navigation/logout checks pass. Four preview captures. Ready for Claude review.

- PR #20 approved and merged; production mainb049aff Ready, HTTP200/no uncaught errors at11:33. Claude06 follow-up: consider primary Xem ví tài liệu after payment, with certificate-issuance guidance and home secondary.
- 05c — History detail dialog/lifecycle, PR #21, 2026-10-25 11:40: responsive MUI Dialog, readable information, shared attachment/status presentation and honest rejected/unknown progress. Signature save handler retained verbatim; legacy signature/feedback internals follow05d. Build/CRA ESLint/12 tests pass; keyboard/focus/bounds checks pass390/720/1440 with no non-auth writes.

- PR #21: primary Vercel Ready; actual User hồ sơ at1440/390 has no dialog overflow/duplicate IDs; mobile Enter/Escape restores opener. Notary queue empty state and Admin navigation/verify/logout pass. Four preview captures (User header only to exclude identity/signature). No real file-open/signature/payment action. Ready for Claude review.

- PR #21 approved and merged; production maina37657d Ready, HTTP200/no uncaught errors at11:53. Claude05d follow-up: show Ký ngay under header only while the user has an outstanding signature; included05d.
- 05d — Signature frame and notes, PR #22, 2026-10-25 12:05: reusable container-sized240px pad, preserved v2 point arrays through resize/DPR changes, empty/PNG-error guards and original Blob callback. Notes/output readable with shared file actions; outstanding-signature shortcut focuses pad. Build/CRA ESLint/21 tests pass;20 before/after pairs. DPR1/2 and DPR-only transitions preserve ink; two PNG multipart saves intercepted locally, zero backend signatures. SessionFeedback adoption remains06.

- PR #22: primary Vercel Ready for d3e6c4f; signed User detail shows no extra signature action and fits390px; Notary navigation and Admin verify/navigation/logout pass. Three preview captures. Fresh headless preview drawing run stopped at Vercel sign-in protection before QA credentials; existing signed-in Chrome used for real all-role checks. DPR/PNG drawing verified locally with intercepted saves. No signing/file-open/payment actions. Ready for Claude review.

- PR #22 approved and merged; production mainbb65710 Ready, HTTP200/no uncaught errors at12:22.
- 06a — User session list/cards, PR #23, 2026-10-25 12:29: readable responsive cards, canonical lifecycle/participant text, labelled search, error/retry/loading/empty states and truthful zero matches. Existing six-item pagination, rejected-participant exclusion,300ms search, invitation ID flow,create/detail callbacks and Redux upload reset retained. Build/CRA ESLint/13 tests pass;12 before/after pairs and390/720/1440 keyboard/bounds checks pass with zero non-auth writes. Session forms/detail/signature adoption follow06b.

- PR #23: primary Vercel Ready for c8f7da2; User real empty state at1440/390,48px create action and existing form open/close/focus pass. Populated/search/pagination scenarios verified locally because QA account has no sessions. Notary navigation and Admin verify/navigation/logout pass;five preview captures. No create/join/upload/signature/payment submissions. Ready for Claude review.

- PR #23 approved and merged; production main6984ee6 Ready, HTTP200/no uncaught errors at12:47.
- 06b — Session detail/signature presentation, PR #24 (draft), 2026-10-25 13:09 +07: responsive named Dialog, single-column mobile fields, readable notes/output and shared signature pad; unchanged mutation handlers/eligibility. Includes #23 search reset and creator identity follow-ups. Build/CRA ESLint/40 tests pass;22 session/list pairs plus8 pixel-identical history regression pairs. Keyboard/focus/bounds pass390/720/1440, zero non-auth writes. Preview checks pending.

- PR #24: 2026-10-25 16:19 +07, primary Vercel Ready for808cd76; User real empty sessions1440/390 and form open/close pass; Notary dashboard/session navigation and Admin dashboard/verify pass. All roles logged out; four preview captures, no real writes beyond auth. Populated/signing states local fixtures only. Ready for Claude review.

- PR #24 approved and merged; production main7654ac1 Ready, HTTP200/no uncaught errors at16:32. Claude non-blocking given-name avatar initial follow-up included06c.
- 06c — Session creation/invitation dialogs, PR #26 (draft), 2026-10-25 16:35 +07: named MUI Dialogs, mobile full-screen creation/footer actions, theme colors/readable copy; unchanged mutation/reset handlers and date fields. Given-name avatar initial correction. Build/CRA ESLint/15 tests and390/720/1440 keyboard/bounds checks pass;8 before/after pairs. Preview pending.
