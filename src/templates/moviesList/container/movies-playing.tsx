import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '~/templates/service/service-block';

import { getPlayingMovies } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { usePrevious } from '~/hooks/usePrevious';
import { useLangEffect } from '~/hooks/useLangEffect';
import { scrollToTop } from '~/utils';

function MoviePlaying () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();

  const prevProps = usePrevious(search || '');
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.movies.lists.playing);
  const sendRequest = () => {
    let page = queryString.parse(search, { parseNumbers: true }).page as number;

    if (page <= 2) {
      page += 1;
    } else if (page === 3) {
      page += 2;
    } else if (page >= 4) {
      page = page + page - 1;
    }

    appDispatch(getPlayingMovies(page));
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
        <title>В прокате</title>
      </Helmet>

      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccessful}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`Сейчас в кино (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.MOVIE}
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

export default MoviePlaying;
