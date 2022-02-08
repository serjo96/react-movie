import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CrewState,
  initCreditsState,
  initDataState,
  initExternalIds,
  initImagesState,
  initListData
} from '~/utils/initData';
import ActionPayloadData from '~/core/types/actionPayloadData';
import { TvListItem, TvSeason } from '~/core/types/tv';
import { ListData } from '~/core/types/listData';
import { TvDetails } from '~/core/types/tvDetails';
import { Credits } from '~/core/types/credits';
import {
  getAiringTvShows, getEngTvShowData,
  getOnTheAirTvShows,
  getTopTvShows, getTvShowData, getTvShowSeasons,
  getTvShowsList,
  ReturnedTvShowsList, TvRespData, TvSeasonRespData, TvShowEngDataResp
} from '~/store/tv/tv.api';
import { formatCrew } from '~/utils/formatCrew';

type StateListData = ActionPayloadData<ListData<TvListItem>>;
type TvDetailState = Omit<TvDetails, 'credits'> & {
  credits: Omit<Credits, 'crew'> & {crew: CrewState}
};

type TvSeasonState = Omit<TvSeason, 'credits'> & {
  credits: Omit<Credits, 'crew'> & {crew: CrewState}
};

export type TvState = {
  isFetching: boolean;
  isSuccessful: boolean;
  lists: {
    all: StateListData,
    onTheAir: StateListData,
    top: StateListData,
    airing: StateListData,
  };
  data: TvDetailState,
  tvShowSeasons: {
    isFetching: boolean;
    isSuccessful: boolean;
    data: TvSeasonState
  }
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

const initSeasonData = (): TvState['tvShowSeasons'] => ({
  isFetching: false,
  isSuccessful: true,
  data: {
    id: '',
    airDate: '',
    episodes: [],
    name: '',
    overview: '',
    tvSeasonId: 0,
    posterPath: '',
    seasonNumber: 0,
    credits: initCreditsState(),
    images: initImagesState(),
    videos: {
      results: []
    }
  }
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
    images: initImagesState(),
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
    externalIds: initExternalIds(),
    keywords: {
      results: []
    },
    credits: initCreditsState(),
    videos: {
      results: []
    },
    similar: initDataState<TvListItem>(),
    recommendations: initDataState<TvListItem>()
  },
  tvShowSeasons: initSeasonData()
};

export const tvSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    clearSerialData (state) {
      state.tvShowSeasons = initSeasonData();
    }
  },
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
      })

      .addCase(getAiringTvShows.pending, (state) => {
        state.lists.airing.isFetching = true;
      })
      .addCase(getAiringTvShows.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.airing.data = action.payload.data;
        state.lists.airing.isFetching = false;
      })
      .addCase(getAiringTvShows.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(getTopTvShows.pending, (state) => {
        state.lists.top.isFetching = true;
      })
      .addCase(getTopTvShows.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.top.data = action.payload.data;
        state.lists.top.isFetching = false;
      })
      .addCase(getTopTvShows.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(getOnTheAirTvShows.pending, (state) => {
        state.lists.onTheAir.isFetching = true;
      })
      .addCase(getOnTheAirTvShows.fulfilled, (state, action: PayloadAction<ReturnedTvShowsList>) => {
        state.lists.onTheAir.data = action.payload.data;
        state.lists.onTheAir.isFetching = false;
      })
      .addCase(getOnTheAirTvShows.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(getTvShowData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getTvShowData.fulfilled, (state, action: PayloadAction<TvRespData>) => {
        const data = action.payload.data;
        state.data = { ...state.data, ...data, credits: { ...data.credits, crew: formatCrew(data.credits.crew) } };
        state.isFetching = false;
      })
      .addCase(getTvShowData.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(getEngTvShowData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getEngTvShowData.fulfilled, (state, action: PayloadAction<TvShowEngDataResp>) => {
        state.data = { ...state.data, overview: action.payload.data };
        state.isFetching = false;
      })
      .addCase(getEngTvShowData.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      })

      .addCase(getTvShowSeasons.pending, (state) => {
        state.tvShowSeasons.isFetching = true;
      })
      .addCase(getTvShowSeasons.fulfilled, (state, action: PayloadAction<TvSeasonRespData>) => {
        const data = action.payload.data;
        state.tvShowSeasons.data = { ...state.data, ...data, credits: { ...data.credits, crew: formatCrew(data.credits.crew) } };
        state.isFetching = false;
      })
      .addCase(getTvShowSeasons.rejected, (state, action) => {
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      });
  }
});

export const tvActions = tvSlice.actions;
