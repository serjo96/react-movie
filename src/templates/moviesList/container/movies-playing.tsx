import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getPlayingMovies } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '../../service/service-block';

function MoviePlaying () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation<{id: string}>();
  const history = useHistory();
  const [prevProps] = useState(search);
  const { isFetching, isSuccess, data } = useAppSelector(state => state.movies.lists.playing);
  const getUrlObjectState = queryString.parse(search).page;

  const sendRequest = () => {
    const page = +getUrlObjectState;

    const UrlStateObj = {
      page: +getUrlObjectState
    };

    if (!page) {
      delete UrlStateObj.page;
    }

    if (page <= 2) {
      UrlStateObj.page += 1;
    } else if (page === 3) {
      UrlStateObj.page += 2;
    } else if (page >= 4) {
      UrlStateObj.page = UrlStateObj.page + UrlStateObj.page - 1;
    }

    appDispatch(getPlayingMovies(UrlStateObj.page));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }

    if (search !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [search]);

  const prevPage = () => {
    const urlObj = {
      page: +getUrlObjectState
    };

    if (+getUrlObjectState > 2) {
      urlObj.page = +getUrlObjectState - 1;
    }

    if (+getUrlObjectState <= 2) {
      delete urlObj.page;
    }

    history.push({
      search: queryString.stringify(urlObj)
    });
  };

  const nextPage = () => {
    const urlObj = {
      page: 2
    };

    if (+getUrlObjectState >= 2) {
      urlObj.page = +getUrlObjectState + 1;
    }

    history.push({
      search: queryString.stringify(urlObj)
    });
  };

  return (
    <main className='main main--media-list'>
      <Helmet>
        <title>В прокате</title>
      </Helmet>

      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccess}
        fetch={sendRequest}
      >
        <div className='movies-content'>
          <MediaList
            movieListTitle={`Сейчас в кино (${data.totalResults})`}
            mediaList={data}
            typeList={MediaType.MOVIE}
          />

          <PageSwitcher
            page={data.page}
            totalPages={data.totalPages}
            handlePrevPage={prevPage}
            handleNextPage={nextPage}
          />

        </div>
      </ServiceBlock>
    </main>
  );
}

export default MoviePlaying;
