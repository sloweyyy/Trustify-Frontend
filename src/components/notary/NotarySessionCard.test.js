import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import NotarySessionCard from './NotarySessionCard';
import DetailProcessingSessionModal from './DetailProcessingSessionModal';
import DetailReadyToSignSessionModal from './DetailReadyToSignSessionModal';
jest.mock('./DetailProcessingSessionModal', () => jest.fn(() => null));
jest.mock('./DetailReadyToSignSessionModal', () => jest.fn(() => null));
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test.each(['processing', 'readyToSign'])('%s card retains exact session and modal selection', (status) => {
  const session = { status, sessionId: { sessionName: 'Phiên mẫu', endDate: '2026-01-01', createdBy: { name: 'An', email: 'qa@example.com' }, notaryField: { name: 'Sao y' }, notaryService: { name: 'Bản sao' }, users: [] } };
  render(<NotarySessionCard session={session} />, { wrapper });
  fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết phiên Phiên mẫu' }));
  const component = status === 'processing' ? DetailProcessingSessionModal : DetailReadyToSignSessionModal;
  expect(component.mock.calls.filter(([props]) => props.open).at(-1)[0].session).toBe(session);
  expect(screen.getByText(status === 'processing' ? 'Đang xử lý' : 'Chờ ký số')).toBeInTheDocument();
});
