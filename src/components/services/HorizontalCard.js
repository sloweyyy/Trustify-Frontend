import React, { useState } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { DescriptionOutlined, ShareOutlined, Add, VisibilityOutlined } from '@mui/icons-material';
import TransferModal from './TransferModal';
import PurchaseModal from './PurchaseModal';
import FilePreviewModal from './FilePreviewModal';

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Chưa có thông tin' : date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
const HorizontalCard = ({ document }) => {
  const [open, setOpen] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showMintAddress, setShowMintAddress] = useState(false);
  const filename = document.filename?.replace(/^\d+-/, '') || 'Tài liệu chưa có tên';
  const sixMonthDate = new Date(document.mintedAt);
  sixMonthDate.setMonth(sixMonthDate.getMonth() + 6);

  return (
    <>
      <Paper component="article" variant="outlined" sx={{ p: { xs: 2, sm: 3 }, minWidth: 0 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'stretch', md: 'flex-start' }}>
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <DescriptionOutlined aria-hidden="true" sx={{ color: 'primary.main', mt: 0.5 }} />
              <Typography component="h2" variant="h6" sx={{ overflowWrap: 'anywhere' }}>{filename}</Typography>
            </Stack>
            <Button variant="text" aria-expanded={showMintAddress} onClick={() => setShowMintAddress(!showMintAddress)} sx={{ mt: 1 }}>
              {showMintAddress ? 'Ẩn mã bản ghi' : 'Xem mã bản ghi'}
            </Button>
            {showMintAddress && <Box sx={{ mt: 1, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography color="text.secondary">Mã bản ghi (địa chỉ mint NFT)</Typography>
              <Typography sx={{ overflowWrap: 'anywhere' }}>{document.mintAddress || 'Chưa có mã bản ghi'}</Typography>
            </Box>}
          </Box>
          <Box component="dl" sx={{ m: 0, flex: 1, minWidth: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 1.5, '& dd': { m: 0 }, '& dt': { color: 'text.secondary' } }}>
            <Box><Typography component="dt">Ngày nhận</Typography><Typography component="dd">{formatDate(document.mintedAt)}</Typography></Box>
            <Box><Typography component="dt">Mốc 6 tháng từ ngày nhận</Typography><Typography component="dd">{formatDate(sixMonthDate)}</Typography></Box>
            <Box><Typography component="dt">Số lượng</Typography><Typography component="dd">{document.amount}</Typography></Box>
          </Box>
          <Stack spacing={1} sx={{ minWidth: { md: 180 } }}>
            <Button variant="contained" startIcon={<VisibilityOutlined />} aria-label={`Xem tài liệu ${filename}`} onClick={(event) => { event.stopPropagation(); setPreviewDocument(document); }}>Xem tài liệu</Button>
            <Button variant="outlined" startIcon={<ShareOutlined />} aria-label={`Chia sẻ tài liệu ${filename}`} onClick={(event) => { event.stopPropagation(); setOpen(true); }}>Chia sẻ tài liệu</Button>
            <Button variant="text" startIcon={<Add />} aria-label={`Mua thêm ${filename}`} onClick={(event) => { event.stopPropagation(); setOpenPurchase(true); }}>Mua thêm</Button>
          </Stack>
        </Stack>
      </Paper>
      <TransferModal open={open} onClose={() => setOpen(false)} document={document} />
      <PurchaseModal open={openPurchase} onClose={() => setOpenPurchase(false)} document={document} />
      {previewDocument && <FilePreviewModal open={!!previewDocument} onClose={() => setPreviewDocument(null)} fileUrl={previewDocument?.fileUrl} metadataUrl={previewDocument?.ipfsLink || previewDocument?.metadataUri} filename={previewDocument?.filename} />}
    </>
  );
};
export default HorizontalCard;
