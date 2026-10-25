import React from 'react';
import { Box, Divider, Skeleton } from '@mui/material';

const NotaryDocumentCardSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 1,
        padding: 1,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          minWidth: 120,
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={100} height={20} />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Skeleton variant="text" width={50} height={16} />
        <Skeleton variant="text" width="80%" height={20} />
      </Box>

      <Skeleton
        variant="rectangular"
        sx={{
          borderRadius: 0.5,
          bgcolor: 'action.hover',
          height: 32,
          width: 80,
        }}
      />
    </Box>
  );
};

export default NotaryDocumentCardSkeleton;
