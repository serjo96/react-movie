import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

import { getKeywordsMedia } from '~/store/keywords/keywords.api';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { MediaType } from '~/core/types/media-type';
import PageSwitcher from '~/ui-components/Page-switcher/Page-switcher';
import FilterList from '~/templates/filters/containers/filter-list';
import MoviesList from '~/templates/moviesList/components/list/moviesList';
import ServiceBlock from '~/templates/service/service-block';

function KeywordsPage () {
  const appDispatch = useAppDispatch();
  const { search } = useLocation();
  const { id } = useParams<{id: string}>();
  const [prevProps] = useState(search);
  const { isFetching, isSuccessful, data } = useAppSelector((state) => state.keywords);

  const isMoviesPage = useRouteMatch('/keywords-movies/:id');
  const typePage = isMoviesPage ? MediaType.MOVIE : MediaType.TV;

  const sendRequest = () => {
    const keywordId = id.split('-').pop();
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

    const payload = {
      page,
      genre: queryString.parse(search, { parseNumbers: true }).genre as number,
      sortType: queryString.parse(search).sort_by as string,
      date: queryString.parse(search).year as string,
      region: queryString.parse(search).country as string,
      adult: queryString.parse(search, { parseBooleans: true }).adult as boolean,
      type: typePage,
      keywordId
    };
    appDispatch(getKeywordsMedia(payload));
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

  const titleSearch = id.split('-')[0].replace(/_/g, ' ');
  const pageTitle = isMoviesPage ? 'Фильмы' : 'Сериалы';
  return (
    <div className='main'>
      <Helmet>
        <title>{pageTitle} по ключевому слову: {titleSearch}</title>
      </Helmet>
      <div className='movies-content'>
        <FilterList
          safeFilter
          typeList={typePage}
        />
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >
          <MoviesList
            movieListTitle={`${pageTitle} по ключевому слову: ${titleSearch} (${data.totalResults})`}
            mediaList={data}
            typeList={typePage}
          />

          <PageSwitcher
            page={data.page}
            totalPages={data.totalPages}
          />
        </ServiceBlock>

      </div>
    </div>
  );
}

export default KeywordsPage;