# Design 06d — Ví tài liệu

Baseline main43715c7 (latest main after independent CI PR #25). This branch started independently while PR26 was blocked on preview QA; no stacked source dependency.

Ten before/after pairs at1440×1000 and390×844 cover populated, empty, failed read, expanded record code and actions. Local GET fixtures only, all non-auth writes blocked. Synthetic mint ID and example metadata URL. No remote file opened, no sharing/purchase submission.

One responsive HorizontalCard replaces duplicate desktop/mobile presentation; BoxCard remains a compatibility export. Same nftItems order and all amounts, including0. Same original document object passed to TransferModal/PurchaseModal; same ipfsLink and original filename passed to FilePreviewModal. Filename prefix cleanup and six-month calculation retained. The six-month UI is labelled as a computed reference point rather than asserting legal expiry, since API supplies mintedAt rather than an expiry field.

Vietnamese record-code labels and short blockchain/NFT explanation include the current Solana devnet environment from approved brand/spec. No new mint status, legal badge, job polling, permissions or payment behavior.

Build/CRA ESLint/eight targeted tests pass. Changed-file lint uses package.json explicitly to avoid the existing JSX-incompatible flat configuration. Transfer/purchase dialog interiors remain for06e. Local keyboard report passes390/720/1440, including record toggle via Enter and purchase dialog open/Escape without submitting. Post-merge wallet production role evidence will follow. Per Claude review comment on PR26, protected preview click-through is replaced with read-only production QA after merging; see https://github.com/sloweyyy/Trustify-Frontend/pull/26#issuecomment-6396092030 .
