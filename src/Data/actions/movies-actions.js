import {
    UPCOMING_MOVIES, ALL_MOVIES, PLAYING_MOVIES, TOP_MOVIES, MOVIE_DATA, CLEAR_MOVIE_DATA,
    MOVIE_ENG_DATA, CHANGE_MOVIES_PAGE
} from '../constants/index';
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
        type: ALL_MOVIES,
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


export function changeMoviePage(typeList) {
    return {
        type: CHANGE_MOVIES_PAGE,
        typeList
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
            dispatch(loadUpcomingMovies({data: response.data, status: response.status  === 200}));
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
            dispatch(loadTopMovies({data: response.data, status: response.status  === 200}));
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
			 dispatch(loadPopularMovies({data: response.data, status: response.status  === 200}));
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
            dispatch(loadPlayingMovies({data: response.data, status: response.status  === 200}));
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
                    dispatch(takeMovieData({data: data, status: response.status  === 200 && res.status }));
                });
            } else {
            	if (lang === 'ru-RU') {
                    dispatch(takeMovieData({data: res.data, status: res.status === 200}));
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
            dispatch(loadUpcomingMovies({data: response.data, status: response.status === 200}));
        });
    };
}

export function movieListPopular(page = 1, genre, sortType = 'popularity.desc', date, region, adult) {
    let year,
        rageDates,
        startRangeDate,
        endRangeDate;
    if (date.type === 'range') {
        rageDates = date.date.split('=');
        startRangeDate = rageDates[0];
        endRangeDate = rageDates[1];
    } else {
        year = date.date;
    }

	return ( dispatch ) => {
	    axios.all([
		    axios.get('https://api.themoviedb.org/3/discover/movie',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    region: region,
					    sort_by: sortType,
					    with_genres: genre,
					    primary_release_year: year,
					    'primary_release_date.gte': startRangeDate,
					    'primary_release_date.lte': endRangeDate,
					    page: page,
					    include_adult: adult
				    }
			    }),
		    axios.get('https://api.themoviedb.org/3/discover/movie',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    region: region,
					    sort_by: sortType,
					    with_genres: genre,
					    primary_release_year: year,
					    'primary_release_date.gte': startRangeDate,
					    'primary_release_date.lte': endRangeDate,
					    page: page+1,
					    include_adult: adult
				    }
			    })
	    ]).then(axios.spread((pageOne, pageTwo) => {
		    let concatPages;
		    if (pageOne.data.total_pages > 1) {
			    concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page, sortByDate: date});
		    } else {
			    concatPages = pageOne.data;
		    }
		    dispatch(loadPopularMovies({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
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
		    dispatch(loadPlayingMovies({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
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
		    dispatch(loadTopMovies({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
	    }));
    };
}


