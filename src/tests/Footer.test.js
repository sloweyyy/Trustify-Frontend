import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../config/theme/createTrustifyTheme';
import Footer from '../components/Footer';

test('footer preserves policy, product, contact and social destinations', () => {
  render(<MemoryRouter><ThemeProvider theme={createTrustifyTheme()}><Footer /></ThemeProvider></MemoryRouter>);
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  for (const [name, href] of [['Chính sách bảo mật', '/privacy-policy'], ['Bảo mật thanh toán', '/payment-security'], ['Điều khoản sử dụng', '/terms-of-service'], ['Hướng dẫn sử dụng', '/user-guide'], ['Quy chế hoạt động', '/operating-regulations'], ['Cơ chế giải quyết khiếu nại', '/dispute-resolution'], ['Giá', '/pricing'], ['Dành cho cá nhân', '/for-individuals'], ['Dành cho VPCC', '/for-notary-offices'], ['Facebook', 'https://www.facebook.com/slowey.ipynb'], ['GitHub', 'https://github.com/sloweyyy'], ['LinkedIn', 'https://www.linkedin.com/in/sloweyne/']]) expect(screen.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
  expect(screen.getByRole('link', { name: 'Email: sloweycontact@gmail.com' })).toHaveAttribute('href', 'mailto:sloweycontact@gmail.com');
  expect(screen.getByAltText('Trustify')).toHaveAttribute('src', '/brand/logo-inverse.svg');
});

test('internal footer navigation returns focus to content after scrolling up', () => {
  const scroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  render(<MemoryRouter><ThemeProvider theme={createTrustifyTheme()}><div id="page-content" tabIndex={-1} data-testid="content" /><Footer /></ThemeProvider></MemoryRouter>);
  fireEvent.click(screen.getByRole('link', { name: 'Chính sách bảo mật', exact: true }));
  expect(screen.getByTestId('content')).toHaveFocus();
  scroll.mockRestore();
});
