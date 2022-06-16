import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import TodoForm from './TodoForm';
TodoFormUpdate.propTypes = {
  closeDialog: PropTypes.func,
};

function TodoFormUpdate({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (val) => {
    try {
      console.log(val);

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return <TodoForm handleSubmit={handleSubmit} handleClose={closeDialog}/>;
}

export default TodoFormUpdate;
