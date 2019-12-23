import React from 'react';
import MovieItem from './MediaItem';
import { Link } from 'react-router-dom';
import { friendlyData } from 'utils';

const MediaList = ({ movieListMain, ListLink, count, typeList, movieList, movieListTitle }) => {
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

  const renderMovie = (item, index) => {
    // show only 11 movies on main page
    if (count && index > count) {
      return null;
    }

    return (
      <MovieItem
        title={item.title || item.name}
        original_title={item.original_title || item.original_name}
        overview={item.overview}
        voteAverage={item.vote_average}
        poster={item.profile_path || item.poster_path}
        date={item.release_date || item.first_air_date}
        key={index}
        id={item.id}
        genres={item.genre_ids}
        typeList={item.media_type || typeList}
      />
    );
  };

  const RenderDataRange = () => {
    if (!movieList.data.dates) {
      return null;
    }
    return (
      <div className='movies__data-range'>
        {friendlyData(movieList.data.dates.minimum)} - {friendlyData(movieList.data.dates.maximum)}
      </div>
    );
  };

  if (!movieList.isFetching) {
    return null;
  }

  return (
    <div className='movies'>
      <div className='movies__header'>
        <h2 className='movies__title-list'>
          <RenderListTitle />
        </h2>
        <RenderDataRange />
      </div>

      <div className='movies__list tooltip-parent'>
        {movieList.data.results.map((item, index) => renderMovie(item, index))}
      </div>

    </div>
  );
};

export default MediaList;
