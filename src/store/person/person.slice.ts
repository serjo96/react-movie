import { PersonDetails, TaggedImage } from '~/core/types/perosn-details';
import { initDataState, initExternalIds } from '~/utils/initData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPersonDetails, PersonRespData } from '~/store/person/person.api';
import { sortMoviesItems, sortTvShows } from '~/utils/sortings';

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
        console.log(action);
        throw new Error(action.error.message);
        // state.lists.all.data = action.payload.data;
      });
  }
});
