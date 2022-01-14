import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { searchMovie, searchPageResults } from '~/store/actions/general-actions';
import oldClient from '~/core/api/OldClient';

export function onSearch (words: string): ThunkAction<void, unknown, unknown, AnyAction> {
  return async dispatch => {
    const { data } = await oldClient.get('search/multi',
      {
        language: 'ru-RU',
        page: 1,
        region: 'RU',
        query: words,
        include_adult: true
      }
    );
    dispatch(searchMovie(data));
  };
}

export function MainSearch (words: string, page = 1): ThunkAction<void, unknown, unknown, AnyAction> {
  return async dispatch => {
    const [firstPage, secondPage] = await oldClient.all([
      oldClient.get('search/multi',
        {
          language: 'ru-RU',
          page: page,
          region: 'RU',
          include_adult: true,
          query: words.replace('_', ' ')
        }),
      oldClient.get('search/multi',
        {
          language: 'ru-RU',
          page: page + 1,
          region: 'RU',
          include_adult: true,
          query: words.replace('_', ' ')
        })
    ]);
    const data = {
      ...secondPage.data,
      results: firstPage.data.results.concat(secondPage.data.results),
      page: firstPage.data.page,
      searchType: { type: 'main-search' },
      querySearch: words.replace('_', ' ')
    };
    const status = firstPage.isSuccessRequest && secondPage.isSuccessRequest;
    dispatch(searchPageResults({ data, status }));
  };
}
