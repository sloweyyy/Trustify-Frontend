import { Box, ButtonBase, Typography } from '@mui/material';
import React from 'react';
import { getDocumentStatus } from '../../utils/documentStatus';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';

const NotaryDocumentItem = ({ document }) => {
  const [open, setOpen] = React.useState(false);
  const name = document?.documentId?.requesterInfo?.fullName || 'Chưa có tên';
  const field = document?.documentId?.notarizationField?.name || 'Chưa có lĩnh vực';
  const statusLabel = document.status === 'readyToSign' ? 'Chờ ký số' : getDocumentStatus(document.status).label;

  return (
    <>
      <ButtonBase
        aria-label={`Xem hồ sơ của ${name}. ${field}. ${statusLabel}`}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          width: '100%',
          gap: 2,
          textAlign: 'left', minHeight: 64, p: 2, border: 1, borderColor: 'divider', borderRadius: 1, minWidth: 0,
        }}
        onClick={() => setOpen(true)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.primary', overflowWrap: 'anywhere' }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 400, color: 'text.secondary', overflowWrap: 'anywhere' }}>
            {field}
          </Typography>
        </Box>
        {document.status === 'readyToSign' ? (
          <StatusChip label="Chờ ký số" tone="signature" />
        ) : <DocumentStatusChip status={document.status} />}
      </ButtonBase>
      <DetailHistoryDocumentModal open={open} onClose={() => setOpen(false)} document={document} />
    </>
  );
};

export default NotaryDocumentItem;
