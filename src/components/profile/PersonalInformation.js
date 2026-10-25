import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { EditSharp } from '@mui/icons-material';
import InfoField from './InfoField';
import EditUserProfileModal from '../../components/modals/EditUserProfileModal';
import { useSelector } from 'react-redux';

const PersonalInformation = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    role: '',
    identification: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: '',
    isEmailVerified: false,
    name: '',
    email: '',
    id: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        role: user?.role || '',
        isEmailVerified: user?.isEmailVerified || false,
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
        identification: user?.citizenId || '',
        city: user.address?.province || '',
        district: user.address?.district || '',
        ward: user.address?.town || '',
        street: user.address?.street || '',
      });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, minWidth: 0 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 3 }}>
        <Typography component="h2" variant="h6" sx={{ flex: 1 }}>Thông tin tài khoản</Typography>
        <Button startIcon={<EditSharp />} variant="contained" onClick={() => setOpen(true)}>Chỉnh sửa</Button>
      </Box>
      <EditUserProfileModal open={open} handleClose={handleClose} />
      <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}>
        <InfoField label="Họ và tên" value={formData.name} />
        <InfoField label="Email" value={formData.email} />
        <InfoField label="Số điện thoại" value={formData.phone} />
        <InfoField label="CMND/CCCD/Hộ chiếu" value={formData.identification} />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Typography component="h2" variant="h6" sx={{ mb: 3 }}>Địa chỉ liên hệ</Typography>
      <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 3 }}>
        <InfoField label="Tỉnh/Thành phố" value={formData.city} />
        <InfoField label="Quận/Huyện" value={formData.district} />
        <InfoField label="Xã/Phường" value={formData.ward} />
        <InfoField label="Số nhà, đường/phố" value={formData.street} />
      </Box>
    </Paper>
  );
};
export default PersonalInformation;
