import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useRef, useEffect, useId } from 'react';
import { CloseRounded, Cancel, CheckCircle, DriveFolderUploadRounded } from '@mui/icons-material';
import SessionService from '../../services/session.service';
import DocumentStatusChip from '../shared/DocumentStatusChip';
import ReviewDocumentPreview from './ReviewDocumentPreview';

const DetailProcessingSessionModal = ({ open, onClose, session }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const titleId = useId();
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const isDisabled = sending || files.length === 0 || feedback === '';
  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
    const prepareFormData = (action, feedback, files) => {
        const formData = new FormData();
        formData.append('action', action);
        formData.append('feedback', feedback);

        files.forEach((file) => {
            formData.append(`files`, file);
        });

        return formData;
    };

    const handleAccept = async () => {
        setSending(true);
        const formData = prepareFormData('accept', feedback, files);

        try {
            await SessionService.forwardSessionStatus(session.sessionId.id, formData);
            setSending(false);
            onClose();
        } catch (error) {
            console.error('Error during accepting document:', error);
            setSending(false);
        }
    };

    const handleReject = async () => {
        setSending(true);
        const formData = prepareFormData('reject', feedback, files);

        try {
            await SessionService.forwardSessionStatus(session.sessionId.id, formData);
            setSending(false);
            onClose();
        } catch (error) {
            console.error('Error during rejecting document:', error);
            setSending(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter((file) =>
            [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ].includes(file.type),
        );

        if (validFiles) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
        fileInputRef.current.value = null;
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

    const handleDeleteDocument = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

  const source = session?.sessionId;
  const fields = [
    ['Họ và tên', source?.createdBy?.name], ['CMND/CCCD', source?.createdBy?.citizenId],
    ['Số điện thoại', source?.createdBy?.phoneNumber], ['Email', source?.createdBy?.email],
    ['Lĩnh vực công chứng', source?.notaryField?.name], ['Dịch vụ công chứng', source?.notaryService?.name],
  ];
  return (
    <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="xl" aria-labelledby={titleId}>
      <DialogTitle id={`${titleId}-header`} sx={{ pr: 8 }}>
        <Box component="span" id={titleId}>Xét duyệt phiên công chứng</Box>
        <Typography component="span" sx={{ display: 'block', mt: 1, overflowWrap: 'anywhere' }}>Mã phiên: {source?.id}</Typography>
        <Box sx={{ mt: 1 }}><DocumentStatusChip status={session?.status} /></Box>
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
          <Typography component="h3" variant="h6">Người tham gia</Typography>
          <Box component="ul" sx={{ pl: 3, my: 2 }}>
            {source?.users?.length ? source.users.map((user, index) => <Typography component="li" key={index} sx={{ overflowWrap: 'anywhere' }}>{user.name || user.email || 'Người tham gia'}</Typography>) : <Typography component="li" color="text.secondary">Chưa có người tham gia.</Typography>}
          </Box>
          <TextField label="Ghi chú xét duyệt" required multiline fullWidth minRows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} helperText="Nhập ghi chú và chọn tài liệu phản hồi trước khi chấp nhận hoặc từ chối phiên." />
          <Typography component="h3" variant="h6" sx={{ mt: 3 }}>Tài liệu phản hồi</Typography>
          <Button variant="outlined" startIcon={<DriveFolderUploadRounded />} onClick={handleUploadClick} sx={{ mt: 1 }}>Chọn tệp phản hồi</Button>
          <Typography color="text.secondary" sx={{ mt: 1 }}>Định dạng PDF, DOC hoặc DOCX.</Typography>
          <input aria-label="Chọn tài liệu phản hồi" type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf,.doc,.docx" />
          {files.map((file, index) => <Box key={index} sx={{ mt: 1, p: 1, border: 1, borderColor: 'divider', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>{file.name}</Typography>
            <IconButton aria-label={`Bỏ tài liệu ${file.name}`} onClick={() => handleDeleteDocument(index)}><Cancel /></IconButton>
          </Box>)}
        </Box>
        <ReviewDocumentPreview files={[...documentFiles, ...imageFiles]} />
      </DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& > .MuiButton-root': { width: { xs: '100%', sm: 'auto' } } }}>
        <Button variant="text" onClick={onClose}>Đóng</Button>
        <Button variant="outlined" color="error" endIcon={<Cancel />} onClick={handleReject} disabled={isDisabled}>Từ chối</Button>
        <Button variant="contained" endIcon={<CheckCircle />} onClick={handleAccept} disabled={isDisabled}>{sending ? 'Đang gửi…' : 'Chấp nhận'}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DetailProcessingSessionModal;
