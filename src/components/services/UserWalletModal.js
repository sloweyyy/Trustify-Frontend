import React, { useEffect, useId, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, Typography, useMediaQuery } from '@mui/material';
import { CloseRounded, DescriptionOutlined, VisibilityOutlined } from '@mui/icons-material';
import UserWalletService from '../../services/userwallet.service';
import FilePreviewModal from './FilePreviewModal';
import { EmptyState, ErrorState, LoadingState } from '../shared/PageFeedback';

const formatDate = (value) => new Date(value).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
const UserWalletModal = ({ open, onClose, handleDocumentWalletFileChange }) => {
  const id = useId();
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showMintAddress, setShowMintAddress] = useState(false);

  useEffect(() => {
    if (!open) return;
    let active = true;
    setLoading(true); setError(false);
    const fetchDocuments = async () => {
      try {
        const response = await UserWalletService.getUserWallet();
        if (response.status !== 200) throw new Error('Wallet unavailable');
        const items = response.data.nftItems.filter((item) => item.amount > 0).sort((a, b) => b.amount - a.amount);
        if (active) setDocuments(items);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchDocuments();
    return () => { active = false; };
  }, [open, retry]);

  const handleSelectDocument = (document) => { handleDocumentWalletFileChange(document); onClose(); };
  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="lg" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
        PaperProps={{ sx: { maxHeight: fullScreen ? '100dvh' : '90dvh', minWidth: 0 } }}>
        <DialogTitle component="div" id={`${id}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h2" variant="h6" id={`${id}-title`}>Ví tài liệu</Typography>
            <Typography id={`${id}-description`} color="text.secondary">Chọn tài liệu đã công chứng từ ví của bạn. Mỗi bản chứng nhận điện tử (NFT) liên kết với một tài liệu trong ví.</Typography>
          </Box>
          <IconButton aria-label="Đóng ví tài liệu" onClick={onClose}><CloseRounded /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          {loading ? <LoadingState label="Đang tải ví tài liệu…" /> : error ? (
            <ErrorState title="Chưa thể tải ví tài liệu" description="Bạn có thể thử lại hoặc chọn tệp từ thiết bị." onRetry={() => setRetry((value) => value + 1)} />
          ) : !documents.length ? (
            <EmptyState title="Chưa có tài liệu để chọn" description="Bạn có thể đóng ví và chọn tệp từ thiết bị để tiếp tục." />
          ) : <>
            <Button variant="text" onClick={() => setShowMintAddress((value) => !value)} aria-pressed={showMintAddress}>{showMintAddress ? 'Hiện tên tài liệu' : 'Hiện mã chứng nhận'}</Button>
            <List disablePadding aria-label="Tài liệu trong ví" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              {documents.map((document, index) => {
                const name = document.filename.replace(/^\d+-/, '');
                const expiry = new Date(document.mintedAt);
                expiry.setMonth(expiry.getMonth() + 6);
                return <ListItem key={document._id || index} disableGutters sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', gap: 2 }}>
                  <DescriptionOutlined aria-hidden="true" color="primary" />
                  <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
                    <Typography sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{name}</Typography>
                    {showMintAddress && <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>Mã chứng nhận: {document.mintAddress}</Typography>}
                    <Typography color="text.secondary">Ngày nhận: {formatDate(document.mintedAt)}</Typography>
                    <Typography color="text.secondary">Ngày hết hạn: {formatDate(expiry)}</Typography>
                    <Typography color="text.secondary">Số lượng: {document.amount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, flexShrink: 0, maxWidth: '100%' }}>
                    <Button variant="outlined" aria-label={`Xem trước ${name}`} onClick={() => setPreviewDocument(document)} startIcon={<VisibilityOutlined />}>Xem trước</Button>
                    <Button variant="contained" aria-label={`Chọn tài liệu ${name}`} onClick={() => handleSelectDocument(document)}>Chọn tài liệu</Button>
                  </Box>
                </ListItem>;
              })}
            </List>
          </>}
        </DialogContent>
        <DialogActions><Button variant="text" onClick={onClose}>Đóng ví</Button></DialogActions>
      </Dialog>
      {previewDocument && <FilePreviewModal open={!!previewDocument} onClose={() => setPreviewDocument(null)} fileUrl={previewDocument.fileUrl} metadataUrl={previewDocument.ipfsLink || previewDocument.metadataUri} filename={previewDocument.filename} />}
    </>
  );
};
export default UserWalletModal;
