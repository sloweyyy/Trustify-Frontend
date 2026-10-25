import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import FileUploadSection from './FileUploadSection';
import { VALID_FORMATS } from '../../../utils/constants';

jest.mock('../../../components/services/UserWalletModal', () => (props) => <div role="dialog" aria-label="Ví tài liệu"><button onClick={() => props.handleDocumentWalletFileChange('selected-wallet-document')}>Chọn mẫu</button><button onClick={props.onClose}>Đóng ví</button></div>);
jest.mock('../../../components/services/FilePreviewModal', () => (props) => <div role="dialog" aria-label="Xem tài liệu">{props.metadataUrl} · {props.filename}<button onClick={props.onClose}>Đóng xem trước</button></div>);
const current = { file: new File(['demo'], 'local.pdf', { type: 'application/pdf' }), type: 'identity_doc' };
const uploaded = { file: { name: 'existing.png', url: 'https://example.com/existing.png' }, type: 'identity_doc' };
const wallet = { document: { _id: 'demo', filename: 'wallet.pdf', ipfsLink: 'ipfs://demo' }, type: 'identity_doc' };
const setup = (props) => render(<ThemeProvider theme={createTrustifyTheme()}><FileUploadSection title="Giấy tờ tuỳ thân" {...props} /></ThemeProvider>);

test('file input keeps native event/files and uses the existing format allowlist', () => {
  const change = jest.fn((event) => expect(event.target.files[0]).toBe(current.file));
  setup({ handleCurrentFileChange: change });
  const input = screen.getByText('Chưa chọn tài liệu.');
  expect(input).toBeInTheDocument();
  const chooser = screen.getByLabelText('Tệp cho Giấy tờ tuỳ thân');
  expect(chooser).toHaveAttribute('accept', VALID_FORMATS.join(','));
  expect(chooser).toHaveAttribute('multiple');
  fireEvent.change(chooser, { target: { files: [current.file] } });
  expect(change).toHaveBeenCalledTimes(1);
});

test('each remove callback receives its original wrapper object', () => {
  const removeCurrent = jest.fn(), removeUploaded = jest.fn(), removeWallet = jest.fn();
  setup({ currentFiles: [current], uploadedFiles: [uploaded], documentWalletFiles: [wallet], handleRemoveCurrentFile: removeCurrent, handleRemoveUploadedFile: removeUploaded, handleRemoveDocumentWalletFile: removeWallet });
  expect(screen.getByText('3 tài liệu đã chọn')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Bỏ tài liệu local.pdf' }));
  fireEvent.click(screen.getByRole('button', { name: 'Bỏ tài liệu existing.png' }));
  fireEvent.click(screen.getByRole('button', { name: 'Bỏ tài liệu wallet.pdf' }));
  expect(removeCurrent).toHaveBeenCalledWith(current);
  expect(removeUploaded).toHaveBeenCalledWith(uploaded);
  expect(removeWallet).toHaveBeenCalledWith(wallet);
});

test('confirmed files stay readable/openable without choose or remove actions', () => {
  setup({ currentFiles: [current], confirmed: true });
  expect(screen.getByRole('button', { name: 'Mở tài liệu local.pdf' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Bỏ tài liệu|Chọn tài liệu/ })).not.toBeInTheDocument();
});

test('device URL opening and wallet metadata preview retain their sources', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  setup({ uploadedFiles: [uploaded], documentWalletFiles: [wallet] });
  fireEvent.click(screen.getByRole('button', { name: 'Mở tài liệu existing.png' }));
  expect(open).toHaveBeenCalledWith(uploaded.file.url, '_blank', 'noopener,noreferrer');
  fireEvent.click(screen.getByRole('button', { name: 'Mở tài liệu wallet.pdf' }));
  expect(screen.getByRole('dialog', { name: 'Xem tài liệu' })).toHaveTextContent('ipfs://demo · wallet.pdf');
  open.mockRestore();
});

test('wallet selection callback is forwarded unchanged', () => {
  const select = jest.fn(); setup({ handleDocumentWalletFileChange: select });
  fireEvent.click(screen.getByRole('button', { name: /Chọn tài liệu/ }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Chọn từ ví tài liệu' }));
  fireEvent.click(screen.getByRole('button', { name: 'Chọn mẫu' }));
  expect(select).toHaveBeenCalledWith('selected-wallet-document');
});
