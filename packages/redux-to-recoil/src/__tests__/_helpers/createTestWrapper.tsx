import React, { ReactNode } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { SyncReduxToRecoil, SyncReduxToRecoilProps } from '../../SyncReduxToRecoil';

const createTestWrapper =
  (testStore: Store): React.FC<SyncReduxToRecoilProps & { children?: ReactNode }> =>
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
