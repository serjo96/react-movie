import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import TooltipInfo from '~/templates/Tooltip/tooltip-info';
import Image from '~/ui-components/image/image';

import { urlRusLat } from '~/utils/format';
import './movieItem.sass';
import {MediaType} from "~/core/types/media-type";

interface MyProps {
  typeList: MediaType;
}

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
}: MyProps) => {
  const [tooltip, handlerHover] = useState(false);
  const parentClass = classNames('movie-item', {
    'movie-item--hover': tooltip
  });
  const linkUrl = () => `/${typeList}/${urlRusLat(title)}-${id}`;

  return (
    <TooltipInfo
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

    </TooltipInfo>
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
