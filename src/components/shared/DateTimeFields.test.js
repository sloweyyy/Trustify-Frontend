import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import DateTimeFields from './DateTimeFields';

test('Vietnamese date/time labels preserve Dayjs values and callback types', () => {
  const onDate = jest.fn();
  render(
    <ThemeProvider theme={createTrustifyTheme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <DateTimeFields
          startDate={dayjs('2026-10-25')} startTime={dayjs('2026-10-25T09:30')}
          setStartDate={onDate} setStartTime={jest.fn()} isSubmitting={false}
        />
      </LocalizationProvider>
    </ThemeProvider>,
  );
  expect(screen.getByLabelText('Ngày (dd/mm/yyyy)')).toHaveValue('25/10/2026');
  expect(screen.getByLabelText('Giờ (24 giờ)')).toHaveValue('09:30');
  fireEvent.click(screen.getByRole('button', { name: 'Chọn ngày', exact: true }));
  expect(screen.getByText('T2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('26', { selector: 'button' }));
  const selected = onDate.mock.calls[0][0];
  expect(dayjs.isDayjs(selected)).toBe(true);
  expect(selected.format('YYYY-MM-DD')).toBe('2026-10-26');
});
