import React from 'react';
import { Paper, Typography } from '@mui/material';
import { formatMetricValue } from '../dashboard/metricPresentation';
const UserOverview = ({ userCount }) => <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mx: 2 }}><Typography component="h2" variant="body1" color="text.secondary">Tổng số người dùng</Typography><Typography variant="h4" sx={{ mt: 1 }}>{formatMetricValue(userCount)}</Typography></Paper>;
export default UserOverview;
