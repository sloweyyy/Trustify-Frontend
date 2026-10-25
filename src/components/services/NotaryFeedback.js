import React, { useMemo } from 'react';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { getDocumentNameByCode } from '../../utils/constants';
import FileAttachmentList from '../shared/FileAttachmentList';
import SignaturePad from '../shared/SignaturePad';

const NotaryFeedback = ({ signature, output = [], feedback, onSignatureSave, loading, signaturePadId }) => {
  const { content, severity, missingFiles } = useMemo(() => {
    if (!feedback) return { content: 'Chưa có ghi chú từ công chứng viên.', severity: 'info', missingFiles: [] };
    if (feedback.startsWith('Missing documents')) {
      const missingFiles = feedback.slice(19, -1).split(',').map((file) => getDocumentNameByCode(file.trim()));
      return { content: 'Hồ sơ cần bổ sung thêm giấy tờ.', severity: 'error', missingFiles };
    }
    return { content: feedback, severity: 'warning', missingFiles: [] };
  }, [feedback]);

  return (
    <Stack component="section" spacing={3} sx={{ minWidth: 0, p: { xs: 2, sm: 3 }, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Box>
        <Typography component="h3" variant="subtitle1" sx={{ mb: 2 }}>Ghi chú</Typography>
        <Alert severity={severity}>{content}</Alert>
      </Box>
      {missingFiles.length > 0 && <Box>
        <Typography component="h4" variant="subtitle1">Tài liệu cần bổ sung</Typography>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          {missingFiles.map((file, index) => <Typography component="li" key={index} sx={{ py: 0.5 }}>{file}</Typography>)}
        </Box>
      </Box>}
      {output.length > 0 && <>
        <Box>
          <Typography component="h3" variant="subtitle1" sx={{ mb: 2 }}>Tài liệu phản hồi</Typography>
          <FileAttachmentList files={output} getName={(file) => file.filename} onOpen={(file) => window.open(file.firebaseUrl, '_blank')} sourceLabel="Tài liệu từ công chứng viên" confirmed />
        </Box>
        {!signature?.approvalStatus?.user?.approved ? <SignaturePad id={signaturePadId} onSave={onSignatureSave} loading={loading} /> : signature?.signatureImage != null && <Box>
          <Typography component="h3" variant="subtitle1" sx={{ mb: 2 }}>Chữ ký của bạn</Typography>
          <Box sx={{ bgcolor: '#FFFFFF', border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
            <Box component="img" src={signature.signatureImage} alt="Chữ ký của bạn" sx={{ display: 'block', maxWidth: '100%', maxHeight: 180, objectFit: 'contain' }} />
          </Box>
        </Box>}
      </>}
    </Stack>
  );
};

export default NotaryFeedback;
