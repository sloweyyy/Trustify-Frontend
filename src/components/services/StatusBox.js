import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import DocumentStatusChip from '../shared/DocumentStatusChip';
import { LoadingState } from '../shared/PageFeedback';
const StatusBox = ({ status, displayText, document, onOpenModal }) => status.searching ? <LoadingState label="Đang tìm thông tin hồ sơ…" /> : <Paper variant="outlined" role="status" sx={{ p: 3, overflowWrap: 'anywhere' }}>
  <Typography component="h2" variant="h6">{status.found ? 'Đã tìm thấy thông tin hồ sơ' : 'Không tìm thấy hồ sơ'}</Typography><Typography color="text.secondary" sx={{ my: 2 }}>Mã hồ sơ: {displayText}</Typography>
  {status.found ? <><DocumentStatusChip status={document?.status} /><Button variant="outlined" onClick={onOpenModal} sx={{ display: 'flex', mt: 2 }}>Xem chi tiết</Button></> : <Typography>Bạn kiểm tra lại mã hồ sơ đã nhận rồi thử lại.</Typography>}
</Paper>;
export default StatusBox;
