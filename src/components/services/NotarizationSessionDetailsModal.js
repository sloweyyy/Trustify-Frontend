import React, { useState, useMemo, useEffect, useId } from 'react';
import { Close } from '@mui/icons-material';
import AvatarWithCloseButton from '../static/AvatarWithCloseButton';
import { Alert, Box, Button, Dialog, DialogTitle, DialogContent, IconButton, Typography, Autocomplete, TextField, useMediaQuery } from '@mui/material';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FileUploadSection from '../../pages/services/create-notarization-profile/FileUploadSection';
import { getDocumentNameByCode, VALID_FORMATS } from '../../utils/constants';
import { uploadFileSuccess } from '../../stores/slices/sessionSlice';
import DocumentStatusChip, { StatusChip } from '../shared/DocumentStatusChip';
import SessionFeedback, { canDrawSessionSignature } from './SessionFeedback';
import JoinSessionModal from '../../pages/services/JoinSessionModal';
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const AddGuest = ({ value, options, handleInputChange, handleAddGuest, loading }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2">Thêm khách mời</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 1,
        backgroundColor: 'background.default',
        borderRadius: 1,
      }}
    >
      {/* Guest Autocomplete */}
      <Autocomplete
        freeSolo
        value={value}
        loading={loading}
        options={options}
        getOptionLabel={(option) => option?.email || option}
        onInputChange={handleInputChange}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Email khách mời" placeholder="Nhập email khách mời"
            sx={{
              flexGrow: 1,
              '& .MuiInputBase-input': { fontSize: '1rem' },
            }}
            onKeyDown={(event) => event.key === 'Enter' && handleAddGuest()}
          />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            key={typeof option === 'string' ? option : option.id}
            style={{ fontSize: '1rem', fontWeight: 400 }}
          >
            {typeof option === 'string' ? option : option.email}
          </li>
        )}
        loadingText={<Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Đang tải...</Typography>}
        noOptionsText={
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.secondary' }}>Không tìm thấy kết quả</Typography>
        }
      />

      <Button
        size="small"
        variant="outlined"
        onClick={handleAddGuest}
        sx={{ fontSize: 16, textTransform: 'none', mr: 1 }}
      >
        Thêm
      </Button>
    </Box>
  </Box>
);

