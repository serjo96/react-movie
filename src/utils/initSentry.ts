import { History } from 'history';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export default function initSentry (history: History) {
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
