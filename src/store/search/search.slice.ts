import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initListData } from '~/utils/initData';
import { ListData } from '~/core/types/listData';
import { SearchResultItem } from '~/core/types/search';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { onSearchRequest, getSearchData, SearchResponse } from '~/store/search/search.api';

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
      })
      .addCase(getSearchData.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(onSearchRequest.pending, (state) => {
        state.pageSearch.isFetching = true;
      })
      .addCase(onSearchRequest.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.pageSearch.data = action.payload.data;
        state.pageSearch.isFetching = false;
      })
      .addCase(onSearchRequest.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      });
  }
});
