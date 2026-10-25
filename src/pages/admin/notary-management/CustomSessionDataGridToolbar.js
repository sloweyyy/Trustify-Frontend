import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import React from 'react';
import { AppsRounded, Forward10Rounded, Forward30Rounded, Forward5Rounded, SearchRounded } from '@mui/icons-material';

const CustomSessionDataGridToolbar = ({ onFilterChange, currentFilter, searchText, setSearchText }) => {
  const filterOptions = ['Tất cả', 'Phiên ngắn hạn', 'Phiên trung hạn', 'Phiên dài hạn'];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', p: 2 }}>
      <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
        {filterOptions.map((status) => (
          <Button
            key={status}
            aria-pressed={currentFilter === status}
            onClick={() => onFilterChange(status)}
            sx={{
              borderBottom: 2,
              borderColor: currentFilter === status ? 'primary.main' : 'transparent',
              color: currentFilter === status ? 'primary.main' : 'text.secondary',
              borderRadius: 0,
              ':hover': {
                backgroundColor: 'action.hover',
              },
              mx: 0.5,
            }}
            startIcon={
              status === 'Tất cả' ? (
                <AppsRounded />
              ) : status === 'Phiên ngắn hạn' ? (
                <Forward5Rounded />
              ) : status === 'Phiên trung hạn' ? (
                <Forward10Rounded />
              ) : status === 'Phiên dài hạn' ? (
                <Forward30Rounded />
              ) : null
            }
          >
            <Typography sx={{ fontSize: '1rem', fontWeight: 600, textTransform: 'none' }}>{status}</Typography>
          </Button>
        ))}
      </Box>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          label="Tìm phiên"
          helperText="Tìm theo tên trong trang hiện tại"
          placeholder="Nhập tên phiên"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            borderRadius: 1,
            width: '100%',
            minWidth: '150px',
            '& .MuiInputBase-input': {
              fontSize: '1rem',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomSessionDataGridToolbar;
