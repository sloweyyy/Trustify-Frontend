import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import PaymentRedirect from './PaymentRedirect';
import PaymentSuccess from './PaymentSuccess';
import PaymentCancel from './PaymentCancel';
import PaymentService from '../../services/payment.service';

jest.mock('../../services/payment.service', () => ({ updatePaymentStatus: jest.fn() }));
const show = (query = '', props = {}, strict = false) => {
  const redirect = <PaymentRedirect {...props} />;
  return render(<MemoryRouter initialEntries={['/payment/redirect' + query]}><ThemeProvider theme={createTrustifyTheme()}><Routes>
    <Route path="/payment/redirect" element={strict ? <React.StrictMode>{redirect}</React.StrictMode> : redirect} />
    <Route path="/" element={<h1>Trang chủ thử nghiệm</h1>} />
    <Route path="/custom" element={<h1>Đích đã cấu hình</h1>} />
  </Routes></ThemeProvider></MemoryRouter>);
};
beforeEach(() => { jest.clearAllMocks(); PaymentService.updatePaymentStatus.mockResolvedValue({}); });
afterEach(() => jest.useRealTimers());

test('PAID retains its callback and calls it only once in Strict Mode', () => {
  show('?status=PAID&orderCode=fixture-123', {}, true);
  expect(PaymentService.updatePaymentStatus.mock.calls).toEqual([['fixture-123', 'PAID']]);
  expect(screen.getByRole('heading', { level: 1, name: 'Đã nhận kết quả thanh toán' })).toBeInTheDocument();
  expect(screen.queryByText(/email xác nhận/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Về trang chủ' }));
  expect(screen.getByRole('heading', { name: 'Trang chủ thử nghiệm' })).toBeInTheDocument();
});

test.each(['CANCELLED', 'ERROR'])('%s retains its CANCELLED update and configured destination', (status) => {
  show(`?status=${status}&orderCode=fixture-456`, { cancelRedirectPath: '/custom' });
  expect(PaymentService.updatePaymentStatus.mock.calls).toEqual([['fixture-456', 'CANCELLED']]);
  expect(screen.getByRole('heading', { name: 'Chưa xác nhận được thanh toán' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Về trang chủ' }));
  expect(screen.getByRole('heading', { name: 'Đích đã cấu hình' })).toBeInTheDocument();
});

test.each(['?status=CANCELLED', '?status=ERROR'])('%s without an order code never writes', (query) => {
  show(query); expect(PaymentService.updatePaymentStatus).not.toHaveBeenCalled();
  expect(screen.getByText(/trước khi thử lại/)).toBeInTheDocument();
});

test.each(['', '?status=UNKNOWN&orderCode=fixture', '?status=PAID'])('unknown/incomplete query retains the 1500ms fallback (%s)', (query) => {
  jest.useFakeTimers(); show(query);
  expect(screen.getByRole('status')).toHaveTextContent('Đang đọc kết quả thanh toán…');
  act(() => jest.advanceTimersByTime(1499)); expect(screen.getByRole('status')).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1)); expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Chưa xác nhận được thanh toán');
  expect(PaymentService.updatePaymentStatus).not.toHaveBeenCalled();
});

test('callback failure preserves the existing result handling without inventing bank confirmation', async () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  PaymentService.updatePaymentStatus.mockRejectedValueOnce(new Error('fixture failure'));
  show('?status=PAID&orderCode=fixture', { successRedirectPath: '/custom' });
  await waitFor(() => expect(consoleError).toHaveBeenCalled());
  expect(screen.getByRole('heading', { name: 'Đã nhận kết quả thanh toán' })).toBeInTheDocument();
  expect(screen.getByText(/từ trang thanh toán/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Về trang chủ' }));
  expect(screen.getByRole('heading', { name: 'Đích đã cấu hình' })).toBeInTheDocument();
  consoleError.mockRestore();
});

test.each([PaymentSuccess, PaymentCancel])('presentation props retain existing caller contracts (%p)', (Component) => {
  render(<MemoryRouter><ThemeProvider theme={createTrustifyTheme()}><Component title="Tiêu đề riêng" message="Nội dung riêng" subMessage="Hướng dẫn riêng" buttonText="Nút riêng" backButtonText="Nút riêng" /></ThemeProvider></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1, name: 'Tiêu đề riêng' })).toBeInTheDocument();
  expect(screen.getByText('Nội dung riêng')).toBeInTheDocument(); expect(screen.getByText('Hướng dẫn riêng')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Nút riêng' })).toBeInTheDocument();
});
