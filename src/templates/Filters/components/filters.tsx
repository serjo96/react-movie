import React from 'react';

import { chunkArr } from '~/utils';
import {
  storageCountries,
  popularCountries,
  sortingDateList,
  sortMovieByType, sortListTV
} from '~/store/localData';
import classNames from 'classnames';
import { Genre } from '~/core/types/genres';
import { useAppSelector } from '~/hooks/storeHooks';

interface MyProps {
  genres: Array<Genre>;
  selectedGenre?: number;
  sortByList: typeof sortMovieByType | typeof sortListTV;
  safeFilter: boolean;
  sortByCountry: boolean;
  modalFilter: boolean;
  onClickGenres: (item: Genre) => void;
  onSortByDate: (item: typeof sortingDateList[0]) => void;
  onChangeRangeDate: (rangeValue: string) => void;
  onBlurInputRange: (rangeValue: string) => void;
  onSortByCountry: (item: string) => void;
  onClickSort: (sortType?: string) => void;
  onClickAdult: () => void;
  onResetFilters: () => void;
  filterValues: {
    genre?: number;
    filterByDateInput?: string;
    year?: string
    adult?: boolean;
    country?: string;
    sortBy?: string;
  }
}

export default function FiltersMobile ({
  filterValues,
  genres,
  selectedGenre = 0,
  safeFilter,
  sortByList,
  sortByCountry,
  onClickGenres,
  onClickSort,
  onChangeRangeDate,
  onBlurInputRange,
  onClickAdult,
  onSortByDate,
  onSortByCountry,
  onResetFilters
}: MyProps) {
  const { data: { genresHash } } = useAppSelector((state) => state.genres);
  const [sortBy, direction] = (filterValues.sortBy || '').split('.');
  const filterCatalogClasses = (isActive: boolean) => classNames('filter-catalog__item filter-genre', {
    'filter-catalog__item--active': isActive
  });
  const genreFilterClasses = classNames('genre-filter filter-item', {
    'filter-item--active': filterValues.genre
  });

  const filterItemClasses = (isActive: boolean) => classNames('filter-item', {
    'filter-item--active': isActive
  });
  const filterCatalogItemClasses = (isActive: boolean) => classNames('filter-catalog__item', {
    'filter-catalog__item--active': isActive
  });

  const sortDirectionClass = classNames('sort-direction', {
    'sort-direction--asc': direction && direction === 'asc'
  });

  const renderCountryList = (items: typeof popularCountries | typeof storageCountries) => {
    return items.map((item, index) => {
      return (
        <li
          className={filterCatalogItemClasses(filterValues.country === item.ico)}
          key={index}
          onClick={() => onSortByCountry(item.ico)}
        >
          {item.name}
        </li>
      );
    });
  };

  const filterByDateName = () => {
    if (!filterValues.year) {
      return sortingDateList.find(el => el.date === 'all').name;
    }

    const singleDate = sortingDateList.find(el => el.date === filterValues.year);
    return singleDate ? singleDate.name : filterValues.year;
  };

  const filterByCountryName = () => {
    if (!filterValues.country) {
      return storageCountries.find(el => el.ico === 'all').name;
    }
    const current = storageCountries.find(el => el.ico === filterValues.country);
    return current ? current.name : filterValues.country;
  };
  const sortByFilterName = () => {
    if (!filterValues.sortBy) {
      return sortByList.find(el => el.type === 'popularity').name;
    }
    const current = sortByList.find(el => el.type === sortBy);
    return current ? current.name : filterValues.year;
  };

  return (
    <div className='filter-list-container'>
      <div className='filter-list'>
        {genres.length &&
          <div className={genreFilterClasses}>
            <div className='filter-name'>
              <span>{genresHash[selectedGenre]}</span>
              <i className='fa fa-angle-down' aria-hidden='true' />
            </div>
            <div className='filter-item__catalog filter-item__catalog--genres'>
              {chunkArr(genres, 5).map((el, indx) => (
                <ul
                  className='filter-catalog-col'
                  key={indx}
                >
                  {el.map((item, index) => {
                    return (
                      <li
                        className={filterCatalogClasses(item.id === +selectedGenre)}
                        id={`${item.id}`}
                        onClick={() => onClickGenres(item)}
                        key={index}
                      >
                        {item.name}
                      </li>);
                  }
                  )}
                </ul>
              ))}
            </div>
          </div>}

        <div className={filterItemClasses(!!(filterValues.year))}>
          <div className='filter-name'>
            <span>{filterByDateName()}</span>
            <i className='fa fa-angle-down' aria-hidden='true' />
          </div>
          <div
            className='filter-item__catalog filter-item__catalog--sort-date filter-item__catalog--col'
          >
            <div className='filter-catalog__list'>
              {sortingDateList.filter(date => date.type === 'single').map((el, index) => (
                <div
                  className={filterCatalogItemClasses(filterValues.year === el.date)}
                  key={index}
                  onClick={() => onSortByDate(el)}
                >
                  {el.name}
                </div>
              ))}
            </div>
            <div className='filter-catalog__list'>
              <div className='filter-catalog__sub-title'>Десятилетия</div>
              {sortingDateList.filter(date => date.type === 'range').map((el, index) => (
                <div
                  className={filterCatalogItemClasses(filterValues.year === el.date)}
                  key={index}
                  onClick={() => onSortByDate(el)}
                >
                  {el.name}
                </div>
              ))}
            </div>
            <div className='filter-catalog__list'>
              <div className='filter-catalog__sub-title'>Своя дата</div>
              <input
                type='text'
                pattern='[0-9]*'
                className='filter-filed-date'
                onChange={({ target }) => onChangeRangeDate(target.value)}
                onBlur={({ target }) => onBlurInputRange(target.value)}
                value={filterValues.filterByDateInput}
              />
            </div>
          </div>
        </div>

        {sortByCountry &&
          <div
            className={filterItemClasses(!!filterValues.country)}
          >
            <div className='filter-name'>
              <span>{filterByCountryName()}</span>
              <i className='fa fa-angle-down' aria-hidden='true' />
            </div>
            <div className='filter-item__catalog filter-item__catalog--genres'>
              <div className='filter-catalog-col'>
                <div
                  className={filterCatalogItemClasses(!filterValues.country)}
                  onClick={() => onSortByCountry('all')}
                >
                  Все страны
                </div>

                <div className='filter-catalog__sub-title filter-catalog__sub-title--country'>Популярное</div>
                <ul>
                  {renderCountryList(popularCountries)}
                </ul>
              </div>
              {chunkArr(storageCountries, 10).map((el, indx) => (
                <ul
                  className='filter-catalog-col'
                  key={indx}
                >
                  {renderCountryList(el)}
                </ul>
              ))}
            </div>
          </div>}

        {safeFilter &&
          <div
            className='filter-item filter-item--safe-filter'
            onClick={onClickAdult}
          >
            <div className='filter-name'>
              <span>Безопасный фильтр</span>
              <i
                className={`fa ${filterValues.adult ? 'fa-square-o' : 'fa-check-square'}`}
                aria-hidden='true'
              />
            </div>
          </div>}

        <div className={`filter-item ${filterValues.sortBy !== 'popularity'
            ? filterValues.sortBy ? 'filter-item--active'
              : ''
            : ''}`}
        >
          <div className='filter-name'>
            <span>{sortByFilterName()}</span>
            <i className='fa fa-angle-down' aria-hidden='true' />
          </div>

          <div className='filter-item__catalog filter-item__catalog--col sort-catalog'>
            <div className='filter-catalog__title'>Сортировать</div>
            {sortByList.map((el, indx) => (
              <div
                onClick={() => onClickSort(el.type)}
                key={indx}
                className={`${filterCatalogItemClasses(sortBy === el.type)} sort-catalog-item`}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
        <div onClick={onResetFilters} className='filter-item'>
          <div className='filter-name'>Сбросить фильтры</div>
        </div>
        <div className={sortDirectionClass}>
          <i
            onClick={() => onClickSort()}
            className='fa fa-long-arrow-up' aria-hidden='true'
          />
        </div>
      </div>
    </div>
  );
}
