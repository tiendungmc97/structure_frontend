import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, CircularProgress } from '@mui/material';
import InputFieldMui from 'components/form-controls/InputFieldMui';
import InputPassword from 'components/form-controls/InputPasswordMui';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import * as yup from 'yup';
import './styles.scss';

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function ChangePasswordForm(props) {
  const customer = useSelector((state) => state.user.current.customer);
  console.log(customer);

  const schema = yup.object({
    password: yup.string().required('Password không được bỏ trống'),
    retypePassword: yup
      .string()
      .required('Password không được bỏ trống')
      .oneOf([yup.ref('password')], 'Password không khớp'),
  });

  const form = useForm({
    defaultValues: {
      username: customer.username,
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (val) => {
    const { handleSubmit } = props;
    if (handleSubmit) {
      await handleSubmit(val);
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <div className="password">
      <p className="password__title">{customer?.name.toUpperCase()}</p>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputFieldMui name="username" form={form} label="Tên đăng nhập" disabled/>
        <InputFieldMui name="password" form={form} label="Mật khẩu mới" />
        <InputPassword name="retypePassword" form={form} label="Nhập lại mật khẩu" />
        <Button type="submit" variant="contained" className="password__btn" disabled={isSubmitting}>
          Thay Đổi mật khẩu
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
