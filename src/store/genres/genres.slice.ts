import { Genre } from '~/core/types/genres';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGenres, ReturnedGenres } from '~/store/genres/generes.api';
import { formattingGenres } from '~/utils/format';

export interface GenresData {
  movie: Array<Genre>;
  tv: Array<Genre>;
}

type GenresState = {
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
        const formattedGenres = formattingGenres(action.payload.data);
        window.localStorage.setItem('genres', JSON.stringify(formattedGenres));
        state.data = formattedGenres;
      });
  }
});

export const genresActions = genresSlice.actions;
