import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProcessingDocuments from './ProcessingNotarizationDocuments';
import AwaitingSignature from './AwaitingSignatureDocuments';
import NotarizationService from '../../services/notarization.service';
jest.mock('../../services/notarization.service', () => ({ getNotarizationByRole: jest.fn() }));
jest.mock('../../components/notary/NotaryDocumentCard', () => () => <div>Hồ sơ kiểm tra</div>);

for (const [Component, status, label] of [[ProcessingDocuments, 'processing', 'phê duyệt'], [AwaitingSignature, 'readyToSign', 'ký số']]) {
  test(`${status}: service error envelope can retry the identical read request, then show empty`, async () => {
    NotarizationService.getNotarizationByRole.mockResolvedValueOnce({ status: 503, message: 'offline' }).mockResolvedValueOnce({ documents: [], pagination: { totalPages: 0 } });
    render(<Component />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Chưa thể tải hồ sơ');
    expect(NotarizationService.getNotarizationByRole).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
    expect(await screen.findByRole('heading', { name: `Chưa có hồ sơ chờ ${label}` })).toBeInTheDocument();
    expect(NotarizationService.getNotarizationByRole).toHaveBeenNthCalledWith(1, { status, page: 1, limit: 6 });
    expect(NotarizationService.getNotarizationByRole).toHaveBeenNthCalledWith(2, { status, page: 1, limit: 6 });
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
  test(`${status}: unexpected rejection also leaves loading and displays error`, async () => {
    NotarizationService.getNotarizationByRole.mockRejectedValue(new Error('offline'));
    render(<Component />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Chưa thể tải hồ sơ');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  test(`${status}: populated response keeps document rendering and pagination`, async () => {
    NotarizationService.getNotarizationByRole.mockResolvedValue({ documents: [{ id: 'test' }], pagination: { totalPages: 2 } });
    render(<Component />);
    expect(await screen.findByText('Hồ sơ kiểm tra')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Trang 2' }));
    await waitFor(() => expect(NotarizationService.getNotarizationByRole).toHaveBeenLastCalledWith({ status, page: 2, limit: 6 }));
  });
}
