import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryDataTable from '../../../components/services/HistoryDataTable';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';

jest.mock('../../../components/modals/HistoryDetailModal', () => {
  return function MockModal({ open, handleClose, notaryId }) {
    return open ? (
      <div data-testid="history-modal" onClick={handleClose}>
        Modal for {notaryId}
      </div>
    ) : null;
  };
});

describe('HistoryDataTable', () => {
  const defaultProps = {
    filterStatus: 'All',
    searchText: '',
    rows: [
      {
        id: '1',
        profile: 'HS001',
        date: '20/03/2024',
        name: 'User Test 1',
        status: 'Hoàn tất',
        service: 'Service 1',
      },
      {
        id: '2',
        profile: 'HS002',
        date: '21/03/2024',
        name: 'User Test 2',
        status: 'Chờ xử lý',
        service: 'Service 2',
      },
    ],
    headCells: [
      { id: 'profile', label: 'Mã hồ sơ' },
      { id: 'date', label: 'Ngày thực hiện' },
      { id: 'name', label: 'Tên khách hàng' },
      { id: 'status', label: 'Trạng thái' },
      { id: 'service', label: 'Dịch vụ' },
    ],
    statusTypes: {
      All: 'All',
      Completed: 'Hoàn tất',
      Pending: 'Chờ xử lý',
    },
    setStatusColor: (status) => ({
      color: status === 'Completed' ? '#1F9254' : '#B54708',
      backgroundColor: status === 'Completed' ? '#E8F5E9' : '#FFF3E0',
    }),
    data: [],
  };

  const renderWithWrapper = (props = defaultProps) => {
    return render(<ThemeProvider theme={createTrustifyTheme()}><HistoryDataTable {...props} /></ThemeProvider>);
  };

  describe('Rendering', () => {
    it('renders table headers', () => {
      renderWithWrapper();
      defaultProps.headCells.forEach((cell) => {
        expect(screen.getByText(cell.label)).toBeInTheDocument();
      });
    });

    it('renders table data', () => {
      renderWithWrapper();
      expect(screen.getByText('HS001')).toBeInTheDocument();
      expect(screen.getByText('User Test 1')).toBeInTheDocument();
      expect(screen.getByText('Service 1')).toBeInTheDocument();
    });

    it('shows the canonical lifecycle label', () => {
      renderWithWrapper();
      expect(screen.getByText('Hoàn tất')).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    it('filters rows by status', () => {
      renderWithWrapper({
        ...defaultProps,
        filterStatus: 'Hoàn tất',
      });
      expect(screen.getByText('HS001')).toBeInTheDocument();
      expect(screen.queryByText('HS002')).not.toBeInTheDocument();
    });

    it('filters by search text', () => {
      renderWithWrapper({
        ...defaultProps,
        searchText: 'User Test 1',
      });
      expect(screen.getByText('User Test 1')).toBeInTheDocument();
      expect(screen.queryByText('User Test 2')).not.toBeInTheDocument();
    });
  });

  describe('Row Interaction', () => {
    it('shows modal on row click', () => {
      renderWithWrapper();
      const row = screen.getByRole('row', { name: /HS001/ });
      fireEvent.click(row);
      expect(screen.getByTestId('history-modal')).toBeInTheDocument();
    });

    it('closes modal on click', () => {
      renderWithWrapper();
      const row = screen.getByRole('row', { name: /HS001/ });
      fireEvent.click(row);
      const modal = screen.getByTestId('history-modal');
      fireEvent.click(modal);
      expect(screen.queryByTestId('history-modal')).not.toBeInTheDocument();
    });
  });

  describe('Table Features', () => {
    it('handles sorting', () => {
      renderWithWrapper();
      const headerCell = screen.getByRole('columnheader', { name: 'Mã hồ sơ' });
      fireEvent.click(screen.getByRole('button', { name: 'Mã hồ sơ' }));
      expect(headerCell).toHaveAttribute('aria-sort', 'descending');
    });

    it('updates row display on page size change', () => {
      const manyRows = Array(20)
        .fill(null)
        .map((_, i) => ({
          ...defaultProps.rows[0],
          id: `${i}`,
          profile: `HS${String(i + 1).padStart(3, '0')}`,
        }));

      renderWithWrapper({
        ...defaultProps,
        rows: manyRows,
      });

      const rowsPerPageSelect = screen.getByRole('combobox');
      expect(rowsPerPageSelect).toBeInTheDocument();
    });
  });
});
