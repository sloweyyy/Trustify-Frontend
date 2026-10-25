import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import NotaryDocumentItem from './NotaryDocumentItem';
import NotarizationService from '../../services/notarization.service';
import { EmptyState, ErrorState, LoadingState } from '../shared/PageFeedback';

const RecentlyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true); setError(false);
    try {
      const response = await NotarizationService.getApproveHistory();
      if (Array.isArray(response)) setDocuments(response);
      else setError(true);
    } catch { setError(true); }
    finally { setIsLoading(false); }
  }, []);
  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Typography component="h2" variant="h6">Hồ sơ gần đây</Typography>
        <Button href="/notary/notarization-history" variant="outlined">Xem lịch sử</Button>
      </Box>
      {isLoading ? <LoadingState label="Đang tải hồ sơ gần đây…" />
        : error ? <ErrorState title="Chưa thể tải hồ sơ gần đây" onRetry={fetchDocuments} />
          : documents.length === 0 ? <EmptyState title="Chưa có hồ sơ gần đây" description="Các hồ sơ được xử lý sẽ hiển thị tại đây." />
            : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {documents.slice(0, 5).map((document, index) => <NotaryDocumentItem key={document.id || document._id || index} document={document} />)}
            </Box>}
    </Paper>
  );
};
export default RecentlyDocuments;
