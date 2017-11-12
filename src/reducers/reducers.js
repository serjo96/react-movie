import { UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, SEARCH_VALUE, SEARCH_MOVIE, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA, TV_DATA, CLEAR_TV_DATA, CLEAR_SEARCH} from '../constants';
import update from 'react-addons-update';


const initialState = {
	MovieData: {
		isFetching: false
	},
	TvData: {
		isFetching: false
	},
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
		    let results = action.movies.results.sort((a,b)=> b.vote_average - a.vote_average);
		    return update(state, {
			    TopMovies: {$merge: {
				    isFetching: true,
				    data: {...action.movies,  results: results}
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

	    case MOVIE_DATA:
            return update(state, {
                MovieData: {$merge: {
                    isFetching: true,
                    data: action.data,
	                images: action.data.images.backdrops.concat(action.data.images.posters),
	                crew: {
			                Director: action.data.credits.crew.filter(item => item.job === 'Director'),
			                Screenplay: action.data.credits.crew.filter( item => item.department === 'Writing'),
			                Producer: action.data.credits.crew.filter( item => item.job === 'Producer'),
			                Director_of_Photography: action.data.credits.crew.filter( item => item.job === 'Director of Photography'),
			                Music: action.data.credits.crew.filter( item => item.job === 'Music' || item.job === 'Original Music Composer'),
			                Art: action.data.credits.crew.filter( item => item.department === 'Art')
	                    }
                    }
                }
            });


        case CLEAR_MOVIE_DATA:
            return update(state, {
                MovieData: {$merge: {
                    isFetching: false,
                    data: null
                    }
                }
            });

	    case TV_DATA:
		    return update(state, {
			    TvData: {$merge: {
				    isFetching: true,
				    data: action.data
			    }
			    }
		    });


	    case CLEAR_TV_DATA:
		    return update(state, {
			    TvData: {$merge: {
				    isFetching: false,
				    data: null
			    }
			    }
		    });

	    case CLEAR_SEARCH:
		    return update(state, {
			    $merge: {SearchField: ''}
		    });


        default:
            return state;
    }
}

