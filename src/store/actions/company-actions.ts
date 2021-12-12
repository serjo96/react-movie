import { COMPANY_DATA, CLEAR_COMPANY_DATA, COMPANY_MOVIES } from '../constants';
import { Company } from 'tmdb-typescript-api';

export interface ActionCompanyData {
  data: Company,
  status: boolean
}

export interface CompanyActionReturnData {
  type: string,
  companyData: ActionCompanyData
}

export function loadCompanyData (companyData: ActionCompanyData): CompanyActionReturnData {
  return {
    type: COMPANY_DATA,
    companyData
  };
}

export function loadCompanyMovies (companyData: ActionCompanyData): CompanyActionReturnData {
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
