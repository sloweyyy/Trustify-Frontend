import React, { useState } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { OpenInNewRounded, DescriptionOutlined } from '@mui/icons-material';

const ReviewDocumentPreview = ({ files = [] }) => {
  const [selected, setSelected] = useState(null);
  const file = files.includes(selected) ? selected : null;
  const name = file?.filename || 'Tài liệu';
  const isPdf = /\.pdf$/i.test(name);
  const isImage = /\.(png|jpe?g)$/i.test(name);
  return <Box sx={{ minWidth: 0 }}>
    <Typography component="h3" variant="h6">Tài liệu đã gửi</Typography>
    <Typography color="text.secondary" sx={{ mt: 1 }}>Chọn tệp để đối chiếu với thông tin hồ sơ.</Typography>
    {files.length ? <List aria-label="Tài liệu đã gửi" disablePadding sx={{ my: 2 }}>
      {files.map((item, index) => <ListItem key={index} disableGutters>
        <Button fullWidth variant={file === item ? 'outlined' : 'text'} aria-pressed={file === item} onClick={() => setSelected(item)} startIcon={<DescriptionOutlined />} sx={{ justifyContent: 'flex-start', textAlign: 'left', overflowWrap: 'anywhere' }}>{item.filename || 'Tài liệu'}</Button>
      </ListItem>)}
    </List> : <Typography sx={{ mt: 2 }}>Hồ sơ chưa có tệp đính kèm.</Typography>}
    {file && <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 1, minWidth: 0 }}>
      <Button fullWidth variant="text" endIcon={<OpenInNewRounded />} onClick={() => window.open(file.firebaseUrl)} sx={{ mb: 1 }}>Mở tệp gốc trong cửa sổ mới</Button>
      {isPdf ? <Box component="iframe" title={`Xem trước ${name}`} src={file.firebaseUrl} sx={{ width: '100%', height: { xs: 400, lg: '65vh' }, border: 0 }} />
        : isImage ? <Box component="img" src={file.firebaseUrl} alt={`Xem trước ${name}`} sx={{ display: 'block', width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', bgcolor: 'common.white' }} />
          : <Typography>Không xem trước được định dạng này. Mở tệp gốc để xem.</Typography>}
    </Box>}
  </Box>;
};
export default ReviewDocumentPreview;
