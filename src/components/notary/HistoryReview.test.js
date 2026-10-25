import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
jest.mock('../../services/notarization.service', () => ({ approveSignatureByNotary: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const row = (status) => ({ status, signatureImage: 'https://example.com/signature.png', documentId: { id: 'HS-MAU', requesterInfo: { fullName: 'Nguyễn Thị Mỹ' }, files: [], output: [] } });
test.each([['readyToSign', false, 'Chờ ký số'], ['digitalSignature', false, 'Chờ ký số'], ['processing', false, 'Đang xử lý'], ['completed', true, 'Hoàn tất'], ['rejected', true, 'Bị từ chối']])('%s keeps the legacy decision eligibility and shows canonical label', (status, disabled, label) => {
  render(<DetailHistoryDocumentModal open document={row(status)} onClose={jest.fn()} />, { wrapper });
  expect(screen.getByRole('dialog', { name: 'Chi tiết hồ sơ công chứng', exact: true })).toBeInTheDocument();
  expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Chấp nhận', exact: true }).disabled).toBe(disabled);
  expect(Boolean(screen.queryByAltText('Chữ ký xác nhận của người yêu cầu'))).toBe(status === 'readyToSign');
});
test.each([200, 202, 'reject'])('signature approval response %s keeps the original ID, success rule and failure feedback', async (result) => {
  const onClose = jest.fn();
  if (result === 'reject') NotarizationService.approveSignatureByNotary.mockRejectedValue(new Error('fixture'));
  else NotarizationService.approveSignatureByNotary.mockResolvedValue({ status: result });
  render(<DetailHistoryDocumentModal open document={row('readyToSign')} onClose={onClose} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Chấp nhận', exact: true }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Chấp nhận', exact: true })).toBeEnabled());
  expect(NotarizationService.approveSignatureByNotary).toHaveBeenCalledWith('HS-MAU');
  expect(onClose).toHaveBeenCalledTimes(result === 200 ? 1 : 0);
  expect(toast.error.mock.calls).toEqual(result === 'reject' ? [['Có lỗi xảy ra, vui lòng thử lại sau']] : []);
});
