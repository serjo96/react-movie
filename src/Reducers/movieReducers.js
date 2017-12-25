import {
	UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
	MOVIE_ENG_DATA, CHANGE_MOVIES_PAGE
} from '../constants';
import update from 'react-addons-update';


const initialState = {
	MovieData: {
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
    }

};

export default function Movies(state = initialState, action) {
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
	    	let data = action.movies.results,
			    totalPages = action.movies.total_results;
	    	if(action.movies.sortByDate > 0){
	    		data = action.movies.results.filter(val=> action.movies.sortByDate === new Date(val.release_date).getFullYear());
			    totalPages = data.length;
		    }
		    return update(state, {
			    PopMovies: {$merge: {
				    isFetching: true,
				    data: {...action.movies,  results: data, total_results: totalPages}
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


	    case CHANGE_MOVIES_PAGE:
            return update(state, {
	            PopMovies: {$merge: {
			            isFetching: false,

		            }
	            }
            });

	    case MOVIE_ENG_DATA:
		    return update(state, {
			    MovieData: {$merge: {
					    data: {...state.MovieData.data, original_title: state.MovieData.data.original_title !== action.data.title ? action.data.title: state.MovieData.data.original_title, overview: action.data.overview}
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



        default:
            return state;
    }
}

