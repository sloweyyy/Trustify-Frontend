import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from '@mui/material';
import React, { useId } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SessionService from '../../services/session.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinSessionModal = ({ sessionId, open, setOpen }) => {
  const titleId = useId();
  const handleOnClose = () => setOpen(false);

  const onAccept = async () => {
    const response = await SessionService.joinSession(sessionId, 'accept');

    if (response.message === 'User already accepted') {
      toast.info('Bạn đã tham gia phiên công chứng này');
      handleOnClose();
      return;
    } else if (response.message === 'User already rejected') {
      toast.info('Bạn đã từ chối tham gia phiên công chứng này');
      handleOnClose();
      return;
    }

    toast.success('Tham gia phiên công chứng thành công');
    handleOnClose();
  };

  const onReject = async () => {
    const response = await SessionService.joinSession(sessionId, 'reject');

    if (response.message === 'User already accepted') {
      toast.info('Bạn đã tham gia phiên công chứng này');
      handleOnClose();
      return;
    } else if (response.message === 'User already rejected') {
      toast.info('Bạn đã từ chối tham gia phiên công chứng này');
      handleOnClose();
      return;
    }

    toast.success('Tham gia phiên công chứng thành công');
    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth="xs" aria-labelledby={titleId}>
      <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Typography component="h2" variant="h5" id={titleId} sx={{ flex: 1 }}>Tham gia phiên công chứng</Typography>
        <IconButton aria-label="Đóng lời mời tham gia phiên" onClick={handleOnClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent><Typography>Bạn được mời tham gia một phiên công chứng. Chọn Chấp nhận để tham gia hoặc Từ chối lời mời.</Typography></DialogContent>
      <DialogActions sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' }, '& .MuiButton-root': { width: { xs: '100%', sm: 'auto' }, ml: '0 !important' } }}>
        <Button variant="outlined" onClick={onReject}>Từ chối</Button>
        <Button variant="contained" onClick={onAccept}>Chấp nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinSessionModal;
