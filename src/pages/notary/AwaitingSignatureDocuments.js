import { Box, Paper, Typography, Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import NotarizationService from '../../services/notarization.service';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';
import NotaryDocumentCardSkeleton from '../../components/notary/NotaryDocumentCardSkeleton';
import NotaryDocumentCard from '../../components/notary/NotaryDocumentCard';

const AwaitingSignatureDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchDigitalSignatureDocuments = async (page) => {
    setLoading(true);
    setError(false);
    try {
      const response = await NotarizationService.getNotarizationByRole({
        status: 'readyToSign',
        page,
        limit: 6,
      });
      if (!Array.isArray(response?.documents)) {
        setError(true);
        return;
      }
      setDocuments(response.documents);
      setPagination(response.pagination);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDigitalSignatureDocuments(pageIndex);
  }, [pageIndex]);

  const handlePageChange = (event, value) => {
    setPageIndex(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: { xs: 2, sm: 3 },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Typography component="h1" variant="h4">Tài liệu chờ ký số</Typography>
      <Paper variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          overflow: 'hidden',
          border: 1, borderColor: 'divider',
          padding: 2,
          gap: 2,
          borderRadius: 1,
          boxShadow: 'none',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: 'text.primary',
              fontSize: 16,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Danh sách chờ ký số
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: 16,
              fontWeight: 400,
            }}
          >
            Các yêu cầu chờ ký số sẽ hiển thị ở đây
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '100%',
            overflowY: 'auto',
            scrollbarWidth: { xs: 'none', sm: 'auto' },
          }}
        >
          {loading ? (
            <LoadingState label="Đang tải hồ sơ…">
              {Array.from({ length: 6 }).map((_, index) => <NotaryDocumentCardSkeleton key={index} />)}
            </LoadingState>
          ) : error ? (
            <ErrorState title="Chưa thể tải hồ sơ" description="Hồ sơ chưa tải được. Bạn có thể thử lại."
              onRetry={() => fetchDigitalSignatureDocuments(pageIndex)} />
          ) : documents.length === 0 ? (
            <EmptyState title="Chưa có hồ sơ chờ ký số" description="Các hồ sơ chờ ký số sẽ hiển thị tại đây khi được chuyển đến bạn." />
          ) : documents.map((document, index) => <NotaryDocumentCard key={index} document={document} />)}
        </Box>
      </Paper>

      {/* Thêm Pagination */}
      {!loading && !error && documents.length > 0 && <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Pagination
          aria-label="Phân trang hồ sơ"
          getItemAriaLabel={(type, page) => type === 'page' ? `Trang ${page}` : type === 'next' ? 'Trang sau' : type === 'previous' ? 'Trang trước' : 'Chuyển trang'}
          count={pagination?.totalPages !== 0 ? pagination?.totalPages : 1}
          page={pageIndex}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>}
    </Box>
  );
};

export default AwaitingSignatureDocuments;
