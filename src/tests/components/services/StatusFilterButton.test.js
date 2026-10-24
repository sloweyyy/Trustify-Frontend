import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import StatusFilterButton from '../../../components/services/StatusFilterButton';

const renderFilter = (props) => render(
  <ThemeProvider theme={createTrustifyTheme()}><StatusFilterButton {...props} /></ThemeProvider>,
);

test('displays the approved label while passing the unchanged legacy filter value', () => {
  const onFilter = jest.fn();
  renderFilter({ statusFilter: 'Sẵn sàng ký số', clickedButton: '', handleFilterByStatus: onFilter });
  fireEvent.click(screen.getByRole('button', { name: 'Chờ ký số' }));
  expect(onFilter).toHaveBeenCalledWith('Sẵn sàng ký số');
});

test('reject filter retains its existing predicate value and exposes selected state', () => {
  const onFilter = jest.fn();
  renderFilter({ statusFilter: 'Không hợp lệ', clickedButton: 'Không hợp lệ', handleFilterByStatus: onFilter });
  const button = screen.getByRole('button', { name: 'Bị từ chối' });
  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(button).toHaveStyle({ minHeight: '48px' });
  fireEvent.click(button);
  expect(onFilter).toHaveBeenCalledWith('Không hợp lệ');
});

test('verification remains a distinct filter instead of collapsing into processing', () => {
  renderFilter({ statusFilter: 'Đang xác minh', clickedButton: 'Đang xử lý' });
  expect(screen.getByRole('button', { name: 'Đang xử lý · Xác minh' })).toHaveAttribute('aria-pressed', 'false');
});
