import { useEffect } from 'react';

import i18n from '~/i18n';
import { Languages, setLanguage } from '~/store/config/config.slice';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

export default function useTranslations () {
  const appDispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.config.language) as Languages;

  useEffect(() => {
    if (lang !== i18n.language) {
      appDispatch(setLanguage(i18n.language as Languages === Languages.RU ? Languages.RU : Languages.EN));
    }
  }, []);

  const setLang = (language: Languages) => {
    const lang = language === Languages.RU ? Languages.RU : Languages.EN;
    appDispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };
  return {
    lang,
    setLang
  };
}
