export const surfacesCustomizations = {
  MuiCssBaseline: { styleOverrides: (theme) => ({
    body: { backgroundColor: theme.palette.background.default, color: theme.palette.text.primary },
    a: { textUnderlineOffset: '4px' },
    '@media (prefers-reduced-motion: reduce)': { '*, *::before, *::after': { scrollBehavior: 'auto' } },
  }) },
  MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
  MuiCard: { styleOverrides: { root: ({ theme }) => ({
    borderRadius: theme.trustify.radius.card, border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper, backgroundImage: 'none', boxShadow: 'none',
  }) } },
  MuiCardContent: { styleOverrides: { root: { padding: 24, '&:last-child': { paddingBottom: 24 }, '@media (max-width:599px)': { padding: 16, '&:last-child': { paddingBottom: 16 } } } } },
  MuiCardHeader: { styleOverrides: { root: { padding: '20px 24px' } } },
  MuiCardActions: { styleOverrides: { root: { padding: '12px 24px', gap: 8, flexWrap: 'wrap' } } },
  MuiAccordion: { defaultProps: { elevation: 0, disableGutters: true }, styleOverrides: { root: ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.background.paper,
    '&::before': { display: 'none' },
  }) } },
  MuiAccordionSummary: { styleOverrides: { root: ({ theme }) => ({ minHeight: 48, '&:hover': { backgroundColor: theme.trustify.subtle } }) } },
  MuiAccordionDetails: { styleOverrides: { root: { padding: '8px 16px 20px' } } },
};
