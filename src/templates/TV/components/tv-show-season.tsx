import React from 'react';
import { useTranslation } from 'react-i18next';

import NoImg from '~/assets/images/noImg.png';
import NoImgEng from '~/assets/images/noImgEng.png';
import { friendlyData, kFormatter } from '~/utils/format';
import { useAppSelector } from '~/hooks/storeHooks';
import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import { Languages } from '~/store/config/config.slice';
import useTranslations from '~/hooks/useTranslations';

function TvShowSeason () {
  const { t } = useTranslation(['tv', 'mediaCommon']);
  const { active } = useBreakpoints();
  const { lang } = useTranslations();
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];
  const { isFetching, data } = useAppSelector(state => state.tvShows.tvShowSeasons);
  const isMobile = mobileBreakpoints.includes(active);
  const defaultNoImg = lang === Languages.RU ? NoImg : NoImgEng;

  return (
    <div className='season'>
      {isFetching &&
        <div className='season__wrapper'>
          <div className='season__number-series'>{`${data.episodes.length} ${t('tv:seasonData.episode', { count: data.episodes.length })}`}</div>
          <div className='episodes-list'>
            {data.episodes.map((episode, indx) => (
              <div className='episodes-list__episode episode' key={indx}>
                {!isMobile &&
                  <div
                    className='episode__img'
                    style={{ backgroundImage: `url(${episode.stillPath ? `https://image.tmdb.org/t/p/original${episode.stillPath})` : defaultNoImg}` }}
                  />}
                <div className='episode__data'>
                  <div className='episode__header'>
                    <div className='episode-header--left'>
                      <div className='episode__title'>
                        <div className='episode__number'>{`${episode.seasonNumber}x${episode.episodeNumber}`}</div>
                        <div className='episode__name'> {episode.name}</div>
                      </div>
                      <div className='episode__date'>{`${t('tv:seasonData.releaseDate')} ${episode.airDate ? friendlyData(episode.airDate) : '-'}`}</div>
                    </div>
                    <div className='episode-header--right'>
                      <div className='rating'>
                        <div className={'icon fa fa-heart rating-' + Math.ceil(episode.voteAverage)} />
                        <div className='vote-numbers'>
                          <div className='rating__vote-count'>{episode.voteAverage.toString().substring(0, 3)} из 10</div>
                          <div className='rating__count'>{kFormatter(episode.voteCount)} {t('mediaCommon:summary.votes', { count: episode.voteCount })}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='episode__overview-img-wrap'>
                    {isMobile && <div className='episode__img episode__img--mobile' style={{ backgroundImage: `url(${episode.stillPath ? `https://image.tmdb.org/t/p/original${episode.stillPath})` : defaultNoImg}` }} />}
                    <div className='episode__overview'>{episode.overview ? episode.overview : t('tv:seasonData.noDescription')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>}
    </div>

  );
}

export default TvShowSeason;
