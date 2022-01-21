import React from 'react';
import { Link } from 'react-router-dom';

import { ListData } from '~/core/types/listData';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';
import ActionPayloadData from '~/core/types/actionPayloadData';

import { friendlyData } from '~/utils/format';
import MovieItem from '~/templates/moviesList/components/Item/MovieItem';
import './moviesList.sass';
import { MediaType } from '~/core/types/media-type';

interface MyProps {
  mediaList: ActionPayloadData<ListData<MoviesListItem | TvListItem>>
  typeList: MediaType;
  count: number;
  movieListTitle: string;
  movieListMain: boolean;
  ListLink: string;
}

const MoviesList = ({
  movieListMain,
  ListLink,
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
          to={`/movies/${ListLink}`}
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

  const renderMovie = (item: MoviesListItem | TvListItem, index: number) => {
    // show only 11 movies on main page
    if (count && index > count) {
      return null;
    }

    return (
      <MovieItem
        id={item.id}
        key={index}
        title={item.title || item.name}
        original_title={item.originalTitle || item.originalName}
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
    if (!mediaList.data.dates) {
      return null;
    }
    return (
      <div className='movies__data-range'>
        {friendlyData(mediaList.data.dates.minimum)} - {friendlyData(mediaList.data.dates.maximum)}
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
        {mediaList.data.results.map((item, index) => renderMovie(item, index))}
      </div>

    </div>
  );
};

export default MoviesList;
