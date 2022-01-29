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
  genre?: number;
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
  async ({
    genre,
    date,
    region,
    adult = false,
    sortType = 'popularity.desc',
    page = 1
  }: MovieListArgs = {
    adult: false,
    sortType: 'popularity.desc',
    page: 1
  }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: region,
          sort_by: sortType,
          with_genres: genre,
          primary_release_year: date,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: page,
          include_adult: adult
        }),
      oldClient.get('discover/movie',
        {
          language: 'ru-RU',
          region: region,
          sort_by: sortType,
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
    const [firstPage, secondPage] = await oldClient.all<MoviesList>([
      oldClient.get('movie/popular',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }),
      oldClient.get('movie/popular',
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
