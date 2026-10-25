import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import Stepper from './CreateNotarizationProfileStepper';
jest.mock('@mui/material/useMediaQuery', () => ({ __esModule: true, default: jest.fn() }));

test('mobile stepper exposes current step and progress without fake buttons', () => {
  useMediaQuery.mockReturnValue(true);
  render(<ThemeProvider theme={createTrustifyTheme()}><Stepper currentStep={1} /></ThemeProvider>);
  expect(screen.getByText('Bước 2/3')).toBeInTheDocument();
  expect(screen.getByRole('progressbar', { name: 'Tiến trình tạo hồ sơ' })).toHaveAttribute('aria-valuenow', '67');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('desktop keeps the three domain step labels', () => {
  useMediaQuery.mockReturnValue(false);
  render(<ThemeProvider theme={createTrustifyTheme()}><Stepper currentStep={0} /></ThemeProvider>);
  for (const label of ['Chọn loại công chứng', 'Cung cấp thông tin', 'Kiểm tra lại yêu cầu']) expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
