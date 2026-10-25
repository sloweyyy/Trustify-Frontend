import React from 'react';
import { Box } from '@mui/material';
import { LoadingState } from '../../components/shared/PageFeedback';
const Loader = () => <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', px: 2 }}><LoadingState label="Đang tải trang…" /></Box>;
export default Loader;
