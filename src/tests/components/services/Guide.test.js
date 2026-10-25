import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Guide from '../../../components/services/Guide';
test('the four public steps stay visible in a semantic ordered list', () => {
  render(<Guide />);
  expect(screen.getByRole('heading', { name: 'Thực hiện từng bước' })).toBeInTheDocument();
  const steps = within(screen.getByRole('list')).getAllByRole('listitem');
  expect(steps).toHaveLength(4);
  ['Chuẩn bị giấy tờ', 'Gửi hồ sơ', 'Theo dõi xử lý', 'Xem kết quả'].forEach((name, i) => {
    expect(within(steps[i]).getByRole('heading', { name })).toBeInTheDocument();
    expect(within(steps[i]).getByText(`Bước ${i + 1}`)).toBeInTheDocument();
  });
  expect(screen.getByText(/Mở lịch sử hồ sơ để xem trạng thái/)).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
