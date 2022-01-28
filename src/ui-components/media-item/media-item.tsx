import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import TooltipInfo from '~/templates/Tooltip/tooltip-info';
import Image from '~/ui-components/image/image';

import { urlRusLat } from '~/utils/format';
import { MediaType } from '~/core/types/media-type';
import './media-item.sass';

interface MyProps {
  typeList: MediaType;
  id: number;
  title: string;
  originalTitle: string;
  poster: string;
  overview: string;
  job?: string;
  voteAverage: number;
  date: string;
  genres: number[];
}

const MediaItem = ({
  id,
  title = '',
  originalTitle = '',
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
      originalTitle={originalTitle}
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

export default MediaItem;
