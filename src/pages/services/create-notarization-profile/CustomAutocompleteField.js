import React, { useId } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import FieldLabel from '../../../components/shared/FieldLabel';

const CustomAutocompleteField = ({ title, options, selectedOption, setSelectedOption, fetchOptions, loadingOptions, required = false, error = false, helperText }) => {
  const id = useId();
  return (
    <FieldLabel htmlFor={id} label={title} required={required} error={error}>
      <Autocomplete
        clearText="Xóa lựa chọn" openText="Mở danh sách" closeText="Đóng danh sách"
        loadingText="Đang tải…" noOptionsText="Không có lựa chọn phù hợp"
        id={id} loading={loadingOptions} options={options}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setSelectedOption(value)}
        renderInput={(params) => (
          <TextField {...params} error={error} helperText={helperText} FormHelperTextProps={{ sx: { fontSize: error ? '1rem' : '.875rem' } }} placeholder={`Chọn ${title}`} inputProps={{ ...params.inputProps, readOnly: true, 'aria-required': required || undefined }} />
        )}
        value={selectedOption} onOpen={fetchOptions}
      />
    </FieldLabel>
  );
};

export default CustomAutocompleteField;
