import { Company, Movie, SearchResult } from 'tmdb-typescript-api';
import ActionPayloadData from '~/core/types/ActionPayloadData';
import { COMPANY_DATA, CLEAR_COMPANY_DATA, COMPANY_MOVIES } from '../constants';

export interface CompanyActionReturnData {
  type: string,
  companyData: ActionPayloadData<Company>
}

export function loadCompanyData (companyData: ActionPayloadData<Company>): CompanyActionReturnData {
  return {
    type: COMPANY_DATA,
    companyData
  };
}

export function loadCompanyMovies (companyData: ActionPayloadData<SearchResult<Movie[]>>) {
  return {
    type: COMPANY_MOVIES,
    companyData
  };
}

export function clearCompanyData (): {type: string} {
  return {
    type: CLEAR_COMPANY_DATA
  };
}
