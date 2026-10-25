import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../../../components/home/FAQ';
test('public FAQ exposes five named, independently expandable answers', () => {
  render(<FAQ />);
  expect(screen.getByRole('heading', { name: 'Câu hỏi thường gặp' })).toBeInTheDocument();
  expect(screen.getAllByRole('button')).toHaveLength(5);
  const prepare = screen.getByRole('button', { name: 'Tôi cần chuẩn bị gì trước khi gửi hồ sơ?' });
  const blockchain = screen.getByRole('button', { name: 'Bản ghi blockchain có phải là con dấu công chứng không?' });
  expect(prepare).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(prepare); expect(prepare).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(/Tài liệu cần rõ nét và đủ trang/)).toBeVisible();
  fireEvent.click(blockchain); expect(blockchain).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(/không thay thế việc xem xét hồ sơ/)).toBeVisible();
  fireEvent.click(prepare); expect(prepare).toHaveAttribute('aria-expanded', 'false');
  expect(blockchain).toHaveAttribute('aria-expanded', 'true');
});
