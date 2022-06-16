import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { setPassword } from '../userSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangePasswordForm from './ChangePasswordForm';
ChangePassword.propTypes = {
  closeDialog: PropTypes.func,
};

function ChangePassword({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const customer =  useSelector(state => state.user.current.customer)

  const handleSubmit = async (val) => {
    try {
      const schema = {
        customer_id: customer.id,
        password: val.password
      }
      const action = setPassword(schema);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Thay đổi mật khẩu thành công", { variant: 'success'})
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <ChangePasswordForm handleSubmit={handleSubmit} />;
}

export default ChangePassword;
