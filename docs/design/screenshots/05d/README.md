# Signature pad and feedback — Design 05d / PR #22

Baseline: main a37657d. Implementation: d3e6c4f. Five states (unsigned, approved, missing documents, note, no output), header and content views, each at 1440×1000 and 390×844: 20 before/after pairs. All data are synthetic GET fixtures. No returned-file link is activated; all non-auth writes are blocked in captures.

`CI=false npm run build` passes with existing repository warnings. CRA ESLint passes all four changed files. 21 tests cover empty and PNG-conversion errors, Blob identity, point-array resize without mutation, original file-open arguments, signed/no-output visibility, shortcut focus, and the unchanged multipart handler.

The real-canvas check uses mouse strokes at DPR 1 and 2. It verifies pointer position, backing/CSS dimensions, ink preservation through 1440→390→1440, and DPR-only changes in both directions. Original and restored ink bounds/counts match. Saved PNGs are extracted from the existing multipart payload; each POST is fulfilled locally. No signature reaches the backend. Synthetic PNG previews and drawing-checks.json are included.

The installed signature_pad 2.3.2 uses arrays of point arrays. Resize replays scaled vector data while retaining original coordinates until another stroke. CSS coordinates stay fixed during an active stroke; resizing waits for onEnd. Disabling throttling prevents queued pointer samples from arriving after a layout change. A DPR-number-only comparison every 500ms covers changes that do not emit resize/media events; cleanup removes all listeners/observers/timers.

To reproduce drawing checks, provide TRUSTIFY_QA_EMAIL and TRUSTIFY_QA_PASSWORD through the environment. TRUSTIFY_PLAYWRIGHT_MODULE and TRUSTIFY_SHARP_MODULE can point to existing installed modules; no package is added to the app. TRUSTIFY_QA_BASE_URL defaults to http://localhost:3001. TRUSTIFY_CHECK_PREFIX separates preview reports. Run `node docs/design/screenshots/05d/drawing-checks.cjs`. Use QA accounts only; the script intercepts every signature POST and blocks other non-auth writes.

The notes and returned-file presentation now uses theme tokens and natural Vietnamese. Signature images/canvas retain a white surface in dark mode. Drawing requires mouse/touch; keyboard reaches headings, guidance, file actions, clear/save/close, without claiming a keyboard drawing alternative.

SessionFeedback adopts the shared pad in 06; its creator/participant branches remain unchanged here. No backend, service, Redux, route, dependency or existing signature-save handler change. Production #21 Ready/HTTP200 evidence is in ../05c/production-health.json.

## Preview QA

Primary Vercel Ready for d3e6c4f. Existing signed-in Chrome: User actual approved document and readable note/output checked; no Ký ngay/Lưu chữ ký after approval,390px dialog content388/388px. Notary navigation and Admin shared verify/navigation/logout pass. All QA roles logged out. Three preview captures; User header only excludes identity fields/signature. No real file-open, signing or payment action.

Fresh headless preview drawing could not reach the app because Vercel redirected it to sign-in protection. It entered no QA credentials and changed no protection/cookie settings. Automated DPR/PNG evidence is local, not a preview claim; actual preview checks above used the existing browser session. The reproduction script now checks the destination origin before entering QA credentials.
