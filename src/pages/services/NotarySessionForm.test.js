import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import NotarySessionForm from './NotarySessionForm';
import SessionService from '../../services/session.service';

jest.mock('react-toastify/dist/ReactToastify.css', () => ({}));
jest.mock('../../services/session.service', () => ({ createSession: jest.fn() }));

test('session labels identify all editable controls and cancel never submits', () => {
  const setOpen = jest.fn();
  render(<ThemeProvider theme={createTrustifyTheme()}>
    <NotarySessionForm open setOpen={setOpen} handleSuccess={jest.fn()} />
  </ThemeProvider>);
  for (const label of ['Tên phiên công chứng', 'Số lượng bản sao', 'Lĩnh vực công chứng', 'Dịch vụ công chứng', 'Thêm khách mời']) {
    const input = screen.getByLabelText(label, { exact: true });
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('id');
  }
  fireEvent.change(screen.getByLabelText('Tên phiên công chứng'), { target: { value: 'Phiên kiểm tra' } });
  fireEvent.click(screen.getByRole('button', { name: 'Hủy', exact: true }));
  expect(setOpen).toHaveBeenCalledWith(false);
  expect(SessionService.createSession).not.toHaveBeenCalled();
});
