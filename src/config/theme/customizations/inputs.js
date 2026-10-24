import { lighten } from '@mui/material/styles';
import { focusRing } from '../themeHelpers';

export const inputsCustomizations = {
  MuiButtonBase: {
    defaultProps: { disableRipple: true },
    styleOverrides: { root: ({ theme }) => ({
      '&:focus-visible, &.Mui-focusVisible': focusRing(theme),
      '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
    }) },
  },
  MuiButton: {
    styleOverrides: { root: ({ theme }) => ({
      minHeight: 48, padding: '10px 20px', borderRadius: theme.shape.borderRadius,
      fontSize: '1rem', fontWeight: 600, lineHeight: 1.6, textTransform: 'none',
      boxShadow: 'none', backgroundImage: 'none', whiteSpace: 'normal',
      transition: 'background-color 120ms ease, border-color 120ms ease',
      '&:hover': { boxShadow: 'none' },
      '&.Mui-disabled': { color: theme.trustify.disabledText, backgroundColor: theme.trustify.disabledBg },
      variants: [
        { props: { size: 'small' }, style: { minHeight: 44, padding: '8px 16px' } },
        { props: { size: 'large' }, style: { minHeight: 52, padding: '12px 24px' } },
        ...['primary', 'secondary'].map(color => ({ props: { variant: 'contained', color }, style: {
          color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main,
          '&:hover': { backgroundColor: theme.trustify.primaryHover },
          '&:active': { backgroundColor: theme.trustify.primaryPressed },
        } })),
        { props: { variant: 'outlined' }, style: {
          color: theme.palette.text.primary, borderColor: theme.trustify.inputBorder,
          '&:hover': { backgroundColor: theme.trustify.subtle, borderColor: theme.trustify.inputBorder },
        } },
        { props: { variant: 'text' }, style: {
          color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.trustify.subtle },
        } },
        ...['info', 'warning', 'success', 'error'].map(color => ({
          props: { color, variant: 'contained' },
          style: { color: theme.palette[color].contrastText, backgroundColor: theme.palette[color].main,
            '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? lighten(theme.palette[color].main, 0.08) : theme.palette[color].dark },
            '&:active': { backgroundColor: theme.palette.mode === 'dark' ? lighten(theme.palette[color].main, 0.16) : theme.palette[color].dark } },
        })),
        // Intent colors must win over the neutral outlined/text defaults.
        ...['info', 'warning', 'success', 'error'].flatMap(color => ['outlined', 'text'].map(variant => ({
          props: { color, variant },
          style: { color: theme.palette[color].main, ...(variant === 'outlined' && { borderColor: theme.palette[color].main }),
            '&:hover': { backgroundColor: theme.trustify.status[color].bg } },
        }))),
      ],
    }) },
  },
  MuiIconButton: {
    styleOverrides: { root: ({ theme }) => ({
      minWidth: 44, minHeight: 44, borderRadius: theme.shape.borderRadius,
      color: theme.palette.text.primary,
      '&:hover': { backgroundColor: theme.trustify.subtle },
      '&:focus-visible, &.Mui-focusVisible': focusRing(theme),
    }) },
  },
  MuiTextField: { defaultProps: { variant: 'outlined' } },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({ fontSize: '1rem', lineHeight: 1.6, color: theme.palette.text.primary }),
      input: ({ theme }) => ({
        '&::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
        '&.Mui-disabled': { WebkitTextFillColor: theme.palette.text.disabled },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 52, borderRadius: theme.shape.borderRadius, backgroundColor: theme.palette.background.paper,
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.text.primary },
        '&.Mui-focused': focusRing(theme),
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.trustify.focus },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.error.main },
        '&.Mui-disabled': { backgroundColor: theme.trustify.disabledBg },
        variants: [{ props: { size: 'small' }, style: { minHeight: 44 } }],
      }),
      input: { padding: '13px 16px', '&.MuiInputBase-inputSizeSmall': { padding: '9px 12px' } },
      multiline: { padding: '12px 16px', '& textarea': { padding: 0 } },
      notchedOutline: ({ theme }) => ({ borderColor: theme.trustify.inputBorder, '& legend': { fontSize: '1em' } }),
    },
  },
  MuiInputLabel: { styleOverrides: { root: {
    fontSize: '1rem', lineHeight: 1.6,
    '&.MuiInputLabel-outlined.MuiInputLabel-shrink': { transform: 'translate(14px, -12px) scale(1)' },
  } } },
  MuiFormLabel: { styleOverrides: { root: ({ theme }) => ({ fontSize: '1rem', fontWeight: 600, lineHeight: 1.6, color: theme.palette.text.primary }) } },
  MuiFormHelperText: { styleOverrides: { root: { fontSize: '.875rem', lineHeight: 1.6, margin: '4px 0 0' } } },
  MuiFormControlLabel: { styleOverrides: { root: { minHeight: 44, marginLeft: 0 }, label: { fontSize: '1rem', lineHeight: 1.6 } } },
  MuiCheckbox: { styleOverrides: { root: { minWidth: 44, minHeight: 44, padding: 10, '& .MuiSvgIcon-root': { fontSize: 24 } } } },
  MuiRadio: { styleOverrides: { root: { minWidth: 44, minHeight: 44, padding: 10 } } },
  MuiSwitch: { styleOverrides: { root: { minHeight: 44 }, switchBase: ({ theme }) => ({ '&.Mui-focusVisible': focusRing(theme) }) } },
  MuiInputAdornment: { styleOverrides: { root: ({ theme }) => ({ color: theme.palette.text.secondary }) } },
  MuiAutocomplete: { styleOverrides: { inputRoot: { minHeight: 52 }, popupIndicator: { minWidth: 44, minHeight: 44 }, clearIndicator: { minWidth: 44, minHeight: 44 } } },
  MuiToggleButton: { styleOverrides: { root: ({ theme }) => ({
    minHeight: 44, fontSize: '1rem', textTransform: 'none', padding: '8px 16px',
    '&.Mui-selected': { color: theme.trustify.onSelected, backgroundColor: theme.trustify.selected },
  }) } },
  MuiToggleButtonGroup: { styleOverrides: { root: { borderRadius: 8 } } },
};
