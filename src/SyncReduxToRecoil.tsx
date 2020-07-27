import React from 'react';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

import internalStateAtom from './internalStateAtom';
import { ReduxState } from './types';

const selectEntireState = (state: ReduxState) => state;

interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

  // @TODO: Go through middleware to write updates
  const [lastReduxState, setReduxState] = useRecoilState(internalStateAtom);

  const currentReduxState = useSelector(selectEntireState);
  if (enabled && currentReduxState !== lastReduxState) {
    setReduxState(currentReduxState);
  }

  return <React.Fragment>{children}</React.Fragment>;
};

SyncReduxToRecoil.defaultProps = {
  enabled: true,
};

export default SyncReduxToRecoil;
