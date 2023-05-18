import { internal_resetAtomFromRedux } from '../atomFromRedux.js';
import { reduxStoreRef } from './reduxStoreRef.js';

const resetStateBetweenTests = (): void => {
  internal_resetAtomFromRedux();
  reduxStoreRef.c = null;
};

export { resetStateBetweenTests };
