import React from 'react';
import { Container, Box } from '@mui/material';
import { PaymentRedirect } from '../../components/payment';

const PaymentRedirectPage = () => {
  const handleRetry = () => {
    window.location.href = '/checkout';
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '80vh',
          py: 4,
        }}
      >
        <PaymentRedirect successRedirectPath="/" cancelRedirectPath="/" onRetry={handleRetry} />
      </Box>
    </Container>
  );
};

export default PaymentRedirectPage;
