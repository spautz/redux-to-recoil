import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, getReduxStateAtom, pendingChangesRef, reduxStoreRef } from './internals';
import { defaultOptions, options, ReduxToRecoilOptions } from './options';

const selectEntireState = (state: ReduxState) => state;

const useSyncReduxToRecoil = (optionOverrides: Partial<ReduxToRecoilOptions> = {}): void => {
  const { readEnabled } = { ...options, ...optionOverrides };

  if (process.env.NODE_ENV !== 'production') {
    Object.keys(optionOverrides).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
        console.warn(`SyncReduxToRecoil: Unrecognized option "${key}"`);
      }
    });
  }

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

  const currentReduxState = useSelector(selectEntireState);
  useEffect(() => {
    if (readEnabled && currentReduxState !== lastReduxState && !pendingChangesRef.c) {
      setReduxState(currentReduxState);
    }
  }, [readEnabled, pendingChangesRef.c, currentReduxState, lastReduxState, setReduxState]);
};

export { useSyncReduxToRecoil };
