import { createAsyncThunk } from '@reduxjs/toolkit';

import oldClient from '~/core/api/OldClient';

import ConcatPages from '~/utils/concatPages';
import { Languages } from '~/store/Reducers/generalReducer';
import { MovieDetails } from '~/core/types/movieDetails';
import { MoviesListItem, MoviesList } from '~/core/types/movies';
import { Collection } from '~/core/types/collection';
import { sortCollectionItems } from '~/utils/sortings';

// TODO: Add rejected handler for api status;
export interface ReturnedMovieList {
  data: MoviesList;
  isSuccess: boolean;
}

interface MovieListArgs {
  page?: number;
  genre?: string;
  sortType?: string;
  date?: string;
  region?: string;
  adult?: boolean;
}

export interface MovieRespData {
  isSuccess: boolean;
  data: MovieDetails & {collection?: Collection};
}

export interface MovieEngRespData {
  isSuccess: boolean;
  data: MovieDetails['overview']
}

export const getMoviesList = createAsyncThunk<ReturnedMovieList, MovieListArgs | void>(
  'movies/getMoviesList',
  async (payload : MovieListArgs = {
    adult: false,
    sortType: 'popularity.desc',
    page: 1
  }) => {
    let singleYear: string | undefined;
    let rageDates;
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    if (payload.date && payload.date.split('-').length > 1) {
      rageDates = payload.date.split('-');
      startRangeDate = rageDates[0] ? rageDates[0] : '';
      endRangeDate = rageDates[1];
    }
    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: payload.region,
          sort_by: payload.sortType,
          with_genres: payload.genre,
          primary_release_year: payload.date,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: payload.page,
          include_adult: payload.adult
        }),
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: payload.region,
          sort_by: payload.sortType,
          with_genres: payload.genre,
          primary_release_year: singleYear,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: payload.page + 1,
          include_adult: payload.adult
        })
    ]);
    const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
    return {
      data: { ...concatPages, sortByDate: payload.date },
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getUpcomingMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'movies/getUpcomingMovies',
  async (page = 1) => {
    const response = await oldClient.get<MoviesList>('movie/upcoming',
      {
        language: 'ru-RU',
        page: page,
        region: 'RU'
      }
    );
    return {
      data: response.data,
      isSuccess: response.isSuccessRequest
    };
  }
);

export const getPopularMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'movies/getPopularMovies',
  async (page = 1) => {
    const response = await oldClient.get<MoviesList>('movie/popular',
      {
        language: 'ru-RU',
        page: page,
        region: 'RU'
      }
    );
    return {
      data: response.data,
      isSuccess: response.isSuccessRequest
    };
  }
);

export const getPlayingMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'movies/getPlayingMovies',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('movie/now_playing',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/now_playing',
        {
          language: 'ru-RU',
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getTopMovies = createAsyncThunk<ReturnedMovieList, number | void>(
  'movies/getTopMovies',
  async (page = 1) => {
    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('movie/top_rated',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/top_rated',
        {
          language: 'ru-RU',
          page: (page as number) + 1,
          region: 'RU'
        })
    ]);
    const concatPages = ConcatPages<MoviesListItem>({ firstPage, secondPage });
    return {
      data: concatPages,
      isSuccess: firstPage.isSuccessRequest && secondPage.isSuccessRequest
    };
  }
);

export const getMovieData = createAsyncThunk<MovieRespData, {id: string, lang?: Languages}>(
  'movie/getMovieData',
  async ({ id, lang = Languages.RU }) => {
    const resp = await oldClient.get<MovieDetails>(`movie/${id}`,
      {
        language: lang,
        include_image_language: 'ru,null',
        append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
      }
    );

    let response: MovieRespData = {
      data: resp.data,
      isSuccess: resp.isSuccessRequest
    };

    let collection;
    if (resp.data.belongsToCollection) {
      collection = await oldClient.get<Collection>('collection/' + resp.data.belongsToCollection.id,
        {
          language: lang
        }
      );

      const sortedCollection = { ...collection.data, parts: sortCollectionItems(collection.data.parts) };
      response = { data: { ...resp.data, collection: sortedCollection }, isSuccess: resp.isSuccessRequest && collection.isSuccessRequest };
    }

    return response;
  }
);

export const getMovieEngOverview = createAsyncThunk<MovieEngRespData, {id: string, lang?: Languages}>(
  'movie/getMovieEngData',
  async ({ id, lang = Languages.EN }) => {
    const resp = await oldClient.get<MovieDetails>(`movie/${id}`,
      {
        language: lang,
        include_image_language: 'ru,null',
        append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
      }
    );

    return {
      data: resp.data.overview,
      isSuccess: resp.isSuccessRequest
    };
  }
);
