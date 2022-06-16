import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputFieldMui.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputFieldMui(props) {
  const { form, name, label, disabled } = props;
  const error = form.formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          margin="dense"
          variant="outlined"
          label={label}
          disabled={disabled}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default InputFieldMui;
