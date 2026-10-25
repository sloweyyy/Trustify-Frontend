import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import UserWalletModal from './UserWalletModal';
import FilePreviewModal from './FilePreviewModal';
import UserWalletService from '../../services/userwallet.service';
import IPFSService from '../../services/ipfs.service';

jest.mock('../../services/userwallet.service', () => ({ getUserWallet: jest.fn() }));
jest.mock('../../services/ipfs.service', () => ({ getFileUrlFromMetadata: jest.fn() }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const document = { _id: 'one', filename: '123-Hồ sơ ắ ầ ẩ ữ ợ ỹ.png', amount: 2, mintedAt: '2026-10-24T01:00:00Z', mintAddress: 'mint-one', ipfsLink: 'https://example.com/metadata.json' };
beforeEach(() => jest.resetAllMocks());

test('wallet keeps positive-amount filter/order and forwards the original selected object once', async () => {
  const larger = { ...document, _id: 'two', filename: 'large.pdf', amount: 4 };
  UserWalletService.getUserWallet.mockResolvedValue({ status: 200, data: { nftItems: [document, { ...document, amount: 0 }, larger] } });
  const select = jest.fn(), close = jest.fn();
  render(<UserWalletModal open onClose={close} handleDocumentWalletFileChange={select} />, { wrapper });
  await screen.findByText('Hồ sơ ắ ầ ẩ ữ ợ ỹ.png');
  const rows = screen.getAllByRole('listitem'); expect(rows).toHaveLength(2); expect(rows[0]).toHaveTextContent('large.pdf');
  fireEvent.click(within(rows[1]).getByRole('button', { name: /^Chọn tài liệu/ }));
  expect(select).toHaveBeenCalledTimes(1); expect(select).toHaveBeenCalledWith(document); expect(close).toHaveBeenCalledTimes(1);
});

test('wallet preview loads the same metadata without selecting; close does not select', async () => {
  UserWalletService.getUserWallet.mockResolvedValue({ status: 200, data: { nftItems: [document] } });
  IPFSService.getFileUrlFromMetadata.mockResolvedValue('https://example.com/file.png');
  const select = jest.fn(), close = jest.fn();
  render(<UserWalletModal open onClose={close} handleDocumentWalletFileChange={select} />, { wrapper });
  fireEvent.click(await screen.findByRole('button', { name: /^Xem trước/ }));
  await screen.findByRole('img', { name: document.filename });
  expect(screen.getByRole('dialog', { name: 'Xem tài liệu', exact: true })).toBeVisible();
  expect(IPFSService.getFileUrlFromMetadata).toHaveBeenCalledWith(document.ipfsLink); expect(select).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Đóng xem tài liệu' }));
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Xem tài liệu' })).not.toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Đóng ví tài liệu' })); expect(close).toHaveBeenCalledTimes(1); expect(select).not.toHaveBeenCalled();
});

test('wallet failure stops loading, retries the same GET and shows a truthful empty state', async () => {
  UserWalletService.getUserWallet.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ status: 200, data: { nftItems: [] } });
  render(<UserWalletModal open onClose={jest.fn()} />, { wrapper });
  await screen.findByText('Chưa thể tải ví tài liệu'); expect(screen.queryByText('Đang tải ví tài liệu…')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByText('Chưa có tài liệu để chọn');
  expect(UserWalletService.getUserWallet).toHaveBeenCalledTimes(2);
});

test('preview failure can retry; unsupported files retain the actual source link', async () => {
  IPFSService.getFileUrlFromMetadata.mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce('https://example.com/file.docx');
  render(<FilePreviewModal open onClose={jest.fn()} metadataUrl={document.ipfsLink} filename="Tài liệu.docx" />, { wrapper });
  await screen.findByText('Chưa thể mở tài liệu'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  await screen.findByText('Không xem trước được định dạng này. Mở tệp để xem.');
  expect(screen.getByRole('link', { name: 'Mở tài liệu trong tab mới' })).toHaveAttribute('href', 'https://example.com/file.docx');
  expect(IPFSService.getFileUrlFromMetadata.mock.calls).toEqual([[document.ipfsLink], [document.ipfsLink]]);
});

test('changing metadata ignores an old asynchronous response', async () => {
  let finishOld;
  IPFSService.getFileUrlFromMetadata.mockImplementationOnce(() => new Promise((resolve) => { finishOld = resolve; })).mockResolvedValueOnce('https://example.com/new.png');
  const view = render(<FilePreviewModal open onClose={jest.fn()} metadataUrl="old" filename="Old.png" />, { wrapper });
  view.rerender(<FilePreviewModal open onClose={jest.fn()} metadataUrl="new" filename="New.png" />);
  expect(await screen.findByRole('img', { name: 'New.png' })).toHaveAttribute('src', 'https://example.com/new.png');
  finishOld('https://example.com/old.png');
  await waitFor(() => expect(screen.getByRole('img', { name: 'New.png' })).toHaveAttribute('src', 'https://example.com/new.png'));
});

test('missing metadata yields a recoverable message; Escape uses only onClose', async () => {
  const close = jest.fn(); render(<FilePreviewModal open onClose={close} filename="Missing.pdf" />, { wrapper });
  await screen.findByText('Chưa thể mở tài liệu'); expect(IPFSService.getFileUrlFromMetadata).not.toHaveBeenCalled();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' }); expect(close).toHaveBeenCalledTimes(1);
});

test('PDF metadata retains the viewer source and image failure offers retry', async () => {
  IPFSService.getFileUrlFromMetadata.mockResolvedValue('https://example.com/document.pdf');
  const view = render(<FilePreviewModal open onClose={jest.fn()} metadataUrl="pdf-metadata" filename="Hồ sơ.PDF" />, { wrapper });
  await screen.findByTitle('Tài liệu PDF: Hồ sơ.PDF');
  expect(screen.getByTitle('Tài liệu PDF: Hồ sơ.PDF')).toHaveAttribute('src', 'https://example.com/document.pdf#toolbar=1&navpanes=1');
  view.rerender(<FilePreviewModal open onClose={jest.fn()} metadataUrl="image-metadata" filename="Hồ sơ.png" />);
  fireEvent.error(await screen.findByRole('img', { name: 'Hồ sơ.png' }));
  await screen.findByText('Chưa thể mở tài liệu'); expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Thử lại' })).toBeEnabled();
});
