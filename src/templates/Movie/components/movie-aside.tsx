import React from 'react';
import { Link } from 'react-router-dom';

import { friendlyUrl, urlRusLat } from '~/utils/format';
import { MovieDetails } from '~/core/types/movieDetails';
import { CrewState } from '~/utils/initData';
import Image from '~/ui-components/image/image';
import './movie-aside.sass';
import { useTranslation } from 'react-i18next';

interface MyProps {
  id: MovieDetails['id'];
  imdbId: MovieDetails['imdbId'];
  crew: CrewState;
  poster: string;
  backdrop: string;
  productionCompanies: MovieDetails['productionCompanies'];
  productionCountries: MovieDetails['productionCountries'];
  homepage: MovieDetails['homepage'];
  keywords: MovieDetails['keywords']['keywords'];
  genres: MovieDetails['genres'];
}

export function MovieAside ({
  crew,
  poster,
  backdrop,
  productionCountries,
  productionCompanies,
  homepage,
  keywords,
  genres,
  imdbId,
  id
}: MyProps) {
  const { t } = useTranslation('movie');
  return (
    <aside className='aside'>
      <div className='movie__poster'>
        <Image
          showSpinner
          src={'https://image.tmdb.org/t/p/w185' + (poster || backdrop)}
          alt='poster'
        />
      </div>
      <div className='crew-list info-table-row'>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Director')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.director.map((men, indx) => indx < 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >
                  {men.name}
                </Link>
              </div>)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Scenario')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.screenplay.map((men, indx) => indx < 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >
                  {men.name}
                </Link>
              </div>)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Producer')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.producer.map((men, indx) => indx < 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >{men.name}
                </Link>
              </div>)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Operator')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.directorOfPhotography.map((men, indx) => indx < 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >{men.name}
                </Link>
              </div>)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Composer')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.music.map((men, indx) => indx <= 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >{men.name}
                </Link>
              </div>)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('aside.Art')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.art.map((men, indx) => indx < 3 &&
              <div className='crew__name' key={indx}>
                <Link
                  to={'/person/' + friendlyUrl(men.name) + '-' + men.id}
                  className='link'
                >{men.name}
                </Link>
              </div>)}
          </div>
        </div>
      </div>

      <div className='production'>
        <div className='aside-row info-table-row info-table-border'>
          <div className='production__title'>{t('aside.Country')}</div>
          <div className='production__countries aside-row__right-col'>
            {productionCountries.map((el, index) => (
              <div className='country' key={index}>
                <div>{el.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='production info-table-row info-table-border'>
        <div className='production-company-title'>{t('aside.ProductionCompanies')}</div>
        <div className='production__companies'>
          {productionCompanies.map((el, index) => (
            <div className='company' key={index}>
              <Link
                className='link'
                to={`/company/${friendlyUrl(el.name)}-${el.id}`}
              >
                {el.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='genres info-table-row'>
        <div className='genres__title'>{t('aside.Genres')}</div>
        <div className='genres__list'>
          {genres.map((el, indx) => (
            <div className='genre' key={indx}>
              <Link
                to={`/movies/all?genre-${urlRusLat(el.name)}-${el.id}`}
                className='tag'
                id={el.id.toString()}
              >{el.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='keywords info-table-row'>
        <div className='keywords__title'>{t('aside.Genres')}</div>
        <div className='keywords__list'>
          {keywords.map((el, indx) => (
            <Link
              to={`/keywords-movies/${friendlyUrl(el.name)}-${el.id}`}
              className='keyword tag'
              id={el.id}
              key={indx}
            >{el.name}
            </Link>
          ))}
        </div>
      </div>

      <div className='movie-links info-table-row'>
        <div className='movie-links__title'>{t('aside.Links')}</div>
        <div className='movie-links__list'>
          {imdbId &&
            <a
              href={`https://www.imdb.com/title/${imdbId}`}
              target='_blank'
              rel='noopener noreferrer'
              className='social-link'
            >
               imdb
            </a>}
          <a
            href={`https://www.themoviedb.org/movie/${id}`}
            target='_blank'
            rel='noopener noreferrer'
            className='social-link'
          >TMDB
          </a>
          {homepage &&
            <a
              href={homepage}
              target='_blank'
              rel='noopener noreferrer'
              className='social-link'
            >
              {t('aside.homePage')}
            </a>}
        </div>
      </div>
    </aside>
  );
}

export default (MovieAside);
