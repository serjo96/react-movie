import React from 'react';
import { useTranslation } from 'react-i18next';

import { calCalculationTime, formatTime, friendlyData, kFormatter } from '~/utils/format';
import { movieDues } from '~/utils/movieDataFormat';
import { useAppSelector } from '~/hooks/storeHooks';
import './movie-summary.sass';

export const MovieSummary = () => {
  const { voteAverage, voteCount, popularity, runtime, budget, lists, revenue, releaseDate } = useAppSelector(state => state.movies.data);
  const { minutes, hours } = calCalculationTime(runtime);
  const { t } = useTranslation(['movie', 'mediaCommon']);
  return (
    <div className='summary-ratings'>
      <div className='ratings'>
        <div className='summary-mobile-line'>
          <div className='rating summary-item'>
            <div className={`icon fa fa-heart rating-${Math.ceil(voteAverage)}`} />
            <div className='vote-numbers'>
              <div className='rating__vote-count summary-item__title'>{voteAverage} из 10</div>
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
            <div className='summary-item__title'>{t('movie:summary.duration')}</div>
            <div className='summary-item__number'>
              {runtime ? `${runtime} ${t('mediaCommon:runtime.min')} / ${hours} ${t('mediaCommon:runtime.hour', { count: hours })} ${minutes} ${t('mediaCommon:runtime.min')}` : '-'}
            </div>
          </div>

          <div className='summary-item'>
            <div className='summary-item__title'>{t('movie:summary.budget')}</div>
            <div className='summary-item__number'>{movieDues(budget)}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>{t('movie:summary.fees')}</div>
            <div className='summary-item__number'>{movieDues(revenue)}</div>
          </div>

          <div className='summary-item summary-item--collection'>
            <div className='summary-item__title'>{t('movie:summary.inCollections')}</div>
            <div className='summary-item__number'>{lists.totalResults === 0 ? '-' : lists.totalResults}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>{t('movie:summary.releaseDate')}</div>
            <div className='summary-item__number'>{friendlyData(releaseDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
