import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Skeleton, Typography } from '@mui/material';
import HorizontalCard from '../../components/services/HorizontalCard';
import UserWalletService from '../../services/userwallet.service';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';

const DocumentWallet = () => {
  const [documentWallet, setDocumentWallet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchDocumentWallet = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await UserWalletService.getUserWallet();
      if (response.status === 200) setDocumentWallet(response.data.nftItems);
      else setError(true);
    } catch (failure) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { fetchDocumentWallet(); }, [fetchDocumentWallet]);

  return (
    <Box sx={{ width: '100%', minWidth: 0, p: { xs: 2, sm: 3 } }}>
      <Typography component="h1" variant="h4">Ví tài liệu</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Xem tài liệu đã nhận và thông tin bản ghi để đối chiếu khi cần.</Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Bản ghi blockchain (NFT) là mã giúp đối chiếu thông tin tài liệu. Bạn có thể xem mã bản ghi bên dưới mỗi tài liệu. Hệ thống hiện sử dụng mạng thử nghiệm Solana devnet.
      </Alert>
      {loading ? <LoadingState label="Đang tải ví tài liệu…"><Skeleton variant="rounded" height={180} /></LoadingState>
        : error ? <ErrorState title="Chưa thể tải ví tài liệu" description="Bạn có thể thử tải lại danh sách tài liệu." onRetry={fetchDocumentWallet} />
          : documentWallet.length === 0 ? <EmptyState title="Chưa có bản ghi trong ví tài liệu" description="Khi được cấp, tài liệu và mã bản ghi sẽ hiển thị tại đây. Bạn có thể theo dõi tiến độ trong Lịch sử." />
            : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography role="status" aria-live="polite" color="text.secondary">{documentWallet.length} tài liệu trong ví</Typography>
              {documentWallet.map((document, index) => <HorizontalCard key={document._id || document.mintAddress || index} document={document} />)}
            </Box>}
    </Box>
  );
};
export default DocumentWallet;
