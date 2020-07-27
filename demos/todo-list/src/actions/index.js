let nextTodoId = 0;

// So that the redux and the recoil-readwrite apps don't hit ID collisions with each other, they both need to read and
// update nextTodoId
export const getNextTodoId = () => nextTodoId++;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: getNextTodoId(),
  text,
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};
