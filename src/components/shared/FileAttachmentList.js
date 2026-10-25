import React from 'react';
import { Box, Button, IconButton, List, ListItem, Typography } from '@mui/material';
import { CloseRounded, DescriptionOutlined, OpenInNewRounded } from '@mui/icons-material';

const FileAttachmentList = ({ files = [], getName, onOpen, onRemove, sourceLabel, confirmed = false }) => {
  if (!files?.length) return null;
  return (
  <List disablePadding aria-label={sourceLabel} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
    {files?.map((file, index) => {
      const name = getName(file) || 'Tài liệu';
      return (
        <ListItem key={file.document?._id || index} disableGutters sx={{ alignItems: 'flex-start', gap: 1, p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <DescriptionOutlined aria-hidden="true" color="primary" sx={{ mt: 1.5, flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Button variant="text" fullWidth aria-label={`Mở tài liệu ${name}`} onClick={() => onOpen(file)} endIcon={<OpenInNewRounded />}
              sx={{ px: 0, py: 1, justifyContent: 'flex-start', textAlign: 'left', fontWeight: 400, '& .MuiButton-endIcon': { flexShrink: 0 } }}>
              <Box component="span" sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>{name}</Box>
            </Button>
            <Typography color="text.secondary">{sourceLabel}</Typography>
          </Box>
          {!confirmed && onRemove && <IconButton aria-label={`Bỏ tài liệu ${name}`} onClick={() => onRemove(file)}><CloseRounded /></IconButton>}
        </ListItem>
      );
    })}
  </List>
  );
};
export default FileAttachmentList;
