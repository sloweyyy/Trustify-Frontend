import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Alert, Button } from '@mui/material';
import createTrustifyTheme, { getTrustifyThemeOptions } from './createTrustifyTheme';
import getAuthTheme from './getAuthTheme';
import { primary, gray } from './themePrimitives';

const luminance = (hex) => {
  const channels = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (values[1] + 0.05) / (values[0] + 0.05);
};

describe('Trustify theme integration', () => {
  test.each(['light', 'dark'])('%s keeps readable text and distinguishable control boundaries', mode => {
    const theme = createTrustifyTheme(mode);
    const t = theme.trustify;
    [t.background, t.surface.subtle, theme.palette.background.paper].forEach(bg => {
      [theme.palette.text.primary, theme.palette.text.secondary, t.link].forEach(fg => expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5));
      expect(contrast(t.focus, bg)).toBeGreaterThanOrEqual(3);
    });
    [t.primary, t.primaryHover, t.primaryPressed].forEach(bg => expect(contrast(t.onPrimary, bg)).toBeGreaterThanOrEqual(4.5));
    Object.values(t.status).forEach(({ fg, bg }) => expect(contrast(fg, bg)).toBeGreaterThanOrEqual(4.5));
    expect(contrast(t.inputBorder, theme.palette.background.paper)).toBeGreaterThanOrEqual(3);
  });

  test('app and existing auth providers receive all five override groups', () => {
    const app = getTrustifyThemeOptions();
    expect(getAuthTheme().components).toEqual(app.components);
    ['MuiButton', 'MuiChip', 'MuiAlert', 'MuiMenuItem', 'MuiCard', 'MuiDataGrid', 'MuiCssBaseline'].forEach(key => expect(app.components[key]).toBeDefined());
  });

  test('creating another mode cannot mutate a previous theme or the spacing contract', () => {
    const light = createTrustifyTheme();
    const snapshot = JSON.stringify({ palette: light.palette, shadows: light.shadows });
    createTrustifyTheme('dark');
    expect(JSON.stringify({ palette: light.palette, shadows: light.shadows })).toEqual(snapshot);
    expect(light.spacing(2)).toEqual('16px');
    expect(light.spacing(0.5)).toEqual('4px');
    expect(light.shadows).toHaveLength(25);
    // These legacy raw imports remain in many screens, separate from new semantic tokens.
    expect(primary[500]).toEqual('#AA1D39');
    expect(gray[500]).toEqual('#6D717F');
  });

  test('default input modes stay light; raw lifecycle keys are preserved', () => {
    expect(createTrustifyTheme().palette.mode).toEqual('light');
    expect(createTrustifyTheme('unsupported').palette.mode).toEqual('light');
    const states = createTrustifyTheme().trustify.documentStates;
    expect(Object.keys(states)).toEqual(['pending', 'processing', 'verification', 'digitalSignature', 'completed', 'rejected']);
    expect(states.verification.label).toEqual(states.processing.label);
    expect(states.verification.detail).toEqual('Bước xác minh');
  });

  test('a destructive outlined button retains its intent color', () => {
    render(<ThemeProvider theme={createTrustifyTheme()}><Button variant="outlined" color="error">Từ chối hồ sơ</Button></ThemeProvider>);
    expect(screen.getByRole('button', { name: 'Từ chối hồ sơ' })).toHaveStyle({ color: '#B42318', borderColor: '#B42318' });
  });

  test('an informational alert no longer inherits warning colors, and small buttons remain touchable', () => {
    render(<ThemeProvider theme={createTrustifyTheme()}><Alert severity="info">Đang xử lý</Alert><Alert severity="warning">Chờ thanh toán</Alert><Button size="small">Tiếp tục</Button></ThemeProvider>);
    expect(screen.getByText('Đang xử lý').closest('[role="alert"]')).toHaveStyle({ backgroundColor: '#EDF4FC', color: '#245C9A' });
    expect(screen.getByText('Chờ thanh toán').closest('[role="alert"]')).toHaveStyle({ backgroundColor: '#FFF3D6', color: '#805300' });
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toHaveStyle({ minHeight: '44px' });
  });
});
