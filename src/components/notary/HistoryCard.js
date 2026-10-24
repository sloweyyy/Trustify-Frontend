import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { black, gray, white } from '../../config/theme/themePrimitives';
import DetailHistoryDocumentModal from './DetailHistoryDocumentModal';
import DocumentStatusChip from '../shared/DocumentStatusChip';

const customStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: black[500],
};

const HistoryCard = ({ document }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CardActionArea disableRipple sx={{ flex: 1, minWidth: { xs: 200, sm: 300 } }} onClick={handleOpen}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 1,
            bgcolor: white[50],
            border: `1px solid ${gray[300]}`,
            height: '100%',
            ':hover': {
              boxShadow: '0px 4px 8px rgba(19, 25, 39, 0.08)',
              border: `1px solid ${gray[900]}`,
            },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: gray[900],
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  {document.documentId.requesterInfo.fullName}
                </Typography>
              </Box>
              <DocumentStatusChip status={document.status} />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: black[400],
                }}
              >
                {document.documentId.notarizationField.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={customStyle}>Mã số:</Typography>
              <Typography sx={{ ...customStyle, wordWrap: 'break-word', overflow: 'hidden' }}>
                {document.documentId.id}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 2,
              }}
            >
              <Typography sx={customStyle}>Ngày công chứng:</Typography>
              <Typography sx={customStyle}>{new Date(document.documentId.createdAt).toLocaleDateString('vi-VN')}</Typography>
            </Box>
          </CardContent>
        </Card>
      </CardActionArea>
      <DetailHistoryDocumentModal open={open} onClose={handleClose} document={document} />
    </>
  );
};

export default HistoryCard;
