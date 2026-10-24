import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import NotaryDataGrid from '../../pages/admin/notary-management/NotaryDataGrid';
import SessionDataGrid from '../../pages/admin/notary-management/SessionDataGrid';

test.each([
  [NotaryDataGrid, 'Tìm hồ sơ', 'Bị từ chối'],
  [SessionDataGrid, 'Tìm phiên', 'Phiên ngắn hạn'],
])('the grid toolbar keeps focus across input and filter updates', async (Grid, label, filter) => {
  render(
    <ThemeProvider theme={createTrustifyTheme()}>
      <Grid
        data={{ results: [], totalResults: 0 }}
        paginationModel={{ page: 0, pageSize: 25 }} setPaginationModel={jest.fn()} loading={false}
      />
    </ThemeProvider>,
  );
  const input = screen.getByLabelText(label);
  // DOM focus updates MUI's state; fireEvent wraps subsequent React updates itself.
  act(() => input.focus());
  fireEvent.change(input, { target: { value: 'Nguyễn' } });
  expect(screen.getByLabelText(label)).toBe(input);
  expect(input).toHaveValue('Nguyễn');
  expect(input).toHaveFocus();
  const button = screen.getByRole('button', { name: filter, exact: true });
  act(() => button.focus());
  fireEvent.click(button);
  expect(screen.getByRole('button', { name: filter, exact: true })).toBe(button);
  expect(button).toHaveFocus();
  expect(button).toHaveAttribute('aria-pressed', 'true');
});
