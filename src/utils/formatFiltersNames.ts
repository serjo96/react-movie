import { sortingDateList, sortListTV, sortMovieByType, storageCountries } from '~/store/localData';
import i18n from '~/i18n';

export const filterByDateName = (yearValue: string) => {
  if (!yearValue) {
    return i18n.t('years.all', { ns: 'filters' });
  }

  const singleDate = sortingDateList.find(el => el.date === yearValue);
  const beforeDate = yearValue === '-1980' ? `${i18n.t('commonWords.until')} ${yearValue}` : yearValue;
  return singleDate && singleDate.type === 'single' ? singleDate.name : beforeDate;
};

export const filterByCountryName = (countryValue: string) => {
  if (!countryValue) {
    return storageCountries.find(el => el.ico === 'all').name;
  }
  const current = storageCountries.find(el => el.ico === countryValue);
  return current ? current.name : countryValue;
};

export const sortByFilterName = (sortByList: typeof sortMovieByType | typeof sortListTV, sortByValue: string) => {
  if (!sortByValue) {
    return i18n.t('sortBy.popularity', { ns: 'filters' });
  }
  const [sortBy] = (sortByValue || '').split('.');

  const current = sortByList.find(el => el.type === sortBy);
  return current ? i18n.t(`sortBy.${current.key}`, { ns: 'filters' }) : sortByValue;
};
