import React from 'react';
import { Box, LinearProgress, Stepper, Step, StepLabel, Typography, useMediaQuery } from '@mui/material';

const steps = ['Chọn loại công chứng', 'Cung cấp thông tin', 'Kiểm tra lại yêu cầu'];
const CreateNotarizationProfileStepper = ({ currentStep }) => {
  const compact = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const step = Math.min(currentStep, steps.length - 1);
  return (
    <Box sx={{ width: '100%', maxWidth: 960, px: 2 }}>
      {compact ? <Box aria-label="Các bước tạo hồ sơ">
        <Typography aria-current="step" sx={{ mb: 1 }}><strong>Bước {step + 1}/3</strong> · {steps[step]}</Typography>
        <LinearProgress variant="determinate" value={((step + 1) / steps.length) * 100} aria-label="Tiến trình tạo hồ sơ" />
      </Box> : <Stepper activeStep={currentStep}>
        {steps.map((label, index) => <Step key={label} sx={{ minWidth: 0, flex: 1 }}>
          <StepLabel aria-current={index === currentStep ? 'step' : undefined}>{label}</StepLabel>
        </Step>)}
      </Stepper>}
    </Box>
  );
};
export default CreateNotarizationProfileStepper;
