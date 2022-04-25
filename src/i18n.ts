import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Languages } from '~/store/config/config.slice';

import LISTS_EN from '../public/locales/en/lists/list.json';
import KEYWORDS_EN from '../public/locales/en/keywords/keywords.json';
import KEYWORDS_RU from '../public/locales/ru/keywords/keywords.json';
import TV_DETAILS_EN from '../public/locales/en/tv-details/tv-details.json';
import TV_DETAILS_RU from '../public/locales/ru/tv-details/tv-details.json';
import PERSON_EN from '../public/locales/en/person/person.json';
import PERSON_RU from '../public/locales/ru/person/person.json';
import MOVIE_DETAILS_EN from '../public/locales/en/movie-details/movie-details.json';
import MOVIE_DETAILS_RU from '../public/locales/ru/movie-details/movie-details.json';
import MEDIA_COMMON_EN from '../public/locales/en/media-common/media-common.json';
import MEDIA_COMMON_RU from '../public/locales/ru/media-common/media-common.json';
import LISTS_RU from '../public/locales/ru/lists/list.json';
import COMPANY_EN from '../public/locales/en/company/company.json';
import COMPANY_RU from '../public/locales/ru/company/company.json';
import COMMON_EN from '../public/locales/en/common/common.json';
import COMMON_RU from '../public/locales/ru/common/common.json';
import FILTERS_EN from '../public/locales/en/filters/filters.json';
import FILTERS_RU from '../public/locales/ru/filters/filters.json';
import SEARCH_EN from '../public/locales/en/search/search.json';
import SEARCH_RU from '../public/locales/ru/search/search.json';
import oldClient from '~/core/api/OldClient';

const isDevelopment = process.env.NODE_ENV !== 'production';
export const defaultNS = 'common';
export const resources = {
  en: {
    common: COMMON_EN,
    filters: FILTERS_EN,
    company: COMPANY_EN,
    movie: MOVIE_DETAILS_EN,
    tv: TV_DETAILS_EN,
    person: PERSON_EN,
    mediaCommon: MEDIA_COMMON_EN,
    keywords: KEYWORDS_EN,
    search: SEARCH_EN,
    lists: LISTS_EN
  },
  ru: {
    company: COMPANY_RU,
    filters: FILTERS_RU,
    movie: MOVIE_DETAILS_RU,
    tv: TV_DETAILS_RU,
    person: PERSON_RU,
    mediaCommon: MEDIA_COMMON_RU,
    keywords: KEYWORDS_RU,
    search: SEARCH_RU,
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
    debug: isDevelopment,
    react: {
      useSuspense: false //   <---- this will do the magic
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources
  });

export default i18n;
