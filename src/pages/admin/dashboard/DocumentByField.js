import React from 'react';
import { Box, Paper, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { EmptyState } from '../../../components/shared/PageFeedback';
import Section from './Section';
const columns = [{ field: 'id', headerName: 'STT', width: 80 }, { field: 'category', headerName: 'Lĩnh vực', flex: 1, minWidth: 180 }, { field: 'data', headerName: 'Số hồ sơ', type: 'number', width: 140 }];
const DocumentByField = ({ period, setPeriod, paginationModel, setPaginationModel, documentFieldData = [], loading, error, onRetry }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { page, pageSize } = paginationModel;
  return <Section title="Tài liệu theo lĩnh vực" {...{ period, setPeriod, loading, error, onRetry }}>
    {!documentFieldData.length ? <EmptyState title="Chưa có hồ sơ trong kỳ" description="Số hồ sơ theo lĩnh vực sẽ xuất hiện tại đây." /> : mobile ? <Box sx={{ display: 'grid', gap: 2 }}>
      {documentFieldData.slice(page * pageSize, (page + 1) * pageSize).map((row) => <Paper variant="outlined" key={row.id} sx={{ p: 2 }}><Typography component="h3" variant="body1" fontWeight={600}>{row.category}</Typography><Typography color="text.secondary">Số hồ sơ: {Number(row.data).toLocaleString('vi-VN')}</Typography></Paper>)}
      {documentFieldData.length > pageSize && <Pagination count={Math.ceil(documentFieldData.length / pageSize)} page={page + 1} onChange={(event, value) => setPaginationModel({ ...paginationModel, page: value - 1 })} getItemAriaLabel={(type, value) => type === 'page' ? `Trang ${value}` : type === 'previous' ? 'Trang trước' : type === 'next' ? 'Trang sau' : type === 'first' ? 'Trang đầu' : 'Trang cuối'} />}
    </Box> : <Box sx={{ minWidth: 0 }}><DataGrid autoHeight aria-label="Số hồ sơ theo lĩnh vực" rows={documentFieldData} columns={columns} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} pageSizeOptions={[5, 10, 25]} disableRowSelectionOnClick disableColumnMenu disableColumnResize disableColumnSorting /></Box>}
  </Section>;
};
export default DocumentByField;
