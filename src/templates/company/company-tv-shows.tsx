import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MediaType } from '~/core/types/media-type';
import { getCompanyTvShows } from '~/store/company/company.api';

import ServiceBlock from '~/templates/service/service-block';
import FilterList from '~/templates/filters/containers/filter-list';
import MediaList from '~/ui-components/media-list/media-list';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usePrevious } from '~/hooks/usePrevious';
import { initFilters } from '~/templates/company/company-page';
import { scrollToTop } from '~/utils';
import { useLangEffect } from '~/hooks/useLangEffect';

type TvShowsFilters = {
  sortBy: string | null;
  year: string | null;
  genre: number | null;
}

const initTvShowsFilters = (): TvShowsFilters => ({
  sortBy: null,
  year: null,
  genre: null
});

export default function CompanyTvShows () {
  const appDispatch = useAppDispatch();
  const { t } = useTranslation('lists');
  const { id } = useParams<{id: string}>();
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.company.lists.tvShows);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initFilters());

  const prevPage = usePrevious(page);
  const prevFilters = usePrevious(filters);
  const companyId = id.split('-').pop();

  const sendRequest = () => {
    const payload = { ...filters, date: filters.year };
    appDispatch(getCompanyTvShows({ ...payload, page, id: +companyId }));
  };

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useLangEffect(() => {
    if (page !== prevPage) {
      sendRequest();
    }
  }, [page]);

  useLangEffect(() => {
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
    setFilters(filters);
  };

  const onFilterByDate = (year: string) => {
    setFilters({ ...filters, year });
  };

  const onSortBy = (sortBy: string) => {
    setFilters({ ...filters, sortBy });
  };

  const onResetFilters = () => {
    setFilters(initTvShowsFilters());
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
            propFilterValues={filters}
            typeList={MediaType.TV}
            handleSelectGenres={onSelectGenre}
            handleClickAdult={onClickAdult}
            handleResetFilters={onResetFilters}
            handleSortBy={onSortBy}
            handleFilterByDate={onFilterByDate}
          />
          <MediaList
            movieListTitle={`${t('list.tvShows.total')} (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.TV}
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
