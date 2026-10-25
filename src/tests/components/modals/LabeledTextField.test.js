import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import LabeledTextField from '../../../components/modals/LabeledTextField';

const view = (props) => <ThemeProvider theme={createTrustifyTheme()}><LabeledTextField {...props} /></ThemeProvider>;

test('the associated phone label preserves the raw value and leading zero', () => {
  const onChange = jest.fn();
  render(view({ label: 'Số điện thoại', value: '', onChange, type: 'tel', inputMode: 'tel' }));
  fireEvent.change(screen.getByLabelText('Số điện thoại'), { target: { value: '0123456789' } });
  expect(onChange).toHaveBeenCalledWith('0123456789');
});

test('identity text is never coerced into a number', () => {
  const onChange = jest.fn();
  render(view({ label: 'CMND/CCCD', value: '', onChange, inputMode: 'numeric' }));
  fireEvent.change(screen.getByLabelText('CMND/CCCD'), { target: { value: '001234567890' } });
  expect(onChange).toHaveBeenCalledWith('001234567890');
});

test('province selection and clearing keep the existing string/null contract', () => {
  const onChange = jest.fn();
  const props = { label: 'Tỉnh/Thành phố', value: null, onChange, isAutoComplete: true, options: [{ label: 'Hà Nội' }] };
  const { rerender } = render(view(props));
  fireEvent.mouseDown(screen.getByRole('combobox'));
  fireEvent.click(screen.getByRole('option', { name: 'Hà Nội' }));
  expect(onChange).toHaveBeenLastCalledWith('Hà Nội');
  rerender(view({ ...props, value: 'Hà Nội' }));
  fireEvent.focus(screen.getByRole('combobox'));
  fireEvent.click(screen.getByLabelText('Xóa lựa chọn', { selector: 'button' }));
  expect(onChange).toHaveBeenLastCalledWith(null);
});

test('verified fields retain their disabled state and associated label', () => {
  render(view({ label: 'Email', value: 'qa@example.com', disabled: true }));
  expect(screen.getByLabelText('Email')).toBeDisabled();
});

test('field errors are linked to their input for assistive technology', () => {
  render(view({ label: 'CCCD', value: '', error: true, helperText: 'Kiểm tra số CCCD trên giấy tờ của bạn.' }));
  const input = screen.getByLabelText('CCCD');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAccessibleDescription('Kiểm tra số CCCD trên giấy tờ của bạn.');
});
