import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';
import { AppsRounded, Forward10Rounded, Forward30Rounded, Forward5Rounded, SearchRounded } from '@mui/icons-material';
import { black, gray, primary } from '../../../config/theme/themePrimitives';

const CustomSessionDataGridToolbar = ({ onFilterChange, currentFilter, searchText, setSearchText }) => {
  const filterOptions = ['Tất cả', 'Phiên ngắn hạn', 'Phiên trung hạn', 'Phiên dài hạn'];

  return (
    <GridToolbarContainer>
      <Box sx={{ flex: 1 }}>
        {filterOptions.map((status) => (
          <Button
            key={status}
            onClick={() => onFilterChange(status)}
            sx={{
              borderBottom: currentFilter === status ? `2px solid ${primary[500]}` : 'none',
              color: currentFilter === status ? primary[500] : black[200],
              borderRadius: 0,
              ':hover': {
                backgroundColor: gray[50],
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
          placeholder="Nhập mã hoặc tên"
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
                <SearchRounded sx={{ color: black[300] }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default CustomSessionDataGridToolbar;
