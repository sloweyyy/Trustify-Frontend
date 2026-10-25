import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import SidebarItem from '../../../components/static/SidebarItem';

test('navigation is a named current link and invokes the existing handler', () => {
  const click = jest.fn();
  render(<ThemeProvider theme={createTrustifyTheme()}><SidebarItem type="history" title="Lịch sử" href="/user/history" selectedMenu="history" openSideBar onClick={click} /></ThemeProvider>);
  const link = screen.getByRole('link', { name: 'Lịch sử' });
  expect(link).toHaveAttribute('aria-current', 'page');
  fireEvent.click(link);
  expect(click).toHaveBeenCalledTimes(1);
});

test('icon-only action keeps a keyboard-accessible name', () => {
  const click = jest.fn();
  render(<ThemeProvider theme={createTrustifyTheme()}><SidebarItem type="logout" title="Đăng xuất" openSideBar={false} onClick={click} /></ThemeProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
  expect(click).toHaveBeenCalledTimes(1);
});
