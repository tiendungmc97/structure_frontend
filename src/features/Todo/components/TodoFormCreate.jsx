import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import TodoForm from './TodoForm';
TodoFormCreate.propTypes = {
  closeDialog: PropTypes.func,
};

function TodoFormCreate({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();


  const handleSubmit = async (val) => {
    try {
      console.log(val);

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar("tao that bai", { variant: 'error' });
    }
  };
  return <TodoForm handleSubmit={handleSubmit} handleClose={closeDialog}/>;
}

export default TodoFormCreate;
