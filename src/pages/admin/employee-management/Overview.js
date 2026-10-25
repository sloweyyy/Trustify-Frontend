import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
import { formatMetricValue } from '../dashboard/metricPresentation';
ChartJS.register(ArcElement, Tooltip, Legend);
const Overview = ({ count, notaryCount, secretaryCount, loading, error, onRetry }) => {
  const theme = useTheme();
  const available = [notaryCount, secretaryCount].every((value) => typeof value === 'number');
  return <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
    <Typography component="h2" variant="h6">Tổng quan nhân viên</Typography>
    {loading ? <LoadingState label="Đang tải số lượng nhân viên…" /> : error ? <ErrorState title="Chưa thể tải số lượng nhân viên" onRetry={onRetry} /> : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' }, gap: 3, mt: 2 }}>
      <Box><Typography color="text.secondary">Tổng số nhân viên</Typography><Typography variant="h4">{formatMetricValue(count)}</Typography><Typography sx={{ mt: 2 }}>Công chứng viên: {formatMetricValue(notaryCount)}</Typography><Typography>Thư ký: {formatMetricValue(secretaryCount)}</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Biểu đồ thể hiện hai vai trò có số liệu được cung cấp.</Typography></Box>
      {available && notaryCount + secretaryCount > 0 && <Box sx={{ height: 240, minWidth: 0 }}><Pie aria-label="Phân bố công chứng viên và thư ký; số liệu nằm bên cạnh biểu đồ" role="img" data={{ labels: ['Công chứng viên', 'Thư ký'], datasets: [{ data: [notaryCount, secretaryCount], backgroundColor: [theme.palette.primary.main, theme.palette.info.main], borderColor: theme.palette.background.paper, borderWidth: 2 }] }} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></Box>}
    </Box>}
  </Paper>;
};
export default Overview;
