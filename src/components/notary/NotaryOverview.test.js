import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import NotaryAnalyticsSession from './NotaryAnalyticsSession';
import NotaryAnalyticsCard from './NotaryAnalyticsCard';
import RecentlyDocuments from './RecentlyDocuments';
import NotaryDocumentCard from './NotaryDocumentCard';
import DetailDocumentModal from './DetailDocumentModal';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import notaryService from '../../services/notary.service';
import NotarizationService from '../../services/notarization.service';

jest.mock('../../services/notary.service', () => ({ getProcessingMetrics: jest.fn(), getDigitalSignatureMetrics: jest.fn(), getNotaryApprovals: jest.fn(), getAcceptanceRate: jest.fn() }));
jest.mock('../../services/notarization.service', () => ({ getApproveHistory: jest.fn() }));
jest.mock('./DetailDocumentModal', () => jest.fn(({ open, onClose }) => open ? <div role="dialog" aria-label="Hồ sơ xử lý mẫu"><button onClick={onClose}>Đóng mẫu</button></div> : null));
jest.mock('./DetailHistoryDocumentModal', () => jest.fn(({ open, onClose }) => open ? <div role="dialog" aria-label="Hồ sơ lịch sử mẫu"><button onClick={onClose}>Đóng mẫu</button></div> : null));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const row = (i, status = 'completed') => ({ id: `DUYET-${i}`, status, signatureImage: 'fixture-signature', documentId: { id: `HS-${i}`, createdAt: '2026-10-25T02:00:00Z', requesterInfo: { fullName: `Người ${i}` }, notarizationField: { name: 'Sao y' }, notarizationService: { name: 'Chứng thực bản sao' } } });
beforeEach(() => {
  jest.clearAllMocks();
  DetailDocumentModal.mockImplementation(({ open, onClose }) => open ? <div role="dialog" aria-label="Hồ sơ xử lý mẫu"><button onClick={onClose}>Đóng mẫu</button></div> : null);
  DetailHistoryDocumentModal.mockImplementation(({ open, onClose }) => open ? <div role="dialog" aria-label="Hồ sơ lịch sử mẫu"><button onClick={onClose}>Đóng mẫu</button></div> : null);
  notaryService.getProcessingMetrics.mockResolvedValue({ total: 1250, growthPercent: -5 });
  notaryService.getDigitalSignatureMetrics.mockResolvedValue({ total: 3, change: 2 });
  notaryService.getNotaryApprovals.mockResolvedValue({ total: 24, growthPercent: 10 });
  notaryService.getAcceptanceRate.mockResolvedValue({ acceptanceRate: 85, growthPercent: 3 });
});
test('metrics retry repeats the same four reads and preserves counts/comparison units', async () => {
  notaryService.getProcessingMetrics.mockRejectedValueOnce(new Error('internal English fixture'));
  render(<NotaryAnalyticsSession />, { wrapper }); expect(await screen.findByText('Chưa thể tải số liệu')).toBeInTheDocument();
  expect(screen.queryByText('internal English fixture')).not.toBeInTheDocument(); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  expect(await screen.findByText('1.250')).toBeInTheDocument(); expect(screen.getByText('+2 so với hôm qua')).toBeInTheDocument(); expect(screen.getByText('-5% so với tháng trước')).toBeInTheDocument();
  for (const method of Object.values(notaryService)) { expect(method).toHaveBeenCalledTimes(2); expect(method).toHaveBeenLastCalledWith(); }
});
test('missing growth is unknown rather than a fabricated zero comparison', () => {
  render(<NotaryAnalyticsCard title="Mẫu" value="12" />, { wrapper }); expect(screen.getByText('Chưa có dữ liệu so sánh')).toBeInTheDocument();
});
test('recent history keeps the first five records in response order and opens the same record', async () => {
  const records = Array.from({ length: 6 }, (_, i) => row(i)); NotarizationService.getApproveHistory.mockResolvedValue(records);
  render(<RecentlyDocuments />, { wrapper }); const first = await screen.findByRole('button', { name: /Xem hồ sơ của Người 0/ });
  expect(screen.getAllByRole('button', { name: /Xem hồ sơ của Người/ })).toHaveLength(5); expect(screen.queryByText('Người 5')).not.toBeInTheDocument();
  fireEvent.click(first); expect(DetailHistoryDocumentModal.mock.calls.filter(([props]) => props.open)[0][0].document).toBe(records[0]);
  expect(screen.getByRole('link', { name: 'Xem lịch sử' })).toHaveAttribute('href', '/notary/notarization-history');
});
test('recent-history error envelope retries the original GET then explains empty data', async () => {
  NotarizationService.getApproveHistory.mockResolvedValueOnce({ status: 503 }).mockResolvedValueOnce([]);
  render(<RecentlyDocuments />, { wrapper }); expect(await screen.findByText('Chưa thể tải hồ sơ gần đây')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); expect(await screen.findByRole('heading', { name: 'Chưa có hồ sơ gần đây' })).toBeInTheDocument();
  expect(NotarizationService.getApproveHistory).toHaveBeenCalledTimes(2); expect(NotarizationService.getApproveHistory).toHaveBeenLastCalledWith();
});
test.each(['processing', 'readyToSign', 'completed'])('queue card %s retains modal selection and exact document prop', async (status) => {
  const record = row(0, status); render(<NotaryDocumentCard document={record} />, { wrapper }); fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết hồ sơ HS-0' }));
  const component = status === 'processing' ? DetailDocumentModal : DetailHistoryDocumentModal;
  expect(component.mock.calls.filter(([props]) => props.open)[0][0].document).toBe(record);
  fireEvent.click(screen.getByRole('button', { name: 'Đóng mẫu' })); await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});
