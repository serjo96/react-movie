import {UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, SEARCH_VALUE, TOP_MOVIES} from '../constants';

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
