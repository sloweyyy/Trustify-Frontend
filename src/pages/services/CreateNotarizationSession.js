import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, InputAdornment, Pagination, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { AddRounded, SearchRounded } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SessionCard from '../../components/services/SessionCard';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';
import NotarySessionForm from './NotarySessionForm';
import JoinSessionModal from './JoinSessionModal';
import SessionService from '../../services/session.service';
import { uploadFileSuccess } from '../../stores/slices/sessionSlice';

const CreateNotarizationSession = () => {
  const [openNotarySessionForm, setOpenNotarySessionForm] = useState(false);
  const [openJoinSessionModal, setOpenJoinSessionModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [sessionId] = useState(() => searchParams.get('sessionId'));
  const { uploadFileSuccessState } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const sessionsPerPage = 6;
  const fetchSessions = useCallback(async () => {
    setLoading(true); setError(false);
    try {
      const response = await SessionService.getSessionsByUserId();
      if (!Array.isArray(response?.results)) throw new Error('Invalid session list');
      setSessions(response.results.filter((session) => session.users.every((user) => user.status !== 'rejected')));
    } catch {
      setError(true);
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchSessions(); }, [fetchSessions]);
  useEffect(() => {
    const timer = setTimeout(() => { setAppliedSearch(searchValue); setCurrentPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);
  useEffect(() => {
    if (sessionId) {
      setOpenJoinSessionModal(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [sessionId]);
  useEffect(() => {
    if (uploadFileSuccessState) { fetchSessions(); dispatch(uploadFileSuccess(false)); }
  }, [uploadFileSuccessState, dispatch, fetchSessions]);
  const filteredSessions = useMemo(() => appliedSearch === '' ? sessions : sessions.filter((session) => session.sessionName.toLowerCase().includes(appliedSearch.toLowerCase())), [sessions, appliedSearch]);
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const page = Math.min(currentPage, Math.max(1, totalPages));
  const currentSessions = filteredSessions.slice((page - 1) * sessionsPerPage, page * sessionsPerPage);
  const clearSearch = () => { setSearchValue(''); setAppliedSearch(''); setCurrentPage(1); };
  return (
    <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 }, width: '100%', minWidth: 0 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
        <Box><Typography component="h1" variant="h4">Phiên công chứng</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Tạo và theo dõi phiên công chứng có nhiều người tham gia.</Typography></Box>
        <Button variant="contained" startIcon={<AddRounded />} onClick={() => setOpenNotarySessionForm(true)} sx={{ flexShrink: 0 }}>Tạo phiên công chứng</Button>
      </Stack>
      <TextField fullWidth label="Tìm phiên công chứng" placeholder="Nhập tên phiên công chứng" value={searchValue}
        onChange={(event) => { setSearchValue(event.target.value); setCurrentPage(1); }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }} />
      {!loading && !error && sessions.length > 0 && <Typography color="text.secondary" role="status">{filteredSessions.length} phiên công chứng</Typography>}
      {loading ? <LoadingState label="Đang tải phiên công chứng…"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
        {Array.from({ length: sessionsPerPage }, (_, index) => <Skeleton key={index} variant="rounded" height={250} />)}
      </Box></LoadingState> : error ? <ErrorState title="Chưa thể tải phiên công chứng" description="Bạn có thể thử tải lại danh sách. Thông tin phiên hiện có không bị thay đổi." onRetry={fetchSessions} /> : !sessions.length ?
        <EmptyState title="Chưa có phiên công chứng" description="Chọn Tạo phiên công chứng để bắt đầu và thêm người cùng tham gia." /> : !filteredSessions.length ?
        <EmptyState title="Không tìm thấy phiên công chứng" description="Thử tên phiên khác hoặc xóa từ khóa để xem lại danh sách." action={<Button variant="outlined" onClick={clearSearch}>Xóa từ khóa</Button>} /> : <>
          <Box component="ul" aria-label="Danh sách phiên công chứng" sx={{ p: 0, m: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
            {currentSessions.map((session) => <SessionCard key={session._id} session={session} />)}
          </Box>
          {totalPages > 1 && <Pagination count={totalPages} page={page} onChange={(event, nextPage) => setCurrentPage(nextPage)} showFirstButton showLastButton
            getItemAriaLabel={(type, number) => type === 'page' ? `Trang ${number}` : ({ first: 'Trang đầu', last: 'Trang cuối', next: 'Trang sau', previous: 'Trang trước' }[type])} />}
        </>}
      <NotarySessionForm open={openNotarySessionForm} setOpen={setOpenNotarySessionForm} handleSuccess={fetchSessions} />
      <JoinSessionModal sessionId={sessionId} open={openJoinSessionModal} setOpen={setOpenJoinSessionModal} />
    </Stack>
  );
};
export default CreateNotarizationSession;
