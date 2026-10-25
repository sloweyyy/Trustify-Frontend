import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import { Diversity3Rounded, SupervisorAccountRounded } from '@mui/icons-material';
import NotaryDataGrid from './NotaryDataGrid';
import NotarizationService from '../../../services/notarization.service';
import SessionDataGrid from './SessionDataGrid';
import SessionService from '../../../services/session.service';
import StatCard from './StatCard';
import DataGridSection from './DataGridSection';
import AdminService from '../../../services/admin.service';

import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';

const NotaryManagement = () => {
  const [notaryError, setNotaryError] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [totalsError, setTotalsError] = useState(false);
  const [totalsLoading, setTotalsLoading] = useState(true);
  const [notaryLoading, setNotaryLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [totalNotarizations, setTotalNotarizations] = useState(null);
  const [totalSessions, setTotalSessions] = useState(null);
  const [notaryPaginationModel, setNotaryPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [sessionPaginationModel, setSessionPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });
  const [notarizations, setNotarizations] = useState([]);
  const [sessions, setSessions] = useState([]);

  const fetchAllNotarizations = useCallback(async () => {
    setNotaryLoading(true);
    setNotaryError(false);
    try {
      const { page, pageSize } = notaryPaginationModel;
      const result = await NotarizationService.getAllNotarizations(null, pageSize, page);
      if (!Array.isArray(result?.results)) throw new Error('Invalid document response');
      setNotarizations(result);
    } catch (error) {
      setNotaryError(true);
    } finally {
      setNotaryLoading(false);
    }
  }, [notaryPaginationModel]);

  const fetchAllSessions = useCallback(async () => {
    setSessionLoading(true);
    setSessionError(false);
    try {
      const { page, pageSize } = sessionPaginationModel;
      const result = await SessionService.getAllSessions(null, pageSize, page);
      if (!Array.isArray(result?.results)) throw new Error('Invalid session response');
      setSessions(result);
    } catch (error) {
      setSessionError(true);
    } finally {
      setSessionLoading(false);
    }
  }, [sessionPaginationModel]);

  const fetchTotals = useCallback(async () => {
    setTotalsLoading(true);
    setTotalsError(false);
    try {
      const [notarizationsResult, sessionsResult] = await Promise.all([
        AdminService.getDocumentMetricsByPeriod('current_year'),
        AdminService.getSessionMetricsByPeriod('current_year'),
      ]);
      setTotalNotarizations(notarizationsResult.currentPeriod.documentCount);
      setTotalSessions(sessionsResult.currentPeriod.sessionCount);
    } catch (error) {
      setTotalsError(true);
    } finally {
      setTotalsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotarizations();
  }, [notaryPaginationModel, fetchAllNotarizations]);

  useEffect(() => {
    fetchAllSessions();
  }, [sessionPaginationModel, fetchAllSessions]);

  useEffect(() => {
    fetchTotals();
  }, [fetchTotals]);

  return (
    <Box sx={{ display: 'flex', minWidth: 0, flexDirection: 'column' }}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, p: 2, backgroundColor: 'background.default' }}>
        {totalsLoading ? <LoadingState label="Đang tải tổng số hồ sơ và phiên…" /> : totalsError ? <ErrorState title="Chưa thể tải tổng số hồ sơ và phiên" onRetry={fetchTotals} /> : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
          <StatCard icon={<SupervisorAccountRounded />} count={totalNotarizations} label="Tổng hồ sơ năm nay" />
          <StatCard icon={<Diversity3Rounded />} count={totalSessions} label="Tổng phiên công chứng năm nay" />
        </Box>}

        <DataGridSection title="Danh sách công chứng" loading={notaryLoading} error={notaryError} onRetry={fetchAllNotarizations}>
          <NotaryDataGrid
            data={notarizations}
            paginationModel={notaryPaginationModel}
            setPaginationModel={setNotaryPaginationModel}
            loading={notaryLoading}
          />
        </DataGridSection>

        <DataGridSection title="Danh sách phiên công chứng" loading={sessionLoading} error={sessionError} onRetry={fetchAllSessions}>
          <SessionDataGrid
            data={sessions}
            paginationModel={sessionPaginationModel}
            setPaginationModel={setSessionPaginationModel}
            loading={sessionLoading}
          />
        </DataGridSection>
      </Box>
    </Box>
  );
};

export default NotaryManagement;
