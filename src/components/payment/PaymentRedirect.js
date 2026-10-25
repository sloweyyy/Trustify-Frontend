import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { LoadingState } from '../shared/PageFeedback';
import PaymentSuccess from './PaymentSuccess';
import PaymentCancel from './PaymentCancel';
import PaymentService from '../../services/payment.service';

const PaymentRedirect = ({ successRedirectPath = '/', cancelRedirectPath = '/', onRetry = null }) => {
  const [status, setStatus] = useState('loading');
  const location = useLocation();
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
      <Box sx={{ width: '100%', minHeight: '40vh', display: 'grid', placeItems: 'center' }}>
        <LoadingState label="Đang đọc kết quả thanh toán…" />
      </Box>
    );
  }

  if (status === 'success') {
    return <PaymentSuccess redirectPath={successRedirectPath} />;
  }

  return <PaymentCancel redirectPath={cancelRedirectPath} onRetry={onRetry} />;
};

export default PaymentRedirect;
