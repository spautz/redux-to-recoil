import React from 'react';

import { VisibilityFilters } from './constants';
import AddTodo from './recoil/components/AddTodo';
import FilterLink from './recoil/components/FilterLink';
import VisibleTodoList from './recoil/components/VisibleTodoList';

const RecoilApp = () => (
  <fieldset>
    <legend>100% Recoil</legend>
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

export default RecoilApp;
