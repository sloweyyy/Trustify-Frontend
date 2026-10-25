import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import createTrustifyTheme from '../config/theme/createTrustifyTheme';
import Header from '../components/Header';
jest.mock('@mui/material/useMediaQuery', () => ({ __esModule: true, default: jest.fn() }));
const setup = () => render(<MemoryRouter initialEntries={['/lookup']}><ThemeProvider theme={createTrustifyTheme()}><Header /></ThemeProvider></MemoryRouter>);

test('desktop keeps public destinations and marks the current page', () => {
  useMediaQuery.mockReturnValue(false); setup();
  expect(screen.getByRole('link', { name: 'Tra cứu hồ sơ' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('link', { name: 'Đăng nhập' })).toHaveAttribute('href', '/signin');
  expect(screen.getByRole('link', { name: 'Đăng ký' })).toHaveAttribute('href', '/signup');
});

test('mobile menu exposes destinations and closes after navigation', async () => {
  useMediaQuery.mockReturnValue(true); setup();
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Mở menu điều hướng' }));
  expect(screen.getByRole('navigation', { name: 'Điều hướng công khai' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Dịch vụ công chứng' }));
  await waitFor(() => expect(screen.queryByRole('navigation')).not.toBeInTheDocument());
});
