import { combineReducers } from 'redux';
import General from './generalReducer';

import { keywordsSlice } from '~/store/keywords/keywords.slice';
import { moviesSlice } from '~/store/movies/movies.slice';
import { genresSlice } from '~/store/genres/genres.slice';
import { tvSlice } from '~/store/tv/tv.slice';
import { searchSlice } from '~/store/search/search.slice';
import { personSlice } from '~/store/person/person.slice';
import { companySlice } from '~/store/company/company.slice';

export default combineReducers({
  keywords: keywordsSlice.reducer,
  movies: moviesSlice.reducer,
  genres: genresSlice.reducer,
  tvShows: tvSlice.reducer,
  search: searchSlice.reducer,
  person: personSlice.reducer,
  company: companySlice.reducer,
  General
});
