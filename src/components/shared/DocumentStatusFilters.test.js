import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import HistoryDataTable from '../services/HistoryDataTable';
import { STATUS_TYPES } from '../../utils/constants';

// This test exercises the table's real filter/search pipeline; detail actions are separate.
jest.mock('../modals/HistoryDetailModal', () => () => null);

const legacyStatuses = ['Chờ xử lý', 'Đang xử lý', 'Đang xác minh', 'Sẵn sàng ký số', 'Hoàn tất', 'Không hợp lệ', undefined];
const rows = legacyStatuses.map((status, index) => ({
  id: index + 1, profile: `HS-${index}`, status,
  date: '25/10/2026', name: 'Nguyễn Thị Mỹ', service: 'Chứng thực bản sao',
}));
const headCells = ['profile', 'date', 'name', 'status', 'service'].map(id => ({ id, label: id }));
const theme = createTrustifyTheme();

const table = (filterStatus, searchText = '') => (
  <ThemeProvider theme={theme}>
    <HistoryDataTable
      filterStatus={filterStatus} searchText={searchText}
      rows={[...rows]} headCells={headCells} statusTypes={STATUS_TYPES} data={[]}
    />
  </ThemeProvider>
);

test.each(Object.values(STATUS_TYPES))('the %s filter preserves the same matching record IDs', (filter) => {
  render(table(filter));
  rows.forEach((row) => {
    const matching = filter === STATUS_TYPES.All || row.status === filter;
    expect(screen.queryByText(row.profile) !== null).toBe(matching);
  });
});

test('verification stays distinct, and the newly displayed labels are searchable', () => {
  const { rerender } = render(table('Đang xác minh'));
  expect(screen.getByText('HS-2')).toBeInTheDocument();
  expect(screen.queryByText('HS-1')).not.toBeInTheDocument();
  rerender(table(STATUS_TYPES.All, 'Chờ ký số'));
  expect(screen.getByText('HS-3')).toBeInTheDocument();
  expect(screen.queryByText('HS-2')).not.toBeInTheDocument();
  rerender(table(STATUS_TYPES.All, 'Bị từ chối'));
  expect(screen.getByText('HS-5')).toBeInTheDocument();
  expect(screen.queryByText('HS-3')).not.toBeInTheDocument();
});
