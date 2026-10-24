export const focusRing = (theme) => ({
  outline: `3px solid ${theme.trustify.focus}`,
  outlineOffset: 2,
});

export const severityStyle = (theme, severity) => {
  const colors = theme.trustify.status[severity];
  return { color: colors.fg, backgroundColor: colors.bg, borderColor: colors.border };
};
