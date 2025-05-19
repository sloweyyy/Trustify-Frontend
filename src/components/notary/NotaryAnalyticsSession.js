import React, { useState, useEffect } from 'react';
import NotaryAnalyticsCard from './NotaryAnalyticsCard';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import notaryService from '../../services/notary.service';

const NotaryAnalyticsSession = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    processing: { total: 0, growthPercent: 0 },
    digitalSignature: { total: 0, change: 0 },
    notaryApproved: { total: 0, growthPercent: 0 },
    acceptanceRate: { acceptanceRate: 0, growthPercent: 0 },
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const [processing, digitalSignature, notaryApproved, acceptanceRate] = await Promise.all([
          notaryService.getProcessingMetrics(),
          notaryService.getDigitalSignatureMetrics(),
          notaryService.getNotaryApprovals(),
          notaryService.getAcceptanceRate(),
        ]);

        setMetrics({
          processing,
          digitalSignature,
          notaryApproved,
          acceptanceRate,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
        const errorMessage = error.response?.data?.message || 'Failed to load dashboard metrics';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '', sm: 'repeat(2, minmax(250px, 1fr))' },
      }}
    >
      <NotaryAnalyticsCard
        title={'Tổng Số yêu Cầu chờ Xử lý'}
        value={metrics.processing.total.toLocaleString()}
        growth={metrics.processing.growthPercent}
      />
      <NotaryAnalyticsCard
        title={'Tổng số yêu cầu chờ ký số'}
        value={metrics.digitalSignature.total.toLocaleString()}
        growth={metrics.digitalSignature.change}
        isChange
      />
      <NotaryAnalyticsCard
        title={'Tổng số yêu cầu đã xử lý'}
        value={metrics.notaryApproved.total.toLocaleString()}
        growth={metrics.notaryApproved.growthPercent}
      />
      <NotaryAnalyticsCard
        title={'Tỉ lệ xác minh thành công'}
        value={`${metrics.acceptanceRate.acceptanceRate}%`}
        growth={metrics.acceptanceRate.growthPercent}
        isWeekly
      />
    </Box>
  );
};

export default NotaryAnalyticsSession;
