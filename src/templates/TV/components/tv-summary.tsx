import React from 'react';
import { declOfNum, formatTime, friendlyData, kFormatter } from '~/utils/format';
import { useAppSelector } from '~/hooks/storeHooks';

export const TvSummary = () => {
  const { voteAverage, voteCount, popularity, runtime, budget, lists, revenue, releaseDate } = useAppSelector(state => state.movies.data);
  return (
    <div className='summary-ratings'>
      <div className='ratings'>
        <div className='summary-mobile-line'>
          <div className='rating summary-item'>
            <div className={'icon fa fa-heart rating-' + Math.ceil(tv.vote_average)} />
            <div className='vote-numbers'>
              <div className='rating__vote-count summary-item__title'>{tv.vote_average} из 10</div>
              <div className='rating__count'>{kFormatter(tv.vote_count)} {declOfNum(tv.vote_count, ['голос', 'голоса', 'голосов'])}</div>
            </div>
          </div>
        </div>
        <div className='summary-mobile-line'>
          <div className='popularity summary-item'>
            <div className='summary-item__title'>Популярность</div>
            <div className='summary-item__number'>{tv.popularity.toFixed(1)}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Продолжительность серий</div>
            <div className='summary-item__number'>{tv.runtime.length > 1 ? 'от ' + tv.runtime.sort()[0] + ' до ' + tv.runtime.sort()[tv.runtime.length - 1] + ' мин' : tv.runtime + ' мин'}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Количество сезонов</div>
            <div className='summary-item__number'>{tv.number_of_seasons ? tv.number_of_seasons : '-'}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Последняя серия</div>
            <div className='summary-item__number'>{tv.seasons.length > 0 ? tv.seasons[tv.seasons.length - 1].air_date !== null ? tv.seasons[tv.seasons.length - 1].season_number + ' сезон ' + tv.seasons[tv.seasons.length - 1].episode_count + ' серия' : tv.seasons[tv.seasons.length - 1].season_number + ' сезон ' + tv.seasons[tv.seasons.length - 1].episode_count + ' серия' : '-'}</div>
          </div>
          <div className='summary-item summary-item--status'>
            <div className='summary-item__title'>Статус</div>
            <div className='summary-item__number'>{tv.in_production ? 'Идет ' + tv.number_of_seasons + ' сезон' : 'Закончен'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
