import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreateNotaryAccountModal from './CreateNotaryAccountModal';
const Header = () => {
  const [open, setOpen] = React.useState(false);
  return <>
    <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
      <Box sx={{ flex: 1, minWidth: 200 }}><Typography component="h1" variant="h4">Quản lý nhân viên</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Tra cứu nhân viên và xem thông tin tài khoản.</Typography></Box>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ width: { xs: '100%', sm: 'auto' } }}>Thêm công chứng viên</Button>
    </Box>
    <CreateNotaryAccountModal open={open} onClose={() => setOpen(false)} />
  </>;
};
export default Header;
