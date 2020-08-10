# Redux-to-Recoil

Access your Redux store through Recoil.

[![npm version](https://img.shields.io/npm/v/redux-to-recoil.svg)](https://www.npmjs.com/package/redux-to-recoil)
[![build status](https://img.shields.io/travis/com/spautz/redux-to-recoil.svg)](https://travis-ci.com/spautz/redux-to-recoil)
[![dependencies status](https://img.shields.io/david/spautz/redux-to-recoil.svg)](https://david-dm.org/spautz/redux-to-recoil)
[![gzip size](http://img.badgesize.io/https://unpkg.com/redux-to-recoil@latest/dist/index.umd.js?compression=gzip)](https://bundlephobia.com/result?p=redux-to-recoil)
[![test coverage](https://img.shields.io/coveralls/github/spautz/redux-to-recoil.svg)](https://coveralls.io/github/spautz/redux-to-recoil)

## Usage

`atomFromRedux` creates a Recoil wrapper around a location in Redux. This works like any other atom.

```typescript jsx
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

const todosAtom = atomFromRedux('.todos'); // wraps state.todos

// It's a normal atom, so it works in Recoil selectors
const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todosAtom).length,
});

// Inside your component, use the atoms and selectors as normal
const [todos, setTodos] = useRecoilState(todosAtom);
const todoCount = useRecoilValue(todoCountSelector);
```

`<SyncReduxToRecoil />` syncs state from Redux to Recoil. This is required.

```typescript jsx
import { SyncReduxToRecoil } from 'redux-to-recoil';

<Provider store={store}>
  <RecoilRoot>
    <SyncReduxToRecoil />
    <MyApp />
  </RecoilRoot>
</Provider>;
```

If you want to dispatch changes from Recoil back to Redux then wrap your reducer with `syncChangesFromRecoil`.
This is only needed if you `set` Recoil values directly.

```typescript jsx
import { syncChangesFromRecoil } from 'redux-to-recoil';

// This will enable write-from-recoil
const reducer = syncChangesFromRecoil(yourRootReducer);
const store = createStore(reducer);
```

```typescript
//  Recoil atoms and writeable selectors work like normal
const todosAtom = atomFromRedux('.todos');

const [todos, setTodos] = useRecoilState(todosAtom);

setTodos(newTodoList);
```

## Do I need this?

You probably don't need this. Redux and Recoil work fine side-by-side. You can already use values from Redux and Recoil
together in a component.

This library is useful for accessing Redux state from _within_ a Recoil selector -- which lets you call selectors
conditionally, or within loops. `useSelector` can't do that.

It can also facilitate a migration from Redux to Recoil.

## Options

[Options are available](https://github.com/spautz/redux-to-recoil/blob/master/src/options.ts#L1-L26) to control how and
whether Recoil receives updates from, and writes updates to, Redux.

## Demo

A Todo List demo shows both a read-only sync from redux and a read-write sync.

- [Live demo](https://spautz.github.io/redux-to-recoil/)
- [View source and readme](https://github.com/spautz/redux-to-recoil/tree/master/demos/todo-list)

## Performance notes

Until [Recoil issue #314](https://github.com/facebookexperimental/Recoil/issues/314) is worked, each component that
uses a Redux-linked atom or selector will rerender when Redux updates -- even if its own values haven't changed.

## Console error

Due to [Recoil issue #12](https://github.com/facebookexperimental/Recoil/issues/12), you will see a console error in
React 16.13 and above. This does not hurt anything, but it is annoying.

> `Warning: Cannot update a component (Batcher) while rendering a different component`
