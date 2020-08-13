import React, { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, pendingChangesRef, reduxStateAtom, reduxStoreRef } from './internals';
import { ReduxToRecoilOptions, options } from './options';

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

  const [lastReduxState, setReduxState] = useRecoilState(reduxStateAtom);

  const currentReduxState = useSelector(selectEntireState);
  if (options.readEnabled && !pendingChangesRef.c && currentReduxState !== lastReduxState) {
    setReduxState(currentReduxState);
  }

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended, as they will rerender on every Redux change',
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default SyncReduxToRecoil;
