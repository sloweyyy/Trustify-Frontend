import React, { useCallback, useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Divider, Drawer, IconButton, List, Typography, useMediaQuery } from '@mui/material';
import {
  Menu as MenuIcon,
  Close,
  Article,
  HistoryEdu,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Logout,
  Wallet,
  VerifiedUser,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../stores/actions/authAction';
import YesNoModal from './modals/YesNoModal';
import {
  AddCircleOutline,
  DocumentScanner,
  Groups2Rounded,
  GridViewRounded,
  SupervisorAccountRounded,
  AccountCircleRounded,
  HailRounded,
  WorkHistoryRounded,
} from '@mui/icons-material';
import SidebarItem from './static/SidebarItem';
import BrandLogo from './BrandLogo';
import { focusRing } from '../config/theme/themeHelpers';
const MENUS = {
  LOGOUT: 'logout',
  PROFILE: 'profile',
  CREATE_NOTARY_SESSION: 'create-notary-session',
};

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const role = user?.role;

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout()).unwrap();
      if (resultAction) navigate('/signin');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSelectMenu = (menu) => {
    if (menu.type === MENUS.LOGOUT) {
      setOpenLogoutModal(true);
    } else if (menu.type === 'verify') {
      window.location.href = menu.href;
    } else {
      navigate(menu.href);
    }
  };

  const renderSidebarItems = useCallback(() => {
    const items = [];

    if (role === 'user') {
      items.push(
        {
          type: 'create-notarization-profile',
          icon: <AddCircleOutline />,
          title: 'Tạo hồ sơ công chứng',
          href: '/user/create-notarization-profile',
        },
        { type: 'history', icon: <DocumentScanner />, title: 'Lịch sử', href: '/user/history' },
        {
          type: 'create-notarization-session',
          icon: <Groups2Rounded />,
          title: 'Phiên công chứng',
          href: '/user/notarization-session',
        },
        {
          type: 'document-wallet',
          icon: <Wallet />,
          title: 'Ví tài liệu',
          href: '/user/document-wallet',
        },
        {
          type: 'verify',
          icon: <VerifiedUser />,
          title: 'Xác minh hồ sơ',
          href: '/verify',
        },
      );
    } else if (role === 'admin') {
      items.push(
        {
          type: 'dashboard',
          icon: <GridViewRounded />,
          title: 'Tổng quan',
          href: '/admin/dashboard',
        },
        {
          type: 'employee-management',
          icon: <HailRounded />,
          title: 'Quản lý nhân viên',
          href: '/admin/employee-management',
        },
        {
          type: 'user-management',
          icon: <SupervisorAccountRounded />,
          title: 'Quản lý người dùng',
          href: '/admin/user-management',
        },
        {
          type: 'notary-management',
          icon: <WorkHistoryRounded />,
          title: 'Quản lý công chứng',
          href: '/admin/notary-management',
        },
        {
          type: 'verify',
          icon: <VerifiedUser />,
          title: 'Xác minh hồ sơ',
          href: '/verify',
        },
      );
    } else if (role === 'secretary') {
      items.push({
        type: 'verify',
        icon: <VerifiedUser />,
        title: 'Xác minh hồ sơ',
        href: '/verify',
      });
    } else if (role === 'notary') {
      items.push(
        {
          type: 'dashboard',
          icon: <GridViewRounded />,
          title: 'Tổng quan',
          href: '/notary/dashboard',
        },
        {
          type: 'pending-notarization-documents',
          icon: <Article />,
          title: 'Tài liệu chờ xác nhận',
          href: '/notary/pending-notarization-documents',
        },
        {
          type: 'awaiting-signature-documents',
          icon: <HistoryEdu />,
          title: 'Tài liệu chờ ký số',
          href: '/notary/awaiting-signature-documents',
        },
        {
          type: 'notary-session-management',
          icon: <Groups2Rounded />,
          title: 'Quản lý phiên',
          href: '/notary/notary-session-management',
        },
        {
          type: 'notarization-history',
          icon: <DocumentScanner />,
          title: 'Lịch sử công chứng',
          href: '/notary/notarization-history',
        },
        {
          type: 'verify',
          icon: <VerifiedUser />,
          title: 'Xác minh hồ sơ',
          href: '/verify',
        },
      );
    }
    return items;
  }, [role]);

  const items = renderSidebarItems();
  const selectedMenu = location.pathname === '/profile' ? MENUS.PROFILE : items.find((item) => item.href === location.pathname)?.type;
  const expanded = !desktop || openSideBar;
  const drawerWidth = expanded ? 288 : 80;
  const roleLabel = { user: 'Cá nhân', notary: 'Công chứng viên', admin: 'Quản trị viên', secretary: 'Thư ký' }[role];
  useEffect(() => { setMobileOpen(false); }, [location.pathname, desktop]);

  return (
    <>
      <Box component="a" href="#page-content" sx={(theme) => ({ position: 'fixed', left: 16, top: -100, zIndex: theme.zIndex.modal + 1,
        bgcolor: 'background.paper', color: 'primary.main', p: 1.5, '&:focus': { top: 8, ...focusRing(theme) } })}>Đến nội dung chính</Box>
      {!desktop && <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton aria-label="Mở menu điều hướng" aria-expanded={mobileOpen} aria-controls="role-navigation" onClick={() => setMobileOpen(true)} color="primary"><MenuIcon /></IconButton>
          <BrandLogo width={132} />
          <Box sx={{ flex: 1 }} />
          <IconButton aria-label="Hồ sơ cá nhân" onClick={() => navigate('/profile')}><AccountCircleRounded /></IconButton>
        </Toolbar>
      </AppBar>}
      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop || mobileOpen}
        onClose={() => setMobileOpen(false)} data-testid="sidebar-container"
        sx={{ width: desktop ? drawerWidth : undefined, flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, maxWidth: 'calc(100vw - 32px)', boxSizing: 'border-box', borderRight: 1, borderColor: 'divider' } }}>
        <Box component="nav" id="role-navigation" aria-label="Điều hướng chính"
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', p: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            {expanded && <Box sx={{ flex: 1, minWidth: 0 }}><BrandLogo width={144} /><Typography color="text.secondary" sx={{ mt: 1 }}>{roleLabel}</Typography></Box>}
            <IconButton data-testid="sidebar-toggle" aria-label={desktop ? (expanded ? 'Thu gọn menu' : 'Mở rộng menu') : 'Đóng menu điều hướng'}
              onClick={() => desktop ? setOpenSideBar(!openSideBar) : setMobileOpen(false)}>
              {!desktop ? <Close /> : expanded ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
            </IconButton>
          </Box>
          <Box sx={{ flex: 1 }}><List>
            {items.map((item) => <SidebarItem key={item.type} {...item} selectedMenu={selectedMenu} openSideBar={expanded} onClick={() => handleSelectMenu(item)} />)}
          </List></Box>
          <Divider sx={{ my: 2 }} />
          <List>
            <SidebarItem icon={<Logout />} type={MENUS.LOGOUT} title="Đăng xuất" selectedMenu={selectedMenu}
              openSideBar={expanded} onClick={() => setOpenLogoutModal(true)} textColor="error.main" />
            <SidebarItem icon={<AccountCircleRounded />} type={MENUS.PROFILE} title={user?.name || 'Hồ sơ cá nhân'} href="/profile"
              selectedMenu={selectedMenu} openSideBar={expanded} onClick={() => handleSelectMenu({ type: MENUS.PROFILE, href: '/profile' })} />
          </List>
        </Box>
      </Drawer>
      <YesNoModal yesLabel="Đăng xuất" noLabel="Ở lại" title="Đăng xuất" content="Bạn có chắc chắn muốn đăng xuất?"
        open={openLogoutModal} setOpen={setOpenLogoutModal} onYes={handleLogout} onNo={() => setOpenLogoutModal(false)} />

    </>
  );
};

export default Sidebar;
