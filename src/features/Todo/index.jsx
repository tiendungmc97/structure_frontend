import { Button, Dialog, DialogContent, Input } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Col, Row } from 'reactstrap';
import TodoFormCreate from './components/TodoFormCreate';
import TodoFormUpdate from './components/TodoFormUpdate';
import './styles.scss';

Todo.propTypes = {};
const MODE = {
  UPDATE: 'update',
  CREATE: 'create',
};

function Todo(props) {
  const [mode, setMode] = useState('');
  const handleCreate = () => {
    setMode(MODE.CREATE);
  };
  const handleClose = () => {
    setMode('');
  };
  return (
    <Row className="todo">
      <div className="todo__title">TODO</div>
      <Row className="todo__process">
        <Col className="process__left">
          <Input fullWidth placeholder="Tìm kiếm" />
        </Col>
        <Col className="process__right">
          <Button variant="contained" onClick={handleCreate}>
            Thêm
          </Button>
        </Col>
      </Row>
      <Row className="todo__content">Table</Row>
      <Dialog
        PaperProps={{
          sx: { position: 'fixed', top: '10vh', left: 'auto', m: 0, width: '400px' },
        }}
        fullWidth
        open={!!mode}
        onClose={handleClose}
      >
        <DialogContent>
          {mode === MODE.CREATE && (
            <TodoFormCreate closeDialog={handleClose}/>
          )}
          {mode === MODE.UPDATE && (
            <TodoFormUpdate closeDialog={handleClose}/>
          )}
        </DialogContent>
      </Dialog>
    </Row>
  );
}

export default Todo;
