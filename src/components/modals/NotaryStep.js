import React from 'react';
import { Alert, Box, Step, StepLabel, Stepper, Typography } from '@mui/material';

const steps = [
  { label: 'Chờ xử lý' },
  { label: 'Đang xử lý' },
  { label: 'Đang xử lý', detail: 'Bước xác minh' },
  { label: 'Chờ ký số' },
  { label: 'Hoàn tất' },
];

const NotaryStep = ({ currentStep, status }) => {
  if (status === 'rejected') return <Alert severity="error">Hồ sơ bị từ chối. Xem ghi chú của công chứng viên để biết chi tiết.</Alert>;
  if (status && !['pending', 'processing', 'verification', 'digitalSignature', 'completed'].includes(status)) {
    return <Typography color="text.secondary">Chưa có thông tin tiến trình hồ sơ.</Typography>;
  }
  return (
    <Box component="section" aria-label="Tiến trình hồ sơ">
      <Typography component="h3" variant="subtitle1" sx={{ mb: 2 }}>Tiến trình hồ sơ</Typography>
      <Stepper activeStep={status === 'completed' ? steps.length : currentStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel optional={step.detail && <Typography variant="caption" color="text.secondary">{step.detail}</Typography>}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default NotaryStep;
