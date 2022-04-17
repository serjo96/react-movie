import React from 'react';
import classNames from 'classnames';

import { sortingDateList, sortListTV, sortMovieByType, storageCountries } from '~/store/localData';
import Popup from '~/templates/popup/popup';
import { Genre } from '~/core/types/genres';
import { GenresState } from '~/store/genres/genres.slice';
import { filterByCountryName, filterByDateName, sortByFilterName } from '~/utils/formatFiltersNames';
import './filter-mobile.sass';
import Portal from '~/ui-components/portal/portal';
import { useTranslation } from 'react-i18next';

interface MyProps {
  genres: Array<Genre>;
  genresObject: GenresState['data']['genresHash'];
  sortByList: typeof sortMovieByType | typeof sortListTV;
  safeFilter: boolean;
  sortByCountry: boolean;
  modalFilter: boolean;
  onClickGenres: (genre: Genre) => void;
  onOpenFilterModal: () => void;
  onSortByDate: (item: typeof sortingDateList[0]) => void;
  onChangeRangeDate: (rangeValue: string) => void;
  onBlurInputRange: (rangeValue: string) => void;
  onSortByCountry: (item: string) => void;
  onClickSort: (sortType?: string) => void;
  onClickAdult: () => void;
  onResetFilters: () => void;
  onClosePopUp: () => void;
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
  safeFilter,
  sortByList,
  sortByCountry,
  onClickGenres,
  onClickSort,
  onOpenFilterModal,
  onChangeRangeDate,
  onBlurInputRange,
  onClickAdult,
  onSortByDate,
  onSortByCountry,
  onResetFilters,
  modalFilter,
  genresObject,
  onClosePopUp
}: MyProps) {
  const { t } = useTranslation(['common', 'filters']);
  const direction = (filterValues.sortBy || '').split('.').pop();

  const sortDirectionClass = classNames('mobile__sort-direction filter-item--sort-direction', {
    'filter-item--sort-direction--asc': direction && direction === 'asc'
  });

  const sortDirectionTitle = `${t('filters:sortLabel')} ${direction === 'desc'
    ? t('filters:sortDirectionDesc')
    : t('filters:sortDirectionAsc')}`;

  return (
    <React.Fragment>

      <button
        className='mobile-filter-trigger link'
        onClick={onOpenFilterModal}
      >
        <span>{t('filters:showMobileFiltersButton')}</span>
        <i className='fa fa-filter' aria-hidden='true' />
      </button>

      {modalFilter &&
        <Portal>
          <Popup
            closePopup={onClosePopUp}
          >

            <div className='mobile-filter'>
              <h2 className='popup__title'>{t('filters:showMobileFiltersButton')}</h2>
              {genres.length &&
                <div className='mobile-filter__select'>
                  <div className='mobile-filter-item__title'>{t('filters:genresLabel')}</div>
                  <label
                    htmlFor='genreFilter'
                    className='mobile-filter__label'
                  >
                    <div className='mobile-filter__name'>
                      <span>{filterValues.genre ? genresObject[filterValues.genre] : t('filters:allGenres')}</span>
                      <i className='fa fa-angle-down' aria-hidden='true' />
                    </div>
                    <select
                      name='genreFilter'
                      id='genreFilter'
                      value={filterValues.genre || 0}
                      onChange={(e) => onClickGenres({
                        name: e.target.value,
                        id: Number(e.target.options[e.target.selectedIndex].id)
                      } as Genre)}
                    >
                      {genres.map((el, indx) => (
                        <option
                          id={`${el.id}`}
                          key={indx}
                          value={el.id}
                        >
                          {el.id === 0 ? t('filters:allGenres') : el.name}
                        </option>)
                      )}
                    </select>
                  </label>
                </div>}

              <div className='mobile-filter__select'>
                <div className='mobile-filter-item__title'>{t('filters:yearLabel')}</div>
                <label className='mobile-filter__label' htmlFor='yearFilter'>
                  <div className='mobile-filter__name'>
                    <span>{filterByDateName(filterValues.year)}</span>
                    <i className='fa fa-angle-down' aria-hidden='true' />
                  </div>
                  <select
                    name='filterByYear'
                    onChange={e => onSortByDate({
                      name: e.target.value,
                      date: e.target.options[e.target.selectedIndex].dataset.date,
                      type: e.target.options[e.target.selectedIndex].dataset.type
                    })}
                  >
                    {sortingDateList.map((el, indx) => (
                      <option
                        key={indx}
                        value={el.date}
                        data-type={el.type}
                        data-date={el.date}
                      >
                        {el.date !== 'all' ? `${el.name} ${t('filters:year')}` : t('filters:years.all')}
                      </option>)
                    )}
                  </select>
                </label>
              </div>

              <div className='mobile-filter__select mobile-filter__select--date-input'>
                <div className='mobile-filter-item__title'>
                  <span>{t('filters:customYearLabel')}</span>
                </div>
                <label className='mobile-filter__label'>
                  <input
                    name='filterByYearInput'
                    type='search'
                    pattern='[0-9]*'
                    placeholder={t('filters:customYearPlaceholder')}
                    className='mobile-filter__input'
                    onChange={({ target }) => onChangeRangeDate(target.value)}
                    onBlur={({ target }) => onBlurInputRange(target.value)}
                    value={filterValues.filterByDateInput}
                  />
                </label>
              </div>

              {sortByCountry &&
                <div className='mobile-filter__select'>
                  <div className='mobile-filter-item__title'>Стране</div>
                  <label className='mobile-filter__label' htmlFor=''>
                    <div className='mobile-filter__name'>
                      <span>{filterByCountryName(filterValues.country)}</span>
                      <i className='fa fa-angle-down' aria-hidden='true' />
                    </div>
                    <select
                      name='counterFilter'
                      id=''
                      onChange={e => {
                        onSortByCountry(e.target.options[e.target.selectedIndex].dataset.ico);
                      }}
                    >
                      <option value=''>Все страны</option>
                      {storageCountries.map((el, indx) => (
                        <option
                          key={indx}
                          value={el.name}
                          data-ico={el.ico}
                        >
                          {el.name}
                        </option>)
                      )}
                    </select>
                  </label>
                </div>}

              <div className='mobile-filter__select'>
                <div className='mobile-filter-item__title'>{t('filters:sortLabel')}</div>
                <label className='mobile-filter__label'>
                  <div className='mobile-filter__name'>
                    <span>{sortByFilterName(sortByList, filterValues.sortBy)}</span>
                    <i className='fa fa-angle-down' aria-hidden='true' />
                  </div>
                  <select
                    name='sortBy'
                    onChange={e => {
                      onClickSort(e.target.options[e.target.selectedIndex].dataset.type);
                    }}
                  >
                    {sortByList.map((el, indx) => (
                      <option
                        key={indx}
                        value={el.key}
                        data-type={el.type}
                      >
                        {/* TODO: Fix ts overloads */}
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        {t(`sortBy.${el.key}`, { ns: 'filters' })}
                      </option>)
                    )}
                  </select>
                </label>
              </div>

              <div
                onClick={() => onClickSort()}
                className={sortDirectionClass}
              >
                <span>{sortDirectionTitle}</span>
                <i className='fa fa-arrow-up' aria-hidden='true' />
              </div>

              {safeFilter &&
                <div
                  className='mobile-filter__safe-filter'
                  onClick={onClickAdult}
                >
                  <span>{t('filters:safeFilter')}</span>
                  <i
                    className={`fa ${filterValues.adult ? 'fa-square-o' : 'fa-check-square'}`}
                    aria-hidden='true'
                  />
                </div>}

              <div
                onClick={onResetFilters}
                className='restore-filters-btn'
              >
                {t('filters:resetButton')}
              </div>

            </div>
          </Popup>
        </Portal>}
    </React.Fragment>
  );
}
