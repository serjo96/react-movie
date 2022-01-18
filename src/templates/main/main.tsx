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

function Main () {
  const appDispatch = useAppDispatch();
  const playing = useAppSelector(state => state.movies.lists.playing);
  const upcoming = useAppSelector(state => state.movies.lists.upcoming);
  const top = useAppSelector(state => state.movies.lists.top);
  const all = useAppSelector(state => state.movies.lists.all);

  useEffect(() => {
    if (!playing.isFetching && !upcoming.isFetching && !all.isFetching && !top.isFetching) {
      appDispatch(getPlayingMovies());
      appDispatch(getUpcomingMovies());
      appDispatch(getTopMovies());
      appDispatch(getMoviesList());
    }
  }, []);

  if (playing.isFetching && upcoming.isFetching && all.isFetching && top.isFetching) {
    return (
      <main className='main main--media-list iphonex'>
        <div className='movies-content movies-content--main-page'>
          <MoviesList
            movieListTitle='Сейчас в кино'
            mediaList={playing}
            count={11}
            movieListMain
            ListLink='playing'
            typeList='movie'
          />
          <MoviesList
            movieListTitle='Скоро в кино'
            mediaList={upcoming}
            count={11}
            movieListMain
            ListLink='upcoming'
            typeList='movie'
          />
          <MoviesList
            movieListTitle='Топ фильмы'
            mediaList={top}
            count={11}
            movieListMain={false}
            ListLink='top'
            typeList='movie'
          />
          <MoviesList
            movieListTitle='Все фильмы'
            mediaList={all}
            count={11}
            movieListMain
            ListLink='all'
            typeList='movie'
          />
        </div>
      </main>
    );
  }
  return (<Spinner />);
}

export default Main;
