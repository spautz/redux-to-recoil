import React from 'react';

import { VisibilityFilters } from './actions';
import AddTodo from './components/AddTodo';
import FilterLink from './components/FilterLink';
import VisibleTodoList from './components/VisibleTodoList';

const App = () => (
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

export default App;
