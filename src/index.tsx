import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as Sentry from '@sentry/react';

import './i18n';
import App from './App';
import store from './store/configureStore';

import initGoogleAds from '~/utils/initGoogleAds';
import initSentry from '~/utils/initSentry';

const history = createBrowserHistory();
if (process.env.NODE_ENV === 'production') {
  initSentry(history);
  initGoogleAds();
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Sentry.ErrorBoundary>
        <App />
      </Sentry.ErrorBoundary>
    </Router>
  </Provider>,
  document.querySelector('#app')
);
