import { createAsyncThunk } from '@reduxjs/toolkit';
import { Languages } from '~/store/config/config.slice';
import oldClient from '~/core/api/OldClient';
import { MovieListArgs } from '~/store/movies/movies.api';
import { MoviesListItem } from '~/core/types/movies';
import { CompanyDetails } from '~/core/types/comapny-details';
import { ListData } from '~/core/types/listData';
import { TvListItem } from '~/core/types/tv';
import { TvListArgs } from '~/store/tv/tv.api';

export interface CompanyRespData {
  isSuccessful: boolean;
  data: CompanyDetails;
}

export const getCompanyDetails = createAsyncThunk<CompanyRespData, {id: number}>(
  'company/getCompanyDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const resp = await oldClient.get<CompanyDetails>(`company/${id}`);

      return {
        data: resp.data,
        isSuccessful: resp.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  });

export const getEngCompanyDetails = createAsyncThunk<CompanyRespData, {id: number, lang?: Languages}>(
  'company/getEngCompanyDetails',
  async ({ id, lang = Languages.EN }, { rejectWithValue }) => {
    try {
      const resp = await oldClient.get<CompanyDetails>(`company/${id}`,
        {
          language: lang
        }
      );

      return {
        data: resp.data,
        isSuccessful: resp.isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

type CompanyMoviesArguments = MovieListArgs & {id: number}
type CompanyTvShowsArguments = TvListArgs & {id: number}
type ReturnedCompanyMovieList = {
  data: ListData<MoviesListItem>;
  isSuccessful: boolean;
}

type ReturnedCompanyTvShowsList = {
  data: ListData<TvListItem>;
  isSuccessful: boolean;
}

export const getCompanyMovies = createAsyncThunk<ReturnedCompanyMovieList, CompanyMoviesArguments | void>(
  'company/getCompanyMovies',
  async ({
    id,
    genre,
    date,
    adult = false,
    sortBy = 'popularity.desc',
    page = 1
  }: CompanyMoviesArguments = {
    id: 0,
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
      const { data, isSuccessRequest } = await oldClient.get<ListData<MoviesListItem>>('discover/movie',
        {
          sort_by: sortBy,
          with_genres: genre,
          primary_release_year: date,
          with_companies: id,
          'primary_release_date.gte': startRangeDate,
          'primary_release_date.lte': endRangeDate,
          page: page,
          include_adult: adult
        });
      return {
        data,
        isSuccessful: isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getCompanyTvShows = createAsyncThunk<ReturnedCompanyTvShowsList, CompanyTvShowsArguments | void>(
  'company/getCompanyTvShows',
  async ({
    id,
    genre,
    date,
    sortBy = 'popularity.desc',
    page = 1
  }: CompanyTvShowsArguments = {
    id: 0,
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
      const { data, isSuccessRequest } = await oldClient.get<ListData<TvListItem>>('discover/tv',
        {
          sort_by: sortBy,
          with_genres: genre,
          first_air_date_year: date,
          with_companies: id,
          'first_air_date.gte': startRangeDate,
          'first_air_date.lte': endRangeDate,
          page: page
        });
      return {
        data,
        isSuccessful: isSuccessRequest
      };
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
