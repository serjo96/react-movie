import { SEARCH_IN_PAGE, SEARCH_IN_HEADER, CLEAR_SEARCH, GENRES,  SEARCH_KEYWORDS_MOVIES, SEARCH_GENRES_MOVIES, MEDIA_ENG_DATA  } from '../constants/index';
import update from 'react-addons-update';


const initialState = {
    SearchHeaderField: '',
    SearchHeaderResult: {
        isFetching: false,
	    data: {
		    page: 1,
		    total_results: '',
		    total_pages: '',
		    results: []
	    },
	    status: {
		    pageOne: 200,
		    pageTwo: 200
	    }
    },
    Genres: {
        isFetching: !!JSON.parse(localStorage.getItem('genres')),
        data: JSON.parse(localStorage.getItem('genres')) || null
    },
    KeywordsList: {
        isFetching: false,
        data: {
	        page: 1,
	        total_results: '',
	        total_pages: '',
	        results: []
        },
	    status: {
		    pageOne: 200,
		    pageTwo: 200
	    }
    },
    SearchPageResult: {
    	isFetching: false,
        data: {
    		querySearch: '',
	        page: 1,
	        total_results: '',
	        total_pages: '',
	        results: []
        },
	    status: {
		    pageOne: 200,
		    pageTwo: 200
	    }
    },
	EngDescription: {
		isFetching: false,
    	tv: {
		    0: {mame: '', id: ''}
	    },
		movie: {
			0: {mame: '', id: ''}
		}
	}
};

export default function General(state = initialState, action) {
    switch (action.type) {

        case SEARCH_IN_PAGE:
            return update(state, {
	            SearchPageResult: {$merge: {
			            isFetching: true,
			            data: action.results.data,
			            status: action.results.status
		            }}
            });

        case SEARCH_IN_HEADER:
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
		    let hashObj = {},
			    concatArr = action.genres.movie.concat(action.genres.tv);
		    concatArr.map((item)=> hashObj[item.id] = item.name);
		    let allGenres = Object.keys(hashObj).map(key => {return {id: key, name: hashObj[key]}});
		    allGenres.unshift({id: 0, name: 'Все жанры'});
		    action.genres.movie.unshift({id: 0, name: 'Все жанры'});

		    localStorage.setItem('genres', JSON.stringify({obj: hashObj, arr: {AllGenres: allGenres, movieGenres: action.genres.movie, tvGenres: action.genres.tv} }));
		    return update(state, {
			    Genres: {$merge: {
					    isFetching: true,
					    data: {obj: hashObj, arr: {AllGenres: allGenres ,movieGenres: action.genres.movie, tvGenres: action.genres.tv} },

				    }
			    }
		    });


	    case SEARCH_KEYWORDS_MOVIES:
	    	return update(state, {
			    KeywordsList: {$merge: {
	    			isFetching: true,
					    data: action.keywords.data,
					    status: action.keywords.status
				    }}
			    });

	    case MEDIA_ENG_DATA:
		        return update(state, {
			        EngDescription: {$merge: {
		                isFetching: true,
						    [action.engData.typeResponse]: {
		                	...state.EngDescription[action.engData.typeResponse],
							    [action.engData.id]:{name: action.engData.name ? action.engData.name: action.engData.title, overview:  action.engData.overview.length>0 ? action.engData.overview : 404}
		                    }
					    }}
				    });


        default:
            return state;
    }
}

