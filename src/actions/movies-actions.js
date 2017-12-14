import {
    UPCOMING_MOVIES, POPULAR_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
    MOVIE_ENG_DATA
} from '../constants';
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


function takeMovieData( data ) {
    return {
        type: MOVIE_DATA,
        data
    };
}

function takeEngMovieData( data ) {
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
            dispatch(loadPlayingMovies(response.data));
        });

    };
}


export function onLoadMovie(id, lang='ru-RU') {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/movie/'+id,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: lang,
                    include_image_language: 'ru,null',
                    append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
                }
            }
        ).then(res => {
            if (res.data.belongs_to_collection) {
                axios.get('https://api.themoviedb.org/3/collection/' + res.data.belongs_to_collection.id,
                    {
                        params: {
                            api_key: '5a1d310d575e516dd3c547048eb7abf1',
                            language: lang
                        }
                    }
                ).then(response=>{
                    let data = Object.assign({collection: response.data}, res.data);
                    dispatch(takeMovieData(data));
                });
            } else {
            	if (lang === 'ru-RU') {
                    dispatch(takeMovieData(res.data));
	            } else {
            		dispatch(takeEngMovieData(res.data));
	            }
            }
        });
    };
}

export function movieUpcoming(page=1) {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/movie/upcoming',
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    page: page,
                    region: 'RU'
                }
            }
        ).then(response => {
            dispatch(loadUpcomingMovies(response.data));
        });
    };
}

export function movieListPopular(page=1) {
    return ( dispatch ) => {
	    axios.all([
		    axios.get('https://api.themoviedb.org/3/movie/popular',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page,
					    region: 'RU'
				    }
			    }),
		    axios.get('https://api.themoviedb.org/3/movie/popular',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page+1,
					    region: 'RU'
				    }
			    })
	    ]).then(axios.spread((pageOne, pageTwo) => {
		    let concatPages;
		    if (pageOne.data.total_pages > 1) {
			    concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page});
		    } else {
			    concatPages = pageOne.data;
		    }
		    dispatch(loadPopularMovies(concatPages));
	    }));
    };
}

export function movieListPlaying(page=1) {
    return ( dispatch ) => {
	    axios.all([
		    axios.get('https://api.themoviedb.org/3/movie/now_playing',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page,
					    region: 'RU'
				    }
			    }),
		    axios.get('https://api.themoviedb.org/3/movie/now_playing',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page+1,
					    region: 'RU'
				    }
			    })
	    ]).then(axios.spread((pageOne, pageTwo) => {
		    let concatPages;
	    	if (pageOne.data.total_pages > 1) {
		        concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page});
		    } else {
			    concatPages = pageOne.data;
		    }
		    dispatch(loadPlayingMovies(concatPages));
	    }));
    };
}

export function movieListTop(page=1) {
    return ( dispatch ) => {
	    axios.all([
		    axios.get('https://api.themoviedb.org/3/movie/top_rated',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page,
					    region: 'RU'
				    }
			    }),
		    axios.get('https://api.themoviedb.org/3/movie/top_rated',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page+1,
					    region: 'RU'
				    }
			    })
	    ]).then(axios.spread((pageOne, pageTwo) => {
		    let concatPages;
		    if (pageOne.data.total_pages > 1) {
			    concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page});
		    } else {
			    concatPages = pageOne.data;
		    }
		    dispatch(loadTopMovies(concatPages));
	    }));
    };
}


