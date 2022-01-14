import { combineReducers } from 'redux';
import General from './generalReducer';
import Movies from './movieReducers';
import TVs from './tvReducers';
import Peoples from './personReducer';
import Company from './companyReducer';
import Search from './searchReducer';
import { keywordsSlice } from '~/store/keywords/keywords.slice';

export default combineReducers({
  [keywordsSlice.name]: keywordsSlice.reducer,
  General,
  Movies,
  TVs,
  Peoples,
  Company,
  Search
});
