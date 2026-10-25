import React, { useState, useEffect, useCallback, useId } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import UserService from '../../../services/user.service';
import AccountFields from '../../../components/admin/AccountFields';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
const EmployeeDetailModal = ({ open, handleClose, employeeId }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = useId();
  const [error, setError] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    phone: '',
    name: '',
    email: '',
    id: '',
    createdAt: '',
    citizenId: '',
    address: {
      street: '',
      town: '',
      district: '',
      province: '',
    }
  });

  const getEmployeeInfo = useCallback(async () => {
    setLoadingInfo(true);
    setError(false);
    try {
      const response = await UserService.getUserById(employeeId);
      const date = new Date(response.createdAt);
      const startDate = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const citizenId = (response.citizenId) ? response.citizenId : '';
      const street = (response.address) ? response.address.street : '';
      const town = (response.address) ? response.address.town : '';
      const district = (response.address) ? response.address.district : '';
      const province = (response.address) ? response.address.province : '';

      let  role;

      if (response.role === 'notary') role = 'Công chứng viên';
      if (response.role === 'secretary') role = 'Thư ký';

      setFormData({
        role: role || '',
        name: response.name || '',
        email: response.email || '',
        id: response.id || '',
        createdAt: startDate || '',
        phone: response.phoneNumber || '',
        citizenId: citizenId || '',
        address: {
          street: street || '',
          town: town || '',
          district: district || '',
          province: province || '',
        },
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoadingInfo(false);
    }
  }, [employeeId]
)

  useEffect(() => {
    if (open) {
      setTabValue(0); 
      getEmployeeInfo();
    }
  }, [open, getEmployeeInfo]);

  const handleTabChange = (event, newIndex) => {
    setTabValue(newIndex);
  };

  const personal = [['Họ và tên', formData.name], ['CMND/CCCD', formData.citizenId], ['Email', formData.email], ['Số điện thoại', formData.phone], ['Tỉnh/Thành phố', formData.address.province], ['Quận/Huyện', formData.address.district], ['Xã/Phường', formData.address.town], ['Số nhà, đường/phố', formData.address.street]];
  const professional = [['Mã tài khoản nhân viên', formData.id], ['Vị trí công việc', formData.role], ['Ngày tạo tài khoản', formData.createdAt]];
  return <Dialog open={open} onClose={handleClose} fullScreen={mobile} fullWidth maxWidth="md" aria-labelledby={titleId}>
    <DialogTitle id={titleId}>Thông tin nhân viên</DialogTitle>
    <DialogContent dividers>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="Nhóm thông tin nhân viên" sx={{ mb: 3 }}><Tab id={`${titleId}-tab-0`} aria-controls={`${titleId}-panel-0`} label="Thông tin cá nhân" /><Tab id={`${titleId}-tab-1`} aria-controls={`${titleId}-panel-1`} label="Thông tin nghề nghiệp" /></Tabs>
      {loadingInfo ? <LoadingState label="Đang tải thông tin nhân viên…" /> : error ? <ErrorState title="Chưa thể tải thông tin nhân viên" description="Vui lòng thử lại để tải thông tin tài khoản." onRetry={getEmployeeInfo} /> : [personal, professional].map((fields, index) => <div key={index} role="tabpanel" hidden={tabValue !== index} id={`${titleId}-panel-${index}`} aria-labelledby={`${titleId}-tab-${index}`}>{tabValue === index && <AccountFields fields={fields} />}</div>)}
    </DialogContent>
    <DialogActions><Button variant="outlined" onClick={handleClose}>Đóng</Button></DialogActions>
  </Dialog>;
};
export default EmployeeDetailModal;
