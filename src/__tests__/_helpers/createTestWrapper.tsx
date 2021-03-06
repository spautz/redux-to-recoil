import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { SyncReduxToRecoil } from '../../SyncReduxToRecoil';

const createTestWrapper =
  (testStore: Store): React.FC =>
  (props) => {
    const { children, ...anyOtherProps } = props;

    return (
      <Provider store={testStore}>
        <SyncReduxToRecoil {...anyOtherProps} />
        {children}
      </Provider>
    );
  };

export { createTestWrapper };
