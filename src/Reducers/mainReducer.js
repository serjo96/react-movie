import { combineReducers } from 'redux';
import General from './generalReducer';
import Movies from './movieReducers';
import TVs from './tvReducers';
import Peoples from './personReducer';
import Company from './companyReducer';

export default combineReducers({
	General,
	Movies,
	TVs,
	Peoples,
	Company,
});
