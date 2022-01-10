import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Movie } from 'tmdb-typescript-api';

import oldClient from '~/core/api/OldClient';
import {
  loadUpcomingMovies,
  loadPopularMovies,
  loadPlayingMovies,
  loadTopMovies,
  takeEngMovieData,
  takeMovieData
} from '~/store/actions/movies-actions';
import ConcatPages from '~/utils/concatPages';

export function movieUpcoming (page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return (dispatch) => {
    oldClient.get('movie/upcoming',
      {
        language: 'ru-RU',
        page: page,
        region: 'RU'
      }
    ).then(response => {
      dispatch(loadUpcomingMovies({ data: response.data, status: response.isSuccessRequest }));
    });
  };
}

export function movieListAll (
  page = 1,
  genre: string,
  sortType = 'popularity.desc',
  date: string,
  region: string,
  adult = false
): ThunkAction<void, unknown, unknown, AnyAction> {
  let singleYear: string | undefined;
  let rageDates;
  let startRangeDate: string | undefined;
  let endRangeDate: string | undefined;
  if (date && date.split('-').length > 1) {
    rageDates = date.split('-');
    startRangeDate = rageDates[0] ? rageDates[0] : '';
    endRangeDate = rageDates[1];
  }

  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: region,
          sort_by: sortType,
          with_genres: genre,
          primary_release_year: date,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: page,
          include_adult: adult
        }),
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: region,
          sort_by: sortType,
          with_genres: genre,
          primary_release_year: singleYear,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: page + 1,
          include_adult: adult
        })
    ]);
    const concatPages = ConcatPages<Movie>({ firstPage, secondPage });
    dispatch(loadPopularMovies({
      data: { ...concatPages, sortByDate: date },
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function movieListPlaying (page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('movie/now_playing',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/now_playing',
        {
          language: 'ru-RU',
          page: page + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<Movie>({ firstPage, secondPage });
    dispatch(loadPlayingMovies({
      data: concatPages,
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function movieListTop (page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('movie/top_rated',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/top_rated',
        {
          language: 'ru-RU',
          page: page + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<Movie>({ firstPage, secondPage });
    dispatch(loadTopMovies({
      data: concatPages,
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function onLoadMovie (id: string, lang = 'ru-RU'): ThunkAction<void, unknown, unknown, AnyAction> {
  return (dispatch) => {
    oldClient.get(`movie/${id}`,
      {
        language: lang,
        include_image_language: 'ru,null',
        append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
      }
    ).then(res => {
      if (res.data.belongs_to_collection) {
        oldClient.get('collection/' + res.data.belongs_to_collection.id,
          {
            language: lang
          }
        ).then(response => {
          const data = Object.assign({ collection: response.data }, res.data);
          dispatch(takeMovieData({ data: data, status: response.isSuccessRequest && res.isSuccessRequest }));
        });
      } else {
        if (lang === 'ru-RU') {
          dispatch(takeMovieData({ data: res.data, status: res.isSuccessRequest }));
        } else {
          dispatch(takeEngMovieData(res.data));
        }
      }
    });
  };
}
