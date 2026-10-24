import { TextField, Autocomplete } from '@mui/material';
import React, { useId } from 'react';
import FieldLabel from '../shared/FieldLabel';

const LabeledTextField = ({
  label, isAutoComplete = false, value = '', defaultValue = '', onChange,
  options = [], disabled = false, type = 'text', inputMode, autoComplete, error = false, helperText,
}) => {
  const id = useId();
  return (
    <FieldLabel htmlFor={id} label={label} disabled={disabled} error={error}>
      {isAutoComplete ? (
        <Autocomplete
          clearText="Xóa lựa chọn" openText="Mở danh sách" closeText="Đóng danh sách"
          loadingText="Đang tải…" noOptionsText="Không có lựa chọn phù hợp"
          id={id} disabled={disabled} value={value}
          onChange={(event, newValue) => onChange(newValue)}
          options={options.map((option) => option.label)}
          renderInput={(params) => <TextField {...params} placeholder={defaultValue} fullWidth error={error} helperText={helperText} FormHelperTextProps={{ sx: { fontSize: error ? '1rem' : '.875rem' } }} />}
        />
      ) : (
        <TextField
          id={id} fullWidth disabled={disabled} value={value} type={type} error={error} helperText={helperText}
          FormHelperTextProps={{ sx: { fontSize: error ? '1rem' : '.875rem' } }}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete} inputProps={{ inputMode }}
        />
      )}
    </FieldLabel>
  );
};

export default LabeledTextField;
