import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';

const HistoryCard = ({ document }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const source = document.documentId;
  return <>
    <Paper component="article" variant="outlined" sx={{ p: 2, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, overflowWrap: 'anywhere' }}>
      <Typography component="h3" variant="h6">{source.requesterInfo.fullName}</Typography>
      {document.status === 'readyToSign' ? <StatusChip label="Chờ ký số" tone="signature" /> : <DocumentStatusChip status={document.status} />}
      <Typography>{source.notarizationField.name}</Typography>
      <Box component="dl" sx={{ m: 0, display: 'grid', gap: 1 }}>
        <Box><Typography component="dt" color="text.secondary">Mã hồ sơ</Typography><Typography component="dd" sx={{ m: 0 }}>{source.id}</Typography></Box>
        <Box><Typography component="dt" color="text.secondary">Ngày gửi hồ sơ</Typography><Typography component="dd" sx={{ m: 0 }}>{new Date(source.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Typography></Box>
      </Box>
      <Button variant="outlined" onClick={handleOpen} aria-label={`Xem chi tiết hồ sơ ${source.id}`} sx={{ mt: 'auto', width: { xs: '100%', sm: 'auto' } }}>Xem chi tiết</Button>
    </Paper>
    <DetailHistoryDocumentModal open={open} onClose={handleClose} document={document} />
  </>;
};
export default HistoryCard;
