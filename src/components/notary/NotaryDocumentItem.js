import { Box, Typography } from '@mui/material';
import React from 'react';
import { black } from '../../config/theme/themePrimitives';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';

const NotaryDocumentItem = ({ document }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: '100%',
          gap: 2,
          cursor: 'pointer',
        }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: black[900] }}>
            {document?.documentId?.requesterInfo?.fullName}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 400, color: black[400] }}>
            {document?.documentId?.notarizationField?.name}
          </Typography>
        </Box>
        {document.status === 'readyToSign' ? (
          <StatusChip label="Chờ ký số" tone="signature" />
        ) : <DocumentStatusChip status={document.status} />}
      </Box>
      <DetailHistoryDocumentModal open={open} onClose={() => setOpen(false)} document={document} />
    </>
  );
};

export default NotaryDocumentItem;
