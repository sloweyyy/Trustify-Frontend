import React from 'react';
import { render, screen } from '@testing-library/react';
import NotaryStep from '../../../components/modals/NotaryStep';

test('progress is informational and uses canonical labels', () => {
  render(<NotaryStep currentStep={3} status="digitalSignature" />);
  expect(screen.getByRole('region', { name: 'Tiến trình hồ sơ' })).toBeInTheDocument();
  expect(screen.getByText('Chờ ký số')).toBeInTheDocument(); expect(screen.getByText('Bước xác minh')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument(); expect(screen.queryByText('Sẵn sàng ký số')).not.toBeInTheDocument();
});

test('rejected does not imply that the hồ sơ is pending or completed', () => {
  render(<NotaryStep currentStep={0} status="rejected" />);
  expect(screen.getByRole('alert')).toHaveTextContent('Hồ sơ bị từ chối'); expect(screen.queryByText('Hoàn tất')).not.toBeInTheDocument();
});

test('unknown states do not invent progress', () => {
  render(<NotaryStep currentStep={0} status="unknown" />);
  expect(screen.getByText('Chưa có thông tin tiến trình hồ sơ.')).toBeInTheDocument(); expect(screen.queryByText('Chờ xử lý')).not.toBeInTheDocument();
});
