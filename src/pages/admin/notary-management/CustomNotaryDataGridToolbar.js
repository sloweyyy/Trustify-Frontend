import { Box, TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { SearchRounded } from '@mui/icons-material';
import StatusFilterButton from '../../../components/services/StatusFilterButton';

// These legacy values are used by the existing grid predicate. Only labels change.
const filterOptions = ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đang xác minh', 'Sẵn sàng ký số', 'Hoàn tất', 'Không hợp lệ'];

const CustomNotaryDataGridToolbar = ({ onFilterChange, currentFilter, searchText, setSearchText }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', p: 2 }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
      {filterOptions.map((status) => (
        <StatusFilterButton
          key={status}
          statusFilter={status}
          clickedButton={currentFilter}
          handleFilterByStatus={onFilterChange}
        />
      ))}
    </Box>
    <TextField
      label="Tìm hồ sơ"
      placeholder="Nhập mã hoặc tên"
      size="small"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      sx={{ width: { xs: '100%', md: 240 } }}
      InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }}
    />
  </Box>
);

export default CustomNotaryDataGridToolbar;
