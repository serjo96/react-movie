import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { Languages } from '~/store/config/config.slice';

import LISTS_EN from '../public/locales/en/lists/list.json';
import KEYWORDS_EN from '../public/locales/en/keywords/keywords.json';
import KEYWORDS_RU from '../public/locales/ru/keywords/keywords.json';
import LISTS_RU from '../public/locales/ru/lists/list.json';
import COMPANY_EN from '../public/locales/en/company/company.json';
import COMPANY_RU from '../public/locales/ru/company/company.json';
import COMMON_EN from '../public/locales/en/common/common.json';
import COMMON_RU from '../public/locales/ru/common/common.json';
import oldClient from '~/core/api/OldClient';

export const defaultNS = 'common';
export const resources = {
  en: {
    company: COMPANY_EN,
    keywords: KEYWORDS_EN,
    common: COMMON_EN,
    lists: LISTS_EN
  },
  ru: {
    company: COMPANY_RU,
    keywords: KEYWORDS_RU,
    common: COMMON_RU,
    lists: LISTS_RU
  }
} as const;

i18n.on('initialized', () => {
  oldClient.setQueryParams({ language: i18n.language }, false);
});

i18n.on('languageChanged', (language: Languages) => {
  oldClient.setQueryParams({ language }, false);
});

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    defaultNS,
    fallbackLng: Languages.EN,
    debug: true,
    react: {
      useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources
  });

export default i18n;
