import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { keywordsReq } from '~/store/keywords/keywords.api';
import { MoviesListItem } from '~/core/types/movies';
import { ListData } from '~/core/types/listData';
import { TvListItem } from '~/core/types/tv';

export type KeywordsListData = ListData<MoviesListItem | TvListItem>;

type KeywordsState = {
  isFetching: boolean;
  data: KeywordsListData,
  isSuccessful: boolean;
}

const initialState: KeywordsState = {
  isFetching: false,
  isSuccessful: true,
  data: {
    page: 1,
    totalResults: 0,
    totalPages: 0,
    results: []
  }
};

export const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(keywordsReq.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(keywordsReq.fulfilled, (state, action: PayloadAction<ActionPayloadData<KeywordsListData>>) => {
        state.isFetching = false;
        state.data = action.payload.data;
      });
  }
});

export const keywordsActions = keywordsSlice.actions;
