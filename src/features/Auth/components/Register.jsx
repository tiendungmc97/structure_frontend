import { unwrapResult } from '@reduxjs/toolkit';
import { login, register, setPassword } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from './RegisterFrom';
Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (val) => {
    try {
      const actionRegister = register(val);
      const resultActionRegister = await dispatch(actionRegister);

      const customer_id = unwrapResult(resultActionRegister);
      const schemaSetpassword = {
        customer_id: customer_id,
        password: val.password,
      };
      const actionSetpassword = setPassword(schemaSetpassword);
      const resultActionSetpassword = await dispatch(actionSetpassword);
      unwrapResult(resultActionSetpassword);

      const schemaLogin = {
        username: val.username,
        password: val.password,
      };
      const actionLogin = login(schemaLogin);
      const resultActionLogin = await dispatch(actionLogin);
      unwrapResult(resultActionLogin);
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
    } catch (error) {
      console.log(error, 'error');
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <RegisterForm handleSubmit={handleSubmit} />;
}

export default Register;
