import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import PaymentService from '../../services/payment.service';

const formatVnd = (amount) => `${Number(amount || 0).toLocaleString('vi-VN')} VNĐ`;

// Lists the user's unpaid notarizations with a link to checkout (the same link is also emailed).
const PendingPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    let active = true;
    PaymentService.getMyPayments('pending')
      .then((data) => active && setPayments((data || []).filter((p) => p.checkoutUrl)))
      .catch(() => active && setPayments([]));
    return () => {
      active = false;
    };
  }, []);

  if (!payments.length) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 3, pt: 2 }}>
      {payments.map((payment) => (
        <Alert
          key={payment.id || payment.orderCode}
          severity="warning"
          action={
            <Button color="inherit" size="small" variant="outlined" href={payment.checkoutUrl}>
              Thanh toán
            </Button>
          }
        >
          <Typography variant="body2">
            Hồ sơ {payment.documentId || payment.sessionId} đã được công chứng và đang chờ thanh toán (
            {formatVnd(payment.amount)}). Sau khi thanh toán, tài liệu sẽ được lưu vào ví dưới dạng NFT.
          </Typography>
        </Alert>
      ))}
    </Box>
  );
};

export default PendingPayments;
