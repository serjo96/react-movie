import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { sortingDateList, sortListTV, sortMovieByType } from '~/store/localData';

import './filters.sass';
import FiltersMobile from '../components/filters-mobile';
import Filters from '../components/filters';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppSelector } from '~/hooks/storeHooks';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import { MediaType } from '~/core/types/media-type';
import { Genre } from '~/core/types/genres';

interface MyPros {
  sortByCountry?: boolean;
  safeFilter?: boolean;
  typeList: MediaType;
}

export interface MyFilterState {
  genre?: number;
  year?: string
  adult?: boolean;
  country?: string;
  sortBy?: string;
}
// TODO: add filter by status show
function FilterList ({
  sortByCountry,
  safeFilter,
  typeList
}: MyPros) {
  const { search } = useLocation();
  const history = useHistory();
  const { active } = useBreakpoints();
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];
  const getUrlString = {
    genre: queryString.parse(search, { parseNumbers: true }).genre as number,
    adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
    country: queryString.parse(search).country as string,
    sort_by: queryString.parse(search).sort_by as string,
    year: queryString.parse(search).year as string
  };
  const [filters, setFilters] = useState<MyFilterState>({
    genre: 0,
    adult: false,
    sortBy: '',
    year: '',
    country: ''
  });
  const [filterByDateInput, setFilterByDateInput] = useState('');
  const [isVisibleModalFilter, setVisibleModalFilter] = useState(false);
  const { data: { genresHash, arrGenres } } = useAppSelector((state) => state.genres);

  const [sortBy, direction] = (filters.sortBy || '').split('.');

  useEffect(() => {
    const filters: MyFilterState = {
      ...getUrlString,
      sortBy: queryString.parse(search).sort_by as string
    };
    setFilters(filters);
  }, [search]);

  const onSortLists = (sortType = sortBy || 'popularity') => {
    const directionSort = direction && direction === 'desc' ? '.asc' : '.desc';
    const fullType = sortType + directionSort;

    const UrlObj = { ...getUrlString };
    UrlObj.sort_by = fullType;

    history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  const onSortByDate = (el: typeof sortingDateList[0]) => {
    let year;
    const UrlObj = { ...getUrlString };
    if (el.type === 'range') {
      if (el.date === '-1980') {
        year = el.date;
      } else {
        const [startDate, endDate] = el.date.split('=').map(date => new Date(date).getFullYear());
        year = `${startDate}-${endDate}`;
      }

      UrlObj.year = year;
    } else {
      UrlObj.year = el.date;
    }

    if (el.date === 'all') {
      delete UrlObj.year;
    }

    history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  const onSortByCountry = (countryIco: string) => {
    const UrlObj = { ...getUrlString };
    UrlObj.country = countryIco;

    if (countryIco.toLowerCase() === 'all') {
      delete UrlObj.country;
    }

    history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  const onSelectGenres = (genre: Genre) => {
    const id = +genre.id;
    const UrlObj = { ...getUrlString };
    UrlObj.genre = id;

    if (!id) {
      delete UrlObj.genre;
    }

    history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  const onClickAdult = () => {
    const UrlObj = { ...getUrlString };
    UrlObj.adult = !filters.adult;

    if (getUrlString.adult) {
      delete UrlObj.adult;
    }

    history.push({
      search: queryString.stringify(UrlObj)
    });
  };

  const onChangeRangeDate = (rangeValue: string) => {
    if (rangeValue.length <= 4) {
      setFilterByDateInput(rangeValue);
      if (+rangeValue >= 1910) {
        const UrlObj = { ...getUrlString };
        UrlObj.year = rangeValue;

        history.push({
          search: queryString.stringify(UrlObj)
        });
      }
    }
  };

  const onBlurRangeData = (rangeValue: string) => {
    if (rangeValue.length <= 4) {
      setFilterByDateInput('');
    }
  };

  const resetFilters = () => {
    history.push({
      search: queryString.stringify({})
    });
  };

  const onOpenFilterModal = () => {
    setVisibleModalFilter(!isVisibleModalFilter);
  };

  const closePopup = () => {
    setVisibleModalFilter(false);
  };

  const filterValues = {
    ...filters,
    filterByDateInput
  };

  const sortByList = typeList === MediaType.MOVIE ? sortMovieByType : sortListTV;
  if (!mobileBreakpoints.includes(active)) {
    return (
      <Filters
        genres={arrGenres[typeList]}
        genresObject={genresHash}
        selectedGenre={filters.genre}
        filterValues={filterValues}
        safeFilter={safeFilter}
        sortByCountry={sortByCountry}
        sortByList={sortByList}
        onClickGenres={onSelectGenres}
        onSortByDate={onSortByDate}
        onSortByCountry={onSortByCountry}
        onClickSort={onSortLists}
        onClickAdult={onClickAdult}
        onChangeRangeDate={onChangeRangeDate}
        onBlurInputRange={onBlurRangeData}
        onResetFilters={resetFilters}
      />
    );
  }
  return (
    <FiltersMobile
      filterValues={filterValues}
      safeFilter={safeFilter}
      modalFilter={isVisibleModalFilter}
      selectedGenre={filters.genre}
      genres={arrGenres[typeList]}
      genresObject={genresHash}
      sortByCountry={sortByCountry}
      sortByList={sortByList}
      onClickGenres={onSelectGenres}
      onSortByDate={onSortByDate}
      onSortByCountry={onSortByCountry}
      onClickSort={onSortLists}
      onResetFilters={resetFilters}
      onOpenFilterModal={onOpenFilterModal}
      onChangeRangeDate={onChangeRangeDate}
      onBlurInputRange={onBlurRangeData}
      onClickAdult={onClickAdult}
      onClosePopUp={closePopup}
    />
  );
}

// onClickSortList={this.sortList}
// onClickSortDate={this.onSortByDate}
// sortByCountry={true}
// safeFilter={true}
// sortListType={sortListType}
// MobileFilter={width >= 963}

export default (FilterList);
