import React from 'react';
import classNames from 'classnames';
import { sortingDateList, sortListTV, sortMovieByType, storageCountries } from '~/store/localData';
import Popup from '~/templates/popup/popup';
import { Genre } from '~/core/types/genres';
import { GenresState } from '~/store/genres/genres.slice';
import { filterByCountryName, filterByDateName, sortByFilterName } from '~/utils/formatFiltersNames';
import './filter-mobile.sass';

interface MyProps {
  genres: Array<Genre>;
  genresObject: GenresState['data']['genresHash'];
  selectedGenre?: number;
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
  selectedGenre = 0,
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
  const direction = (filterValues.sortBy || '').split('.').pop();

  const sortDirectionClass = classNames('mobile__sort-direction sort-direction', {
    'sort-direction--asc': direction && direction === 'asc'
  });

  const sortDirectionTitle = `Сортировать по ${direction === 'desc'
    ? 'убыванию'
    : 'возрастанию'}`;

  return (
    <React.Fragment>

      <div
        className='mobile-filter-trigger link'
        onClick={onOpenFilterModal}
      >
        <span>Настроить фильтры</span>
        <i className='fa fa-filter' aria-hidden='true' />
      </div>

      {modalFilter &&
        <Popup
          closePopup={onClosePopUp}
        >

          <div className='mobile-filter'>
            <h2 className='popup__title'>Фильтровать список</h2>
            {genres.length &&
              <div className='mobile-filter__select'>
                <div className='mobile-filter-item__title'>Жанр</div>
                <label
                  htmlFor='genreFilter'
                  className='mobile-filter__label'
                >
                  <div className='mobile-filter__name'>
                    <span>{genresObject[selectedGenre]}</span>
                    <i className='fa fa-angle-down' aria-hidden='true' />
                  </div>
                  <select
                    name='genreFilter'
                    id='genreFilter'
                    onChange={(e) => onClickGenres({
                      name: e.target.value,
                      id: Number(e.target.options[e.target.selectedIndex].id)
                    } as Genre)}
                  >
                    {genres.map((el, indx) => (
                      <option
                        id={`${el.id}`}
                        key={indx}
                      >
                        {el.name}
                      </option>)
                    )}
                  </select>
                </label>
              </div>}

            <div className='mobile-filter__select'>
              <div className='mobile-filter-item__title'>Год</div>
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
                      {el.name}
                    </option>)
                  )}
                </select>
              </label>
            </div>

            <div className='mobile-filter__select mobile-filter__select--date-input'>
              <div className='mobile-filter-item__title'>
                <span>Свой год</span>
              </div>
              <label className='mobile-filter__label'>
                <input
                  name='filterByYearInput'
                  type='search'
                  pattern='[0-9]*'
                  placeholder='Введите свой год'
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
              <div className='mobile-filter-item__title'>Сортировать</div>
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
                      value={el.name}
                      data-type={el.type}
                    >
                      {el.name}
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
              <i className='fa fa-long-arrow-up' aria-hidden='true' />
            </div>

            {safeFilter &&
              <div
                className='mobile-filter__safe-filter'
                onClick={onClickAdult}
              >
                <span>Безопасный фильтр</span>
                <i
                  className={`fa ${filterValues.adult ? 'fa-square-o' : 'fa-check-square'}`}
                  aria-hidden='true'
                />
              </div>}

            <div
              onClick={onResetFilters}
              className='restore-filters-btn'
            >
                Сбросить все фильтры
            </div>

          </div>
        </Popup>}
    </React.Fragment>
  );
}
