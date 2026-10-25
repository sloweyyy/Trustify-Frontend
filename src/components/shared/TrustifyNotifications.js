import React from 'react';
import { GlobalStyles, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import { focusRing } from '../../config/theme/themeHelpers';

const CloseNotification = ({ closeToast }) => (
  <IconButton aria-label="Đóng thông báo" onClick={closeToast} color="inherit" sx={{ flexShrink: 0 }}><Close /></IconButton>
);

const TrustifyNotifications = () => (
  <>
    <GlobalStyles styles={(theme) => {
      const variants = Object.fromEntries(['success', 'error', 'warning', 'info'].map((severity) => {
        const colors = theme.trustify.status[severity];
        return [`.trustify-notifications .Toastify__toast--${severity}`, {
          color: colors.fg, backgroundColor: colors.bg, borderColor: colors.border,
          [`--toastify-color-${severity}`]: colors.fg,
          [`--toastify-icon-color-${severity}`]: colors.fg,
          [`--toastify-color-progress-${severity}`]: colors.fg,
        }];
      }));
      return {
        '.Toastify__toast-container.trustify-notifications': {
          width: 400, maxWidth: 'calc(100vw - 32px)', fontFamily: theme.typography.fontFamily,
          '--toastify-font-family': theme.typography.fontFamily,
          '--toastify-color-light': theme.palette.background.paper,
          '--toastify-text-color-light': theme.palette.text.primary,
        },
        '.trustify-notifications .Toastify__toast': {
          padding: 12, border: `1px solid ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius,
          fontSize: '1rem', lineHeight: 1.6, boxShadow: theme.shadows[4], alignItems: 'flex-start',
        },
        '.trustify-notifications .Toastify__toast-body': { padding: 0, margin: '8px 0', minWidth: 0, overflowWrap: 'anywhere', alignItems: 'flex-start' },
        '.trustify-notifications .Toastify__toast-body > div:last-child': { minWidth: 0 },
        '.trustify-notifications .MuiIconButton-root.Mui-focusVisible': focusRing(theme),
        '@media (max-width:599px)': {
          '.Toastify__toast-container.trustify-notifications': { width: 'calc(100% - 32px)', left: 16, right: 16, bottom: 16 },
          '.trustify-notifications .Toastify__toast': { marginBottom: 8 },
        },
        '@media (prefers-reduced-motion:reduce)': {
          '.trustify-notifications, .trustify-notifications *': { animationDuration: '1ms !important', transitionDuration: '1ms !important' },
        },
        ...variants,
      };
    }} />
    <ToastContainer className="trustify-notifications" closeButton={CloseNotification}
      position="bottom-right" autoClose={2500} newestOnTop rtl={false} pauseOnFocusLoss pauseOnHover />
  </>
);
export default TrustifyNotifications;
