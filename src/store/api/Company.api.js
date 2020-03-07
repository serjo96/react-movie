import * as axios from 'axios/index';
import { loadCompanyData, loadCompanyMovies } from './../actions/company-actions';

export function onLoadCompanyData(id) {
    return ( dispatch ) => {
        axios.get('https://api.themoviedb.org/3/company/' + id,
            {
                params: {
                    api_key: '5a1d310d575e516dd3c547048eb7abf1',
                    language: 'ru-RU'
                }
            }).then(response => {
            dispatch(loadCompanyData({data: response.data, status: response.status === 200}));
        });
    };
}


export function LoadCompanyMovies(id, page = 1) {
    return ( dispatch ) => {
        axios.all([
            axios.get(`https://api.themoviedb.org/3/company/${id}/movies`,
                {
                    params: {
                        api_key: '5a1d310d575e516dd3c547048eb7abf1',
                        language: 'ru-RU',
                        page: page,
                        region: 'RU'
                    }
                }),
            axios.get(`https://api.themoviedb.org/3/company/${id}/movies`,
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
            dispatch(loadCompanyMovies({data: concatPages,  status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 }}));
        }));
    };
}
