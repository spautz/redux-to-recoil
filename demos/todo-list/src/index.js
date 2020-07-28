import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RecoilRoot } from 'recoil';
import { SyncReduxToRecoil, syncChangesFromRecoil } from 'redux-to-recoil';

import rootReducer from './reducers';
import ReduxApp from './App.redux';
import RecoilReadOnlyApp from './App.recoil-readonly';
import RecoilReadWriteApp from './App.recoil-readwrite';

const rootReducerWithRecoilSync = syncChangesFromRecoil(rootReducer);

const composeEnhancers = composeWithDevTools();
const store = createStore(rootReducerWithRecoilSync, composeEnhancers);

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
