import * as Sentry from '@sentry/react';
import { toast } from 'react-toastify';
import i18n from '~/i18n';
import { formattedThunkError } from '~/utils/formatThunkErrorPayload';

export default function errorLogging (error: formattedThunkError) {
  Sentry.captureException(error);
  toast.error(i18n.t('errorText'));
  console.error(error);
}
