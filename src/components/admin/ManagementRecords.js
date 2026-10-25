import React, { useId } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery, useTheme } from '@mui/material';
import { EmptyState, LoadingState } from '../shared/PageFeedback';
import { StatusChip } from '../shared/DocumentStatusChip';
const statusTone = (value) => ({ 'Trực tuyến': 'success', 'Ngoại tuyến': 'neutral', 'Bị cấm': 'warning', 'Đã bị xóa': 'error' }[value?.trim()] || 'neutral');
const cellValue = (row, key) => key === 'status' ? <StatusChip label={row.status?.trim() || 'Chưa có trạng thái'} tone={statusTone(row.status)} /> : row[key] ?? 'Chưa có thông tin';
const ManagementRecords = ({ title, rows, columns, order, orderBy, onSort, onOpen, paginationModel, count, onPageChange, onRowsPerPageChange, loading }) => {
  const theme = useTheme();
  const sortLabel = useId();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return <Paper variant="outlined" sx={{ width: '100%', minWidth: 0 }}>
    <Box sx={{ p: 2 }}><Typography component="h2" variant="h6">{title}</Typography><Typography color="text.secondary">Đang hiển thị {rows.length} kết quả trong trang hiện tại. Tìm kiếm và bộ lọc áp dụng cho trang này.</Typography></Box>
    {mobile && <Box sx={{ px: 2, mb: 2, display: 'flex', gap: 1 }}>
      <FormControl fullWidth><InputLabel id={sortLabel}>Sắp xếp theo</InputLabel><Select labelId={sortLabel} label="Sắp xếp theo" value={columns.some((column) => column.id === orderBy) ? orderBy : ''} onChange={(event) => onSort(event, event.target.value)}>{columns.map((column) => <MenuItem key={column.id} value={column.id}>{column.label}</MenuItem>)}</Select></FormControl>
      <Button variant="outlined" onClick={(event) => onSort(event, orderBy)} aria-label="Đổi chiều sắp xếp">{order === 'asc' ? 'Tăng dần' : 'Giảm dần'}</Button>
    </Box>}
    {loading ? <LoadingState label="Đang tải danh sách…" /> : !rows.length ? <EmptyState title="Chưa có kết quả phù hợp" description="Thử tên khác, thay đổi bộ lọc hoặc chuyển trang." /> : mobile ?
      <Box sx={{ display: 'grid', gap: 2, p: 2 }}>{rows.map((row) => <Paper key={row.id} component="article" variant="outlined" sx={{ p: 2, minWidth: 0 }}>
        <Typography component="h3" variant="h6" sx={{ overflowWrap: 'anywhere' }}>{row.name || 'Chưa có tên'}</Typography>
        <Box component="dl" sx={{ m: 0, my: 2, display: 'grid', gap: 1 }}>{columns.filter((column) => column.id !== 'name').map((column) => <Box key={column.id}><Typography component="dt" color="text.secondary">{column.label}</Typography><Box component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{cellValue(row, column.id)}</Box></Box>)}</Box>
        <Button variant="outlined" fullWidth onClick={(event) => onOpen(event, row)} aria-label={`Xem chi tiết ${row.name}`}>Xem chi tiết</Button>
      </Paper>)}</Box> :
      <TableContainer role="region" aria-label={title} tabIndex={0} sx={{ maxHeight: '65vh' }}><Table stickyHeader sx={{ minWidth: 720 }} aria-label={title}>
        <TableHead><TableRow>{columns.map((column) => <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}><TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={(event) => onSort(event, column.id)} aria-label={`Sắp xếp theo ${column.label.toLocaleLowerCase('vi-VN')}`}>{column.label}</TableSortLabel></TableCell>)}<TableCell>Thao tác</TableCell></TableRow></TableHead>
        <TableBody>{rows.map((row) => <TableRow key={row.id} hover onClick={(event) => onOpen(event, row)} sx={{ cursor: 'pointer' }}>{columns.map((column) => <TableCell key={column.id} sx={{ overflowWrap: 'anywhere' }}>{cellValue(row, column.id)}</TableCell>)}<TableCell><Button variant="text" onClick={(event) => { event.stopPropagation(); onOpen(event, row); }} aria-label={`Xem chi tiết ${row.name}`}>Xem chi tiết</Button></TableCell></TableRow>)}</TableBody>
      </Table></TableContainer>}
    <TablePagination component="div" count={count || 0} page={paginationModel.page - 1} rowsPerPage={paginationModel.pageSize} rowsPerPageOptions={onRowsPerPageChange ? [5, 10, 25, 50, 100] : [paginationModel.pageSize]} onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage="Số dòng mỗi trang" labelDisplayedRows={({ from, to, count: total }) => `${from}–${to} / ${total}`} getItemAriaLabel={(type) => ({ first: 'Trang đầu', previous: 'Trang trước', next: 'Trang sau', last: 'Trang cuối' }[type])} sx={{ '& .MuiTablePagination-toolbar': { flexWrap: 'wrap', gap: 1 }, '& .MuiTablePagination-spacer': { display: { xs: 'none', sm: 'block' } } }} />
  </Paper>;
};
export default ManagementRecords;
