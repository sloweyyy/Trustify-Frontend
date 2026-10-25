import React, { useCallback, useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Skeleton, Typography, TextField, InputAdornment } from '@mui/material';
import StatusFilterButton from '../../components/services/StatusFilterButton';
import HistoryDataTable from '../../components/services/HistoryDataTable';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorState, LoadingState } from '../../components/shared/PageFeedback';
import {
  AppsRounded,
  CheckCircleRounded,
  EditNoteRounded,
  ErrorRounded,
  HourglassTopRounded,
  LoopRounded,
  SearchRounded,
} from '@mui/icons-material';
import { STATUS_TYPES } from '../../utils/constants';
import PendingPayments from '../../components/payment/PendingPayments';
import { getDocumentFilterLabel, getLegacyDocumentFilterValue } from '../../utils/documentStatus';

const ICON_MAP = {
  [STATUS_TYPES.All]: <AppsRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Pending]: <HourglassTopRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Processing]: <LoopRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.DigitalSignature]: <EditNoteRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Completed]: <CheckCircleRounded sx={{ height: '18px', width: '18px' }} />,
  [STATUS_TYPES.Rejected]: <ErrorRounded sx={{ height: '18px', width: '18px' }} />,
};

const HEAD_CELLS = [
  { id: 'profile', disablePadding: true, label: 'Số hồ sơ' },
  { id: 'date', disablePadding: false, label: 'Ngày gửi' },
  { id: 'name', disablePadding: false, label: 'Người yêu cầu' },
  { id: 'status', disablePadding: false, label: 'Tình trạng' },
  { id: 'service', disablePadding: false, label: 'Loại dịch vụ' },
];

const createData = (id, profile, date, name, status, service) => ({
  id,
  profile,
  date,
  name,
  status,
  service,
});

const HistoryNotarizationProfile = () => {
  const [statusFilter, setStatusFilter] = useState(STATUS_TYPES.All);
  const [statusClicked, setStatusClicked] = useState(STATUS_TYPES.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(false);
  const [rows, setRows] = useState([]);
  const [fullData, setFullData] = useState([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoadingStatus(true);
      setError(false);
      const response = await NotarizationService.getHistory();
      if (!Array.isArray(response)) throw new Error('History unavailable');
      const sortedResponse = [...response].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFullData(sortedResponse);

      const formattedData = sortedResponse.map((item, index) => {
        const date = new Date(item.createdAt);
        const notaryDate = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return createData(
          index + 1,
          item._id,
          notaryDate,
          item.requesterInfo.fullName,
          getLegacyDocumentFilterValue(item.status.status),
          item.notarizationService.name,
        );
      });

      setRows(formattedData);
    } catch (error) {
      setError(true);
      if (error.response?.status === 401) {
        toast.error('Vui lòng đăng nhập');
      }
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setStatusClicked(status);
  };


  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const clearFilters = () => { handleFilterChange(STATUS_TYPES.All); setSearchText(''); };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 1280, mx: 'auto', p: { xs: 2, md: 3 }, gap: 3 }}>
      <Box><Typography component="h1" variant="h4">Lịch sử hồ sơ công chứng</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>Theo dõi tiến trình hồ sơ, xem tài liệu và kiểm tra khoản chờ thanh toán.</Typography></Box>
      <PendingPayments />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Tìm hồ sơ" placeholder="Nhập mã hồ sơ, tên hoặc dịch vụ" value={searchText} onChange={(event) => setSearchText(event.target.value)} fullWidth
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded aria-hidden="true" color="action" /></InputAdornment> }} />
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, flexWrap: 'wrap', gap: 1 }}>
          {Object.keys(STATUS_TYPES).map((key) => <StatusFilterButton key={key} statusFilter={STATUS_TYPES[key]} handleFilterByStatus={() => handleFilterChange(STATUS_TYPES[key])} clickedButton={statusClicked} iconMap={ICON_MAP} />)}
        </Box>
        <FormControl fullWidth sx={{ display: { xs: 'flex', lg: 'none' } }}><InputLabel id="history-filter-label">Trạng thái hồ sơ</InputLabel>
          <Select labelId="history-filter-label" label="Trạng thái hồ sơ" value={statusFilter} onChange={(event) => handleFilterChange(event.target.value)}>
            {Object.values(STATUS_TYPES).map((value) => <MenuItem key={value} value={value}>{getDocumentFilterLabel(value)}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      {loadingStatus ? <LoadingState label="Đang tải hồ sơ…">{[0, 1, 2].map((index) => <Skeleton key={index} variant="rectangular" height={96} sx={{ mb: 2 }} />)}</LoadingState> : error ?
        <ErrorState title="Chưa thể tải lịch sử hồ sơ" description="Bạn có thể thử tải lại danh sách hồ sơ." onRetry={fetchHistory} /> :
        <HistoryDataTable filterStatus={statusFilter} searchText={searchText} rows={rows} headCells={HEAD_CELLS} statusTypes={STATUS_TYPES} data={fullData} onClearFilters={clearFilters} />}
    </Box>
  );
};
export default HistoryNotarizationProfile;
