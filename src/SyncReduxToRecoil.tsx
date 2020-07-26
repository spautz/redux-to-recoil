import React from 'react';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

import { reduxStateAtom } from './internals';

const selectEntireState = (state: any) => state;

interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

  const [lastReduxState, setReduxState] = useRecoilState(reduxStateAtom);

  const currentReduxState = useSelector(selectEntireState);
  if (enabled && currentReduxState !== lastReduxState) {
    console.log('new currentReduxState!', currentReduxState);
    setReduxState(currentReduxState);
  }

  return <React.Fragment>{children}</React.Fragment>;
};

SyncReduxToRecoil.defaultProps = {
  enabled: true,
};

export default SyncReduxToRecoil;
