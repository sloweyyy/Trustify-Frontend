import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import HistoryDataTable from './HistoryDataTable';
import PendingPayments from '../payment/PendingPayments';
import PaymentService from '../../services/payment.service';
import { STATUS_TYPES } from '../../utils/constants';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());
jest.mock('../modals/HistoryDetailModal', () => ({ open, notaryId, handleClose }) => open ? <div role="dialog" aria-label={notaryId}><button onClick={handleClose}>Đóng hồ sơ</button></div> : null);
jest.mock('../../services/payment.service', () => ({ getMyPayments: jest.fn(), updatePaymentStatus: jest.fn() }));
const wrapper = ({ children }) => <MemoryRouter><ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider></MemoryRouter>;
const heads = ['profile', 'date', 'name', 'status', 'service'].map((id) => ({ id, label: id }));
const rows = Object.freeze(Array.from({ length: 12 }, (_, index) => ({ id: index, profile: `HS-${String(index).padStart(2, '0')}`, date: '25/10/2026', name: `Người ${index}`, status: STATUS_TYPES.Pending, service: 'Sao y' })));
const list = (query = '') => <HistoryDataTable rows={rows} headCells={heads} statusTypes={STATUS_TYPES} filterStatus={STATUS_TYPES.All} searchText={query} data={[]} />;
beforeEach(() => { jest.clearAllMocks(); useMediaQuery.mockReturnValue(false); });

test.each([false, true])('both layouts open the original document ID without mutating rows (%s)', (mobile) => {
  useMediaQuery.mockReturnValue(mobile); render(list(), { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Xem hồ sơ HS-00', exact: true }));
  expect(screen.getByRole('dialog', { name: 'HS-00' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Đóng hồ sơ' })); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(rows[0].profile).toBe('HS-00'); expect(rows[11].profile).toBe('HS-11');
});

test('search on a later page shows the matching row and the filtered count', () => {
  const view = render(list(), { wrapper }); fireEvent.click(screen.getByRole('button', { name: 'Trang sau' }));
  expect(screen.getByText('HS-11')).toBeInTheDocument(); view.rerender(list('HS-02'));
  expect(screen.getByText('HS-02')).toBeInTheDocument(); expect(screen.getByText('1–1 trong 1')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Trang sau' })).toBeDisabled();
});

test('payment amounts and exact checkout URLs are retained; entries without a URL stay hidden', async () => {
  PaymentService.getMyPayments.mockResolvedValue([{ id: 'one', documentId: 'HS-01', amount: 1250000, checkoutUrl: 'https://checkout.example/one' }, { id: 'two', sessionId: 'SESSION-02', amount: 250000, checkoutUrl: 'https://checkout.example/two' }, { id: 'hidden', amount: 1 }]);
  render(<PendingPayments />, { wrapper });
  expect(await screen.findByRole('link', { name: 'Thanh toán hồ sơ HS-01' })).toHaveAttribute('href', 'https://checkout.example/one');
  expect(screen.getByRole('link', { name: 'Thanh toán hồ sơ SESSION-02' })).toHaveAttribute('href', 'https://checkout.example/two');
  expect(screen.getAllByRole('link')).toHaveLength(2); expect(screen.getByText(/1\.250\.000\s₫/)).toBeInTheDocument();
  expect(PaymentService.getMyPayments).toHaveBeenCalledWith('pending'); expect(PaymentService.updatePaymentStatus).not.toHaveBeenCalled();
});

test('payment read failure offers retry without implying that nothing is owed', async () => {
  PaymentService.getMyPayments.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce([]);
  render(<PendingPayments />, { wrapper }); await screen.findByText('Chưa thể tải khoản chờ thanh toán');
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  await waitFor(() => expect(screen.queryByText('Đang kiểm tra khoản chờ thanh toán…')).not.toBeInTheDocument());
  expect(PaymentService.getMyPayments.mock.calls).toEqual([['pending'], ['pending']]); expect(PaymentService.updatePaymentStatus).not.toHaveBeenCalled();
});


test.each([false, true])('a newly submitted ID is revealed once without changing the sort order (%s)', (mobile) => {
  useMediaQuery.mockReturnValue(mobile); render(<HistoryDataTable rows={rows} headCells={heads} statusTypes={STATUS_TYPES} filterStatus={STATUS_TYPES.All} searchText="" data={[]} highlightId="HS-11" />, { wrapper });
  expect(screen.getByText('HS-11')).toBeInTheDocument(); expect(screen.getByText('Vừa gửi')).toBeInTheDocument();
  expect(screen.getByText('11–12 trong 12')).toBeInTheDocument();
  expect(screen.queryByText('HS-00')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Trang trước' }));
  expect(screen.getByText('HS-00')).toBeInTheDocument(); expect(screen.queryByText('HS-11')).not.toBeInTheDocument();
});
