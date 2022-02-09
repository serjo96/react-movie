import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

import ServiceBlock from '../service/service-block';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { MediaType } from '~/core/types/media-type';
import { getAiringTvShows } from '~/store/tv/tv.api';
import { scrollToTop } from '~/utils';

function TvAiring () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const [prevProps] = useState(search);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.tvShows.lists.airing);

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

    appDispatch(getAiringTvShows(page));
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
        <title>Сейчас на тв</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccessful}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`Сейчас на тв (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.TV}
          />
          <PageSwitcher
            totalPages={data.totalPages}
            page={data.page}
          />
        </div>
      </ServiceBlock>
    </main>
  );
}

export default TvAiring;
