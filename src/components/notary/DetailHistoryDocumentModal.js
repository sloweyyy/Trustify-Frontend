import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect, useId } from 'react';
import { CloseRounded, CheckCircle } from '@mui/icons-material';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';
import FileAttachmentList from '../shared/FileAttachmentList';
import ReviewDocumentPreview from './ReviewDocumentPreview';

const DetailHistoryDocumentModal = ({ open, onClose, document }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = useId();
  const [isSending, setIsSending] = useState(false);
  const isDisabled = document?.status === 'completed' || document?.status === 'rejected';
  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const handleAccept = async () => {
    setIsSending(true);
    try {
      const response = await NotarizationService.approveSignatureByNotary(document.documentId.id);
      if (response.status === 200) {
        toast.success('Chấp nhận thành công!');
        onClose();
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (document?.documentId?.files) {
      const [docs, images] = document?.documentId?.files.reduce(
        ([docAcc, imgAcc], file) => {
          if (['.pdf', '.docx'].some((ext) => file.filename?.toString().toLowerCase().endsWith(ext))) {
            docAcc.push(file);
          } else if (['.png', '.jpg', '.jpeg'].some((ext) => file.filename?.toString().toLowerCase().endsWith(ext))) {
            imgAcc.push(file);
          }
          return [docAcc, imgAcc];
        },
        [[], []],
      );

      setDocumentFiles(docs);
      setImageFiles(images);
    }
  }, [document]);

  const source = document?.documentId;
  const fields = [
    ['Họ và tên', source?.requesterInfo?.fullName], ['CMND/CCCD', source?.requesterInfo?.citizenId],
    ['Số điện thoại', source?.requesterInfo?.phoneNumber], ['Email', source?.requesterInfo?.email],
    ['Lĩnh vực công chứng', source?.notarizationField?.name], ['Dịch vụ công chứng', source?.notarizationService?.name],
  ];
  return (
    <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="xl" aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ pr: 8 }}>
        Chi tiết hồ sơ công chứng
        <Typography component="span" sx={{ display: 'block', mt: 1, overflowWrap: 'anywhere' }}>Mã hồ sơ: {source?.id}</Typography>
        <Box sx={{ mt: 1 }}>{document?.status === 'readyToSign' ? <StatusChip label="Chờ ký số" tone="signature" /> : <DocumentStatusChip status={document?.status} />}</Box>
        <IconButton aria-label="Đóng chi tiết hồ sơ" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 2fr) minmax(0, 3fr)' }, alignItems: 'start', gap: 3 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="h6">Thông tin hồ sơ</Typography>
          <Box component="dl" sx={{ m: 0, my: 2, display: 'grid', gap: 2 }}>
            {fields.map(([label, value]) => <Box key={label}>
              <Typography component="dt" color="text.secondary">{label}</Typography>
              <Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value || 'Chưa có thông tin'}</Typography>
            </Box>)}
          </Box>
          {document?.status === 'readyToSign' && document?.signatureImage && <Box sx={{ mb: 3 }}>
            <Typography component="h3" variant="h6">Chữ ký xác nhận</Typography>
            <Box sx={{ mt: 1, p: 2, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'common.white' }}>
              <Box component="img" src={document.signatureImage} alt="Chữ ký xác nhận của người yêu cầu" sx={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
            </Box>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Chữ ký của: {source?.requesterInfo?.fullName}</Typography>
          </Box>}
          <Typography component="h3" variant="h6">Tài liệu phản hồi</Typography>
          {source?.output?.length ? <FileAttachmentList files={source.output} getName={(file) => file.filename} onOpen={(file) => window.open(file.firebaseUrl, '_blank', 'noopener,noreferrer')} sourceLabel="Tài liệu phản hồi" confirmed /> : <Typography color="text.secondary" sx={{ mt: 1 }}>Chưa có tài liệu phản hồi.</Typography>}
        </Box>
        <ReviewDocumentPreview files={[...documentFiles, ...imageFiles]} />
      </DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& > .MuiButton-root': { width: { xs: '100%', sm: 'auto' } } }}>
        <Button variant="text" onClick={onClose}>Đóng</Button>
        <Button variant="contained" endIcon={<CheckCircle />} onClick={handleAccept} disabled={isSending || isDisabled}>{isSending ? 'Đang gửi…' : 'Chấp nhận'}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DetailHistoryDocumentModal;
