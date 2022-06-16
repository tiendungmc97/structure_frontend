import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, FormText, Input, Label } from 'reactstrap';

InputCheck.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputCheck(props) {
  const { form, name, label } = props;
  const error = form.formState.errors[name];
  const value = form.watch(name);
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormGroup className="mb-0" check inline>
          <Input {...field} id={name} type="checkbox" checked={value} />
          <Label for={name} style={{ fontWeight: '500' }} check>
            {label}
          </Label>
          {error && <FormText className="error">{error?.message}</FormText>}
          {!error && <br />}
        </FormGroup>
      )}
    />
  );
}

export default InputCheck;