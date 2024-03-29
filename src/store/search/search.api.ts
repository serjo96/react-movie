import { createAsyncThunk } from '@reduxjs/toolkit';

import { ListData } from '~/core/types/listData';
import { SearchResultItem } from '~/core/types/search';
import oldClient from '~/core/api/OldClient';
import ConcatPages from '~/utils/concatPages';

export type SearchResponse = {
  isSuccessful: boolean;
  data: ListData<SearchResultItem>
};

type SearchPayload = {
  words: string;
  page: number;
  adult?: boolean;
}

export const getSearchData = createAsyncThunk<SearchResponse, string>(
  'search/getSearchData',
  async (words, { rejectWithValue }) => {
    try {
      const { data, isSuccessRequest } = await oldClient.get('search/multi',
        {
          page: 1,
          region: 'RU',
          query: words,
          include_adult: true
        }
      );
      return {
        data,
        isSuccessful: isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  });

export const onSearchRequest = createAsyncThunk<SearchResponse, SearchPayload>(
  'search/onSearchRequest',
  async ({
    words,
    page = 1,
    adult = false
  }: SearchPayload = {
    page: 1,
    words: '',
    adult: false
  }, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<SearchResponse['data']>([
        oldClient.get('search/multi',
          {
            page: page,
            region: 'RU',
            include_adult: adult,
            query: words.replace('_', ' ')
          }),
        oldClient.get('search/multi',
          {
            page: page + 1,
            region: 'RU',
            include_adult: adult,
            query: words.replace('_', ' ')
          })
      ]);
      const concatPages = ConcatPages<SearchResultItem>({ firstPage, secondPage });

      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  });
