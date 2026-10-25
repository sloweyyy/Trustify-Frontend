import React, { useId, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
function ForgotPasswordModal({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const title = useId();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const validateInputs = () => email.trim() !== '' && /\S+@\S+\.\S+/.test(email);
  const sendResetPassword = async () => {
    if (!validateInputs()) { toast.error('Địa chỉ email không hợp lệ.'); return; }
    setLoading(true);
    try {
      // The existing service resolves with the204 body, not an axios response.
      await AuthService.forgotPassword(email);
      toast.success('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu');
      handleClose();
    } catch (error) {
      toast.error('Chưa gửi được liên kết. Bạn kiểm tra email và kết nối rồi thử lại.');
    } finally { setLoading(false); }
  };
  return <Dialog open={open} onClose={handleClose} fullScreen={mobile} fullWidth maxWidth="sm" aria-labelledby={title} PaperProps={{ component: 'form', noValidate: true, onSubmit: (event) => { event.preventDefault(); if (!loading) sendResetPassword(); } }}>
    <DialogTitle id={title}>Quên mật khẩu</DialogTitle><DialogContent dividers><DialogContentText sx={{ fontSize: '1rem', mb: 3 }}>Nhập email của tài khoản để yêu cầu liên kết đặt lại mật khẩu.</DialogContentText><TextField fullWidth label="Địa chỉ email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading} /></DialogContent><DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& > .MuiButton-root': { width: { xs: '100%', sm: 'auto' } } }}><Button onClick={handleClose}>Hủy</Button><Button type="submit" variant="contained" disabled={loading}>{loading ? 'Đang gửi…' : 'Gửi liên kết'}</Button></DialogActions>
  </Dialog>;
}
export default ForgotPasswordModal;
