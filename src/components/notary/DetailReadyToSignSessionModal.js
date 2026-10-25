import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useEffect, useId } from 'react';
import { CloseRounded, CheckCircle } from '@mui/icons-material';
import SessionService from '../../services/session.service';
import { toast } from 'react-toastify';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';
import FileAttachmentList from '../shared/FileAttachmentList';
import ReviewDocumentPreview from './ReviewDocumentPreview';

const DetailReadyToSignSessionModal = ({ open, onClose, session }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = useId();
  const [isSending, setIsSending] = useState(false);
  const isDisabled = session?.status === 'completed' || session?.status === 'rejected';
  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const handleAccept = async () => {
    setIsSending(true);
    try {
      const response = await SessionService.approveSignatureSessionByNotary(session.sessionId.id);
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
    if (session?.sessionId?.files) {
      const [docs, images] = session?.sessionId?.files.reduce(
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
  }, [session]);

  const source = session?.sessionId;
  const fields = [
    ['Họ và tên', source?.createdBy?.name], ['CMND/CCCD', source?.createdBy?.citizenId],
    ['Số điện thoại', source?.createdBy?.phoneNumber], ['Email', source?.createdBy?.email],
    ['Lĩnh vực công chứng', source?.notaryField?.name], ['Dịch vụ công chứng', source?.notaryService?.name],
  ];
  return (
    <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="xl" aria-labelledby={titleId}>
      <DialogTitle id={titleId} sx={{ pr: 8 }}>
        Chi tiết phiên công chứng
        <Typography component="span" sx={{ display: 'block', mt: 1, overflowWrap: 'anywhere' }}>Mã phiên: {source?.id}</Typography>
        <Box sx={{ mt: 1 }}>{session?.status === 'readyToSign' ? <StatusChip label="Chờ ký số" tone="signature" /> : <DocumentStatusChip status={session?.status} />}</Box>
        <IconButton aria-label="Đóng chi tiết phiên" onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 2fr) minmax(0, 3fr)' }, alignItems: 'start', gap: 3 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="h6">Thông tin phiên</Typography>
          <Box component="dl" sx={{ m: 0, my: 2, display: 'grid', gap: 2 }}>
            {fields.map(([label, value]) => <Box key={label}>
              <Typography component="dt" color="text.secondary">{label}</Typography>
              <Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value || 'Chưa có thông tin'}</Typography>
            </Box>)}
          </Box>
          {session?.status === 'readyToSign' && (session.approvalStatus?.creator?.signatureImage || session.approvalStatus?.users?.some((user) => user.signatureImage)) && <Box sx={{ mb: 3 }}>
            <Typography component="h3" variant="h6">Chữ ký xác nhận</Typography>
            {session.approvalStatus?.creator?.signatureImage && <Box sx={{ mt: 2 }}>
              <Typography>Chữ ký người tạo: {source?.createdBy?.name}</Typography>
              <Box sx={{ mt: 1, p: 2, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'common.white' }}>
                <Box component="img" src={session.approvalStatus.creator.signatureImage} alt="Chữ ký người tạo phiên" sx={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain' }} />
              </Box>
            </Box>}
            {session.approvalStatus?.users?.map((user, index) => user.signatureImage && <Box key={index} sx={{ mt: 2 }}>
              <Typography sx={{ overflowWrap: 'anywhere' }}>Chữ ký người tham gia: {user.email}</Typography>
              <Box sx={{ mt: 1, p: 2, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'common.white' }}>
                <Box component="img" src={user.signatureImage} alt={`Chữ ký người tham gia ${index + 1}`} sx={{ maxWidth: '100%', maxHeight: 150, objectFit: 'contain' }} />
              </Box>
            </Box>)}
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
export default DetailReadyToSignSessionModal;
