import React, { useId } from 'react';
import { Box } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { viVN } from '@mui/x-date-pickers/locales';
import FieldLabel from './FieldLabel';

const localeText = { ...viVN.components.MuiLocalizationProvider.defaultProps.localeText, okButtonLabel: 'Đồng ý' };

// Keep the caller's Dayjs values and callbacks; only localize their presentation.
const DateTimeFields = ({ startDate, setStartDate, startTime, setStartTime, isSubmitting }) => {
  const id = useId();
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2, mt: 1, minWidth: 0 }}>
      <FieldLabel htmlFor={`${id}-date`} label="Ngày (dd/mm/yyyy)" disabled={isSubmitting}>
        <DatePicker
          value={startDate} onChange={(value) => setStartDate(value)} format="DD/MM/YYYY"
          dayOfWeekFormatter={(date) => date.locale('vi').format('dd')}
          disabled={isSubmitting} localeText={localeText}
          slotProps={{ textField: { id: `${id}-date`, fullWidth: true }, openPickerButton: { 'aria-label': 'Chọn ngày' }, mobilePaper: { sx: { m: 0, width: 352, maxWidth: '100vw' } } }}
        />
      </FieldLabel>
      <FieldLabel htmlFor={`${id}-time`} label="Giờ (24 giờ)" disabled={isSubmitting}>
        <TimePicker
          value={startTime} onChange={(value) => setStartTime(value)} format="HH:mm" ampm={false}
          disabled={isSubmitting} localeText={localeText}
          slotProps={{ textField: { id: `${id}-time`, fullWidth: true }, openPickerButton: { 'aria-label': 'Chọn giờ' }, mobilePaper: { sx: { m: 0, width: 352, maxWidth: '100vw' } } }}
        />
      </FieldLabel>
    </Box>
  );
};

export default DateTimeFields;
