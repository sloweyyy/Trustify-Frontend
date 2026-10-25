import React, { useEffect, useId, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';
import NotaryStep from './NotaryStep';
import NotaryFeedback from '../services/NotaryFeedback';
import DocumentStatusChip from '../shared/DocumentStatusChip';
import FileAttachmentList from '../shared/FileAttachmentList';
import { EmptyState } from '../shared/PageFeedback';
import NotarizationService from '../../services/notarization.service';

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'minmax(150px, 1fr) 2fr' }, gap: { xs: 0.5, sm: 2 } }}>
    <Typography component="dt" color="text.secondary">{label}</Typography>
    <Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value || 'Chưa có thông tin'}</Typography>
  </Box>
);

const Section = ({ title, children }) => (
  <Stack component="section" spacing={2} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: { xs: 2, sm: 3 }, minWidth: 0 }}>
    <Typography component="h3" variant="subtitle1">{title}</Typography>
    {children}
  </Stack>
);

const HistoryDetailModal = ({ open, handleClose, data = [], notaryId }) => {
  const [notarizationData, setNotarizationData] = useState(data.find((item) => item._id === notaryId));
  const [loadingSignature, setLoadingSignature] = useState(false);
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const id = useId();

  const handleSignatureSave = async (signatureImageUrl) => {
    const signatureImageFile = new File([signatureImageUrl], notarizationData?.userId + '.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('signatureImage', signatureImageFile);
    formData.append('documentId', notarizationData._id);
    setLoadingSignature(true);
    try {
      await NotarizationService.approveSignatureByUser(formData);
      toast.success('Lưu chữ ký thành công');

      setNotarizationData((prev) => ({
        ...prev,
        signature: {
          ...prev.signature,
          approvalStatus: {
            ...prev.signature?.approvalStatus,
            user: {
              ...prev.signature?.approvalStatus?.user,
              approved: true,
            },
          },
          signatureImage: URL.createObjectURL(signatureImageFile),
        },
      }));
    } catch (error) {
      setLoadingSignature(false);
      if (error.status === 409) {
        toast.error('Tài liệu này đã được ký số');
      } else {
        toast.error('Đã xảy ra lỗi khi lưu chữ ký');
      }
    } finally {
      setLoadingSignature(false);
    }
  };

  useEffect(() => {
    setNotarizationData(data.find((item) => item._id === notaryId));
  }, [data, notaryId]);

  const files = notarizationData?.files || [];
  const documentFiles = files.filter((file) => /\.(pdf|docx)$/i.test(file.filename || ''));
  const imageFiles = files.filter((file) => /\.(png|jpe?g)$/i.test(file.filename || ''));
  const status = notarizationData?.status?.status;
  const currentStep = { pending: 0, processing: 1, verification: 2, digitalSignature: 3, completed: 4 }[status] ?? 0;
  const renderFiles = (items, label) => <FileAttachmentList files={items} getName={(file) => file.filename}
    onOpen={(file) => window.open(file.firebaseUrl)} sourceLabel={label} confirmed />;

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} fullWidth maxWidth="lg" aria-labelledby={`${id}-title`}>
      <DialogTitle id={`${id}-header`} component="div" sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          <Typography component="h2" variant="h5" id={`${id}-title`}>Chi tiết hồ sơ công chứng</Typography>
          {notarizationData && <>
            <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>Mã hồ sơ: {notarizationData._id}</Typography>
            <Box><DocumentStatusChip status={status} /></Box>
          </>}
        </Stack>
        <IconButton aria-label="Đóng chi tiết hồ sơ" onClick={handleClose}><CloseRounded /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {!notarizationData ? <EmptyState title="Chưa có thông tin hồ sơ" description="Đóng hộp thoại và kiểm tra lại hồ sơ trong Lịch sử." /> : (
          <Stack spacing={3}>
            <Section title="Thông tin khách hàng">
              <Stack component="dl" spacing={2} sx={{ m: 0 }}>
                <InfoRow label="Họ và tên" value={notarizationData.requesterInfo?.fullName} />
                <InfoRow label="Số CMND/CCCD" value={notarizationData.requesterInfo?.citizenId} />
                <InfoRow label="Số điện thoại" value={notarizationData.requesterInfo?.phoneNumber} />
                <InfoRow label="Email" value={notarizationData.requesterInfo?.email} />
              </Stack>
            </Section>
            <Section title="Thông tin công chứng">
              <Stack component="dl" spacing={2} sx={{ m: 0 }}>
                <InfoRow label="Lĩnh vực công chứng" value={notarizationData.notarizationField?.name} />
                <InfoRow label="Dịch vụ công chứng" value={notarizationData.notarizationService?.name} />
              </Stack>
            </Section>
            {documentFiles.length > 0 && <Section title="Tệp">{renderFiles(documentFiles, 'Tài liệu đã gửi')}</Section>}
            {imageFiles.length > 0 && <Section title="Ảnh">{renderFiles(imageFiles, 'Ảnh đã gửi')}</Section>}
            {status !== undefined && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '240px minmax(0, 1fr)' }, gap: 3, alignItems: 'start' }}>
                <NotaryStep currentStep={currentStep} status={status} />
                <NotaryFeedback signature={notarizationData.signature} output={notarizationData.output || []}
                  feedback={notarizationData.status.feedback} onSignatureSave={handleSignatureSave} loading={loadingSignature} />
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDetailModal;
