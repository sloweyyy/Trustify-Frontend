import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import CreateNotarizationProfile from './CreateNotarizationProfile';
import NotarizationService from '../../../services/notarization.service';
import UserWalletService from '../../../services/userwallet.service';
import { toast } from 'react-toastify';

jest.mock('../../../services/notarization.service', () => ({ getAllNotarizationField: jest.fn(), getNotarizationServiceByFieldId: jest.fn(), uploadNotarizationDocument: jest.fn() }));
jest.mock('../../../services/userwallet.service', () => ({ getUserWallet: jest.fn() }));
jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('react-toastify', () => ({ toast: { error: jest.fn(), success: jest.fn() } }));
const field = { id: 'field-one', name: 'Lĩnh vực kiểm tra' };
const service = { id: 'service-one', name: 'Dịch vụ kiểm tra', required_documents: ['identity_doc'] };
const setup = () => render(<ThemeProvider theme={createTrustifyTheme()}><CreateNotarizationProfile /></ThemeProvider>);
const chooseField = async () => {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: /^Lĩnh vực công chứng/ }));
  fireEvent.click(await screen.findByRole('option', { name: field.name }));
};
const chooseService = async () => {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: /^Dịch vụ công chứng/ }));
  fireEvent.click(await screen.findByRole('option', { name: service.name }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
};
const fillInformation = () => {
  fireEvent.change(screen.getByRole('spinbutton', { name: /^Số bản sao/ }), { target: { value: '1' } });
  for (const [name, value] of [['Họ và tên', 'Nguyễn Thị Mỹ'], ['Số điện thoại', '0900000000'], ['Số CMND/CCCD/Hộ chiếu', '000000000000'], ['Email', 'qa@example.com']]) {
    fireEvent.change(screen.getByRole('textbox', { name: new RegExp(`^${name}`) }), { target: { value } });
  }
};
beforeEach(() => {
  jest.clearAllMocks(); HTMLElement.prototype.scrollIntoView = jest.fn();
  NotarizationService.getAllNotarizationField.mockResolvedValue([field]);
  NotarizationService.getNotarizationServiceByFieldId.mockResolvedValue([service]);
  NotarizationService.uploadNotarizationDocument.mockResolvedValue({ status: 200 });
});

test('choosing a field without a service shows the existing validation instead of throwing', async () => {
  setup(); await chooseField(); fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  expect(screen.getByText('Chọn dịch vụ công chứng bạn cần.')).toBeInTheDocument();
  expect(toast.error).not.toHaveBeenCalled();
  expect(NotarizationService.uploadNotarizationDocument).not.toHaveBeenCalled();
});

test('uppercase JPG/JPEG files keep original display names, survive back navigation and preserve FormData', async () => {
  setup(); await chooseField(); await chooseService(); fillInformation();
  const jpg = new File(['first'], 'Ảnh CCCD.JPG', { type: 'image/jpeg' });
  const jpeg = new File(['second'], 'Ảnh hộ chiếu.JPEG', { type: 'image/jpeg' });
  fireEvent.change(screen.getByLabelText('Tệp cho Giấy tờ tuỳ thân'), { target: { files: [jpg, jpeg] } });
  expect(screen.getByRole('button', { name: 'Mở tài liệu Ảnh CCCD.JPG' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Mở tài liệu Ảnh hộ chiếu.JPEG' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  expect(screen.getByText('Nguyễn Thị Mỹ')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /^Bỏ tài liệu/ })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Quay lại', exact: true }));
  expect(screen.getByRole('textbox', { name: /^Họ và tên/ })).toHaveValue('Nguyễn Thị Mỹ');
  expect(screen.getByRole('textbox', { name: /^Số điện thoại/ })).toHaveValue('0900000000');
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Gửi hồ sơ', exact: true }));
  await waitFor(() => expect(NotarizationService.uploadNotarizationDocument).toHaveBeenCalledTimes(1));
  await screen.findByRole('combobox', { name: /^Lĩnh vực công chứng/ });
  const data = NotarizationService.uploadNotarizationDocument.mock.calls[0][0];
  expect([...data.keys()]).toEqual(['notarizationService', 'notarizationField', 'requesterInfo', 'amount', 'files', 'files', 'fileIds', 'customFileNames']);
  expect(JSON.parse(data.get('notarizationService'))).toEqual(service); expect(JSON.parse(data.get('notarizationField'))).toEqual(field);
  expect(JSON.parse(data.get('requesterInfo'))).toEqual({ fullName: 'Nguyễn Thị Mỹ', phoneNumber: '0900000000', citizenId: '000000000000', email: 'qa@example.com' });
  expect(data.get('amount')).toBe('1'); expect(data.get('fileIds')).toBe('[]'); expect(data.get('customFileNames')).toBe('[]');
  expect(data.getAll('files').map((file) => file.name)).toEqual([expect.stringMatching(/^identity_doc_\d+\.JPG$/), expect.stringMatching(/^identity_doc_\d+\.JPEG$/)]);
  expect(data.getAll('files').map((file) => file.size)).toEqual([jpg.size, jpeg.size]);
  const contents = await Promise.all(data.getAll('files').map((file) => new Promise((resolve) => {
    const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsText(file);
  })));
  expect(contents).toEqual(['first', 'second']);
});

test('unsupported files still fail validation and an incomplete step does not advance', async () => {
  setup(); await chooseField(); await chooseService();
  fireEvent.change(screen.getByLabelText('Tệp cho Giấy tờ tuỳ thân'), { target: { files: [new File(['x'], 'bad.exe')] } });
  expect(toast.error).toHaveBeenCalledWith('bad.exe: Tài liệu không hợp lệ');
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  expect(screen.getByRole('textbox', { name: /^Họ và tên/ })).toHaveAttribute('aria-invalid', 'true');
  expect(NotarizationService.uploadNotarizationDocument).not.toHaveBeenCalled();
});


test('wallet selection keeps fileIds/customFileNames payloads separate from display names', async () => {
  UserWalletService.getUserWallet.mockResolvedValue({ status: 200, data: { nftItems: [{ _id: 'wallet-id', filename: '123-original.pdf', amount: 1, mintedAt: '2026-10-24', mintAddress: 'mint' }] } });
  setup(); await chooseField(); await chooseService(); fillInformation();
  fireEvent.click(screen.getByRole('button', { name: 'Chọn tài liệu cho Giấy tờ tuỳ thân' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'Chọn từ ví tài liệu' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Chọn tài liệu original.pdf' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(screen.getByRole('button', { name: 'Mở tài liệu original.pdf' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Gửi hồ sơ', exact: true }));
  await screen.findByRole('combobox', { name: /^Lĩnh vực công chứng/ });
  const data = NotarizationService.uploadNotarizationDocument.mock.calls[0][0];
  expect(data.getAll('files')).toEqual([]); expect(JSON.parse(data.get('fileIds'))).toEqual(['wallet-id']);
  expect(JSON.parse(data.get('customFileNames'))).toEqual([expect.stringMatching(/^identity_doc_\d+\.pdf$/)]);
});


test('an error-envelope read stays recoverable and retries the same service method', async () => {
  NotarizationService.getAllNotarizationField.mockResolvedValueOnce({ status: 503 }).mockResolvedValueOnce([field]);
  setup(); fireEvent.mouseDown(screen.getByRole('combobox', { name: /^Lĩnh vực công chứng/ }));
  await screen.findByText('Chưa thể tải lĩnh vực công chứng');
  fireEvent.keyDown(screen.getByRole('combobox', { name: /^Lĩnh vực công chứng/ }), { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  await waitFor(() => expect(NotarizationService.getAllNotarizationField).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(screen.queryByText('Chưa thể tải lĩnh vực công chứng')).not.toBeInTheDocument());
});

test('an unsuccessful submission preserves review information and files for retry', async () => {
  NotarizationService.uploadNotarizationDocument.mockResolvedValue({ status: 503 });
  setup(); await chooseField(); await chooseService(); fillInformation();
  fireEvent.change(screen.getByLabelText('Tệp cho Giấy tờ tuỳ thân'), { target: { files: [new File(['sample'], 'sample.pdf', { type: 'application/pdf' })] } });
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'Gửi hồ sơ', exact: true }));
  await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Chưa thể gửi hồ sơ. Thông tin đã nhập vẫn ở đây để bạn thử lại.'));
  expect(screen.getByText('Nguyễn Thị Mỹ')).toBeInTheDocument(); expect(screen.getByRole('button', { name: 'Mở tài liệu sample.pdf' })).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('button', { name: 'Gửi hồ sơ', exact: true })).toBeEnabled());
  expect(NotarizationService.uploadNotarizationDocument).toHaveBeenCalledTimes(1); expect(toast.success).not.toHaveBeenCalled();
});
