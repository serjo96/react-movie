import React from 'react';
import { Link } from 'react-router-dom';

import { ListData } from '~/core/types/listData';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';
import { MediaType } from '~/core/types/media-type';
import { SearchResultItem } from '~/core/types/search';
import { Crew } from '~/core/types/crew';

import { friendlyData } from '~/utils/format';
import MediaItem from '~/ui-components/media-item/media-item';
import './media-list.sass';

interface MyProps {
  mediaList: ListData<MoviesListItem | TvListItem | SearchResultItem | Crew>
  typeList: MediaType;
  count?: number;
  movieListTitle: string;
  movieListMain?: boolean;
  listLink?: string;
}

type ItemType = MoviesListItem & TvListItem & SearchResultItem & Crew & {mediaType?: MediaType};

const MediaList = ({
  movieListMain,
  listLink,
  count,
  typeList,
  mediaList,
  movieListTitle
}: MyProps) => {
  const RenderListTitle = () => {
    if (movieListMain) {
      return (
        <Link
          className='title-link link-angle'
          to={`/movies/${listLink}`}
        >
          <span>{movieListTitle}</span>
          <i className='fa fa-angle-right' aria-hidden='true' />
        </Link>
      );
    }
    return (
      <div>
        <span>{movieListTitle}</span>
      </div>
    );
  };

  const renderMovie = (item: ItemType, index: number) => {
    // show only 11 movies on main page
    if (count && index > count) {
      return null;
    }

    return (
      <MediaItem
        id={item.id}
        key={index}
        title={item.title || item.name}
        originalTitle={item.originalTitle || item.originalName}
        overview={item.overview}
        voteAverage={item.voteAverage}
        poster={item.profilePath || item.posterPath}
        date={item.releaseDate || item.firstAirDate}
        genres={item.genreIds}
        typeList={item.mediaType || typeList}
      />
    );
  };

  const RenderDataRange = () => {
    if (!mediaList.dates) {
      return null;
    }
    return (
      <div className='movies__data-range'>
        {friendlyData(mediaList.dates.minimum)} - {friendlyData(mediaList.dates.maximum)}
      </div>
    );
  };

  return (
    <div className='movies'>
      <div className='movies__header'>
        <h2 className='movies__title-list'>
          <RenderListTitle />
        </h2>
        <RenderDataRange />
      </div>

      <div className='movies__list'>
        {mediaList.results.map((item, index) => renderMovie(item as ItemType, index))}
      </div>

    </div>
  );
};

export default MediaList;
