import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PublicPage from '../../components/public/PublicPage';
import NotarizationService from '../../services/notarization.service';
import StatusBox from '../../components/services/StatusBox';
import SearchingDocumentModal from '../../components/modals/SearchingDocumentModal';
import { ErrorState } from '../../components/shared/PageFeedback';
const LookupNotarizationProfile = () => {
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [status, setStatus] = useState({ notFound: false, searching: false, found: false });
  const [document, setDocument] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSearchClick = async () => {
    if (inputValue === '') {
      toast.error('Vui lòng nhập mã số hồ sơ công chứng');
    } else {
      setError(false);
      setDisplayText(inputValue);
      setStatus({ notFound: false, searching: true, found: false });
      setSearchLoading(true);

      setTimeout(async () => {
        try {
          const response = await NotarizationService.getStatusById(inputValue);

          if (response.status === 200) {
            setDisplayText(response.data.documentId);
            setStatus({ notFound: false, searching: false, found: true });
            setDocument(response.data);
          }

          if (response.status === 404) {
            setStatus({ notFound: true, searching: false, found: false });
          }

          if (response.status !== 200 && response.status !== 404) {
            setError(true);
            setStatus({ notFound: false, searching: false, found: false });
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau');
          }
          setSearchLoading(false);
        } catch (error) {
          setError(true);
          setStatus({ notFound: false, searching: false, found: false });
          setSearchLoading(false);
          toast.error('Đã xảy ra lỗi, vui lòng thử lại sau');
        }
      }, 1000);
    }
  };

  const renderStatusBox = () => {
    if (status.notFound) {
      return <StatusBox status={status} displayText={displayText} />;
    }
    if (status.searching) {
      return <StatusBox status={status} displayText={displayText} />;
    }
    if (status.found) {
      return <StatusBox status={status} displayText={displayText} document={document} onOpenModal={handleOpenModal} />;
    }
  };

  return <PublicPage title="Tra cứu trạng thái hồ sơ" intro="Nhập mã hồ sơ nhận được sau khi gửi yêu cầu. Tra cứu này cung cấp trạng thái hồ sơ; để đối chiếu bản ghi tài liệu, bạn dùng trang Xác minh.">
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, maxWidth: 760, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
        <TextField fullWidth label="Mã hồ sơ công chứng" helperText="Bạn tìm mã trong Lịch sử công chứng của tài khoản." value={inputValue} onChange={handleInputChange} disabled={searchLoading} onKeyDown={(event) => { if (event.key === 'Enter' && !searchLoading) handleSearchClick(); }} />
        <Button variant="contained" onClick={handleSearchClick} disabled={searchLoading} sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' } }}>{searchLoading ? 'Đang kiểm tra…' : 'Tra cứu'}</Button>
      </Box>
    </Paper>
    <Box sx={{ maxWidth: 900, minWidth: 0 }}>{error ? <ErrorState title="Chưa thể tra cứu hồ sơ" description="Bạn kiểm tra kết nối rồi thử lại với cùng mã hồ sơ." onRetry={handleSearchClick} /> : renderStatusBox()}
      <SearchingDocumentModal open={openModal} handleClose={handleCloseModal} document={document} /></Box>
    <Typography color="text.secondary" sx={{ mt: 3 }}>Chỉ nhập mã hồ sơ, không nhập số CCCD hoặc tên để tra cứu.</Typography>
  </PublicPage>;
};
export default LookupNotarizationProfile;
