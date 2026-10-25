import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import BrandLogo from '../BrandLogo';
const AuthPage = ({ children }) => <Container maxWidth="md" sx={{ py: { xs: 3, md: 7 } }}><Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1.2fr)' }, alignItems: 'start', gap: 4 }}>
  <Box sx={{ pt: { md: 4 } }}><BrandLogo width={160} /><Typography component="p" variant="h4" sx={{ mt: 3, fontWeight: 600 }}>Hồ sơ rõ ràng.<br />An tâm từng bước.</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>Đăng nhập để gửi hồ sơ, theo dõi tiến độ và xem tài liệu được cấp.</Typography></Box>
  <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, minWidth: 0, '& > .MuiCard-root': { p: 0, width: '100%', boxShadow: 'none', border: 0 }, '& form': { minWidth: 0 } }}>{children}</Paper>
</Box></Container>;
export default AuthPage;
