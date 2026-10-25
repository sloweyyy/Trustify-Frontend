import React, { useId } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@mui/material';
import DocumentStatusChip from '../shared/DocumentStatusChip';
const SearchingDocumentModal = ({ open, handleClose, document }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const title = useId();
  const states = ['pending', 'processing', 'digitalSignature', 'completed'];
  const labels = ['Chờ xử lý', 'Đang xử lý', 'Chờ ký số', 'Hoàn tất'];
  const raw = document?.status;
  const active = raw === 'verification' ? 1 : states.indexOf(raw);
  return <Dialog open={open} onClose={handleClose} fullScreen={mobile} fullWidth maxWidth="sm" aria-labelledby={title}>
    <DialogTitle id={title}>Chi tiết trạng thái hồ sơ</DialogTitle><DialogContent dividers><Typography color="text.secondary" sx={{ mb: 2, overflowWrap: 'anywhere' }}>Mã hồ sơ: {document?.documentId || document?._id || 'Chưa có mã'}</Typography><DocumentStatusChip status={raw} />
      {raw === 'rejected' ? <Alert severity="error" sx={{ mt: 3 }}>Hồ sơ bị từ chối. Bạn xem ghi chú xử lý bên dưới.</Alert> : active >= 0 && <Stepper orientation="vertical" activeStep={active} sx={{ my: 3 }}>{labels.map((label, index) => <Step key={label} completed={index < active}><StepLabel>{label}</StepLabel></Step>)}</Stepper>}
      <Typography component="h3" variant="h6" sx={{ mt: 3 }}>Ghi chú xử lý</Typography><Typography sx={{ mt: 1, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{document?.feedback || 'Chưa có ghi chú xử lý.'}</Typography>
    </DialogContent><DialogActions><Button onClick={handleClose} variant="outlined">Đóng</Button></DialogActions>
  </Dialog>;
};
export default SearchingDocumentModal;
