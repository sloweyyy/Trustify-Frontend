import React from 'react';
import { Box, Typography } from '@mui/material';

const InfoField = ({ label, value }) => (
  <Box sx={{ minWidth: 0 }}>
    <Typography component="dt" color="text.secondary" sx={{ mb: 0.5 }}>{label}</Typography>
    <Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value === '' || value == null ? 'Chưa có thông tin' : value}</Typography>
  </Box>
);
export default InfoField;
