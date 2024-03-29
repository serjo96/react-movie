import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import SwiperCore, {
  Navigation
} from 'swiper';

import { MovieDetails } from '~/core/types/movieDetails';
import { TvDetails } from '~/core/types/tvDetails';
import { MediaType } from '~/core/types/media-type';
import './media-recommendations.sass';
import MediaItem from '~/ui-components/media-item/media-item';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';

interface MyProps {
  recommendations: MovieDetails['recommendations'] | TvDetails['recommendations'];
  typeList: MediaType;
  listName: string;
}

SwiperCore.use([Navigation]);

const MediaRecommendations = ({
  recommendations,
  typeList,
  listName
}: MyProps) => {
  if (!recommendations.totalResults) {
    return null;
  }
  const SwiperBreakpointParam = {
    320: {
      slidesPerView: 2
    },
    460: {
      slidesPerView: 3
    },
    560: {
      slidesPerView: 4
    },
    963: {
      slidesPerView: 5
    },
    1200: {
      slidesPerView: 7
    }
  };

  const swiperClass = classNames('recommendations__slider', {
    'slider-container--centered': recommendations.totalResults < 10
  });

  return (
    <section className='recommendations'>
      <h3 className='recommendations__title'>{listName}</h3>
      <div className='recommendations__list tooltip-parent'>
        <Swiper
          breakpoints={SwiperBreakpointParam}
          className={swiperClass}
          spaceBetween={20}
          navigation={recommendations.totalResults > 10 ? {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
            disabledClass: 'slider-button--isDisabled'
          } : false}
        >
          {recommendations.totalResults > 10 && (
            <React.Fragment>
              <div className='slider-button-next' />
              <div className='slider-button-prev' />
            </React.Fragment>
          )}

          {recommendations.results.map((el: MoviesListItem & TvListItem, index) => (
            <SwiperSlide key={index}>
              <MediaItem
                title={el.title || el.name}
                originalTitle={el.originalTitle || el.originalName}
                overview={el.overview}
                voteAverage={el.voteAverage}
                date={el.releaseDate || el.firstAirDate}
                poster={el.posterPath}
                id={el.id}
                genres={el.genreIds}
                typeList={typeList}
              />
            </SwiperSlide>)
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default (MediaRecommendations);
