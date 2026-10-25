import React from 'react';
import { Alert, AlertTitle, Box, Button, CircularProgress, Typography } from '@mui/material';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';

export const LoadingState = ({ label = 'Đang tải…', children }) => (
  <Box role="status" aria-live="polite" sx={{ width: '100%', py: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: children ? 2 : 0 }}>
      <CircularProgress size={28} aria-hidden="true" />
      <Typography>{label}</Typography>
    </Box>
    {children && <Box aria-hidden="true">{children}</Box>}
  </Box>
);

export const EmptyState = ({ title, description, action }) => (
  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 1.5, px: 2, py: 5 }}>
    <DescriptionOutlined aria-hidden="true" sx={{ fontSize: 40, color: 'primary.main' }} />
    <Typography component="h2" variant="h6">{title}</Typography>
    <Typography color="text.secondary" sx={{ maxWidth: 480 }}>{description}</Typography>
    {action && <Box sx={{ mt: 1 }}>{action}</Box>}
  </Box>
);

export const ErrorState = ({ title = 'Chưa thể tải dữ liệu', description = 'Bạn có thể thử lại sau ít phút.', onRetry }) => (
  <Alert severity="error" sx={{ width: '100%' }}
    action={onRetry && <Button color="inherit" variant="outlined" onClick={onRetry}>Thử lại</Button>}>
    <AlertTitle>{title}</AlertTitle>{description}
  </Alert>
);
