import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '~/templates/service/service-block';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';

import { getUpcomingMovies } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

import { scrollToTop } from '~/utils';
import { usePrevious } from '~/hooks/usePrevious';
import { useLangEffect } from '~/hooks/useLangEffect';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

function MovieUpcoming () {
  const appDispatch = useAppDispatch();
  const { t } = useTranslation('lists');
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
        <title>Movie base | {t('list.movies.upcoming')}</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccessful}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`${t('list.movies.upcoming')} (${data.totalResults})`}
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
