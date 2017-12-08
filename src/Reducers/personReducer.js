import { PERSON_DATA, CLEAR_PERSON_DATA } from '../constants';
import update from 'react-addons-update';


const initialState = {
	peopleData: {
		isFetching: false
	},

};

export default function Peoples(state = initialState, action) {

	switch (action.type) {
		case PERSON_DATA:
			let sortedMovies = action.person.movie_credits.cast.sort((a, b)=> new Date(b.release_date) - new Date(a.release_date)),
				sortedTV = action.person.tv_credits.cast.sort((a, b)=> new Date(b.first_air_date) - new Date(a.first_air_date));
			return update(state, {
				peopleData: {$merge: {
						isFetching: true,
						data: action.person,
						sortedMovies: sortedMovies,
						sortedTV: sortedTV
					}
				}
			});

		case CLEAR_PERSON_DATA:
			return update(state, {
				peopleData: {$merge: {
						isFetching: false,
						data: null
					}
				}
			});

		default:
			return state;
	}
}

