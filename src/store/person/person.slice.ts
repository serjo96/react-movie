import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PersonDetails, TaggedImage } from '~/core/types/perosn-details';
import { initDataState, initExternalIds } from '~/utils/initData';
import { getPersonDetails, PersonRespData } from '~/store/person/person.api';
import { sortMoviesItems, sortTvShows } from '~/utils/sortings';
import formatThunkErrorPayload from '~/utils/formatThunkErrorPayload';
import { ResponseError } from '~/core/api/apiClient';
import errorLogging from '~/utils/errorLogging';

type PersonState = {
  isFetching: boolean;
  isSuccessful: boolean;
  data: PersonDetails;
}

const initialState: PersonState = {
  isFetching: false,
  isSuccessful: true,
  data: {
    adult: false,
    alsoKnownAs: [],
    biography: '',
    birthday: '',
    deathday: null,
    gender: 0,
    homepage: null,
    id: 0,
    imdbId: '',
    knownForDepartment: '',
    name: '',
    placeOfBirth: '',
    popularity: 0,
    profilePath: '',
    movieCredits: {
      crew: [],
      cast: []
    },
    images: {
      profiles: []
    },
    tvCredits: {
      crew: [],
      cast: []
    },
    combinedCredits: {
      crew: [],
      cast: []
    },
    externalIds: initExternalIds(),
    taggedImages: initDataState<TaggedImage>()
  }
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPersonDetails.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getPersonDetails.fulfilled, (state, action: PayloadAction<PersonRespData>) => {
        const sortedCastMovies = sortMoviesItems(action.payload.data.movieCredits.cast).reverse();
        const sortedCastTvShows = sortTvShows(action.payload.data.tvCredits.cast).reverse();

        const data = {
          ...action.payload.data,
          tvCredits: {
            ...action.payload.data.tvCredits,
            cast: sortedCastTvShows
          },
          movieCredits: {
            ...action.payload.data.movieCredits,
            cast: sortedCastMovies
          }
        };
        state.data = data;
        state.isFetching = false;
        state.isSuccessful = true;
      })
      .addCase(getPersonDetails.rejected, (state, { payload, error }) => {
        state.isFetching = false;
        state.isSuccessful = false;

        const formattedError = formatThunkErrorPayload(payload as ResponseError, error);
        errorLogging(formattedError);
      });
  }
});
