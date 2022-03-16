import { useEffect } from 'react';

import i18n from '~/i18n';
import { Languages, setLanguage } from '~/store/config/config.slice';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

export default function useTranslations () {
  const appDispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.config.language);

  useEffect(() => {
    if (lang !== i18n.language) {
      appDispatch(setLanguage(i18n.language as Languages));
    }
  }, []);

  const setLang = (language: Languages) => {
    appDispatch(setLanguage(language));
    i18n.changeLanguage(language);
  };
  return {
    lang,
    setLang
  };
}
