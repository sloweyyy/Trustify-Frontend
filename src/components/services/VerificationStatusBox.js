import React from 'react';
import { Box, Typography, Paper, Link, Grow, Chip } from '@mui/material';
import { CheckCircle, Error, HourglassEmpty, OpenInNew } from '@mui/icons-material';
import { primary, dark, green, red, white } from '../../config/theme/themePrimitives';

const VerificationStatusBox = ({ status, displayText, nftData }) => {
  const renderSearchingState = () => (
    <Grow in={true} timeout={400}>
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          background: white[50],
        }}
      >
        <HourglassEmpty sx={{ fontSize: 48, color: primary[500], mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: dark[500] }}>
          Đang xác minh...
        </Typography>
        <Typography variant="body2" color={dark[300]}>
          Đang kiểm tra địa chỉ mint: <strong>{displayText}</strong>
        </Typography>
      </Paper>
    </Grow>
  );

  const renderNotFoundState = () => (
    <Grow in={true} timeout={400}>
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          background: white[50],
        }}
      >
        <Error sx={{ fontSize: 48, color: red[500], mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: dark[500] }}>
          {nftData?.status === 500 ? 'Lỗi máy chủ' : 'Không tìm thấy NFT'}
        </Typography>
        <Typography variant="body2" color={dark[300]}>
          Địa chỉ mint <strong>"{displayText}"</strong> không tồn tại hoặc không hợp lệ
          {nftData?.message && nftData?.status === 500 && (
            <Box component="span" sx={{ display: 'block', mt: 1, fontStyle: 'italic' }}>
              Lỗi: {nftData.message}
            </Box>
          )}
        </Typography>
        <Typography variant="body2" color={dark[300]} sx={{ mt: 2, fontSize: 13 }}>
          Vui lòng kiểm tra lại địa chỉ mint và thử lại
        </Typography>
      </Paper>
    </Grow>
  );

  const renderFoundState = () => (
    <Grow in={true} timeout={400}>
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 900,
          width: '100%',
          background: white[50],
        }}
      >
        {/* Success Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: `1px solid ${primary[100]}` }}>
          <CheckCircle sx={{ fontSize: 40, color: green[500], mr: 2 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: dark[500], mb: 0.5 }}>
              NFT được xác minh thành công
            </Typography>
            <Typography variant="body2" color={dark[300]} sx={{ fontSize: 13 }}>
              Địa chỉ mint: {nftData?.mintAddress}
            </Typography>
          </Box>
        </Box>

        {/* Document Information Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: dark[500] }}>
              Thông tin tài liệu
            </Typography>
            <Chip
              label="Đã xác thực"
              size="small"
              sx={{
                ml: 2,
                backgroundColor: green[50],
                color: green[700],
                fontWeight: 500,
                fontSize: 11,
              }}
            />
          </Box>

          <Box
            sx={{
              pl: 3,
              borderLeft: `4px solid ${primary[300]}`,
              backgroundColor: primary[25] || '#fafbfc',
              borderRadius: '0 8px 8px 0',
              py: 2,
              pr: 3,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 0.5 }}>
                Tên tài liệu
              </Typography>
              <Typography variant="body2" sx={{ color: dark[500], wordBreak: 'break-word' }}>
                {nftData?.offChainMetadata?.name || 'Không có thông tin'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 0.5 }}>
                Loại tài liệu
              </Typography>
              <Typography variant="body2" sx={{ color: dark[500], wordBreak: 'break-word' }}>
                {(() => {
                  const fileName =
                    nftData?.offChainMetadata?.name || nftData?.offChainMetadata?.properties?.files?.[0]?.name;
                  if (fileName) {
                    const extension = fileName.split('.').pop()?.toUpperCase();
                    return extension || 'Không xác định';
                  }
                  return 'Không xác định';
                })()}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Verification Links Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: dark[500] }}>
            Liên kết xác minh
          </Typography>

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {nftData?.viewLinks?.explorerLink && (
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${primary[200]}`,
                  borderRadius: 2,
                  backgroundColor: white[50],
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: primary[400],
                    backgroundColor: primary[25] || '#fafbfc',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 1 }}>
                  Solana Explorer
                </Typography>
                <Link
                  href={nftData.viewLinks.explorerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    color: primary[500],
                    fontSize: 14,
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: primary[600],
                    },
                  }}
                >
                  Xem trên Solana Explorer
                  <OpenInNew sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            )}

            {nftData?.viewLinks?.solscanLink && (
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${primary[200]}`,
                  borderRadius: 2,
                  backgroundColor: white[50],
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: primary[400],
                    backgroundColor: primary[25] || '#fafbfc',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 1 }}>
                  Solscan
                </Typography>
                <Link
                  href={nftData.viewLinks.solscanLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    color: primary[500],
                    fontSize: 14,
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: primary[600],
                    },
                  }}
                >
                  Xem trên Solscan
                  <OpenInNew sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            )}

            {nftData?.viewLinks?.ipfsLink && (
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${primary[200]}`,
                  borderRadius: 2,
                  backgroundColor: white[50],
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: primary[400],
                    backgroundColor: primary[25] || '#fafbfc',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 1 }}>
                  IPFS Metadata
                </Typography>
                <Link
                  href={nftData.viewLinks.ipfsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    color: primary[500],
                    fontSize: 14,
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: primary[600],
                    },
                  }}
                >
                  Xem metadata trên IPFS
                  <OpenInNew sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            )}

            {nftData?.viewLinks?.metadataUri && (
              <Box
                sx={{
                  p: 2,
                  border: `1px solid ${primary[200]}`,
                  borderRadius: 2,
                  backgroundColor: white[50],
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: primary[400],
                    backgroundColor: primary[25] || '#fafbfc',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: dark[600], mb: 1 }}>
                  Metadata URI
                </Typography>
                <Link
                  href={nftData.viewLinks.metadataUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textDecoration: 'none',
                    color: primary[500],
                    fontSize: 14,
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: primary[600],
                    },
                  }}
                >
                  Xem URI gốc
                  <OpenInNew sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Grow>
  );

  if (status.searching) {
    return renderSearchingState();
  }

  if (status.notFound) {
    return renderNotFoundState();
  }

  if (status.found) {
    return renderFoundState();
  }

  return null;
};

export default VerificationStatusBox;
