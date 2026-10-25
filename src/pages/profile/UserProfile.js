import React from 'react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import PersonalInformation from '../../components/profile/PersonalInformation';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const initial = user?.name?.trim().split(/\s+/).pop()?.charAt(0).toLocaleUpperCase('vi-VN') || '?';
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, minWidth: 0 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>Thông tin cá nhân</Typography>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 3, display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Avatar aria-hidden="true" sx={{ width: 64, height: 64, bgcolor: 'primary.main', color: 'primary.contrastText' }}>{initial}</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h2" variant="h5" sx={{ overflowWrap: 'anywhere' }}>{user?.name || 'Tài khoản của bạn'}</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Xem và cập nhật thông tin tài khoản của bạn.</Typography>
        </Box>
      </Paper>
      <PersonalInformation />
    </Box>
  );
};
export default UserProfile;
