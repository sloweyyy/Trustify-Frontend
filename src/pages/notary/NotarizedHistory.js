import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback, useId } from 'react';
import HistoryCard from '../../components/notary/HistoryCard';
import { getDocumentFilterLabel } from '../../utils/documentStatus';
import NotarizationService from '../../services/notarization.service';
import { EmptyState, ErrorState, LoadingState } from '../../components/shared/PageFeedback';

const NotarizedHistory = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [field, setField] = useState([]);
  const [status, setStatus] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    field: '',
    status: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');

  const [error, setError] = useState(false);
  const fieldLabel = useId();
  const statusLabel = useId();
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await NotarizationService.getApproveHistory();
      if (!Array.isArray(response)) throw new Error('Invalid history response');
      setDocuments(response);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => { fetchDocuments(); }, [fetchDocuments]);
  useEffect(() => {
    const fields = Array.from(new Set(documents.map((doc) => doc.documentId?.notarizationField?.name)));
    const statuses = Array.from(new Set(documents.map((doc) => doc.status)));

    setField(fields);
    setStatus(statuses);
  }, [documents]);

  const applyFilter = () => {
    return documents
      .filter((document) => {
        const matchesSearch = filter.search
          ? document.documentId.requesterInfo.fullName.toLowerCase().includes(filter.search.toLowerCase())
          : true;

        const matchesField = filter.field ? document.documentId.notarizationField.name === filter.field : true;

        const matchesStatus = filter.status ? document.status === filter.status : true;

        return matchesSearch && matchesField && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.documentId.createdAt);
        const dateB = new Date(b.documentId.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  };

  const visible = applyFilter();
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
      <Typography component="h1" variant="h4">Lịch sử công chứng</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Tra cứu hồ sơ đã tiếp nhận và xem lại chi tiết từng lần xử lý.</Typography>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, minWidth: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography component="h2" variant="h6" sx={{ flex: 1 }}>Yêu cầu công chứng</Typography>
          <Button variant="outlined" onClick={() => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))} aria-label={sortOrder === 'asc' ? 'Đổi sang mới nhất trước' : 'Đổi sang cũ nhất trước'}>{sortOrder === 'asc' ? 'Cũ nhất trước' : 'Mới nhất trước'}</Button>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr)' }, gap: 2, mb: 3 }}>
          <TextField fullWidth label="Tìm theo tên người yêu cầu" value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
          <FormControl fullWidth><InputLabel id={fieldLabel}>Lĩnh vực</InputLabel>
            <Select labelId={fieldLabel} label="Lĩnh vực" value={filter.field} onChange={(e) => setFilter({ ...filter, field: e.target.value })}>
              <MenuItem value="">Tất cả lĩnh vực</MenuItem>{field.map((fieldName, index) => <MenuItem key={index} value={fieldName}>{fieldName}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth><InputLabel id={statusLabel}>Trạng thái</InputLabel>
            <Select labelId={statusLabel} label="Trạng thái" value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
              <MenuItem value="">Tất cả trạng thái</MenuItem>{status.map((statusName, index) => <MenuItem key={index} value={statusName}>{statusName === 'readyToSign' ? 'Chờ ký số' : getDocumentFilterLabel(statusName)}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
        {isLoading ? <LoadingState label="Đang tải lịch sử công chứng…" /> : error ? <ErrorState title="Chưa thể tải lịch sử" description="Vui lòng thử lại để tải hồ sơ công chứng." onRetry={fetchDocuments} />
          : !documents.length ? <EmptyState title="Chưa có lịch sử công chứng" description="Hồ sơ bạn tiếp nhận sẽ xuất hiện tại đây." />
            : !visible.length ? <EmptyState title="Không tìm thấy hồ sơ phù hợp" description="Thử tên khác hoặc thay đổi lĩnh vực và trạng thái." />
              : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>{visible.map((document, index) => <HistoryCard key={index} document={document} />)}</Box>}
      </Paper>
    </Box>
  );
};
export default NotarizedHistory;
