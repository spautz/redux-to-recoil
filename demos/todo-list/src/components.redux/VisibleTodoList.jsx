import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTodo } from '../actions';
import getVisibleTodos from '../selectors/getVisibleTodos';
import Todo from './Todo';

const VisibleTodoList = (props) => {
  const dispatch = useDispatch();

  const todos = useSelector(getVisibleTodos);

  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo.id))} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
