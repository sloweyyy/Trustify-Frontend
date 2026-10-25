import { BarChartRounded, DescriptionRounded, FileUploadRounded, LocalOfferRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import StatCard from './StatCard';
import AdminService from '../../../services/admin.service';
import { toast } from 'react-toastify';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
import { metricComparison } from './metricPresentation';

const StatisticSection = ({ period, setPeriod, documentMetrics, sessionMetrics, paymentMetrics, loading, error, onRetry }) => {
  const handleExportExcel = async () => {
    try {
      const response = await AdminService.exportToExcel(period.id);

      if (response && response.data) {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        if (blob.size === 0) {
          toast.error('Tệp tin trống');
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${period.name}.xlsx`);
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        toast.success('Xuất file thành công');
      } else {
        toast.error('Không thể tải file');
      }
    } catch (error) {
      console.error('Excel export error:', error);
      toast.error('Lỗi xuất file');
    }
  }

  return <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 3 }}>
      <Box sx={{ flex: 1 }}><Typography component="h2" variant="h6">Thống kê hoạt động</Typography><Typography color="text.secondary">Thống kê {period.name.toLowerCase()}</Typography></Box>
      <Button variant="outlined" startIcon={<FileUploadRounded />} onClick={handleExportExcel}>Xuất Excel</Button>
    </Box>
    <Autocomplete
      options={[{ id: 'today', name: 'Hôm nay' }, { id: 'current_week', name: 'Tuần này' }, { id: 'current_month', name: 'Tháng này' }, { id: 'current_year', name: 'Năm nay' }]}
      getOptionLabel={(option) => option.name} isOptionEqualToValue={(option, value) => option.id === value.id}
      value={period} onChange={(event, newValue) => setPeriod(newValue || period)}
      renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, readOnly: true }} label="Khoảng thời gian thống kê" />}
      sx={{ width: { xs: '100%', md: 280 }, mb: 3 }}
    />
    {loading ? <LoadingState label="Đang tải số liệu thống kê…" /> : error ? <ErrorState title="Chưa thể tải số liệu thống kê" description="Vui lòng thử lại để xem số liệu trong khoảng thời gian đã chọn." onRetry={onRetry} /> :
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
        <StatCard title="Tổng doanh thu" value={paymentMetrics?.currentPeriod?.totalAmount} percentageChange={metricComparison(paymentMetrics, 'totalAmount', true)} icon={<BarChartRounded />} />
        <StatCard title="Tổng tài liệu" value={documentMetrics?.currentPeriod?.documentCount} percentageChange={metricComparison(documentMetrics, 'documentCount')} icon={<DescriptionRounded />} />
        <StatCard title="Tổng phiên công chứng" value={sessionMetrics?.currentPeriod?.sessionCount} percentageChange={metricComparison(sessionMetrics, 'sessionCount')} icon={<LocalOfferRounded />} />
      </Box>}
  </Paper>;
};
export default StatisticSection;
