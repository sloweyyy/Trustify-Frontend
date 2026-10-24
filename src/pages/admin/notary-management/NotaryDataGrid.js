import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomNotaryDataGridToolbar from './CustomNotaryDataGridToolbar';
import { Box, Typography } from '@mui/material';
import DocumentStatusChip from '../../../components/shared/DocumentStatusChip';
import dayjs from 'dayjs';

const NotaryDataGrid = ({ data, paginationModel, setPaginationModel, loading }) => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const renderTextCell = ({ value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', textWrap: 'wrap' }}>
      <Typography sx={{ fontSize: 14 }}>{value}</Typography>
    </Box>
  );

  const renderStatusCell = ({ value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
      <DocumentStatusChip status={value} />
    </Box>
  );

  const getStatus = (status) => {
    const statusLabels = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      verification: 'Đang xác minh',
      digitalSignature: 'Sẵn sàng ký số',
      completed: 'Hoàn tất',
      invalid: 'Không hợp lệ',
    };
    return statusLabels[status];
  };

  const formattedData = data?.results?.map((record) => ({
    id: record._id,
    createdAt: dayjs(record.createdAt).format('DD/MM/YYYY'),
    fullName: record.requesterInfo.fullName,
    status: record?.status?.status || null,
    notaryService: record.notarizationService.name,
  }));

  const filteredRows = formattedData?.filter((row) => {
    const matchesStatus = filter === 'Tất cả' || getStatus(row.status) === filter;
    const matchesSearch = [row.id, row.fullName].some((field) => field.toLowerCase().includes(searchText.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      field: 'id',
      headerName: 'Số hồ sơ',
      flex: 1,
      renderCell: renderTextCell,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày công chứng',
      flex: 1,
      renderCell: renderTextCell,
    },
    {
      field: 'fullName',
      headerName: 'Người yêu cầu',
      flex: 1,
      renderCell: renderTextCell,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: renderStatusCell,
    },
    {
      field: 'notaryService',
      headerName: 'Loại dịch vụ',
      flex: 1,
      renderCell: renderTextCell,
    },
  ];

  return (
    <Box sx={{ maxHeight: 500, width: '100%' }}>
      <DataGrid
        rows={filteredRows || []}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode="server"
        rowCount={data?.totalResults || 0}
        rowHeight={70}
        pageSizeOptions={[25, 50, 100]}
        slots={{
          toolbar: () => (
            <CustomNotaryDataGridToolbar
              searchText={searchText}
              setSearchText={setSearchText}
              onFilterChange={setFilter}
              currentFilter={filter}
            />
          ),
        }}
        loading={loading}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        disableColumnResize
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default NotaryDataGrid;
