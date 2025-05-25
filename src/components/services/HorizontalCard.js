import React, { useState } from 'react';
import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material';
import { black, gray, red, white, yellow } from '../../config/theme/themePrimitives';
import { Add, Info } from '@mui/icons-material';
import { PictureAsPdf, Image } from '@mui/icons-material';
import TransferModal from './TransferModal';
import PurchaseModal from './PurchaseModal';
import FilePreviewModal from './FilePreviewModal';

const HorizontalCard = ({ document }) => {
  const isPDF = document.filename.split('.').pop() === 'pdf';
  const [open, setOpen] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showMintAddress, setShowMintAddress] = useState(false);

  const handleOpenIPFS = (e) => {
    e.stopPropagation();
    setPreviewDocument(document);
  };

  const toggleDisplay = () => {
    setShowMintAddress(!showMintAddress);
  };

  const cleanFilename = (filename) => {
    return filename.replace(/^\d+-/, '');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          borderRadius: 1,
          backgroundColor: white[50],
          padding: 1,
          border: `1px solid ${gray[200]}`,
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'transform 0.4s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 1,
            backgroundColor: isPDF ? red[50] : yellow[50],
            marginX: 2,
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={handleOpenIPFS}
        >
          {isPDF ? (
            <PictureAsPdf
              sx={{
                fontSize: 30,
                color: isPDF ? red[500] : yellow[500],
              }}
            />
          ) : (
            <Image
              sx={{
                fontSize: 30,
                color: isPDF ? red[500] : yellow[500],
              }}
            />
          )}
        </Box>
        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem />
        {/* Document Name Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 2,
            alignItems: 'flex-start',
            marginX: 2,
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: black[300],
              }}
            >
              {showMintAddress ? 'Mint Address' : 'Tên tài liệu'}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                toggleDisplay();
              }}
              sx={{ fontSize: 10, padding: '2px 8px', minWidth: 'auto' }}
            >
              {showMintAddress ? 'Show Filename' : 'Show Mint Address'}
            </Button>
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: black[500],
              wordBreak: 'break-all',
            }}
          >
            {showMintAddress ? document.mintAddress : cleanFilename(document.filename)}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        {/* Date Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'flex-start',
            marginX: 2,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 12,
              color: black[300],
            }}
          >
            Ngày nhận:{' '}
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: black[500],
                marginLeft: 3,
              }}
              component={'span'}
            >
              {new Date(document.mintedAt).toLocaleDateString()}
            </Typography>
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 12,
              color: black[300],
            }}
          >
            Ngày hết hạn:{' '}
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: black[500],
                marginLeft: 1,
              }}
              component={'span'}
            >
              {new Date(
                new Date(document.mintedAt).setMonth(new Date(document.mintedAt).getMonth() + 6),
              ).toLocaleDateString()}
            </Typography>
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        {/* Amount Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 0.5,
            alignItems: 'flex-start',
            marginX: 2,
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 12,
              color: black[300],
            }}
          >
            Số lượng
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: black[500],
            }}
          >
            {document.amount}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            alignItems: 'flex-start',
            marginX: 2,
            gap: 1,
          }}
        >
          <Button
            sx={{
              width: 150,
              backgroundColor: gray[900],
              color: white[50],
              borderRadius: 1,
              paddingX: 2,
              fontSize: 12,
              textTransform: 'none',
              marginLeft: 'auto',
              '&:hover': {
                backgroundColor: gray[800],
              },
              marginX: 2,
            }}
            endIcon={<Info />}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            Chia sẻ tài liệu
          </Button>

          <Button
            sx={{
              width: 150,
              backgroundColor: gray[900],
              color: white[50],
              borderRadius: 1,
              paddingX: 2,
              fontSize: 12,
              textTransform: 'none',
              marginLeft: 'auto',
              '&:hover': {
                backgroundColor: gray[800],
              },
              marginX: 2,
            }}
            endIcon={<Add />}
            onClick={(e) => {
              e.stopPropagation();
              setOpenPurchase(true);
            }}
          >
            Mua thêm
          </Button>
        </Box>
      </Box>

      <TransferModal open={open} onClose={() => setOpen(false)} document={document} />
      <PurchaseModal open={openPurchase} onClose={() => setOpenPurchase(false)} document={document} />
      {previewDocument && (
        <FilePreviewModal
          open={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
          metadataUrl={previewDocument?.ipfsLink}
          filename={previewDocument?.filename}
        />
      )}
    </>
  );
};

export default HorizontalCard;
