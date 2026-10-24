import { viVN } from '@mui/x-data-grid/locales';
import { severityStyle } from '../themeHelpers';

export const dataDisplayCustomizations = {
  MuiChip: {
    styleOverrides: { root: ({ theme }) => ({
      minHeight: 32, height: 'auto', borderRadius: theme.trustify.radius.pill,
      fontSize: '.875rem', fontWeight: 600, lineHeight: 1.6,
      color: theme.palette.text.primary, backgroundColor: theme.trustify.subtle,
      '&.MuiChip-clickable, &.MuiChip-deletable': { minHeight: 44 },
      variants: ['info', 'warning', 'success', 'error'].map(color => ({ props: { color }, style: severityStyle(theme, color) })),
    }), label: { whiteSpace: 'normal', padding: '5px 12px' }, icon: { fontSize: 18, color: 'inherit' } },
  },
  MuiList: { styleOverrides: { root: { padding: '8px 0' } } },
  MuiListItem: { styleOverrides: { root: { minWidth: 0 } } },
  MuiListItemText: { styleOverrides: { primary: { fontSize: '1rem', lineHeight: 1.6 }, secondary: { fontSize: '.875rem', lineHeight: 1.6 } } },
  MuiListSubheader: { styleOverrides: { root: ({ theme }) => ({ fontSize: '.875rem', fontWeight: 600, color: theme.palette.text.secondary }) } },
  MuiListItemIcon: { styleOverrides: { root: ({ theme }) => ({ minWidth: 32, color: theme.palette.text.secondary }) } },
  MuiTableCell: { styleOverrides: {
    root: ({ theme }) => ({ fontSize: '1rem', lineHeight: 1.6, padding: '14px 16px', borderColor: theme.palette.divider }),
    head: ({ theme }) => ({ fontWeight: 600, color: theme.palette.text.primary, backgroundColor: theme.trustify.subtle }),
  } },
  MuiTableRow: { styleOverrides: { root: { minHeight: 56 } } },
  MuiTablePagination: {
    defaultProps: {
      labelRowsPerPage: 'Số dòng mỗi trang:',
      labelDisplayedRows: ({ from, to, count }) => `${from}–${to} trong ${count === -1 ? `hơn ${to}` : count}`,
      getItemAriaLabel: (type) => ({ first: 'Trang đầu', last: 'Trang cuối', next: 'Trang sau', previous: 'Trang trước' }[type]),
    },
    styleOverrides: { toolbar: { minHeight: 56, flexWrap: 'wrap', gap: 8 }, selectLabel: { fontSize: '.875rem' }, displayedRows: { fontSize: '.875rem' }, actions: { '& button': { minWidth: 44, minHeight: 44 } } },
  },
  MuiDataGrid: {
    defaultProps: { localeText: viVN.components.MuiDataGrid.defaultProps.localeText },
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: '1rem', borderColor: theme.palette.divider, borderRadius: theme.trustify.radius.card,
        backgroundColor: theme.palette.background.paper,
        '--DataGrid-containerBackground': theme.trustify.subtle,
      }),
      columnHeader: ({ theme }) => ({ backgroundColor: theme.trustify.subtle, fontWeight: 600 }),
      cell: ({ theme }) => ({ borderColor: theme.palette.divider }),
      overlay: ({ theme }) => ({ backgroundColor: theme.palette.background.paper, color: theme.palette.text.secondary }),
    },
  },
  MuiTooltip: { styleOverrides: { tooltip: { fontSize: '.875rem', lineHeight: 1.6, padding: '8px 12px' } } },
};
