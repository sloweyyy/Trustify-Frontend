import React, { useState, useEffect, useCallback } from 'react';
import NotaryAnalyticsCard from './NotaryAnalyticsCard';
import { Box } from '@mui/material';
import { ErrorState, LoadingState } from '../shared/PageFeedback';
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

  const fetchMetrics = useCallback(async () => {
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
        setError(true);
      } finally {
        setLoading(false);
      }
  }, []);
  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  if (loading) return <LoadingState label="Đang tải số liệu…" />;
  if (error) return <ErrorState title="Chưa thể tải số liệu" description="Bạn có thể thử tải lại số liệu công chứng." onRetry={fetchMetrics} />;

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' },
      }}
    >
      <NotaryAnalyticsCard
        title={'Yêu cầu đang xử lý'}
        value={metrics.processing.total?.toLocaleString('vi-VN') ?? 'Chưa có số liệu'}
        growth={metrics.processing.growthPercent}
      />
      <NotaryAnalyticsCard
        title={'Yêu cầu chờ ký số'}
        value={metrics.digitalSignature.total?.toLocaleString('vi-VN') ?? 'Chưa có số liệu'}
        growth={metrics.digitalSignature.change}
        isChange
      />
      <NotaryAnalyticsCard
        title={'Yêu cầu đã xử lý'}
        value={metrics.notaryApproved.total?.toLocaleString('vi-VN') ?? 'Chưa có số liệu'}
        growth={metrics.notaryApproved.growthPercent}
      />
      <NotaryAnalyticsCard
        title={'Tỷ lệ xác minh thành công'}
        value={`${metrics.acceptanceRate.acceptanceRate}%`}
        growth={metrics.acceptanceRate.growthPercent}
        isWeekly
      />
    </Box>
  );
};

export default NotaryAnalyticsSession;
