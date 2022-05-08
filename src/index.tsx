import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import './i18n';
import App from './App';
import store from './store/configureStore';

const history = createBrowserHistory();
if (process.env.NODE_ENV === 'production') {
  const dist = process.env.BUILD_ID || '';

  Sentry.init({
    dsn: 'https://ce35249271eb438b941026c6779e2381@o1215286.ingest.sentry.io/6356317',
    normalizeDepth: 7,
    dist,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
      })
    ],
    environment: process.env.NODE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
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
