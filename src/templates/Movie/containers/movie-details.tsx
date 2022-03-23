import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Languages } from '~/store/config/config.slice';
import { getMovieData, getMovieEngOverview } from '~/store/movies/movies.api';
import MediaStills from '~/templates/media-page/media-stills';

import MediaTop from '~/templates/media-page/media-top';
import MovieAside from '~/templates/Movie/components/movie-aside';
import { MovieSummary } from '~/templates/Movie/components/movie-summary';
import ServiceBlock from '~/templates/service/service-block';
import MediaRecommendations from '~/templates/media-page/media-recommendations';
import MediaCast from '~/templates/media-page/media-cast';
import MovieCollection from '~/templates/Movie/components/movie-collection';

import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { VideosSection } from '~/ui-components/video-section/videos-section';
import { MediaType } from '~/core/types/media-type';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import useTranslations from '~/hooks/useTranslations';
import { scrollToTop } from '~/utils';
import './movie.sass';

function MovieDetails () {
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const [prevProps] = useState(id);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.movies);
  const { lang } = useTranslations();
  const movieId = id.split('-').pop();
  const movie = data;

  const sendRequest = () => {
    appDispatch(getMovieData({ id: +movieId, lang }));
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (id !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [id]);

  const handlerOnFetchEngData = () => {
    appDispatch(getMovieEngOverview({ id: +movieId, lang: Languages.EN }));
  };

  return (
    <ServiceBlock
      isLoading={isFetching}
      isSuccessful={isSuccessful}
      fetch={sendRequest}
    >
      <main className='movie'>
        <Helmet>
          <title>{movie.title}</title>
        </Helmet>

        <MediaTop
          title={movie.title}
          originalTitle={movie.originalTitle}
          backdrop={movie.backdropPath}
          poster={movie.posterPath}
          releaseDate={movie.releaseDate}
          tagline={movie.tagline}
        >
          <MovieSummary />
        </MediaTop>

        <div className='container'>
          <div className='info-wrapper'>

            <MovieAside
              id={movie.id}
              poster={movie.posterPath}
              backdrop={movie.backdropPath}
              crew={movie.credits.crew}
              genres={movie.genres}
              keywords={movie.keywords.keywords}
              imdbId={movie.imdbId}
              homepage={movie.homepage}
              productionCountries={movie.productionCountries}
              productionCompanies={movie.productionCompanies}
            />

            <div className='overview'>
              <MovieDescription
                overview={movie.overview}
                fetchEngData={handlerOnFetchEngData}
              />

              <VideosSection videos={movie.videos} />

              <MediaCast cast={movie.credits.cast} />
              <MediaStills
                images={movie.images.backdrops}
                title='Кадры из фильма'
                imgCount={16}
              />

              <MediaStills
                images={movie.images.posters}
                title='Постеры'
                posters
                imgCount={8}
              />
            </div>
          </div>
        </div>

        <MediaRecommendations
          recommendations={movie.similar}
          listName='Похожие фильмы'
          typeList={MediaType.MOVIE}
        />

        <MovieCollection collection={movie.collection} />
        <MediaRecommendations
          recommendations={movie.recommendations}
          listName='Вам может понравиться'
          typeList={MediaType.MOVIE}
        />
      </main>
    </ServiceBlock>
  );
}

export default MovieDetails;
