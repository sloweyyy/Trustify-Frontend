import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import DocumentWallet from './DocumentWallet';
import UserWalletService from '../../services/userwallet.service';

jest.mock('../../services/userwallet.service', () => ({ getUserWallet: jest.fn() }));
jest.mock('../../components/services/HorizontalCard', () => ({ document }) => <article>{document._id} {document.filename}</article>);
const setup = () => render(<ThemeProvider theme={createTrustifyTheme()}><DocumentWallet /></ThemeProvider>);
beforeEach(() => jest.clearAllMocks());
test('loading is named, then an empty successful response is explained without inventing a mint job', async () => {
  let resolve; UserWalletService.getUserWallet.mockReturnValue(new Promise((done) => { resolve = done; })); setup();
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải ví tài liệu');
  resolve({ status: 200, data: { nftItems: [] } });
  expect(await screen.findByRole('heading', { name: 'Chưa có bản ghi trong ví tài liệu' })).toBeInTheDocument();
  expect(screen.getByText(/mạng thử nghiệm Solana devnet/)).toBeInTheDocument();
});
test('a failed read exits loading and retry uses the same GET without dropping zero-amount rows', async () => {
  UserWalletService.getUserWallet.mockRejectedValueOnce(new Error('fixture')).mockResolvedValueOnce({ status: 200, data: { nftItems: [{ _id: 'VI-0', filename: 'Mẫu số không.pdf', amount: 0 }, { _id: 'VI-2', filename: 'Mẫu hai.pdf', amount: 2 }] } }); setup();
  expect(await screen.findByText('Chưa thể tải ví tài liệu')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  expect(await screen.findByText('2 tài liệu trong ví')).toBeInTheDocument();
  expect(UserWalletService.getUserWallet).toHaveBeenCalledTimes(2); expect(screen.getByText(/VI-0/)).toBeInTheDocument();
});
test('an unsuccessful response status is an error rather than an empty wallet', async () => {
  UserWalletService.getUserWallet.mockResolvedValue({ status: 400 }); setup();
  expect(await screen.findByText('Chưa thể tải ví tài liệu')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Chưa có bản ghi trong ví tài liệu' })).not.toBeInTheDocument();
});
