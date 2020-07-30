import React from 'react';
import { Store } from 'redux';
import { useSelector, useStore } from 'react-redux';
import { useRecoilState } from 'recoil';

import { ReduxState, internalStateAtom } from './internals';

const selectEntireState = (state: ReduxState) => state;
let store: Store | null = null;
const getStore = (): Store | null => store;

export interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

  store = useStore();
  const [lastReduxState, setReduxState] = useRecoilState(internalStateAtom);

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
export { getStore };
