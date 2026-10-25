import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../config/theme/createTrustifyTheme';
import ChatAssistant from './ChatAssistant';
import Chatbox from './Chatbox';
import { sendMessageToGemini } from '../services/chat.service';
jest.mock('../services/chat.service', () => ({ sendMessageToGemini: jest.fn() }));
jest.mock('react-markdown', () => ({ children }) => <div>{children}</div>);
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test('launcher and suggestions are keyboard reachable, do not auto-send, and close restores focus', async () => {
  sendMessageToGemini.mockResolvedValue('Hướng dẫn mẫu'); render(<ChatAssistant />, { wrapper }); const opener = screen.getByRole('button', { name: 'Mở trợ lý hướng dẫn' });
  act(() => opener.focus()); fireEvent.click(opener); expect(screen.getByRole('dialog', { name: 'Trợ lý hướng dẫn' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Tôi tạo hồ sơ thế nào?' })); expect(screen.getByLabelText('Câu hỏi của bạn')).toHaveValue('Tôi tạo hồ sơ thế nào?'); expect(sendMessageToGemini).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Gửi câu hỏi' })); await screen.findByText('Hướng dẫn mẫu'); expect(sendMessageToGemini).toHaveBeenCalledWith('Tôi tạo hồ sơ thế nào?');
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' }); await waitFor(() => expect(opener).toHaveFocus()); expect(opener).toHaveAttribute('aria-expanded', 'false');
});
test('service rejection unlocks retry, restores trimmed text and keeps one displayed question on retry', async () => {
  sendMessageToGemini.mockRejectedValueOnce(new Error('fixture')).mockResolvedValueOnce('Đã trả lời mẫu');
  render(<Chatbox showChatbox setShowChatbox={jest.fn()} />, { wrapper }); const input = screen.getByLabelText('Câu hỏi của bạn'); fireEvent.change(input, { target: { value: '  Hồ sơ ở đâu?  ' } }); fireEvent.click(screen.getByRole('button', { name: 'Gửi câu hỏi' }));
  await screen.findByRole('alert'); expect(input).toBeEnabled(); expect(input).toHaveValue('Hồ sơ ở đâu?'); fireEvent.click(screen.getByRole('button', { name: 'Gửi câu hỏi' })); await screen.findByText('Đã trả lời mẫu');
  expect(sendMessageToGemini.mock.calls).toEqual([['Hồ sơ ở đâu?'], ['Hồ sơ ở đâu?']]); expect(screen.getAllByText('Hồ sơ ở đâu?')).toHaveLength(1);
});
test('pending, Shift+Enter and Vietnamese IME composition do not submit duplicate questions', async () => {
  let finish; sendMessageToGemini.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
  render(<Chatbox showChatbox setShowChatbox={jest.fn()} />, { wrapper }); const input = screen.getByLabelText('Câu hỏi của bạn'); fireEvent.change(input, { target: { value: 'Hướng dẫn' } });
  fireEvent.keyDown(input, { key: 'Enter', shiftKey: true }); fireEvent.keyDown(input, { key: 'Enter', isComposing: true }); expect(sendMessageToGemini).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Gửi câu hỏi' })); fireEvent.keyDown(input, { key: 'Enter' }); expect(sendMessageToGemini).toHaveBeenCalledTimes(1); expect(input).toBeDisabled(); await act(async () => { finish('Phản hồi mẫu'); }); expect(input).toBeEnabled();
});
