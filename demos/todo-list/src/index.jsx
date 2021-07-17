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
        <h2>
          <a href="https://github.com/spautz/redux-to-recoil">Redux-to-Recoil</a>: Todo List Demo
        </h2>
        <p>
          Use the{' '}
          <a
            href="https://github.com/zalmoxisus/redux-devtools-extension#installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Devtools extension
          </a>{' '}
          to watch the Redux state.
        </p>
        <p>
          <a
            href="https://github.com/spautz/redux-to-recoil/tree/main/demos/todo-list"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source and readme
          </a>
        </p>

        <h3>Plain Redux</h3>
        <ReduxApp />

        <h3>Redux-to-Recoil: Read-only</h3>
        <RecoilReadOnlyApp />

        <h3>Redux-to-Recoil: Read-write</h3>
        <RecoilReadWriteApp />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
