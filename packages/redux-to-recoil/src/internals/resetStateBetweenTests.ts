import { internal_resetAtomFromRedux } from '../atomFromRedux';
import { reduxStoreRef } from './reduxStoreRef';

const resetStateBetweenTests = (): void => {
  internal_resetAtomFromRedux();
  reduxStoreRef.c = null;
};

export { resetStateBetweenTests };
