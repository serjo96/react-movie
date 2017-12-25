import { SEARCH_IN_PAGE, SEARCH_IN_HEADER, CLEAR_SEARCH, GENRES,  SEARCH_KEYWORDS_MOVIES, SEARCH_GENRES_MOVIES, MEDIA_ENG_DATA  } from '../constants';
import update from 'react-addons-update';


const initialState = {
    SearchHeaderField: '',
    SearchHeaderResult: {
        isFetching: false
    },
    Genres: {
        isFetching: JSON.parse(localStorage.getItem('genres')) ? true : false,
        data: JSON.parse(localStorage.getItem('genres')) || null
    },
    GenresList: {
        isFetching: false,
        data: null
    },
    KeywordsList: {
        isFetching: false,
        data: null
    },
    SearchPageResult: {
    	isFetching: false,
        data: {querySearch: ''}
    },
	EngDescription: {
		isFetching: false,
    	tv: {

	    },
		movie: {

		}
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
			    concatArr = action.genres.movie.concat(action.genres.tv),
			    addNewValue =  action.genres.movie.unshift({id: 0 , name: 'Все жанры'});
		    concatArr.map((item)=> hashObj[item.id] = item.name);
		    localStorage.setItem('genres', JSON.stringify({obj: hashObj, arr: {AllGenres: concatArr ,movieGenres: action.genres.movie, tvGenres: action.genres.tv} }));
		    return update(state, {
			    Genres: {$merge: {
					    isFetching: true,
					    data: {obj: hashObj, arr: {AllGenres: concatArr ,movieGenres: action.genres.movie, tvGenres: action.genres.tv} }
				    }
			    }
		    });

        case SEARCH_GENRES_MOVIES:
            return update(state, {
                GenresList: {$merge: {
                    isFetching: true,
                    data: action.genres
                }}
            });

	    case SEARCH_KEYWORDS_MOVIES:
	    	return update(state, {
			    KeywordsList: {$merge: {
	    			isFetching: true,
					    data: action.keywords
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

