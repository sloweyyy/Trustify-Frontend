import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import AuthPage from '../../components/public/AuthPage';
import Cookies from 'js-cookie';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const token = Cookies.get('resetPasswordToken');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password === '') {
      toast.error('Vui lòng nhập mật khẩu mới');
      return;
    } else if (password.length < 8) {
      toast.error('Mật khẩu phải chứa ít nhất 8 ký tự');
      return;
    } else if (password !== confirmPassword) {
      toast.error('Mật khẩu không khớp. Vui lòng nhập lại.');
      return;
    } else if (!/\d/.test(password) || !/\d/.test(confirmPassword)) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ ký tự chữ và số.');
      return;
    }

    try {
      setLoading(true);
      await AuthService.resetPassword(token, password);
      toast.success('Đổi mật khẩu thành công');
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2500);
    } catch (error) {
      if (error.status === 401) {
        toast.error('Yêu cầu hết hạn. Vui lòng thử lại');
        setTimeout(() => {
          window.location.href = '/forgot-password';
        }, 3000);
      }
      setLoading(false);
    }
  };

  return <AuthPage><Box><Typography component="h1" variant="h4">Đặt lại mật khẩu</Typography><Typography color="text.secondary" sx={{ my: 2 }}>Mật khẩu mới cần có ít nhất 8 ký tự và một chữ số từ 0 đến 9.</Typography>
      <Box component="form" noValidate onSubmit={(event) => { event.preventDefault(); if (!loading) handleResetPassword(); }} sx={{ display: 'grid', gap: 3 }}>
        <TextField fullWidth label="Mật khẩu mới" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={loading} />
        <TextField fullWidth label="Xác nhận mật khẩu" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={loading} />
        <Button fullWidth type="submit" variant="contained" disabled={loading || password === '' || confirmPassword === ''}>{loading ? 'Đang đặt lại mật khẩu…' : 'Đặt lại mật khẩu'}</Button>
      </Box><Link href="/signin" sx={{ display: 'inline-flex', alignItems: 'center', mt: 2, minHeight: 44 }}>Trở về đăng nhập</Link></Box></AuthPage>;
};
export default ResetPassword;
