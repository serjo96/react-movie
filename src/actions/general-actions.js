import { CLEAR_SEARCH, GENRES, SEARCH_IN_HEADER, SEARCH_IN_PAGE, SEARCH_KEYWORDS_MOVIES, SEARCH_GENRES_MOVIES, MEDIA_ENG_DATA } from '../constants';
import * as axios from 'axios/index';


function searchMovie(querySearch) {
    return {
        type: SEARCH_IN_HEADER,
        querySearch
    };
}

function searchPageResults(results) {
    return {
        type: SEARCH_IN_PAGE,
        results
    };
}


export function clearSearch() {
    return {
        type: CLEAR_SEARCH
    };
}


function takeGenres(genres) {
    return {
        type: GENRES,
        genres
    };
}



function takeKeywordsMovies(keywords) {
    return {
        type: SEARCH_KEYWORDS_MOVIES,
        keywords
    };
}

function takeEngMedia(engData) {
    return {
        type: MEDIA_ENG_DATA,
        engData
    };
}



export function onSearch(words) {
    return ( dispatch ) => {
        if (words.length>0) {
            axios.get('https://api.themoviedb.org/3/search/multi',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        page: 1,
                        region: 'RU',
                        query: words,
	                    include_adult: true
                    }
                }
            ).then(response => {
            	dispatch(searchMovie(response.data));
            });
        }
    };
}

export function MainSearch(words, page=1) {
	    return ( dispatch ) => {
	        if (words.length>0) {
	            axios.all([
	                axios.get('https://api.themoviedb.org/3/search/multi',
	                    {
	                        params: {
	                            api_key: '5a1d310d575e516dd3c547048eb7abf1',
	                            language: 'ru-RU',
	                            page: page,
	                            region: 'RU',
		                        include_adult: true,
	                            query: words.replace('_', ' ')
	                        }
	                    }),
	                axios.get('https://api.themoviedb.org/3/search/multi',
	                    {
	                        params: {
	                            api_key: '5a1d310d575e516dd3c547048eb7abf1',
	                            language: 'ru-RU',
	                            page: page+1,
	                            region: 'RU',
		                        include_adult: true,
	                            query: words.replace('_', ' ')
	                        }
	                    })
	            ]).then(axios.spread((pageOne, pageTwo) => {
	                let addTypeRequest =  Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page, searchType: {type: 'main-search'}, querySearch: words.replace('_', ' ')});
	                dispatch(searchPageResults({data: addTypeRequest, status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 }}));
	            }));
	        }
	    };
}


export function onGeneres() {
    return ( dispatch ) => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/genre/movie/list',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU'
                    }
                }),
            axios.get('https://api.themoviedb.org/3/genre/tv/list',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU'
                    }
                })
        ]).then(axios.spread((genresMovie, genresTV) => {
            dispatch(takeGenres({movie: genresMovie.data.genres, tv: genresTV.data.genres}));
        }));
    };
}


export function keywordsReq(id, type, page=1) {
    return ( dispatch ) => {
        axios.all([
            axios.get(`https://api.themoviedb.org/3/discover/${type}`,
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        with_keywords: id,
                        page: page,
                        include_adult: true
                    }
                }),
            axios.get(`https://api.themoviedb.org/3/discover/${type}`,
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        with_keywords: id,
                        page: page+1,
                        include_adult: true
                    }
                })
        ]).then(axios.spread((pageOne, pageTwo) => {
            let concatPages;
            if (pageOne.data.total_pages > 1) {
                concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page, searchType: {type: 'genres'}});
            } else {
                concatPages = pageOne.data;
            }
            dispatch(takeKeywordsMovies({data: concatPages,  status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 }}));
        }));
    };
}


export function onLoadEngMedia(id, type) {
    return ( dispatch ) => {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}`,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'en-US',
                    include_image_language: 'ru,null',
                    append_to_response: 'credits,images,videos,recommendations,reviews,lists,keywords,release_dates'
                }
            }
        ).then(res => {
            let response = Object.assign({...res.data, typeResponse: type});
            dispatch(takeEngMedia(response));
        });
    };
}
