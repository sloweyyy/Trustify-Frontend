import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, Drawer, IconButton, Link, List, ListItemButton, useMediaQuery } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { focusRing } from '../config/theme/themeHelpers';

const destinations = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Dịch vụ công chứng', to: '/services' },
  { label: 'Tra cứu hồ sơ', to: '/lookup' },
  { label: 'Xác minh hồ sơ', to: '/verify' },
  { label: 'Hướng dẫn', to: '/user-guide' },
];
const accountLinks = [{ label: 'Đăng nhập', to: '/signin' }, { label: 'Đăng ký', to: '/signup' }];

const Header = () => {
  const compact = useMediaQuery('(max-width:1279px)');
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname, compact]);
  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Link href="#page-content" sx={(theme) => ({ position: 'fixed', left: 16, top: -100, zIndex: theme.zIndex.modal + 1,
        bgcolor: 'background.paper', p: 1.5, '&:focus': { top: 8, ...focusRing(theme) } })}>Đến nội dung chính</Link>
      <Toolbar sx={{ width: '100%', maxWidth: 1280, mx: 'auto', gap: 1 }}>
        {compact && <IconButton color="primary" aria-label="Mở menu điều hướng" aria-controls="public-navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu /></IconButton>}
        <Link component={RouterLink} to="/" underline="none" aria-label="Trustify – Trang chủ" sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44 }}><BrandLogo width={compact ? 132 : 156} /></Link>
        <Box sx={{ flex: 1 }} />
        {!compact && <Box component="nav" aria-label="Điều hướng công khai" sx={{ display: 'flex', gap: 0.5 }}>
          {destinations.map(({ label, to }) => <Button key={to} component={RouterLink} to={to} aria-current={pathname === to ? 'page' : undefined}
            color={pathname === to ? 'primary' : 'inherit'} sx={{ px: 1, color: pathname === to ? 'primary.main' : 'text.primary', borderBottom: 2, borderColor: pathname === to ? 'primary.main' : 'transparent' }}>{label}</Button>)}
        </Box>}
        {!compact && <Button component={RouterLink} to="/signup" color="inherit">Đăng ký</Button>}
        <Button component={RouterLink} to="/signin" variant="contained">Đăng nhập</Button>
      </Toolbar>
      {compact && <Drawer anchor="left" open={open} onClose={() => setOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 320, maxWidth: 'calc(100vw - 32px)', p: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}><BrandLogo width={144} /></Box>
          <IconButton aria-label="Đóng menu điều hướng" onClick={() => setOpen(false)}><Close /></IconButton>
        </Box>
        <List component="nav" id="public-navigation" aria-label="Điều hướng công khai">
          {[...destinations, ...accountLinks].map(({ label, to }) => <ListItemButton key={to} component={RouterLink} to={to}
            selected={pathname === to} aria-current={pathname === to ? 'page' : undefined} onClick={() => setOpen(false)} sx={{ mb: 1 }}>{label}</ListItemButton>)}
        </List>
      </Drawer>}
    </AppBar>
  );
};
export default Header;
