import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotarizedHistory from './NotarizedHistory';
import SessionManagement from './SessionManagement';
import NotarizationService from '../../services/notarization.service';
import SessionService from '../../services/session.service';
jest.mock('../../services/notarization.service', () => ({ getApproveHistory: jest.fn() }));
jest.mock('../../services/session.service', () => ({ getSessionsByStatus: jest.fn() }));
jest.mock('../../components/notary/HistoryCard', () => ({ document }) => <div data-testid="history-record">{document.documentId.requesterInfo.fullName}</div>);
jest.mock('../../components/notary/NotarySessionCard', () => ({ session }) => <div>{session.sessionId.sessionName}</div>);
const row = (name, status, date) => ({ status, documentId: { requesterInfo: { fullName: name }, notarizationField: { name: 'Sao y' }, createdAt: date } });
test('history preserves GET, duplicate events, initial ascending order, name/status filters and sort toggle', async () => {
  NotarizationService.getApproveHistory.mockResolvedValue([row('An', 'completed', '2026-10-25'), row('Bình', 'rejected', '2026-10-20'), row('An', 'completed', '2026-10-25')]);
  render(<NotarizedHistory />); await screen.findByText('Bình');
  expect(screen.getAllByTestId('history-record').map((e) => e.textContent)).toEqual(['Bình', 'An', 'An']);
  fireEvent.click(screen.getByRole('button', { name: 'Đổi sang mới nhất trước' }));
  expect(screen.getAllByTestId('history-record').map((e) => e.textContent)).toEqual(['An', 'An', 'Bình']);
  fireEvent.change(screen.getByLabelText('Tìm theo tên người yêu cầu'), { target: { value: 'an' } }); expect(screen.getAllByTestId('history-record')).toHaveLength(2);
  fireEvent.change(screen.getByLabelText('Tìm theo tên người yêu cầu'), { target: { value: '' } });
  fireEvent.mouseDown(screen.getByLabelText('Trạng thái')); fireEvent.click(screen.getByRole('option', { name: 'Bị từ chối' }));
  expect(screen.getAllByTestId('history-record').map((e) => e.textContent)).toEqual(['Bình']);
  expect(NotarizationService.getApproveHistory).toHaveBeenCalledTimes(1); expect(NotarizationService.getApproveHistory).toHaveBeenCalledWith();
});
test('history retries an error envelope through the same GET and shows a truthful empty state', async () => {
  NotarizationService.getApproveHistory.mockResolvedValueOnce({ status: 503 }).mockResolvedValueOnce([]);
  render(<NotarizedHistory />); await screen.findByText('Chưa thể tải lịch sử'); fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  expect(await screen.findByText('Chưa có lịch sử công chứng')).toBeInTheDocument(); expect(NotarizationService.getApproveHistory).toHaveBeenCalledTimes(2);
});
test('session search filters only this page without changing original status/page/limit requests', async () => {
  SessionService.getSessionsByStatus.mockResolvedValue({ status: 200, data: { sessions: [{ sessionId: { sessionName: 'Phiên An' } }, { sessionId: { sessionName: 'Phiên Bình' } }], pagination: { totalPages: 2 } } });
  render(<SessionManagement />); await screen.findByText('Phiên An');
  expect(SessionService.getSessionsByStatus).toHaveBeenLastCalledWith({ status: 'processing', page: 1, limit: 6 });
  fireEvent.change(screen.getByLabelText('Tìm phiên trong trang hiện tại'), { target: { value: 'không có' } }); expect(screen.getByText('Không tìm thấy phiên trong trang này')).toBeInTheDocument(); expect(SessionService.getSessionsByStatus).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Trang 2' })); await waitFor(() => expect(SessionService.getSessionsByStatus).toHaveBeenLastCalledWith({ status: 'processing', page: 2, limit: 6 }));
  fireEvent.mouseDown(screen.getByLabelText('Trạng thái phiên')); fireEvent.click(screen.getByRole('option', { name: 'Chờ ký số' })); await waitFor(() => expect(SessionService.getSessionsByStatus).toHaveBeenLastCalledWith({ status: 'readyToSign', page: 2, limit: 6 }));
  await screen.findByText('Không tìm thấy phiên trong trang này');
});
