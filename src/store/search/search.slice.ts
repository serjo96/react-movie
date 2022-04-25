import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { toast } from 'react-toastify';

import { initListData } from '~/utils/initData';
import { ListData } from '~/core/types/listData';
import { SearchResultItem } from '~/core/types/search';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { onSearchRequest, getSearchData, SearchResponse } from '~/store/search/search.api';
import i18n from '~/i18n';

export interface SearchState {
  headerSearch: ActionPayloadData<ListData<SearchResultItem>>;
  pageSearch: ActionPayloadData<ListData<SearchResultItem>>;
}

const initialState = (): SearchState => ({
  headerSearch: initListData<SearchResultItem>(),
  pageSearch: initListData<SearchResultItem>()
});

export const searchSlice = createSlice({
  name: 'keywords',
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchData.pending, (state) => {
        state.headerSearch.isFetching = true;
      })
      .addCase(getSearchData.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.headerSearch.data = action.payload.data;
        state.headerSearch.isFetching = false;
        state.headerSearch.isSuccessful = true;
      })
      .addCase(getSearchData.rejected, (state, action) => {
        state.headerSearch.isFetching = false;
        state.headerSearch.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      })

      .addCase(onSearchRequest.pending, (state) => {
        state.pageSearch.isFetching = true;
      })
      .addCase(onSearchRequest.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.pageSearch.data = action.payload.data;
        state.pageSearch.isFetching = false;
        state.pageSearch.isSuccessful = true;
      })
      .addCase(onSearchRequest.rejected, (state, action) => {
        state.pageSearch.isFetching = false;
        state.pageSearch.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      });
  }
});
