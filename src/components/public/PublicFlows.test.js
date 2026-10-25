import React, { act } from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import Services from '../../pages/services/Services';
import Lookup from '../../pages/services/LookupNotarizationProfile';
import Verify from '../../pages/services/VerifyNotarizationProfile';
import ForgotPasswordModal from '../../pages/signin/ForgotPasswordModal';
import ForgotPassword from '../../pages/signin/ForgotPassword';
import ResetPassword from '../../pages/signin/ResetPassword';
import NotarizationService from '../../services/notarization.service';
import NFTService from '../../services/nft.service';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
jest.mock('../../services/notarization.service', () => ({ getAllNotarizationService: jest.fn(), getStatusById: jest.fn() }));
jest.mock('../../services/nft.service', () => ({ getNFTMetadata: jest.fn() }));
jest.mock('../../services/auth.service', () => ({ forgotPassword: jest.fn(), resetPassword: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { error: jest.fn(), success: jest.fn() } }));
jest.mock('js-cookie', () => ({ get: jest.fn(() => 'token-fixture') }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
beforeEach(() => { Cookies.get.mockReturnValue('token-fixture'); });
afterEach(() => { jest.clearAllTimers(); jest.useRealTimers(); });
test('service list keeps original read, nine-item reveal and local search', async () => {
  NotarizationService.getAllNotarizationService.mockResolvedValue(Array.from({ length: 11 }, (_, i) => ({ name: `Dịch vụ ${i}`, description: 'Mô tả mẫu' })));
  render(<Services />, { wrapper }); await screen.findByText('Dịch vụ 0'); expect(screen.getAllByRole('article')).toHaveLength(9);
  fireEvent.click(screen.getByRole('button', { name: 'Xem thêm dịch vụ' })); expect(screen.getAllByRole('article')).toHaveLength(11);
  fireEvent.change(screen.getByRole('combobox', { name: 'Tìm dịch vụ công chứng' }), { target: { value: 'Dịch vụ 10' } }); expect(screen.getAllByRole('article')).toHaveLength(1);
  expect(NotarizationService.getAllNotarizationService).toHaveBeenCalledTimes(1); expect(NotarizationService.getAllNotarizationService).toHaveBeenCalledWith();
});
test.each([[200, 'Đã tìm thấy thông tin hồ sơ'], [404, 'Không tìm thấy hồ sơ'], [500, 'Chưa thể tra cứu hồ sơ']])('lookup response%s retains the same ID request and truthful result', async (code, result) => {
  jest.useFakeTimers(); NotarizationService.getStatusById.mockResolvedValue({ status: code, data: { documentId: 'HS-MAU', _id: 'TRACKING-MAU', status: 'rejected', feedback: 'Ghi chú mẫu' } });
  render(<Lookup />, { wrapper }); fireEvent.change(screen.getByLabelText('Mã hồ sơ công chứng'), { target: { value: 'HS-MAU' } }); fireEvent.click(screen.getByRole('button', { name: 'Tra cứu', exact: true }));
  await act(async () => { jest.advanceTimersByTime(1000); }); expect(screen.getByText(result)).toBeInTheDocument(); expect(NotarizationService.getStatusById).toHaveBeenCalledWith('HS-MAU');
});
test('lookup detail uses actual document ID and rejected status without showing a completed lifecycle', async () => {
  jest.useFakeTimers(); NotarizationService.getStatusById.mockResolvedValue({ status: 200, data: { documentId: 'HS-MAU', _id: 'TRACKING-MAU', status: 'rejected' } });
  render(<Lookup />, { wrapper }); fireEvent.change(screen.getByLabelText('Mã hồ sơ công chứng'), { target: { value: 'HS-MAU' } }); fireEvent.click(screen.getByRole('button', { name: 'Tra cứu', exact: true })); await act(async () => { jest.advanceTimersByTime(1000); });
  fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết' })); const dialog = screen.getByRole('dialog', { name: 'Chi tiết trạng thái hồ sơ' }); expect(within(dialog).getByText('Mã hồ sơ: HS-MAU')).toBeInTheDocument(); expect(within(dialog).queryByText('Hoàn tất')).not.toBeInTheDocument();
});
test('verification keeps the mint argument and exact metadata links without claiming legal validation', async () => {
  NFTService.getNFTMetadata.mockResolvedValue({ mintAddress: 'MINT-MAU', offChainMetadata: { name: 'mau.pdf' }, viewLinks: { explorerLink: 'https://example.com/proof' } });
  render(<Verify />, { wrapper }); fireEvent.change(screen.getByLabelText('Mã bản ghi tài liệu (địa chỉ mint NFT)'), { target: { value: 'MINT-MAU' } }); fireEvent.click(screen.getByRole('button', { name: 'Xác minh', exact: true })); await screen.findByText('Đã tìm thấy bản ghi tài liệu');
  expect(NFTService.getNFTMetadata).toHaveBeenCalledWith('MINT-MAU'); expect(screen.getByRole('link', { name: /Xem trên Solana Explorer/ })).toHaveAttribute('href', 'https://example.com/proof'); expect(screen.queryByText('Đã xác thực')).not.toBeInTheDocument();
});
test('forgot-password dialog calls the actual existing service and accepts its empty204 body', async () => {
  const handleClose = jest.fn(); AuthService.forgotPassword.mockResolvedValue(undefined); render(<ForgotPasswordModal open handleClose={handleClose} />, { wrapper });
  fireEvent.change(screen.getByLabelText('Địa chỉ email'), { target: { value: 'qa@example.com' } }); fireEvent.click(screen.getByRole('button', { name: 'Gửi liên kết' })); await waitFor(() => expect(handleClose).toHaveBeenCalledTimes(1)); expect(AuthService.forgotPassword).toHaveBeenCalledWith('qa@example.com');
});
test('standalone forgot-password failure unlocks retry and does not assert the account is absent', async () => {
  AuthService.forgotPassword.mockRejectedValue(new Error('fixture')); render(<ForgotPassword />, { wrapper }); fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'qa@example.com' } }); const submit = screen.getByRole('button', { name: 'Gửi liên kết đặt lại mật khẩu' }); fireEvent.click(submit); await waitFor(() => expect(submit).toBeEnabled()); expect(toast.error).toHaveBeenCalledWith('Chưa gửi được liên kết. Bạn kiểm tra email và kết nối rồi thử lại.');
});
test('reset-password keeps cookie token and original password argument', async () => {
  jest.useFakeTimers(); AuthService.resetPassword.mockResolvedValue(undefined); render(<ResetPassword />, { wrapper }); fireEvent.change(screen.getByLabelText('Mật khẩu mới'), { target: { value: 'abc12345' } }); fireEvent.change(screen.getByLabelText('Xác nhận mật khẩu'), { target: { value: 'abc12345' } }); fireEvent.click(screen.getByRole('button', { name: 'Đặt lại mật khẩu', exact: true })); await waitFor(() => expect(AuthService.resetPassword).toHaveBeenCalledWith('token-fixture', 'abc12345'));
});
