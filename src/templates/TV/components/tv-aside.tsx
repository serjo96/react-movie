import React from 'react';
import { Link } from 'react-router-dom';

import { friendlyUrl, friendlyData, urlRusLat } from '~/utils/format';
import Image from '~/ui-components/image/image';
import { TvDetails } from '~/core/types/tvDetails';
import { TvState } from '~/store/tv/tv.slice';
import '~/templates/Movie/components/movie-aside.sass';
import './tv-aside.sass';
import {Crew} from "~/core/types/crew";

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

  const renderPerson = (person: Crew, index: number) => {
    if(index > 3 ) {
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
    )
  }

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
          <div className='crew__job'>Создатели</div>
          <div className='crew__names aside-row__right-col'>
            {createdBy.map(renderPerson)}
          </div>
        </div>

        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Режиссер</div>
          <div className='crew__names aside-row__right-col'>
            {crew.director.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Сценарий</div>
          <div className='crew__names aside-row__right-col'>
            {crew.screenplay.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Продюсер</div>
          <div className='crew__names aside-row__right-col'>
            {crew.producer.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Оператор</div>
          <div className='crew__names aside-row__right-col'>
            {crew.directorOfPhotography.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Композитор</div>
          <div className='crew__names aside-row__right-col'>
            {crew.music.map(renderPerson)}
          </div>
        </div>
        <div className='crew__item info-table-border aside-row'>
          <div className='crew__job'>Художник</div>
          <div className='crew__names aside-row__right-col'>
            {crew.art.map(renderPerson)}
          </div>
        </div>
      </div>

      <div className='tv-release-date info-table-row info-table-border'>
        <div className='aside__element-title'>Давта выпуска</div>
        <div className='tv-release-date__date'>
          <div>{firstAirDate ? friendlyData(firstAirDate) : '-'}</div>
          <div>-</div>

          <div>{!inProduction ? lastAirDate ? friendlyData(lastAirDate) : '...' : '-'}</div>

        </div>

      </div>

      <div className='production info-table-row info-table-border'>
        <div className='aside-row'>
          <div className='production__title'>Страна</div>
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
        <div className='production-company-title'>Производители</div>
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
        <div className='genres__title'>Жанр</div>
        <div className='genres__list'>
          {genres.map((el, indx) => (
            <div
              className='genre'
              key={indx}
            >
              <Link
                to={`/tv/all?genre-${urlRusLat(el.name)}-${el.id}`}
                className='tag'
                id={`${el.id}`}
              >{el.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className='keywords info-table-row'>
        <div className='keywords__title'>Теги</div>
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
        <div className='movie-links__title'>Ссылки</div>
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
              Официальный сайт
            </a>}
        </div>
      </div>

    </aside>
  );
}

export default TvAside;
