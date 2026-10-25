import { Box, FormControl, InputLabel, MenuItem, Pagination, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useId, useState } from 'react';
import SessionService from '../../services/session.service';
import NotarySessionCard from '../../components/notary/NotarySessionCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';

const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [status, setStatus] = useState('processing');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const statusLabel = useId();
  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await SessionService.getSessionsByStatus({ status, page, limit: 6 });
      if (response.status !== 200 || !Array.isArray(response.data?.sessions)) throw new Error('Invalid session response');
      setSessions(response.data.sessions);
      setPagination(response.data.pagination);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [status, page]);
  useEffect(() => { fetchSessions(); }, [fetchSessions]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const visible = sessions.filter((session) => (session.sessionId?.sessionName || '').toLocaleLowerCase('vi-VN').includes(search.toLocaleLowerCase('vi-VN')));
  return <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
    <Typography component="h1" variant="h4">Quản lý phiên công chứng</Typography>
    <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Chọn trạng thái và mở phiên cần xử lý.</Typography>
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 2fr) minmax(0, 1fr)' }, gap: 2, mb: 3 }}>
        <TextField fullWidth label="Tìm phiên trong trang hiện tại" value={search} onChange={(e) => setSearch(e.target.value)} helperText="Tìm theo tên phiên trong tối đa 6 kết quả của trang này." />
        <FormControl fullWidth><InputLabel id={statusLabel}>Trạng thái phiên</InputLabel>
          <Select labelId={statusLabel} label="Trạng thái phiên" value={status} onChange={handleStatusChange}>
            <MenuItem value="processing">Đang xử lý</MenuItem><MenuItem value="readyToSign">Chờ ký số</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? <LoadingState label="Đang tải phiên công chứng…" /> : error ? <ErrorState title="Chưa thể tải phiên công chứng" description="Vui lòng thử lại để tải danh sách phiên." onRetry={fetchSessions} />
        : !sessions.length ? <EmptyState title="Chưa có phiên ở trạng thái này" description="Phiên được phân công sẽ xuất hiện tại đây." />
          : !visible.length ? <EmptyState title="Không tìm thấy phiên trong trang này" description="Thử tên khác hoặc chuyển sang trang khác." />
            : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>{visible.map((session, index) => <NotarySessionCard key={index} session={session} />)}</Box>}
      {!loading && !error && pagination?.totalPages > 1 && <Pagination count={pagination.totalPages} page={page} onChange={handlePageChange} color="primary" shape="rounded" sx={{ mt: 3 }} getItemAriaLabel={(type, value) => type === 'page' ? `Trang ${value}` : type === 'previous' ? 'Trang trước' : type === 'next' ? 'Trang sau' : type === 'first' ? 'Trang đầu' : 'Trang cuối'} />}
    </Paper>
  </Box>;
};
export default SessionManagement;
