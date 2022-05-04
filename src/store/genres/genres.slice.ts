import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Genre } from '~/core/types/genres';
import { getGenres, ReturnedGenres } from '~/store/genres/generes.api';
import { formattingGenres } from '~/utils/format';
import { ResponseError } from '~/core/api/apiClient';
import formatThunkErrorPayload from '~/utils/formatThunkErrorPayload';
import errorLogging from '~/utils/errorLogging';

export interface GenresData {
  movie: Array<Genre>;
  tv: Array<Genre>;
}

export type GenresState = {
  isFetching: boolean;
  isSuccessful: boolean;
  data: {
    genresHash: {[key: string]: string}
    arrGenres: GenresData & { all: Array<Genre>;}
  };
}

const initialState: GenresState = {
  isFetching: false,
  isSuccessful: false,
  data: JSON.parse(window.localStorage.getItem('genres')) || {
    genresHash: {},
    arrGenres: {
      movie: [],
      tv: [],
      all: []
    }
  }
};

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getGenres.fulfilled, (state, action: PayloadAction<ReturnedGenres>) => {
        state.isSuccessful = true;
        state.isFetching = false;
        const formattedGenres = formattingGenres(action.payload.data);
        window.localStorage.setItem('genres', JSON.stringify(formattedGenres));
        state.data = formattedGenres;
      })
      .addCase(getGenres.rejected, (state, { payload, error }) => {
        state.isFetching = false;
        state.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      });
  }
});

export const genresActions = genresSlice.actions;
