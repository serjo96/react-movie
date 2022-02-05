import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import FilterList from '~/templates/filters/containers/filter-list';
import ServiceBlock from '~/templates/service/service-block';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getTvShowsList } from '~/store/tv/tv.api';
import { MediaType } from '~/core/types/media-type';
import { usePrevious } from '~/hooks/usePrevious';
import { scrollToTop } from '~/utils';

function TvShowsAll () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const prevProps = usePrevious(search);
  const { isFetching, isSuccessful, data } = useAppSelector((state) => state.tvShows.lists.all);

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
      genre: queryString.parse(search, { parseNumbers: true }).genre as number,
      sortType: queryString.parse(search).sort_by as string,
      date: queryString.parse(search).year as string,
      region: queryString.parse(search).country as string,
      adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
      page
    };
    appDispatch(getTvShowsList(payload));
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [search]);

  return (
    <main className='main main--media-list'>
      <Helmet>
        <title>Популярные сериалы</title>
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
            movieListTitle={`Всего сериалов (${data.totalResults})`}
            mediaList={data}
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
