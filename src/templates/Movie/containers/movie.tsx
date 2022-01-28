import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Languages } from '~/store/Reducers/generalReducer';
import { getMovieData, getMovieEngOverview } from '~/store/movies/movies.api';
import MediaStills from '~/templates/media-page/media-stills';
import MediaCast from '~/templates//media-page/media-cast';
import MediaTop from '~/templates/media-page/media-top';
import MovieAside from '~/templates/Movie/components/movie-aside';
import { MovieSummary } from '~/templates/Movie/components/movie-summary';
import ServiceBlock from '~/templates/service/service-block';
import MediaRecommendations from '~/templates/media-page/media-recommendations';
import MovieCollection from '~/templates/Movie/components/movie-collection';
import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { VideosSection } from '~/ui-components/video-section/videos-section';
import { MediaType } from '~/core/types/media-type';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';

function Movie () {
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const [prevProps] = useState(id);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.movies);
  const movie = data;

  const sendRequest = () => {
    const movieId = id.split('-').pop();
    appDispatch(getMovieData({ id: movieId }));
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    appDispatch(getMovieEngOverview({ id: `${this.props.movie.id}`, lang: Languages.EN }));
  };

  return (
    <ServiceBlock
      isLoading={isFetching}
      isSuccessful={isSuccessful}
      fetch={sendRequest}
    >
      <div className='movie'>
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

        <MovieCollection collection={movie.collection} />
        <MediaRecommendations
          recommendations={movie.recommendations}
          listName='Вам может понравиться'
          typeList={MediaType.MOVIE}
        />
      </div>
    </ServiceBlock>
  );
}

export default Movie;
