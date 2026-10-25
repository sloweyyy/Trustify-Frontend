import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import UserProfile from './UserProfile';
import EditUserProfileModal from '../../components/modals/EditUserProfileModal';
import { updateUser } from '../../stores/actions/userAction';
import { toast } from 'react-toastify';

jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: jest.fn() }));
jest.mock('../../stores/actions/userAction', () => ({ updateUser: jest.fn((payload) => ({ type: 'fixture/update', payload })) }));
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
jest.mock('../../components/profile/ProvinceSelector', () => ({ city, district, ward, onCityChange }) => <div><input aria-label="Tỉnh mẫu" readOnly value={city} /><input aria-label="Quận mẫu" readOnly value={district} /><input aria-label="Phường mẫu" readOnly value={ward} /><button onClick={() => onCityChange('Tỉnh mới')}>Đổi tỉnh mẫu</button></div>);
const user = { id: 'PROFILE-MAU', role: 'user', name: 'Nguyễn Thị Mỹ', email: 'qa@example.com', phoneNumber: '0000000000', citizenId: '000000000000', isEmailVerified: true, address: { province: 'Tỉnh mẫu', district: 'Quận mẫu', town: 'Phường mẫu', street: 'Số 1, đường Mẫu' } };
let current;
const dispatch = jest.fn();
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
beforeEach(() => { jest.clearAllMocks(); current = user; useSelector.mockImplementation((select) => select({ user: { user: current } })); useDispatch.mockReturnValue(dispatch); dispatch.mockReturnValue({ unwrap: () => Promise.resolve() }); });
test('profile reads the existing name/identity/address mapping and omits the unsupported photo upload', () => {
  render(<UserProfile />, { wrapper });
  expect(screen.getByRole('heading', { level: 1, name: 'Thông tin cá nhân' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: user.name })).toBeInTheDocument();
  expect(screen.getByText('CMND/CCCD/Hộ chiếu')).toBeInTheDocument(); expect(screen.getByText(user.citizenId)).toBeInTheDocument();
  expect(screen.getByText(user.address.street)).toBeInTheDocument(); expect(screen.queryByRole('button', { name: 'Tải ảnh mới lên' })).not.toBeInTheDocument();
});
test.each([true, false])('verified-email edit permission remains %s', (verified) => {
  current = { ...user, isEmailVerified: verified }; render(<EditUserProfileModal open handleClose={jest.fn()} />, { wrapper });
  expect(screen.getByLabelText('Email', { exact: true }).disabled).toBe(verified);
});
test('Escape and cancel close without dispatching an update', () => {
  const close = jest.fn(); render(<EditUserProfileModal open handleClose={close} />, { wrapper });
  fireEvent.change(screen.getByLabelText('Họ và tên'), { target: { value: 'Tên chưa lưu' } });
  fireEvent.keyDown(screen.getByRole('dialog', { name: 'Cập nhật hồ sơ', exact: true }), { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: 'Hủy', exact: true }));
  expect(close).toHaveBeenCalledTimes(2); expect(updateUser).not.toHaveBeenCalled(); expect(dispatch).not.toHaveBeenCalled();
});
test('saving keeps the existing Redux action shape and address keys (mock only)', async () => {
  const close = jest.fn(); render(<EditUserProfileModal open handleClose={close} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi', exact: true }));
  expect(updateUser).toHaveBeenCalledWith({ id: user.id, updatedUserInfo: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, citizenId: user.citizenId, address: user.address } });
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1)); expect(toast.success).toHaveBeenCalledWith('Cập nhật thông tin thành công');
});
test('changing province still clears district/town in the form and omits empty keys on save', async () => {
  render(<EditUserProfileModal open handleClose={jest.fn()} />, { wrapper }); fireEvent.click(screen.getByRole('button', { name: 'Đổi tỉnh mẫu' }));
  expect(screen.getByLabelText('Quận mẫu')).toHaveValue(''); expect(screen.getByLabelText('Phường mẫu')).toHaveValue('');
  fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi', exact: true }));
  expect(updateUser.mock.calls[0][0].updatedUserInfo.address).toEqual({ province: 'Tỉnh mới', street: user.address.street });
  await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1));
});
test('existing invalid-name validation prevents an update', () => {
  render(<EditUserProfileModal open handleClose={jest.fn()} />, { wrapper });
  fireEvent.change(screen.getByLabelText('Họ và tên'), { target: { value: '123' } }); fireEvent.click(screen.getByRole('button', { name: 'Lưu thay đổi', exact: true }));
  expect(updateUser).not.toHaveBeenCalled(); expect(toast.error).toHaveBeenCalledWith('Vui lòng nhập Họ tên hợp lệ');
});
