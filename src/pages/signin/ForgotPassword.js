import React, { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import AuthPage from '../../components/public/AuthPage';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleForgotPassword = async () => {
    if (email === '') {
      console.log('Vui lòng nhập email');
      toast.error('Vui lòng nhập email hợp lệ');
      return;
    }
    if (!validateEmail(email)) {
      console.log('Email không hợp lệ');
      toast.error('Email không hợp lệ');
      return;
    }

    try {
      setLoading(true);

      await AuthService.forgotPassword(email);
      toast.success('Vui lòng kiểm tra email của bạn để cài đặt lại mật khẩu');

      setLoading(false);
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch (error) {
      toast.error('Chưa gửi được liên kết. Bạn kiểm tra email và kết nối rồi thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return <AuthPage><Box><Typography component="h1" variant="h4">Quên mật khẩu</Typography><Typography color="text.secondary" sx={{ my: 2 }}>Nhập email của tài khoản để yêu cầu liên kết đặt lại mật khẩu.</Typography>
      <Box component="form" noValidate onSubmit={(event) => { event.preventDefault(); if (!loading) handleForgotPassword(); }} sx={{ display: 'grid', gap: 3 }}>
        <TextField fullWidth label="Email" type="email" autoComplete="email" inputProps={{ inputMode: 'email' }} value={email} onChange={(event) => setEmail(event.target.value)} disabled={loading} />
        <Button fullWidth type="submit" variant="contained" disabled={loading}>{loading ? 'Đang gửi yêu cầu…' : 'Gửi liên kết đặt lại mật khẩu'}</Button>
      </Box><Link href="/signin" sx={{ display: 'inline-flex', alignItems: 'center', mt: 2, minHeight: 44 }}>Trở về đăng nhập</Link></Box></AuthPage>;
};
export default ForgotPassword;
