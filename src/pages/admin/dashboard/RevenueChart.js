import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { EmptyState } from '../../../components/shared/PageFeedback';
import Section from './Section';
import { formatMetricValue } from './metricPresentation';
ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);
const RevenueChart = ({ title, period, setPeriod, data, options, loading, error, onRetry }) => (
  <Section {...{ title, period, setPeriod, loading, error, onRetry }}>
    {!data.labels.length ? <EmptyState title="Chưa có doanh thu trong kỳ" description="Số liệu sẽ xuất hiện khi có giao dịch được ghi nhận." /> : <>
      <Box sx={{ height: { xs: 300, md: 380 }, minWidth: 0 }}><Bar data={data} options={options} role="img" aria-label={`${title}. Số liệu chi tiết ở bảng bên dưới.`} /></Box>
      <Box role="region" aria-label={`Bảng ${title.toLocaleLowerCase('vi-VN')}`} tabIndex={0} sx={{ overflowX: 'auto', mt: 2 }}>
        <Table size="small" sx={{ minWidth: 440 }}><caption>Số liệu {title.toLocaleLowerCase('vi-VN')} (đồng)</caption>
          <TableHead><TableRow><TableCell>Nhóm</TableCell>{data.datasets.map((series, index) => <TableCell key={index} align="right">{series.label}</TableCell>)}</TableRow></TableHead>
          <TableBody>{data.labels.map((label, index) => <TableRow key={label}><TableCell component="th" scope="row">{label}</TableCell>{data.datasets.map((series, i) => <TableCell key={i} align="right">{formatMetricValue(series.data[index], true)}</TableCell>)}</TableRow>)}</TableBody>
        </Table>
      </Box>
    </>}
  </Section>
);
export default RevenueChart;
