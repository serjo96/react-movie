import React from 'react';
import { declOfNum, formatTime, friendlyData, kFormatter } from '~/utils/format';
import { movieDues } from '~/utils/movieDataFormat';
import { useAppSelector } from '~/hooks/storeHooks';
import './movie-summary.sass';

export const MovieSummary = () => {
  const { voteAverage, voteCount, popularity, runtime, budget, lists, revenue, releaseDate } = useAppSelector(state => state.movies.data);
  return (
    <div className='summary-ratings'>
      <div className='ratings'>
        <div className='summary-mobile-line'>
          <div className='rating summary-item'>
            <div className={`icon fa fa-heart rating-${Math.ceil(voteAverage)}`} />
            <div className='vote-numbers'>
              <div className='rating__vote-count summary-item__title'>{voteAverage} из 10</div>
              <div className='rating__count'>{kFormatter(voteCount)} {declOfNum(voteCount, ['голос', 'голоса', 'голосов'])}</div>
            </div>
          </div>
        </div>
        <div className='summary-mobile-line'>
          <div className='popularity summary-item'>
            <div className='summary-item__title'>Популярность</div>
            <div className='summary-item__number'>{popularity.toFixed(1)}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Продолжительность</div>
            <div className='summary-item__number'>{runtime ? `${runtime}мин / ${formatTime(runtime)} мин` : '-'}</div>
          </div>

          <div className='summary-item'>
            <div className='summary-item__title'>Бюджет</div>
            <div className='summary-item__number'>{movieDues(budget)}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Сборы в мире</div>
            <div className='summary-item__number'>{movieDues(revenue)}</div>
          </div>

          <div className='summary-item summary-item--collection'>
            <div className='summary-item__title'>В коллекциях</div>
            <div className='summary-item__number'>{lists.totalResults === 0 ? '-' : lists.totalResults}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Дата выхода</div>
            <div className='summary-item__number'>{friendlyData(releaseDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
