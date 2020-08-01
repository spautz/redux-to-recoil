import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, reduxStateAtom, reduxStoreRef } from './internals';

const selectEntireState = (state: ReduxState) => state;

export interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

  reduxStoreRef.c = useStore();
  const [lastReduxState, setReduxState] = useRecoilState(reduxStateAtom);

  const currentReduxState = useSelector(selectEntireState);
  if (enabled && currentReduxState !== lastReduxState) {
    setReduxState(currentReduxState);
  }

  if (__DEV__ && children) {
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
