import { CLEAR_SEARCH, GENRES, SEARCH_MEDIA, SEARCH_IN_PAGE, SEARCH_KEYWORDS_MOVIES, SEARCH_GENRES_MOVIES } from '../constants';
import * as axios from 'axios/index';


function searchMovie(querySearch) {
    return {
        type: SEARCH_MEDIA,
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


function takeGenresMovies(genres) {
    return {
        type: SEARCH_GENRES_MOVIES,
        genres
    };
}

function takeKeywordsMovies(keywords) {
    return {
        type: SEARCH_KEYWORDS_MOVIES,
        keywords
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
                        query: words
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
                dispatch(searchPageResults(addTypeRequest));
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
            let concatData;
            if (genresMovie.data) {
                concatData = genresMovie.data.genres.concat(genresTV.data.genres);
            } else {
                concatData = genresMovie.data;
            }
            dispatch(takeGenres(concatData));
        }));
    };
}


export function genreReq(id, type, page=1) {
    return ( dispatch ) => {
        axios.all([
            axios.get(`https://api.themoviedb.org/3/discover/${type}`,
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
	                    with_genres: id,
                        page: page,
                        include_adult: true
                    }
                }),
            axios.get(`https://api.themoviedb.org/3/discover/${type}`,
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
	                    with_genres: id,
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
            dispatch(takeGenresMovies(concatPages));
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
			dispatch(takeKeywordsMovies(concatPages));
		}));
	};
}

// export function keywordsReq(id, page=1) {
//     return ( dispatch ) => {
//         axios.all([
//             axios.get(`https://api.themoviedb.org/3/keyword/${id}/movies`,
//                 {
//                     params: {
//                         api_key: '5a1d310d575e516dd3c547048eb7abf1',
//                         language: 'ru-RU',
//                         page: page,
//                         include_adult: true
//                     }
//                 }),
//             axios.get(`https://api.themoviedb.org/3/keyword/${id}/movies`,
//                 {
//                     params: {
//                         api_key: '5a1d310d575e516dd3c547048eb7abf1',
//                         language: 'ru-RU',
//                         page: page+1,
//                         include_adult: true
//                     }
//                 }),
//             axios.get(`https://api.themoviedb.org/3/keyword/${id}`,
//                 {
//                     params: {
//                         api_key: '5a1d310d575e516dd3c547048eb7abf1'
//                     }
//                 })
//
//         ]).then(axios.spread((pageOne, pageTwo, keywordInfo) => {
//             let concatPages;
//             if (pageOne.data.total_pages > 1) {
//                 concatPages = Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page, searchType: {name: keywordInfo.data.name, type: 'keywords'}});
//             } else {
//                 concatPages = Object.assign({...pageOne.data, searchType: {name: keywordInfo.data.name, type: 'keywords'}});
//             }
//             dispatch(takeKeywordsMovies(concatPages));
//         }));
//     };
// }


export function FullSearch(type, genre='', page=1) {
	return ( dispatch ) => {
		if (words.length>0) {
			axios.all([
				axios.get(`https://api.themoviedb.org/3/discover/${type}`,
					{
						params: {
							api_key: '5a1d310d575e516dd3c547048eb7abf1',
							language: 'ru-RU',
							region: 'RU',
                            with_genres: genre,
							page: page,
						}
					}),
				axios.get(`https://api.themoviedb.org/3/discover/${type}`,
					{
						params: {
							api_key: '5a1d310d575e516dd3c547048eb7abf1',
							language: 'ru-RU',
							region: 'RU',
                            with_genres: genre,
							page: page+1,
						}
					})
			]).then(axios.spread((pageOne, pageTwo) => {
				let addTypeRequest =  Object.assign({...pageTwo.data, results: pageOne.data.results.concat(pageTwo.data.results), page: pageOne.data.page, searchType: {type: 'main-search'}});
				dispatch(searchPageResults(addTypeRequest));
			}));
		}
	};
}
