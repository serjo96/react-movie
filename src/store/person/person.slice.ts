import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import { toast } from 'react-toastify';

import { PersonDetails, TaggedImage } from '~/core/types/perosn-details';
import { initDataState, initExternalIds } from '~/utils/initData';
import { getPersonDetails, PersonRespData } from '~/store/person/person.api';
import { sortMoviesItems, sortTvShows } from '~/utils/sortings';
import i18n from '~/i18n';

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
      })
      .addCase(getPersonDetails.rejected, (state, action) => {
        state.isFetching = false;
        state.isSuccessful = false;
        console.error(action.error.message);
        toast.error(i18n.t('errorText'));
        Sentry.captureException(action.error);
      });
  }
});
