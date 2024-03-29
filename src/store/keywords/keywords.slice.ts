import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getKeywordsMedia, KeywordsListResponse } from '~/store/keywords/keywords.api';
import { MoviesListItem } from '~/core/types/movies';
import { ListData } from '~/core/types/listData';
import { TvListItem } from '~/core/types/tv';
import { initListData } from '~/utils/initData';
import { ResponseError } from '~/core/api/apiClient';
import formatThunkErrorPayload from '~/utils/formatThunkErrorPayload';
import errorLogging from '~/utils/errorLogging';

export type KeywordsListData = ListData<MoviesListItem | TvListItem>;
const initialState = initListData<MoviesListItem | TvListItem>();

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKeywordsMedia.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getKeywordsMedia.fulfilled, (state, action: PayloadAction<KeywordsListResponse>) => {
        state.isFetching = false;
        state.isSuccessful = true;
        state.data = action.payload.data;
      })
      .addCase(getKeywordsMedia.rejected, (state, { payload, error }) => {
        state.isFetching = false;
        state.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      });
  }
});

export const keywordsActions = keywordsSlice.actions;
