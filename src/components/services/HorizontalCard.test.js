import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import HorizontalCard from './HorizontalCard';
import BoxCard from './BoxCard';

jest.mock('./TransferModal', () => ({ open, document, onClose }) => open ? <div role="dialog" aria-label="Chia sẻ mẫu">{document._id}<button onClick={onClose}>Đóng chia sẻ</button></div> : null);
jest.mock('./PurchaseModal', () => ({ open, document, onClose }) => open ? <div role="dialog" aria-label="Mua mẫu">{document._id}<button onClick={onClose}>Đóng mua</button></div> : null);
jest.mock('./FilePreviewModal', () => ({ metadataUrl, filename, onClose }) => <div role="dialog" aria-label="Xem mẫu">{metadataUrl} {filename}<button onClick={onClose}>Đóng xem</button></div>);
const document = { _id: 'VI-MAU', filename: '1790000000000-Giấy tờ mẫu.PDF', mintAddress: 'MA-BAN-GHI', ipfsLink: 'https://example.com/metadata', mintedAt: '2026-09-25T02:00:00Z', amount: 0 };
const setup = (Component = HorizontalCard) => render(<ThemeProvider theme={createTrustifyTheme()}><Component document={document} /></ThemeProvider>);
test('one responsive card preserves name, amount, date calculation and mint identity', () => {
  setup();
  expect(screen.getByRole('heading', { name: 'Giấy tờ mẫu.PDF' })).toBeInTheDocument();
  expect(screen.getByText('25/09/2026')).toBeInTheDocument(); expect(screen.getByText('25/03/2027')).toBeInTheDocument(); expect(screen.getByText('0')).toBeInTheDocument();
  const toggle = screen.getByRole('button', { name: 'Xem mã bản ghi' }); expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle); expect(screen.getByText('MA-BAN-GHI')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Ẩn mã bản ghi' })); expect(screen.queryByText('MA-BAN-GHI')).not.toBeInTheDocument();
});
test('preview receives the existing metadata URL and original filename', () => {
  setup(); fireEvent.click(screen.getByRole('button', { name: 'Xem tài liệu Giấy tờ mẫu.PDF' }));
  expect(screen.getByRole('dialog', { name: 'Xem mẫu' })).toHaveTextContent(document.ipfsLink);
  expect(screen.getByRole('dialog', { name: 'Xem mẫu' })).toHaveTextContent(document.filename);
  fireEvent.click(screen.getByRole('button', { name: 'Đóng xem' })); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
test.each([['Chia sẻ tài liệu Giấy tờ mẫu.PDF', 'Chia sẻ mẫu', 'Đóng chia sẻ'], ['Mua thêm Giấy tờ mẫu.PDF', 'Mua mẫu', 'Đóng mua']])('existing %s modal receives the original document', (action, name, close) => {
  setup(); fireEvent.click(screen.getByRole('button', { name: action })); expect(screen.getByRole('dialog', { name })).toHaveTextContent('VI-MAU');
  fireEvent.click(screen.getByRole('button', { name: close })); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
test('legacy mobile export reuses the same content and actions', () => {
  setup(BoxCard); expect(screen.getByRole('button', { name: 'Xem tài liệu Giấy tờ mẫu.PDF' })).toBeInTheDocument();
});
