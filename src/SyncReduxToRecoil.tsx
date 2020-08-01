import React, { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, reduxStateAtom, reduxStoreRef } from './internals';

const selectEntireState = (state: ReduxState) => state;

export interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

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
  if (enabled && currentReduxState !== lastReduxState) {
    setReduxState(currentReduxState);
  }

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended, as they will rerender on every Redux change',
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};

SyncReduxToRecoil.defaultProps = {
  enabled: true,
};

export default SyncReduxToRecoil;
