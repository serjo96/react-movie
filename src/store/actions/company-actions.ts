import ActionPayloadData from '~/core/types/actionPayloadData';
import { COMPANY_DATA, CLEAR_COMPANY_DATA, COMPANY_MOVIES } from '../constants';
import { Company } from '~/core/types/company';
import { ListData } from '~/core/types/listData';
import { MoviesListItem } from '~/core/types/movies';

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

export function loadCompanyMovies (companyData: ActionPayloadData<ListData<MoviesListItem[]>>) {
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
