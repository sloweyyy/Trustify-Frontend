import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { focusRing } from '../../config/theme/themeHelpers';

const SidebarItem = ({ type, icon, title, href, selectedMenu, openSideBar, onClick, textColor = 'text.primary' }) => (
  <ListItem disablePadding sx={{ mb: 1 }}>
    <Tooltip title={openSideBar ? '' : title} placement="right">
      <ListItemButton component={href ? 'a' : 'button'} href={href} aria-label={title}
        aria-current={selectedMenu === type ? 'page' : undefined} selected={selectedMenu === type}
        onClick={(event) => {
          if (href && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
          if (href) event.preventDefault();
          onClick?.(event);
        }}
        sx={(theme) => ({ width: '100%', minWidth: 0, px: openSideBar ? 2 : 1, py: 1, color: textColor,
          justifyContent: openSideBar ? 'flex-start' : 'center', textAlign: 'left',
          '&.Mui-focusVisible': focusRing(theme), '& .MuiListItemIcon-root': { color: 'inherit' } })}>
        <ListItemIcon sx={{ minWidth: 0, mr: openSideBar ? 1.5 : 0 }}>{icon}</ListItemIcon>
        {openSideBar && <ListItemText primary={title} sx={{ minWidth: 0, '& .MuiListItemText-primary': {
          fontSize: '1rem', whiteSpace: 'normal', overflowWrap: 'anywhere', fontWeight: selectedMenu === type ? 600 : 400,
        } }} />}
      </ListItemButton>
    </Tooltip>
  </ListItem>
);
export default SidebarItem;
