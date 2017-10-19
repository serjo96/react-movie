import { UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, SEARCH_VALUE, SEARCH_MOVIE, TOP_MOVIES} from '../constants';
import update from 'react-addons-update';


const initialState = {
    upcomingMovies: {
        isFetching: false
    },
    TopMovies: {
        isFetching: false
    },
    PopMovies: {
        isFetching: false
    },
    PlayingMovies: {
        isFetching: false
    },
    SearchField: '',
    SearchResult: {
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
	    case POPULAR_MOVIES:
		    return update(state, {
			    PopMovies: {$merge: {
				    isFetching: true,
				    data: action.movies
			        }
			    }
		    });
	    case TOP_MOVIES:
		    return update(state, {
			    TopMovies: {$merge: {
				    isFetching: true,
				    data: action.movies
			        }
			    }
		    });
	    case PLAYING_MOVIES:
		    return update(state, {
			    PlayingMovies: {$merge: {
				    isFetching: true,
				    data: action.movies
			        }
			    }
		    });
	    case SEARCH_VALUE:
		    return update(state, {
			    SearchField: {$set: action.querySearch}
		    });

        case SEARCH_MOVIE:
            return update(state, {
                SearchResult: {$merge: {
                    isFetching: true,
                    data: action.querySearch
                }
                }
            });


        default:
            return state;
    }
}

