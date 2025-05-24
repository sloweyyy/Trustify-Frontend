import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { primary, black } from '../../config/theme/themePrimitives';
import PaymentSuccess from './PaymentSuccess';
import PaymentCancel from './PaymentCancel';
import PaymentService from '../../services/payment.service';

const PaymentRedirect = ({ successRedirectPath = '/', cancelRedirectPath = '/', onRetry = null }) => {
  const [status, setStatus] = useState('loading');
  const location = useLocation();
  const navigate = useNavigate();
  const hasUpdatedPayment = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('status');
    const paymentId = params.get('orderCode');

    let timer;

    const updatePaymentInDatabase = async (orderCode, status) => {
      try {
        if (!hasUpdatedPayment.current) {
          hasUpdatedPayment.current = true;
          await PaymentService.updatePaymentStatus(orderCode, status);
        }
      } catch (error) {
        console.error('Failed to update payment status:', error);
      }
    };

    if (paymentStatus === 'PAID' && paymentId) {
      updatePaymentInDatabase(paymentId, 'PAID');
      setStatus('success');
    } else if (paymentStatus === 'CANCELLED' || paymentStatus === 'ERROR') {
      if (paymentId) {
        updatePaymentInDatabase(paymentId, 'CANCELLED');
      }
      setStatus('cancel');
    } else {
      timer = setTimeout(() => {
        setStatus('cancel');
      }, 1500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [location.search]);

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          gap: 3,
          p: 3,
        }}
      >
        <CircularProgress size={60} sx={{ color: primary[500] }} />
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: black[700], textAlign: 'center' }}>
          Đang xử lý giao dịch của bạn...
        </Typography>
      </Box>
    );
  }

  if (status === 'success') {
    return <PaymentSuccess redirectPath={successRedirectPath} />;
  }

  return <PaymentCancel redirectPath={cancelRedirectPath} onRetry={onRetry} />;
};

export default PaymentRedirect;
