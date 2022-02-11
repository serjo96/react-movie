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
import { GenresState } from '~/store/genres/genres.slice';
import { filterByCountryName, filterByDateName, sortByFilterName } from '~/utils/formatFiltersNames';

interface MyProps {
  genres: Array<Genre>;
  genresObject: GenresState['data']['genresHash'];
  sortByList: typeof sortMovieByType | typeof sortListTV;
  safeFilter: boolean;
  sortByCountry: boolean;
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

export default function Filters ({
  filterValues,
  genres,
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
  onResetFilters,
  genresObject
}: MyProps) {
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

  const sortDirectionClass = classNames('filter-item filter-item--sort-direction', {
    'filter-item--sort-direction-asc': direction && direction === 'asc'
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

  return (
    <div className='filter-list-container'>
      <div className='filter-list'>
        {genres.length &&
          <div className={genreFilterClasses}>
            <div className='filter-name'>
              <span>{genresObject[filterValues.genre || 0]}</span>
              <i className='fa fa-angle-down' aria-hidden='true' />
            </div>
            <div className='filter-item__catalog filter-item__catalog--genres'>
              {chunkArr(genres, 5).map((el, indx) => (
                <ul
                  className='filter-catalog-col'
                  key={indx}
                >
                  {el.map((item, index) => (
                    <li
                      className={filterCatalogClasses(item.id === +filterValues.genre)}
                      id={`${item.id}`}
                      onClick={() => onClickGenres(item)}
                      key={index}
                    >
                      {item.name}
                    </li>)
                  )}
                </ul>
              ))}
            </div>
          </div>}

        <div className={filterItemClasses(!!(filterValues.year))}>
          <div className='filter-name'>
            <span>{filterByDateName(filterValues.year)}</span>
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
              <div className='filter-catalog__sub-title'>Свой год</div>
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
              <span>{filterByCountryName(filterValues.country)}</span>
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

        <div className={`filter-item ${(filterValues.sortBy !== 'popularity' && filterValues.sortBy) ? 'filter-item--active' : ''}`}>
          <div className='filter-name'>
            <span>{sortByFilterName(sortByList, filterValues.sortBy)}</span>
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
        <div className={sortDirectionClass}>
          <i
            onClick={() => onClickSort()}
            className='fa fa-long-arrow-up' aria-hidden='true'
          />
        </div>
        <div onClick={onResetFilters} className='filter-item'>
          <div className='filter-name'>Сбросить фильтры</div>
        </div>
      </div>
    </div>
  );
}
