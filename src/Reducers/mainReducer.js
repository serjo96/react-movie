import { combineReducers } from 'redux';
import movies from './movieReducers';
import TVs from './tvReducers';

export default combineReducers({
	movies,
	TVs
});
