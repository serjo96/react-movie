import { createAsyncThunk } from '@reduxjs/toolkit';
import { TvListItem, TvListResponseData } from '~/core/types/tv';
import oldClient from '~/core/api/OldClient';
import ConcatPages from '~/utils/concatPages';
import { ListData } from '~/core/types/listData';

export interface ReturnedTvShowsList {
  data: TvListResponseData;
  isSuccess: boolean;
}

interface TvListArgs {
  page?: number;
  genre?: number;
  sortType?: string;
  date?: string;
  region?: string;
}

// TODO: add filter by status show
export const getTvShowsList = createAsyncThunk<ReturnedTvShowsList, TvListArgs | void>(
  'tv/getTvShowsList',
  async ({
    genre,
    date,
    region,
    sortType = 'popularity.desc',
    page = 1
  }: TvListArgs = {
    sortType: 'popularity.desc',
    page: 1
  }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    if (date && date.split('-').length > 1) {
      [startRangeDate, endRangeDate] = date.split('-');
    }

    const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
      oldClient.get('discover/tv',
        {
          language: 'ru-RU',
          sort_by: sortType,
          with_genres: genre,
          first_air_date_year: date,
          watch_region: region,
          'first_air_date.gte': startRangeDate,
          'first_air_date.lte': endRangeDate,
          page: page
        }),
      oldClient.get('discover/tv',
        {
          language: 'ru-RU',
          sort_by: sortType,
          with_genres: genre,
          watch_region: region,
          first_air_date_year: date,
          'first_air_date.gte': startRangeDate,
          'first_air_date.lte': endRangeDate,
          page: page + 1
        })
    ]);

    const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
    return {
      data: { ...concatPages, sortByDate: date },
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getAiringTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getAiringTvShows',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
      oldClient.get('tv/airing_today',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/airing_today',
        {
          language: 'ru-RU',
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getTopTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getTopTvShows',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
      oldClient.get('tv/top_rated',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/top_rated',
        {
          language: 'ru-RU',
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getOnTheAirTvShows = createAsyncThunk<ReturnedTvShowsList, number | void>(
  'tvShows/getOnTheAirTvShows',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<ListData<TvListItem>>([
      oldClient.get('tv/airing_today',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('tv/airing_today',
        {
          language: 'ru-RU',
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<TvListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);
