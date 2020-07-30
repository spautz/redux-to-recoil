import { ReduxState } from '../src/internals';
import { AnyAction, Store, createStore } from 'redux';
import React from 'react';
import syncChangesFromRecoil from '../src/syncChangesFromRecoil';
import { Provider } from 'react-redux';
import SyncReduxToRecoil from '../src/SyncReduxToRecoil';

const VALUE1_DEFAULT = 100;
const VALUE2_DEFAULT = 200;

const INCREMENT_KEY = 'INCREMENT_KEY';
const incrementKeyAction = (key: string): AnyAction => ({
  type: INCREMENT_KEY,
  payload: { key },
});

const testReducer = (state: ReduxState, action: AnyAction): ReduxState => {
  if (action.type === 'INCREMENT_KEY') {
    const { key } = action.payload;

    return {
      ...state,
      [key]: (state[key] || 0) + 1,
    };
  }
  return state;
};

const createTestStore = (): Store =>
  createStore(syncChangesFromRecoil(testReducer), {
    value1: VALUE1_DEFAULT,
    value2: VALUE2_DEFAULT,
  });

const createTestWrapper = (testStore: Store): React.FC => ({ children }) => (
  <Provider store={testStore}>
    <SyncReduxToRecoil />
    {children}
  </Provider>
);

export {
  VALUE1_DEFAULT,
  VALUE2_DEFAULT,
  incrementKeyAction,
  testReducer,
  createTestStore,
  createTestWrapper,
};
