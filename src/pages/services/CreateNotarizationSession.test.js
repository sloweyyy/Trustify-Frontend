import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import CreateNotarizationSession from './CreateNotarizationSession';
import SessionService from '../../services/session.service';
import { uploadFileSuccess } from '../../stores/slices/sessionSlice';

jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: jest.fn() }));
jest.mock('../../services/session.service', () => ({ getSessionsByUserId: jest.fn() }));
jest.mock('../../components/services/SessionCard', () => ({ session }) => <li>{session.sessionName}</li>);
jest.mock('./NotarySessionForm', () => ({ open, setOpen, handleSuccess }) => open ? <div role="dialog" aria-label="Tạo phiên mẫu"><button onClick={() => { handleSuccess(); setOpen(false); }}>Hoàn tất mẫu</button></div> : null);
jest.mock('./JoinSessionModal', () => ({ open, sessionId }) => open ? <div role="dialog" aria-label="Tham gia phiên mẫu">{sessionId}</div> : null);
const rows = Array.from({ length: 7 }, (_, index) => ({ _id: `PHIEN-${index}`, sessionName: `Phiên mẫu ${index}`, users: [{ status: 'accepted' }] }));
const dispatch = jest.fn();
const show = (path = '/user/notarization-session') => render(<MemoryRouter initialEntries={[path]}><ThemeProvider theme={createTrustifyTheme()}><CreateNotarizationSession /></ThemeProvider></MemoryRouter>);
beforeEach(() => { jest.clearAllMocks(); useDispatch.mockReturnValue(dispatch); useSelector.mockImplementation((selector) => selector({ session: { uploadFileSuccessState: false } })); SessionService.getSessionsByUserId.mockResolvedValue({ results: rows }); });

test('retains six-item pagination and the existing exclusion of sessions with a rejected participant', async () => {
  SessionService.getSessionsByUserId.mockResolvedValue({ results: [...rows, { _id: 'excluded', sessionName: 'Không hiển thị', users: [{ status: 'rejected' }] }] });
  show(); await screen.findByText('Phiên mẫu 0'); expect(within(screen.getByRole('list', { name: 'Danh sách phiên công chứng' })).getAllByRole('listitem')).toHaveLength(6);
  fireEvent.click(screen.getByRole('button', { name: 'Trang 2', exact: true })); expect(screen.getByText('Phiên mẫu 6')).toBeInTheDocument();
  expect(screen.queryByText('Không hiển thị')).not.toBeInTheDocument();
});

test('case-insensitive search and zero results do not fall back to the full list', async () => {
  show(); await screen.findByText('Phiên mẫu 0'); const search = screen.getByRole('textbox', { name: 'Tìm phiên công chứng' });
  fireEvent.change(search, { target: { value: 'PHIÊN MẪU 6' } }); await screen.findByText('Phiên mẫu 6');
  expect(screen.queryByText('Phiên mẫu 0')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: 'Không tồn tại' } }); await screen.findByRole('heading', { name: 'Không tìm thấy phiên công chứng' });
  expect(screen.queryByText('Phiên mẫu 6')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Xóa từ khóa' })); expect(screen.getByText('Phiên mẫu 0')).toBeInTheDocument(); expect(search).toHaveValue('');
});

test('failed/malformed reads offer retry rather than claiming there are no sessions', async () => {
  SessionService.getSessionsByUserId.mockResolvedValueOnce({ message: 'offline' }).mockResolvedValueOnce({ results: [] });
  show(); await screen.findByText('Chưa thể tải phiên công chứng'); expect(screen.queryByText('Chưa có phiên công chứng')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' })); await screen.findByRole('heading', { name: 'Chưa có phiên công chứng' });
  expect(SessionService.getSessionsByUserId).toHaveBeenCalledTimes(2);
});

test('initial loading is announced, then a successful empty result is shown', async () => {
  let finish; SessionService.getSessionsByUserId.mockReturnValue(new Promise((resolve) => { finish = resolve; })); show();
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải phiên công chứng…');
  finish({ results: [] }); await screen.findByRole('heading', { name: 'Chưa có phiên công chứng' });
});

test('the existing create callback reloads the same GET', async () => {
  show(); await screen.findByText('Phiên mẫu 0'); fireEvent.click(screen.getByRole('button', { name: 'Tạo phiên công chứng', exact: true }));
  expect(screen.getByRole('dialog', { name: 'Tạo phiên mẫu' })).toBeInTheDocument(); fireEvent.click(screen.getByRole('button', { name: 'Hoàn tất mẫu' }));
  await waitFor(() => expect(SessionService.getSessionsByUserId).toHaveBeenCalledTimes(2));
});

test('existing sessionId invitation flow keeps the exact ID and removes the query', async () => {
  const replace = jest.spyOn(window.history, 'replaceState'); show('/user/notarization-session?sessionId=PHIEN-INVITE');
  expect(screen.getByRole('dialog', { name: 'Tham gia phiên mẫu' })).toHaveTextContent('PHIEN-INVITE');
  await screen.findByText('Phiên mẫu 0'); expect(replace).toHaveBeenCalledWith({}, document.title, window.location.pathname); replace.mockRestore();
});

test('the existing upload-success signal reloads sessions and resets the same Redux flag', async () => {
  useSelector.mockImplementation((selector) => selector({ session: { uploadFileSuccessState: true } })); show();
  await waitFor(() => expect(SessionService.getSessionsByUserId).toHaveBeenCalledTimes(2));
  expect(dispatch).toHaveBeenCalledWith(uploadFileSuccess(false));
});
