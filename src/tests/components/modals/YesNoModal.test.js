import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import YesNoModal from '../../../components/modals/YesNoModal';

const props = () => ({ title: 'Đăng xuất', content: 'Bạn có chắc chắn muốn đăng xuất?', open: true, setOpen: jest.fn(), onYes: jest.fn(), onNo: jest.fn() });

test('named dialog preserves confirmation and cancellation callbacks', () => {
  const callbacks = props();
  render(<YesNoModal {...callbacks} yesLabel="Đăng xuất" noLabel="Ở lại" />);
  expect(screen.getByRole('dialog', { name: 'Đăng xuất' })).toHaveAccessibleDescription(callbacks.content);
  fireEvent.click(screen.getByRole('button', { name: 'Ở lại' }));
  expect(callbacks.onNo).toHaveBeenCalledTimes(1);
  expect(callbacks.onYes).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));
  expect(callbacks.onYes).toHaveBeenCalledTimes(1);
});

test('Escape and close dismiss through setOpen without confirming', () => {
  const callbacks = props();
  render(<YesNoModal {...callbacks} />);
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  expect(callbacks.setOpen).toHaveBeenCalledWith(false);
  fireEvent.click(screen.getByRole('button', { name: 'Đóng hộp thoại' }));
  expect(callbacks.setOpen).toHaveBeenCalledTimes(2);
  expect(callbacks.onYes).not.toHaveBeenCalled();
  expect(callbacks.onNo).not.toHaveBeenCalled();
});

test('closed confirmation is absent from the accessibility tree', () => {
  render(<YesNoModal {...props()} open={false} />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
