import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components-recoil-readwrite/AddTodo';
import FilterLink from './components-recoil-readwrite/FilterLink';
import VisibleTodoList from './components-recoil-readwrite/VisibleTodoList';

const RecoilReadWriteApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />

    <div>
      <span>Show: </span>
      <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
      <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
    </div>
  </div>
);

export default RecoilReadWriteApp;
