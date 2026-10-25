import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CustomAutocompleteField from './CustomAutocompleteField';
import CustomTextField from './CustomTextField';
import FileUploadSection from './FileUploadSection';
import { getDocumentNameByCode } from '../../../utils/constants';

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px minmax(0, 1fr)' }, gap: { xs: 0.5, sm: 2 } }}>
    <Typography component="dt" color="text.secondary">{label}</Typography>
    <Typography component="dd" sx={{ m: 0, overflowWrap: 'anywhere' }}>{value}</Typography>
  </Box>
);
const Section = ({ title, children }) => (
  <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography component="h2" variant="h6">{title}</Typography>{children}
  </Box>
);
const requiredFields = [
  { label: 'Số bản sao', name: 'amount', placeholder: 'Nhập số lượng bản sao', type: 'number' },
  { label: 'Họ và tên', name: 'fullName', placeholder: 'Nhập họ và tên', type: 'text' },
  { label: 'Số điện thoại', name: 'phoneNumber', placeholder: 'Nhập số điện thoại', type: 'tel' },
  { label: 'Số CMND/CCCD/Hộ chiếu', name: 'citizenId', placeholder: 'Nhập số CMND/CCCD/Hộ chiếu', type: 'text' },
  { label: 'Email', name: 'email', placeholder: 'Nhập địa chỉ email', type: 'email' },
];
const NotarizationFormContent = ({ currentStep, uploadedFiles, fieldsAndServices, selectedField, setSelectedField,
  fetchNotarizationField, selectedService, setSelectedService, fetchNotarizationService, handleNext, handlePrevious,
  handleFileChange, handleInputChange, handleRemoveFile, loadingNotarization, notarizationData,
  handleDocumentWalletChange, documentWalletFiles, handleRemoveDocumentWalletFile, loading = false }) => {
  const [attempted, setAttempted] = useState(false);
  const formRef = useRef(null);
  useEffect(() => { setAttempted(false); }, [currentStep]);
  const valueFor = (name) => name === 'amount' ? notarizationData.amount : notarizationData.requesterInfo?.[name];
  const next = () => {
    const hasMissingField = currentStep === 0 ? !selectedField || !selectedService : currentStep === 1 && requiredFields.some((field) => !valueFor(field.name));
    setAttempted(true); handleNext();
    if (hasMissingField) requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
  };
  const documents = notarizationData?.notaryService?.required_documents || [];
  const descriptions = [
    'Chọn lĩnh vực và dịch vụ bạn cần. Tiếp theo, bạn sẽ điền thông tin và chọn tài liệu.',
    'Điền thông tin người yêu cầu và chọn đủ giấy tờ. Bạn sẽ kiểm tra lại trước khi gửi hồ sơ.',
    'Kiểm tra thông tin và tài liệu bên dưới. Sau khi gửi, bạn có thể theo dõi hồ sơ tại Lịch sử.',
  ];
  const renderDocuments = (confirmed = false) => documents.map((document) => (
    <FileUploadSection key={document} title={getDocumentNameByCode(document)}
      currentFiles={uploadedFiles.filter((file) => file.type === document)}
      handleCurrentFileChange={(event) => handleFileChange(event, document)} handleRemoveCurrentFile={handleRemoveFile}
      documentWalletFiles={documentWalletFiles.filter((file) => file.type === document)}
      handleDocumentWalletFileChange={(file) => handleDocumentWalletChange(file, document)}
      handleRemoveDocumentWalletFile={handleRemoveDocumentWalletFile} confirmed={confirmed} />
  ));
  return (
    <Box ref={formRef} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography color="text.secondary">{descriptions[currentStep]}</Typography>
      {currentStep === 0 && <>
        <CustomAutocompleteField title="Lĩnh vực công chứng" required options={fieldsAndServices.notarizationField}
          selectedOption={selectedField} setSelectedOption={setSelectedField} fetchOptions={fetchNotarizationField} loadingOptions={loadingNotarization}
          error={attempted && !selectedField} helperText={attempted && !selectedField ? 'Chọn lĩnh vực công chứng bạn cần.' : undefined} />
        <CustomAutocompleteField title="Dịch vụ công chứng" required options={fieldsAndServices.notarizationService}
          selectedOption={selectedService} setSelectedOption={setSelectedService} fetchOptions={fetchNotarizationService} loadingOptions={loadingNotarization}
          disabled={!selectedField} error={attempted && !selectedService}
          helperText={!selectedField ? 'Chọn lĩnh vực để xem dịch vụ phù hợp.' : attempted && !selectedService ? 'Chọn dịch vụ công chứng bạn cần.' : undefined} />
      </>}
      {currentStep === 1 && <>
        <Section title="Thông tin người yêu cầu">
          {requiredFields.map((field) => <CustomTextField key={field.name} {...field} value={valueFor(field.name) ?? ''}
            onChange={handleInputChange} required error={attempted && !valueFor(field.name)}
            helperText={attempted && !valueFor(field.name) ? `Vui lòng nhập ${field.label[0].toLowerCase() + field.label.slice(1)}.` : field.name === 'amount' ? 'Số bản sao cần công chứng, không phải số tiền thanh toán.' : undefined} />)}
        </Section>
        <Section title="Tài liệu cần cung cấp">
          <Typography color="text.secondary">Chọn tài liệu cho từng loại giấy tờ bên dưới.</Typography>
          {renderDocuments()}
        </Section>
      </>}
      {currentStep === 2 && <>
        <Section title="Thông tin công chứng">
          <Box component="dl" sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InfoRow label="Lĩnh vực công chứng" value={notarizationData?.notaryField?.name} />
            <InfoRow label="Dịch vụ công chứng" value={notarizationData?.notaryService?.name} />
            <InfoRow label="Số bản sao" value={notarizationData.amount} />
          </Box>
        </Section>
        <Section title="Thông tin người yêu cầu">
          <Box component="dl" sx={{ m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {requiredFields.filter((field) => field.name !== 'amount').map((field) => <InfoRow key={field.name} label={field.label} value={valueFor(field.name)} />)}
          </Box>
        </Section>
        <Section title="Tài liệu đã chọn">{renderDocuments(true)}</Section>
      </>}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', pt: 2, borderTop: 1, borderColor: 'divider' }}>
        {currentStep > 0 && <Button variant="outlined" disabled={loading} onClick={handlePrevious}>Quay lại</Button>}
        <Button variant="contained" disabled={loading} onClick={next} sx={{ ml: 'auto', minWidth: { xs: 144, sm: 160 } }}>{currentStep === 2 ? 'Gửi hồ sơ' : 'Tiếp tục'}</Button>
      </Box>
    </Box>
  );
};
export default NotarizationFormContent;
