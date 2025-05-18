import React, { useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { black, gray, white } from '../../config/theme/themePrimitives';
import { Add, Info, OpenInNew } from '@mui/icons-material';
import { PictureAsPdf, Image } from '@mui/icons-material';
import { red, yellow } from '@mui/material/colors';
import TransferModal from './TransferModal';
import PurchaseModal from './PurchaseModal';

const BoxCard = ({ document }) => {
  const isPDF = document.filename.split('.').pop() === 'pdf';
  const [open, setOpen] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);

  const handleOpenIPFS = (e) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = document.ipfsLink;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error opening IPFS link:', error);
      window.open(document.ipfsLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 1,
        backgroundColor: white[50],
        padding: 1,
        border: `1px solid ${gray[200]}`,
        alignItems: 'flex-start',
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
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
          <OpenInNew
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              fontSize: 14,
              color: black[500],
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 20,
            height: 20,
            borderRadius: 10,
            color: white[50],
            backgroundColor: black[900],
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 10,
              color: white[50],
            }}
          >
            {document.amount}
          </Typography>
        </Box>
      </Box>
      {/* Document Name Section */}
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          color: black[900],
          marginTop: 1,
        }}
      >
        {document.filename}
      </Typography>
      {/* Date Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 14,
            color: black[400],
          }}
        >
          Ngày nhận:{' '}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              color: black[400],
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
            fontSize: 14,
            color: black[400],
          }}
        >
          Ngày hết hạn:{' '}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              color: black[400],
              marginLeft: 1,
            }}
            component={'span'}
          >
            {new Date(new Date(document.mintedAt).setMonth(new Date(document.mintedAt).getMonth() + 6)).toLocaleDateString()}
          </Typography>
        </Typography>
      </Box>
      {/* Horizontal Divider */}
      <Divider orientation="horizontal" flexItem sx={{ marginY: 1 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            display: 'flex',
            width: '100%',
            backgroundColor: gray[900],
            color: white[50],
            borderRadius: 1,
            paddingY: 1,
            fontSize: 12,
            textTransform: 'none',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: gray[800],
            },
          }}
          endIcon={<Info />}
          onClick={() => setOpen(true)}
        >
          Chia sẻ tài liệu
        </Button>

        <Button
          sx={{
            display: 'flex',
            width: '100%',
            backgroundColor: gray[900],
            color: white[50],
            borderRadius: 1,
            paddingY: 1,
            fontSize: 12,
            textTransform: 'none',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: gray[800],
            },
          }}
          endIcon={<Add />}
          onClick={() => setOpenPurchase(true)}
        >
          Mua thêm
        </Button>

        <Button
          sx={{
            display: 'flex',
            width: '100%',
            backgroundColor: isPDF ? red[500] : yellow[600],
            color: white[50],
            borderRadius: 1,
            paddingY: 1,
            fontSize: 12,
            textTransform: 'none',
            textAlign: 'center',
            '&:hover': {
              backgroundColor: isPDF ? red[600] : yellow[700],
            },
          }}
          endIcon={<OpenInNew />}
          onClick={handleOpenIPFS}
        >
          Xem tài liệu
        </Button>
      </Box>

      <TransferModal open={open} onClose={() => setOpen(false)} document={document} />
      <PurchaseModal open={openPurchase} onClose={() => setOpenPurchase(false)} document={document} />
    </Box>
  );
};

export default BoxCard;
