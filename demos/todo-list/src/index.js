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
        <SyncReduxToRecoil batchWrites />
        <h1>Redux-to-Recoil: Todo List Demo</h1>
        <a
          href="https://github.com/spautz/redux-to-recoil/tree/master/demos/todo-list"
          target="_blank"
        >
          View source and readme
        </a>

        <h2>Plain Redux</h2>
        <ReduxApp />

        <h2>Redux-to-Recoil: Read-only</h2>
        <RecoilReadOnlyApp />

        <h2>Redux-to-Recoil: Read-write</h2>
        <RecoilReadWriteApp />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
