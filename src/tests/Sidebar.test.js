import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import createTrustifyTheme from '../config/theme/createTrustifyTheme';
import Sidebar from '../components/Sidebar';
jest.mock('@mui/material/useMediaQuery', () => ({ __esModule: true, default: jest.fn() }));
const Location = () => <output aria-label="Route">{useLocation().pathname}</output>;
const setup = (role = 'user', path = '/user/history') => render(
  <Provider store={configureStore({ reducer: { user: () => ({ user: { role, name: 'Người kiểm tra' } }) } })}>
    <MemoryRouter initialEntries={[path]}><ThemeProvider theme={createTrustifyTheme()}><Sidebar /><Location /></ThemeProvider></MemoryRouter>
  </Provider>,
);
beforeEach(() => useMediaQuery.mockReturnValue(true));

test.each([['user', 'Lịch sử', '/user/history'], ['notary', 'Tài liệu chờ ký số', '/notary/awaiting-signature-documents'], ['admin', 'Quản lý người dùng', '/admin/user-management'], ['secretary', 'Xác minh hồ sơ', '/verify']])('role %s retains its navigation destinations', (role, name, href) => {
  setup(role, href);
  expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
  expect(screen.getByRole('link', { name })).toHaveAttribute('aria-current', 'page');
});

test('collapsed desktop navigation keeps accessible link names', () => {
  setup();
  fireEvent.click(screen.getByRole('button', { name: 'Thu gọn menu' }));
  expect(screen.getByRole('link', { name: 'Lịch sử' })).toBeInTheDocument();
  expect(screen.queryByText('Lịch sử')).not.toBeInTheDocument();
});

test('mobile navigation opens on demand and closes after route changes', async () => {
  useMediaQuery.mockReturnValue(false);
  setup('user', '/user/document-wallet');
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Mở menu điều hướng' }));
  expect(screen.getByRole('navigation', { name: 'Điều hướng chính' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Lịch sử' }));
  await waitFor(() => expect(screen.queryByRole('navigation')).not.toBeInTheDocument());
  expect(screen.getByLabelText('Route')).toHaveTextContent('/user/history');
});

test('logout cancellation retains the navigation and current route', async () => {
  setup();
  fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
  fireEvent.click(screen.getByRole('button', { name: 'Ở lại' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(screen.getByLabelText('Route')).toHaveTextContent('/user/history');
});
