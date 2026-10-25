import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import PaymentService from '../../services/payment.service';
import formatVnd from '../../utils/formatVnd';
import { ErrorState, LoadingState } from '../shared/PageFeedback';

const PendingPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setLoading(true); setError(false);
    PaymentService.getMyPayments('pending')
      .then((data) => { if (!Array.isArray(data)) throw new Error('Payments unavailable'); if (active) setPayments(data.filter((payment) => payment.checkoutUrl)); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [retry]);
  if (loading) return <LoadingState label="Đang kiểm tra khoản chờ thanh toán…" />;
  if (error) return <ErrorState title="Chưa thể tải khoản chờ thanh toán" description="Bạn có thể thử tải lại để kiểm tra khoản cần thanh toán." onRetry={() => setRetry((value) => value + 1)} />;
  if (!payments.length) return null;
  return (
    <Box component="section" aria-label="Khoản chờ thanh toán" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {payments.map((payment) => {
        const documentReference = payment.documentId || payment.sessionId;
        const reference = documentReference ?? payment.orderCode ?? payment.id ?? 'Chưa có thông tin';
        return <Alert key={payment.id || payment.orderCode} severity="warning"
          action={<Button color="inherit" variant="outlined" href={payment.checkoutUrl} aria-label={`Thanh toán ${documentReference ? 'hồ sơ' : 'mã'} ${reference}`}>Thanh toán</Button>}>
          <AlertTitle>Chờ thanh toán</AlertTitle>
          <Typography sx={{ overflowWrap: 'anywhere' }}>{documentReference ? 'Hồ sơ' : 'Mã thanh toán'}: {reference}</Typography>
          <Typography sx={{ fontWeight: 600, my: 0.5 }}>{formatVnd(payment.amount)}</Typography>
        </Alert>;
      })}
      <Typography color="text.secondary">Kiểm tra ví tài liệu sau khi hệ thống ghi nhận thanh toán.</Typography>
    </Box>
  );
};
export default PendingPayments;
