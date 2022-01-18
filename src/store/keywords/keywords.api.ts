import { createAsyncThunk } from '@reduxjs/toolkit';

import oldClient from '~/core/api/OldClient';
import { KeywordsListData } from '~/store/keywords/keywords.slice';
import ConcatPages from '~/utils/concatPages';
import { MoviesListItem } from '~/core/types/movies';
import { TvListItem } from '~/core/types/tv';

type KeywordsListPayload = {id: string, type: string, page: number};
type KeywordsListResponse = {
  isSuccess: boolean;
  data: KeywordsListData
}

export const keywordsReq = createAsyncThunk<KeywordsListResponse, KeywordsListPayload>(
  'keywords/getKeywordMovies',
  async (
    {
      id,
      type,
      page
    }: KeywordsListPayload
  ) => {
    const [firstPage, secondPage] = await oldClient.all<KeywordsListData>([
      oldClient.get(`discover/${type}`,
        {
          language: 'ru-RU',
          with_keywords: id,
          page: page,
          include_adult: true
        }),
      oldClient.get(`discover/${type}`,
        {
          language: 'ru-RU',
          with_keywords: id,
          page: page + 1,
          include_adult: true
        })
    ]);

    const concatPages = ConcatPages<MoviesListItem | TvListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);
