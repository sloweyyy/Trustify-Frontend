import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Backdrop, Box, Card, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotarizationService from '../../../services/notarization.service';
import CreateNotarizationProfileStepper from '../../../components/modals/CreateNotarizationProfileStepper';
import NotarizationFormContent from './NotarizationFormContent';
import { ErrorState } from '../../../components/shared/PageFeedback';
import { getDocumentNameByCode, VALID_FORMATS } from '../../../utils/constants';

const initialNotarizationData = {
  requesterInfo: {},
  notaryField: null,
  notaryService: null,
  amount: null,
  fileIds: [],
  customFileNames: [],
  files: [],
};

const initialFieldsAndServices = {
  notarizationField: [],
  notarizationService: [],
};

const CreateNotarizationProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [documentWalletFiles, setDocumentWalletFiles] = useState([]);
  const [notarizationData, setNotarizationData] = useState(initialNotarizationData);
  const [fieldsAndServices, setFieldsAndServices] = useState(initialFieldsAndServices);
  const [loadingNotarization, setLoadingNotarization] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: 'start' });
  }, [currentStep]);
  const [selectedField, setSelectedField] = useState(null);

  const fetchNotarizationField = useCallback(async () => {
    if (fieldsAndServices.notarizationField.length > 0) return;
    setLoadingNotarization(true);
    setLoadError(null);
    try {
      const response = await NotarizationService.getAllNotarizationField();
      if (!Array.isArray(response)) throw new Error('Fields unavailable');
      setFieldsAndServices((prev) => ({ ...prev, notarizationField: response }));
    } catch (error) {
      setLoadError('fields');
    } finally {
      setLoadingNotarization(false);
    }
  }, [fieldsAndServices]);

  const fetchNotarizationService = useCallback(async () => {
    if (!selectedField || fieldsAndServices.notarizationService.length > 0) return;
    setLoadingNotarization(true);
    setLoadError(null);
    try {
      const response = await NotarizationService.getNotarizationServiceByFieldId(selectedField.id);
      if (!Array.isArray(response)) throw new Error('Services unavailable');
      setFieldsAndServices((prev) => ({ ...prev, notarizationService: response }));
    } catch (error) {
      setLoadError('services');
    } finally {
      setLoadingNotarization(false);
    }
  }, [fieldsAndServices, selectedField]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'amount') {
      setNotarizationData((prev) => ({
        ...prev,
        [name]: value === '' ? undefined : parseInt(value, 10),
      }));
      return;
    }

    setNotarizationData((prev) => ({
      ...prev,
      requesterInfo: { ...prev.requesterInfo, [name]: value },
    }));
  };

  const handleDocumentWalletChange = (document, documentType) => {
    if (!document || !document.filename || !document._id) {
      toast.error('Tài liệu không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    if (notarizationData.fileIds.includes(document._id)) {
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
        { document: { ...document, displayName: document.displayName || document.filename.replace(/^\d+-/, ''), filename: customFileName }, type: documentType },
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

      setUploadedFiles((prev) => [...prev, { file: renamedFile, displayName: file.name, type: documentType }]);
    });
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileToRemove));
  };

  const handleRemoveDocumentWalletFile = (document) => {
    setDocumentWalletFiles((prev) => prev.filter((file) => file.document._id !== document.document._id));

    setNotarizationData((prev) => ({
      ...prev,
      fileIds: prev.fileIds.filter((id) => id !== document.document._id),
      customFileNames: prev.customFileNames.filter((name) => name !== document.document.filename),
    }));
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('notarizationService', JSON.stringify(notarizationData.notaryService));
      formData.append('notarizationField', JSON.stringify(notarizationData.notaryField));
      formData.append('requesterInfo', JSON.stringify(notarizationData.requesterInfo));
      formData.append('amount', notarizationData.amount);

      notarizationData.files.forEach((file) => file && formData.append('files', file));

      formData.append('fileIds', JSON.stringify(notarizationData.fileIds));

      formData.append('customFileNames', JSON.stringify(notarizationData.customFileNames));

      const response = await NotarizationService.uploadNotarizationDocument(formData);

      const createdDocumentId = typeof response?.id === 'string' ? response.id : typeof response?._id === 'string' ? response._id : null;
      if (!createdDocumentId && response?.status !== 200) {
        toast.error('Chưa thể xác nhận việc gửi hồ sơ. Vui lòng kiểm tra Lịch sử trước khi thử lại.');
        return response;
      }
      toast.success('Tạo hồ sơ công chứng thành công');

      setNotarizationData(initialNotarizationData);
      setUploadedFiles([]);
      setDocumentWalletFiles([]);
      setCurrentStep(0);
      if (createdDocumentId) navigate('/user/history', { state: { submittedDocumentId: createdDocumentId } });
      else navigate('/user/history');
      return response;
    } catch (error) {
      toast.error('Chưa thể xác nhận việc gửi hồ sơ. Vui lòng kiểm tra Lịch sử trước khi thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const handleNext = () => {
    if (currentStep === 0) {
      if (!selectedField) {
        return;
      } else if (!selectedService || (Array.isArray(selectedService) && selectedService.length === 0)) {
        return;
      }
    } else if (currentStep === 1) {
      const { requesterInfo, amount } = notarizationData;
      if (
        !requesterInfo.fullName ||
        !requesterInfo.phoneNumber ||
        !requesterInfo.citizenId ||
        !requesterInfo.email ||
        !amount
      ) {
        return;
      }

      const requiredDocumentTypes = notarizationData?.notaryService?.required_documents || [];

      // Kết hợp tài liệu từ uploadedFiles và documentWalletFiles
      const allDocumentTypes = [...uploadedFiles.map((file) => file.type), ...documentWalletFiles.map((file) => file.type)];

      const missingDocumentTypes = requiredDocumentTypes.filter((type) => !allDocumentTypes.includes(type));

      if (missingDocumentTypes.length > 0) {
        toast.error(`Vui lòng tải lên đầy đủ các tài liệu: ${missingDocumentTypes.map(getDocumentNameByCode).join(', ')}`);
        return;
      }
    }

    setNotarizationData((prev) => ({
      ...prev,
      notaryField: selectedField,
      notaryService: selectedService,
      files: uploadedFiles.map((file) => file.file),
    }));

    if (currentStep === 2) {
      handleConfirm();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    setFieldsAndServices({ notarizationField: [], notarizationService: [] });
    setSelectedService(null);
    setLoadError(null);
  }, [selectedField]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'background.default', width: '100%', minHeight: 'calc(100dvh - 64px)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, position: 'sticky', top: { xs: 64, md: 0 }, zIndex: 100, width: '100%', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <CreateNotarizationProfileStepper currentStep={currentStep} />
      </Box>
      <Box sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, width: '100%', maxWidth: 816 }}>
        <Card component="section" aria-labelledby="create-profile-title" sx={{ p: { xs: 0, sm: 3 }, borderWidth: { xs: 0, sm: 1 }, bgcolor: { xs: 'transparent', sm: 'background.paper' } }}>
          <Typography component="h1" variant="h5" id="create-profile-title" ref={headingRef} tabIndex={-1} sx={{ mb: 2, scrollMarginTop: { xs: 180, md: 112 } }}>Tạo hồ sơ công chứng</Typography>
          {loadError && <Box sx={{ mb: 3 }}><ErrorState title={loadError === 'fields' ? 'Chưa thể tải lĩnh vực công chứng' : 'Chưa thể tải dịch vụ công chứng'} description="Bạn có thể thử tải lại danh sách để tiếp tục." onRetry={loadError === 'fields' ? fetchNotarizationField : fetchNotarizationService} /></Box>}
          <NotarizationFormContent
            currentStep={currentStep} uploadedFiles={uploadedFiles} fieldsAndServices={fieldsAndServices}
            selectedField={selectedField} setSelectedField={setSelectedField} fetchNotarizationField={fetchNotarizationField}
            selectedService={selectedService} setSelectedService={setSelectedService} fetchNotarizationService={fetchNotarizationService}
            handleNext={handleNext} handlePrevious={handlePrevious} handleFileChange={handleFileChange} handleInputChange={handleInputChange}
            handleRemoveFile={handleRemoveFile} loadingNotarization={loadingNotarization} notarizationData={notarizationData}
            handleDocumentWalletChange={handleDocumentWalletChange} documentWalletFiles={documentWalletFiles}
            handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile} loading={loading}
          />
        </Card>
      </Box>
      <Backdrop sx={{ color: 'common.white', zIndex: (theme) => theme.zIndex.modal + 1 }} open={loading}>
        <Box role="status" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><CircularProgress color="inherit" aria-hidden="true" /><Typography>Đang gửi hồ sơ…</Typography></Box>
      </Backdrop>
    </Box>
  );
};
export default CreateNotarizationProfile;
