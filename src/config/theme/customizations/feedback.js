import { severityStyle } from '../themeHelpers';

export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        ...severityStyle(theme, ownerState.severity || 'success'),
        border: '1px solid', borderRadius: theme.shape.borderRadius,
        fontSize: '1rem', lineHeight: 1.6, padding: '12px 16px',
        '& .MuiAlert-icon': { color: 'inherit', alignItems: 'flex-start' },
        '& .MuiAlert-action': { alignItems: 'center', paddingTop: 0, marginRight: 0 },
        '@media (max-width:599px)': {
          flexWrap: 'wrap',
          '& .MuiAlert-message': { minWidth: 0, flex: 1, overflowWrap: 'anywhere' },
          '& .MuiAlert-action': { width: '100%', paddingLeft: 0, marginLeft: 0, '& .MuiButton-root': { width: '100%' } },
        },
      }),
    },
  },
  MuiAlertTitle: { styleOverrides: { root: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 } } },
  MuiDialog: { styleOverrides: { paper: ({ theme, ownerState }) => ({
    borderRadius: ownerState.fullScreen ? 0 : theme.trustify.radius.dialog,
    border: `1px solid ${theme.palette.divider}`, backgroundImage: 'none', boxShadow: theme.shadows[8],
  }) } },
  MuiDialogTitle: { styleOverrides: { root: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5, padding: '20px 24px' } } },
  MuiDialogContent: { styleOverrides: { root: { padding: '16px 24px', overflowWrap: 'anywhere' } } },
  MuiDialogActions: { styleOverrides: { root: { padding: '16px 24px', gap: 8, flexWrap: 'wrap' } } },
  MuiLinearProgress: { styleOverrides: { root: ({ theme }) => ({ height: 8, borderRadius: 8, backgroundColor: theme.trustify.subtle }) } },
  MuiCircularProgress: { defaultProps: { 'aria-label': 'Đang tải' } },
  MuiSkeleton: { styleOverrides: { root: ({ theme }) => ({ borderRadius: 6, backgroundColor: theme.trustify.subtle, '@media (prefers-reduced-motion: reduce)': { animation: 'none', '&::after': { animation: 'none' } } }) } },
};
