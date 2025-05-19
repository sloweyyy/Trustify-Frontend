import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, CircularProgress, Paper } from '@mui/material';
import { Close } from '@mui/icons-material';
import { white, black, gray, red } from '../../config/theme/themePrimitives';
import IPFSService from '../../services/ipfs.service';

const FilePreviewModal = ({ open, onClose, metadataUrl, filename }) => {
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState(null);
  const isPDF = filename && filename.toLowerCase().endsWith('.pdf');
  const isImage = filename && /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(filename);

  useEffect(() => {
    if (open && metadataUrl) {
      fetchFile();
    }
    // Reset state when modal closes
    return () => {
      if (!open) {
        setFileUrl('');
        setError(null);
      }
    };
  }, [open, metadataUrl]);

  const fetchFile = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = await IPFSService.getFileUrlFromMetadata(metadataUrl);
      setFileUrl(url);
    } catch (error) {
      console.error('Error fetching file from metadata:', error);
      setError('Failed to load the file. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="file-preview-modal" aria-describedby="file-preview-content">
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          bgcolor: white[50],
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">{filename || 'File Preview'}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: gray[100],
            borderRadius: 1,
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : isPDF ? (
            <iframe
              src={`${fileUrl}#toolbar=1&navpanes=1`}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          ) : isImage ? (
            <img src={fileUrl} alt={filename} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography>This file type cannot be previewed directly.</Typography>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  marginTop: '16px',
                  color: red[500],
                  textDecoration: 'none',
                }}
              >
                Open file in new tab
              </a>
            </Box>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

export default FilePreviewModal;
