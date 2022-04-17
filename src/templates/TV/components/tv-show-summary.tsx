import { kFormatter } from '~/utils/format';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { useAppSelector } from '~/hooks/storeHooks';

export function TvShowSummary () {
  const {
    voteAverage,
    voteCount,
    popularity,
    episodeRunTime,
    seasons,
    numberOfSeasons,
    inProduction
  } = useAppSelector(state => state.tvShows.data);
  const { t } = useTranslation(['tv', 'mediaCommon', 'common']);

  const seriesRuntime = () => {
    const runtimeSorted = [...episodeRunTime].sort();
    if (episodeRunTime.length > 1) {
      return `${t('common:commonWords.from')} ${runtimeSorted[0]} ${t('common:commonWords.until')} ${runtimeSorted[episodeRunTime.length - 1]} ${t('mediaCommon:runtime.min')}`;
    }
    return `${episodeRunTime} ${t('mediaCommon:runtime.min')}`;
  };

  const lastSeries = () => {
    if (seasons.length && seasons[seasons.length - 1].airDate) {
      return `${seasons[seasons.length - 1].seasonNumber} ${t('tv:summary.season')} ${seasons[seasons.length - 1].episodeCount} ${t('tv:summary.series')}`;
    }
    return '-';
  };
  return (
    <div className='summary-ratings'>
      <div className='ratings'>
        <div className='summary-mobile-line'>
          <div className='rating summary-item'>
            <div className={'icon fa fa-heart rating-' + Math.ceil(voteAverage)} />
            <div className='vote-numbers'>
              <div className='rating__vote-count summary-item__title'>{voteAverage} {t('common:commonWords.outOf')} 10</div>
              <div className='rating__count'>{kFormatter(voteCount)} {t('mediaCommon:summary.votes', { count: voteCount })}</div>
            </div>
          </div>
        </div>
        <div className='summary-mobile-line'>
          <div className='popularity summary-item'>
            <div className='summary-item__title'>{t('mediaCommon:summary.popularity')}</div>
            <div className='summary-item__number'>{popularity.toFixed(1)}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>{t('tv:summary.episodesLength')}</div>
            <div className='summary-item__number'>{seriesRuntime()}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>{t('tv:summary.seasons')}</div>
            <div className='summary-item__number'>{numberOfSeasons || '-'}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>{t('tv:summary.lastSeries')}</div>
            <div className='summary-item__number'>{lastSeries()}</div>
          </div>
          <div className='summary-item summary-item--status'>
            <div className='summary-item__title'>{t('tv:summary.status')}</div>
            <div className='summary-item__number'>{inProduction ? `${t('tv:summary.onTheAir')} ${numberOfSeasons} ${t('tv:summary.season')}` : t('tv:summary.ended')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
