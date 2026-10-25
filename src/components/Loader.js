import React from 'react';
import { Box } from '@mui/material';
import { LoadingState } from './shared/PageFeedback';

const Loader = () => (
  <Box sx={{ width: '100%', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
    <LoadingState label="Đang tải trang…" />
  </Box>
);
export default Loader;
