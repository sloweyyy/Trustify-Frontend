import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { TaskAltRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { green, black, white, gray } from '../../config/theme/themePrimitives';

const PaymentSuccess = ({
  title = 'Thanh toán thành công',
  message = 'Giao dịch của bạn đã được xử lý thành công.',
  subMessage = 'Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Bạn sẽ sớm nhận được email xác nhận giao dịch.',
  redirectPath = '/',
  buttonText = 'Trở về Trang chủ',
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(redirectPath);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        borderRadius: 2,
        border: `1px solid ${gray[200]}`,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 4,
        }}
      >
        {/* Header with icon and title */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TaskAltRounded sx={{ color: green[500], fontSize: 64 }} />
          <Typography sx={{ fontSize: 24, fontWeight: 600, color: black[900], textAlign: 'center' }}>{title}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: black[500], textAlign: 'center' }}>{message}</Typography>
        </Box>

        {/* Main content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: `1px solid ${gray[100]}`,
            pt: 3,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[500], textAlign: 'center' }}>
            {subMessage}
          </Typography>
        </Box>

        {/* Action button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            p: 1.5,
            backgroundColor: black[900],
            '&:hover': {
              backgroundColor: black[800],
            },
          }}
          onClick={handleRedirect}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none', color: white[50] }}>
            {buttonText}
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default PaymentSuccess;
