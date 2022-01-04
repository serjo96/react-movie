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
    const [pageOne, pageTwo] = await oldClient.all([
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
      ...pageTwo.data,
      results: pageOne.data.results.concat(pageTwo.data.results),
      page: pageOne.data.page,
      searchType: { type: 'main-search' },
      querySearch: words.replace('_', ' ')
    };
    dispatch(searchPageResults({ data, status: { pageOne: pageOne.status === 200, pageTwo: pageTwo.status === 200 } }));
  };
}
