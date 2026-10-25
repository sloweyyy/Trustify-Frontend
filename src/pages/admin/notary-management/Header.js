import React from 'react';
import { Box, Typography } from '@mui/material';
const Header = () => <Box sx={{ p: { xs: 2, md: 3 } }}><Typography component="h1" variant="h4">Quản lý công chứng</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Tra cứu hồ sơ và phiên công chứng theo dữ liệu được ghi nhận.</Typography></Box>;
export default Header;
