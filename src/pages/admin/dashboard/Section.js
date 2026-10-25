import React from 'react';
import { Box, Typography, Autocomplete, Paper, TextField } from '@mui/material';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
const Section = ({ title, period, setPeriod, children, loading, error, onRetry }) => (
  <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
    <Box sx={{ display: 'flex', alignItems: { md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
      <Typography component="h2" variant="h6" sx={{ flex: 1 }}>{title}</Typography>
      <Autocomplete options={[{ id: 'today', name: 'Hôm nay' }, { id: 'current_week', name: 'Tuần này' }, { id: 'current_month', name: 'Tháng này' }, { id: 'current_year', name: 'Năm nay' }]}
        getOptionLabel={(option) => option.name} isOptionEqualToValue={(option, value) => option.id === value.id}
        value={period} onChange={(event, newValue) => newValue && setPeriod(newValue)}
        renderInput={(params) => <TextField {...params} inputProps={{ ...params.inputProps, readOnly: true }} label={`Thời gian: ${title.toLocaleLowerCase('vi-VN')}`} />}
        sx={{ width: { xs: '100%', md: 240 } }} />
    </Box>
    {loading ? <LoadingState label={`Đang tải ${title.toLocaleLowerCase('vi-VN')}…`} /> : error ? <ErrorState title="Chưa thể tải số liệu" description="Vui lòng thử lại để tải số liệu cho kỳ đã chọn." onRetry={onRetry} /> : <Box sx={{ minWidth: 0 }}>{children}</Box>}
  </Paper>
);
export default Section;
