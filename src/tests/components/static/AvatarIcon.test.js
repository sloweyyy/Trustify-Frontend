import React from 'react';
import { render, screen } from '@testing-library/react';
import AvatarIcon from '../../../components/static/AvatarIcon';
test.each([['test@example.com', 'T'], ['example@test.com', 'E']])('email-only avatars retain the uppercase initial for %s', (email, initial) => {
  render(<AvatarIcon email={email} />);
  expect(screen.getByText(initial)).toBeInTheDocument();
});
