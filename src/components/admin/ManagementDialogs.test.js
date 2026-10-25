import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import CreateNotaryAccountModal from '../../pages/admin/employee-management/CreateNotaryAccountModal';
import EmployeeDetailModal from '../../pages/admin/employee-management/EmployeeDetailModal';
import UserDetailModal from '../../pages/admin/user-management/UserDetailModal';
import UserService from '../../services/user.service';
jest.mock('../../services/user.service', () => ({ createUserAccount: jest.fn(), getUserById: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test('notary account creation retains exact role/payload and201 close rule', async () => {
  const onClose = jest.fn(); UserService.createUserAccount.mockResolvedValue({ status: 201 });
  render(<CreateNotaryAccountModal open onClose={onClose} />, { wrapper });
  for (const [label, value] of [['Họ và tên', 'Nguyễn Thị Mỹ'], ['Email', 'qa@example.com'], ['Mật khẩu', 'local-fixture']]) fireEvent.change(screen.getByLabelText(label), { target: { value } });
  expect(screen.getByLabelText('Mật khẩu')).toHaveAttribute('type', 'password'); fireEvent.click(screen.getByRole('button', { name: 'Tạo tài khoản', exact: true }));
  await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1)); expect(UserService.createUserAccount).toHaveBeenCalledWith({ name: 'Nguyễn Thị Mỹ', email: 'qa@example.com', password: 'local-fixture', role: 'notary' });
});
test('employee detail retries same ID and maps account fields without claiming a notary license number', async () => {
  UserService.getUserById.mockRejectedValueOnce(new Error('fixture')).mockResolvedValue({ id: 'NV-MAU', name: 'Nguyễn Thị Mỹ', role: 'notary', createdAt: '2026-01-02T00:00:00Z' });
  render(<EmployeeDetailModal open employeeId="NV-MAU" handleClose={jest.fn()} />, { wrapper });
  await screen.findByText('Chưa thể tải thông tin nhân viên'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Nguyễn Thị Mỹ');
  expect(UserService.getUserById).toHaveBeenCalledTimes(2); expect(UserService.getUserById).toHaveBeenLastCalledWith('NV-MAU');
  fireEvent.click(screen.getByRole('tab', { name: 'Thông tin nghề nghiệp' })); expect(screen.getByText('Mã tài khoản nhân viên')).toBeInTheDocument(); expect(screen.getByText('02/01/2026')).toBeInTheDocument();
});
test('user detail keeps original lookup and replaces invented documents with an honest unavailable state', async () => {
  UserService.getUserById.mockResolvedValue({ name: 'Trần Văn An', address: {} });
  render(<UserDetailModal open userId="ND-MAU" handleClose={jest.fn()} />, { wrapper }); await screen.findByText('Trần Văn An'); expect(UserService.getUserById).toHaveBeenCalledWith('ND-MAU');
  fireEvent.click(screen.getByRole('tab', { name: 'Tài liệu công chứng' })); expect(screen.getByText('Chưa có dữ liệu tài liệu tại đây')).toBeInTheDocument();
  expect(screen.queryByText('Công chứng hợp đồng mua bán nhà đất')).not.toBeInTheDocument(); expect(screen.getByRole('link', { name: 'Mở Quản lý công chứng' })).toHaveAttribute('href', '/admin/notary-management');
});
