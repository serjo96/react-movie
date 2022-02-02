import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import ServiceBlock from '~/templates/service/service-block';
import MediaList from '~/ui-components/media-list/media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useLocation } from 'react-router-dom';
import { getOnTheAirTvShows } from '~/store/tv/tv.api';
import { MediaType } from '~/core/types/media-type';

function TVonTheAir () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const [prevProps] = useState(search);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.tvShows.lists.onTheAir);

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

    appDispatch(getOnTheAirTvShows(page));
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
        <title>Текущие сериалы</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccessful}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`Текущие сериалы (${data.totalResults})`}
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

export default TVonTheAir;
