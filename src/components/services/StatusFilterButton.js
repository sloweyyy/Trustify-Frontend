import React from 'react';
import { Button } from '@mui/material';
import { getDocumentFilterLabel } from '../../utils/documentStatus';

const StatusFilterButton = ({ statusFilter, handleFilterByStatus, clickedButton, iconMap = {} }) => {
  const selected = statusFilter === clickedButton;
  return (
    <Button
      startIcon={iconMap[statusFilter] || null}
      aria-pressed={selected}
      onClick={() => handleFilterByStatus(statusFilter)}
      sx={{
        color: selected ? 'primary.main' : 'text.secondary',
        bgcolor: selected ? 'action.selected' : 'transparent',
        fontWeight: 600, borderBottom: '3px solid',
        borderBottomColor: selected ? 'primary.main' : 'transparent',
        borderRadius: 0, flexShrink: 0, px: 2,
      }}
    >
      {getDocumentFilterLabel(statusFilter)}
    </Button>
  );
};

export default StatusFilterButton;