const NotarizationSessionDetailsModal = ({ open, onClose, session }) => {
  const [email, setEmail] = useState('');
  const [options, setOptions] = useState([]);
  const [users, setUsers] = useState(session.users);
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [documentWalletFiles, setDocumentWalletFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState({ files: [], fileIds: [], customFileNames: [] });
  const [isUploading, setIsUploading] = useState(false);
  const [loadingSignature, setLoadingSignature] = useState(false);
  const [showJoinSessionModal, setShowJoinSessionModal] = useState(false);
  const [isSendingForNotarization, setIsSendingForNotarization] = useState(false);
  const { user } = useSelector((state) => state.user);
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const titleId = useId();

  const dispatch = useDispatch();

  const fetchEmails = useMemo(
    () => debounce(async (value) => {
      setLoading(true);
      try {
        const trimmedValue = value.trim();
        if (!trimmedValue) {
          setOptions([]);
          return;
        }

        const response = await UserService.searchUserByEmail(trimmedValue);
        if (response.length === 0) {
          setOptions([]);
          toast.error('Không tìm thấy người dùng.');
        } else {
          setOptions(response);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        setOptions([]);
        toast.error('Không tìm thấy người dùng.');
      } finally {
        setLoading(false);
      }
    }, 1500),
    [],
  );

  const handleRemoveGuest = (emailToRemove) => {
    setUsers((prev) => prev.filter((user) => user.email !== emailToRemove));
  };

  const handleInputChange = (event, newValue) => {
    setEmail(newValue);
    fetchEmails(newValue);
  };

  const handleAddGuest = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUser = options.find((option) => option.email === email);

    if (!email) {
      toast.error('Vui lòng nhập địa chỉ email.');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Địa chỉ email không hợp lệ.');
      return;
    }

    if (!existingUser) {
      toast.error('Không tìm thấy người dùng.');
      return;
    }

    if (users.find((user) => user.email === email)) {
      toast.error('Người dùng này đã được thêm.');
      return;
    }

    const response = SessionService.addUser(session._id, [email]);
    if (response) {
      toast.success('Thêm người dùng thành công');
    } else if (response.code === 403) {
      toast.error('Bạn không phải là người tạo phiên công chứng');
    }
    setUsers((prev) => [...prev, existingUser]);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDeleteGuest = async (email) => {
    setUsers((prev) => prev.filter((user) => user.email !== email));
    const response = await SessionService.deleteUserOutOfSession(session._id, email);
    return response;
  };

  const handleDocumentWalletChange = (document, documentType) => {
    if (!document || !document.filename || !document._id) {
      toast.error('Tài liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (documentWalletFiles.find((file) => file.document._id === document._id)) {
      toast.error('Tài liệu đã được chọn trước đó.');
      return;
    }

    try {
      const timestamp = Date.now();
      const fileExtension = document.filename.includes('.') ? document.filename.split('.').pop() : '';
      const customFileName = `${documentType}_${timestamp}${fileExtension ? `.${fileExtension}` : ''}`;

      setNotarizationData((prevData) => ({
        ...prevData,
        fileIds: [...prevData.fileIds, document._id],
        customFileNames: [...prevData.customFileNames, customFileName],
      }));

      setDocumentWalletFiles((prevFiles) => [
        ...prevFiles,
        { document: { ...document, filename: customFileName }, type: documentType },
      ]);
    } catch (error) {
      console.error('Error handling document wallet change:', error);
      toast.error('Đã xảy ra lỗi khi đổi tên tài liệu.');
    }
  };

  const handleFileChange = (e, documentType) => {
    const files = Array.from(e.target.files);
    const timestamp = new Date().getTime();

    files.forEach((file) => {
      if (!VALID_FORMATS.some((format) => file.name.toLowerCase().endsWith(format))) {
        toast.error(`${file.name}: Tài liệu không hợp lệ`);
        return;
      }

      const fileExtension = file.name.split('.').pop();
      const newFileName = `${documentType}_${timestamp}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setCurrentFiles((prev) => [...prev, { file: renamedFile, type: documentType }]);
    });
  };

  const handleUploadDocument = async () => {
    if (currentFiles.length === 0 && documentWalletFiles.length === 0) {
      toast.error('Vui lòng chọn tài liệu để tải lên');
      return;
    }

    const currentUserEmail = user.email;
    const currentUserInSession = session.users.find((sessionUser) => sessionUser.email === currentUserEmail);
    const isCreator = currentUserEmail === session.creator.email;

    if ((currentUserInSession && currentUserInSession.status === 'accepted') || isCreator) {
      setIsUploading(true);
      try {
        const sessionId = session._id;
        const formData = new FormData();

        currentFiles.forEach((file) => {
          formData.append('files', file.file);
        });

        formData.append('fileIds', JSON.stringify(notarizationData.fileIds));
        formData.append('customFileNames', JSON.stringify(notarizationData.customFileNames));

        const response = await SessionService.uploadSessionDocument(sessionId, formData);

        if (!response.status) {
          toast.success('Tải lên tài liệu thành công');
          dispatch(uploadFileSuccess(true));
        } else {
          toast.error(response.message || 'Có lỗi xảy ra khi tải lên tài liệu');
        }
      } catch (error) {
        toast.error(error.message || 'Có lỗi xảy ra khi tải lên tài liệu');
      } finally {
        setIsUploading(false);
      }
      return;
    }

    setIsUploading(true);
    try {
      const sessionId = session._id;
      const formData = new FormData();

      currentFiles.forEach((file) => {
        formData.append('files', file.file);
      });

      formData.append('fileIds', JSON.stringify(notarizationData.fileIds));
      formData.append('customFileNames', JSON.stringify(notarizationData.customFileNames));

      const response = await SessionService.uploadSessionDocument(sessionId, formData);

      // If user is creator, they shouldn't need to accept invitation
      if (
        response.status === 403 &&
        response.message === 'You must accept the session invitation before uploading documents' &&
        !isCreator
      ) {
        toast.error('Bạn cần chấp nhận lời mời trước khi tải lên tài liệu');
        setShowJoinSessionModal(true);
        return;
      }

      if (!response.status) {
        toast.success('Tải lên tài liệu thành công');
        dispatch(uploadFileSuccess(true));
      } else {
        toast.error(response.message || 'Có lỗi xảy ra khi tải lên tài liệu');
      }
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi tải lên tài liệu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setCurrentFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveDocumentWalletFile = (document) => {
    setDocumentWalletFiles((prev) => prev.filter((file) => file.document._id !== document.document._id));
  };

  const handleRemoveUploadedFile = async (document) => {
    const response = await SessionService.deleteSessionFile(session._id, document.file._id);
    console.log(response);

    if (response.status === 404) {
      toast.error('Tài liệu không tồn tại');
      return;
    }

    toast.success('Xóa tài liệu thành công');
    setUploadedFiles((prev) => prev.filter((file) => file.file._id !== document.file._id));
  };

  const isCreator = user.email === session.creator.email;
  const actorApproved = user.id === session.creator._id ? session.signature?.creator?.approved : session.signature?.users?.find((member) => member._id === user.id)?.approved;
  const needsSignature = session.status.status === 'digitalSignature' && !actorApproved && canDrawSessionSignature(session.signature, session.output, session.createdBy, user.id);
  const focusSignature = () => {
    const heading = document.getElementById(`${titleId}-signature`);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView?.({ block: 'start' });
  };


  const handleSignatureSave = async (signatureImageUrl) => {
    const signatureImageFile = new File([signatureImageUrl], user._id + '.png', { type: 'image/png' });
    const formData = new FormData();
    formData.append('signatureImage', signatureImageFile);
    formData.append('sessionId', session._id);
    setLoadingSignature(true);
    try {
      const response = await SessionService.approveSignatureSessionByUser(formData);
      if (response.status === 400) {
        toast.error('Tài liệu này đã được ký số');
        return;
      }
      toast.success('Lưu chữ ký thành công');

      const signatureUrl = URL.createObjectURL(signatureImageFile);

      if (user.id === session.creator._id) {
        session.signature = {
          ...session.signature,
          creator: {
            ...session.signature?.creator,
            approved: true,
            signatureImage: signatureUrl,
          },
        };
      } else {
        const updatedUsers =
          session.signature?.users?.map((sigUser) => {
            if (sigUser._id === user.id) {
              return {
                ...sigUser,
                signatureImage: signatureUrl,
                approved: true,
              };
            }
            return sigUser;
          }) || [];

        if (!updatedUsers.some((sigUser) => sigUser._id === user.id)) {
          updatedUsers.push({
            _id: user.id,
            signatureImage: signatureUrl,
            approved: true,
          });
        }

        session.signature = {
          ...session.signature,
          users: updatedUsers,
        };
      }
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

  const handleSendForNotarization = async () => {
    if (session.files.length === 0) {
      toast.error('Không có tài liệu để gửi công chứng');
      return;
    }

    setIsSendingForNotarization(true);
    try {
      const response = await SessionService.sendSessionForNotarization(session._id);

      if (response.message === 'Session sent for notarization successfully') {
        toast.success('Phiên công chứng đã được gửi xử lý thành công');
        onClose();
      } else if (response.status === 400 && response.message === 'Session already sent for notarization') {
        toast.info('Phiên công chứng này đã được gửi xử lý trước đó');
      } else {
        toast.error(response.message || 'Có lỗi xảy ra khi gửi phiên công chứng');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi phiên công chứng');
      console.error(error);
    } finally {
      setIsSendingForNotarization(false);
    }
  };

  useEffect(() => {
    let uploadedFiles = [];
    session.files.forEach((file) => {
      const parts = file.filename.split('_');

      const fileType = parts[0] + '_' + parts[1];

      uploadedFiles.push({ file: file, type: fileType });
    });

    setUploadedFiles(uploadedFiles);
  }, [session.files]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" fullScreen={fullScreen} aria-labelledby={`${titleId}-title`}>
        <DialogTitle component="div" id={`${titleId}-header`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h2" variant="h5" id={`${titleId}-title`}>Chi tiết phiên công chứng</Typography>
            <Box sx={{ mt: 1 }}>{session.status.status === 'unknown' ? <StatusChip label="Chưa gửi xử lý" /> : <DocumentStatusChip status={session.status.status} />}</Box>
          </Box>
          <IconButton aria-label="Đóng chi tiết phiên công chứng" onClick={onClose}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, minWidth: 0 }}>
          {needsSignature && <Alert severity="info" sx={{ mb: 3 }} action={<Button variant="contained" onClick={focusSignature}>Ký ngay</Button>}>
            Phiên công chứng đang chờ chữ ký của bạn
          </Alert>}
          {/* Notary Session Name */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0, mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                Tên phiên công chứng
              </Typography>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'background.default',
                  padding: 2,
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'text.primary',
                  border: 1, borderColor: 'divider',
                }}
              >
                {session.sessionName}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 0, mb: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                Số lượng bản sao
              </Typography>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'background.default',
                  padding: 2,
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'text.primary',
                  border: 1, borderColor: 'divider',
                }}
              >
                {session.amount}
              </Typography>
            </Box>
          </Box>

          {/* Details Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2 }}>
            <Box sx={{ flex: '1' }}>
              <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                Lĩnh vực công chứng
              </Typography>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'background.default',
                  padding: 2,
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'text.primary',
                  border: 1, borderColor: 'divider',
                }}
              >
                {session.notaryField.name}
              </Typography>
            </Box>

            <Box sx={{ flex: '1' }}>
              <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
                Dịch vụ công chứng
              </Typography>
              <Typography
                sx={{
                  borderRadius: 1,
                  backgroundColor: 'background.default',
                  padding: 2,
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'text.primary',
                  border: 1, borderColor: 'divider',
                }}
              >
                {session.notaryService.name}
              </Typography>
            </Box>
          </Box>

          {/* Duration */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.primary', mb: 2 }}>
              Thời gian diễn ra phiên công chứng
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'background.default',
                    padding: 2,
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'text.primary',
                    border: 1, borderColor: 'divider',
                  }}
                >
                  {formatDate(session.startDate)} - {formatTime(session.startDate)}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'background.default',
                    padding: 2,
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'text.primary',
                    border: 1, borderColor: 'divider',
                  }}
                >
                  {formatDate(session.endDate)} - {formatTime(session.endDate)}
                </Typography>
              </Box>
            </Box>
          </Box>
          {session.creator._id === user.id && session.status.status === 'unknown' && (
            <AddGuest
              value={email}
              options={options}
              handleInputChange={handleInputChange}
              handleAddGuest={handleAddGuest}
              users={users}
              handleRemoveGuest={handleRemoveGuest}
              loading={loading}
            />
          )}

          {session.status.status === 'unknown' && (
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <AvatarWithCloseButton
                key={session.creator.email}
                email={session.creator.email}
                onHideRemoveIcon={true}
                name={session.creator.name}
                isCreator={true}
              />
              {users.map((guest, index) => (
                <AvatarWithCloseButton
                  key={index}
                  email={guest.email}
                  onRemove={() => handleDeleteGuest(guest.email)}
                  onHideRemoveIcon={!isCreator}
                />
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 500, textTransform: 'capitalize', color: 'text.primary', mb: 1 }}>
                Danh sách tài liệu đã đăng tải
              </Typography>

              {session?.notaryService?.required_documents.map((document, index) => (
                <FileUploadSection
                  key={index}
                  title={getDocumentNameByCode(document)}
                  currentFiles={currentFiles.filter((file) => file.type === document)}
                  handleCurrentFileChange={(e) => handleFileChange(e, document)}
                  handleRemoveCurrentFile={handleRemoveFile}
                  uploadedFiles={uploadedFiles.filter((file) => file.type === document)}
                  handleRemoveUploadedFile={handleRemoveUploadedFile}
                  documentWalletFiles={documentWalletFiles.filter((file) => file.type === document)}
                  handleDocumentWalletFileChange={(file) => handleDocumentWalletChange(file, document)}
                  handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile}
                  confirmed={session.status.status !== 'unknown'}
                />
              ))}
              <Button
                variant="contained"
                size="small"
                sx={{
                  p: 1.5,
                  backgroundColor: 'primary.main',
                  alignSelf: 'flex-end',
                  display: session.status.status === 'unknown' ? 'block' : 'none',
                }}
                onClick={handleUploadDocument}
                disabled={isUploading || session.status.status !== 'unknown'}
              >
                <Typography sx={{ fontSize: 16, fontWeight: 600, textTransform: 'none', color: 'primary.contrastText' }}>
                  {isUploading ? 'Đang tải lên...' : 'Gửi tài liệu'}
                </Typography>
              </Button>
            </Box>
            <SessionFeedback
              signaturePadId={`${titleId}-signature`}
              signature={session.signature}
              output={session.output}
              feedback={session.status.feedback}
              onSignatureSave={handleSignatureSave}
              loading={loadingSignature}
              createdBy={session.createdBy}
            />
          </Box>

          {/* Add Send for Notarization button for creator */}
          {isCreator && session.status.status === 'unknown' && session.files.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendForNotarization}
                disabled={isSendingForNotarization}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                {isSendingForNotarization ? 'Đang gửi...' : 'Gửi phiên công chứng để xử lý'}
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Join Session Modal - moved outside the main modal */}
      <JoinSessionModal sessionId={session._id} open={showJoinSessionModal} setOpen={setShowJoinSessionModal} />
    </>
  );
};

export default NotarizationSessionDetailsModal;
