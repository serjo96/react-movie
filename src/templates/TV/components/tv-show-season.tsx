import React from 'react';

import { friendlyData, kFormatter, declOfNum } from '~/utils/format';
import NoImg from '~/assets/images/noImg.png';
import { useAppSelector } from '~/hooks/storeHooks';

function TvShowSeason () {
  const { isFetching, data } = useAppSelector(state => state.tvShows.tvShowSeasons);

  return (
    <div className='season'>
      {isFetching &&
        <div className='season__wrapper'>
          <div className='season__number-series'>{`${data.episodes.length} ${data.episodes.length > 1 ? 'серий' : 'серия'}`}</div>
          <div className='episodes-list'>
            {data.episodes.map((el, indx) => (
              <div className='episodes-list__episode episode' key={indx}>
                <div className='episode__img' style={{ backgroundImage: `url(${el.stillPath ? `https://image.tmdb.org/t/p/original${el.stillPath})` : NoImg}` }} />
                <div className='episode__data'>
                  <div className='episode__header'>
                    <div className='episode-header--left'>
                      <div className='episode__title'>
                        <div className='episode__number'>{`${el.seasonNumber}x${el.episodeNumber}`}</div>
                        <div className='episode__name'> {el.name}</div>
                      </div>
                      <div className='episode__date'>{`Дата выхода ${el.airDate ? friendlyData(el.airDate) : '-'}`}</div>
                    </div>
                    <div className='episode-header--right'>
                      <div className='rating'>
                        <div className={'icon fa fa-heart rating-' + Math.ceil(el.voteAverage)} />
                        <div className='vote-numbers'>
                          <div className='rating__vote-count'>{el.voteAverage.toString().substring(0, 3)} из 10</div>
                          <div className='rating__count'>{kFormatter(el.voteCount)} {declOfNum(el.voteCount, ['голос', 'голоса', 'голосов'])}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='episode__overview-img-wrap'>
                    <div className='episode__img episode__img--mobile' style={{ backgroundImage: `url(${el.stillPath ? `https://image.tmdb.org/t/p/original${el.stillPath})` : NoImg}` }} />
                    <div className='episode__overview'>{el.overview ? el.overview : 'Описание к этой серии еще не добавлено.'}</div>
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
