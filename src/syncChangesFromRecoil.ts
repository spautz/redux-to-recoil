import { Reducer } from 'redux';

import { SYNC_CHANGES_FROM_RECOIL, applyChangesToObject } from './internals';

const syncChangesFromRecoil = (rootReducer: Reducer): Reducer => {
  return (state, action) => {
    if (action.type === SYNC_CHANGES_FROM_RECOIL) {
      return applyChangesToObject(state, action.payload);
    } else {
      return rootReducer(state, action);
    }
  };
};

export default syncChangesFromRecoil;
