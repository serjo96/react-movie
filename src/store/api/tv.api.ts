import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TvShow } from 'tmdb-typescript-api';

import oldClient from '~/core/api/OldClient';
import {
  loadAiringTV,
  loadOnTheAirTV,
  loadPopularTV,
  loadSeasonTV,
  loadTopTV,
  takeEngTvData,
  takeTvData
} from '~/store/actions/tv-actions';
import { Languages } from '~/store/Reducers/generalReducer';
import ConcatPages from '~/utils/concatPages';

export function onLoadTV (id: string, lang = Languages.RU): ThunkAction<void, unknown, unknown, AnyAction> {
  return async dispatch => {
    const { data, isSuccessRequest } = await oldClient.get(`tv/${id}`,
      {
        language: lang,
        include_image_language: 'ru,null',
        append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
      }
    );
    if (lang === Languages.RU) {
      dispatch(takeTvData({ data: data, status: isSuccessRequest }));
    } else {
      dispatch(takeEngTvData(data));
    }
  };
}

export function tvAiring (page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async dispatch => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('tv/airing_today',
        {
          language: Languages.RU,
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/airing_today',
        {
          language: Languages.RU,
          page: page + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvShow>({ firstPage, secondPage });
    dispatch(loadAiringTV({
      data: concatPages,
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function tvPopular (
  page = 1,
  genre: string,
  sortType = 'popularity.desc',
  date: string
): ThunkAction<void, unknown, unknown, AnyAction> {
  const year = `${date}`;
  let singleYear: string | undefined;
  let rageDates;
  let startRangeDate: string | undefined;
  let endRangeDate: string | undefined;
  if (year && year.split('-').length > 1) {
    rageDates = year.split('-');
    startRangeDate = rageDates[0] ? rageDates[0] : '';
    endRangeDate = rageDates[1];
  }

  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('discover/tv',
        {
          language: 'ru-RU',
          sort_by: sortType,
          with_genres: genre,
          first_air_date_year: year,
          'first_air_date.gte': startRangeDate,
          'first_air_date.lte': endRangeDate,
          page: page
        }),
      oldClient.get('discover/tv',
        {
          language: 'ru-RU',
          sort_by: sortType,
          with_genres: genre,
          first_air_date_year: singleYear,
          'first_air_date.gte': startRangeDate,
          'first_air_date.lte': endRangeDate,
          page: page + 1
        })
    ]);
    const concatPages = ConcatPages<TvShow>({ firstPage, secondPage });
    dispatch(loadPopularTV({
      data: { ...concatPages, sortByDate: date },
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function tvOnTheAir (page = 1, lang = Languages.RU): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('tv/on_the_air',
        {
          language: lang,
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/on_the_air',
        {
          language: lang,
          page: page + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvShow>({ firstPage, secondPage });
    dispatch(loadOnTheAirTV({
      data: concatPages,
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function tvTop (page = 1, lang = Languages.RU): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('tv/top_rated',
        {
          language: lang,
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/top_rated',
        {
          language: lang,
          page: page + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvShow>({ firstPage, secondPage });
    dispatch(loadTopTV({
      data: concatPages,
      status: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    }));
  };
}

export function onSeasonTV (id: string, season: number, lang = Languages.RU): ThunkAction<void, unknown, unknown, AnyAction> {
  return (dispatch) => {
    oldClient.get(`tv/${id}/season/${season}`,
      {
        language: lang,
        include_image_language: 'ru,null',
        append_to_response: 'credits, external_ids,images,videos'
      }
    ).then(response => {
      dispatch(loadSeasonTV(response.data));
    });
  };
}
