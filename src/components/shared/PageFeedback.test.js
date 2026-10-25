import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorState, EmptyState, LoadingState } from './PageFeedback';

test('loading announces a single useful label and hides placeholder content', () => {
  render(<LoadingState label="Đang tải hồ sơ…"><span>Dòng tạm</span></LoadingState>);
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải hồ sơ…');
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

test('empty state explains the next step with a real optional action', () => {
  render(<EmptyState title="Chưa có hồ sơ" description="Hồ sơ sẽ xuất hiện tại đây." action={<a href="/user/create-notarization-profile">Tạo hồ sơ</a>} />);
  expect(screen.getByRole('heading', { name: 'Chưa có hồ sơ' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Tạo hồ sơ' })).toHaveAttribute('href', '/user/create-notarization-profile');
});

test('error retries only on explicit action', () => {
  const retry = jest.fn();
  render(<ErrorState onRetry={retry} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Chưa thể tải dữ liệu');
  expect(retry).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Thử lại' }));
  expect(retry).toHaveBeenCalledTimes(1);
});
