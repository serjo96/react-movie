import { TV_DATA, CLEAR_TV_DATA, AIRING_TV, POPULAR_TV, ON_THE_AIR_TV, TOP_TV, CLEAR_TV_IMAGES } from '../constants';
import * as axios from 'axios';

function takeTvData( data ) {
    return {
        type: TV_DATA,
        data
    };
}

export function clearTvData() {
    return {
        type: CLEAR_TV_DATA
    };
}
export function clearTvImages() {
    return {
        type: CLEAR_TV_IMAGES
    };
}

function loadAiringTV(TV) {
    return {
        type: AIRING_TV,
        TV
    };
}

function loadTopTV(TV) {
    return {
        type: TOP_TV,
        TV
    };
}
function loadPopularTV(TV) {
    return {
        type: POPULAR_TV,
        TV
    };
}

function loadOnTheAirTV(TV) {
    return {
        type: ON_THE_AIR_TV,
        TV
    };
}

function loadLastesTV(TV) {
    return {
        type: LATEST_TV,
        TV
    };
}


export function onLoadTV(id) {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/tv/'+id,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    include_image_language: 'ru,null',
                    append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
                }
            }
        ).then(response => {
            dispatch(takeTvData(response.data));
        });
    };
}

export function tvAiring(page=1) {
    return ( dispatch ) => {
	    axios.all([
		    axios.get('https://api.themoviedb.org/3/tv/airing_today',
			    {
				    params: {
					    api_key: '5a1d310d575e516dd3c547048eb7abf1',
					    language: 'ru-RU',
					    page: page,
					    region: 'RU'
				    }
			    }),
		    axios.get('https://api.themoviedb.org/3/tv/airing_today',
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
		    dispatch(loadAiringTV(concatPages));
	    }));
    };
}

export function tvPopular(page=1) {
    return ( dispatch ) => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/tv/popular',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        page: page,
                        region: 'RU'
                    }
                }),
            axios.get('https://api.themoviedb.org/3/tv/popular',
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
            dispatch(loadPopularTV(concatPages));
        }));
    };
}

export function tvonTheAir(page=1) {
    return ( dispatch ) => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/tv/on_the_air',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        page: page,
                        region: 'RU'
                    }
                }),
            axios.get('https://api.themoviedb.org/3/tv/on_the_air',
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
            dispatch(loadOnTheAirTV(concatPages));
        }));
    };
}

export function tvTop(page=1) {
    return ( dispatch ) => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/tv/top_rated',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        page: page,
                        region: 'RU'
                    }
                }),
            axios.get('https://api.themoviedb.org/3/tv/top_rated',
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
            dispatch(loadTopTV(concatPages));
        }));
    };
}

