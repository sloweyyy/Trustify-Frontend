import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PublicPage from '../../components/public/PublicPage';
import NFTService from '../../services/nft.service';
import VerificationStatusBox from '../../components/services/VerificationStatusBox';
import FileMatchCheck from '../../components/services/FileMatchCheck';
const VerifyNotarizationProfile = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [status, setStatus] = useState({ notFound: false, searching: false, found: false });
  const [searchLoading, setSearchLoading] = useState(false);
  const [nftData, setNftData] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = async () => {
    if (inputValue === '') {
      toast.error('Vui lòng nhập địa chỉ mint NFT');
    } else {
      setDisplayText(inputValue);
      setStatus({ notFound: false, searching: true, found: false });
      setSearchLoading(true);

      try {
        const response = await NFTService.getNFTMetadata(inputValue);

        if (response.mintAddress) {
          setDisplayText(response.mintAddress);
          setStatus({ notFound: false, searching: false, found: true });
          setNftData(response);
        } else {
          // Any error response (404, 500, etc.) should show not found state
          setStatus({ notFound: true, searching: false, found: false });
          setNftData(response);
          if (response.status !== 404) {
            console.error('Error response:', response);
          }
        }
      } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        setStatus({ notFound: true, searching: false, found: false });
        setNftData({ status: 500, message: 'Lỗi kết nối' });
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const renderStatusBox = () => {
    if (status.notFound) {
      return <VerificationStatusBox status={status} displayText={displayText} nftData={nftData} onRetry={handleSearchClick} />;
    }
    if (status.searching) {
      return <VerificationStatusBox status={status} displayText={displayText} />;
    }
    if (status.found) {
      return <VerificationStatusBox status={status} displayText={displayText} nftData={nftData} onRetry={handleSearchClick} />;
    }
  };

  return <PublicPage title="Xác minh hồ sơ công chứng" intro="Đối chiếu thông tin bản ghi tài liệu (NFT) trên blockchain. Bản ghi không thay thế kết quả xem xét hồ sơ hoặc xác nhận của người có thẩm quyền.">
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, maxWidth: 760, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
        <TextField fullWidth label="Mã bản ghi tài liệu (địa chỉ mint NFT)" helperText="Sao chép mã từ phần thông tin tài liệu trong ví tài liệu. Mạng hiện tại: Solana devnet thử nghiệm." value={inputValue} onChange={handleInputChange} disabled={searchLoading} onKeyDown={(event) => { if (event.key === 'Enter' && !searchLoading) handleSearchClick(); }} />
        <Button variant="contained" onClick={handleSearchClick} disabled={searchLoading} sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' } }}>{searchLoading ? 'Đang kiểm tra…' : 'Xác minh'}</Button>
      </Box>
    </Paper>
    <Box sx={{ maxWidth: 900, minWidth: 0 }}>
      {renderStatusBox()}
      {status.found && nftData?.mintAddress && <FileMatchCheck key={nftData.mintAddress} mintAddress={nftData.mintAddress} />}
    </Box>
    <Typography color="text.secondary" sx={{ mt: 3 }}>Mã bản ghi khác với mã hồ sơ. Việc tìm thấy bản ghi không đồng nghĩa đã kiểm tra nội dung hoặc giá trị pháp lý của tài liệu.</Typography>
  </PublicPage>;
};
export default VerifyNotarizationProfile;
