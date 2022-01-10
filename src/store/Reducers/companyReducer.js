import { COMPANY_DATA, CLEAR_COMPANY_DATA, COMPANY_MOVIES } from '../constants/index';
import update from 'react-addons-update';

const initialState = {
  companyData: {
    isFetching: false,
    data: {
      name: '',
      logo_path: '',
      homepage: '',
      parent_company: '',
      headquarters: '',
      description: ''
    },
    status: true
  },
  companyMovies: {
    isFetching: false,
    data: {
      page: 1,
      total_results: '',
      total_pages: '',
      results: []
    },
    status: true
  }

};

export default function Company (state = initialState, action) {
  switch (action.type) {
    case COMPANY_DATA:
      return update(state, {
        companyData: {
          $merge: {
            isFetching: true,
            data: action.companyData.data,
            status: action.companyData.status
          }
        }
      });
    case COMPANY_MOVIES:
      return update(state, {
        companyMovies: {
          $merge: {
            isFetching: true,
            data: action.companyData.data,
            status: action.companyData.status
          }
        }
      });

    case CLEAR_COMPANY_DATA:
      return update(state, {
        companyData: {
          $merge: {
            isFetching: false,
            data: initialState.companyMovies
          }
        }
      });

    default:
      return state;
  }
}
