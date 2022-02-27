import { combineReducers } from '@reduxjs/toolkit';

import { keywordsSlice } from '~/store/keywords/keywords.slice';
import { moviesSlice } from '~/store/movies/movies.slice';
import { genresSlice } from '~/store/genres/genres.slice';
import { tvSlice } from '~/store/tv/tv.slice';
import { searchSlice } from '~/store/search/search.slice';
import { personSlice } from '~/store/person/person.slice';
import { companySlice } from '~/store/company/company.slice';
import { configSlice } from '~/store/config/config.slice';

export const rootReducer = combineReducers({
  keywords: keywordsSlice.reducer,
  movies: moviesSlice.reducer,
  genres: genresSlice.reducer,
  tvShows: tvSlice.reducer,
  search: searchSlice.reducer,
  person: personSlice.reducer,
  company: companySlice.reducer,
  config: configSlice.reducer
});
