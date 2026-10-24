import React, { useId } from 'react';
import { TextField } from '@mui/material';
import FieldLabel from '../../../components/shared/FieldLabel';

const CustomTextField = ({ label, name, value, placeholder, onChange, required, type, error = false, helperText }) => {
  const id = useId();
  const handleInput = (e) => {
    const { value } = e.target;
    if (type === 'number' && value < 0) {
      e.target.value = '';
    }
  };

  const handleWheel = (e) => {
    if (type === 'number') {
      e.target.blur();
    }
  };


  return (
    <FieldLabel htmlFor={id} label={label} required={required} error={error}>
      <TextField
        id={id} fullWidth name={name} value={value} onChange={onChange} error={error} helperText={helperText}
        FormHelperTextProps={{ sx: { fontSize: error ? '1rem' : '.875rem' } }}
        onInput={handleInput} onWheel={handleWheel} type={type || 'text'} placeholder={placeholder}
        autoComplete={{ fullName: 'name', phoneNumber: 'tel', email: 'email' }[name] || 'off'}
        inputProps={{ 'aria-required': required || undefined, inputMode: type === 'number' ? 'numeric' : type === 'tel' ? 'tel' : undefined }}
        sx={{ '& input[type=number]': { MozAppearance: 'textfield' }, '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 } }}
      />
    </FieldLabel>
  );
};

export default CustomTextField;
