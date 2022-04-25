import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import FilterList from '~/templates/filters/containers/filter-list';
import ServiceBlock from '~/templates/service/service-block';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';

import { getTvShowsList } from '~/store/tv/tv.api';
import { MediaType } from '~/core/types/media-type';

import { scrollToTop } from '~/utils';
import { useLangEffect } from '~/hooks/useLangEffect';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usePrevious } from '~/hooks/usePrevious';

function TvShowsAll () {
  const { t } = useTranslation('lists');
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const prevProps = usePrevious(search);
  const { isFetching, isSuccessful, data } = useAppSelector((state) => state.tvShows.lists.all);

  const sendRequest = () => {
    let page = queryString.parse(search, { parseNumbers: true }).page as number;

    if (page <= 2) {
      page += 1;
    } else if (page === 3) {
      page += 2;
    } else if (page >= 4) {
      page = page + page - 1;
    }

    const payload = {
      genre: queryString.parse(search, { parseNumbers: true }).genre as number,
      sortBy: queryString.parse(search).sort_by as string,
      date: queryString.parse(search).year as string,
      region: queryString.parse(search).country as string,
      adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
      page
    };
    appDispatch(getTvShowsList(payload));
  };

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useLangEffect(() => {
    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [search]);

  return (
    <main className='main main--media-list'>
      <Helmet>
        <title>Movie base | {t('list.tvShows.all')}</title>
      </Helmet>

      <div className='movies-content'>
        <FilterList
          typeList={MediaType.TV}
        />
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >

          <MediaList
            movieListTitle={`${t('list.tvShows.total')} (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.TV}
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

export default TvShowsAll;
