import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { GestureRounded } from '@mui/icons-material';
import DetailDocumentModal from './DetailDocumentModal';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';

const NotaryDocumentCard = ({ document }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const source = document?.documentId;
  const id = source?.id || source?._id || 'Chưa có mã';
  const created = new Date(source?.createdAt);
  const date = Number.isNaN(created.getTime()) ? 'Chưa có ngày' : created.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const time = Number.isNaN(created.getTime()) ? '' : created.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  return (
    <Paper component="article" variant="outlined" sx={{ p: 2, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, .8fr) minmax(0, 1.5fr) auto' }, gap: 2, alignItems: 'center', minWidth: 0, overflowWrap: 'anywhere' }}>
      <Box sx={{ minWidth: 0 }}><Typography component="h3" variant="body1" fontWeight={600}>{source?.requesterInfo?.fullName || 'Chưa có tên'}</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>Mã hồ sơ: {id}</Typography></Box>
      <Box><Typography color="text.secondary">Ngày gửi</Typography><Typography>{date}{time && ` · ${time}`}</Typography></Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography>{source?.notarizationField?.name || 'Chưa có lĩnh vực'}</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>{source?.notarizationService?.name || 'Chưa có dịch vụ'}</Typography>
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          {document?.status === 'readyToSign' ? <StatusChip label="Chờ ký số" tone="signature" /> : <DocumentStatusChip status={document?.status} />}
          {document?.status === 'readyToSign' && document?.signatureImage && <GestureRounded titleAccess="Có chữ ký" sx={{ color: 'text.secondary' }} />}
        </Box>
      </Box>
      <Button variant="outlined" aria-label={`Xem chi tiết hồ sơ ${id}`} onClick={handleOpen}>Xem chi tiết</Button>
      {document?.status === 'processing' ? <DetailDocumentModal open={open} onClose={handleClose} document={document} /> : <DetailHistoryDocumentModal open={open} onClose={handleClose} document={document} />}
    </Paper>
  );
};
export default NotaryDocumentCard;
