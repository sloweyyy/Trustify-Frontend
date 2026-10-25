# Design 06e — Wallet action dialogs

Baseline main9c4f257 (approved PR27). Eight before/after pairs at1440×1000 and390×844 cover purchase default/edited quantity and sharing default/selected recipient. Local wallet/email GET fixtures only; all non-auth writes blocked. No purchases/transfers submitted to the backend.

Named MUI Dialogs show the selected document, labelled16px fields, cancel/close and primary actions. Desktop/mobile footer order follows the approved shared dialog style. Submit and inputs disable while a request is pending, preventing repeat clicks. Seven original mutation/input handler bodies retained byte-for-byte; debounce function body retained, moved to module scope and memoized to fix hook lint. Existing response/validation behavior is not redesigned. New tests mock all mutations and verify exact item ID, mint address, email and quantity arguments.

Build, changed-file CRA ESLint and14 tests across three suites pass. Eight local keyboard scenarios cover390/720/1440 plus390 at200% root text size: bounds,16px inputs (32px enlarged),44px close, unique IDs, Tab containment, Enter-open/Escape-close and focus restoration. This is an enlarged-text check, not a claim of exhaustive browser-zoom certification.

Post-merge production read-only QA will follow per Claude's PR26 exception for protected previews. Prior PR27 production all-role evidence is carried in06d/; real document names/record codes excluded from screenshots. No service/Redux/API/backend/route/dependency/configuration changes.
