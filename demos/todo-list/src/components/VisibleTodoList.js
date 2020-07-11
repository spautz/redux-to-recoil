import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Todo from './Todo';
import visibleTodosSelector from '../selectors/visibleTodosSelector';
import { toggleTodo } from '../actions';

const VisibleTodoList = (props) => {
  const dispatch = useDispatch();

  const todos = useSelector(visibleTodosSelector);

  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo.id))} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
