import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, FormText, Input, Label } from 'reactstrap';

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);
  const error = form.formState.errors[name];
  const togleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth size="small" style={{marginTop: "8px", marginBottom: "4px"}}>
          <InputLabel htmlFor={label}>{label}</InputLabel>
          <OutlinedInput
            
            {...field}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={togleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
            error={!!error}
          />
          <FormHelperText error={!!error}>{error?.message || ' '}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordField;
