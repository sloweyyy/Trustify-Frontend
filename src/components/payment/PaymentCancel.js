import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { CancelRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { red, black, gray } from '../../config/theme/themePrimitives';

const PaymentCancel = ({
  title = 'Thanh toán không thành công',
  message = 'Giao dịch của bạn đã bị hủy hoặc gặp sự cố.',
  subMessage = 'Bạn có thể thử lại hoặc liên hệ với chúng tôi nếu bạn cần hỗ trợ.',
  redirectPath = '/',
  backButtonText = 'Trở về Trang chủ',
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
          <CancelRounded sx={{ color: red[500], fontSize: 64 }} />
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
        <Box>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            sx={{
              p: 1.5,
              borderColor: black[900],
              color: black[900],
              '&:hover': {
                borderColor: black[800],
                backgroundColor: 'transparent',
              },
            }}
            onClick={handleRedirect}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'none' }}>{backButtonText}</Typography>
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PaymentCancel;
