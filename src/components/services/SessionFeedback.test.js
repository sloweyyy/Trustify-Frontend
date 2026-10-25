import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import SessionFeedback from './SessionFeedback';
import NotarizationSessionDetailsModal from './NotarizationSessionDetailsModal';
import SessionService from '../../services/session.service';

jest.mock('react-redux', () => ({ useSelector: jest.fn(), useDispatch: jest.fn() }));
jest.mock('../../services/session.service', () => ({ approveSignatureSessionByUser: jest.fn() }));
jest.mock('../../pages/services/JoinSessionModal', () => () => null);
jest.mock('../../pages/services/create-notarization-profile/FileUploadSection', () => () => null);
jest.mock('../shared/SignaturePad', () => ({ id, onSave, loading }) => <section><h3 id={id} tabIndex={-1}>Vẽ chữ ký</h3><button disabled={loading} onClick={() => onSave(new Blob(['fixture'], { type: 'image/png' }))}>Lưu chữ ký mẫu</button></section>);
const user = { id: 'actor', _id: 'actor', email: 'actor@example.com' };
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const output = [{ filename: 'Kết quả mẫu.pdf', firebaseUrl: 'https://example.com/result.pdf' }];
const signature = { creator: { approved: false }, users: [] };
beforeEach(() => { jest.clearAllMocks(); useSelector.mockImplementation((selector) => selector({ user: { user } })); useDispatch.mockReturnValue(jest.fn()); });

test('unapproved creator keeps the original Blob callback', () => {
  const save = jest.fn(); render(<SessionFeedback createdBy="actor" signature={{ ...signature, users: [{ _id: 'other' }] }} output={output} onSignatureSave={save} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký mẫu' })); expect(save).toHaveBeenCalledTimes(1);
  expect(save.mock.calls[0][0]).toBeInstanceOf(Blob); expect(save.mock.calls[0][0].type).toBe('image/png');
});

test.each(['actor', 'other'])('the legacy empty-users branch is preserved (%s)', (createdBy) => {
  render(<SessionFeedback createdBy={createdBy} signature={{ creator: { approved: true }, users: [] }} output={output} />, { wrapper });
  expect(screen.getByRole('button', { name: 'Lưu chữ ký mẫu' })).toBeInTheDocument();
});

test('a participant image is displayed without adding a save action', () => {
  render(<SessionFeedback createdBy="other" signature={{ creator: { approved: true }, users: [{ _id: 'actor', signatureImage: 'https://example.com/signature.png' }] }} output={output} />, { wrapper });
  expect(screen.getByRole('img', { name: 'Chữ ký của bạn' })).toHaveAttribute('src', 'https://example.com/signature.png');
  expect(screen.queryByRole('button', { name: 'Lưu chữ ký mẫu' })).not.toBeInTheDocument();
});

test('a participant absent from a populated signature list keeps the existing no-pad behavior', () => {
  render(<SessionFeedback createdBy="other" signature={{ creator: { approved: true }, users: [{ _id: 'other' }] }} output={output} />, { wrapper });
  expect(screen.queryByRole('button', { name: 'Lưu chữ ký mẫu' })).not.toBeInTheDocument();
});

test('without output, shared notes render and signature controls stay absent', () => {
  render(<SessionFeedback signature={signature} output={[]} feedback="Ghi chú nguyên văn" />, { wrapper });
  expect(screen.getByRole('alert')).toHaveTextContent('Ghi chú nguyên văn'); expect(screen.queryByRole('button', { name: 'Lưu chữ ký mẫu' })).not.toBeInTheDocument();
});

const session = () => ({ _id: 'PHIEN-CONTRACT', sessionName: 'Phiên mẫu', createdBy: 'actor', creator: { _id: 'actor', name: 'Người tạo mẫu', email: user.email }, users: [], amount: 1, notaryField: { name: 'Sao y' }, notaryService: { name: 'Sao y', required_documents: [] }, startDate: '2026-10-25', endDate: '2026-11-05', files: [], output, signature: { creator: { approved: false }, users: [] }, status: { status: 'digitalSignature', feedback: '' } });
test('named dialog/close/Escape preserve the existing callback', () => {
  const close = jest.fn(); render(<NotarizationSessionDetailsModal open onClose={close} session={session()} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Ký ngay' })); expect(screen.getByRole('heading', { name: 'Vẽ chữ ký' })).toHaveFocus();
  const dialog = screen.getByRole('dialog', { name: 'Chi tiết phiên công chứng', exact: true });
  fireEvent.keyDown(dialog, { key: 'Escape' }); expect(close).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Đóng chi tiết phiên công chứng' })); expect(close).toHaveBeenCalledTimes(2);
  expect(screen.getByText('Chờ ký số')).toBeInTheDocument(); expect(screen.queryByText('Sẵn sàng ký số')).not.toBeInTheDocument();
});

test('session signature still sends the existing FormData contract (mock only)', async () => {
  const original = URL.createObjectURL; URL.createObjectURL = jest.fn(() => 'blob:fixture'); SessionService.approveSignatureSessionByUser.mockResolvedValue({ status: 200 });
  const record = session(); render(<NotarizationSessionDetailsModal open onClose={jest.fn()} session={record} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Lưu chữ ký mẫu' }));
  await waitFor(() => expect(SessionService.approveSignatureSessionByUser).toHaveBeenCalledTimes(1));
  const [payload] = SessionService.approveSignatureSessionByUser.mock.calls[0];
  expect(payload.get('sessionId')).toBe('PHIEN-CONTRACT'); expect(payload.get('signatureImage').type).toBe('image/png'); expect(payload.get('signatureImage').name).toBe('actor.png');
  await waitFor(() => expect(record.signature.creator.approved).toBe(true)); URL.createObjectURL = original;
});
