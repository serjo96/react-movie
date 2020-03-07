import {
    UPCOMING_MOVIES, ALL_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
    MOVIE_ENG_DATA, CHANGE_MOVIES_PAGE
} from '../constants';


export function loadUpcomingMovies(movies) {
    return {
        type: UPCOMING_MOVIES,
	    movies
    };
}

export function loadTopMovies(movies) {
    return {
        type: TOP_MOVIES,
	    movies
    };
}
export function loadPopularMovies(movies) {
    return {
        type: ALL_MOVIES,
	    movies
    };
}

export function loadPlayingMovies(movies) {
    return {
        type: PLAYING_MOVIES,
	    movies
    };
}


export function takeMovieData( data ) {
    return {
        type: MOVIE_DATA,
        data
    };
}

export function takeEngMovieData( data ) {
    return {
        type: MOVIE_ENG_DATA,
        data
    };
}

export function clearMovieData() {
    return {
        type: CLEAR_MOVIE_DATA
    };
}


export function changeMoviePage(typeList) {
    return {
        type: CHANGE_MOVIES_PAGE,
        typeList
    };
}
