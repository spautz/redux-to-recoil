import { Reducer } from 'redux';

import { SYNC_CHANGES_FROM_RECOIL, applyChangesToObject } from './internals';

/**
 * Redux Reducer which processes `SYNC_CHANGES_FROM_RECOIL` actions.
 * This lets you write changes from Recoil back to Redux (when the `writeEnabled` option is turned on)
 */
const syncChangesFromRecoil = (rootReducer: Reducer): Reducer => {
  return (state, action) => {
    if (action.type === SYNC_CHANGES_FROM_RECOIL) {
      return applyChangesToObject(state, action.payload);
    } else {
      return rootReducer(state, action);
    }
  };
};

export { syncChangesFromRecoil };
