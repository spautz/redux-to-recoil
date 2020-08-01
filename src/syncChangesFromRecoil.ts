import { Reducer } from 'redux';

import { SYNC_CHANGES_FROM_RECOIL, applyChangesToState } from './internals';

const syncChangesFromRecoil = (rootReducer: Reducer): Reducer => {
  return (state, action) => {
    if (action.type === SYNC_CHANGES_FROM_RECOIL) {
      return applyChangesToState(state, action.payload);
    } else {
      return rootReducer(state, action);
    }
  };
};

export default syncChangesFromRecoil;
