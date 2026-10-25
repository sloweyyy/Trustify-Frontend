import React from 'react';
import { Box, Typography } from '@mui/material';
const Header = () => <Box sx={{ p: { xs: 2, md: 3 } }}><Typography component="h1" variant="h4">Quản lý người dùng</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Tra cứu tài khoản và xem hồ sơ công chứng của người dùng.</Typography></Box>;
export default Header;
