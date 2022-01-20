import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';

import { friendlyUrl } from '~/utils/format';
import { Cast } from '~/core/types/cast';
import NoImg from '~/assets/images/noImg.png';
import './media-cast.sass';

const MediaCast = ({ cast }: {cast: Cast[]}) => {
  if (!cast.length) {
    return null;
  }

  return (
    <section className='credits'>
      <div className='cast'>
        <h2 className='cast__title'>В ролях</h2>

        <Swiper
          breakpoints={{
            963: {
              slidesPerView: 7,
              spaceBetween: 10
            },
            463: {
              setWrapperSize: false,
              slidesPerView: 4,
              spaceBetween: 0
            },
            320: {
              setWrapperSize: false,
              slidesPerView: 3,
              spaceBetween: 0
            }
          }}
          freeMode
          scrollbar={{
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true
          }}
          shouldSwiperUpdate
          mousewheel={cast.length > 7 ? { sensitivity: 150 } : false}
        >
          {cast.map((actor, indx) => (
            <Link
              className='actor'
              to={`/person/${friendlyUrl(actor.name)}-${actor.id}`}
              key={indx}
            >
              <div
                className='actor__img'
                style={{ backgroundImage: actor.profilePath ? `url(https://image.tmdb.org/t/p/w185/${actor.profilePath})` : `url(${NoImg})` }}
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
    </section>
  );
};

export default MediaCast;
