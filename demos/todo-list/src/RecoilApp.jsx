import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components.recoil/AddTodo';
import FilterLink from './components.recoil/FilterLink';
import VisibleTodoList from './components.recoil/VisibleTodoList';

const ReduxApp = () => (
  <fieldset>
    <legend>
      <legend>Redux-to-Recoil</legend>
    </legend>
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