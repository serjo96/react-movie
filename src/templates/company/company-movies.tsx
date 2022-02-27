import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanyMovies } from '~/store/company/company.api';
import { MediaType } from '~/core/types/media-type';

import FilterList from '~/templates/filters/containers/filter-list';
import ServiceBlock from '~/templates/service/service-block';
import MediaList from '~/ui-components/media-list/media-list';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usePrevious } from '~/hooks/usePrevious';
import { scrollToTop } from '~/utils';

type MoviesFilters = {
  adult: boolean;
  sortBy: string | null;
  year: string | null;
  genre: number | null;
}

const initMoviesFilters = (): MoviesFilters => ({
  adult: false,
  sortBy: null,
  year: null,
  genre: null
});

export default function CompanyMovies () {
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.company.lists.movies);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initMoviesFilters());
  const prevPage = usePrevious(page);
  const prevFilters = usePrevious(filters);
  const companyId = id.split('-').pop();

  const sendRequest = () => {
    const payload = { ...filters, date: filters.year };
    appDispatch(getCompanyMovies({ ...payload, page, id: +companyId }));
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (page !== prevPage) {
      sendRequest();
    }
  }, [page]);

  useEffect(() => {
    if (filters !== prevFilters) {
      sendRequest();
      scrollToTop();
    }
  }, [filters]);

  const onNextMoviesPage = () => {
    setPage(page + 1);
  };

  const onPrevMoviesPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const onSelectGenre = (genre: number) => {
    let genrePayload = genre;
    if (!genre) {
      genrePayload = null;
    }
    setFilters({ ...filters, genre: genrePayload });
  };

  const onClickAdult = () => {
    setFilters({ ...filters, adult: !filters.adult });
  };

  const onFilterByDate = (year: string) => {
    setFilters({ ...filters, year });
  };

  const onSortBy = (sortBy: string) => {
    setFilters({ ...filters, sortBy });
  };

  const onResetFilters = () => {
    setFilters(initMoviesFilters());
  };
  return (
    <ServiceBlock
      isLoading={isFetching}
      isSuccessful={isSuccessful}
      fetch={sendRequest}
    >
      <div className='company-product-list'>
        <div className='company-product-list__content'>
          <FilterList
            safeFilter
            propFilterValues={filters}
            typeList={MediaType.MOVIE}
            handleSelectGenres={onSelectGenre}
            handleClickAdult={onClickAdult}
            handleResetFilters={onResetFilters}
            handleSortBy={onSortBy}
            handleFilterByDate={onFilterByDate}
          />
          <MediaList
            movieListTitle={`Всего фильмов (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.MOVIE}
          />

          <PageSwitcher
            handleNextPage={onNextMoviesPage}
            handlePrevPage={onPrevMoviesPage}
            page={data.page}
            totalPages={data.totalPages}
          />
        </div>
      </div>
    </ServiceBlock>
  );
}
