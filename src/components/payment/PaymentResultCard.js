import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { InfoOutlined, TaskAltRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PaymentResultCard = ({ success = false, title, message, subMessage, redirectPath, buttonText }) => {
  const navigate = useNavigate();
  const Icon = success ? TaskAltRounded : InfoOutlined;

  return (
    <Paper component="section" aria-labelledby="payment-result-title" variant="outlined"
      sx={{ width: '100%', maxWidth: 560, mx: 'auto', p: { xs: 3, sm: 4 } }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Box sx={{ display: 'grid', placeItems: 'center', width: 72, height: 72, borderRadius: '50%', bgcolor: success ? 'success.light' : 'warning.light' }}>
          <Icon aria-hidden="true" sx={{ fontSize: 40, color: success ? 'success.dark' : 'warning.dark' }} />
        </Box>
        <Stack spacing={1.5}>
          <Typography component="h1" variant="h4" id="payment-result-title">{title}</Typography>
          <Typography color="text.secondary">{message}</Typography>
        </Stack>
        <Box sx={{ width: '100%', borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography color="text.secondary">{subMessage}</Typography>
        </Box>
        <Button fullWidth size="large" variant="contained" onClick={() => navigate(redirectPath)}>{buttonText}</Button>
      </Stack>
    </Paper>
  );
};

export default PaymentResultCard;
