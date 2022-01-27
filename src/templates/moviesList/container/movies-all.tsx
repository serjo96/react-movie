import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import { MediaType } from '~/core/types/media-type';
import { getMoviesList } from '~/store/movies/movies.api';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import FilterList from '~/templates/Filters/containers/filter-list';
import ServiceBlock from '~/templates/Service/ServiceBlock';
import MoviesList from '~/templates/moviesList/components/list/moviesList';
import { firstOrderObjectValue } from '~/utils/format';

function MoviesAll () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const [prevProps] = useState(search);
  const { isFetching, isSuccess, data } = useAppSelector((state) => state.movies.lists.all);
  const getUrlObjectState = {
    genre: queryString.parse(search, { parseNumbers: true }).genre as number,
    adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
    page: queryString.parse(search, { parseNumbers: true }).page as number,
    country: queryString.parse(search).country as string,
    sort_by: queryString.parse(search).sort_by as string,
    year: queryString.parse(search).year as string
  };

  const sendRequest = () => {
    const page = getUrlObjectState.page;

    const UrlStateObj = {
      page: getUrlObjectState.page,
      country: getUrlObjectState.country,
      genres: getUrlObjectState.genre,
      sort_by: getUrlObjectState.sort_by,
      year: getUrlObjectState.year,
      adult: getUrlObjectState.adult
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

    const payload = {
      page: UrlStateObj.page,
      genre: UrlStateObj.genres,
      sortType: UrlStateObj.sort_by,
      date: UrlStateObj.year,
      region: UrlStateObj.country,
      adult: UrlStateObj.adult
    };
    appDispatch(getMoviesList(payload));
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
    let urlObj = { ...getUrlObjectState, page: getUrlObjectState.page };

    if (getUrlObjectState.page > 2) {
      urlObj.page = getUrlObjectState.page - 1;
    }
    urlObj = firstOrderObjectValue('page', urlObj);

    if (getUrlObjectState.page <= 2) {
      delete urlObj.page;
    }

    history.push({
      search: queryString.stringify(urlObj)
    });
  };

  const nextPage = () => {
    let urlObj = { ...getUrlObjectState, page: 2 };

    if (getUrlObjectState.page >= 2) {
      urlObj.page = getUrlObjectState.page + 1;
    }

    urlObj = firstOrderObjectValue('page', urlObj);
    history.push({
      search: queryString.stringify(urlObj, { sort: false })
    });
  };

  return (
    <main className='main main--media-list'>
      <Helmet>
        <title>Фильмы</title>
      </Helmet>
      <div className='movies-content'>
        <FilterList
          sortByCountry
          safeFilter
          typeList={MediaType.MOVIE}
        />
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccess}
          fetch={sendRequest}
        >
          <MoviesList
            movieListTitle={`Всего фильмов (${data.totalResults})`}
            mediaList={data}
            typeList={MediaType.MOVIE}
          />

          <PageSwitcher
            page={data.page}
            totalPages={data.totalPages}
            handlePrevPage={prevPage}
            handleNextPage={nextPage}
          />

        </ServiceBlock>
      </div>
    </main>
  );
}

export default MoviesAll;
