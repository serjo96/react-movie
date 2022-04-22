import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';

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
import i18n from '~/i18n';

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
        state.data = action.payload.data;
      })
      .addCase(getCompanyDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      })
      .addCase(getEngCompanyDetails.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getEngCompanyDetails.fulfilled, (state, action: PayloadAction<CompanyRespData>) => {
        state.isFetching = false;
        state.data = {
          ...state.data,
          description: action.payload.data.description
        };
      })
      .addCase(getEngCompanyDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      })

      .addCase(getCompanyMovies.pending, (state) => {
        state.lists.movies.isFetching = true;
      })
      .addCase(getCompanyMovies.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.movies.data = action.payload.data;
        state.lists.movies.isFetching = false;
      })
      .addCase(getCompanyMovies.rejected, (state, action) => {
        state.lists.movies.isFetching = false;
        state.lists.movies.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      })
      .addCase(getCompanyTvShows.pending, (state) => {
        state.lists.tvShows.isFetching = true;
      })
      .addCase(getCompanyTvShows.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.tvShows.data = action.payload.data;
        state.lists.tvShows.isFetching = false;
      })
      .addCase(getCompanyTvShows.rejected, (state, action) => {
        state.lists.tvShows.isFetching = false;
        state.lists.tvShows.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      });
  }
});

export const companyActions = companySlice.actions;
