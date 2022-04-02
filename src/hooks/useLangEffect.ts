import { EffectCallback, useEffect } from 'react';

import useTranslations from '~/hooks/useTranslations';

export const useLangEffect = <T>(func: EffectCallback, deps?: Array<string | boolean | number>) => {
  const { lang } = useTranslations();
  const deepsArr = deps ? [lang, ...deps] : undefined;

  useEffect(func, deepsArr);
};
