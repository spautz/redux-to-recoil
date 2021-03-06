import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components-redux/AddTodo';
import FilterLink from './components-redux/FilterLink';
import VisibleTodoList from './components-redux/VisibleTodoList';

const ReduxApp = () => (
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

export default ReduxApp;
