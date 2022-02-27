import React from 'react';
import { Collection } from '~/core/types/collection';
import { MediaType } from '~/core/types/media-type';
import MediaItem from '~/ui-components/media-item/media-item';

import './movie-collection.sass';

const MovieCollection = ({ collection }: {collection: Collection}) => {
  if (!collection || !collection.parts.length) {
    return null;
  }
  const randomBackgroundImg = 'url(https://image.tmdb.org/t/p/original' + (Math.random() < 0.5
    ? (collection.backdropPath || collection.posterPath)
    : (collection.posterPath || collection.backdropPath)) + ')';

  return (
    <section
      className='collection'
      style={{
        backgroundImage: randomBackgroundImg
      }}
    >
      <div className='bg-base' />
      <div className='collection__data'>
        <div className='container'>
          <h3 className='collection__title'>{collection.name}</h3>
          <p className='collection__overview'>{collection.overview}</p>
          <div className='collection__list tooltip-parent'>
            {collection.parts.map((el, index) => (
              <MediaItem
                title={el.title}
                originalTitle={el.originalTitle}
                overview={el.overview}
                voteAverage={el.voteAverage}
                date={el.releaseDate}
                poster={el.posterPath}
                id={el.id}
                key={index}
                genres={el.genreIds}
                typeList={MediaType.MOVIE}
              />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default (MovieCollection);
