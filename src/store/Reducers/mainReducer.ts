import { combineReducers } from 'redux';
import General from './generalReducer';
import Movies from './movieReducers';
import TVs from './tvReducers';
import Peoples from './personReducer';
import Company from './companyReducer';
import Search from './searchReducer';
import { keywordsSlice } from '~/store/keywords/keywords.slice';
import { moviesSlice } from '~/store/movies/movies.slice';
import { genresSlice } from '~/store/genres/genres.slice';
import { tvSlice } from '~/store/tv/tv.slice.';

export default combineReducers({
  keywords: keywordsSlice.reducer,
  movies: moviesSlice.reducer,
  genres: genresSlice.reducer,
  tvShows: tvSlice.reducer,
  General,
  Movies,
  TVs,
  Peoples,
  Company,
  Search
});
