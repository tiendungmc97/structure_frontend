import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, FormText, Input, Label } from 'reactstrap';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label } = props;
  const error = form.formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormGroup className="mb-0" >
          <Label for={name} style={{ fontWeight: '500' }}>
            {label}
          </Label>
          <Input {...field} id={name} placeholder={label} type="text" />
          {error && <FormText className="error">{error?.message}</FormText>}
          {!error && <br />}
        </FormGroup>
      )}
    />
  );
}

export default InputField;