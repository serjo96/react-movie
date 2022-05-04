import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CompanyDetails } from '~/core/types/comapny-details';
import { initListData } from '~/utils/initData';
import { MoviesListItem } from '~/core/types/movies';
import { TvShowsListsData } from '~/store/tv/tv.slice';
import { MoviesListsData } from '~/store/movies/movies.slice';
import { TvListItem } from '~/core/types/tv';
import { ReturnedMovieList } from '~/store/movies/movies.api';
import {
  CompanyRespData,
  getCompanyDetails,
  getCompanyMovies, getCompanyTvShows,
  getEngCompanyDetails
} from '~/store/company/company.api';
import { ReturnedTvShowsList } from '~/store/tv/tv.api';
import formatThunkErrorPayload from '~/utils/formatThunkErrorPayload';
import errorLogging from '~/utils/errorLogging';
import { ResponseError } from '~/core/api/apiClient';

type CompanyState = {
  isFetching: boolean;
  isSuccessful: boolean;
  data: CompanyDetails;
  lists: {
    movies: MoviesListsData,
    tvShows: TvShowsListsData
  }
}

const initialState: CompanyState = {
  isFetching: false,
  isSuccessful: true,
  data: {
    id: 0,
    name: '',
    logoPath: '',
    homepage: '',
    originCountry: '',
    parentCompany: undefined,
    headquarters: '',
    description: ''
  },
  lists: {
    movies: initListData<MoviesListItem>(),
    tvShows: initListData<TvListItem>()
  }
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyDetails.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getCompanyDetails.fulfilled, (state, action: PayloadAction<CompanyRespData>) => {
        state.isFetching = false;
        state.isSuccessful = true;
        state.data = action.payload.data;
      })
      .addCase(getCompanyDetails.rejected, (state, { payload, error }) => {
        state.isFetching = false;
        state.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      })
      .addCase(getEngCompanyDetails.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getEngCompanyDetails.fulfilled, (state, action: PayloadAction<CompanyRespData>) => {
        state.isFetching = false;
        state.isSuccessful = true;
        state.data = {
          ...state.data,
          description: action.payload.data.description
        };
      })
      .addCase(getEngCompanyDetails.rejected, (state, { payload, error }) => {
        state.isFetching = false;
        state.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      })

      .addCase(getCompanyMovies.pending, (state) => {
        state.lists.movies.isFetching = true;
      })
      .addCase(getCompanyMovies.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.movies.data = action.payload.data;
        state.lists.movies.isSuccessful = true;
        state.lists.movies.isFetching = false;
      })
      .addCase(getCompanyMovies.rejected, (state, { payload, error }) => {
        state.lists.movies.isFetching = false;
        state.lists.movies.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      })
      .addCase(getCompanyTvShows.pending, (state) => {
        state.lists.tvShows.isFetching = true;
      })
      .addCase(getCompanyTvShows.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.tvShows.data = action.payload.data;
        state.lists.tvShows.isFetching = false;
        state.lists.tvShows.isSuccessful = true;
      })
      .addCase(getCompanyTvShows.rejected, (state, { payload, error }) => {
        state.lists.tvShows.isFetching = false;
        state.lists.tvShows.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      });
  }
});

export const companyActions = companySlice.actions;
