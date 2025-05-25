import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { dark, primary, gray } from '../../config/theme/themePrimitives';
import { toast } from 'react-toastify';
import NFTService from '../../services/nft.service';
import VerificationStatusBox from '../../components/services/VerificationStatusBox';

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
        console.log('NFT Response:', response);

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
      return <VerificationStatusBox status={status} displayText={displayText} nftData={nftData} />;
    }
    if (status.searching) {
      return <VerificationStatusBox status={status} displayText={displayText} />;
    }
    if (status.found) {
      return <VerificationStatusBox status={status} displayText={displayText} nftData={nftData} />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: 800 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: dark[500],
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Xác minh hồ sơ công chứng
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: dark[400],
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: 14, md: 16 },
              lineHeight: 1.6,
            }}
          >
            Nhập địa chỉ mint NFT để xác minh tính xác thực và toàn vẹn của hồ sơ công chứng được lưu trữ trên blockchain
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },
            maxWidth: 600,
            mt: 4,
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            variant="outlined"
            size="medium"
            placeholder="Nhập địa chỉ mint NFT (ví dụ: HCisfveXe1PrqYTknbod9cvVMUYgmAwLZVaWGW18dj3z)"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              flex: 1,
              '& .MuiInputBase-input': {
                fontSize: 14,
                py: 1.5,
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: primary[300],
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: primary[500],
                  borderWidth: 2,
                },
              },
            }}
            disabled={searchLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
          <Button
            disabled={searchLoading}
            startIcon={<SearchRoundedIcon />}
            variant="contained"
            disableElevation
            sx={{
              px: 3,
              py: 1.5,
              backgroundColor: primary[500],
              color: 'white',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              minWidth: { xs: 'auto', sm: 120 },
              '&:hover': {
                backgroundColor: primary[600],
              },
              '&:disabled': {
                backgroundColor: gray[300],
                color: gray[500],
              },
            }}
            onClick={handleSearchClick}
          >
            <Typography variant="button" sx={{ fontSize: 14 }}>
              Xác minh
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* Results Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: gray[50],
          flex: 1,
          py: 4,
          px: 2,
        }}
      >
        {renderStatusBox()}
      </Box>
    </Box>
  );
};

export default VerifyNotarizationProfile;
