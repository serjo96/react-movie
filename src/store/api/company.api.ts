import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Company, Movie } from 'tmdb-typescript-api';

import oldClient from '~/core/api/OldClient';
import { ClientResponse } from '~/core/api/apiClient';
import ConcatPages from '~/utils/concatPages';
import {
  CompanyActionReturnData,
  loadCompanyData,
  loadCompanyMovies
} from '~/store/actions/company-actions';

export function onLoadCompanyData (id: string): ThunkAction<void, unknown, unknown, AnyAction> {
  return (dispatch: Dispatch<CompanyActionReturnData>) => {
    oldClient.get(`company/${id}`,
      {
        language: 'ru-RU'
      }).then((response: ClientResponse<Company>) => {
      dispatch(loadCompanyData({ data: response.data, status: response.status < 400 }));
    });
  };
}

export function LoadCompanyMovies (id: string, page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async (dispatch) => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get(`company/${id}/movies`,
        {
          language: 'ru-RU',
          page: page,
          region: 'RU'
        }
      ),
      oldClient.get(`company/${id}/movies`,
        {
          language: 'ru-RU',
          page: page + 1,
          region: 'RU'
        }
      )
    ]);
    const concatPages = ConcatPages<Movie>({ firstPage, secondPage });
    dispatch(loadCompanyMovies({ data: concatPages, status: firstPage.isSuccessRequest && secondPage.isSuccessRequest }));
  };
}
