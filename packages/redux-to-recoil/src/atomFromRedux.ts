import { get as getPath } from 'immutable-path';
import { RecoilState, selectorFamily } from 'recoil';

import {
  ChangeEntry,
  DefaultReturnType,
  ReduxState,
  applyChangesToObject,
  pendingChangesRef,
  getReduxStateAtom,
  reduxStoreRef,
  syncChangesFromRecoilAction,
} from './internals/index.js';
import { options } from './options.js';

let atomSelectorFamily: (param: string) => RecoilState<ReduxState>;
let lastKey: string;

const getAtomSelectorFamily = () => {
  if (!atomSelectorFamily || options._recoilSelectorAtomKey !== lastKey) {
    if (process.env.NODE_ENV !== 'production' && options._recoilSelectorExtraOptions.get) {
      console.warn(
        'options._recoilSelectorExtraOptions.get is not supported: core atomFromRedux functionality cannot be replaced',
      );
    }
    if (process.env.NODE_ENV !== 'production' && options._recoilSelectorExtraOptions.set) {
      console.warn(
        'options._recoilSelectorExtraOptions.set is not supported: core atomFromRedux functionality cannot be replaced',
      );
    }

    atomSelectorFamily = selectorFamily({
      key: 'redux-to-recoil:atom',
      ...options._recoilSelectorExtraOptions,
      get:
        (realPath: string) =>
        ({ get }) => {
          const reduxStore = reduxStoreRef.c;
          if (!reduxStore) {
            throw new Error('Cannot read from Redux because <SyncReduxToRecoil> is not mounted');
          }

          // At initial render the reduxStateAtom will not be populated yet, so fall back to the actual store
          const reduxState: ReduxState =
            get(getReduxStateAtom()) || (reduxStore && reduxStore.getState());

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
      set:
        (realPath: string) =>
        ({ get, set }, newValue: unknown) => {
          const reduxStore = reduxStoreRef.c;
          if (!options.writeEnabled) {
            console.error('Cannot dispatch to Redux because writes are disabled');
            return;
          }
          if (!reduxStore) {
            throw new Error('Cannot dispatch to Redux because <SyncReduxToRecoil> is not mounted');
          }

          const reduxState = get(getReduxStateAtom());

          // Recoil always updates synchronously
          const thisChange: ChangeEntry = [realPath, newValue];
          const thisChangeSet = [thisChange];
          const newState = applyChangesToObject(reduxState, thisChangeSet);
          set(getReduxStateAtom(), newState);

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
    lastKey = options._recoilSelectorAtomKey;
  }
  return atomSelectorFamily;
};

/**
 * Creates a Recoil atom that's mapped from a specific path in Redux. This works like any other atom.
 */
const atomFromRedux = <ReturnType = DefaultReturnType>(path: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to read
  const realPath = path.charAt(0) === '.' ? path.substr(1) : path;

  return getAtomSelectorFamily()(realPath);
};

const internal_resetAtomFromRedux = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  atomSelectorFamily = null;
};

export { atomFromRedux, internal_resetAtomFromRedux };
