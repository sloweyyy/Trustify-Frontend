import { CloseRounded } from '@mui/icons-material';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography, useMediaQuery } from '@mui/material';
import React, { useState, useEffect, useId } from 'react';
import LabeledTextField from './LabeledTextField';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../stores/actions/userAction';
import 'react-toastify/dist/ReactToastify.css';
import ProvinceSelector from '../profile/ProvinceSelector';

const EditUserProfileModal = ({ open, handleClose }) => {
  const titleId = useId();
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [tempForm, setTempForm] = useState({
    role: '',
    citizenId: '',
    phoneNumber: '',
    province: '',
    district: '',
    town: '',
    street: '',
    isEmailVerified: false,
    name: '',
    email: '',
    id: '',
  });

  useEffect(() => {
    if (open && user) {
      const updatedFormData = {
        role: user?.role || '',
        isEmailVerified: user?.isEmailVerified || false,
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        citizenId: user?.citizenId || '',
        province: user.address?.province || '',
        district: user.address?.district || '',
        town: user.address?.town || '',
        street: user.address?.street || '',
      };
      setTempForm(updatedFormData);
    }
  }, [open, user]);

  const handleInputChange = (field, value) => {
    setTempForm((prev) => {
      const updatedForm = { ...prev, [field]: value };

      if (field === 'province') {
        updatedForm.district = '';
        updatedForm.town = '';
      }
      if (field === 'district') {
        updatedForm.town = '';
      }

      return updatedForm;
    });
  };

  const isFormDataValid = ({ name, citizenId, email, phoneNumber }) => {
    if (!name || !/^[A-Za-zÀ-ỹ\s]+$/.test(name)) {
      toast.error('Vui lòng nhập Họ tên hợp lệ');
      return false;
    }

    if (!email || !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(email)) {
      toast.error('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (citizenId && !/^[0-9]{9}$|^[0-9]{12}$/.test(citizenId)) {
      toast.error('Vui lòng nhập đúng số CCCD');
      return false;
    }

    if (phoneNumber && !/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
      toast.error('Vui lòng nhập đúng Số điện thoại');
      return false;
    }

    return true;
  };

  const handleSaveChanges = async () => {
    if (!isFormDataValid(tempForm)) {
      return;
    } else {
      const updateBody = {};

      Object.entries(tempForm).forEach(([key, value]) => {
        if (
          key !== 'isEmailVerified' &&
          key !== 'id' &&
          key !== 'role' &&
          key !== 'province' &&
          key !== 'district' &&
          key !== 'town' &&
          key !== 'street'
        ) {
          if (value !== '') {
            updateBody[key] = value;
          }
        }
      });

      const address = {};
      if (tempForm.province !== '') address.province = tempForm.province || null;
      if (tempForm.district !== '') address.district = tempForm.district || null;
      if (tempForm.town !== '') address.town = tempForm.town || null;
      if (tempForm.street !== '') address.street = tempForm.street || null;

      if (Object.values(address).some((field) => field !== null)) {
        updateBody.address = address;
      }

      dispatch(updateUser({ id: user.id, updatedUserInfo: updateBody }))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thông tin thành công');
          handleClose();
        })
        .catch(() => {
          toast.error('Cập nhật thông tin thất bại');
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" fullScreen={fullScreen} aria-labelledby={titleId}>
      <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Typography component="h2" variant="h5" id={titleId} sx={{ flex: 1 }}>Cập nhật hồ sơ</Typography>
        <IconButton aria-label="Đóng cập nhật hồ sơ" onClick={handleClose}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography component="h3" variant="h6">Thông tin tài khoản</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <LabeledTextField
              label="Họ và tên"
              autoComplete="name"
              value={tempForm.name}
              onChange={(value) => handleInputChange('name', value)}
            />
            <LabeledTextField
              label="CMND/CCCD"
              inputMode="numeric"
              value={tempForm.citizenId}
              onChange={(value) => handleInputChange('citizenId', value)}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <LabeledTextField
              label="Email"
              type="email" autoComplete="email"
              value={tempForm.email}
              onChange={(value) => handleInputChange('email', value)}
              disabled={tempForm.isEmailVerified}
            />
            <LabeledTextField
              label="Số điện thoại"
              type="tel" inputMode="tel" autoComplete="tel"
              value={tempForm.phoneNumber}
              onChange={(value) => handleInputChange('phoneNumber', value)}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
          <Typography component="h3" variant="h6">Địa chỉ liên hệ</Typography>
          <ProvinceSelector
            city={tempForm.province}
            district={tempForm.district}
            ward={tempForm.town}
            onCityChange={(value) => handleInputChange('province', value)}
            onDistrictChange={(value) => handleInputChange('district', value)}
            onWardChange={(value) => handleInputChange('town', value)}
          />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <LabeledTextField
              label="Số nhà, đường/phố"
              autoComplete="street-address"
              value={tempForm?.street || ''}
              onChange={(value) => handleInputChange('street', value)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, ml: '0 !important' } }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSaveChanges}>Lưu thay đổi</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditUserProfileModal;
