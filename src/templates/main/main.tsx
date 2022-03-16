import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

import Spinner from '~/ui-components/spinner/Spinner';
import MediaList from '~/ui-components/media-list/media-list';
import { MediaType } from '~/core/types/media-type';
import {
  getMoviesList,
  getPlayingMovies,
  getTopMovies,
  getUpcomingMovies
} from '~/store/movies/movies.api';
import { useTranslation } from 'react-i18next';

function Main () {
  const appDispatch = useAppDispatch();
  const { t } = useTranslation();
  const playing = useAppSelector(state => state.movies.lists.playing);
  const upcoming = useAppSelector(state => state.movies.lists.upcoming);
  const top = useAppSelector(state => state.movies.lists.top);
  const all = useAppSelector(state => state.movies.lists.all);
  const allFetched = [!playing.isFetching, !upcoming.isFetching, !all.isFetching, !top.isFetching].every(el => el);

  useEffect(() => {
    if (allFetched) {
      appDispatch(getPlayingMovies());
      appDispatch(getUpcomingMovies());
      appDispatch(getTopMovies());
      appDispatch(getMoviesList());
    }
  }, []);

  // TODO: Add service block for handle rejected requests
  if (allFetched) {
    return (
      <main className='main main--media-list iphonex'>
        <div className='movies-content movies-content--main-page'>
          <MediaList
            movieListTitle={t('nav.movies.playing')}
            mediaList={playing.data.results}
            mediaListDates={playing.data.dates}
            count={11}
            movieListMain
            listLink='playing'
            typeList={MediaType.MOVIE}
          />
          <MediaList
            movieListTitle={t('nav.movies.upcoming')}
            mediaList={upcoming.data.results}
            count={11}
            movieListMain
            listLink='upcoming'
            typeList={MediaType.MOVIE}
          />
          <MediaList
            movieListTitle={t('nav.movies.top')}
            mediaList={top.data.results}
            count={11}
            movieListMain={false}
            listLink='top'
            typeList={MediaType.MOVIE}
          />
          <MediaList
            movieListTitle={t('nav.movies.all')}
            mediaList={all.data.results}
            count={11}
            movieListMain
            listLink='all'
            typeList={MediaType.MOVIE}
          />
        </div>
      </main>
    );
  }
  return (<Spinner isFullScreen />);
}

export default Main;
