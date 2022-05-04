import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresData } from '~/store/genres/genres.slice';
import oldClient from '~/core/api/OldClient';
import { Genre } from '~/core/types/genres';

export interface ReturnedGenres {
  data: GenresData;
  isSuccessful: boolean;
}

export const getGenres = createAsyncThunk<ReturnedGenres>(
  'genres/getGenres',
  async (_, { rejectWithValue }) => {
    try {
      const [genresMovie, genresTV] = await oldClient.all<{genres: Genre[]}>([
        oldClient.get('genre/movie/list'),
        oldClient.get('genre/tv/list')
      ]);

      return {
        data: {
          movie: genresMovie.data.genres,
          tv: genresTV.data.genres
        },
        isSuccessful: genresMovie.isSuccessRequest && genresTV.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
