import { PERSON_DATA, CLEAR_PERSON_DATA } from '../constants/index';
import update from 'react-addons-update';


const initialState = {
    peopleData: {
        isFetching: false,
        data: {
	        biography: '',
	        birthday: '',
            combined_credits: {
	            cast: [],
                crew: []
            },
	        deathday: '',
            external_ids: {},
            id: 0,
            images: {
	            profiles: []
            },
            imdb_id: '',
            latest: '',
            movie_credits: {
	            cast: [],
	            crew: []
            },
            name: '',
            place_of_birth: '',
            popularity: 0,
	        profile_path: '',
            tv_credits: {
	            cast: [],
                crew: []
            }
        },
	    sortedMovies: [],
	    sortedTV: [],
	    status: true
    }

};

export default function Peoples(state = initialState, action) {

    switch (action.type) {
        case PERSON_DATA:
            let sortedMovies = action.person.data.movie_credits.cast.sort((a, b)=> new Date(b.release_date) - new Date(a.release_date)),
                sortedTV = action.person.data.tv_credits.cast.sort((a, b)=> new Date(b.first_air_date) - new Date(a.first_air_date));
            return update(state, {
                peopleData: {$merge: {
                        isFetching: true,
                        data: action.person.data,
                        sortedMovies: sortedMovies,
                        sortedTV: sortedTV,
                        status: action.person.status
                }}
            });

        case CLEAR_PERSON_DATA:
            return update(state, {
                peopleData: {$merge: {
                        ...initialState.peopleData
                }}
            });

        default:
            return state;
    }
}

