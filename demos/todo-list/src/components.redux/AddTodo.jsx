import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../actions';

const AddTodo = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmedValue = inputValue.trim();
          if (trimmedValue) {
            dispatch(addTodo(trimmedValue));
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
