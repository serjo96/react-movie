import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import { getEngTvShowData, getTvShowData, getTvShowSeasons } from '~/store/tv/tv.api';
import { tvActions } from '~/store/tv/tv.slice';
import { Languages } from '~/store/config/config.slice';
import { MediaType } from '~/core/types/media-type';

import MovieDescription from '~/ui-components/MovieDescription/MovieDescription';
import { VideosSection } from '~/ui-components/video-section/videos-section';
import TvAside from '~/templates/TV/components/tv-aside';
import MediaTop from '~/templates/media-page/media-top';
import { TvShowSummary } from '~/templates/TV/components/tv-show-summary';
import TvShowSeasons from '~/templates/TV/components/tv-show-seasons';
import MediaStills from '~/templates/media-page/media-stills';
import TvShowSeason from '~/templates/TV/components/tv-show-season';
import MediaRecommendations from '~/templates/media-page/media-recommendations';
import MediaCast from '~/templates/media-page/media-cast';
import ServiceBlock from '~/templates/service/service-block';

import useTranslations from '~/hooks/useTranslations';
import { scrollToTop } from '~/utils';
import { useLangEffect } from '~/hooks/useLangEffect';

export type SeasonRouteMatchParams = {season?: string};

function TvDetails () {
  const appDispatch = useAppDispatch();
  const { lang } = useTranslations();
  const { id, season } = useParams<{id: string, season?: string}>();

  const [prevProps, setProps] = useState({ id, season });
  const { isFetching, isSuccessful, data, tvShowSeasons } = useAppSelector(state => state.tvShows);
  const tvId = id.split('-').pop();

  const sendRequest = () => {
    appDispatch(getTvShowData({ id: +tvId, lang }));
  };

  const sendSeasonRequest = () => {
    appDispatch(getTvShowSeasons({ id: +tvId, season: +season, lang }));
  };

  // TODO: Add handler for eng tv season data
  const handlerOnFetchEngData = () => {
    appDispatch(getEngTvShowData({ id: +tvId, lang: Languages.EN }));
  };

  useLangEffect(() => {
    if (season) {
      setProps({ ...prevProps, season: season });
      sendSeasonRequest();
      scrollToTop();
    }
  }, []);

  useLangEffect(() => {
    if (!isFetching) {
      sendRequest();
    }

    if (season && !tvShowSeasons.isFetching) {
      sendSeasonRequest();
      scrollToTop();
    }
  }, [id]);

  useLangEffect(() => {
    if (id !== prevProps.id) {
      // sendRequest();
      scrollToTop();
    }
  }, [id]);

  useLangEffect(() => {
    if (season && season !== prevProps.season) {
      setProps({ ...prevProps, season: season });
      sendSeasonRequest();
      scrollToTop();
    }

    return () => {
      appDispatch(tvActions.clearSerialData());
    };
  }, [season]);

  let componentsData;

  if (season) {
    componentsData = {
      poster: tvShowSeasons.data.posterPath,
      posters: tvShowSeasons.data.images.posters,
      videos: tvShowSeasons.data.videos,
      crew: tvShowSeasons.data.credits.crew,
      overview: tvShowSeasons.data.overview,
      cast: tvShowSeasons.data.credits.cast,
      firstAirDate: tvShowSeasons.data.airDate
    };
  } else {
    componentsData = {
      firstAirDate: data.firstAirDate,
      poster: data.posterPath,
      posters: data.images.posters,
      videos: data.videos,
      crew: data.credits.crew,
      overview: data.overview,
      cast: data.credits.cast
    };
  }

  return (
    <ServiceBlock
      isLoading={isFetching}
      isSuccessful={isSuccessful || tvShowSeasons.isSuccessful}
      fetch={sendRequest}
    >
      <main className='movie'>
        <Helmet>
          <title>{data.name}</title>
        </Helmet>

        <MediaTop
          title={data.name}
          originalTitle={data.originalName}
          backdrop={data.backdropPath}
          poster={componentsData.poster}
          releaseDate={componentsData.firstAirDate}
          tagline={data.tagline}
          seasonTitle={tvShowSeasons.data.name}
        >
          <TvShowSummary />
        </MediaTop>

        <div className='container'>
          <div className='info-wrapper'>

            <TvAside
              id={data.id}
              poster={componentsData.poster}
              backdrop={data.backdropPath}
              createdBy={data.createdBy}
              genres={data.genres}
              keywords={data.keywords.results}
              links={data.externalIds}
              homepage={data.homepage}
              originCountry={data.originCountry}
              firstAirDate={data.firstAirDate}
              lastAirDate={data.lastAirDate}
              inProduction={data.inProduction}
              productionCompanies={data.productionCompanies}
              crew={componentsData.crew}
            />

            <div className='overview'>
              {season &&
                <div className='prev-page-link'>
                  <Link
                    to={`/tv/${id}`}
                    className='link-angle link-angle--left'
                  >
                    <i className='fa fa-angle-left' aria-hidden='true' />
                    <span>На страницу сериала</span>
                  </Link>
                </div>}

              <div className='description'>
                <MovieDescription
                  overview={componentsData.overview}
                  fetchEngData={handlerOnFetchEngData}
                />

              </div>

              <VideosSection videos={componentsData.videos} />
              <MediaCast cast={data.credits.cast} />

              {season && <TvShowSeason />}

              <MediaStills
                images={data.images.backdrops}
                title='Кадры из сериала'
                imgCount={16}
              />

              <MediaStills
                images={componentsData.posters}
                title='Постеры'
                posters
                imgCount={8}
              />
            </div>
          </div>
        </div>

        <MediaRecommendations
          recommendations={data.similar}
          listName='Похожие сериалы'
          typeList={MediaType.TV}
        />

        <TvShowSeasons
          images={data.images.backdrops}
          seasons={data.seasons}
        />

        <MediaRecommendations
          recommendations={data.recommendations}
          listName='Вам может понравиться'
          typeList={MediaType.TV}
        />

      </main>
    </ServiceBlock>
  );
}

export default TvDetails;
