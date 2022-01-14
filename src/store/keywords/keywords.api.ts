import oldClient from '~/core/api/OldClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const keywordsReq = createAsyncThunk(
  'keywords/getKeywordMovies',
  async (
    { id, type, page = 1 }: {id: string, type: string, page: number}
  ) => {
    let concatPages;
    const [firstPage, secondPage] = await oldClient.all([
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

    if (firstPage.data.total_pages > 1) {
      concatPages = Object.assign({
        ...secondPage.data,
        results: firstPage.data.results.concat(secondPage.data.results),
        page: firstPage.data.page,
        searchType: { type: 'genres' }
      });
    } else {
      concatPages = firstPage.data;
    }

    return { data: concatPages, status: firstPage.isSuccessRequest && secondPage.isSuccessRequest };
  }
);
