import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classNames';

import { urlRusLat } from 'utils';
import MovieInfo from '../../../Tooltip/MovieInfo';
import Image from 'ui/image/image';
import './movieItem.sass';

const MovieItem = ({
  id,
  title = '',
  original_title = '',
  typeList,
  poster,
  job = '',
  overview,
  voteAverage,
  date,
  genres
}) => {
  const [tooltip, handlerHover] = useState(false);
  const parentClass = classNames('movie-item', {
    'movie-item--hover': tooltip
  });
  const linkUrl = () => `/${typeList}/${urlRusLat(title)}-${id}`;

  return (
    <MovieInfo
      title={title}
      originalTitle={original_title}
      handlerHover={handlerHover}
      date={date}
      overview={overview}
      voteAverage={voteAverage}
      typeItem={typeList}
      genres={genres}
      id={id}
      className={parentClass}
    >

      <div className='movie-item__data'>
        <Link to={linkUrl}>
          <div className='movie-item__poster'>
            <Image
              src={poster}
              alt={title}
            />
          </div>
          <div className='movie-item__title'>{title}</div>
          {job && <div className='movie-item__crew'>{job}</div>}
        </Link>
      </div>

    </MovieInfo>
  );
};

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  job: PropTypes.string,
  id: PropTypes.number.isRequired,
  poster: PropTypes.string,
  voteAverage: PropTypes.number,
  overview: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  typeList: PropTypes.string.isRequired
};

export default MovieItem;
