import { createAsyncThunk } from '@reduxjs/toolkit';

import oldClient from '~/core/api/OldClient';

import ConcatPages from '~/utils/concatPages';
import { Languages } from '~/store/config/config.slice';
import { MovieDetails } from '~/core/types/movieDetails';
import { MoviesListItem, MoviesList } from '~/core/types/movies';
import { Collection } from '~/core/types/collection';
import { sortCollectionItems } from '~/utils/sortings';

// TODO: Add rejected handler for api status;
export interface ReturnedMovieList {
  data: MoviesList;
  isSuccessful: boolean;
}

export interface MovieListArgs {
  page?: number;
  genre?: number;
  sortBy?: string;
  date?: string;
  region?: string;
  adult?: boolean;
}

export interface MovieRespData {
  isSuccessful: boolean;
  data: MovieDetails & {collection?: Collection};
}

export interface MovieEngRespData {
  isSuccessful: boolean;
  data: MovieDetails['overview']
}

export const getMoviesList = createAsyncThunk<ReturnedMovieList, MovieListArgs | void>(
  'lists/getMoviesList',
  async ({
    genre,
    date,
    region,
    adult = false,
    sortBy = 'popularity.desc',
    page = 1
  }: MovieListArgs = {
    adult: false,
    sortBy: 'popularity.desc',
    page: 1
  }, { rejectWithValue }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date && date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    try {
      const [firstPage, secondPage] = await oldClient.all<MoviesList>([
        oldClient.get('discover/movie',
          {
            region: region,
            sort_by: sortBy,
            with_genres: genre,
            primary_release_year: date,
            'primary_release_date.gte': startRangeDate,
            'primary_release_date.lte': endRangeDate,
            page: page,
            include_adult: adult
          }),
        oldClient.get('discover/movie',
          {
            region: region,
            sort_by: sortBy,
            with_genres: genre,
            primary_release_year: date,
            'primary_release_date.gte': startRangeDate,
            'primary_release_date.lte': endRangeDate,
            page: page + 1,
            include_adult: adult
          })
      ]);
      const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
      return {
        data: { ...concatPages, sortByDate: date },
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getUpcomingMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'lists/getUpcomingMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await oldClient.get<MoviesList>('movie/upcoming',
        {
          page: page,
          region: 'RU'
        }
      );
      return {
        data: response.data,
        isSuccessful: response.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getPopularMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'lists/getPopularMovies',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('movie/popular',
        {
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/popular',
        {
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getPlayingMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'lists/getPlayingMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<MoviesList>([
        oldClient.get('movie/now_playing',
          {
            page: page,
            region: 'RU'
          }),
        oldClient.get('movie/now_playing',
          {
            page: (page as number) + 1,
            region: 'RU'
          })
      ]);
      const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getTopMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'lists/getTopMovies',
  async (page = 1, { rejectWithValue }) => {
    try {
      const [firstPage, secondPage] = await oldClient.all<MoviesList>([
        oldClient.get('movie/top_rated',
          {
            page: page,
            region: 'RU'
          }),
        oldClient.get('movie/top_rated',
          {
            page: (page as number) + 1,
            region: 'RU'
          })
      ]);
      const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
      return {
        data: concatPages,
        isSuccessful: firstPage.isSuccessRequest && secondPage.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getMovieData = createAsyncThunk<MovieRespData, {id: number, lang: Languages}>(
  'movie/getMovieData',
  async ({ id, lang }, { rejectWithValue }) => {
    try {
      const resp = await oldClient.get<MovieDetails>(`movie/${id}`,
        {
          include_image_language: `${lang},null`,
          append_to_response: 'credits,images,videos,recommendations,similar,reviews,lists,keywords,release_dates'
        }
      );

      let response: MovieRespData = {
        data: resp.data,
        isSuccessful: resp.isSuccessRequest
      };

      let collection;
      if (resp.data.belongsToCollection) {
        collection = await oldClient.get<Collection>('collection/' + resp.data.belongsToCollection.id);

        const sortedCollection = { ...collection.data, parts: sortCollectionItems(collection.data.parts) };
        response = {
          data: { ...resp.data, collection: sortedCollection },
          isSuccessful: resp.isSuccessRequest && collection.isSuccessRequest
        };
      }

      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getMovieEngOverview = createAsyncThunk<MovieEngRespData, {id: number, lang?: Languages}>(
  'movie/getMovieEngData',
  async ({ id, lang = Languages.EN }, { rejectWithValue }) => {
    try {
      const resp = await oldClient.get<MovieDetails>(`movie/${id}`,
        {
          language: lang
        }
      );

      return {
        data: resp.data.overview,
        isSuccessful: resp.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
