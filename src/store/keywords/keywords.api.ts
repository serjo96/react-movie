/* eslint-disable camelcase */
import { createAsyncThunk } from '@reduxjs/toolkit';

import oldClient from '~/core/api/OldClient';
import { KeywordsListData } from '~/store/keywords/keywords.slice';
import ConcatPages from '~/utils/concatPages';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';
import { MediaType } from '~/core/types/media-type';

type KeywordsListPayload = {
  keywordId: string,
  type: MediaType;
  sortType: string;
  page: number;
  genre?: number;
  date?: string;
  region?: string;
  adult?: boolean;
};

type KeywordsListResponse = {
  isSuccess: boolean;
  data: KeywordsListData
};

interface KeywordsQuery {
  language: 'ru-RU',
  with_keywords: string,
  sort_by: string,
  with_genres: number,
  page: number,
  with_original_language?: string,
  primary_release_year?: string,
  'primary_release_date.gte'?: string,
  'primary_release_date.lte'?: string,
  include_adult?: boolean,
  watch_region?: string,
  first_air_date_year?: string,
  'first_air_date.gte'?: string,
  'first_air_date.lte'?: string
}

export const getKeywordsMedia = createAsyncThunk<KeywordsListResponse, KeywordsListPayload>(
  'keywords/getKeywordMovies',
  async ({
    genre,
    region,
    adult,
    date,
    sortType,
    keywordId,
    type = MediaType.MOVIE,
    page = 1
  }: KeywordsListPayload = {
    keywordId: '0',
    type: MediaType.MOVIE,
    sortType: 'popularity.desc',
    adult: false,
    page: 1
  }) => {
    let query: KeywordsQuery = {
      language: 'ru-RU',
      with_keywords: keywordId,
      sort_by: sortType,
      with_original_language: region,
      with_genres: genre,
      page: page
    };
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    if (type === MediaType.MOVIE) {
      query = {
        ...query,
        primary_release_year: date,
        'primary_release_date.gte': startRangeDate,
        'primary_release_date.lte': endRangeDate,
        include_adult: adult
      };
    } else if (type === MediaType.TV) {
      query = {
        ...query,
        first_air_date_year: date,
        'first_air_date.gte': startRangeDate,
        'first_air_date.lte': endRangeDate
      };
    }

    const [firstPage, secondPage] = await oldClient.all<KeywordsListData>([
      oldClient.get(`discover/${type}`, {
        ...query
      }),
      oldClient.get(`discover/${type}`,
        {
          ...query,
          page: page + 1
        })
    ]);

    const concatPages = ConcatPages<MoviesListItem | TvListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);
