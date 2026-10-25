import React from 'react';
import { Box, Typography } from '@mui/material';
const Header = () => (
  <Box sx={{ p: { xs: 2, md: 3 }, pb: 1 }}>
    <Typography component="h1" variant="h4">Tổng quan quản trị</Typography>
    <Typography color="text.secondary" sx={{ mt: 1 }}>Theo dõi hồ sơ, phiên công chứng và doanh thu theo từng kỳ.</Typography>
  </Box>
);
export default Header;
