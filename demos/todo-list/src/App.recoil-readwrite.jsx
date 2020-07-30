import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components-recoil-readwrite/AddTodo';
import FilterLink from './components-recoil-readwrite/FilterLink';
import VisibleTodoList from './components-recoil-readwrite/VisibleTodoList';

const RecoilReadWriteApp = () => (
  <fieldset>
    <legend>Redux-to-Recoil: Read-Write</legend>
    <AddTodo />
    <VisibleTodoList />

    <div>
      <span>Show: </span>
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
    </div>
  </fieldset>
);

export default RecoilReadWriteApp;
