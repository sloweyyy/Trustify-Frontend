import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NotaryAnalyticsSession from '../../components/notary/NotaryAnalyticsSession';
import RecentlyDocuments from '../../components/notary/RecentlyDocuments';

const NotaryDashboard = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 3 }, gap: 3, minWidth: 0 }}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, gap: 2 }}>
      <Box sx={{ flex: 1 }}><Typography component="h1" variant="h4">Tổng quan công chứng</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Theo dõi yêu cầu và mở hồ sơ cần xử lý.</Typography></Box>
      <Button component={Link} to="/notary/pending-notarization-documents" variant="contained">Xem hồ sơ chờ xác nhận</Button>
    </Box>
    <NotaryAnalyticsSession />
    <RecentlyDocuments />
  </Box>
);
export default NotaryDashboard;
