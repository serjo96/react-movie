import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import FilterList from '~/templates/filters/containers/filter-list';
import ServiceBlock from '~/templates/service/service-block';
import MediaList from '~/ui-components/media-list/media-list';

import { MediaType } from '~/core/types/media-type';
import { getMoviesList } from '~/store/movies/movies.api';

import { scrollToTop } from '~/utils';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useLangEffect } from '~/hooks/useLangEffect';
import { usePrevious } from '~/hooks/usePrevious';

function MoviesAll () {
  const appDispatch = useAppDispatch();
  const { t } = useTranslation('lists');
  const { search } = useLocation();
  const prevProps = usePrevious(search);
  const { isFetching, isSuccessful, data } = useAppSelector((state) => state.movies.lists.all);

  const sendRequest = () => {
    let page = queryString.parse(search, { parseNumbers: true }).page as number;

    if (!page) {
      page = undefined;
    }

    if (page <= 2) {
      page += 1;
    } else if (page === 3) {
      page += 2;
    } else if (page >= 4) {
      page = page + page - 1;
    }

    const payload = {
      page,
      genre: queryString.parse(search, { parseNumbers: true }).genre as number,
      sortBy: queryString.parse(search).sort_by as string,
      date: queryString.parse(search).year as string,
      region: queryString.parse(search).country as string,
      adult: queryString.parse(search, { parseBooleans: true }).adult as boolean
    };
    appDispatch(getMoviesList(payload));
  };

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }

    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [search]);

  return (
    <main className='main main--media-list'>
      <Helmet>
        <title>Movie base | {t('list.movies.all')}</title>
      </Helmet>
      <div className='movies-content'>
        <FilterList
          safeFilter
          typeList={MediaType.MOVIE}
        />
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >
          <MediaList
            movieListTitle={`${t('list.movies.total')} (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.MOVIE}
          />

          <PageSwitcher
            page={data.page}
            totalPages={data.totalPages}
          />

        </ServiceBlock>
      </div>
    </main>
  );
}

export default MoviesAll;
