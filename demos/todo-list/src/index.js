import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import { SyncReduxToRecoil } from 'redux-to-recoil';

import rootReducer from './reducers';
import ReduxApp from './App.redux';
import RecoilReadOnlyApp from './App.recoil-readonly';
import RecoilReadWriteApp from './App.recoil-readwrite';

const store = createStore(rootReducer);

render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <SyncReduxToRecoil>
          <ReduxApp />
          <RecoilReadOnlyApp />
          <RecoilReadWriteApp />
        </SyncReduxToRecoil>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
