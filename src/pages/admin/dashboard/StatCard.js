import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatMetricValue } from './metricPresentation';

const StatCard = ({ title, value, percentageChange, icon }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, p: 2, border: 1, borderColor: 'divider', borderRadius: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
    <Box sx={{ color: 'primary.main' }} aria-hidden="true">{icon}</Box>
    <Typography component="h3" variant="body1" color="text.secondary">{title}</Typography>
    <Typography component="p" variant="h4">{formatMetricValue(value, title === 'Tổng doanh thu')}</Typography>
    <Typography sx={{ mt: 'auto' }} color="text.secondary">{percentageChange}</Typography>
  </Box>
);
export default StatCard;
