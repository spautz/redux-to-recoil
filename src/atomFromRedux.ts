import { get as getPath } from 'immutable-path';
import { RecoilState, selectorFamily } from 'recoil';

import {
  ChangeEntry,
  DefaultReturnType,
  ReduxState,
  applyChangesToObject,
  pendingChangesRef,
  reduxStateAtom,
  reduxStoreRef,
  syncChangesFromRecoilAction,
} from './internals';
import { options } from './options';

const atomSelectorCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;

const atomSelectorFamily = selectorFamily({
  key: 'redux-to-recoil:atom',
  get: (realPath: string) => ({ get }) => {
    const reduxStore = reduxStoreRef.c;
    if (!reduxStore) {
      throw new Error('Cannot read from Redux because <SyncReduxToRecoil> is not mounted');
    }

    // At initial render the reduxStateAtom will not be populated yet, so fall back to the actual store
    const reduxState: ReduxState = get(reduxStateAtom) || (reduxStore && reduxStore.getState());

    if (reduxState == null) {
      // We've *never* synced: just return undefined for all keys
      if (process.env.NODE_ENV !== 'production' && !options.readEnabled) {
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

    // Recoil always updates synchronously
    const thisChange: ChangeEntry = [realPath, newValue];
    const thisChangeSet = [thisChange];
    const newState = applyChangesToObject(reduxState, thisChangeSet);
    set(reduxStateAtom, newState);

    if (options.batchWrites) {
      // Queue up changes and dispatch once we're done
      if (pendingChangesRef.c) {
        pendingChangesRef.c.push(thisChange);
      } else {
        // It's the first change: queue everything up
        pendingChangesRef.c = thisChangeSet;
        setTimeout(() => {
          if (pendingChangesRef.c) {
            reduxStore.dispatch(syncChangesFromRecoilAction(pendingChangesRef.c));
          } else if (process.env.NODE_ENV !== 'production') {
            console.warn(
              'Could not dispatch changes from Recoil to Redux: no changes pending. This should not happen.',
            );
          }
          pendingChangesRef.c = null;
        });
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
