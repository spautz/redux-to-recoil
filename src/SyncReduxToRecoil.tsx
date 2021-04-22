import React, { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { pendingChangesRef, ReduxState, getReduxStateAtom, reduxStoreRef } from './internals';
import { options, ReduxToRecoilOptions } from './options';

const selectEntireState = (state: ReduxState) => state;

export type SyncReduxToRecoilProps = Partial<ReduxToRecoilOptions>;

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, ...optionProps } = props;

  // If any values are passed via props, sync them as options
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(optionProps).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(options, key)) {
        console.warn(`SyncReduxToRecoil: Unrecognized option "${key}"`);
      }
    });
  }
  Object.assign(options, optionProps);

  // We need to set this synchronously so that components can read on mount
  reduxStoreRef.c = useStore();
  useEffect(() => {
    return () => {
      // Clear ref on unmount
      reduxStoreRef.c = null;
    };
  }, []);

  const [lastReduxState, setReduxState] = useRecoilState(getReduxStateAtom());

  const currentReduxState = useSelector(selectEntireState);
  useEffect(() => {
    if (options.readEnabled && currentReduxState !== lastReduxState && !pendingChangesRef.c) {
      setReduxState(currentReduxState);
    }
  }, [options.readEnabled, pendingChangesRef.c, currentReduxState, lastReduxState, setReduxState]);

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended, as they will rerender on every Redux change',
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default SyncReduxToRecoil;
