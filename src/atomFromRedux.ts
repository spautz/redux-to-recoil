import { get as getPath } from 'immutable-path';
import { RecoilState, selectorFamily } from 'recoil';

import { DefaultReturnType, internalStateAtom } from './internals';
import {
  applyChangesToState,
  ChangeEntry,
  syncChangesFromRecoilAction,
} from './syncChangesFromRecoil';
import { getStore } from './SyncReduxToRecoil';

const atomSelectorCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;

const atomSelectorFamily = selectorFamily({
  key: 'redux-to-recoil:atom',
  get: (realPath: string) => ({ get }) => {
    const reduxState = get(internalStateAtom);
    if (realPath) {
      return getPath(reduxState, realPath);
    }
    return reduxState;
  },
  set: (realPath: string) => ({ get, set }, newValue: unknown) => {
    console.log('TODO: Bidirectional support', realPath, { get, set }, newValue);
    const reduxState = get(internalStateAtom);
    const changes: ChangeEntry = [realPath, newValue];
    const newState = applyChangesToState(reduxState, changes);
    console.log('newState = ', newState);
    set(internalStateAtom, newState);
    const reduxStore = getStore();
    if (reduxStore) {
      console.log('dispatch!', syncChangesFromRecoilAction(changes));
      reduxStore.dispatch(syncChangesFromRecoilAction(changes));
    } else {
      console.error('Cannot dispatch to Redux store because it is not synced');
    }
  },
});

// This works similarly to Recoil's atomFamily/selectorFamily, except we de-dupe things by path, and don't keep
// old selectors around for forever.
const atomFromRedux = <ReturnType = DefaultReturnType>(path: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to read
  const realPath = path.charAt(0) === '.' ? path.substr(1) : path;

  if (!hasOwnProperty.call(atomSelectorCache, realPath)) {
    // Although named "atomFromRedux", each instance is actually just a selector. They all pull from a single atom.
    const selectorForPath = atomSelectorFamily(realPath);

    atomSelectorCache[realPath] = selectorForPath;
  }

  return atomSelectorCache[realPath];
};

export default atomFromRedux;
