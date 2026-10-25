import React from 'react';
import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { LoadingState, ErrorState } from '../shared/PageFeedback';
const VerificationStatusBox = ({ status, displayText, nftData, onRetry }) => {
  if (status.searching) return <LoadingState label="Đang đối chiếu bản ghi tài liệu…" />;
  if (status.notFound) return nftData?.status && nftData.status !== 404 ? <ErrorState title="Chưa thể xác minh bản ghi" description="Bạn kiểm tra kết nối và thử lại. Chưa thể kết luận về bản ghi lúc này." onRetry={onRetry} /> : <Paper role="status" variant="outlined" sx={{ p: 3, overflowWrap: 'anywhere' }}><Typography component="h2" variant="h6">Không tìm thấy bản ghi tài liệu</Typography><Typography sx={{ my: 2 }}>Mã bản ghi: {displayText}</Typography><Typography color="text.secondary">Kiểm tra mã đã sao chép từ ví tài liệu và thử lại.</Typography></Paper>;
  if (!status.found) return null;
  const name = nftData?.offChainMetadata?.name || nftData?.offChainMetadata?.properties?.files?.[0]?.name;
  const type = name?.split('.').pop()?.toUpperCase() || 'Chưa có thông tin';
  return <Paper role="status" variant="outlined" sx={{ p: { xs: 2, md: 3 }, overflowWrap: 'anywhere' }}>
    <Typography component="h2" variant="h5">Đã tìm thấy bản ghi tài liệu</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Thông tin được trả về từ mạng thử nghiệm Solana devnet.</Typography>
    <Box component="dl" sx={{ m: 0, my: 3, display: 'grid', gap: 2 }}>{[['Mã bản ghi tài liệu', nftData?.mintAddress], ['Tên tài liệu', nftData?.offChainMetadata?.name], ['Loại tài liệu', type]].map(([label, value]) => <Box key={label}><Typography component="dt" color="text.secondary">{label}</Typography><Typography component="dd" sx={{ m: 0 }}>{value || 'Chưa có thông tin'}</Typography></Box>)}</Box>
    <Typography component="h3" variant="h6">Liên kết đối chiếu</Typography><Box sx={{ display: 'grid', gap: 1, mt: 1 }}>{[['explorerLink', 'Xem trên Solana Explorer'], ['solscanLink', 'Xem trên Solscan'], ['ipfsLink', 'Xem thông tin trên IPFS'], ['metadataUri', 'Xem địa chỉ thông tin gốc']].map(([key, label]) => nftData?.viewLinks?.[key] && <Link key={key} href={nftData.viewLinks[key]} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>{label} (cửa sổ mới)</Link>)}</Box>
    <Typography color="text.secondary" sx={{ mt: 3 }}>Bản ghi dùng để đối chiếu thông tin được cung cấp, không thay thế kết quả công chứng hoặc việc kiểm tra nội dung tài liệu.</Typography>
    {onRetry && <Button variant="text" onClick={onRetry} sx={{ mt: 2 }}>Kiểm tra lại mã này</Button>}
  </Paper>;
};
export default VerificationStatusBox;
