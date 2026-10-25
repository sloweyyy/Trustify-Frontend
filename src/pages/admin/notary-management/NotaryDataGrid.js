import React, { useState } from 'react';
import ReadOnlyServerGrid from '../../../components/admin/ReadOnlyServerGrid';
import CustomNotaryDataGridToolbar from './CustomNotaryDataGridToolbar';
import { Box, Typography } from '@mui/material';
import DocumentStatusChip from '../../../components/shared/DocumentStatusChip';
import { getLegacyDocumentFilterValue } from '../../../utils/documentStatus';
import dayjs from 'dayjs';

const NotaryDataGrid = ({ data, paginationModel, setPaginationModel, loading }) => {
  const [filter, setFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const renderTextCell = ({ value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', textWrap: 'wrap' }}>
      <Typography sx={{ fontSize: 16 }}>{value}</Typography>
    </Box>
  );

  const renderStatusCell = ({ value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
      <DocumentStatusChip status={value} />
    </Box>
  );


  const formattedData = data?.results?.map((record) => ({
    id: record._id,
    createdAt: dayjs(record.createdAt).format('DD/MM/YYYY'),
    fullName: record.requesterInfo.fullName,
    status: record?.status?.status || null,
    notaryService: record.notarizationService.name,
  }));

  const filteredRows = formattedData?.filter((row) => {
    const matchesStatus = filter === 'Tất cả' || getLegacyDocumentFilterValue(row.status) === filter;
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
      headerName: 'Ngày gửi hồ sơ',
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
      minWidth: 140,
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

  return <ReadOnlyServerGrid title="Danh sách hồ sơ công chứng" rows={filteredRows || []} columns={columns} paginationModel={paginationModel} setPaginationModel={setPaginationModel} count={data?.totalResults || 0} loading={loading} Toolbar={CustomNotaryDataGridToolbar} toolbarProps={{ searchText, setSearchText, onFilterChange: setFilter, currentFilter: filter }} />;
};
export default NotaryDataGrid;
