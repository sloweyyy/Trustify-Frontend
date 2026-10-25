import React, { useEffect, useId, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@mui/material';
import { CloseRounded, OpenInNewRounded } from '@mui/icons-material';
import IPFSService from '../../services/ipfs.service';
import { ErrorState, LoadingState } from '../shared/PageFeedback';

// Prefer `fileUrl` (a short-lived signed link from the API); older wallet items only have NFT metadata.
const FilePreviewModal = ({ open, onClose, fileUrl: directUrl, metadataUrl, filename }) => {
  const id = useId();
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const isPDF = /\.pdf$/i.test(filename || '');
  const isImage = /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(filename || '');

  useEffect(() => {
    if (!open) return;
    let active = true;
    setLoading(true); setError(false); setFileUrl('');
    const fetchFile = async () => {
      try {
        if (!directUrl && !metadataUrl) throw new Error('Missing file');
        const url = directUrl || (await IPFSService.getFileUrlFromMetadata(metadataUrl));
        if (!url) throw new Error('Missing file URL');
        if (active) setFileUrl(url);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchFile();
    return () => { active = false; };
  }, [open, directUrl, metadataUrl, retry]);

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="lg" aria-labelledby={`${id}-title`}
      PaperProps={{ sx: { height: fullScreen ? '100dvh' : '90dvh', minWidth: 0 } }}>
      <DialogTitle component="div" id={`${id}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography component="h2" variant="h6" id={`${id}-title`}>Xem tài liệu</Typography>
          <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>{filename || 'Tài liệu'}</Typography>
        </Box>
        <IconButton aria-label="Đóng xem tài liệu" onClick={onClose}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, p: { xs: 2, sm: 3 } }}>
        {loading ? <LoadingState label="Đang tải tài liệu…" /> : error ? (
          <ErrorState title="Chưa thể mở tài liệu" description="Bạn có thể thử tải lại hoặc đóng để quay về danh sách." onRetry={() => setRetry((value) => value + 1)} />
        ) : isPDF ? (
          <Box component="iframe" src={`${fileUrl}#toolbar=1&navpanes=1`} title={`Tài liệu PDF: ${filename || 'Tài liệu'}`}
            sx={{ width: '100%', flex: 1, minHeight: 240, border: 0, bgcolor: '#fff' }} />
        ) : isImage ? (
          <Box sx={{ display: 'flex', flex: 1, minHeight: 0, justifyContent: 'center', alignItems: 'center', bgcolor: '#fff' }}>
            <Box component="img" src={fileUrl} alt={filename || 'Tài liệu'} onError={() => setError(true)}
              sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </Box>
        ) : <Typography>Không xem trước được định dạng này. Mở tệp để xem.</Typography>}
      </DialogContent>
      <DialogActions disableSpacing sx={{ flexDirection: { xs: 'column', sm: 'row-reverse' }, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'flex-start' }}>
        {!loading && !error && fileUrl && <Button component="a" variant="outlined" href={fileUrl} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNewRounded />}>Mở tài liệu trong tab mới</Button>}
        <Button variant="text" onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};
export default FilePreviewModal;
