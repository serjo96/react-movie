import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const defaultCount = 15;

export default function PersonMediaList ({
  title,
  typeList,
  count,
  listData
}: MyProps) {
  if (!listData.length) return null;
  const [listCount, setListCount] = useState(count ? count - 1 : defaultCount);
  const { t } = useTranslation();

  const loadMoreMovies = () => {
    setListCount(listCount + 14);
  };

  const renderMediaItem = (item: ItemType, index: number) => {
    const typeListData = typeList && typeList !== MediaType.MIXED ? typeList : item.mediaType;
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
        typeList={typeListData}
        genres={item.genreIds}
        job={item.job}
      />);
  };
  const filmographyListClass = classNames('filmography-list tooltip-parent', {
    'filmography-list--isMore': listData.length > defaultCount && listData.length > listCount + 1,
    'filmography-list--noMore': listData.length <= listCount
  });

  return (
    <div className='filmography'>
      <h2>{title}</h2>
      <div className={filmographyListClass}>
        {listData.length > listCount + 1 &&
          <div className='show-more show-more--stills'>
            <div className='show-more__btn' onClick={loadMoreMovies}>{t('moreButton')}</div>
          </div>}
        {listData.map((item, index) => index <= listCount && renderMediaItem(item as ItemType, index))}
      </div>
    </div>
  );
}
