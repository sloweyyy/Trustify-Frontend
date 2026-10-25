import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SessionCard from '../../../components/services/SessionCard';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';

// Mock Redux store
const mockStore = createStore(() => ({
  user: {
    user: {
      id: 1,
      email: 'test@test.com',
    },
  },
}));

jest.mock('../../../components/services/NotarizationSessionDetailsModal', () => ({ open, onClose, session }) => open ? <div role="dialog" aria-label={session._id}><button onClick={onClose}>Đóng phiên mẫu</button></div> : null);

// Mock AvatarIcon
jest.mock('../../../components/static/AvatarIcon', () => {
  return function MockAvatarIcon({ email }) {
    return <div data-testid="avatar-icon">{email}</div>;
  };
});

describe('SessionCard', () => {
  const mockSession = {
    _id: 'PHIEN-QA',
    sessionName: 'Test Session',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      name: 'Test Creator',
      email: 'creator@test.com',
    },
    notaryField: { name: 'Test Field' },
    notaryService: { name: 'Test Service' },
    users: [{ email: 'user1@test.com' }, { email: 'user2@test.com' }],
  };

  const renderWithProvider = (component) => {
    return render(<Provider store={mockStore}><ThemeProvider theme={createTrustifyTheme()}>{component}</ThemeProvider></Provider>);
  };

  test('renders basic session information', () => {
    renderWithProvider(<SessionCard session={mockSession} />);

    expect(screen.getByText('Test Session')).toBeInTheDocument();
    expect(screen.getByText('Test Creator', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Xem phiên Test Session' })).toHaveAccessibleDescription(/Test Field/);
  });

  test('displays time remaining text correctly', () => {
    renderWithProvider(<SessionCard session={mockSession} />);
    expect(screen.getByText(/Còn \d+ ngày/)).toBeInTheDocument();
  });

  test('displays users avatars correctly', () => {
    renderWithProvider(<SessionCard session={mockSession} />);
    const avatars = screen.getAllByTestId('avatar-icon');
    expect(avatars).toHaveLength(3); // Creator + 2 users
  });

  test('shows expired status for past dates', () => {
    const expiredSession = {
      ...mockSession,
      endDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    };

    renderWithProvider(<SessionCard session={expiredSession} />);
    expect(screen.getByText(/Đã kết thúc/i)).toBeInTheDocument();
  });
  test('opens the original session and keeps its close callback', () => {
    renderWithProvider(<SessionCard session={mockSession} />);
    fireEvent.click(screen.getByRole('button', { name: 'Xem phiên Test Session', exact: true }));
    expect(screen.getByRole('dialog', { name: 'PHIEN-QA' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Đóng phiên mẫu' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('participant status has visible Vietnamese text, not only a colored dot', () => {
    renderWithProvider(<SessionCard session={{ ...mockSession, users: [{ email: 'one@example.com', status: 'pending' }, { email: 'two@example.com', status: 'accepted' }] }} />);
    expect(screen.getByText('Chờ tham gia')).toBeInTheDocument();
    expect(screen.getByText('Đã tham gia')).toBeInTheDocument();
  });
});
