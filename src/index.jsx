import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';
import Page from 'components/Page';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const App = (
  <Provider store={store}>
    <Page />
  </Provider>
);

render(App, document.getElementById('root'));
