import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import JoinSessionModal from './JoinSessionModal';
import SessionService from '../../services/session.service';

jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('../../services/session.service', () => ({ joinSession: jest.fn() }));
beforeEach(() => jest.clearAllMocks());
const setup = () => {
  const close = jest.fn();
  render(<ThemeProvider theme={createTrustifyTheme()}><JoinSessionModal open sessionId="INVITE-MAU" setOpen={close} /></ThemeProvider>);
  return close;
};
test.each([['Chấp nhận', 'accept'], ['Từ chối', 'reject']])('%s preserves invitation ID and action', async (label, action) => {
  SessionService.joinSession.mockResolvedValue({ message: 'fixture' });
  const close = setup();
  fireEvent.click(screen.getByRole('button', { name: label, exact: true }));
  expect(SessionService.joinSession).toHaveBeenCalledWith('INVITE-MAU', action);
  await waitFor(() => expect(close).toHaveBeenCalledWith(false));
});
test('closing or Escape dismisses without replying to the invitation', () => {
  const close = setup();
  const dialog = screen.getByRole('dialog', { name: 'Tham gia phiên công chứng', exact: true });
  fireEvent.keyDown(dialog, { key: 'Escape' });
  fireEvent.click(screen.getByRole('button', { name: 'Đóng lời mời tham gia phiên' }));
  expect(close).toHaveBeenCalledTimes(2);
  expect(SessionService.joinSession).not.toHaveBeenCalled();
});
