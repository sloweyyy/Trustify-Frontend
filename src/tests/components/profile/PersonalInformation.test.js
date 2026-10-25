import React from 'react';
import { render as rtlRender, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PersonalInformation from '../../../components/profile/PersonalInformation';
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
const render = (ui) => rtlRender(ui, { wrapper });

jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));

// Mock user data
const mockUser = {
  role: 'USER',
  isEmailVerified: true,
  name: 'Test User',
  email: 'test@example.com',
  phoneNumber: '0123456789',
  citizenId: '123456789',
  address: {
    province: 'Test City',
    district: 'Test District',
    town: 'Test Ward',
    street: 'Test Street',
  },
};

// Create mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: () => ({ user: mockUser, ...initialState }),
    },
  });
};

describe('PersonalInformation', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
  });

  test('renders personal information section', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByRole('heading', { name: 'Thông tin tài khoản', exact: true })).toBeInTheDocument();
    expect(screen.getByText('Địa chỉ liên hệ')).toBeInTheDocument();
  });

  test('displays user data from Redux store', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockUser.citizenId)).toBeInTheDocument();
  });

  test('displays address information', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText(mockUser.address.province)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.district)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.town)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.street)).toBeInTheDocument();
  });

  test('opens edit modal on button click', async () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const editButton = screen.getByText('Chỉnh sửa');
    fireEvent.click(editButton);

    const modalTitle = screen.getByRole('dialog', { name: 'Cập nhật hồ sơ', exact: true });
    expect(modalTitle).toBeInTheDocument();
  });

  test('closes modal when handleClose is called', async () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const editButton = screen.getByText('Chỉnh sửa');
    fireEvent.click(editButton);

    const backButton = screen.getByRole('button', { name: 'Đóng cập nhật hồ sơ', exact: true });
    fireEvent.click(backButton);

    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Cập nhật hồ sơ', exact: true })).not.toBeInTheDocument());
  });

  test('updates form data when user data changes', () => {
    const { rerender } = render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const updatedUser = {
      ...mockUser,
      name: 'Updated Name',
    };

    store = createMockStore({ user: updatedUser });

    rerender(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText('Updated Name')).toBeInTheDocument();
  });

});
