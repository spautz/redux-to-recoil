import React from 'react';
import { useRecoilState } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

import getVisibleTodos from '../selectors/getVisibleTodos.recoil';
import Todo from './Todo';

const todosAtom = atomFromRedux('.todos');

const VisibleTodoList = () => {
  const [, setAllTodos] = useRecoilState(todosAtom);
  const [todos] = useRecoilState(getVisibleTodos);

  const toggleTodo = (id) => {
    setAllTodos((allTodos) =>
      allTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
