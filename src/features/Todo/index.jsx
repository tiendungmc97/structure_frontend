import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoFormCreate from './components/TodoFormCreate';
import TodoFormUpdate from './components/TodoFormUpdate';

Todo.propTypes = {};

function Todo(props) {

  return (
    <Routes>
      <Route path="create" element={<TodoFormCreate/>}/>
      <Route path="update" element={<TodoFormUpdate/>}/>
    </Routes>
  );
}

export default Todo;
