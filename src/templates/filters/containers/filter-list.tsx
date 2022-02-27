import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import FiltersMobile from '../components/filters-mobile';
import Filters from '../components/filters';

import { sortingDateList, sortListTV, sortMovieByType } from '~/store/localData';
import { useAppSelector } from '~/hooks/storeHooks';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import { MediaType } from '~/core/types/media-type';
import { Genre } from '~/core/types/genres';
import './filters.sass';

interface MyPros {
  sortByCountry?: boolean;
  safeFilter?: boolean;
  typeList: MediaType;
  propFilterValues?: MyFilterState
  handleSelectGenres?: (genre: number) => void;
  handleClickAdult?: () => void;
  handleResetFilters?: () => void;
  handleSortBy?: (sortBy: string) => void;
  handleFilterByDate?: (year: string) => void;
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
  typeList,
  propFilterValues,
  handleSelectGenres,
  handleClickAdult,
  handleResetFilters,
  handleSortBy,
  handleFilterByDate
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

  useEffect(() => {
    const filters: MyFilterState = {
      ...getUrlString,
      sortBy: queryString.parse(search).sort_by as string
    };
    setFilters(filters);
  }, [search]);

  const onSortLists = (sortType = 'popularity.desc') => {
    const [sortBy, direction] = (((propFilterValues && propFilterValues.sortBy) || filters.sortBy || sortType) || '').split('.');
    const directionSort = direction && direction === 'desc' ? '.asc' : '.desc';
    const fullType = sortBy + directionSort;

    const UrlObj = { ...getUrlString };
    UrlObj.sort_by = fullType;

    if (!handleSortBy) {
      history.push({
        search: queryString.stringify(UrlObj)
      });
    } else {
      handleSortBy(UrlObj.sort_by);
    }
  };

  const onFilterByDate = (el: typeof sortingDateList[0]) => {
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

    if (!handleFilterByDate) {
      history.push({
        search: queryString.stringify(UrlObj)
      });
    } else {
      handleFilterByDate(UrlObj.year);
    }
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
    if (!handleSelectGenres) {
      const id = genre.id;
      const UrlObj = { ...getUrlString };
      UrlObj.genre = id;

      if (!id) {
        delete UrlObj.genre;
      }

      history.push({
        search: queryString.stringify(UrlObj)
      });
    } else {
      handleSelectGenres(genre.id);
    }
  };

  const onClickAdult = () => {
    if (!handleClickAdult) {
      const UrlObj = { ...getUrlString };
      UrlObj.adult = !filters.adult;

      if (getUrlString.adult) {
        delete UrlObj.adult;
      }

      history.push({
        search: queryString.stringify(UrlObj)
      });
    } else {
      handleClickAdult();
    }
  };

  const onChangeRangeDate = (rangeValue: string) => {
    if (rangeValue.length <= 4) {
      setFilterByDateInput(rangeValue);
      if (+rangeValue >= 1910) {
        const UrlObj = { ...getUrlString };
        UrlObj.year = rangeValue;

        if (!handleFilterByDate) {
          history.push({
            search: queryString.stringify(UrlObj)
          });
        } else {
          handleFilterByDate(rangeValue);
        }
      }
    }
  };

  const onBlurRangeData = (rangeValue: string) => {
    if (rangeValue.length <= 4) {
      setFilterByDateInput('');
    }
  };

  const resetFilters = () => {
    if (!handleResetFilters) {
      history.push({
        search: queryString.stringify({})
      });
    } else {
      handleResetFilters();
    }
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
        genres={arrGenres[typeList as MediaType.TV || MediaType.MOVIE]}
        genresObject={genresHash}
        filterValues={propFilterValues || filterValues}
        safeFilter={safeFilter}
        sortByCountry={sortByCountry}
        sortByList={sortByList}
        onClickGenres={onSelectGenres}
        onSortByDate={onFilterByDate}
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
      filterValues={propFilterValues || filterValues}
      safeFilter={safeFilter}
      modalFilter={isVisibleModalFilter}
      genres={arrGenres[typeList as MediaType.TV || MediaType.MOVIE]}
      genresObject={genresHash}
      sortByCountry={sortByCountry}
      sortByList={sortByList}
      onClickGenres={onSelectGenres}
      onSortByDate={onFilterByDate}
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

export default (FilterList);
