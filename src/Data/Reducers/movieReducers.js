import {
    UPCOMING_MOVIES, ALL_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
    MOVIE_ENG_DATA, CHANGE_MOVIES_PAGE
} from './../constants';
import update from 'react-addons-update';


const initialState = {
    MovieData: {
        isFetching: false,
	    data: {
        	collection: {},
		    backdrop_path: '',
		    budget: 0,
		    genres: [],
            id: '',
		    imdb_id: '',
		    original_title: '',
		    overview: '',
		    popularity: 0,
		    poster_path: '',
		    production_companies: [],
		    production_countries: [],
		    release_date: '',
		    revenue: 0,
		    runtime: 0,
		    tagline: '',
		    title: '',
		    vote_average: 0,
		    vote_count: 0,
		    keywords: {
        		keywords: []
		    },
		    lists: {
			    total_results: 0
		    },
		    credits: {
        	    cast: []
		    },
		    videos: {
        		results: []
        	},
		    recommendations: {
        		page: 1,
			    results: [],
			    total_pages: 0,
			    total_results: 0
		    }
	    },
	    images: [],
	    crew: {
		    Director: [],
		    Screenplay: [],
		    Producer: [],
		    Director_of_Photography: [],
		    Music: [],
		    Art: []
	    },
	    status: {
        	collection: true,
		    movie: true
	    }
    },
    upcomingMovies: {
        isFetching: false,
	    data: {
		    results: [],
		    page: 1,
		    total_results: 0,
		    dates: {
			    maximum: '',
			    minimum: ''
		    },
		    total_pages: 1
	    },
	    status: true
    },
    TopMovies: {
        isFetching: false,
	    data: {
		    page: 1,
		    total_results: 0,
		    total_pages: 0,
		    results: []
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    },
    AllMovies: {
        isFetching: false,
        data: {
            page: 1,
            total_results: 0,
            total_pages: 0,
            results: [],
            sortByDate: {}
        },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    },
    PlayingMovies: {
        isFetching: false,
	    data: {
		    results: [],
		    page: 1,
		    total_results: 0,
		    dates: {
			    maximum: '',
			    minimum: ''
		    },
		    total_pages: 1
	    },
	    status: {
		    pageOne: true,
		    pageTwo: true
	    }
    }
};

export default function Movies(state = initialState, action) {
    switch (action.type) {
	    case UPCOMING_MOVIES:
            return update(state, {
	            upcomingMovies: {$merge: {
			            isFetching: true,
			            data: action.movies.data,
			            status: action.movies.status
	                }
	            }
            });

	    case ALL_MOVIES:
	    	let data = action.movies.data.results,
			    totalPages = action.movies.data.total_results;
	    	if (action.movies.data.sortByDate > 0) {
	    		data = action.movies.data.results.sort(val=> +action.movies.data.sortByDate - +new Date(val.release_date).getFullYear());
			    totalPages = data.length;
		    }

		    return update(state, {
			    AllMovies: {$merge: {
					    isFetching: true,
					    data: {...action.movies.data,  results: data, total_results: totalPages},
					    status: action.movies.status
			        }
			    }
		    });

	    case TOP_MOVIES:
		    let results = action.movies.data.results.sort((a, b)=> b.vote_average - a.vote_average);
		    return update(state, {
			    TopMovies: {$merge: {
					    isFetching: true,
					    data: {...action.movies.data,  results: results},
					    status: action.movies.status
			        }
			    }
		    });

	    case PLAYING_MOVIES:
		    return update(state, {
			    PlayingMovies: {$merge: {
					    isFetching: true,
					    data: action.movies.data,
					    status: action.movies.status
			        }
			    }
		    });


	    case MOVIE_DATA:
            return update(state, {
                MovieData: {$merge: {
                    isFetching: true,
                    data: action.data.data,
	                images: action.data.data.images.backdrops.concat(action.data.data.images.posters),
	                crew: {
			                Director: action.data.data.credits.crew.filter(item => item.job === 'Director'),
			                Screenplay: action.data.data.credits.crew.filter( item => item.department === 'Writing'),
			                Producer: action.data.data.credits.crew.filter( item => item.job === 'Producer'),
			                Director_of_Photography: action.data.data.credits.crew.filter( item => item.job === 'Director of Photography'),
			                Music: action.data.data.credits.crew.filter( item => item.job === 'Music' || item.job === 'Original Music Composer'),
			                Art: action.data.data.credits.crew.filter( item => item.department === 'Art')
	                    },
		                status: action.data.status
                }
                }
            });


	    case CHANGE_MOVIES_PAGE:
            return update(state, {
	            [action.typeList]: {$merge: {
			            isFetching: false
		            }
	            }
            });

	    case MOVIE_ENG_DATA:
		    return update(state, {
			    MovieData: {$merge: {
					    data: {...state.MovieData.data,
						    original_title: state.MovieData.data.original_title !== action.data.title
							    ? action.data.title
							    : state.MovieData.data.original_title,
						    overview: action.data.overview
					    },
					    status: {
						    ...state.MovieData.status
					    }
				    }
			    }
		    });


        case CLEAR_MOVIE_DATA:
            return update(state, {
                MovieData: {$merge: {
                    isFetching: false,
                    data: initialState.MovieData.data
                }
                }
            });


        default:
            return state;
    }
}

