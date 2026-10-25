import React from 'react';
import { Box, Typography } from '@mui/material';
import { formatMetricValue } from '../dashboard/metricPresentation';
const StatCard = ({ icon, count, label }) => <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, minWidth: 0 }}><Box sx={{ color: 'primary.main' }} aria-hidden="true">{icon}</Box><Typography component="h2" variant="body1" color="text.secondary">{label}</Typography><Typography variant="h4" sx={{ mt: 1 }}>{formatMetricValue(count)}</Typography></Box>;
export default StatCard;
