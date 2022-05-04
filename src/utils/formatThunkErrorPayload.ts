import { ResponseError } from '~/core/api/apiClient';
import { SerializedError } from '@reduxjs/toolkit';

export type formattedThunkError = {
  code: number,
  message: string,
  stackTrace: string,
  thunkError?: SerializedError
}

export default function formatThunkErrorPayload (error: ResponseError, thunkError?: SerializedError): formattedThunkError {
  return {
    code: error.code,
    message: error.message,
    stackTrace: error.stack,
    thunkError
  };
}
