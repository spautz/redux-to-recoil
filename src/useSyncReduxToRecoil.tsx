import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, getReduxStateAtom, pendingChangesRef, reduxStoreRef } from './internals';
import { options } from './options';

const selectEntireState = (state: ReduxState) => state;

/**
 * Internal functionality of the `SyncReduxToRecoil` component.
 */
const useSyncReduxToRecoil = (): void => {
  const { readEnabled } = options;

  // We need to set this synchronously so that components can read on mount
  reduxStoreRef.c = useStore();
  useEffect(() => {
    return () => {
      // Clear ref on unmount
      reduxStoreRef.c = null;
    };
  }, []);

  const reduxStateAtom = getReduxStateAtom();
  const [lastReduxState, setReduxState] = useRecoilState(reduxStateAtom);

  const currentReduxState: ReduxState = useSelector(selectEntireState);
  useEffect(() => {
    if (readEnabled && currentReduxState !== lastReduxState && !pendingChangesRef.c) {
      setReduxState(currentReduxState);
    }
  }, [readEnabled, pendingChangesRef.c, currentReduxState, lastReduxState, setReduxState]);
};

export { useSyncReduxToRecoil };
