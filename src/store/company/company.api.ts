import { createAsyncThunk } from '@reduxjs/toolkit';
import { Languages } from '~/store/Reducers/generalReducer';
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

export const getCompanyDetails = createAsyncThunk<CompanyRespData, {id: string, lang?: Languages}>(
  'company/getCompanyDetails',
  async ({ id, lang = Languages.RU }) => {
    const resp = await oldClient.get<CompanyDetails>(`company/${id}`,
      {
        language: lang
      }
    );

    return {
      data: resp.data,
      isSuccessful: resp.isSuccessRequest
    };
  }
);

export const getEngCompanyDetails = createAsyncThunk<CompanyRespData, {id: string, lang?: Languages}>(
  'company/getEngCompanyDetails',
  async ({ id, lang = Languages.EN }) => {
    const resp = await oldClient.get<CompanyDetails>(`company/${id}`,
      {
        language: lang
      }
    );

    return {
      data: resp.data,
      isSuccessful: resp.isSuccessRequest
    };
  }
);

type CompanyMoviesArguments = MovieListArgs & {id: string | number}
type CompanyTvShowsArguments = TvListArgs & {id: string | number}
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
    page = 1,
    language = Languages.RU
  }: CompanyMoviesArguments = {
    id: 0,
    adult: false,
    sortBy: 'popularity.desc',
    page: 1,
    language: Languages.RU
  }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date && date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    const { data, isSuccessRequest } = await oldClient.get<ListData<MoviesListItem>>('discover/movie',
      {
        language,
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
  }
);

export const getCompanyTvShows = createAsyncThunk<ReturnedCompanyTvShowsList, CompanyTvShowsArguments | void>(
  'company/getCompanyTvShows',
  async ({
    id,
    genre,
    date,
    sortBy = 'popularity.desc',
    page = 1,
    language = Languages.RU
  }: CompanyTvShowsArguments = {
    id: 0,
    sortBy: 'popularity.desc',
    page: 1,
    language: Languages.RU
  }) => {
    let startRangeDate: string | undefined;
    let endRangeDate: string | undefined;
    const rangeData = date && date.split('-');
    if (date && rangeData.length > 1) {
      [startRangeDate, endRangeDate] = rangeData;
    }

    const { data, isSuccessRequest } = await oldClient.get<ListData<TvListItem>>('discover/tv',
      {
        language,
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
  }
);
