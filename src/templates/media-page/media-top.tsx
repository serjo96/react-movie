import React, { useState } from 'react';
import NoImg from '~/assets/images/noImg.png';
import NoImgEng from '~/assets/images/noImgEng.png';

import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import classNames from 'classnames';
import { Languages } from '~/store/config/config.slice';
import useTranslations from '~/hooks/useTranslations';

import './media-top.sass';

interface MyProps {
  title: string;
  originalTitle: string;
  backdrop: string;
  poster: string;
  releaseDate?: string;
  tagline: string;
  seasonTitle?: string;
  children: React.ReactNode
}

const MediaTop = ({
  title,
  originalTitle,
  backdrop,
  poster,
  releaseDate,
  tagline,
  seasonTitle,
  children
}: MyProps) => {
  const [isLoadedPoster, setLoadedPoster] = useState(true);
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];
  const { active } = useBreakpoints();
  const { lang } = useTranslations();
  const defaultNoImg = lang === Languages.RU ? NoImg : NoImgEng;

  const posterImg = () => {
    if (!poster || !backdrop) {
      return defaultNoImg;
    }
    let path = 'https://image.tmdb.org/t/p/original/';

    if (mobileBreakpoints.includes(active)) {
      path = 'https://image.tmdb.org/t/p/w185/';
    }
    return `${path}${(poster || backdrop)}`;
  };

  const bgImage = () => {
    if (!backdrop || !poster) {
      return defaultNoImg;
    }
    let path = 'https://image.tmdb.org/t/p/original';

    if (mobileBreakpoints.includes(active)) {
      path = 'https://image.tmdb.org/t/p/w1280';
    }

    return `url(${path}${(backdrop || poster)})`;
  };

  const onMobilePosterLoad = () => {
    setLoadedPoster(false);
  };

  const bgPosterClasses = classNames('movie-cover', {
    'img-loading': isLoadedPoster
  });
  const mobilePosterClasses = classNames({
    'img-loading': isLoadedPoster
  });

  return (
    <section className='media-top'>
      <div
        className={bgPosterClasses}
        style={{ backgroundImage: bgImage() }}
      />
      <div className='movie-info'>
        <div className='shadow-base'>

          <div className='container'>
            <div className='movie__summary'>
              <div className='mobile-poster'>
                <img
                  onLoad={onMobilePosterLoad}
                  className={mobilePosterClasses}
                  src={posterImg()}
                  alt='poster'
                />
              </div>
              <div className='media-titles'>
                <h1 className='media-titles__title'>{title}</h1>
                <h2 className='media-titles__original-title'>{(originalTitle !== title) && originalTitle}</h2>
                {seasonTitle && <div className='season-title'>{seasonTitle}</div>}
                <span className='media-titles__year'>{releaseDate ? releaseDate.substring(0, 4) : '-'}</span>
                <div className='media-titles__tagline'>{tagline}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='movie-ratings-wrap'>
          <div className='container'>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaTop;
