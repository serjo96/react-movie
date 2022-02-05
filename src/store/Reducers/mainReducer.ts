import { combineReducers } from 'redux';
import General from './generalReducer';
import Movies from './movieReducers';
import TVs from './tvReducers';
import Peoples from './personReducer';
import Company from './companyReducer';
import { keywordsSlice } from '~/store/keywords/keywords.slice';
import { moviesSlice } from '~/store/movies/movies.slice';
import { genresSlice } from '~/store/genres/genres.slice';
import { tvSlice } from '~/store/tv/tv.slice';
import { searchSlice } from '~/store/search/search.slice';

export default combineReducers({
  keywords: keywordsSlice.reducer,
  movies: moviesSlice.reducer,
  genres: genresSlice.reducer,
  tvShows: tvSlice.reducer,
  search: searchSlice.reducer,
  General,
  Movies,
  TVs,
  Peoples,
  Company
});
