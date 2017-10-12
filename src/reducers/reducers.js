import { UPCOMING_MOVIES, TOP_MOVIES} from '../constants';
import update from 'react-addons-update';


const initialState = {
	upcomingMovies: {
        isFetching: false
    },
	topMovies:{
		isFetching: false
    }
};

export default function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
	    case UPCOMING_MOVIES:
            return update(state, {
	            upcomingMovies: {$merge: {
		            isFetching: true,
		            data: action.movies
	                }
	            }
            });
	    case TOP_MOVIES:
		    return update(state, {
			    topMovies: {$merge: {
				    isFetching: true,
				    data: action.movies
			    }
			    }
		    });
        default:
            return state;
    }
}

