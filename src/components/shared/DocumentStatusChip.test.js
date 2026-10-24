import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import createTrustifyTheme from '../../config/theme/createTrustifyTheme';
import DocumentStatusChip from './DocumentStatusChip';
import { getDocumentStatus, getDocumentFilterLabel, getLegacyDocumentFilterValue } from '../../utils/documentStatus';

const cases = [
  ['pending', 'Chờ xử lý', 'warning'],
  ['processing', 'Đang xử lý', 'info'],
  ['verification', 'Đang xử lý · Bước xác minh', 'info'],
  ['digitalSignature', 'Chờ ký số', 'signature'],
  ['completed', 'Hoàn tất', 'success'],
  ['rejected', 'Bị từ chối', 'error'],
];

test.each(['light', 'dark'])('%s renders the complete lifecycle without adding interactive chips', (mode) => {
  const theme = createTrustifyTheme(mode);
  render(<ThemeProvider theme={theme}>{cases.map(([status]) => <DocumentStatusChip key={status} status={status} />)}</ThemeProvider>);
  cases.forEach(([status, label, tone]) => {
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(getDocumentStatus(status).tone).toBe(tone);
  });
  // Noninteractive chips are text, not misleading buttons or live announcements.
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('missing or unknown status never implies completion; session states stay separate', () => {
  [undefined, 'unexpected', 'readyToSign', 'constructor', {}].forEach(value => {
    expect(getDocumentStatus(value).label).toBe('Chưa có thông tin trạng thái');
  });
});

test('legacy translated strings have the same presentation as their raw enum', () => {
  expect(getDocumentStatus('Sẵn sàng ký số')).toEqual(getDocumentStatus('digitalSignature'));
  expect(getDocumentStatus('Không hợp lệ')).toEqual(getDocumentStatus('rejected'));
  expect(getDocumentFilterLabel('Đang xác minh')).toBe('Đang xử lý · Xác minh');
  expect(getDocumentFilterLabel('processing')).toBe('Đang xử lý');
});

test.each([
  ['pending', 'Chờ xử lý'], ['processing', 'Đang xử lý'],
  ['verification', 'Đang xác minh'], ['digitalSignature', 'Sẵn sàng ký số'],
  ['completed', 'Hoàn tất'], ['rejected', 'Không hợp lệ'], ['invalid', 'Không hợp lệ'],
])('raw %s maps to the compatible filter value without losing rejected records', (raw, expected) => {
  expect(getLegacyDocumentFilterValue(raw)).toBe(expected);
});
