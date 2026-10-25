import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState, useRef, useEffect, useId } from 'react';
import { CloseRounded, Cancel, CheckCircle, DriveFolderUploadRounded } from '@mui/icons-material';
import NotarizationService from '../../services/notarization.service';
import DocumentStatusChip from '../shared/DocumentStatusChip';
import ReviewDocumentPreview from './ReviewDocumentPreview';

const DetailDocumentModal = ({ open, onClose, document }) => {
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
      await NotarizationService.forwardDocumentStatus(document.documentId.id, formData);
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
      await NotarizationService.forwardDocumentStatus(document.documentId.id, formData);
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

  const handleDeleteDocument = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const source = document?.documentId;
  const fields = [
    ['Họ và tên', source?.requesterInfo?.fullName], ['CMND/CCCD', source?.requesterInfo?.citizenId],
    ['Số điện thoại', source?.requesterInfo?.phoneNumber], ['Email', source?.requesterInfo?.email],
    ['Lĩnh vực công chứng', source?.notarizationField?.name], ['Dịch vụ công chứng', source?.notarizationService?.name],
  ];
  return (
    <Dialog open={open} onClose={onClose} fullScreen={mobile} fullWidth maxWidth="xl" aria-labelledby={titleId}>
      <DialogTitle id={`${titleId}-header`} sx={{ pr: 8 }}>
        <Box component="span" id={titleId}>Xét duyệt hồ sơ công chứng</Box>
        <Typography component="span" sx={{ display: 'block', mt: 1, overflowWrap: 'anywhere' }}>Mã hồ sơ: {source?.id}</Typography>
        <Box sx={{ mt: 1 }}><DocumentStatusChip status={document?.status} /></Box>
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
          <TextField label="Ghi chú xét duyệt" required multiline fullWidth minRows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)} helperText="Nhập ghi chú và chọn tài liệu phản hồi trước khi chấp nhận hoặc từ chối hồ sơ." />
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
export default DetailDocumentModal;
