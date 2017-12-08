import { combineReducers } from 'redux';
import General from './generalReducer';
import Movies from './movieReducers';
import TVs from './tvReducers';
import Peoples from './personReducer';

export default combineReducers({
	General,
	Movies,
	TVs,
	Peoples,
});
