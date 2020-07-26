# Redux-to-Recoil

Access your Redux store through Recoil atoms and selectors.

**This package is in active development. Things will change rapidly, and it is not yet production-ready. Feedback is welcome.**

[![npm version](https://img.shields.io/npm/v/redux-to-recoil.svg)](https://www.npmjs.com/package/redux-to-recoil)
[![build status](https://img.shields.io/travis/com/spautz/redux-to-recoil.svg)](https://travis-ci.com/spautz/redux-to-recoil)
[![test coverage](https://img.shields.io/coveralls/github/spautz/redux-to-recoil.svg)](https://coveralls.io/github/spautz/redux-to-recoil)
[![gzip size](https://img.shields.io/bundlephobia/minzip/redux-to-recoil)](https://bundlephobia.com/result?p=redux-to-recoil)

## Example

Use `atomFromRedux` to create a Recoil wrapper around a location in Redux. This works exactly like any other atom or
selector.

```typescript jsx
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

const todosAtom = atomFromRedux('.todos'); // wraps state.todos

const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => get(todosAtom).length,
});

// Inside your component, use the atoms and selectors as normal
const [todos, setTodos] = useRecoilState(todosAtom);
const todoCount = useRecoilValue(todoCountSelector);
```

A redux-to-recoil provider syncs state between the two stores.

```typescript jsx
import { SyncReduxToRecoil } from 'redux-to-recoil';

<Provider store={store}>
  <RecoilRoot>
    <SyncReduxToRecoil enabled={true} />
    <MyApp />
  </RecoilRoot>
</Provider>;
```

## Do I need this?

You probably don't need this. Redux and Recoil work fine side-by-side. You can already use values from Redux and Recoil
together in a component.

This library is useful for accessing Redux state from _within_ a Recoil selector -- which lets you call selectors
conditionally, or within loops. `useSelector` can't do that.

It can also facilitate a migration from Redux to Recoil.

## Performance notes

Until [Recoil issue #314](https://github.com/facebookexperimental/Recoil/issues/314) is worked, each component that
uses a Redux-linked atom or selector will rerender when Redux updates.

## Roadmap

- [ ] Core functionality: SyncReduxToRecoil
- [ ] Core functionality: atomFromRedux
- [ ] Core functionality: selectorFromReselect
- [ ] Tests
- [ ] Demo
- [ ] Initial release
