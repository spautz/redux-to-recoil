import { selector } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

import { VisibilityFilters } from '../actions';

const allTodosAtom = atomFromRedux('.todos');
const visibilityFilterAtom = atomFromRedux('.visibilityFilter');

const getVisibleTodos = selector({
  key: 'getVisibleTodos',
  get: ({ get }) => {
    const allTodos = get(allTodosAtom);
    const visibilityFilter = get(visibilityFilterAtom);

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
});

export default getVisibleTodos;
