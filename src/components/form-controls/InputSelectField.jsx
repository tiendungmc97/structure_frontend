import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormGroup, FormText, Label } from 'reactstrap';
InputSelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,

  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
};

function InputSelectField(props) {
  const { form, name, label, options, isMulti, isDisabled } = props;
  const error = form.formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormGroup className="mb-0">
          <Label>{label}</Label>
          <Select
            {...field}
            isDisabled={!!isDisabled || false}
            isMulti={!!isMulti || false}
            options={options}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            styles={{
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
          {error && <FormText className="error">{error?.message}</FormText>}
          {!error && <br />}
        </FormGroup>
      )}
    />
  );
}

export default InputSelectField;