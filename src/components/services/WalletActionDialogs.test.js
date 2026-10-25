import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import PurchaseModal from './PurchaseModal';
import TransferModal from './TransferModal';
import UserWalletService from '../../services/userwallet.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';

jest.mock('../../services/userwallet.service', () => ({ purchaseNft: jest.fn(), transferNft: jest.fn() }));
jest.mock('../../services/user.service', () => ({ searchUserByEmail: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
const document = { _id: 'VI-MAU', mintAddress: 'MINT-MAU', filename: '1790000000000-Tài liệu mẫu.pdf', amount: 5 };
const setup = (Component) => {
  const close = jest.fn();
  render(<ThemeProvider theme={createTrustifyTheme()}><Component open document={document} onClose={close} /></ThemeProvider>);
  return close;
};
beforeEach(() => jest.clearAllMocks());
afterEach(() => jest.useRealTimers());
test.each([[PurchaseModal, 'Mua thêm tài liệu', 'Đóng mua thêm tài liệu'], [TransferModal, 'Chia sẻ tài liệu', 'Đóng chia sẻ tài liệu']])('%s has a named dialog; close/Escape never submits', (Component, name, closeLabel) => {
  const close = setup(Component);
  fireEvent.keyDown(screen.getByRole('dialog', { name, exact: true }), { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: closeLabel }));
  expect(close).toHaveBeenCalledTimes(2); expect(UserWalletService.purchaseNft).not.toHaveBeenCalled(); expect(UserWalletService.transferNft).not.toHaveBeenCalled();
});
test('purchase keeps the item ID/quantity contract and prevents a duplicate click while pending', async () => {
  let resolve; UserWalletService.purchaseNft.mockReturnValue(new Promise((done) => { resolve = done; })); const close = setup(PurchaseModal);
  fireEvent.change(screen.getByLabelText('Số lượng mua thêm'), { target: { value: '3' } });
  fireEvent.click(screen.getByRole('button', { name: 'Mua tài liệu', exact: true }));
  expect(UserWalletService.purchaseNft).toHaveBeenCalledWith('VI-MAU', '3');
  const pending = screen.getByRole('button', { name: 'Đang xử lý...' }); expect(pending).toBeDisabled(); expect(pending).toHaveAttribute('aria-busy', 'true');
  fireEvent.click(pending); expect(UserWalletService.purchaseNft).toHaveBeenCalledTimes(1);
  resolve({ status: 200 }); await waitFor(() => expect(close).toHaveBeenCalledTimes(1)); expect(toast.success).toHaveBeenCalledWith('Mua tài liệu thành công');
});
test('purchase retains the existing unsuccessful-response message/close behavior', async () => {
  UserWalletService.purchaseNft.mockResolvedValue({ status: 400 }); const close = setup(PurchaseModal);
  fireEvent.click(screen.getByRole('button', { name: 'Mua tài liệu', exact: true }));
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1)); expect(toast.error).toHaveBeenCalledWith('Mua tài liệu thất bại');
});
test('sharing requires the existing email choice and retains mint/email/quantity payload', async () => {
  jest.useFakeTimers(); UserService.searchUserByEmail.mockResolvedValue([{ id: 'recipient', email: 'nguoinhan@example.com' }]);
  let resolve; UserWalletService.transferNft.mockReturnValue(new Promise((done) => { resolve = done; })); const close = setup(TransferModal);
  expect(screen.getByRole('button', { name: 'Chia sẻ', exact: true })).toBeDisabled();
  fireEvent.change(screen.getByRole('combobox', { name: 'Email người nhận', exact: true }), { target: { value: 'nguoinhan@example.com' } });
  await act(async () => { jest.advanceTimersByTime(1500); });
  fireEvent.click(screen.getByRole('option', { name: 'nguoinhan@example.com' }));
  fireEvent.change(screen.getByLabelText('Số lượng chia sẻ'), { target: { value: '2' } });
  fireEvent.click(screen.getByRole('button', { name: 'Chia sẻ', exact: true }));
  expect(UserWalletService.transferNft).toHaveBeenCalledWith('MINT-MAU', 'nguoinhan@example.com', '2');
  expect(screen.getByRole('button', { name: 'Đang chia sẻ…' })).toBeDisabled();
  resolve({ status: 200 }); await waitFor(() => expect(close).toHaveBeenCalledTimes(1)); expect(toast.success).toHaveBeenCalledWith('Chuyển tài liệu thành công.');
});
test('invalid sharing email uses the existing validation without any transfer', () => {
  jest.useFakeTimers(); setup(TransferModal);
  fireEvent.change(screen.getByRole('combobox', { name: 'Email người nhận', exact: true }), { target: { value: 'email-khong-hop-le' } });
  fireEvent.click(screen.getByRole('button', { name: 'Chia sẻ', exact: true }));
  expect(UserWalletService.transferNft).not.toHaveBeenCalled(); expect(toast.error).toHaveBeenCalledWith('Địa chỉ email không hợp lệ.');
});
