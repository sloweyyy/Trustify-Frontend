import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoField from '../../../components/profile/InfoField';
test('profile information exposes a readable definition label and value', () => {
  render(<dl><InfoField label="Họ và tên" value="Nguyễn Thị Mỹ" /></dl>);
  expect(screen.getByText('Họ và tên').tagName).toBe('DT');
  expect(screen.getByText('Nguyễn Thị Mỹ').tagName).toBe('DD');
});
test.each(['', null, undefined])('missing profile values have an honest visible placeholder (%s)', value => {
  render(<dl><InfoField label="Địa chỉ" value={value} /></dl>);
  expect(screen.getByText('Chưa có thông tin')).toBeInTheDocument();
});
test('a real zero value is retained', () => {
  render(<dl><InfoField label="Số hồ sơ" value={0} /></dl>);
  expect(screen.getByText('0')).toBeInTheDocument();
});
