import React from 'react';
import { Avatar, Typography } from '@mui/material';

const AvatarIcon = ({ email, name }) => {
  const initial = name?.trim().split(/\s+/).pop()?.charAt(0) || email?.charAt(0) || '?';
  return (
    <div style={{ position: 'relative', display: 'inline-block', marginRight: '8px' }}>
      <Avatar sx={{ width: 32, height: 32 }}>
        <Typography sx={{ fontSize: 12 }}>{initial.toLocaleUpperCase('vi-VN')}</Typography>
      </Avatar>
    </div>
  );
};

export default AvatarIcon;
