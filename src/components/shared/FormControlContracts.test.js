import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import CustomTextField from '../../pages/services/create-notarization-profile/CustomTextField';
import CustomAutocompleteField from '../../pages/services/create-notarization-profile/CustomAutocompleteField';
import formatVnd from '../../utils/formatVnd';

const view = (children) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;

test('the wizard still receives a native event with the unmodified passport/text value', () => {
  let received;
  render(view(<CustomTextField label="Số CMND/CCCD/Hộ chiếu" name="citizenId" onChange={event => {
    received = { name: event.target.name, value: event.target.value };
  }} />));
  fireEvent.change(screen.getByLabelText('Số CMND/CCCD/Hộ chiếu'), { target: { value: 'A00123456' } });
  expect(received).toEqual({ name: 'citizenId', value: 'A00123456' });
  expect(screen.getByLabelText('Số CMND/CCCD/Hộ chiếu')).toHaveValue('A00123456');
});

test('copy quantity remains a quantity event, with no added native validation rule', () => {
  let received;
  render(view(<CustomTextField label="Số bản sao" name="amount" type="number" required onChange={event => {
    received = { name: event.target.name, value: event.target.value };
  }} />));
  const input = screen.getByLabelText('Số bản sao');
  fireEvent.change(input, { target: { value: '3' } });
  expect(received).toEqual({ name: 'amount', value: '3' });
  expect(input).toHaveAttribute('aria-required', 'true');
  expect(input).not.toHaveAttribute('required');
});

test('wizard autocomplete retains the exact selected service object', () => {
  const option = { id: 'sao-y', name: 'Sao y chứng thực' };
  const onSelect = jest.fn();
  render(view(<CustomAutocompleteField title="Lĩnh vực công chứng" options={[option]} selectedOption={null} setSelectedOption={onSelect} fetchOptions={jest.fn()} />));
  fireEvent.mouseDown(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: option.name }));
  expect(onSelect).toHaveBeenCalledWith(option);
});

test('VND display is localized without converting missing amounts into a free payment', () => {
  expect(formatVnd(1250000).replace(/\s/g, ' ')).toBe('1.250.000 ₫');
  expect(formatVnd('2000').replace(/\s/g, ' ')).toBe('2.000 ₫');
  expect(formatVnd(0).replace(/\s/g, ' ')).toBe('0 ₫');
  expect(formatVnd(1.5).replace(/\s/g, ' ')).toBe('1,5 ₫');
  [undefined, null, '', 'invalid'].forEach(value => expect(formatVnd(value)).toBe('Chưa có thông tin số tiền'));
});
