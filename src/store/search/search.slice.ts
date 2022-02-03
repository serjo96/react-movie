import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initListData } from '~/utils/initData';
import { ListData } from '~/core/types/listData';
import { SearchResultItem } from '~/core/types/search';
import { onSearchRequest, getSearchData, SearchResponse } from '~/store/search/search.api';

export interface HeaderSearchState {
  value: string;
  headerSearchData: {
    isFetching: boolean;
    isSuccessful: boolean;
    data: ListData<SearchResultItem>
  };
}
export interface SearchOnPageState {
    isFetching: boolean;
    isSuccessful: boolean;
    data: ListData<SearchResultItem>
}

export interface SearchState {
  headerSearch: HeaderSearchState;
  pageSearch: SearchOnPageState;
}

const initialState = (): SearchState => ({
  headerSearch: {
    value: '',
    headerSearchData: initListData<SearchResultItem>()
  },
  pageSearch: initListData<SearchResultItem>()
});

export const searchSlice = createSlice({
  name: 'keywords',
  initialState: initialState(),
  reducers: {
    setHeaderSearchValue (state, action: PayloadAction<string>) {
      state.headerSearch.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchData.pending, (state) => {
        state.headerSearch.headerSearchData.isFetching = true;
      })
      .addCase(getSearchData.fulfilled, (state, action: PayloadAction<SearchResponse>) => {
        state.headerSearch.headerSearchData.data = action.payload.data;
        state.headerSearch.headerSearchData.isFetching = false;
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

export const { setHeaderSearchValue } = searchSlice.actions;
