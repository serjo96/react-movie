import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieDetails } from '~/core/types/movieDetails';
import { Collection } from '~/core/types/collection';
import { MovieListItem, MoviesListItem } from '~/core/types/movies';
import ActionPayloadData from '~/core/types/actionPayloadData';

import {
  getMovieData,
  getMovieEngOverview,
  getMoviesList,
  getPlayingMovies,
  getTopMovies,
  getUpcomingMovies, MovieEngRespData,
  MovieRespData,
  ReturnedMovieList
} from '~/store/movies/movies.api';
import {
  CrewState,
  initCreditsState,
  initDataState,
  initImagesState,
  initListData
} from '~/utils/initData';
import { formatCrew } from '~/utils/formatCrew';
import { Credits } from '~/core/types/credits';
import { ListData } from '~/core/types/listData';

type MovieDetailState = Omit<MovieDetails, 'credits'> & {
  collection?: Collection;
  credits: Omit<Credits, 'crew'> & {crew: CrewState}
};

export type MoviesListsData = ActionPayloadData<ListData<MoviesListItem>>;

type MoviesState = {
  isFetching: boolean;
  isSuccessful: boolean;
  lists: {
    all: MoviesListsData,
    upcoming: MoviesListsData,
    top: MoviesListsData,
    playing: MoviesListsData,
    popular: MoviesListsData,
  };
  data: MovieDetailState,
}

const initPlayingListData = (): MoviesListsData => ({
  ...initListData<MoviesListItem>(),
  data: {
    ...initListData<MoviesListItem>().data,
    dates: {
      maximum: '',
      minimum: ''
    }
  }
});

const initialState: MoviesState = {
  isFetching: false,
  isSuccessful: true,
  lists: {
    all: initListData<MoviesListItem>(),
    upcoming: initListData<MoviesListItem>(),
    top: initListData<MoviesListItem>(),
    playing: initPlayingListData(),
    popular: initPlayingListData()
  },
  data: {
    id: 0,
    imdbId: '',
    images: initImagesState(),
    genres: [],
    spokenLanguages: [],
    overview: '',
    belongsToCollection: null,
    collection: {
      backdropPath: '',
      id: 0,
      name: '',
      overview: '',
      posterPath: '',
      parts: []
    },
    backdropPath: '',
    title: '',
    originalTitle: '',
    originalLanguage: '',
    budget: 0,
    popularity: 0,
    adult: true,
    status: '',
    posterPath: '',
    productionCompanies: [],
    productionCountries: [],
    releaseDate: new Date().toDateString(),
    revenue: 0,
    runtime: 0,
    tagline: '',
    homepage: '',
    voteAverage: 0,
    voteCount: 0,
    keywords: {
      keywords: []
    },
    lists: initDataState<MovieListItem>(),
    credits: initCreditsState(),
    video: false,
    videos: {
      results: []
    },
    recommendations: initDataState<MoviesListItem>(),
    similar: initDataState<MoviesListItem>()
  }
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesList.pending, (state) => {
        state.lists.all.isFetching = true;
      })
      .addCase(getMoviesList.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.all.data = action.payload.data;
        state.lists.all.isFetching = false;
      })
      .addCase(getMoviesList.rejected, (state, action) => {
        console.log(action);
        // throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
        state.lists.all.isSuccessful = false;
      })
      .addCase(getUpcomingMovies.pending, (state) => {
        state.lists.upcoming.isFetching = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.upcoming.data = action.payload.data;
        state.lists.upcoming.isFetching = false;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        console.log(action);
        state.lists.upcoming.isSuccessful = false;
        // state.lists.all.data = action.payload.data;
      })
      .addCase(getTopMovies.pending, (state) => {
        state.lists.top.isFetching = true;
      })
      .addCase(getTopMovies.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.top.data = action.payload.data;
        state.lists.top.isFetching = false;
      })
      .addCase(getTopMovies.rejected, (state, action) => {
        console.log(action);
        state.lists.top.isSuccessful = false;
      })
      .addCase(getPlayingMovies.pending, (state) => {
        state.lists.playing.isFetching = true;
      })
      .addCase(getPlayingMovies.fulfilled, (state, action: PayloadAction<ReturnedMovieList>) => {
        state.lists.playing.data = action.payload.data;
        state.lists.playing.isFetching = false;
      })
      .addCase(getPlayingMovies.rejected, (state, action) => {
        console.log(action);
        state.lists.playing.isSuccessful = false;
      })
      .addCase(getMovieData.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getMovieData.fulfilled, (state, action: PayloadAction<MovieRespData>) => {
        const data = action.payload.data;
        state.isFetching = false;
        state.data = {
          ...data,
          credits: {
            ...data.credits,
            crew: formatCrew(data.credits.crew)
          }
        };
      })
      .addCase(getMovieEngOverview.pending, (state) => {
        state.isFetching = true;
        state.isSuccessful = true;
      })
      .addCase(getMovieEngOverview.fulfilled, (state, action: PayloadAction<MovieEngRespData>) => {
        state.isFetching = false;
        state.data = { ...state.data, overview: action.payload.data };
      });
  }
});

export const moviesActions = moviesSlice.actions;
