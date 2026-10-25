import React, { useId, useRef, useState } from 'react';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import { UploadFileRounded } from '@mui/icons-material';
import NFTService from '../../services/nft.service';
import { VALID_FORMATS } from '../../utils/constants';

const RESULTS = {
  match: { severity: 'success', text: 'Tệp khớp với bản ghi công chứng.' },
  mismatch: {
    severity: 'error',
    text: 'Tệp không khớp với bản ghi. Tệp có thể đã bị thay đổi hoặc không phải tài liệu được công chứng.',
  },
  legacy: { severity: 'info', text: 'Bản ghi này được tạo trước khi có tính năng đối chiếu tệp, nên chưa thể so sánh.' },
};

/** Upload a copy of a document and compare its SHA-256 with the fingerprint in the record. */
const FileMatchCheck = ({ mintAddress }) => {
  const id = useId();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const check = async () => {
    if (!file) return;
    setChecking(true);
    setError('');
    setResult(null);
    try {
      const data = await NFTService.verifyFile(mintAddress, file);
      setResult(data.match === true ? RESULTS.match : data.match === false ? RESULTS.mismatch : RESULTS.legacy);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Chưa thể đối chiếu tệp. Bạn kiểm tra kết nối và thử lại.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <Paper component="section" variant="outlined" aria-labelledby={`${id}-title`} sx={{ p: { xs: 2, md: 3 }, mt: 3 }}>
      <Typography component="h2" variant="h6" id={`${id}-title`}>
        Đối chiếu tệp với bản ghi
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Chọn bản tài liệu bạn đang có để kiểm tra đó có đúng là tài liệu đã được công chứng, chưa bị chỉnh sửa. Tệp chỉ được
        dùng để tính mã băm, không được lưu lại.
      </Typography>
      <input
        ref={inputRef}
        id={`${id}-file`}
        type="file"
        hidden
        accept={VALID_FORMATS.join(',')}
        aria-label="Tệp cần đối chiếu"
        onChange={(event) => {
          setFile(event.target.files?.[0] || null);
          setResult(null);
          setError('');
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<UploadFileRounded />}
          onClick={() => inputRef.current?.click()}
          disabled={checking}
        >
          Chọn tệp
        </Button>
        <Typography sx={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }} color={file ? 'text.primary' : 'text.secondary'}>
          {file ? file.name : 'Chưa chọn tệp'}
        </Typography>
        <Button variant="contained" onClick={check} disabled={!file || checking}>
          {checking ? 'Đang đối chiếu…' : 'Đối chiếu'}
        </Button>
      </Box>
      <Box aria-live="polite" sx={{ mt: result || error ? 2 : 0 }}>
        {result && <Alert severity={result.severity}>{result.text}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Paper>
  );
};

export default FileMatchCheck;
