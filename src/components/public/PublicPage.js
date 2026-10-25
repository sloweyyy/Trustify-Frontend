import React from 'react';
import { Box, Container, Typography } from '@mui/material';
const PublicPage = ({ title, intro, children, actions }) => <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, minWidth: 0 }}>
  <Box component="header" sx={{ maxWidth: 800, mb: { xs: 4, md: 5 } }}><Typography component="h1" variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 600 }}>{title}</Typography>{intro && <Typography color="text.secondary" sx={{ mt: 2, maxWidth: '68ch' }}>{intro}</Typography>}{actions && <Box sx={{ mt: 3 }}>{actions}</Box>}</Box>
  {children}
</Container>;
export default PublicPage;
