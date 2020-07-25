import React from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilValue } from 'recoil';
import { selectorFromReselect } from 'redux-to-recoil';

import { toggleTodo } from '../actions';
import getVisibleTodos from '../selectors/getVisibleTodos';
import Todo from './Todo';

const todosSelector = selectorFromReselect(getVisibleTodos);

const VisibleTodoList = (props) => {
  const dispatch = useDispatch();

  const todos = useRecoilValue(todosSelector);

  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo.id))} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
