import { COMPANY_DATA, CLEAR_COMPANY_DATA, COMPANY_MOVIES } from '../constants';

export function loadCompanyData(companyData) {
    return {
        type: COMPANY_DATA,
        companyData
    };
}

export function loadCompanyMovies(companyData) {
    return {
        type: COMPANY_MOVIES,
        companyData
    };
}


export function clearCompanyData() {
    return {
        type: CLEAR_COMPANY_DATA
    };
}
