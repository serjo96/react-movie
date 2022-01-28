import { createAsyncThunk } from '@reduxjs/toolkit';
import { TvListItem, TvListResponseData } from '~/core/types/tv';
import oldClient from '~/core/api/OldClient';
import ConcatPages from '~/utils/concatPages';

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

    const [firstPage, secondPage] = await oldClient.all([
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
