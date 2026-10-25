# Design 06b — Session detail and signature presentation

Baseline: main `6984ee66d119eb54586330de0d930cc40fccecc4` (approved PR #23).

22 session/list before/after pairs at 1440×1000 and 390×844 cover draft, processing, signature pending, signed participant, missing documents and participant identity. GET fixtures supply these states because the QA user has no real sessions. All non-auth writes are blocked. Displayed signature is a synthetic SVG. No remote file links opened and no actual signature submitted.

Eight additional history detail pairs cover unapproved/approved output. These are pixel-identical, checking the unchanged default branch of shared NotaryFeedback. Baseline restored temporarily for before capture, then current source restored.

Keyboard smoke covers Enter-open, outstanding-signature focus, Escape-close and original-opener focus restoration at 390/720/1440. Contract tests mock the existing FormData submission. The ten mutation handler bodies are retained verbatim; see handler-contract-check.json. Existing creator/participant eligibility, including the legacy empty signature-users branch, remains unchanged.

Session creation/join form interiors remain for the next slice. Primary Vercel preview Ready; all three roles checked in existing signed-in Chrome. See preview-checks.json and four preview captures.
