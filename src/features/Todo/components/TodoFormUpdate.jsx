import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import TodoForm from './TodoForm';
TodoFormUpdate.propTypes = {
  closeDialog: PropTypes.func,
};

function TodoFormUpdate({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmit = async (val) => {
    try {
      const action = login(val);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <TodoForm handleSubmit={handleSubmit} />;
}

export default TodoFormUpdate;
