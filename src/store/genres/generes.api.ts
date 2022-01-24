import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresData } from '~/store/genres/genres.slice';
import oldClient from '~/core/api/OldClient';
import { Genre } from '~/core/types/genres';

export interface ReturnedGenres {
  data: GenresData;
  isSuccess: boolean;
}

export const getGenres = createAsyncThunk<ReturnedGenres>(
  'genres/getGenres',
  async () => {
    const [genresMovie, genresTV] = await oldClient.all<{genres: Genre[]}>([
      oldClient.get('genre/movie/list',
        {
          language: 'ru-RU'
        }),
      oldClient.get('genre/tv/list',
        {
          language: 'ru-RU'
        })
    ]);

    return {
      data: {
        movie: genresMovie.data.genres,
        tv: genresTV.data.genres
      },
      isSuccess: genresMovie.isSuccessRequest && genresTV.isSuccessRequest
    };
  }
);
