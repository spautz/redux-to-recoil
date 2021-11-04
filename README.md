# Redux-to-Recoil

Read and write your [Redux](https://redux.js.org/) store through [Recoil](https://recoiljs.org/).

[![npm version](https://img.shields.io/npm/v/redux-to-recoil.svg)](https://www.npmjs.com/package/redux-to-recoil)
[![build status](https://github.com/spautz/redux-to-recoil/workflows/CI/badge.svg)](https://github.com/spautz/redux-to-recoil/actions)
[![test coverage](https://img.shields.io/coveralls/github/spautz/redux-to-recoil/main.svg)](https://coveralls.io/github/spautz/redux-to-recoil?branch=main)
[![dependencies status](https://img.shields.io/librariesio/release/npm/redux-to-recoil.svg)](https://libraries.io/github/spautz/redux-to-recoil)
[![gzip size](https://img.badgesize.io/https://unpkg.com/redux-to-recoil/dist/index.umd.js?compression=gzip)](https://bundlephobia.com/result?p=redux-to-recoil)

## Usage

`atomFromRedux` creates a Recoil wrapper around a location in Redux. This works like any other atom.

```typescript jsx
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

const todosAtom = atomFromRedux('.todos'); // wraps state.todos

// Inside your component, use the atoms and selectors as normal. That's it.
const [todos, setTodos] = useRecoilState(todosAtom);

// Also: it's a normal Recoil atom, so it works in Recoil selectors
const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todosAtom).length,
});
const todoCount = useRecoilValue(todoCountSelector);
```

`selectorFromReselect` creates a Recoil selector from a plain selector, using Reselect or any other selector library.

```typescript jsx
import { selectorFromReselect, useRecoilValue } from 'recoil';

const todosSelector = selectorFromReselect((state) => state.todos);

// Inside your component, use the selector as normal. That's it.
const [todos, setTodos] = useRecoilState(todosAtom);

// Also: it's a normal Recoil selector, so it works in other Recoil selectors
const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todosSelector).length,
});
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

If you want to dispatch changes from Recoil back to Redux then wrap your reducer with `syncChangesFromRecoil`
and enable the `writeEnabled` option. This is only needed if you `set` Recoil values directly.

```typescript jsx
import { syncChangesFromRecoil } from 'redux-to-recoil';

// This will enable write-from-recoil (when options.writeEnabled is turned on)
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
([Dynamic-Selectors](https://github.com/spautz/dynamic-selectors#readme) can also do that.)

It can also facilitate a migration from Redux to Recoil.

## Options

[Options are available](https://github.com/spautz/redux-to-recoil/blob/main/src/options.ts#L1-L26) to control how and
whether Recoil receives updates from, and writes updates to, Redux.

## Demo

A Todo List demo shows both a read-only sync from redux and a read-write sync.

- [Live demo](https://spautz.github.io/redux-to-recoil/)
- [View source and readme](https://github.com/spautz/redux-to-recoil/tree/main/demos/todo-list)

## Recoil version compatibility

|   Recoil | Redux-to-Recoil |
| -------: | --------------: |
|  `0.5.0` |         `0.8.x` |
|  `0.4.1` | `0.7.0`-`0.8.0` |
|  `0.4.0` | `0.6.0`-`0.7.1` |
|  `0.3.1` | `0.5.1`-`0.6.0` |
|  `0.2.0` | `0.4.1`-`0.5.1` |
|  `0.1.3` |         `0.4.1` |
|  `0.1.2` |         `0.4.1` |
| `0.0.13` |         `0.3.1` |
| `0.0.10` |         `0.2.2` |

Other versions of Recoil and Redux-to-Recoil may be compatible: this table just lists the thoroughly tested pairings.
