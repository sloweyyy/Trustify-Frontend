import { createTheme } from '@mui/material/styles';
import tokens from './tokens.json';
import { DOCUMENT_STATES } from '../../utils/documentStatus';

// Preserve direct imports until their owning screens migrate to semantic tokens.
export { primary, dark, gray, green, red, yellow, blue, black, white } from './legacyPrimitives';
export const scales = tokens.scales;
const defaultShadows = createTheme().shadows;
const heading = (mobile, desktop, lineHeight = 1.4) => ({
  fontSize: `${mobile / 16}rem`, fontWeight: 600, lineHeight,
  '@media (min-width:900px)': { fontSize: `${desktop / 16}rem` },
});
const body = { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 };
const caption = { fontSize: '.875rem', fontWeight: 400, lineHeight: 1.6 };

export const getDesignTokens = (requestedMode = 'light') => {
  const mode = requestedMode === 'dark' ? 'dark' : 'light';
  const colors = tokens.modes[mode];
  const status = Object.fromEntries(Object.entries(tokens.semantic[mode]).map(([key, value]) => [key, { ...value }]));
  const semanticPalette = (name) => ({
    main: status[name].fg, light: mode === 'dark' ? status[name].fg : status[name].bg,
    dark: mode === 'dark' ? status[name].bg : scales[name][900],
    contrastText: mode === 'dark' ? status[name].bg : '#FFFFFF',
  });
  const shadows = [...defaultShadows];
  shadows[1] = `0 2px 8px rgba(0,0,0,${mode === 'dark' ? '.30' : '.08'})`;
  shadows[4] = `0 8px 24px rgba(0,0,0,${mode === 'dark' ? '.40' : '.14'})`;
  shadows[8] = `0 16px 48px rgba(0,0,0,${mode === 'dark' ? '.50' : '.20'})`;
  return {
    spacing: tokens.spacingBasePx,
    breakpoints: { values: { ...tokens.breakpoints } },
    shape: { borderRadius: tokens.radius.control },
    shadows,
    palette: {
      mode,
      primary: { main: colors.primary, light: mode === 'dark' ? colors.primaryHover : scales.brand[200], dark: colors.primaryPressed, contrastText: colors.onPrimary },
      secondary: { main: colors.primary, light: colors.selected, dark: colors.primaryPressed, contrastText: colors.onPrimary },
      info: semanticPalette('info'), warning: semanticPalette('warning'),
      success: semanticPalette('success'), error: semanticPalette('error'),
      grey: { ...scales.neutral }, divider: colors.divider,
      background: { default: colors.background, paper: colors.surface },
      text: { primary: colors.text, secondary: colors.muted, disabled: colors.disabledText, warning: status.warning.fg },
      action: { active: colors.text, hover: colors.subtle, selected: colors.selected, disabled: colors.disabledText, disabledBackground: colors.disabledBg },
    },
    typography: {
      fontFamily: "'Be Vietnam Pro', Arial, sans-serif",
      fontWeightRegular: 400, fontWeightMedium: 600, fontWeightBold: 600,
      h1: heading(32, 48), h2: heading(28, 36), h3: heading(24, 28),
      h4: heading(22, 24, 1.45), h5: heading(20, 22, 1.45), h6: heading(18, 20, 1.5),
      subtitle1: { ...body, fontSize: '1.125rem', fontWeight: 600 },
      subtitle2: { ...body, fontWeight: 600 },
      body1: { ...body, fontSize: '1.125rem', lineHeight: 1.65 }, body2: { ...body },
      button: { ...body, fontWeight: 600, textTransform: 'none' },
      caption: { ...caption }, overline: { ...caption, fontWeight: 600, textTransform: 'none' },
      // Temporary aliases preserve existing Typography callers.
      body3: { ...body }, body4: { ...body, fontWeight: 600 }, body5: { ...caption },
      caption1: { ...caption }, caption2: { ...caption, fontWeight: 600 }, caption3: { ...caption },
      label: { ...body, fontWeight: 600 },
    },
    trustify: {
      ...colors, status,
      radius: { ...tokens.radius }, touch: { ...tokens.touch },
      surface: { subtle: colors.subtle },
      documentStates: Object.fromEntries(Object.entries(DOCUMENT_STATES).map(([key, value]) => [key, { ...value }])),
    },
  };
};
export default getDesignTokens;
