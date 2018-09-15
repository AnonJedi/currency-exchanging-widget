import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from 'reducers';
import Page from 'components/Page';

const store = createStore(rootReducer, {});

const App = (
  <Provider store={store}>
    <Page />
  </Provider>
);

render(App, document.getElementById('root'));
