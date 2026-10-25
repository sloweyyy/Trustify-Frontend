import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../../config/theme/createTrustifyTheme';
import StatusBox from '../../../components/services/StatusBox';
const wrapper = ({ children }) => <ThemeProvider theme={createTrustifyTheme()}>{children}</ThemeProvider>;
test('a missing result shows the submitted reference and correction guidance', () => {
  render(<StatusBox status={{ found: false, searching: false }} displayText="HS-MAU" />, { wrapper });
  expect(screen.getByRole('status')).toHaveTextContent('Không tìm thấy hồ sơ');
  expect(screen.getByText(/Mã hồ sơ: HS-MAU/)).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
test('lookup loading announces progress without offering a stale detail action', () => {
  render(<StatusBox status={{ searching: true }} />, { wrapper });
  expect(screen.getByText('Đang tìm thông tin hồ sơ…')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
test('found results use the canonical state and invoke the supplied detail callback once', () => {
  const open = jest.fn();
  render(<StatusBox status={{ found: true }} displayText="HS-MAU" document={{ status: 'rejected' }} onOpenModal={open} />, { wrapper });
  expect(screen.getByText('Bị từ chối')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Xem chi tiết' })); expect(open).toHaveBeenCalledTimes(1);
});
