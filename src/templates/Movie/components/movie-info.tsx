import React, { useState } from 'react';
import NoImg from '~/assets/images/noImg.png';
import './movie-info.sass';

import useBreakpoints, { BreakpointsNames } from '~/utils/useMediaQuery';
import classNames from 'classnames';

interface MyProps {
  title: string;
  originalTitle: string;
  backdrop: string;
  poster: string;
  releaseDate: string;
  tagline: string;
  children: React.ReactNode
}

const MovieInfo = ({
  title,
  originalTitle,
  backdrop,
  poster,
  releaseDate,
  tagline,
  children
}: MyProps) => {
  const [isLoadedPoster, setLoadedPoster] = useState(true);
  const mobileBreakpoints = [BreakpointsNames.MD, BreakpointsNames.SM, BreakpointsNames.XS];
  const { active } = useBreakpoints();

  const posterImg = () => {
    if (!poster || !backdrop) {
      return NoImg;
    }
    let path = 'https://image.tmdb.org/t/p/original/';

    if (mobileBreakpoints.includes(active)) {
      path = 'https://image.tmdb.org/t/p/w185/';
    }
    return `${path}${(poster || backdrop)}`;
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
    <section className='movie-top'>
      <div
        className={bgPosterClasses}
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${(backdrop || poster)})` }}
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
              <div className='movie__title'>
                <h1 className='ru-title'>{title}</h1>
                <h2 className='original-title'>{(originalTitle !== title) && originalTitle}</h2>
                {/* TODO: Uncommit after adding to tv page; */}
                {/* {tv.titles.seasonTitle && <div className='season-title'>{tv.titles.seasonTitle}</div>} */}
                <span className='movie__year'>{releaseDate.substring(0, 4)}</span>
              </div>
              <div className='tagline'>{tagline}</div>
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

export default MovieInfo;
