import { Paper, Typography } from '@mui/material';
import React from 'react';

const NotaryAnalyticsCard = ({ title, value, growth, isChange = false, isWeekly = false }) => {
  const number = Number(growth);
  const available = growth !== '' && growth != null && Number.isFinite(number);
  const period = isChange ? 'hôm qua' : isWeekly ? 'tuần trước' : 'tháng trước';
  return (
    <Paper variant="outlined" sx={{ p: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography component="h2" variant="body1" color="text.secondary">{title}</Typography>
      <Typography component="p" variant="h4" sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
      <Typography color="text.secondary">{available ? `${number > 0 ? '+' : ''}${number.toLocaleString('vi-VN')}${isChange ? '' : '%'} so với ${period}` : 'Chưa có dữ liệu so sánh'}</Typography>
    </Paper>
  );
};
export default NotaryAnalyticsCard;
