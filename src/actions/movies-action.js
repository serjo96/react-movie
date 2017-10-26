import {UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, SEARCH_VALUE, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA, TV_DATA, CLEAR_TV_DATA, CLEAR_SEARCH} from '../constants';

import * as axios from 'axios';
import { SEARCH_MOVIE } from '../constants/index';

function loadUpcomingMovies(movies) {
    return {
        type: UPCOMING_MOVIES,
	    movies
    };
}

function loadTopMovies(movies) {
    return {
        type: TOP_MOVIES,
	    movies
    };
}
function loadPopularMovies(movies) {
    return {
        type: POPULAR_MOVIES,
	    movies
    };
}

function loadPlayingMovies(movies) {
    return {
        type: PLAYING_MOVIES,
	    movies
    };
}


function takeSearchValue(querySearch) {
    return {
        type: SEARCH_VALUE,
	    querySearch
    };
}
function searchMovie(querySearch) {
    return {
        type: SEARCH_MOVIE,
	    querySearch
    };
}

function takeMovieData( data ) {
	return {
		type: MOVIE_DATA,
		data
	};
}

export function clearMovieData() {
	return {
		type: CLEAR_MOVIE_DATA
	}
}

function takeTvData( data ) {
	return {
		type: TV_DATA,
		data
	};
}

export function clearTvData() {
	return {
		type: CLEAR_TV_DATA
	}
}
export function clearSearch() {
	return {
		type: CLEAR_SEARCH
	}
}

export function onLoadPage() {

    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming',
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    page: 1,
                    region: 'RU'
                }
            }
        ).then(response => {
            console.log(response);
            dispatch(loadUpcomingMovies(response.data));
        });

        axios.get('https://api.themoviedb.org/3/movie/top_rated',
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    page: 1,
                    region: 'RU'
                }
            }
        ).then(response => {
            console.log(response);
            dispatch(loadTopMovies(response.data));
        });

		 axios.get('https://api.themoviedb.org/3/movie/popular',
		            {
		                params: {
		                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
		                    language: 'ru-RU',
		                    page: 1,
		                    region: 'RU'
		                }
		            }
		 ).then(response => {
			 console.log(response);
			 dispatch(loadPopularMovies(response.data));
		 });

        axios.get('https://api.themoviedb.org/3/movie/now_playing',
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    page: 1,
                    region: 'RU'
                }
            }
        ).then(response => {
            console.log(response);
            dispatch(loadPlayingMovies(response.data));
        });

    };
}


export function onSearch(words) {
    return ( dispatch ) => {
        dispatch(takeSearchValue(words));
        if(words.length>0){
		    axios.get('https://api.themoviedb.org/3/search/multi',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: 1,
					    region: 'RU',
	                    query: words
				    }
			    }
		    ).then(response => {
			    console.log(response);
			    dispatch(searchMovie(response.data));
		    });
        }
    };
}

export function onLoadMovie(id) {
	return ( dispatch ) => {
		axios.get('https://api.themoviedb.org/3/movie/'+id,
			{
				params: {
					api_key: '5a1d310d575e516dd3c547048eb7abf1',
					language: 'ru-RU',
					include_image_language: 'ru',
					append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
				}
			}
		).then(response => {
			console.log(response);
			dispatch(takeMovieData(response.data));
		});
	};
};

export function onLoadTV(id) {
	return ( dispatch ) => {
		axios.get('https://api.themoviedb.org/3/tv/'+id,
			{
				params: {
					api_key: '5a1d310d575e516dd3c547048eb7abf1',
					language: 'ru-RU',
					include_image_language: 'ru',
					append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
				}
			}
		).then(response => {
			console.log(response);
			dispatch(takeTvData(response.data));
		});
	};
};
