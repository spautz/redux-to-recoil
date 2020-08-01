import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import SyncReduxToRecoil from '../../src/SyncReduxToRecoil';

const createTestWrapper = (testStore: Store): React.FC => ({ children }) => (
  <Provider store={testStore}>
    <SyncReduxToRecoil />
    {children}
  </Provider>
);

export default createTestWrapper;
