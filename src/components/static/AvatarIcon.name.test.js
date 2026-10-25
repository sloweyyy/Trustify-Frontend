import React from 'react';
import { render, screen } from '@testing-library/react';
import AvatarIcon from './AvatarIcon';

test.each([
  ['Nguyễn Thị Mỹ', 'trustify@example.com', 'M'],
  ['  Đặng Văn  Đức  ', 'qa@example.com', 'Đ'],
  ['', 'qa@example.com', 'Q'],
  [undefined, undefined, '?'],
])('avatar initial follows the Vietnamese given name (%s)', (name, email, initial) => {
  render(<AvatarIcon name={name} email={email} />);
  expect(screen.getByText(initial)).toBeInTheDocument();
});
