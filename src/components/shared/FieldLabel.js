import React from 'react';
import { Box, FormLabel, Typography } from '@mui/material';

const FieldLabel = ({ htmlFor, label, required = false, disabled = false, error = false, children }) => (
  <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 0.5 }}>
      <FormLabel htmlFor={htmlFor} disabled={disabled} error={error}>{label}</FormLabel>
      {required && <Typography component="span" variant="caption" color="text.secondary" aria-hidden="true">(bắt buộc)</Typography>}
    </Box>
    {children}
  </Box>
);

export default FieldLabel;
