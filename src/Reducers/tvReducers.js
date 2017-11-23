import { TV_DATA, CLEAR_TV_DATA, AIRING_TV, POPULAR_TV, ON_THE_AIR_TV, TOP_TV, CLEAR_TV_IMAGES } from '../constants';
import update from 'react-addons-update';


const initialState = {
    TvData: {
        isFetching: false
    },
    airingTv: {
        isFetching: false
    },
    TopTv: {
        isFetching: false
    },
    PopTv: {
        isFetching: false
    },
    OnTheAirTv: {
        isFetching: false
    }
};

export default function TVs(state = initialState, action) {

    switch (action.type) {

        case TV_DATA:
            return update(state, {
                TvData: {$merge: {
                    isFetching: true,
                    data: action.data,
	                images: action.data.images.backdrops.concat(action.data.images.posters)
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

        case CLEAR_TV_IMAGES:
            return update(state, {
                TvData: {$merge: {
                    isFetching: false,
	                images: null
                }
                }
            });

	    case AIRING_TV:
		    return update(state, {
			    airingTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }
			    }
		    });

	    case POPULAR_TV:
		    return update(state, {
			    PopTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }
			    }
		    });

	    case TOP_TV:
		    let results = action.TV.results.sort((a, b)=> b.vote_average - a.vote_average);
		    return update(state, {
			    TopTv: {$merge: {
				    isFetching: true,
				    data: {...action.TV,  results: results}
			    }
			    }
		    });

	    case ON_THE_AIR_TV:
		    return update(state, {
			    OnTheAirTv: {$merge: {
				    isFetching: true,
				    data: action.TV
			    }
			    }
		    });


        default:
            return state;
    }
}

