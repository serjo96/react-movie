import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  getMoviesList,
  getPlayingMovies,
  getTopMovies,
  getUpcomingMovies
} from '~/store/movies/movies.api';
import { MoviesListType } from '~/core/types/movies';
import { MediaType } from '~/core/types/media-type';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useLangEffect } from '~/hooks/useLangEffect';

import MediaList from '~/ui-components/media-list/media-list';
import ServiceBlock from '~/templates/service/service-block';
import MovieListSection from '~/templates/main/movie-list-section';

function Main () {
  const appDispatch = useAppDispatch();
  const { t } = useTranslation();
  const playing = useAppSelector(state => state.movies.lists.playing);
  const upcoming = useAppSelector(state => state.movies.lists.upcoming);
  const top = useAppSelector(state => state.movies.lists.top);
  const all = useAppSelector(state => state.movies.lists.all);
  const allFetched = [!playing.isFetching, !upcoming.isFetching, !all.isFetching, !top.isFetching].every(el => el);

  useLangEffect(() => {
    if (allFetched) {
      appDispatch(getPlayingMovies());
      appDispatch(getUpcomingMovies());
      appDispatch(getTopMovies());
      appDispatch(getMoviesList());
    }
  }, []);

  const playingFetch = () => appDispatch(getPlayingMovies());
  const upcomingFetch = () => appDispatch(getUpcomingMovies());
  const topFetch = () => appDispatch(getTopMovies());
  const allMoviesListFetch = () => appDispatch(getMoviesList());

  // TODO: Add service block for handle rejected requests
  return (
    <main className='main main--media-list iphonex'>
      <div className='movies-content movies-content--main-page'>
        <MovieListSection
          title={t('nav.movies.playing')}
          listStatus={playing.isFetching || !playing.isSuccessful}
          typeList={MoviesListType.PLAYING}
        >
          <ServiceBlock
            sectionService
            isSuccessful={playing.isSuccessful}
            isLoading={playing.isFetching}
            fetch={playingFetch}
          >
            <MediaList
              mediaList={playing.data.results}
              mediaListDates={playing.data.dates}
              count={11}
              typeList={MediaType.MOVIE}
            />
          </ServiceBlock>
        </MovieListSection>

        <MovieListSection
          title={t('nav.movies.upcoming')}
          listStatus={upcoming.isFetching || !upcoming.isSuccessful}
          typeList={MoviesListType.UPCOMING}
        >
          <ServiceBlock
            sectionService
            isSuccessful={upcoming.isSuccessful}
            isLoading={upcoming.isFetching}
            fetch={upcomingFetch}
          >
            <MediaList
              mediaList={upcoming.data.results}
              count={11}
              typeList={MediaType.MOVIE}
            />
          </ServiceBlock>
        </MovieListSection>

        <MovieListSection
          title={t('nav.movies.top')}
          listStatus={top.isFetching || !top.isSuccessful}
          typeList={MoviesListType.TOP}
        >
          <ServiceBlock
            sectionService
            isSuccessful={top.isSuccessful}
            isLoading={top.isFetching}
            fetch={topFetch}
          >
            <MediaList
              mediaList={top.data.results}
              count={11}
              typeList={MediaType.MOVIE}
            />
          </ServiceBlock>
        </MovieListSection>

        <MovieListSection
          title={t('nav.movies.all')}
          listStatus={all.isFetching || !all.isSuccessful}
          typeList={MoviesListType.ALL}
        >
          <ServiceBlock
            sectionService
            isSuccessful={all.isSuccessful}
            isLoading={all.isFetching}
            fetch={allMoviesListFetch}
          >
            <MediaList
              mediaList={all.data.results}
              count={11}
              typeList={MediaType.MOVIE}
            />
          </ServiceBlock>
        </MovieListSection>
      </div>
    </main>
  );
}

export default Main;
