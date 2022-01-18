import React from 'react';
import PropTypes from 'prop-types';

import NoImg from '~/assets/images/noImg.png';
import { declOfNum, kFormatter } from '~/utils/format';
import { TvSummary } from '~/templates/TV/components/tv-summary';

const TVBg = (tv) => (
  <div className='movie__bg'>
    <div className='movie__cover img-loading' style={{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (tv.bg.backdrop || tv.bg.poster) + ')' }} />
    <img className='bgPoster' src={'https://image.tmdb.org/t/p/original/' + (tv.bg.backdrop || tv.bg.poster)} alt={tv.title} onLoad={() => document.querySelector('.movie__cover').classList.remove('img-loading')} />
    <div className='movie-info'>
      <div className='shadow-base'>

        <div className='container'>

          <div className='movie__summary'>
            <div className='mobile-poster'>
              <img
                onLoad={e => e.target.classList.remove('img-loading')} className='img-loading'
                src={tv.bg.poster || tv.bg.backdrop ? `https://image.tmdb.org/t/p/w185/${(tv.bg.poster || tv.bg.backdrop)}` : NoImg}
                alt='poster'
              />
            </div>
            <h1 className={`movie__title`}>
              <div className='ru-title'>{tv.title}</div>
              <div className='original-title'>{tv.titles.original_title === tv.titles.title ? null : tv.titles.original_title}</div>
              {tv.titles.seasonTitle !== null
                ? <div className='season-title'>{tv.titles.seasonTitle}</div>
                : null}

            </h1>
            <span className='movie__year'>{tv.first_air_date ? tv.first_air_date.substring(0, 4) : '-'}</span>
            <div className='tangle'>{tv.tagline}</div>
          </div>
        </div>
      </div>
      <div className='movie-ratings-wrap'>
        <div className='container'>
          {/*<TvSummary />*/}
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
        </div>
      </div>
    </div>
  </div>
);

TVBg.propTypes = {
  name: PropTypes.string,
  original_name: PropTypes.string,
  backdrop: PropTypes.string,
  poster: PropTypes.string,
  runtime: PropTypes.array,
  budget: PropTypes.number,
  revenue: PropTypes.number,
  lists: PropTypes.object,
  release_date: PropTypes.string,
  vote_count: PropTypes.number,
  vote_average: PropTypes.number,
  popularity: PropTypes.number,
  tagline: PropTypes.string
};

export default TVBg;
