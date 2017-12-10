import { SEARCH_IN_PAGE, SEARCH_MEDIA, CLEAR_SEARCH, GENRES,  SEARCH_KEYWORDS_MOVIES, SEARCH_GENRES_MOVIES  } from '../constants';
import update from 'react-addons-update';


const initialState = {
    SearchHeaderField: '',
    SearchHeaderResult: {
        isFetching: false
    },
	Genres:{
		isFetching: false,
		data: null
	},
	SearchPageResult: {
    	isFetching: false
	}
};

export default function General(state = initialState, action) {
    console.log(action);
    switch (action.type) {

        case SEARCH_IN_PAGE:
            return update(state, {
	            SearchPageResult: {$merge: {
			            isFetching: true,
			            data: action.results
		            }}
            });

        case SEARCH_MEDIA:
            return update(state, {
	            SearchHeaderResult: {$merge: {
                    isFetching: true,
                    data: action.querySearch
                }}
            });

        case CLEAR_SEARCH:
            return update(state, {
                $merge: {SearchField: ''}
            });


	    case GENRES:
		    let hashObj = {};
		    let hash = action.genres.map((item)=> hashObj[item.id] = item.name);
		    return update(state, {
			    Genres: {$merge: {
					    isFetching: true,
					    data: hashObj
				    }
			    }
		    });

	    case SEARCH_KEYWORDS_MOVIES:
	    	return update(state, {
	    		SearchPageResult: {$merge: {
	    			isFetching: true,
					    data: action.keywords
				    }}
			    });

		case SEARCH_GENRES_MOVIES:
			return update(state, {
				SearchPageResult: {$merge: {
					isFetching: true,
						data: action.genres
					}}
			});


        default:
            return state;
    }
}

