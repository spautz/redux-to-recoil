import React, { Fragment, useEffect } from 'react';

import { ReduxToRecoilOptions, options } from './options';
import { getReduxStateAtom, pendingChangesRef, ReduxState, reduxStoreRef } from './internals';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

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

  const reduxStateAtom = getReduxStateAtom();
  const [lastReduxState, setReduxState] = useRecoilState(reduxStateAtom);

  const currentReduxState: ReduxState = useSelector((state) => state);
  const { readEnabled } = options;
  useEffect(() => {
    if (readEnabled && currentReduxState !== lastReduxState && !pendingChangesRef.c) {
      setReduxState(currentReduxState);
    }
  }, [readEnabled, pendingChangesRef.c, currentReduxState, lastReduxState, setReduxState]);
  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended because they will rerender on *every* Redux change',
    );
  }

  return <Fragment>{children}</Fragment>;
};

export { SyncReduxToRecoil };
