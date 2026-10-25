import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography, useMediaQuery } from '@mui/material';
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HistoryDetailModal from '../modals/HistoryDetailModal';
import DocumentStatusChip from '../shared/DocumentStatusChip';
import { EmptyState } from '../shared/PageFeedback';
import { matchesDocumentStatusSearch } from '../../utils/documentStatus';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}
const HistoryDataTable = ({ filterStatus, searchText, rows, headCells, statusTypes, data, onClearFilters, highlightId }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('profile');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [notaryId, setNotaryId] = useState('');
  const highlightRef = useRef(null);
  const pagedHighlight = useRef(null);
  const focusedHighlight = useRef(null);
  const previousFilters = useRef({ filterStatus, searchText });
  useEffect(() => {
    if (previousFilters.current.filterStatus !== filterStatus || previousFilters.current.searchText !== searchText) setPage(0);
    previousFilters.current = { filterStatus, searchText };
  }, [filterStatus, searchText]);
  const filteredRows = useMemo(() => {
    let filtered = [...rows];
    if (filterStatus !== statusTypes.All) filtered = filtered.filter((row) => row.status === filterStatus);
    if (searchText) filtered = filtered.filter((row) => row.profile.toLowerCase().includes(searchText.toLowerCase()) ||
      row.name.toLowerCase().includes(searchText.toLowerCase()) || row.date.toLowerCase().includes(searchText.toLowerCase()) ||
      (row.status || '').toLowerCase().includes(searchText.toLowerCase()) || matchesDocumentStatusSearch(row.status, searchText) ||
      row.service.toLowerCase().includes(searchText.toLowerCase()));
    return filtered.sort(getComparator(order, orderBy));
  }, [rows, filterStatus, statusTypes.All, searchText, order, orderBy]);
  useEffect(() => {
    const index = filteredRows.findIndex((row) => row.profile === highlightId);
    if (index >= 0 && pagedHighlight.current !== highlightId) {
      pagedHighlight.current = highlightId; setPage(Math.floor(index / rowsPerPage));
    }
  }, [highlightId, filteredRows, rowsPerPage]);
  const currentPage = Math.min(page, Math.max(0, Math.ceil(filteredRows.length / rowsPerPage) - 1));
  const visibleRows = filteredRows.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
  useEffect(() => {
    if (highlightRef.current && focusedHighlight.current !== highlightId) {
      focusedHighlight.current = highlightId; highlightRef.current.focus();
      highlightRef.current.scrollIntoView?.({ block: 'center' });
    }
  }, [highlightId, currentPage, mobile, visibleRows]);
  const requestSort = (property) => { setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc'); setOrderBy(property); };
  const openRecord = (row) => { setNotaryId(row.profile); setOpen(true); };
  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      {!filteredRows.length ? <EmptyState title={rows.length ? 'Không tìm thấy hồ sơ' : 'Chưa có hồ sơ công chứng'}
        description={rows.length ? 'Thử thay đổi trạng thái hoặc từ khóa tìm kiếm.' : 'Hồ sơ bạn gửi sẽ hiển thị tại đây để theo dõi tiến trình.'}
        action={rows.length ? onClearFilters && <Button variant="outlined" onClick={onClearFilters}>Xóa bộ lọc</Button> : <Button component={Link} to="/user/create-notarization-profile" variant="contained">Tạo hồ sơ công chứng</Button>} /> : <>
        {mobile ? <>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth><InputLabel id="history-sort-label">Sắp xếp theo</InputLabel>
              <Select labelId="history-sort-label" label="Sắp xếp theo" value={orderBy} onChange={(event) => requestSort(event.target.value)}>
                {headCells.map((cell) => <MenuItem key={cell.id} value={cell.id}>{cell.label}</MenuItem>)}
              </Select>
            </FormControl>
            <IconButton aria-label={order === 'asc' ? 'Sắp xếp giảm dần' : 'Sắp xếp tăng dần'} onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
              {order === 'asc' ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
            </IconButton>
          </Box>
          <Box component="ul" aria-label="Danh sách hồ sơ" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {visibleRows.map((row) => <Card key={row.id} component="li" ref={row.profile === highlightId ? highlightRef : undefined} tabIndex={row.profile === highlightId ? -1 : undefined} sx={{ borderColor: row.profile === highlightId ? 'primary.main' : 'divider' }}><CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>{row.profile === highlightId && <Typography color="primary.main" sx={{ fontWeight: 600 }}>Vừa gửi</Typography>}<Typography color="text.secondary">Mã hồ sơ</Typography><Typography component="h2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{row.profile}</Typography></Box>
              <Box sx={{ alignSelf: 'flex-start' }}><DocumentStatusChip status={row.status} /></Box>
              <Typography color="text.secondary">Ngày gửi: {row.date}</Typography>
              <Typography sx={{ overflowWrap: 'anywhere' }}>{row.service}</Typography>
              <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>Người yêu cầu: {row.name}</Typography>
              <Button variant="outlined" aria-label={`Xem hồ sơ ${row.profile}`} onClick={() => openRecord(row)}>Xem hồ sơ</Button>
            </CardContent></Card>)}
          </Box>
        </> : <TableContainer component={Card}>
          <Table aria-label="Lịch sử hồ sơ công chứng">
            <TableHead><TableRow>{headCells.map((cell) => <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false} sx={{ minWidth: cell.id === 'status' ? 140 : undefined }}>
              <TableSortLabel active={orderBy === cell.id} direction={orderBy === cell.id ? order : 'asc'} onClick={() => requestSort(cell.id)}>{cell.label}</TableSortLabel>
            </TableCell>)}</TableRow></TableHead>
            <TableBody>{visibleRows.map((row) => <TableRow key={row.id} hover ref={row.profile === highlightId ? highlightRef : undefined} tabIndex={row.profile === highlightId ? -1 : undefined} selected={(open && row.profile === notaryId) || row.profile === highlightId} onClick={() => openRecord(row)} sx={{ cursor: 'pointer' }}>
              <TableCell component="th" scope="row">{row.profile === highlightId && <Typography color="primary.main" sx={{ fontWeight: 600 }}>Vừa gửi</Typography>}<Button variant="text" aria-label={`Xem hồ sơ ${row.profile}`} onClick={(event) => { event.stopPropagation(); openRecord(row); }} sx={{ p: 0, textAlign: 'left', justifyContent: 'flex-start', overflowWrap: 'anywhere' }}>{row.profile}</Button></TableCell>
              <TableCell>{row.date}</TableCell><TableCell>{row.name}</TableCell><TableCell sx={{ minWidth: 140 }}><DocumentStatusChip status={row.status} /></TableCell><TableCell>{row.service}</TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </TableContainer>}
        <TablePagination rowsPerPageOptions={[10, 15, 20]} component="div" count={filteredRows.length} rowsPerPage={rowsPerPage} page={currentPage}
          onPageChange={(event, nextPage) => setPage(nextPage)} onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }} />
      </>}
      {notaryId && <HistoryDetailModal open={open} handleClose={() => setOpen(false)} data={data} notaryId={notaryId} />}
    </Box>
  );
};
export default HistoryDataTable;
