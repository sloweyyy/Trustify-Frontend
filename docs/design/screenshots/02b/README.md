# Shared form controls — evidence

Base: main f69e375. Local app with the existing API; desktop 1440×1000, mobile 390×844. Images capture the viewport. No account saves, notarization submissions, signatures or payments were performed.

22 targeted tests, CRA ESLint and `CI=false npm run build` pass. Existing CRA/Browserslist warnings remain. Browser checks cover all three roles, associated labels, leading zeros, city clearing and cancel/reset. Calendar geometry checks confirm 44px days inside its mobile paper.

Known gap: the existing authenticated shell still overflows at 390px; step 03 must resolve every authenticated route. Upload, stepper, feedback and responsive tables remain separate shared-component slices.

## admin-profile-edit-desktop

Before

![Before](before-admin-profile-edit-desktop.png)

After

![After](after-admin-profile-edit-desktop.png)

## admin-profile-edit-mobile

Before

![Before](before-admin-profile-edit-mobile.png)

After

![After](after-admin-profile-edit-mobile.png)

## notary-profile-edit-desktop

Before

![Before](before-notary-profile-edit-desktop.png)

After

![After](after-notary-profile-edit-desktop.png)

## notary-profile-edit-mobile

Before

![Before](before-notary-profile-edit-mobile.png)

After

![After](after-notary-profile-edit-mobile.png)

## user-create-step-1-desktop

Before

![Before](before-user-create-step-1-desktop.png)

After

![After](after-user-create-step-1-desktop.png)

## user-create-step-1-mobile

Before

![Before](before-user-create-step-1-mobile.png)

After

![After](after-user-create-step-1-mobile.png)

## user-create-step-2-desktop

Before

![Before](before-user-create-step-2-desktop.png)

After

![After](after-user-create-step-2-desktop.png)

## user-create-step-2-mobile

Before

![Before](before-user-create-step-2-mobile.png)

After

![After](after-user-create-step-2-mobile.png)

## user-history-payment-desktop

Before

![Before](before-user-history-payment-desktop.png)

After

![After](after-user-history-payment-desktop.png)

## user-history-payment-mobile

Before

![Before](before-user-history-payment-mobile.png)

After

![After](after-user-history-payment-mobile.png)

## user-profile-edit-desktop

Before

![Before](before-user-profile-edit-desktop.png)

After

![After](after-user-profile-edit-desktop.png)

## user-profile-edit-mobile

Before

![Before](before-user-profile-edit-mobile.png)

After

![After](after-user-profile-edit-mobile.png)

## user-session-calendar-mobile

Before

![Before](before-user-session-calendar-mobile.png)

After

![After](after-user-session-calendar-mobile.png)

## user-session-form-desktop

Before

![Before](before-user-session-form-desktop.png)

After

![After](after-user-session-form-desktop.png)

## user-session-form-mobile

Before

![Before](before-user-session-form-mobile.png)

After

![After](after-user-session-form-mobile.png)

## Vercel preview

Primary deployment Ready; QA accounts for User, Notary and Admin clicked through without saving. See vercel-checks.json.

![vercel-admin-profile-desktop](vercel-admin-profile-desktop.png)

![vercel-admin-profile-mobile](vercel-admin-profile-mobile.png)

![vercel-notary-profile-desktop](vercel-notary-profile-desktop.png)

![vercel-notary-profile-mobile](vercel-notary-profile-mobile.png)

![vercel-user-profile-desktop](vercel-user-profile-desktop.png)

![vercel-user-profile-mobile](vercel-user-profile-mobile.png)

![vercel-user-session-desktop](vercel-user-session-desktop.png)

![vercel-user-session-mobile](vercel-user-session-mobile.png)

![vercel-user-wizard-desktop](vercel-user-wizard-desktop.png)

![vercel-user-wizard-mobile](vercel-user-wizard-mobile.png)
