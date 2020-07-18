import React from 'react';

import { VisibilityFilters } from './constants';
import AddTodo from './redux/components/AddTodo';
import FilterLink from './redux/components/FilterLink';
import VisibleTodoList from './redux/components/VisibleTodoList';

const ReduxApp = () => (
  <fieldset>
    <legend>100% Redux</legend>
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

export default ReduxApp;
