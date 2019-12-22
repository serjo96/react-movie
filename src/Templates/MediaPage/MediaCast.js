import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import NoImg from 'images/NoImg.png';
import { friendlyUrl } from '../../utils/utils';

let SwiperParams;

const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

switch (true) {
  case width <= 963 && width >= 463:
    SwiperParams = {
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
      },
      setWrapperSize: false,
      slidesPerView: 4,
      spaceBetween: 0,
      freeMode: true
    };
    break;
  case width <= 463:
    SwiperParams = {
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
      },
      setWrapperSize: false,
      freeMode: true,
      slidesPerView: 3,
      spaceBetween: 0
    };
    break;

  default:
    SwiperParams = {
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
      },
      freeMode: true,
      slidesPerView: 7,
      spaceBetween: 10
    };
}

const MediaCast = (movie) => {
  if (movie.cast.length <= 0) {
    return null;
  }
  return (
    <div className='credits'>
      <div className='cast'>
        <h2 className='cast__title'>В ролях</h2>

        <Swiper
          {...SwiperParams} shouldSwiperUpdate
          mousewheel={movie.cast.length > 7 ? { sensitivity: 150 } : false}
        >
          {movie.cast.map((actor, indx) =>
            (<Link to={`/person/${friendlyUrl(actor.name)}-${actor.id}`} className='actor' key={indx}>
              <div
                className='actor__img'
                style={{ backgroundImage: actor.profile_path ? 'url(https://image.tmdb.org/t/p/w185/' + actor.profile_path + ')' : 'url(' + NoImg + ')' }}
              />
              <div className='actor__info'>
                <div className='actor__name'>{actor.name}</div>
                {actor.character &&
                  <div className='actor__role'>{actor.character}</div>}
              </div>
            </Link>)
          )}
        </Swiper>

      </div>
    </div>
  );
};

export default (MediaCast);
