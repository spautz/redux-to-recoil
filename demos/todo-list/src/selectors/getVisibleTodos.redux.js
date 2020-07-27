import { createSelector } from 'reselect';

import { VisibilityFilters } from '../actions';

const allTodosSelector = (state) => state.todos;
const visibilityFilterSelector = (state) => state.visibilityFilter;

const getVisibleTodos = createSelector(
  [allTodosSelector, visibilityFilterSelector],
  (allTodos, visibilityFilter) => {
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return allTodos;
      case VisibilityFilters.SHOW_COMPLETED:
        return allTodos.filter((t) => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return allTodos.filter((t) => !t.completed);
      default:
        throw new Error('Unknown filter: ' + visibilityFilter);
    }
  },
);

export default getVisibleTodos;
