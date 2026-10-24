import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { white, black } from '../../config/theme/themePrimitives';
import StatusFilterButton from '../../components/services/StatusFilterButton';
import HistoryDataTable from '../../components/services/HistoryDataTable';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkeletonHistoryDataTable from '../../components/services/SkeletonHistoryDataTable';
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
import { getLegacyDocumentFilterValue } from '../../utils/documentStatus';

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
  { id: 'date', disablePadding: false, label: 'Ngày công chứng' },
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
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [rows, setRows] = useState([]);
  const [fullData, setFullData] = useState([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoadingStatus(true);
      const response = await NotarizationService.getHistory();
      // Ensure data is sorted by createdAt from newest to oldest
      const sortedResponse = Array.isArray(response)
        ? response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : response;
      setFullData(sortedResponse);

      const formattedData = sortedResponse.map((item, index) => {
        const date = new Date(item.createdAt);
        const notaryDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          p: 3,
          gap: '8px',
          backgroundColor: white[50],
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ flex: 1, gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Lịch sử công chứng
          </Typography>

          <Typography variant="caption">Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây</Typography>
        </Box>
      </Box>

      <PendingPayments />

      {/* Main */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '12px 24px',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            height: '100%',
            gap: '50px',
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
              gap: '8px',
              alignSelf: 'stretch',
              borderBottom: '1px solid #C0C0C0',
            }}
          >
            {Object.keys(STATUS_TYPES).map((key) => (
              <StatusFilterButton
                key={key}
                statusFilter={STATUS_TYPES[key]}
                handleFilterByStatus={() => handleFilterChange(STATUS_TYPES[key])}
                clickedButton={statusClicked}
                iconMap={ICON_MAP}
              />
            ))}
          </Box>

          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'none', md: 'flex' } }}></Box>

          <TextField
            variant="outlined"
            size="small"
            label="Tìm hồ sơ"
            placeholder="Nhập từ khóa"
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              borderRadius: 1,
              width: { xs: '100%', sm: '100%', md: '20%' },
              minWidth: '150px',
              '& .MuiInputBase-input': {
                fontSize: '1rem',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: black[300] }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>
        <Box sx={{ border: !loadingStatus ? '1px solid #E0E0E0' : 'none', borderRadius: '8px', background: white[50] }}>
          {loadingStatus ? (
            <SkeletonHistoryDataTable headCells={HEAD_CELLS} />
          ) : (
            <HistoryDataTable
              filterStatus={statusFilter}
              searchText={searchText}
              rows={rows}
              headCells={HEAD_CELLS}
              statusTypes={STATUS_TYPES}
              data={fullData}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default HistoryNotarizationProfile;
