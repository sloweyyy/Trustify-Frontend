import { focusRing } from '../themeHelpers';

export const navigationCustomizations = {
  MuiAppBar: { styleOverrides: { root: { backgroundImage: 'none' } } },
  MuiToolbar: { styleOverrides: { root: { minHeight: 64 } } },
  MuiDrawer: { styleOverrides: { paper: { backgroundImage: 'none' } } },
  MuiMenu: { styleOverrides: { paper: ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`, borderRadius: theme.trustify.radius.card,
    backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[4],
  }) } },
  MuiMenuItem: { styleOverrides: { root: ({ theme }) => ({
    minHeight: 44, fontSize: '1rem', lineHeight: 1.6, whiteSpace: 'normal', padding: '10px 16px',
    '&:hover': { backgroundColor: theme.trustify.subtle },
    '&.Mui-selected': { color: theme.trustify.onSelected, backgroundColor: theme.trustify.selected },
    '&.Mui-focusVisible': focusRing(theme),
  }) } },
  MuiSelect: { styleOverrides: { select: { whiteSpace: 'normal', paddingRight: 40 } } },
  MuiListItemButton: { styleOverrides: { root: ({ theme }) => ({
    minHeight: 48, borderRadius: 8,
    '&.Mui-selected': { color: theme.trustify.onSelected, backgroundColor: theme.trustify.selected, borderLeft: `3px solid ${theme.palette.primary.main}` },
  }) } },
  MuiLink: { defaultProps: { underline: 'always' }, styleOverrides: { root: ({ theme }) => ({
    color: theme.trustify.link, textUnderlineOffset: '4px',
    '&:focus-visible': { ...focusRing(theme), borderRadius: 2 },
  }) } },
  MuiTabs: { styleOverrides: { root: { minHeight: 48 }, indicator: ({ theme }) => ({ height: 3, backgroundColor: theme.palette.primary.main }) } },
  MuiTab: { styleOverrides: { root: ({ theme }) => ({
    minHeight: 48, padding: '12px 16px', fontSize: '1rem', fontWeight: 600, lineHeight: 1.6, textTransform: 'none',
    '&.Mui-selected': { color: theme.palette.primary.main },
  }) } },
  MuiPaginationItem: { styleOverrides: { root: ({ theme }) => ({
    minWidth: 44, minHeight: 44, fontSize: '1rem',
    '&.Mui-selected': { color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main },
  }) } },
  MuiStepIcon: { styleOverrides: { root: { fontSize: 32 }, text: { fontSize: '.75rem', fontWeight: 600 } } },
  MuiStepLabel: { styleOverrides: { label: { fontSize: '1rem', lineHeight: 1.6 } } },
  MuiStepConnector: { styleOverrides: { line: ({ theme }) => ({ borderColor: theme.trustify.inputBorder }) } },
};
