import React from 'react';
import { Box, Typography } from '@mui/material';
const AccountFields = ({ fields }) => <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
  {fields.map(([label, value]) => <Box key={label}><Typography component="dt" color="text.secondary">{label}</Typography><Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value || 'Chưa có thông tin'}</Typography></Box>)}
</Box>;
export default AccountFields;
