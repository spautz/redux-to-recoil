import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selector, useRecoilState } from 'recoil';

import { toggleTodo } from '../actions';
import Todo from './Todo';
import atomFromReduxState from '../atomFromReduxState';

const todosAtom = atomFromReduxState('.');
console.log('todosAtom = ', todosAtom);
const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todosAtom).todos.length,
});
console.log('todoCountSelector = ', todoCountSelector);

const VisibleTodoList = (props) => {
  const dispatch = useDispatch();

  const [count, setCount] = React.useState(0);
  setTimeout(() => setCount(count + 1), 2000);

  const todoCount = useRecoilState(todoCountSelector);
  console.log('todoCount: ', todoCount, todoCountSelector);
  const [root, setRoot] = useRecoilState(todosAtom);
  console.log('todosAtom: ', root, todosAtom);

  return (
    <ul>
      <li>count= {count}</li>
      {root.todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo.id))} />
      ))}
    </ul>
  );
};

export default VisibleTodoList;
