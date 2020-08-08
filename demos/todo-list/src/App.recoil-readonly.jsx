import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components-recoil-readonly/AddTodo';
import FilterLink from './components-recoil-readonly/FilterLink';
import VisibleTodoList from './components-recoil-readonly/VisibleTodoList';

const RecoilReadOnlyApp = () => (
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

export default RecoilReadOnlyApp;
