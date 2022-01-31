import { declOfNum, kFormatter } from '~/utils/format';
import React from 'react';
import { useAppSelector } from '~/hooks/storeHooks';

export function TvShowSummary () {
  const { voteAverage, voteCount, popularity, episodeRunTime, seasons, numberOfSeasons, inProduction } = useAppSelector(state => state.tvShows.data);

  const seriesRuntime = () => {
    const runtimeSorted = episodeRunTime.sort();
    if (episodeRunTime.length > 1) {
      return `от ${runtimeSorted[0]} до ${runtimeSorted[episodeRunTime.length - 1]} мин`;
    }
    return `${episodeRunTime} мин`;
  };

  const lastSeries = () => {
    if (seasons.length && seasons[seasons.length - 1].airDate) {
      return `${seasons[seasons.length - 1].seasonNumber} сезон ${seasons[seasons.length - 1].episodeCount} серия`;
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
            <div className='summary-item__title'>Продолжительность серий</div>
            <div className='summary-item__number'>{seriesRuntime()}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Количество сезонов</div>
            <div className='summary-item__number'>{numberOfSeasons || '-'}</div>
          </div>
          <div className='summary-item'>
            <div className='summary-item__title'>Последняя серия</div>
            <div className='summary-item__number'>{lastSeries()}</div>
          </div>
          <div className='summary-item summary-item--status'>
            <div className='summary-item__title'>Статус</div>
            <div className='summary-item__number'>{inProduction ? `Идет ${numberOfSeasons} сезон` : 'Закончен'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
