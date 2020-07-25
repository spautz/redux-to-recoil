import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';

import rootReducer from './reducers';
import ReduxApp from './ReduxApp';
import RecoilApp from './RecoilApp';
import BidirectionalRecoilApp from './BidirectionalRecoilApp';

const store = createStore(rootReducer);

render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <ReduxApp />
        <RecoilApp />
        <BidirectionalRecoilApp />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
