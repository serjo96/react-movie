import {UPCOMING_MOVIES, TOP_MOVIES, PLAYING_MOVIES} from '../constants';

import * as axios from 'axios';

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

function loadPlayingMovies(movies) {
    return {
        type: PLAYING_MOVIES,
	    movies
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
            dispatch(loadTopMovies(response.data));
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
