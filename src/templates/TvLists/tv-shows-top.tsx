import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import {getOnTheAirTvShows, getTopTvShows} from '~/store/tv/tv.api';
import { MediaType } from '~/core/types/media-type';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '../service/service-block';

function TvShowsTop () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const [prevProps] = useState(search);
  const { isFetching, isSuccess, data } = useAppSelector(state => state.tvShows.lists.top);

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

    appDispatch(getTopTvShows(page));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <title>Топ сериалы</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccess}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle='Топ сериалы'
            mediaList={data}
            typeList={MediaType.TV}
          />
          <PageSwitcher
            page={data.page}
            totalPages={data.totalPages}
          />
        </div>
      </ServiceBlock>
    </main>
  );
}

export default TvShowsTop;
