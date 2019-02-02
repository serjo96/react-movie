import * as axios from 'axios/index';
import {
    loadAiringTV,
    loadOnTheAirTV,
    loadPopularTV,
    loadSeasonTV,
    loadTopTV,
    takeEngTvData,
    takeTvData
} from './../actions/tv-actions';

export function onLoadTV(id, lang = 'ru-RU') {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/tv/' + id,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: lang,
                    include_image_language: 'ru,null',
                    append_to_response: 'content_ratings,credits,external_ids,images,keywords,recommendations,screened_theatrically,similar,translations,videos'
                }
            }
        ).then(response => {
            if (lang === 'ru-RU') {
                dispatch(takeTvData({data: response.data, status: response.status === 200}));
            } else {
                dispatch(takeEngTvData(response.data));
            }
        });
    };
}

export function tvAiring(page = 1) {
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
                        page: page + 1,
                        region: 'RU'
                    }
                })
        ]).then(axios.spread((pageOne, pageTwo) => {
            let concatPages;
            if (pageOne.data.total_pages > 1) {
                concatPages = Object.assign({
                    ...pageTwo.data,
                    results: pageOne.data.results.concat(pageTwo.data.results),
                    page: pageOne.data.page
                });
            } else {
                concatPages = pageOne.data;
            }
            dispatch(loadAiringTV({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200}));
        }));
    };
}

export function tvPopular(page = 1, genre, sortType = 'popularity.desc', date) {
    let year = date + '',
        rageDates,
        startRangeDate,
        endRangeDate;

    if (year && year.split('-').length > 1 ) {
        rageDates = year.split('-');
        startRangeDate = rageDates[0];
        endRangeDate = rageDates[1];
    } else {
        year = date;
    }

    return ( dispatch ) => {
        axios.all([
            axios.get('https://api.themoviedb.org/3/discover/tv',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        sort_by: sortType,
                        with_genres: genre,
                        first_air_date_year: year,
                        'first_air_date.gte': startRangeDate,
                        'first_air_date.lte': endRangeDate,
                        page: page
                    }
                }),
            axios.get('https://api.themoviedb.org/3/discover/tv',
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        sort_by: sortType,
                        with_genres: genre,
                        first_air_date_year: year,
                        'first_air_date.gte': startRangeDate,
                        'first_air_date.lte': endRangeDate,
                        page: page + 1
                    }
                })
        ]).then(axios.spread((pageOne, pageTwo) => {
            let concatPages;
            if (pageOne.data.total_pages > 1) {
                concatPages = Object.assign({
                    ...pageTwo.data,
                    results: pageOne.data.results.concat(pageTwo.data.results),
                    page: pageOne.data.page,
                    sortByDate: date
                });
            } else {
                concatPages = pageOne.data;
            }
            dispatch(loadPopularTV({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200 }));
        }));
    };
}

export function tvOnTheAir(page = 1) {
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
                        page: page + 1,
                        region: 'RU'
                    }
                })
        ]).then(axios.spread((pageOne, pageTwo) => {
            let concatPages;
            if (pageOne.data.total_pages > 1) {
                concatPages = Object.assign({
                    ...pageTwo.data,
                    results: pageOne.data.results.concat(pageTwo.data.results),
                    page: pageOne.data.page
                });
            } else {
                concatPages = pageOne.data;
            }
            dispatch(loadOnTheAirTV({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200}));
        }));
    };
}

export function tvTop(page = 1) {
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
                        page: page + 1,
                        region: 'RU'
                    }
                })
        ]).then(axios.spread((pageOne, pageTwo) => {
            let concatPages;
            if (pageOne.data.total_pages > 1) {
                concatPages = Object.assign({
                    ...pageTwo.data,
                    results: pageOne.data.results.concat(pageTwo.data.results),
                    page: pageOne.data.page
                });
            } else {
                concatPages = pageOne.data;
            }
            dispatch(loadTopTV({data: concatPages, status: pageOne.status === 200 && pageTwo.status === 200}));
        }));
    };
}


export function onSeasonTV(id, season) {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/tv/' + id + '/season/' + season,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU',
                    include_image_language: 'ru,null',
                    append_to_response: 'credits, external_ids,images,videos'
                }
            }
        ).then(response => {
            dispatch(loadSeasonTV(response.data));
        });
    };
}


