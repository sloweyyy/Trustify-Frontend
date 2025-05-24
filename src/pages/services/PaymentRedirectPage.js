import React from 'react';
import { Container, Box } from '@mui/material';
import { PaymentRedirect } from '../../components/payment';

const PaymentRedirectPage = () => {
  // The retry function can be customized based on your application's needs
  const handleRetry = () => {
    // Example: redirect to checkout page
    // You might want to preserve cart items or transaction details in session/local storage
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
