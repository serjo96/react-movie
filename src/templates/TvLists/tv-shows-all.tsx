import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';


import { MoviesList } from '~/templates/moviesList/components';
import FilterList from '~/templates/filters/containers/filter-list';
import ServiceBlock from '~/templates/Service/ServiceBlock';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getTvShowsList } from '~/store/tv/tv.api';
import { firstOrderObjectValue } from '~/utils/format';
import { MediaType } from '~/core/types/media-type';

function TvShowsAll () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const history = useHistory();
  const [prevProps] = useState(search);
  const { isFetching, isSuccess, data } = useAppSelector((state) => state.tvShows.lists.all);
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
      region: UrlStateObj.country
    };
    appDispatch(getTvShowsList(payload));
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
      search: queryString.stringify(urlObj, { sort: false })
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
        <title>Популярные сериалы</title>
      </Helmet>

      <div className='movies-content'>
        <FilterList
          sortByCountry
          typeList={MediaType.TV}
        />
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccess}
          fetch={sendRequest}
        >

          <MoviesList
            movieListTitle={`Всего сериалов (${data.totalResults})`}
            mediaList={data}
            typeList={MediaType.TV}
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

export default TvShowsAll;
