import React from 'react';
import { Box, Paper, TablePagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { EmptyState } from '../shared/PageFeedback';
const ReadOnlyServerGrid = ({ title, rows = [], columns, paginationModel, setPaginationModel, count = 0, loading, Toolbar, toolbarProps }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return <Box sx={{ width: '100%', minWidth: 0 }}>
    <Toolbar {...toolbarProps} />
    <Typography color="text.secondary" sx={{ my: 2 }}>Tìm kiếm và bộ lọc áp dụng cho dữ liệu trong trang hiện tại.</Typography>
    {mobile ? <>
      {!rows.length ? <EmptyState title="Chưa có kết quả phù hợp" description="Thử bộ lọc khác hoặc chuyển trang để tiếp tục tra cứu." /> : <Box sx={{ display: 'grid', gap: 2 }}>{rows.map((row) => <Paper component="article" variant="outlined" key={row.id} sx={{ p: 2, minWidth: 0 }}><Box component="dl" sx={{ m: 0, display: 'grid', gap: 1 }}>{columns.map((column) => <Box key={column.field}><Typography component="dt" color="text.secondary">{column.headerName}</Typography><Box component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{column.renderCell ? column.renderCell({ value: row[column.field] }) : row[column.field]}</Box></Box>)}</Box></Paper>)}</Box>}
      <TablePagination component="div" count={count} page={paginationModel.page} rowsPerPage={paginationModel.pageSize} onPageChange={(event, page) => setPaginationModel({ ...paginationModel, page })} onRowsPerPageChange={(event) => setPaginationModel({ page: 0, pageSize: Number(event.target.value) })} rowsPerPageOptions={[10, 25, 50, 100]} labelRowsPerPage="Số dòng mỗi trang" labelDisplayedRows={({ from, to, count: total }) => `${from}–${to} / ${total}`} getItemAriaLabel={(type) => ({ first: 'Trang đầu', previous: 'Trang trước', next: 'Trang sau', last: 'Trang cuối' }[type])} sx={{ '& .MuiTablePagination-toolbar': { flexWrap: 'wrap', gap: 1 }, '& .MuiTablePagination-spacer': { display: 'none' } }} />
    </> : <Box sx={{ height: 450, minWidth: 0 }}><DataGrid aria-label={title} rows={rows} columns={columns} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} paginationMode="server" rowCount={count} rowHeight={80} pageSizeOptions={[10, 25, 50, 100]} loading={loading} disableRowSelectionOnClick disableColumnMenu disableColumnResize getRowId={(row) => row.id} /></Box>}
  </Box>;
};
export default ReadOnlyServerGrid;
