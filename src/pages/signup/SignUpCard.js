import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { GoogleIcon } from './CustomIcons';
import AuthService from '../../services/auth.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../services/auth.service';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0,
  padding: theme.spacing(3), gap: theme.spacing(2), boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
}));

export default function SignUpCard() {
  const [emailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    try {
      await AuthService.register(data.get('name'), data.get('email'), data.get('password'));
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.');
      navigate('/signin/');
    } catch (error) {
      if (error.code === 400) {
        toast.error('Email đã tồn tại');
      } else {
        toast.error('Chưa đăng ký được tài khoản. Bạn kiểm tra thông tin rồi thử lại.');
      }
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        Đăng ký
      </Typography>
      <Box
        component="form"
        aria-label="Biểu mẫu đăng ký"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Họ và tên</FormLabel>
          <TextField
            error={nameError}
            helperText={nameErrorMessage}
            id="name"
            type="text"
            name="name"
            placeholder="Nguyễn Văn A"
            autoComplete="name"
            required
            fullWidth
            variant="outlined"
            color={nameError ? 'error' : 'primary'}
            onChange={(e) => setNameErrorMessage('')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="tenban@example.com"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            onChange={(e) => setEmailErrorMessage('')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
            onChange={(e) => setPasswordErrorMessage('')}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Đăng ký
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Đã có tài khoản?{' '}
          <span>
            <Link href="/signin/" variant="body2" sx={{ alignSelf: 'center' }}>
              Đăng nhập
            </Link>
          </span>
        </Typography>
      </Box>
      <Divider>hoặc</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button type="submit" fullWidth variant="outlined" onClick={() => signInWithGoogle()} startIcon={<GoogleIcon />}>
          Đăng ký với Google
        </Button>
      </Box>
    </Card>
  );
}
