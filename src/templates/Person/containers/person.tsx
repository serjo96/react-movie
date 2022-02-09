import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Image from '~/ui-components/image/image';
import { declOfNum, friendlyData, urlRusLat } from '~/utils/format';

import ServiceBlock from '../../service/service-block';
import MediaStills from '../../media-page/media-stills';
import PersonMediaList from '../components/person-media-list';
import { useAppDispatch, useAppSelector } from '~/hooks/storeHooks';
import PersonAside from '~/templates/Person/person-aside';
import { getPersonDetails } from '~/store/person/person.api';
import { scrollToTop } from '~/utils';
import { MediaType } from '~/core/types/media-type';
import { sortBestMediaItem } from '~/utils/sortings';
import { MovieCreditsCast, PersonCrew } from '~/core/types/perosn-details';

function Person () {
  const appDispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const [prevProps] = useState(id);
  const personId = id.split('-').pop();
  const { isFetching, isSuccessful, data } = useAppSelector(state => state.person);
  const sendRequest = () => {
    appDispatch(getPersonDetails(personId));
  };

  useEffect(() => {
    if (!isFetching) {
      sendRequest();
    }
  }, []);

  useEffect(() => {
    if (id !== prevProps) {
      sendRequest();
      scrollToTop();
    }
  }, [id]);

  const lastMovies = data.movieCredits.cast.concat().filter(a => +new Date(a.releaseDate) < +new Date()).splice(0, 3);
  const lastTV = data.tvCredits.cast.concat().filter(a => new Date(a.firstAirDate) < new Date()).splice(0, 3);
  const bestMovies = sortBestMediaItem(data.movieCredits.cast) as MovieCreditsCast[];
  const bestTV = sortBestMediaItem(data.tvCredits.cast) as PersonCrew[];
  const years = new Date().getFullYear() - new Date(data.birthday).getFullYear();
  return (
    <div className='container'>
      <div className='person main'>
        <ServiceBlock
          isLoading={isFetching}
          isSuccessful={isSuccessful}
          fetch={sendRequest}
        >
          <Helmet>
            <title>{data.name}</title>
          </Helmet>

          <h1 className='person-name'>{data.name}</h1>
          <div className='person-info'>
            <PersonAside
              profileImg={data.profilePath}
              twitterId={data.externalIds.twitterId}
            />
            <div className='person-content'>

              <div className='mobile-person-info'>
                <div className='person-photo'>
                  <Image src={data.profilePath} />
                </div>
              </div>

              <div className='person-info-table'>

                <div className='person-info-table__col'>
                  <div className='person-dates col-content'>
                    <div className='person-info-table__name-row'>Дата рождения:</div>
                    <div className='person-info-table__data-row person-dates__numbers'>
                      <div>{data.birthday ? friendlyData(data.birthday) : '-'}</div>
                      {data.deathday && <div className='death-date-hyphen'>-</div>}
                      {data.deathday && <div>{friendlyData(data.deathday)}</div>}
                    </div>
                  </div>

                  {!data.deathday &&
                    <div className='person-year col-content'>
                      {years + ' ' + declOfNum(years, ['год', 'года', 'лет'])}
                    </div>}
                </div>

                <div className='person-info-table__col col-content'>
                  <div className='person-info-table__name-row'>Место рождения:</div>
                  <div className='person-info-table__data-row'>{data.placeOfBirth}</div>
                </div>

                <div className='person-info-table__col'>
                  <div className='all-movies col-content'>
                    <div className='person-info-table__name-row'>Всего фильмов:</div>
                    <div className='person-info-table__data-row'>{data.movieCredits.cast.length}</div>
                  </div>
                </div>

                <div className='person-info-table__col col-content'>
                  <div className='person-info-table__name-row'>Всего сериалов:</div>
                  <div className='person-info-table__data-row'>{data.tvCredits.cast.length}</div>
                </div>

                <div className='person-info-table__col'>
                  <div className='last-movies col-content'>
                    <div className='person-info-table__name-row'>Последние фильмы:</div>
                    <div className='person-info-table__data-row'>
                      {lastMovies.map((e, index) => (
                        <div
                          className='last-movies__item'
                          key={index}
                        >
                          <Link className='link' to={`/movie/${urlRusLat(e.title)}-${e.id}`}>{e.title}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='person-info-table__col'>
                  <div className='last-movies col-content'>
                    <div className='person-info-table__name-row'>Лучшие фильмы:</div>
                    <div className='person-info-table__data-row'>
                      {bestMovies.length ? bestMovies.splice(0, 3).map((movie: MovieCreditsCast, index) => (
                        <div
                          className='last-movies__item'
                          key={index}
                        >
                          <Link className='link' to={`/movie/${urlRusLat(movie.title)}-${movie.id}`}>{movie.title}</Link>
                        </div>
                      )) : '-'}
                    </div>
                  </div>
                </div>

                <div className='person-info-table__col'>
                  <div className='last-movies col-content'>
                    <div className='person-info-table__name-row'>Последние шоу:</div>
                    <div className='person-info-table__data-row'>
                      {lastTV.length ? lastTV.map((e, index) => (
                        <div
                          className='last-movies__item'
                          key={index}
                        >
                          <Link className='link' to={`/tv/${urlRusLat(e.name)}-${e.id}`}>{e.name}</Link>
                        </div>
                      ))
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className='person-info-table__col'>
                  <div className='last-movies col-content'>
                    <div className='person-info-table__name-row'>Лучшие шоу:</div>
                    <div className='person-info-table__data-row'>
                      {bestTV.length
                        ? bestTV.splice(0, 3).map((e, index) => (
                          <div
                            className='last-movies__item'
                            key={index}
                          >
                            <Link className='link' to={`/tv/${urlRusLat(e.name)}-${e.id}`}>{e.name}</Link>
                          </div>))
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className='person-info-table__col'>
                  <div className='last-links col-content'>
                    <div className='person-info-table__name-row'>Ссылки:</div>
                    <div className='person-info-table__data-row person-links'>
                      {data.externalIds.facebookId &&
                        <a
                          href={`https://www.facebook.com/${data.externalIds.facebookId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='social-link'
                        >
                          Facebook
                        </a>}
                      {data.externalIds.imdbId &&
                        <a
                          href={`http://www.imdb.com/name/${data.externalIds.imdbId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='social-link'
                        >
                          imdb
                        </a>}
                      <a
                        href={`https://www.themoviedb.org/person/${data.id}`}
                        rel='noopener noreferrer'
                        target='_blank'
                        className='social-link'
                      >
                        TMDB
                      </a>
                      {data.externalIds.instagramId &&
                        <a
                          href={`https://www.instagram.com/${data.externalIds.instagramId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='social-link'
                        >
                          Instagram
                        </a>}
                      {data.externalIds.twitterId &&
                        <a
                          href={`https://www.twitter.com/${data.externalIds.twitterId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='social-link'
                        >
                          Twitter
                        </a>}
                      {data.homepage &&
                        <a
                          href={data.homepage}
                          rel='noopener noreferrer'
                          target='_blank'
                          className='social-link'
                        >
                          Домашняя старница
                        </a>}
                    </div>
                  </div>
                </div>

              </div>
              <div className='description'>
                {/* TODO: add description component */}
                <p className='description__text'>{data.biography ? data.biography : 'Биография пока не добавленна'}</p>
              </div>

              <MediaStills
                images={data.images.profiles}
                title='Фото'
                posters
                imgCount={11}
              />

              <PersonMediaList title='Фильмография' typeList={MediaType.MOVIE} listData={bestMovies} />
              <PersonMediaList title='Сериалы' typeList={MediaType.TV} listData={bestTV} />

              <PersonMediaList title='Учиствие в проектах' typeList={MediaType.MIXED} listData={data.combinedCredits.crew} />
            </div>

          </div>

        </ServiceBlock>
      </div>
    </div>
  );
}

export default Person;
