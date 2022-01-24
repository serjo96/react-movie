import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import MoviesList from '~/templates/moviesList/components/list/moviesList';
import ServiceBlock from '~/templates/Service/ServiceBlock';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getUpcomingMovies } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

function MovieUpcoming () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation<{id: string}>();
  const history = useHistory();
  const [prevProps] = useState(search);
  const { isFetching, isSuccess, data } = useAppSelector(state => state.movies.lists.upcoming);
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

    appDispatch(getUpcomingMovies(UrlStateObj.page));
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
        <title>Ожидаемые фильмы</title>
      </Helmet>
      <ServiceBlock
        isLoading={isFetching}
        isSuccessful={isSuccess}
        fetch={this.sendRequest}
      >
        <div className='movies-content'>
          <MoviesList
            movieListTitle={`Скоро в кино (${data.totalResults})`}
            mediaList={data}
            typeList={MediaType.MOVIE}
          />
          <PageSwitcher
            totalPages={data.totalPages}
            page={data.page}
            handlePrevPage={prevPage}
            handleNextPage={nextPage}
          />
        </div>
      </ServiceBlock>
    </main>
  );
}

export default MovieUpcoming;
