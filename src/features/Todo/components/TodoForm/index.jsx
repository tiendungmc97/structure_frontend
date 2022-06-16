import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';

TodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

function TodoForm({ handleSubmit, handleClose}) {
  const schema = yup.object({
    name: yup.string().required('Tên không được bỏ trống'),
    task: yup.string().required('Nhiệm vụ không được bỏ trống'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      task: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (val) => {
    if (handleSubmit) {
      await handleSubmit(val);
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <div className="form">
      <div className="form__title">Nhiệm vụ</div>
      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputField name="name" form={form} label="Tên" />
        <InputField name="task" form={form} label="Nhiệm vụ" />
        <div className='form__group-btn'>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            className="form__btn mr-5"
          >
            Tạo
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
          <Button
            type="submit"
            variant="outlined"
            disabled={isSubmitting}
            className="form__btn"
            onClick={handleClose}
          >
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
