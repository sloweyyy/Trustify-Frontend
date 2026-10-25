# Final test and lint gate

Claude requested full-suite CI in the PR #44 approval, after the owner moved browser QA to the end. The initial complete run found 13 failed / 62 passed suites (33 failed /348 passed tests). The design-specific39 suites /203 tests already passed.

Repairs preserve production behavior:

- ProvinceSelector: CRA resets mock implementations before each test; install province/district/ward fixtures in beforeEach. Use linked accessible labels and enabled-input assertions.
- FAQ, Guide, InfoField and StatusBox: replace obsolete carousel, icon/CSS and old-copy assertions with the current semantic ordered steps, independent accordion expansion, definition fields, canonical status, detail callback, loading and missing-result behavior.
- Avatar: retain email-initial cases; current name/fallback coverage is in AvatarIcon.name.test.js. Pixel-dimension tests are replaced by the final browser audit.
- Remove empty App.test.js (it contained no test).
- Remove five orphan suites importing files absent even before the revamp: AnalysisCard/AnalysisCardSkeleton, NotarizationCard/NotarizationCardSkeleton and NotaryDocumentDetailsModal. Actual Notary metrics, queues, loading/errors, document/processing/signature/history review and modal selection are covered by NotaryOverview, QueueFeedback, ReviewDocument, HistoryReview, SessionProcessingReview, SessionSignatureReview and NotarySessionCard suites. No implementation is recreated just to satisfy dead imports.
- Remove duplicate legacy CreateNotarizationProfileStepper suite; current mobile progress, desktop domain labels and noninteractive semantics are exercised by src/components/modals/CreateNotarizationProfileStepper.test.js.
- No skipped tests, excluded suites, relaxed global matcher settings, snapshots or dependencies are added.

The CI workflow adds a test job with two workers for predictable runner resources and keeps the build job. Build now uses CI=true. The requested exact local command remains `CI=true npm test -- --watchAll=false`.

Lint cleanup removes the unused React import from PaymentRoute and the unused USER_EMAIL_ENDPOINT constant. The existing string rejection “Email already exists” is explicitly documented with a single-line no-throw-literal exception: replacing it with Error would change the registration caller contract. Request arguments, URLs, exports and error values remain unchanged. ChatAssistant's warning was already resolved in #43.

CI first-run follow-up: the legacy session-modal display test assumes Vietnam time (09:00Z →16:00). At Claude’s explicit request, CI test job pins TZ=Asia/Ho_Chi_Minh. Preserve the original fixture and application date behavior. The legacy Chatbox pending-state test uses a controlled promise instead of a wall-clock timeout; this verifies the pending state even when a slow/suspended host resumes after the old timeout.
