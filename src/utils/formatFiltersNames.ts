import { sortingDateList, sortListTV, sortMovieByType, storageCountries } from '~/store/localData';

export const filterByDateName = (yearValue: string) => {
  if (!yearValue) {
    return sortingDateList.find(el => el.date === 'all').name;
  }

  const singleDate = sortingDateList.find(el => el.date === yearValue);
  return singleDate ? singleDate.name : yearValue;
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
    return sortByList.find(el => el.type === 'popularity').name;
  }
  const [sortBy] = (sortByValue || '').split('.');

  const current = sortByList.find(el => el.type === sortBy);
  return current ? current.name : sortByValue;
};
