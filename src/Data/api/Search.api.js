import { searchMovie, searchPageResults } from './../actions/general-actions';
import * as axios from 'axios/index';

export function onSearch(words) {
    return ( dispatch ) => {
        if (words.length > 0) {
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

export function MainSearch(words, page = 1) {
    return ( dispatch ) => {
        if (words.length > 0) {
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
                            page: page + 1,
                            region: 'RU',
                            include_adult: true,
                            query: words.replace('_', ' ')
                        }
                    })
            ]).then(axios.spread((pageOne, pageTwo) => {
                let addTypeRequest =  Object.assign({
                    ...pageTwo.data,
                    results: pageOne.data.results.concat(pageTwo.data.results),
                    page: pageOne.data.page,
                    searchType: {type: 'main-search'},
                    querySearch: words.replace('_', ' ')
                });
                dispatch(searchPageResults({data: addTypeRequest, status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 }}));
            }));
        }
    };
}

