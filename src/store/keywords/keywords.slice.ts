import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { toast } from 'react-toastify';

import { getKeywordsMedia, KeywordsListResponse } from '~/store/keywords/keywords.api';
import { MoviesListItem } from '~/core/types/movies';
import { ListData } from '~/core/types/listData';
import { TvListItem } from '~/core/types/tv';
import { initListData } from '~/utils/initData';
import i18n from '~/i18n';

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
        state.data = action.payload.data;
      })
      .addCase(getKeywordsMedia.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      });
  }
});

export const keywordsActions = keywordsSlice.actions;
