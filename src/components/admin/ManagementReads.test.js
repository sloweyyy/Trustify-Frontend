import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import EmployeeManagement from '../../pages/admin/employee-management/EmployeeManagement';
import UserManagement from '../../pages/admin/user-management/UserManagement';
import NotaryManagement from '../../pages/admin/notary-management/NotaryManagement';
import AdminService from '../../services/admin.service';
import UserService from '../../services/user.service';
import NotarizationService from '../../services/notarization.service';
import SessionService from '../../services/session.service';
jest.mock('../../services/admin.service', () => ({ getEmployeesCount: jest.fn(), getEmployeesMetrics: jest.fn(), getDocumentMetricsByPeriod: jest.fn(), getSessionMetricsByPeriod: jest.fn() }));
jest.mock('../../services/user.service', () => ({ getAllUsers: jest.fn() }));
jest.mock('../../services/notarization.service', () => ({ getAllNotarizations: jest.fn() }));
jest.mock('../../services/session.service', () => ({ getAllSessions: jest.fn() }));
jest.mock('../../pages/admin/employee-management/Header', () => () => null);
jest.mock('../../pages/admin/employee-management/Overview', () => () => null);
jest.mock('../../pages/admin/employee-management/DataTable', () => () => <div>Danh sách nhân viên đã tải</div>);
jest.mock('../../pages/admin/user-management/UserDataTable', () => ({ rows }) => <div>{rows.map((row) => <span key={row.id}>Số hồ sơ: {row.notaryCount}</span>)}</div>);
jest.mock('../../pages/admin/notary-management/NotaryDataGrid', () => () => <div>Hồ sơ đã tải</div>);
jest.mock('../../pages/admin/notary-management/SessionDataGrid', () => () => <div>Phiên đã tải</div>);
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test('employee read failure retries original null/size5/zero-based page and independent count request', async () => {
  AdminService.getEmployeesCount.mockResolvedValue({ notaryCount: 0, secretaryCount: 0 });
  AdminService.getEmployeesMetrics.mockRejectedValueOnce(new Error('fixture')).mockResolvedValueOnce({ results: [], totalResults: 0 });
  render(<EmployeeManagement />, { wrapper }); await screen.findByText('Chưa thể tải danh sách nhân viên'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Danh sách nhân viên đã tải');
  expect(AdminService.getEmployeesMetrics).toHaveBeenCalledTimes(2); expect(AdminService.getEmployeesMetrics).toHaveBeenLastCalledWith(null, 5, 0); expect(AdminService.getEmployeesCount).toHaveBeenCalledWith();
});
test('user error envelope retries unchanged role/page args and retains a real zero document count', async () => {
  UserService.getAllUsers.mockResolvedValueOnce({ status: 503 }).mockResolvedValueOnce({ results: [{ id: 'qa', name: 'An', documentCount: 0 }], totalResults: 1 });
  render(<UserManagement />, { wrapper }); await screen.findByText('Chưa thể tải danh sách người dùng'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Số hồ sơ: 0'); expect(UserService.getAllUsers).toHaveBeenLastCalledWith('user', null, 10, 1);
});
test('notary-management envelope errors retry original page sizes and yearly totals load once', async () => {
  NotarizationService.getAllNotarizations.mockResolvedValueOnce({ status: 503 }).mockResolvedValueOnce({ results: [], totalResults: 0 }); SessionService.getAllSessions.mockResolvedValue({ results: [], totalResults: 0 });
  AdminService.getDocumentMetricsByPeriod.mockResolvedValue({ currentPeriod: { documentCount: 0 } }); AdminService.getSessionMetricsByPeriod.mockResolvedValue({ currentPeriod: { sessionCount: 0 } });
  render(<NotaryManagement />, { wrapper }); await screen.findByText('Chưa thể tải danh sách'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Hồ sơ đã tải');
  expect(NotarizationService.getAllNotarizations).toHaveBeenLastCalledWith(null, 10, 0); expect(SessionService.getAllSessions).toHaveBeenCalledWith(null, 25, 0); expect(AdminService.getDocumentMetricsByPeriod).toHaveBeenCalledTimes(1); expect(AdminService.getDocumentMetricsByPeriod).toHaveBeenCalledWith('current_year');
});
