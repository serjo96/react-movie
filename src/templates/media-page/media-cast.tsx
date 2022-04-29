import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Scrollbar,
  Mousewheel
} from 'swiper';

import NoImgEng from '~/assets/images/noImgEng.png';
import NoImg from '~/assets/images/noImg.png';

import { friendlyUrl } from '~/utils/format';
import { Cast } from '~/core/types/cast';
import { Languages } from '~/store/config/config.slice';
import useTranslations from '~/hooks/useTranslations';
import './media-cast.sass';

SwiperCore.use([Scrollbar, Mousewheel]);

const MediaCast = ({ cast }: {cast: Cast[]}) => {
  if (!cast.length) {
    return null;
  }
  const { t } = useTranslation('mediaCommon');
  const { lang } = useTranslations();
  const defaultNoImg = lang === Languages.RU ? NoImg : NoImgEng;

  return (
    <section className='credits'>
      <div className='cast'>
        <h2 className='cast__title'>{t('cast')}</h2>

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
          scrollbar={{
            hide: false,
            draggable: true
          }}
          mousewheel={(cast.length > 7) && { sensitivity: 150 }}
        >
          {cast.map((actor, indx) => (
            <SwiperSlide key={indx}>
              <Link
                className='actor'
                to={`/person/${friendlyUrl(actor.name)}-${actor.id}`}

              >
                <div
                  className='actor__img'
                  style={{ backgroundImage: actor.profilePath ? `url(https://image.tmdb.org/t/p/w185/${actor.profilePath})` : `url(${defaultNoImg})` }}
                />
                <div className='actor__info'>
                  <div className='actor__name'>{actor.name}</div>
                  {actor.character &&
                    <div className='actor__role'>{actor.character}</div>}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default MediaCast;
