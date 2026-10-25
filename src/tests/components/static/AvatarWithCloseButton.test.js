import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AvatarWithCloseButton from '../../../components/static/AvatarWithCloseButton';
const props = { email: 'khach@example.com', name: 'Nguyễn Thị Mỹ' };
test('guest identity is visible without a pointer or hover', () => {
  render(<AvatarWithCloseButton {...props} />);
  expect(screen.getByText(props.email)).toBeVisible(); expect(screen.getByText(props.name)).toBeVisible();
  expect(screen.getByText('Khách mời')).toBeVisible();
});
test('the named remove action invokes the existing callback once', () => {
  const remove = jest.fn(); render(<AvatarWithCloseButton {...props} onRemove={remove} />);
  fireEvent.click(screen.getByRole('button', { name: `Bỏ khách mời ${props.email}` })); expect(remove).toHaveBeenCalledTimes(1);
});
test('existing creator/hide props retain the role label and remove-action visibility', () => {
  render(<AvatarWithCloseButton {...props} isCreator onHideRemoveIcon />);
  expect(screen.getByText('Chủ phiên')).toBeVisible(); expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
