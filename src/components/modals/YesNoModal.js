import React, { useId } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Button } from '@mui/material';
import Close from '@mui/icons-material/Close';

const YesNoModal = ({ title, content, open, setOpen, onYes, onNo, yesLabel = 'Có', noLabel = 'Không' }) => {
  const id = useId();
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
      aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
      sx={{ '& .MuiDialog-paper': { m: 2, width: 'calc(100% - 32px)', maxHeight: 'calc(100dvh - 32px)' } }}>
      <DialogTitle id={`${id}-title`} sx={{ pr: 8 }}>{title}</DialogTitle>
      <IconButton aria-label="Đóng hộp thoại" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}><Close /></IconButton>
      <DialogContent><DialogContentText id={`${id}-description`} color="text.primary">{content}</DialogContentText></DialogContent>
      <DialogActions sx={{ '& .MuiButton-root': { flex: { xs: 1, sm: 'initial' } } }}>
        <Button variant="outlined" onClick={onNo} autoFocus>{noLabel}</Button>
        <Button variant="contained" onClick={onYes}>{yesLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default YesNoModal;
