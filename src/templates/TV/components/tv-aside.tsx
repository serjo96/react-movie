import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Crew } from '~/core/types/crew';
import { friendlyUrl, friendlyData } from '~/utils/format';
import useTranslations from '~/hooks/useTranslations';
import Image from '~/ui-components/image/image';
import { TvDetails } from '~/core/types/tvDetails';
import { TvState } from '~/store/tv/tv.slice';

import '~/templates/Movie/components/movie-aside.sass';
import './tv-aside.sass';

interface MyProps {
  id: TvDetails['id'];
  poster: string;
  backdrop: string;
  createdBy: TvDetails['createdBy'];
  crew: TvState['data']['credits']['crew'];
  genres: TvDetails['genres'];
  keywords: TvDetails['keywords']['results'];
  homepage: TvDetails['homepage'];
  originCountry: TvDetails['originCountry'];
  firstAirDate: TvDetails['firstAirDate'];
  lastAirDate: TvDetails['lastAirDate'];
  inProduction: TvDetails['inProduction'];
  productionCompanies: TvDetails['productionCompanies'];
  links: TvDetails['externalIds'];
}

function TvAside ({
  id,
  poster,
  backdrop,
  createdBy,
  genres,
  keywords,
  homepage,
  originCountry,
  firstAirDate,
  lastAirDate,
  inProduction,
  productionCompanies,
  crew,
  links
}: MyProps) {
  const { t } = useTranslation(['tv', 'mediaCommon']);
  const { lang } = useTranslations();

  const renderPerson = (person: Crew, index: number) => {
    if (index > 3) {
      return null;
    }

    return (
      <div className='crew__name' key={index}>
        <Link
          to={'/person/' + friendlyUrl(person.name) + '-' + person.id}
          className=' link'
        >{person.name}
        </Link>
      </div>
    );
  };

  return (

    <aside className='aside '>
      <div className='movie__poster'>
        <Image
          showSpinner
          src={'https://image.tmdb.org/t/p/w185' + (poster || backdrop)}
          alt='poster'
        />
      </div>

      <div className='crew-list info-table-row'>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('tv:aside.creators')}</div>
          <div className='crew__names aside-row__right-col'>
            {createdBy.map(renderPerson)}
          </div>
        </div>

        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Director')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.director.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Scenario')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.screenplay.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Producer')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.producer.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Operator')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.directorOfPhotography.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Composer')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.music.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>{t('mediaCommon:aside.Art')}</div>
          <div className='crew__names aside-row__right-col'>
            {crew.art.map(renderPerson)}
          </div>
        </div>
      </div>

      <div className='tv-release-date info-table-row info-table-border'>
        <div className='aside__element-title'>{t('tv:aside.releaseDate')}</div>
        <div className='tv-release-date__date'>
          <div>{firstAirDate ? friendlyData(firstAirDate) : '-'}</div>
          <div>-</div>

          <div>{!inProduction ? lastAirDate ? friendlyData(lastAirDate) : '...' : '-'}</div>

        </div>

      </div>

      <div className='production info-table-row info-table-border'>
        <div className='aside-row'>
          <div className='production__title'>{t('mediaCommon:aside.Country')}</div>
          <div className='production__countries aside-row__right-col'>
            {originCountry.map((el, index) => (
              <div className='country' key={index}>
                <div>{el}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='production info-table-row info-table-border'>
        <div className='production-company-title'>{t('mediaCommon:aside.ProductionCompanies')}</div>
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
        <div className='genres__title'>{t('mediaCommon:aside.Genres')}</div>
        <div className='genres__list'>
          {genres.map((el, indx) => (
            <div
              className='genre'
              key={indx}
            >
              <Link
                to={`/tv/all?genre-${el.id}`}
                className='tag'
                id={`${el.id}`}
              >{el.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='keywords info-table-row'>
        <div className='keywords__title'>{t('mediaCommon:aside.Tags')}</div>
        <div className='keywords__list'>
          {keywords.map((el, indx) => (
            <Link
              className='keyword tag'
              to={`/keywords-tv/${friendlyUrl(el.name)}-${el.id}`}
              id={el.id} key={indx}
            >{el.name}
            </Link>))}
        </div>
      </div>

      <div className='movie-links info-table-row'>
        <div className='movie-links__title'>{t('mediaCommon:aside.Links')}</div>
        <div className='movie-links__list'>
          {links.imdbId &&
            <a
              href={`https://www.imdb.com/title/${links.imdbId}`}
              target='_blank'
              rel='noopener noreferrer'
              className='social-link'
            >imdb
            </a>}
          {links.tvdbId &&
            <a
              href={`https://www.thetvdb.com/?tab=series&id=${links.tvdbId}`}
              target='_blank'
              rel='noopener noreferrer'
              className='social-link'
            >tvdb
            </a>}
          <a
            href={`https://www.themoviedb.org/tv/${id}`}
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
              {t('mediaCommon:aside.homePage')}
            </a>}
        </div>
      </div>

    </aside>
  );
}

export default TvAside;
