import React from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AvatarWithCloseButton = ({ email, onRemove, name, isCreator, onHideRemoveIcon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, maxWidth: '100%', p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
    <Avatar sx={{ width: 32, height: 32 }} aria-hidden="true">{email?.charAt(0).toLocaleUpperCase('vi-VN') || '?'}</Avatar>
    <Box sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>
      <Typography variant="body2" fontWeight={600}>{email}</Typography>
      {name && <Typography variant="body2" color="text.secondary">{name}</Typography>}
      <Typography variant="caption" color="text.secondary">{isCreator ? 'Chủ phiên' : 'Khách mời'}</Typography>
    </Box>
    {!onHideRemoveIcon && <IconButton aria-label={`Bỏ khách mời ${email}`} onClick={onRemove} sx={{ flexShrink: 0 }}><CloseIcon fontSize="small" /></IconButton>}
  </Box>
);
export default AvatarWithCloseButton;
