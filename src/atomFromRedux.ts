import { get as getPath } from 'immutable-path';
import { RecoilState, selectorFamily } from 'recoil';

import {
  ChangeEntry,
  DefaultReturnType,
  ReduxState,
  applyChangesToObject,
  reduxStateAtom,
  reduxStoreRef,
  syncChangesFromRecoilAction,
} from './internals';
import { options } from './options';

const atomSelectorCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;
let batchWriteTimeoutId: number;
let batchedChangeSet: Array<ChangeEntry>;

const atomSelectorFamily = selectorFamily({
  key: 'redux-to-recoil:atom',
  get: (realPath: string) => ({ get }) => {
    const reduxStore = reduxStoreRef.c;
    if (!reduxStore) {
      throw new Error('Cannot read from Redux because <SyncReduxToRecoil> is not mounted');
    }

    const reduxState: ReduxState = get(reduxStateAtom);

    if (!options.readEnabled && reduxState == null) {
      // We've *never* synced: just return undefined for all keys
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Cannot access Redux state because reads have never been enabled');
      }
      return;
    }
    if (realPath) {
      return getPath(reduxState, realPath);
    }
    return reduxState;
  },
  set: (realPath: string) => ({ get, set }, newValue: unknown) => {
    const reduxStore = reduxStoreRef.c;
    if (!options.writeEnabled) {
      console.error('Cannot dispatch to Redux because writes are disabled');
      return;
    }
    if (!reduxStore) {
      throw new Error('Cannot dispatch to Redux because <SyncReduxToRecoil> is not mounted');
    }

    const reduxState = get(reduxStateAtom);
    const thisChange: ChangeEntry = [realPath, newValue];
    // @TODO: Batching support
    const thisChangeSet = [thisChange];
    const newState = applyChangesToObject(reduxState, thisChangeSet);

    set(reduxStateAtom, newState);
    if (options.batchWrites) {
      // Queue up changes and dispatch once we're done
      if (!batchWriteTimeoutId) {
        batchedChangeSet = [thisChange];
        batchWriteTimeoutId = setTimeout(() =>
          reduxStore.dispatch(syncChangesFromRecoilAction(batchedChangeSet)),
        );
      } else {
        batchedChangeSet.push(thisChange);
      }
    } else {
      // Unbatched: dispatch immediately
      reduxStore.dispatch(syncChangesFromRecoilAction(thisChangeSet));
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
    atomSelectorCache[realPath] = atomSelectorFamily(realPath);
  }

  return atomSelectorCache[realPath];
};

export default atomFromRedux;
