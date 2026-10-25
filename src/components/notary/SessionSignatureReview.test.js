import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import DetailReadyToSignSessionModal from './DetailReadyToSignSessionModal';
import SessionService from '../../services/session.service';
import { toast } from 'react-toastify';
jest.mock('../../services/session.service', () => ({ approveSignatureSessionByNotary: jest.fn() }));
jest.mock('react-toastify', () => ({ toast: { success: jest.fn(), error: jest.fn() } }));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const row = (status) => ({ status, approvalStatus: { creator: { signatureImage: 'https://example.com/creator.png' }, users: [{ email: 'qa@example.com', signatureImage: 'https://example.com/user.png' }] }, sessionId: { id: 'PHIEN-MAU', createdBy: { name: 'Nguyễn Thị Mỹ' }, files: [], output: [] } });
test.each([['readyToSign', false, 'Chờ ký số'], ['digitalSignature', false, 'Chờ ký số'], ['processing', false, 'Đang xử lý'], ['completed', true, 'Hoàn tất'], ['rejected', true, 'Bị từ chối']])('%s keeps the legacy decision eligibility and shows canonical label', (status, disabled, label) => {
  render(<DetailReadyToSignSessionModal open session={row(status)} onClose={jest.fn()} />, { wrapper });
  expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Chấp nhận', exact: true }).disabled).toBe(disabled);
  expect(Boolean(screen.queryByAltText('Chữ ký người tạo phiên'))).toBe(status === 'readyToSign');
  expect(Boolean(screen.queryByAltText('Chữ ký người tham gia 1'))).toBe(status === 'readyToSign');
});
test.each([200, 202, 'reject'])('signature approval response %s keeps the original ID, success rule and failure feedback', async (result) => {
  const onClose = jest.fn();
  if (result === 'reject') SessionService.approveSignatureSessionByNotary.mockRejectedValue(new Error('fixture'));
  else SessionService.approveSignatureSessionByNotary.mockResolvedValue({ status: result });
  render(<DetailReadyToSignSessionModal open session={row('readyToSign')} onClose={onClose} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Chấp nhận', exact: true }));
  await waitFor(() => expect(screen.getByRole('button', { name: 'Chấp nhận', exact: true })).toBeEnabled());
  expect(SessionService.approveSignatureSessionByNotary).toHaveBeenCalledWith('PHIEN-MAU');
  expect(onClose).toHaveBeenCalledTimes(result === 200 ? 1 : 0);
  expect(toast.error.mock.calls).toEqual(result === 'reject' ? [['Có lỗi xảy ra, vui lòng thử lại sau']] : []);
});
