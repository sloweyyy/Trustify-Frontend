import React, { useState, useEffect, useCallback, useId } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import UserService from '../../../services/user.service';
import AccountFields from '../../../components/admin/AccountFields';
import { EmptyState, ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
const EditUserProfileModal = ({ open, handleClose, userId }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = useId();
  const [error, setError] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [userData, setUserData] = useState({
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

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await UserService.getUserById(userId);
      setUserData({
        role: response?.role || '',
        isEmailVerified: response?.isEmailVerified || false,
        name: response?.name || '',
        email: response?.email || '',
        phone: response?.phoneNumber || '',
        identification: response?.citizenId || '',
        city: response.address?.province || '',
        district: response.address?.district || '',
        ward: response.address?.town || '',
        street: response.address?.street || '',
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (open) {
      fetchUserData();
    }
  }, [open, fetchUserData]);

  const fields = [['Họ và tên', userData.name], ['CMND/CCCD', userData.identification], ['Email', userData.email], ['Số điện thoại', userData.phone], ['Tỉnh/Thành phố', userData.city], ['Quận/Huyện', userData.district], ['Xã/Phường', userData.ward], ['Số nhà, đường/phố', userData.street]];
  return <Dialog open={open} onClose={handleClose} fullScreen={mobile} fullWidth maxWidth="md" aria-labelledby={titleId}>
    <DialogTitle id={titleId}>Thông tin người dùng</DialogTitle>
    <DialogContent dividers>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="Nhóm thông tin người dùng" sx={{ mb: 3 }}><Tab id={`${titleId}-tab-0`} aria-controls={`${titleId}-panel-0`} label="Thông tin cá nhân" /><Tab id={`${titleId}-tab-1`} aria-controls={`${titleId}-panel-1`} label="Tài liệu công chứng" /></Tabs>
      <div role="tabpanel" hidden={tabValue !== 0} id={`${titleId}-panel-0`} aria-labelledby={`${titleId}-tab-0`}>{tabValue === 0 && (loading ? <LoadingState label="Đang tải thông tin người dùng…" /> : error ? <ErrorState title="Chưa thể tải thông tin người dùng" description="Vui lòng thử lại để tải thông tin tài khoản." onRetry={fetchUserData} /> : <AccountFields fields={fields} />)}</div>
      <div role="tabpanel" hidden={tabValue !== 1} id={`${titleId}-panel-1`} aria-labelledby={`${titleId}-tab-1`}>{tabValue === 1 && <><EmptyState title="Chưa có dữ liệu tài liệu tại đây" description="Màn hình này chưa cung cấp tài liệu theo người dùng. Bạn có thể tra cứu tại Quản lý công chứng." /><Button href="/admin/notary-management" variant="outlined">Mở Quản lý công chứng</Button></>}</div>
    </DialogContent>
    <DialogActions><Button variant="outlined" onClick={handleClose}>Đóng</Button></DialogActions>
  </Dialog>;
};
export default EditUserProfileModal;
