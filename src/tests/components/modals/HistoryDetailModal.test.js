import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import HistoryDetailModal from '../../../components/modals/HistoryDetailModal';
import NotarizationService from '../../../services/notarization.service';

jest.mock('../../../components/services/NotaryFeedback', () => ({ output, onSignatureSave, loading }) => <section aria-label="Ghi chú thử nghiệm">
  <span>{output.length} tài liệu phản hồi</span><button disabled={loading} onClick={() => onSignatureSave(new Blob(['signature'], { type: 'image/png' }))}>Lưu chữ ký thử nghiệm</button>
</section>);
jest.mock('../../../services/notarization.service', () => ({ approveSignatureByUser: jest.fn() }));
const record = { _id: 'HS-123', userId: 'user-456', status: { status: 'pending' }, requesterInfo: { fullName: 'Nguyễn Thị Mỹ', citizenId: '000000000000', phoneNumber: '0000000000', email: 'qa@example.com' }, notarizationField: { name: 'Sao y' }, notarizationService: { name: 'Chứng thực bản sao' }, files: [{ filename: 'Giấy tờ gốc.PDF', firebaseUrl: 'https://example.com/file.pdf' }, { filename: 'Ảnh gốc.JPEG', firebaseUrl: 'https://example.com/image.jpeg' }], output: [] };
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const show = (props = {}) => render(<HistoryDetailModal open handleClose={jest.fn()} data={[record]} notaryId={record._id} {...props} />, { wrapper });
beforeEach(() => { jest.clearAllMocks(); NotarizationService.approveSignatureByUser.mockResolvedValue({}); });

test('dialog has one accessible title, readable information and a named close action', () => {
  const close = jest.fn(); show({ handleClose: close });
  expect(screen.getByRole('dialog', { name: 'Chi tiết hồ sơ công chứng', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Chi tiết hồ sơ công chứng', level: 2 })).toBeInTheDocument();
  expect(screen.getByText(record.requesterInfo.fullName)).toBeInTheDocument();
  expect(screen.getByText(record.requesterInfo.citizenId)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Đóng chi tiết hồ sơ' })); expect(close).toHaveBeenCalledTimes(1);
});

test('Escape retains the original close callback', () => {
  const close = jest.fn(); show({ handleClose: close }); fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' }); expect(close).toHaveBeenCalledTimes(1);
});

test('original attachment names and exact URLs are retained for PDF and JPEG', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => null); show();
  fireEvent.click(screen.getByRole('button', { name: 'Mở tài liệu Giấy tờ gốc.PDF' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mở tài liệu Ảnh gốc.JPEG' }));
  expect(open.mock.calls).toEqual([['https://example.com/file.pdf'], ['https://example.com/image.jpeg']]); open.mockRestore();
  expect(NotarizationService.approveSignatureByUser).not.toHaveBeenCalled();
});

test.each([['digitalSignature', 'Chờ ký số'], ['completed', 'Hoàn tất'], ['rejected', 'Bị từ chối'], ['unknown', 'Chưa có thông tin trạng thái']])('uses shared status language for %s', (status, label) => {
  show({ data: [{ ...record, status: { status } }] }); expect(screen.getAllByText(label).length).toBeGreaterThan(0);
  expect(screen.queryByText('Sẵn sàng ký số')).not.toBeInTheDocument();
});

test('switching records replaces displayed data and handles a missing record', () => {
  const view = show(); view.rerender(<HistoryDetailModal open handleClose={jest.fn()} data={[{ ...record, _id: 'HS-NEW', requesterInfo: { fullName: 'Người nhận mới' } }]} notaryId="HS-NEW" />);
  expect(screen.getByText('Người nhận mới')).toBeInTheDocument(); expect(screen.queryByText('Nguyễn Thị Mỹ')).not.toBeInTheDocument();
  view.rerender(<HistoryDetailModal open handleClose={jest.fn()} data={[]} notaryId="missing" />);
  expect(screen.getByRole('heading', { name: 'Chưa có thông tin hồ sơ' })).toBeInTheDocument(); expect(screen.queryByText('Người nhận mới')).not.toBeInTheDocument();
});

test('signature callback retains the existing FormData contract (mock only)', async () => {
  const original = URL.createObjectURL; URL.createObjectURL = jest.fn(() => 'blob:mock'); show();
  fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký thử nghiệm' }));
  await waitFor(() => expect(NotarizationService.approveSignatureByUser).toHaveBeenCalledTimes(1));
  const [payload] = NotarizationService.approveSignatureByUser.mock.calls[0];
  expect(payload.get('documentId')).toBe('HS-123'); expect(payload.get('signatureImage').name).toBe('user-456.png');
  expect(payload.get('signatureImage').type).toBe('image/png'); URL.createObjectURL = original;
});
