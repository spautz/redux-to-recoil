import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

import { getNextTodoId } from '../actions';

const todosAtom = atomFromRedux('.todos');

const AddTodo = () => {
  const [, setTodos] = useRecoilState(todosAtom);

  const addTodo = (text) => {
    setTodos((todos) => [
      ...todos,
      {
        id: getNextTodoId(),
        text,
        completed: false,
      },
    ]);
  };

  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedValue = inputValue.trim();
          if (trimmedValue) {
            addTodo(trimmedValue);
            setInputValue('');
          }
        }}
      >
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
