import { set as setPath } from 'immutable-path';
import { Reducer } from 'redux';

import { ReduxState } from './internals/types';

const SYNC_CHANGES_FROM_RECOIL = 'SYNC_CHANGES_FROM_RECOIL';

export type ChangeEntry = [string, ReduxState];

export interface SyncFromRecoilAction {
  type: typeof SYNC_CHANGES_FROM_RECOIL;
  payload: Array<ChangeEntry>;
}

const syncChangesFromRecoilAction = (changes: Array<ChangeEntry>): SyncFromRecoilAction => ({
  type: SYNC_CHANGES_FROM_RECOIL,
  payload: changes,
});

const applyChangesToState = (state: ReduxState, changes: Array<ChangeEntry>): ReduxState => {
  console.log('applyChangesToState()', state, changes);

  let newState = state;
  for (let i = 0; i < changes.length; i++) {
    const [path, value] = changes[i];
    newState = setPath(newState, path, value);
  }

  return newState;
};

const syncChangesFromRecoil = (rootReducer: Reducer): Reducer => {
  console.log('syncChangesFromRecoil reducer is registered!');

  return (state, action) => {
    console.log('syncChangesFromRecoil reducer is running!', action, state);

    if (action.type === SYNC_CHANGES_FROM_RECOIL) {
      return applyChangesToState(state, action.payload);
    } else {
      return rootReducer(state, action);
    }
  };
};

export default syncChangesFromRecoil;
export { applyChangesToState, syncChangesFromRecoilAction };
