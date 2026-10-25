import React, { useId, useRef, useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { DevicesRounded, Wallet } from '@mui/icons-material';
import { VALID_FORMATS } from '../../../utils/constants';
import UserWalletModal from '../../../components/services/UserWalletModal';
import FilePreviewModal from '../../../components/services/FilePreviewModal';
import FileAttachmentList from '../../../components/shared/FileAttachmentList';

const FileUploadSection = ({
  title, currentFiles, handleCurrentFileChange, handleRemoveCurrentFile,
  uploadedFiles, handleRemoveUploadedFile, documentWalletFiles,
  handleDocumentWalletFileChange, handleRemoveDocumentWalletFile, confirmed = false,
}) => {
  const id = useId();
  const inputRef = useRef(null);
  const chooseRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const open = Boolean(anchorEl);
  const totalFiles = (currentFiles?.length || 0) + (uploadedFiles?.length || 0) + (documentWalletFiles?.length || 0);
  const handleClose = () => setAnchorEl(null);
  const handleChooseFromDevice = () => { inputRef.current.click(); handleClose(); };
  const handleCloseUserWalletModal = () => {
    setOpenWalletModal(false);
    handleClose();
    requestAnimationFrame(() => chooseRef.current?.focus());
  };
  const openDeviceFile = (file) => window.open(file.file.url || file.file.firebaseUrl || URL.createObjectURL(file.file), '_blank', 'noopener,noreferrer');
  const deviceName = (file) => file.displayName || file.file.name || file.file.filename;

  return (
    <Box component="section" aria-labelledby={`${id}-title`} sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1.5, p: 2, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        <Typography component="h3" id={`${id}-title`} sx={{ fontWeight: 600 }}>{title}</Typography>
        <Typography color="text.secondary">{totalFiles} tài liệu đã chọn</Typography>
      </Box>
      {!confirmed && <>
        <Typography id={`${id}-formats`} color="text.secondary">Định dạng hỗ trợ: {VALID_FORMATS.map((format) => format.slice(1).toUpperCase()).join(', ')}.</Typography>
        <Button id={`${id}-choose`} ref={chooseRef} variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}
          aria-label={`Chọn tài liệu cho ${title}`} aria-describedby={`${id}-formats`} aria-haspopup="menu" aria-expanded={open}
          aria-controls={open ? `${id}-menu` : undefined} sx={{ alignSelf: 'flex-start' }}>Chọn tài liệu</Button>
        <Menu id={`${id}-menu`} anchorEl={anchorEl} open={open} onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': `${id}-choose` }}>
          <MenuItem onClick={handleChooseFromDevice} sx={{ gap: 1 }}><DevicesRounded aria-hidden="true" />Chọn từ thiết bị</MenuItem>
          <MenuItem onClick={() => { handleClose(); setOpenWalletModal(true); }} sx={{ gap: 1 }}><Wallet aria-hidden="true" />Chọn từ ví tài liệu</MenuItem>
        </Menu>
        <input aria-label={`Tệp cho ${title}`} type="file" hidden multiple ref={inputRef} onChange={handleCurrentFileChange} accept={VALID_FORMATS.join(',')} />
      </>}
      {totalFiles === 0 && <Typography color="text.secondary">Chưa chọn tài liệu.</Typography>}
      <FileAttachmentList files={uploadedFiles} getName={deviceName} onOpen={openDeviceFile} onRemove={handleRemoveUploadedFile} sourceLabel="Tệp đã chọn" confirmed={confirmed} />
      <FileAttachmentList files={currentFiles} getName={deviceName} onOpen={openDeviceFile} onRemove={handleRemoveCurrentFile} sourceLabel="Tệp đã chọn" confirmed={confirmed} />
      <FileAttachmentList files={documentWalletFiles} getName={(file) => file.document.displayName || file.document.filename}
        onOpen={(file) => setPreviewFile(file.document)} onRemove={handleRemoveDocumentWalletFile} sourceLabel="Từ ví tài liệu" confirmed={confirmed} />
      {openWalletModal && <UserWalletModal open={openWalletModal} onClose={handleCloseUserWalletModal} handleDocumentWalletFileChange={handleDocumentWalletFileChange} />}
      {previewFile && <FilePreviewModal open={!!previewFile} onClose={() => setPreviewFile(null)} metadataUrl={previewFile.ipfsLink} filename={previewFile.filename} />}
    </Box>
  );
};
export default FileUploadSection;
