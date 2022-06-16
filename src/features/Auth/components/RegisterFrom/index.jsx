import { yupResolver } from '@hookform/resolvers/yup';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, CircularProgress, Typography } from '@mui/material';
import InputFieldMui from 'components/form-controls/InputFieldMui';
import InputPasswordMui from 'components/form-controls/InputPasswordMui';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'reactstrap';
import * as yup from 'yup';
import './styles.scss';

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
  const schema = yup.object({
    name: yup
      .string()
      .required('Tên không được bỏ trống')
      .test('Tên ít nhất 2 kí tự', 'Tên phải có ít nhất 2 kí tự', (val) => {
        return val.split(' ').length >= 2;
      }),
    username: yup.string().required('Tài khoản không được bỏ trống'),
    birthday: yup.string().required('Ngày sinh không được bỏ trống'),
    phone: yup.string().required('Số điện thoại không được bỏ trống'),
    password: yup.string().required('Password không được bỏ trống'),
    retypePassword: yup
      .string()
      .required('Password không được bỏ trống')
      .oneOf([yup.ref('password')], 'Password không khớp'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      role: 'customer',
      birthday: '',
      phone: '',
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
  const cancleForm = () => {
    // form.reset();
  };
  const { isSubmitting } = form.formState;

  return (
    <div className="register">
      <Avatar className="register__avatar">
        <LockOutlined></LockOutlined>
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Row>
          <InputFieldMui name="name" form={form} label="Họ và tên" />
          <InputFieldMui name="username" form={form} label="Tài khoản" />
          <InputFieldMui name="birthday" form={form} label="Ngày sinh" />
          <InputFieldMui name="phone" form={form} label="Số điện thoại" />
        </Row>
        <Row>
          <Col>
            <InputPasswordMui name="password" form={form} label="Mật khẩu" />
          </Col>
          <Col>
            <InputPasswordMui name="retypePassword" form={form} label="Nhập lại" />
          </Col>
        </Row>
        <Button type="submit" variant="contained" className="register__btn" disabled={isSubmitting}>
          Đăng kí tài khoản
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

export default RegisterForm;
