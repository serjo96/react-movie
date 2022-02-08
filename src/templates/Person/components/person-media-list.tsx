import React, { useState } from 'react';
import classNames from 'classnames';

import MediaItem from '~/ui-components/media-item/media-item';
import { MediaType } from '~/core/types/media-type';
import { Crew } from '~/core/types/crew';
import { MovieCreditsCast, PersonCrew } from '~/core/types/perosn-details';

interface MyProps {
  title: string;
  typeList: MediaType;
  count?: number;
  listData: Array<PersonCrew | MovieCreditsCast | Crew>
}

type ItemType = PersonCrew & MovieCreditsCast & Crew

export default function PersonMediaList ({
  title,
  typeList,
  count,
  listData
}: MyProps) {
  const [listCount, setListCount] = useState(count ? count - 1 : 15);

  const loadMoreMovies = () => {
    setListCount(listCount + 14);
  };

  const renderMediaItem = (item: ItemType, index: number) => {
    return (
      <MediaItem
        title={item.title || item.name}
        originalTitle={item.originalTitle || item.originalName}
        overview={item.overview}
        voteAverage={item.voteAverage}
        poster={item.posterPath}
        date={item.releaseDate || item.firstAirDate}
        key={index}
        id={item.id}
        typeList={typeList || item.mediaType}
        genres={item.genreIds}
        job={item.job}
      />);
  };
  const filmographyListClass = classNames('filmography-list tooltip-parent', {
    'filmography-list--isMore': listData.length > 15 && listData.length > listCount + 1,
    'filmography-list--noMore': listData.length <= listCount
  });

  return (
    <div className='filmography'>
      <h2>{title}</h2>
      <div className={filmographyListClass}>
        {listData.length > listCount + 1 &&
          <div className='show-more show-more--stills'>
            <div className='show-more__btn' onClick={loadMoreMovies}>Больше</div>
          </div>}
        {listData.map((item, index) => index <= listCount && renderMediaItem(item as ItemType, index))}
      </div>
    </div>
  );
}
