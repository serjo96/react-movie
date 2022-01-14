import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, TvShow } from 'tmdb-typescript-api';
import ActionPayloadData from '~/core/types/ActionPayloadData';
import { keywordsReq } from '~/store/keywords/keywords.api';

type KeywordsData = {
  page: number;
  totalResults: number;
  totalPages: number;
  results: Array<Movie | TvShow>;
}

type KeywordsState = {
  isFetching: boolean;
  data: KeywordsData,
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
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(keywordsReq.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(keywordsReq.fulfilled, (state, action: PayloadAction<ActionPayloadData<KeywordsData>>) => {
      // Add user to the state array
        state.isFetching = false;
        state.data = action.payload.data;
      });
  }
});

export const keywordsActions = keywordsSlice.actions;
