import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Languages } from '~/store/config/config.slice';
import { getMovieData, getMovieEngOverview } from '~/store/movies/movies.api';
import { MediaType } from '~/core/types/media-type';

import MediaStills, { stillsType } from '~/templates/media-page/media-stills';
import MediaTop from '~/templates/media-page/media-top';
import MovieAside from '~/templates/Movie/components/movie-aside';
import { MovieSummary } from '~/templates/Movie/components/movie-summary';
import ServiceBlock from '~/templates/service/service-block';
import MediaRecommendations from '~/templates/media-page/media-recommendations';
import MediaCast from '~/templates/media-page/media-cast';
import MovieCollection from '~/templates/Movie/components/movie-collection';
import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { VideosSection } from '~/ui-components/video-section/videos-section';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { useLangEffect } from '~/hooks/useLangEffect';
import useTranslations from '~/hooks/useTranslations';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import { scrollToTop } from '~/utils';

import './movie.sass';

function MovieDetails () {
  const { active } = useBreakpoints();
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const [prevProps] = useState(id);
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.movies);
  const { lang } = useTranslations();
  const { t } = useTranslation('movie');
  const movieId = id.split('-').pop();
  const movie = data;
  const isMobile = mobileBreakpoints.includes(active);
  const videoItemsCount = isMobile ? 3 : 15;

  const sendRequest = () => {
    appDispatch(getMovieData({ id: +movieId, lang }));
  };

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useLangEffect(() => {
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

              <VideosSection itemsCount={videoItemsCount} videos={movie.videos} />

              <MediaCast cast={movie.credits.cast} />
              <MediaStills
                images={movie.images.backdrops}
                title={t('stills')}
                imgCount={16}
              />

              <MediaStills
                images={movie.images.posters}
                title={t('posters')}
                stillsVariants={stillsType.POSTERS}
                imgCount={8}
              />
            </div>
          </div>
        </div>

        <MediaRecommendations
          recommendations={movie.similar}
          listName={t('similarMovies')}
          typeList={MediaType.MOVIE}
        />

        <MovieCollection collection={movie.collection} />
        <MediaRecommendations
          recommendations={movie.recommendations}
          listName={t('recommendation')}
          typeList={MediaType.MOVIE}
        />
      </main>
    </ServiceBlock>
  );
}

export default MovieDetails;
