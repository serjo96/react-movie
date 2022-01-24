import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

import { MoviesList } from '../moviesList/components';
import Spinner from '~/ui-components/spinner/Spinner';
import {
  getMoviesList,
  getPlayingMovies,
  getTopMovies,
  getUpcomingMovies
} from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

function Main () {
  const appDispatch = useAppDispatch();
  const playing = useAppSelector(state => state.movies.lists.playing);
  const upcoming = useAppSelector(state => state.movies.lists.upcoming);
  const top = useAppSelector(state => state.movies.lists.top);
  const all = useAppSelector(state => state.movies.lists.all);
  const allFetched = [!playing.isFetching, !upcoming.isFetching, !all.isFetching, !top.isFetching].every(el=> el);

  useEffect(() => {
    if (allFetched) {
      appDispatch(getPlayingMovies());
      appDispatch(getUpcomingMovies());
      appDispatch(getTopMovies());
      appDispatch(getMoviesList());
    }
  }, []);

  if (allFetched) {
    return (
      <main className='main main--media-list iphonex'>
        <div className='movies-content movies-content--main-page'>
          <MoviesList
            movieListTitle='Сейчас в кино'
            mediaList={playing}
            count={11}
            movieListMain
            ListLink='playing'
            typeList={MediaType.MOVIE}
          />
          <MoviesList
            movieListTitle='Скоро в кино'
            mediaList={upcoming}
            count={11}
            movieListMain
            ListLink='upcoming'
            typeList={MediaType.MOVIE}
          />
          <MoviesList
            movieListTitle='Топ фильмы'
            mediaList={top}
            count={11}
            movieListMain={false}
            ListLink='top'
            typeList={MediaType.MOVIE}
          />
          <MoviesList
            movieListTitle='Все фильмы'
            mediaList={all}
            count={11}
            movieListMain
            ListLink='all'
            typeList={MediaType.MOVIE}
          />
        </div>
      </main>
    );
  }
  return (<Spinner />);
}

export default Main;
