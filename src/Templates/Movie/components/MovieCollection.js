import React from 'react';
import PropTypes from 'prop-types';
import MovieItem from './../../MediaList/MediaItem';

const MovieCollection = (movie) => (
  <div
    className='collection'
    style={{
      backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (Math.round(Math.random())
        ? (movie.collection.backdrop_path || movie.collection.poster_path)
        : (movie.collection.poster_path || movie.collection.backdrop_path)) + ')'
    }}
  >
    <div className='bg-base' />
    <div className='collection__data'>
      <div className='container'>
        <h3 className='collection__title'>{movie.collection.name}</h3>
        <p className='collection__overview'>{movie.collection.overview}</p>
        <div className='collection__list tooltip-parent'>
          {movie.collection.parts.sort((a, b) => {
	                    if (a.release_date === null) return 1;
	                    if (b.release_date === null) return -1;
	                    if (new Date(a.release_date) === new Date(b.release_date)) return 0;
	                    return new Date(a.release_date) < new Date(b.release_date) ? -1 : 1;
          }).map((el, index) =>
            (<MovieItem
              title={el.title}
              original_title={el.original_title}
              overview={el.overview}
              voteAverage={el.vote_average}
              date={el.release_date}
              poster={el.poster_path}
              id={el.id}
              key={index}
              genres={el.genre_ids}
              typeList='movie'
            />)
          )}
        </div>
      </div>
    </div>
  </div>
);

MovieCollection.propTypes = {
  collection: PropTypes.object
};

export default (MovieCollection);
