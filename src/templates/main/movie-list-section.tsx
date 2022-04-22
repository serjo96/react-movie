import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { MoviesListType } from '~/core/types/movies';
import './movie-list-section.sass';

interface MyProps {
  title: string;
  listStatus: boolean;
  typeList: MoviesListType;
  children: React.ReactNode
}

function MovieListSection ({
  title,
  listStatus,
  typeList,
  children
}: MyProps) {
  const listWrapperClass = () => classNames('movies-list-section__list', {
    'movies-list-section__list--loading': listStatus
  });

  return (
    <section className='movies-list-section'>
      <Link
        className='movies-list-section__title link-angle'
        to={`/movies/${typeList}`}
      >
        <h2>{title}</h2>
        <i className='fa fa-angle-right' aria-hidden='true' />
      </Link>
      <div className={listWrapperClass()}>
        {children}
      </div>
    </section>
  );
}

export default MovieListSection;
