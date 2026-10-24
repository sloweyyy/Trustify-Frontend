import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import {
  ScheduleOutlined, PendingActionsOutlined, FactCheckOutlined, DrawOutlined,
  TaskAltOutlined, HighlightOffOutlined, HelpOutline,
} from '@mui/icons-material';
import { getDocumentStatus } from '../../utils/documentStatus';

const icons = {
  'Chờ xử lý': ScheduleOutlined,
  'Đang xử lý': PendingActionsOutlined,
  'Chờ ký số': DrawOutlined,
  'Hoàn tất': TaskAltOutlined,
  'Bị từ chối': HighlightOffOutlined,
};

// Also usable for payment/session presentation without converting their raw states.
export const StatusChip = ({ label, tone = 'neutral', icon }) => (
  <Chip
    icon={icon}
    label={label}
    sx={(theme) => {
      const colors = theme.trustify.status[tone];
      return {
        maxWidth: '100%',
        color: colors?.fg || theme.palette.text.secondary,
        bgcolor: colors?.bg || theme.trustify.surface.subtle,
        '& .MuiChip-icon': { color: 'inherit', flexShrink: 0 },
        '& .MuiChip-label': { whiteSpace: 'nowrap' },
      };
    }}
  />
);

const DocumentStatusChip = ({ status }) => {
  const { label, detail, tone } = getDocumentStatus(status);
  const Icon = detail ? FactCheckOutlined : icons[label] || HelpOutline;
  const chip = <StatusChip label={label} tone={tone} icon={<Icon />} />;
  return detail ? (
    <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.25 }}>
      {chip}
      <Typography variant="caption" color="text.secondary">{detail}</Typography>
    </Box>
  ) : chip;
};

export default DocumentStatusChip;
