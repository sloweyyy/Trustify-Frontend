import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import AdminDashboard from './AdminDashboard';
import AdminService from '../../../services/admin.service';
jest.mock('../../../services/admin.service', () => ({ getDocumentMetricsByPeriod: jest.fn(), getSessionMetricsByPeriod: jest.fn(), getPaymentMetricsByPeriod: jest.fn(), getPaymentServiceByPeriod: jest.fn(), getPaymentFieldByPeriod: jest.fn(), getDocumentFieldByPeriod: jest.fn() }));
jest.mock('./DocumentByField', () => () => null);
jest.mock('./RevenueByServiceSection', () => () => null);
jest.mock('./RevenueByFieldSection', () => () => null);
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const metric = (key, value = 0, period = 'today') => ({ currentPeriod: { period, [key]: value }, previousPeriod: { [key]: 0 } });
beforeEach(() => {
  AdminService.getDocumentMetricsByPeriod.mockResolvedValue(metric('documentCount'));
  AdminService.getSessionMetricsByPeriod.mockResolvedValue(metric('sessionCount'));
  AdminService.getPaymentMetricsByPeriod.mockResolvedValue(metric('totalAmount'));
  for (const name of ['getPaymentServiceByPeriod', 'getPaymentFieldByPeriod', 'getDocumentFieldByPeriod']) AdminService[name].mockResolvedValue({});
});
test('dashboard makes the original six today reads, retries the same metric reads and shows actual zero values', async () => {
  AdminService.getDocumentMetricsByPeriod.mockRejectedValueOnce(new Error('fixture'));
  render(<AdminDashboard />, { wrapper }); await screen.findByText('Chưa thể tải số liệu thống kê');
  for (const method of Object.values(AdminService)) expect(method).toHaveBeenCalledWith('today');
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Tổng doanh thu');
  expect(AdminService.getDocumentMetricsByPeriod).toHaveBeenCalledTimes(2); expect(screen.getAllByText('Không phát sinh ở cả hai kỳ')).toHaveLength(3);
});
test('an older metric response cannot replace the period the administrator selected', async () => {
  let finishOld;
  AdminService.getDocumentMetricsByPeriod.mockImplementation((period) => period === 'today' ? new Promise((resolve) => { finishOld = resolve; }) : Promise.resolve(metric('documentCount', 50, period)));
  render(<AdminDashboard />, { wrapper });
  fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Khoảng thời gian thống kê' })); fireEvent.click(await screen.findByRole('option', { name: 'Tháng này' }));
  expect(await screen.findByText('50')).toBeInTheDocument();
  await act(async () => { finishOld(metric('documentCount', 12)); });
  expect(screen.getByText('50')).toBeInTheDocument(); expect(screen.queryByText('12')).not.toBeInTheDocument();
});
