import * as Sentry from '@sentry/react';
import { formattedThunkError } from '~/utils/formatThunkErrorPayload';

export default function errorLogging (error: formattedThunkError) {
  Sentry.captureException(error);
  console.error(error);
}
