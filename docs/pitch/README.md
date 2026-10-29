# Trustify pitch deck

A12-slide English product pitch for LinkedIn visitors and prospective notary-office pilot partners. Published as a static page inside the frontend deployment, with no backend/API changes or added dependencies.

- Stable web link: **https://trustify-notary.vercel.app/pitch/**
- [PDF](../../public/pitch/trustify-pitch.pdf)
- [Editable PowerPoint](../../public/pitch/trustify-pitch.pptx)
- [Slide copy and source notes](deck-content.json)
- [Desktop page](pitch-1440.png), [mobile page](pitch-390.png)

## Story

1. Online notarization for Vietnam
2. The document-work problem
3. Intended audiences
4. The application workflow
5. Guided Vietnamese submission
6. Notary review
7. Document verification
8. Technical foundation
9. Hackathon recognition
10. Proposed business model
11. Proposed pilot-readiness gates
12. Invitation to pilot partners

Current implementation and future proposals are separate. No users, revenue, market size, partnerships, processing times, cost reductions or regulatory approval are invented. The existing 2025 award names/dates/issuers come from the owner's public LinkedIn entries. The UI screenshots show the October2026 redesign, not the 2025 event. Private case examples use synthetic QA records and sample files.

## Evidence

- [Approved identity](../brand/brand-identity.md), logoB and Be Vietnam Pro.
- [Implementation and all-role evidence](../design/final/README.md).
- [Frontend source](https://github.com/sloweyyy/Trustify-Frontend) and [backend source](https://github.com/sloweyyy/Trustify-Backend) inspected read-only for feature claims. Gemini provides procedural guidance. PayOS integration is supported, while the public demo simulates payments. NFT minting uses Solana devnet and Metaplex. Document files stay in private storage. Solana devnet NFT metadata records the SHA-256 fingerprint, allowing a person holding a copy to compare it. This follows the merged backend privacy update in PR #16; production rollout confirmation is pending.
- Per-slide sources/context are in the PowerPoint speaker notes, the web transcript and deck-content.json.
- Original screenshots remain in docs/design/screenshots/final/. Crops preserve the relevant UI and label synthetic examples. No generated event photos or certificates.

## Format and hosting

The editable PowerPoint uses native text objects and embedded original screenshots/logo. The PDF preserves the rendered appearance of all12 slides. The web page supplies a readable text transcript and source context for each slide, including when JavaScript is disabled. Mobile starts in reading mode, desktop shows one slide at a time. Arrow/Page keys, page selector, presentation mode and Escape work without fullscreen permissions. Every slide links to its full-resolution PNG.

`public/pitch/` contains the page, assets, PDF and PPTX. Existing app routes/guards stay unchanged. Two explicit Vercel rewrites map `/pitch` and `/pitch/` to the static index before the existing SPA fallback. Relative assets use the canonical `/pitch/` base. Public-page controls use Vietnamese, while pitch content is English for the LinkedIn audience. No analytics or third-party scripts/fonts are added. Self-hosted fonts include their OFL license.

To update, edit the PPTX and copy, export the matching slide previews and PDF, then update public/pitch/. Keep the stable URLs so LinkedIn links continue working. Refresh share-preview.jpg when changing the cover. Preview images and PDF are rendered assets, not the editing source.

## Checks

`CI=false npm run build` and CRA ESLint for public/pitch/pitch.js pass. The PPTX package/layout/font/import checks pass with12 slides and native Be Vietnam Pro text. All slides were rendered and visually inspected. PDF has12 pages. [Focused browser check](browser-check.json) passes at1440/390/320, including route aliases, navigation, keyboard, Escape, reading mode, downloads, fonts, no overflow, no page errors and no writes. Final deployment verification follows merge.
