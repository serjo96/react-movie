import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '~/templates/service/service-block';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getUpcomingMovies } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';
import { scrollToTop } from '~/utils';
import { usePrevious } from '~/hooks/usePrevious';

function MovieUpcoming () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const prevProps = usePrevious(search);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.movies.lists.upcoming);

  const sendRequest = () => {
    let page = queryString.parse(search, { parseNumbers: true }).page as number;

    if (page <= 2) {
      page += 1;
    } else if (page === 3) {
      page += 2;
    } else if (page >= 4) {
      page = page + page - 1;
    }

    appDispatch(getUpcomingMovies(page));
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
        <title>Ожидаемые фильмы</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccessful}
        fetch={this.sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`Скоро в кино (${data.totalResults})`}
            mediaList={data.results}
            typeList={MediaType.MOVIE}
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

export default MovieUpcoming;
