# Redux-to-Recoil

Create Recoil atoms and selectors from your existing actions, reducers, and selectors

**This package is in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

[![npm version](https://img.shields.io/npm/v/redux-to-recoil.svg)](https://www.npmjs.com/package/redux-to-recoil)
[![build status](https://img.shields.io/travis/com/spautz/redux-to-recoil.svg)](https://travis-ci.com/spautz/redux-to-recoil)
[![test coverage](https://img.shields.io/coveralls/github/spautz/redux-to-recoil.svg)](https://coveralls.io/github/spautz/redux-to-recoil)
[![gzip size](https://img.shields.io/bundlephobia/minzip/redux-to-recoil)](https://bundlephobia.com/result?p=redux-to-recoil)

## Motivation

Migrating from [Redux](https://redux.js.org/) to [Recoil](https://recoiljs.org/) can be a lot of work.

This library contains utilities which take in your existing Redux-oriented functions and return Recoil state.
The goal is to try things out with Recoil without having to migrate your entire codebase first.

## How it works

There are two different sets of helpers:

`atomFromReduxState` lets you access your existing Redux state through Recoil. Data is still stored in Redux.

`createAtomFactory`, `dispatchToRecoil`, and `wrapSelector` let you use your existing Redux-oriented code to manufacture Recoil atoms and
selectors. All data is stored in Recoil.

## Examples

```typescript jsx
import { selector, useRecoilState } from 'recoil';
import { atomFromReduxState } from 'redux-to-recoil';
import { myActionCreator, myReducer, mySelector } from 'my-existing-code';

// `atomFromReduxState` replaces Recoil's `atom()` constructor
const todoListAtom = atomFromReduxState('.todos'); // wraps state.todos

const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todoList).length,
});

// Inside your component, use the atoms and selectors as normal
const [todoList, setTodoList] = useRecoilState(todoListAtom);
const todoCount = useRecoilState(todoCountSelector);

// All Redux middleware and tools still work
```

```typescript jsx
import { useRecoilState } from 'recoil';
import { createAtomFactory, useRecoilDispatch, useRecoilSelector } from 'redux-to-recoil';
import { addTodo, editTodo, todosReducer, todosSelector } from 'my-existing-code';

const createTodoAtom = createAtomFactory({
  namespace: 'todos',
  reducer: todosReducer,
});

const todoAtom = createTodoAtom('.'); // represents state.todos
const todoCountAtom = createTodoAtom('.length'); // represents state.todos.length

// Inside your component, use the atoms and selectors as normal
const [todos, setTodos] = useRecoilState(todoAtom);
const todoCount = useRecoilState(todoCountAtom);

// `useDispatch` becomes `useRecoilDispatch`, `useSelector` becomes `useRecoilSelector`
const todoCount = useRecoilSelector(todosSelector);
<button onClick={() => dispatchToRecoil(addTodo())}>
```

## Roadmap

- [ ] Core functionality: atomFromReduxState
- [ ] Core functionality: createAtomFactory
- [ ] Core functionality: useRecoilDispatch
- [ ] Core functionality: useRecoilSelector
- [ ] Tests
- [ ] Demo
- [ ] Initial release
