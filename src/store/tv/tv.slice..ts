import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initListData } from '~/utils/initData';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { TvListItem } from '~/core/types/tv';
import { ListData } from '~/core/types/listData';
import { TvDetails } from '~/core/types/tvDetails';
import { Credits } from '~/core/types/credits';
import { CrewState } from '~/store/movies/movies.slice';
import { getTvShowsList, ReturnedTvShowsList } from '~/store/tv/tv.api';

type StateListData = ActionPayloadData<ListData<TvListItem>>;
type TvDetailState = Omit<TvDetails, 'credits'> & {
  credits: Omit<Credits, 'crew'> & {crew: CrewState}
};

type TvState = {
  isFetching: boolean;
  isSuccessful: boolean;
  lists: {
    all: StateListData,
    onTheAir: StateListData,
    top: StateListData,
    airing: StateListData,
  };
  data: TvDetailState,
};

const initEpisodeData = () => ({
  airDate: '',
  episodeNumber: 0,
  id: 0,
  name: '',
  overview: '',
  productionCode: '',
  seasonNumber: 0,
  stillPath: '',
  voteAverage: 0,
  voteCount: 0
});

const initialState: TvState = {
  isFetching: false,
  isSuccessful: true,
  lists: {
    all: initListData<TvListItem>(),
    onTheAir: initListData<TvListItem>(),
    top: initListData<TvListItem>(),
    airing: initListData<TvListItem>()
  },
  data: {
    id: 0,
    name: '',
    originalName: '',
    originalLanguage: '',
    popularity: 0,
    inProduction: false,
    type: '',
    adult: true,
    overview: '',
    backdropPath: '',
    numberOfEpisodes: 0,
    numberOfSeasons: 0,
    firstAirDate: '',
    nextEpisodeToAir: initEpisodeData(),
    lastEpisodeToAir: initEpisodeData(),
    lastAirDate: '',
    episodeRunTime: [],
    images: {
      backdrops: [],
      posters: [],
      logos: []
    },
    genres: [],
    spokenLanguages: [],
    languages: [],
    translations: {
      translations: []
    },
    seasons: [],
    screenedTheatrically: {
      results: []
    },
    similar: {
      page: 1,
      results: [],
      totalResults: 0,
      totalPages: 0
    },
    status: '',
    posterPath: '',
    productionCompanies: [],
    productionCountries: [],
    originCountry: [],
    tagline: '',
    homepage: '',
    voteAverage: 0,
    voteCount: 0,
    createdBy: [],
    contentRatings: {
      results: []
    },
    networks: [],
    externalIds: {
      imdbId: '',
      freebaseId: '',
      freebaseMid: '',
      tvdbId: 0,
      tvrageId: 0,
      facebookId: '',
      instagramId: '',
      twitterId: ''
    },
    keywords: {
      keywords: []
    },
    credits: {
      cast: [],
      crew: {
        director: [],
        screenplay: [],
        producer: [],
        directorOfPhotography: [],
        music: [],
        art: []
      }
    },
    videos: {
      results: []
    },
    recommendations: {
      page: 1,
      results: [],
      totalPages: 0,
      totalResults: 0
    }
  }
};

export const tvSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTvShowsList.pending, (state) => {
        state.lists.all.isFetching = true;
      })
      .addCase(getTvShowsList.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.all.data = action.payload.data;
        state.lists.all.isFetching = false;
      })
      .addCase(getTvShowsList.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      });
  }
});

export const tvActions = tvSlice.actions;
