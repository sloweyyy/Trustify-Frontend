import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { black, dark, gray, primary } from '../../config/theme/themePrimitives';
import 'react-toastify/dist/ReactToastify.css';
import StatusBox from '../../components/services/StatusBox';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotarizationService from '../../services/notarization.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchingDocumentModal from '../../components/modals/SearchingDocumentModal';

const LookupNotarizationProfile = () => {
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

          if (response.status === 500) {
            toast.error('Đã xảy ra lỗi, vui lòng thử lại sau');
          }
          setSearchLoading(false);
        } catch (error) {
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
            Tra cứu trạng thái hồ sơ
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
            Vui lòng nhập mã số hồ sơ công chứng để tra cứu trạng thái và thông tin chi tiết
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
            placeholder="Nhập mã số hồ sơ công chứng"
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
              Tra cứu
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
      <SearchingDocumentModal open={openModal} handleClose={handleCloseModal} document={document} />
    </Box>
  );
};

export default LookupNotarizationProfile;
